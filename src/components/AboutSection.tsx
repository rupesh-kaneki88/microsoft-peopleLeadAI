'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isIOSRef = useRef(false);

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
      titleColor: 'var(--color-primary)',
      description:
        'AI should empower, not overshadow. People are at the center of every great solution.',
      bg: 'var(--color-background)',
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
      bg: 'var(--color-background)',
      textColor: '#fff',
      svg1: '/team.svg',
      svg2: '/puzzle.svg',
      svg1Desc: 'team icon',
      svg2Desc: 'puzzle icon',
    },
  ];

  // Detect iOS/iPadOS (including iPadOS reporting as Mac)
  useEffect(() => {
    const ua = navigator.userAgent || '';
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (ua.includes('Mac') && 'ontouchend' in document);
    isIOSRef.current = isIOS;
  }, []);

  // iOS 100vh fix
  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const setup = () => {
      const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
      const texts = textRefs.current.filter(Boolean) as HTMLDivElement[];

      // Initial states
      gsap.set(sections.slice(1), { yPercent: 100, force3D: true });
      gsap.set(texts, { opacity: 0, y: 20 });
      gsap.set(texts[0], { opacity: 1, y: 0 });

      // Calculate scroll distance equal to (#slides - 1) * viewport height
      const scrollDistance = (mainEl.clientHeight || window.innerHeight) * (sections.length - 1);

      // Main timeline with proper spacer (pinSpacing: true)
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: 'none' },
        scrollTrigger: {
          trigger: mainEl,
          pin: true,
          // Keep spacing so we have enough scroll room to finish all slides:
          pinSpacing: true,
          // Force transform pinning on iOS/iPadOS to avoid stacking glitches:
          pinType: isIOSRef.current ? 'transform' : 'fixed',
          scrub: 1,
          end: `+=${scrollDistance}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Background slides
      sections.forEach((section, i) => {
        if (i > 0) {
          tl.to(section, { yPercent: 0 }, i); // place each slide at whole-number positions
        }
      });

      // Text transitions in sync
      texts.forEach((text, i) => {
        if (i > 0) {
          tl.to(texts[i - 1], { opacity: 0, y: -20, duration: 0.35 }, i + 0.4);
          tl.to(text, { opacity: 1, y: 0, duration: 0.35 }, i + 0.8);
        }
      });

      return tl;
    };

    const tl = setup();

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (tl) tl.scrollTrigger?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={mainRef}
      className="relative w-full overflow-hidden mb-4 md:mb-8"
      style={{ height: 'calc(var(--vh) * 100)' }}
      role="main"
      aria-label="About Page with sliding sections"
    >
      {/* Sticky Text Container */}
      <div className="sticky top-0 h-full flex items-center justify-center z-[100]">
        <div className="relative w-full h-full flex items-center justify-center" aria-live="polite">
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
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-primary leading-tight"
                style={{ color: section.titleColor }}
              >
                {section.title}
              </h2>
              <p
                className="text-xl md:text-3xl leading-relaxed font-urbanist"
                style={{ color: section.textColor === '#fff' ? 'rgba(255,255,255,0.9)' : '#444' }}
              >
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Background sliding sections */}
      {sectionsData.map((section, index) => (
        <section
          key={index}
          ref={(el) => {(sectionRefs.current[index] = el)}}
          className="absolute top-0 left-0 w-full h-full will-change-transform"
          style={{ backgroundColor: section.bg, zIndex: 10 + index }}
          aria-hidden="true"
        >
          <img
            src={section.svg1}
            alt={section.svg1Desc}
            className="absolute bottom-0 right-0 md:right-4 w-60 md:w-80 h-50 md:h-80 opacity-10"
            aria-hidden="true"
          />
          <img
            src={section.svg2}
            alt={`${section.svg2Desc} icon`}
            className="w-40 md:w-60 h-40 md:h-60 mt-20 md:mt-24 opacity-10 ml-2 md:ml-8"
            aria-hidden="true"
          />
        </section>
      ))}
    </section>
  );
};

export default AboutSection;
