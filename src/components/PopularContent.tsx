'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const popularContentData = [
  {
    title: 'The AI Readiness Checklist',
    image: '/ai-svgrepo-com.svg',
  },
  {
    title: 'AI and Accessibility',
    image: '/accessibility-svgrepo-com.svg',
  },
  {
    title: 'How to Talk to Your Team About AI',
    image: '/problem-process-solution-svgrepo-com.svg',
  },
  {
    title: 'People-Centered AI: A Beginner\'s Guide',
    image: '/discover-compass-svgrepo-com.svg',
  },
];

const PopularContent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(()=> {
    if (!titleRef.current) return;

    const tlTitle = gsap.timeline();
    tlTitle.fromTo(
      titleRef.current.querySelectorAll('.char-initial'),
      { y: 0, opacity: 1 },
      { y: -20, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.05 }
    );
    tlTitle.fromTo(
      titleRef.current.querySelectorAll('.char-incoming'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.05 },
      "<"
    );
    
  }, [])

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return; // skip on mobile

    const image = e.currentTarget.querySelector('.content-image');
    const title = e.currentTarget.querySelector('.content-title');
    gsap.to(image, { autoAlpha: 1, y: '-90%', x: '10%', rotation: -5, scale:1.3, duration: 0.4, ease: 'power2.out' });
    gsap.to(title, { color: 'black', duration: 0.4 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return; // skip on mobile

    const image = e.currentTarget.querySelector('.content-image');
    const title = e.currentTarget.querySelector('.content-title');
    gsap.to(image, { autoAlpha: 0, y: '-50%', x: '10%', rotation: -5, duration: 0.4, scale:1, ease: 'power2.in' });
    gsap.to(title, { color: 'var(--color-secondary)', duration: 0.4 });
  };

  return (
    <main ref={containerRef} className="w-full min-h-screen bg-[var(--color-background)] text-[var(--color-secondary)] mb-4 md:mb-24  md:mx-8 mt-24 md:mt-28">

      <section className="max-w-6xl mx-auto text-center mb-16">
        <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-6 text-[var(--color-primary)] font-primary leading-tight flex justify-center">
          {"Resources".split('').map((char, index) => (
            <span key={index} className="relative inline-block overflow-hidden h-[1.2em]"> {/* Adjust h-[] based on line-height */} 
              <span className="char-initial inline-block">{char}</span>
              <span className="char-incoming absolute inset-0 inline-block opacity-0 transform translate-y-full">{char}</span>
            </span>
          ))}
        </h1>
        <p className="text-2xl md:text-3xl leading-relaxed font-helvetica-neue-ultralight text-gray-300 max-w-3xl mx-auto">
          Explore tools, guides, and insights designed to help you lead with people and move faster with AI.
        </p>
      </section>

      <section className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--color-primary)] font-perfectly-nineties text-center">Popular Content</h2>
        <div className="border-t border-[var(--color-secondary)] px-4">
          {popularContentData.map((item, index) => (
            <div
              key={index}
              className="content-item relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--color-secondary)] py-8 md:py-14 transition-colors duration-300 hover:bg-[var(--color-primary)]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="content-title text-base sm:text-lg md:text-2xl text-center md:text-left font-neue-montreal break-words w-full">{item.title}</span>
              <div className="content-image hidden md:block absolute right-0 top-full transform -translate-y-1/2 mr-8 opacity-0" style={{ transform: 'translateY(-50%) translateX(10%) rotate(-5deg)' }}>
                <Image src={item.image} alt={item.title} width={120} height={120} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PopularContent;