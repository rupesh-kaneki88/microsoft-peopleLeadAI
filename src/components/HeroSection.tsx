'use client';

import React, { useRef, useEffect } from 'react';
import { useTheme } from '../providers/theme-provider';
import ThreeDBackground from './ThreeDBackground';
import { gsap } from 'gsap';

const HeroSection = () => {
  const theme = useTheme();
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const cta1Ref = useRef(null);
  const cta2Ref = useRef(null);

  useEffect(() => {
    gsap.to(headlineRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    gsap.to(subheadlineRef.current, { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" });
    gsap.to([cta1Ref.current, cta2Ref.current], { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out", stagger: 0.1 });
  }, []);

  return (
    <section
      className="relative flex flex-col justify-center items-center min-h-screen text-center p-8"
      style={{ color: 'var(--color-secondary)' }}
    >
      <ThreeDBackground />
      <div className="relative z-10">
        <h1
          ref={headlineRef}
          className="text-6xl mb-4 opacity-0 translate-y-12"
          style={{ fontFamily: 'var(--font-primary)', color: 'var(--color-primary)' }}
        >
          Human-led. AI-fueled.
        </h1>
        <p
          ref={subheadlineRef}
          className="text-2xl mb-8 opacity-0 translate-y-12"
          style={{ fontFamily: 'var(--font-helvetica-neue)' }}
        >
          Helping individuals and organizations harness the power of AI to enhance human potential.
        </p>
        <div>
          <button
            ref={cta1Ref}
            className="text-xl py-3 px-8 rounded-md cursor-pointer mx-4 transition-colors duration-300 opacity-0 translate-y-12 hover:bg-blue-700"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-secondary)', fontFamily: 'var(--font-helvetica-neue)' }}
          >
            Get Started
          </button>
          <button
            ref={cta2Ref}
            className="text-xl py-3 px-8 rounded-md cursor-pointer mx-4 transition-colors duration-300 opacity-0 translate-y-12 hover:bg-blue-700"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-secondary)', fontFamily: 'var(--font-helvetica-neue)' }}
          >
            Explore Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;