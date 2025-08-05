'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeDBackground = ({ scrollProgressRef }: { scrollProgressRef: React.MutableRefObject<number> }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false }); // alpha: false for opaque background
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setClearColor(0x000000, 1); // Black and opaque background
    currentMount.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5; // Original spread
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005, // Original subtle size
      color: 0x108de9, // Primary blue color
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 2; // Original camera position

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1; // Normalize to -1 to +1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize to -1 to +1, invert Y
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Subtle rotation for particles
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0008;

      // Camera movement based on mouse position
      camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.05; // Damping effect
      camera.position.y += (mouseY * 0.1 - camera.position.y) * 0.05; // Damping effect

      // Zoom effect based on scroll progress
      camera.position.z = 2 - (scrollProgressRef.current * 1.5); // Adjust zoom depth as needed

      camera.lookAt(scene.position); // Keep camera looking at the center

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove); // Clean up mousemove listener
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []); // Removed scrollProgress from dependency array

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2 }} aria-hidden="true" />;
};


export default ThreeDBackground;