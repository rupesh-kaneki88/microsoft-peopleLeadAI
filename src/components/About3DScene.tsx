'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface About3DSceneProps {
  cameraZ: number;
}

const About3DScene: React.FC<About3DSceneProps> = ({ cameraZ }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scene = useRef<THREE.Scene | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const particlesMesh = useRef<THREE.Points | null>(null);

  const initThree = useCallback(() => {
    if (!mountRef.current) return;

    // Scene
    scene.current = new THREE.Scene();
    scene.current.background = new THREE.Color(0x000000); // Match background color

    // Camera
    camera.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.current.position.z = 5; // Initial camera position

    // Renderer
    renderer.current = new THREE.WebGLRenderer({ antialias: true });
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.current.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.current.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.current.add(pointLight);

    // Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100; // Spread particles in a cube
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x108de9,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    particlesMesh.current = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.current.add(particlesMesh.current);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (renderer.current && scene.current && camera.current && particlesMesh.current) {
        particlesMesh.current.rotation.y += 0.0005; // Subtle rotation
        renderer.current.render(scene.current, camera.current);
      }
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (camera.current && renderer.current) {
        camera.current.aspect = window.innerWidth / window.innerHeight;
        camera.current.updateProjectionMatrix();
        renderer.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.current) {
        mountRef.current.removeChild(renderer.current.domElement);
        renderer.current.dispose();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    initThree();
  }, [initThree]);

  useEffect(() => {
    if (camera.current) {
      camera.current.position.z = cameraZ;
    }
  }, [cameraZ]);

  return <div ref={mountRef} className="w-full h-screen fixed top-0 left-0 z-0" />;
};

export default About3DScene;
