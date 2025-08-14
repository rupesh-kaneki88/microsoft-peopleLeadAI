'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FallingStars: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const starCount = 30;
    const stars: HTMLDivElement[] = [];

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'absolute h-1 w-32 rounded-full'; // Slightly longer tail
      star.style.background = `linear-gradient(to left, var(--color-primary), transparent)`;
      star.style.willChange = 'transform, opacity';
      container.appendChild(star);
      stars.push(star);

      animateStar(star);
    }

    function animateStar(star: HTMLDivElement) {
      // Set initial position (top-left, off-screen) and properties
      gsap.set(star, {
        x: Math.random() * window.innerWidth - window.innerWidth * 1.2, // Start further left
        y: Math.random() * window.innerHeight - window.innerHeight * 1.2, // Start further up
        opacity: 0,
        scale: 0.5, // Start small
        rotation: 45, // Tilted angle for top-left to bottom-right movement
      });

      const duration = Math.random() * 1.5 + 1; // Random duration for variety
      const travelDistance = window.innerWidth + 500; // Ensure it crosses the entire screen

      const tl = gsap.timeline({
        onComplete: () => animateStar(star), // Loop the animation
      });

      // Animate movement, scaling, and opacity simultaneously
      tl.to(star, {
        x: `+=${travelDistance}`,
        y: `+=${travelDistance}`, // Move diagonally (top-left to bottom-right)
        ease: 'power1.in', // Start slow and accelerate
        duration: duration,
      }, 0)
      .to(star, {
        scale: 1.2, // Scale up as it approaches
        opacity: 1, // Fade in
        duration: duration * 0.5, // Happen over the first half of the journey
        yoyo: true, // Scale back down and fade back out
        repeat: 1,
        ease: 'power2.inOut',
      }, 0);
    }

    return () => {
      stars.forEach(star => star.remove());
      gsap.globalTimeline.clear();
    };
  }, []);

  return <div ref={containerRef} className="absolute top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true" />;
};

export default FallingStars;