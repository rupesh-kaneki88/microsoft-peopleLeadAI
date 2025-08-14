'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutPage: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);


  const sectionsData = [
    {
      id: 'about-us',
      title: 'About Us',
      titleColor: 'var(--color-primary)',
      description:
        'Our mission is simple: to help individuals and organizations harness the power of AI to enhance human potential.',
      bg: 'var(--color-background)',
      textColor: '#fff',
      svg1: '/rocket.svg',
      svg1Desc: 'rocket icon',
      svg2: '/planet.svg',
      svg2Desc: 'planet icon',
    },
    {
      id: 'what-we-believe',
      title: 'What We Believe',
      titleColor: 'var(--color-background)',
      description:
        'AI should empower, not overshadow. People are at the center of every great solution.',
        bg: 'var(--color-primary)',
      textColor: '#fff',
      svg1: '/people.svg',
      svg2: '/believe.svg',
      svg1Desc: 'people icon',
      svg2Desc: 'believe icon',
    },
    {
      id: 'who-we-are',
      title: 'Who We Are',
      titleColor: 'var(--color-primary)',
      description:
        'We’re a team of AI consultants, designers, and strategists who believe technology works best when it supports people.',
      bg: 'var(--color-secondary)',
      textColor: '#000',
      svg1: '/team.svg',
      svg2: '/puzzle.svg',
      svg1Desc: 'team icon',
      svg2Desc: 'puzzle icon'
    },
  ];

  useLayoutEffect(() => {
    if (!mainRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // ✅ Skip animations for motion-sensitive users

    const sections = sectionRefs.current;
    const texts = textRefs.current;

    // Initial setup
    gsap.set(sections.slice(1), { yPercent: 100 });
    gsap.set(texts, { opacity: 0, y: 20 });
    gsap.set(texts[0], { opacity: 1, y: 0 });

    // Main timeline for background sliding
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${(sections.length - 1) * window.innerHeight}`
      }
    });

    // Animate background sections sliding
    sections.forEach((section, i) => {
      if (i > 0) {
        tl.to(section, { yPercent: 0, ease: 'none' }, i);
      }
    });

    // Text transitions synced with background slides
    texts.forEach((text, i) => {
      if (i > 0) {
        tl.to(texts[i - 1], { opacity: 0, y: -20, duration: 0.5 }, i - 0.3);
        tl.to(text, { opacity: 1, y: 0, duration: 0.5 }, i);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main
      ref={mainRef}
      className="relative w-full h-screen overflow-hidden mb-4 md:mb-8"
      role="main"
      aria-label="About Page with sliding sections"
    >
      {/* ✅ Sticky Text Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center z-[100]">
        <div
          className="relative w-full h-full flex items-center justify-center"
          aria-live="polite"
        >
          {sectionsData.map((section, index) => (
            <div
              key={index}
              ref={(el) => {(textRefs.current[index] = el)}}
              className="absolute text-center max-w-3xl px-6"
              role="region"
              aria-labelledby={`section-title-${index}`}
            >
              
              <h2
                id={`section-title-${index}`}
                className="text-4xl md:text-6xl font-bold mb-6 font-primary leading-tight"
                style={{
                  color: `${section.titleColor}`,
                  // textShadow: section.textColor === '#fff' ? '0 2px 10px rgba(0,0,0,0.3)' : 'none'
                }}
              >
                {section.title}
              </h2>
              <p
                className="text-lg md:text-2xl leading-relaxed font-helvetica-neue"
                style={{
                  color: section.textColor === '#fff' ? 'rgba(255,255,255,0.9)' : '#444'
                }}
              >
                {section.description}
              </p>
                
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Background sliding sections */}
      {sectionsData.map((section, index) => (
        <section
          key={index}
          ref={(el) => { sectionRefs.current[index] = el; }}
          className="absolute top-0 left-0 w-full h-screen"
          style={{
            backgroundColor: section.bg,
            zIndex: 10 + index
          }}
          aria-hidden="true" // ✅ Background is decorative only
        >
          {/* bottom icon */}
          <img
            src={section.svg1}
            alt={`${section.svg1Desc}`}
            className="absolute bottom-0 right-0 md:right-4 w-60 md:w-80 h-50 md:h-80 opacity-10"
            aria-hidden="true"
          />
          {/* top icon */}
          <img
            src={section.svg2}
            alt={`${section.svg2Desc} icon`}
            className="w-40 md:w-60 h-40 md:h-60 mt-20 md:mt-24 opacity-10 ml-2 md:ml-8"
            aria-hidden="true"
          />
        </section>
      ))}
    </main>
  );
};

export default AboutPage;
