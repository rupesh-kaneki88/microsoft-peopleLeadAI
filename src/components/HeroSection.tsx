'use client';


import React, { useRef, useEffect } from 'react';
import { useTheme } from '../providers/theme-provider';
import ThreeDBackground from './ThreeDBackground';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import HowItWorks from './HowItWorks'; // Import HowItWorks
import ValuePropositions from './ValuePropositions';

gsap.registerPlugin(SplitText, ScrollTrigger);

const HeroSection = () => {
  const theme = useTheme();
  const sectionRef = useRef(null);
  const zoomContainerRef = useRef(null);
  const initialContentRef = useRef(null); // New ref for initial content
  const logoRef = useRef<HTMLImageElement | null>(null);
  const subheadlineRef = useRef(null);
  const cta1Ref = useRef(null);
  const cta2Ref = useRef(null);
  const valuePropositionsRef = useRef(null);
  const howItWorksRef = useRef(null); // Ref for HowItWorks

  useEffect(() => {
    // Initial animation for subheadline and CTAs
    if (subheadlineRef.current) {
      const splitText = new SplitText(subheadlineRef.current, { type: "words,chars" });
      gsap.set(splitText.chars, { opacity: 0, y: 20, rotationX: -90 });
      gsap.to(splitText.chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });
    }

    gsap.set([cta1Ref.current, cta2Ref.current], { opacity: 0, y: 30 });
    gsap.to([cta1Ref.current, cta2Ref.current], { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power3.out", stagger: 0.1 });

    // ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=4000", // Increased end value for longer animation
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate out subheadline and CTAs early
    if (subheadlineRef.current) {
      const splitText = new SplitText(subheadlineRef.current, { type: "words,chars" });
      tl.to(splitText.chars, {
        opacity: 0,
        y: 20,
        rotationX: 90,
        stagger: 0.02,
        ease: "power1.in",
      }, 0.5); // Start later to allow entrance animation to complete
    }

    tl.to([cta1Ref.current, cta2Ref.current], {
      opacity: 0,
      y: 100,
      ease: "power1.inOut",
      pointerEvents: "none",
      visibility: "hidden",
    }, 0.5); // Start later to allow entrance animation to complete

    // Scale the zoom container (the "window") and fade out the logo
    tl.to(zoomContainerRef.current, {
      width: "100vw",
      height: "100vh",
      borderRadius: 0, // Remove border radius to fill screen
      borderWidth: 0, // Animate border to 0
      ease: "power1.inOut",
    }, 0) // Start at the beginning of the timeline
    .to(initialContentRef.current, {
      opacity: 0,
      ease: "power1.inOut",
      pointerEvents: "none",
      visibility: "hidden",
    }, 0.2) // Fade out logo slightly after zoom starts
        .to(valuePropositionsRef.current, {
      opacity: 1,
      ease: "power1.inOut",
    }, 0.6) // Fade in ValuePropositions when window is ~60% open (adjust timing as needed)
    .to(howItWorksRef.current, {
      opacity: 1,
      ease: "power1.inOut",
    }, 0.9); // Fade in HowItWorks after ValuePropositions

  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center items-center min-h-screen text-center p-8 overflow-hidden"
      style={{ color: 'var(--color-secondary)' }}
    >
      <ThreeDBackground />
      <div className="relative z-10 flex flex-col justify-center items-center w-full h-full"> {/* Main content wrapper */}
        <div
          ref={zoomContainerRef}
          className="absolute top-0 left-0 flex flex-col justify-center items-center border-4 border-[var(--color-primary)] rounded-lg w-full h-full overflow-hidden"
          style={{ width: '600px', height: '140px' }} // Initial size and border
        >
          <div ref={initialContentRef} className="flex flex-col justify-center items-center w-full h-full"> {/* This will now only contain the logo */}
            <Image
              ref={logoRef}
              src="/PeopleLead-AI-Logo-1.png"
              alt="PeopleLead-AI Logo"
              width={600} // Adjust as needed
              height={140} // Adjust as needed
              className=""
            />
          </div>
          <div ref={valuePropositionsRef} className="absolute top-0 left-0 w-full h-full opacity-0 flex items-center justify-center">
            <ValuePropositions />
          </div>
          <div ref={howItWorksRef} className="absolute top-0 left-0 w-full h-full opacity-0 flex items-center justify-center">
            <HowItWorks />
          </div>
        </div>
        {/* Subheading and buttons moved outside zoomContainerRef */}
        <p
          ref={subheadlineRef}
          className="text-2xl mb-8"
          style={{ fontFamily: 'var(--font-helvetica-neue)' }}
        >
          Helping individuals and organizations harness the power of AI to enhance human potential.
        </p>
        <div>
          <button
            ref={cta1Ref}
            className="text-xl py-3 px-8 rounded-md cursor-pointer mx-4 transition-colors duration-300 hover:bg-blue-700"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-secondary)', fontFamily: 'var(--font-helvetica-neue)' }}
          >
            Get Started
          </button>
          <button
            ref={cta2Ref}
            className="text-xl py-3 px-8 rounded-md cursor-pointer mx-4 transition-colors duration-300 hover:bg-blue-700"
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