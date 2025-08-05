
'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface ParticleEffectProps {
  isActive: boolean;
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({ isActive }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const initialPositionsRef = useRef<Float32Array | null>(null); // Ref to hold initial positions

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    currentMount.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    const initialPositions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = 0; // Start at the center
      initialPositions[i] = (Math.random() - 0.5) * 15; // Target position
    }
    initialPositionsRef.current = initialPositions; // Store in ref

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x108de9,
      transparent: true,
      opacity: 0,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!rendererRef.current || !cameraRef.current || !currentMount) return;
      cameraRef.current.aspect = currentMount.clientWidth / currentMount.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (currentMount && rendererRef.current) {
        currentMount.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (isActive && particlesRef.current && initialPositionsRef.current) {
      const particles = particlesRef.current;
      const material = particles.material as THREE.PointsMaterial;
      const geometry = particles.geometry as THREE.BufferGeometry;
      const positions = geometry.attributes.position as THREE.BufferAttribute;

      // Store the initial positions
      const targetPositions = initialPositionsRef.current;
      const currentPositions = positions.array;

      // Create a dummy object for GSAP to interpolate
      const dummy = { t: 0 };

      // Show particles
      gsap.to(material, { opacity: 1, duration: 0.2 });

      gsap.to(dummy, {
        t: 1,
        duration: 1.5,
        ease: 'power4.out',
        onUpdate: () => {
          for (let i = 0; i < currentPositions.length; i++) {
            currentPositions[i] = THREE.MathUtils.lerp(0, targetPositions[i], dummy.t);
          }
          positions.needsUpdate = true;
        },
        onComplete: () => {
          gsap.to(material, { opacity: 0, duration: 1 });
        },
      });
    }
  }, [isActive]);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} aria-hidden="true" />;
};

export default ParticleEffect;
