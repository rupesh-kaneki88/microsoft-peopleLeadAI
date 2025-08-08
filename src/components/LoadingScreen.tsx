'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import FallingStars from './FallingStars';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (isLoading) {
      gsap.to(containerRef.current, { opacity: 1, duration: 0.3, ease: 'power2.inOut' });
      gsap.fromTo(
        textRef.current,
        { scale: 0.95, opacity: 0.8 },
        {
          scale: 1.05,
          opacity: 1,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        }
      );
    } else {
      gsap.to(containerRef.current, { opacity: 0, duration: 0.3, ease: 'power2.inOut', onComplete: () => {
        if (containerRef.current) {
            containerRef.current.style.display = 'none';
        }
      } });
    }
  }, [isLoading]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-80"
      style={{ display: isLoading ? 'flex' : 'none' }}
    >
      <FallingStars />
      <h1
        ref={textRef}
        className="animated-gradient-text text-4xl md:text-6xl font-bold"
        style={{ fontFamily: 'var(--font-secondary)' }}
      >
        Human-led. AI-fueled.
      </h1>
    </div>
  );
};

export default LoadingScreen;
