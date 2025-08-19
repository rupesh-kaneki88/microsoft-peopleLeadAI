'use client';


import React, { useRef, useEffect } from 'react';
import { useTheme } from '../providers/theme-provider';
import ThreeDBackground from './ThreeDBackground';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // Add this line
import Link from 'next/link';
import { useLoading } from '@/providers/LoadingProvider';

gsap.registerPlugin(SplitText, ScrollTrigger, ScrollToPlugin);

const HeroSection = () => {
  const theme = useTheme();
  const sectionRef = useRef(null);
  const logoRef = useRef<HTMLHeadingElement | null>(null);
  const subheadlineRef = useRef(null);
  const cta1Ref = useRef(null);
  const cta1TextRef = useRef<HTMLSpanElement | null>(null);
  const cta1HoverTextRef = useRef(null);
  const cta2Ref = useRef(null);
  const cta2TextRef = useRef<HTMLSpanElement | null>(null);
  const cta2HoverTextRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const { showLoading } = useLoading();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(logoRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });

      if (subheadlineRef.current) {
        const splitText = new SplitText(subheadlineRef.current, { type: "words,chars" });
        gsap.set(splitText.chars, { opacity: 0, y: 20, rotationX: -90 });
        gsap.to(splitText.chars, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.02,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        });
      }

      gsap.set([cta1Ref.current, cta2Ref.current], { opacity: 1, y: 20 });
      gsap.to([cta1Ref.current, cta2Ref.current], { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power3.out", stagger: 0.1 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (textRef: React.RefObject<HTMLSpanElement | null>, hoverTextRef: React.RefObject<HTMLSpanElement | null>) => {
    if (textRef.current && hoverTextRef.current) {
      gsap.to(textRef.current, { y: -20, opacity: 0, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(hoverTextRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleMouseLeave = (textRef: React.RefObject<HTMLSpanElement | null>, hoverTextRef: React.RefObject<HTMLSpanElement | null>) => {
    if (textRef.current && hoverTextRef.current) {
      gsap.to(textRef.current, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(hoverTextRef.current, { y: 20, opacity: 0, duration: 0.3, ease: "power2.out" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center items-center min-h-screen text-center p-8 "
      style={{ color: 'var(--color-secondary)' }}
    >
      <ThreeDBackground scrollProgressRef={scrollProgressRef} />
      <div className="relative z-10">
        <h1
          ref={logoRef}
          className="animated-gradient-text text-6xl md:text-8xl font-bold mb-4 md:mb-8 mx-auto will-change-transform"
          style={{ fontFamily: 'var(--font-secondary)' }}
        >
          Human-led. AI-fueled.
        </h1>
        <p
          ref={subheadlineRef}
          className="text-xl md:text-3xl mb-8 font-urbanist font-base md:mx-88"
        >
          Helping individuals and organizations harness the power of AI to enhance human potential.
        </p>
        <div>
          <Link href="/contact">
            <button
              ref={cta1Ref}
              className="text-lg md:text-xl py-6 md:py-7 px-20 md:px-22 rounded-md cursor-pointer font-urbanist mx-4 transition-colors duration-300 hover:bg-blue-700 mb-4 lg:mb-0 relative overflow-hidden"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-secondary)' }}
              onMouseEnter={() => handleMouseEnter(cta1TextRef, cta1HoverTextRef)}
              onMouseLeave={() => handleMouseLeave(cta1TextRef, cta1HoverTextRef)}
              onClick={showLoading}
            >
              <span ref={cta1TextRef} className="absolute inset-0 flex items-center justify-center">Get Started</span>
              <span ref={cta1HoverTextRef} className="absolute inset-0 flex items-center justify-center translate-y-full opacity-0" aria-hidden="true">Get Started</span>
            </button>
          </Link>
          <Link href="/#services">
            <button
              ref={cta2Ref}
              className="text-lg md:text-xl py-6 md:py-7 px-20 md:px-22 rounded-md cursor-pointer font-urbanist mx-4 transition-colors border border-white duration-300 relative overflow-hidden"
              style={{  color: 'var(--color-secondary)' }}
              onMouseEnter={() => handleMouseEnter(cta2TextRef, cta2HoverTextRef)}
              onMouseLeave={() => handleMouseLeave(cta2TextRef, cta2HoverTextRef)}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('services');
                if (element) {
                  gsap.to(window, {
                    duration: 0.3,
                    scrollTo: {
                      y: element.offsetTop,
                      autoKill: false
                    },
                    ease: "power2.out"
                  });
                }
              }}
            >
              <span ref={cta2TextRef} className="absolute inset-0 flex items-center justify-center">Explore Services</span>
              <span ref={cta2HoverTextRef} className="absolute inset-0 flex items-center justify-center translate-y-full opacity-0" aria-hidden="true">Explore Services</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
