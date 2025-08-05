'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: 'Discover your needs',
      description: 'We start by understanding your unique challenges and goals.',
      svg: '/discover-compass-svgrepo-com.svg',
    },
    {
      title: 'Design the right AI approach',
      description: 'Tailoring AI solutions that align with your people and processes.',
      svg: '/design-and-development-01-svgrepo-com.svg',
    },
    {
      title: 'Deliver results with people in mind',
      description: 'Implementing AI that enhances human potential and drives impact.',
      svg: '/deliver-svgrepo-com.svg',
    },
  ];

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isLargeScreen = window.innerWidth >= 768;
    if (!isLargeScreen) return; // Skip animations on small screens

    const section = sectionRef.current;
    const title = titleRef.current;
    const cardsContainer = cardsContainerRef.current;
    const cards = cardsRef.current.filter(c => c !== null) as HTMLDivElement[];

    if (!section || !title || !cardsContainer || cards.length === 0) return;

    gsap.set(cards, { y: '100vh', opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${cards.length * 800}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(title, { y: 0, duration: 0.1 });

    cards.forEach((card, index) => {
      tl.to(card, { y: 0, opacity: 1, ease: 'power2.inOut', duration: 2 }, `card${index}`);
      if (index > 0) {
        tl.to(cards[index - 1], { scale: 0.9, opacity: 0, y: -50, ease: 'power2.inOut', duration: 2 }, `card${index}`);
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="md:py-6 px-4 pb-6 bg-[var(--color-background)] text-[var(--color-secondary)]"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-2 md:mt-16 text-[var(--color-primary)] font-secondary bg-[var(--color-background)] py-4 z-10"
        >
          How It Works
        </h2>

        {/* Mobile version – visible only on small screens */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-6 rounded-xl shadow-2xl bg-gradient-to-r from-[#16161A] from-20% to-transparent text-white mx-auto overflow-hidden"
            >
              
              <img
                src={step.svg}
                alt={`${step.title} icon`}
                className="absolute bottom-0 right-0 w-40 h-40 opacity-10"
              />
              <div className="relative z-10 text-left">
                <div className="bg-[#16161A] p-3 inline-block rounded-md border border-gray-500 mb-4">
                  <img
                    src={step.svg}
                    alt={`${step.title} icon`}
                    className="w-10 h-10"
                  />
                </div>
                <h3 className="text-3xl font-semibold mb-2 font-primary">{step.title}</h3>
                <p className="text-gray-400 font-perfectly-nineties-italic text-sm md:text-lg">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Animated version – visible only on medium+ screens */}
        <div
          ref={cardsContainerRef}
          className="relative h-[70vh] hidden md:flex items-center justify-center"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="absolute p-12 rounded-xl shadow-2xl min-h-[300px] bg-gradient-to-r from-[#16161A] from-40% to-transparent text-white max-w-4xl mx-auto overflow-hidden"
              style={{ willChange: 'transform, opacity' }}
            >
              
              <img
                src={step.svg}
                alt={`${step.title} icon`}
                className="absolute bottom-0 right-0 w-48 h-48 opacity-10"
              />
              <div className="relative z-10 text-left">
                <div className="bg-[#16171A] p-4 inline-block rounded-md border border-gray-500 mb-6">
                  <img
                    src={step.svg}
                    alt={`${step.title} icon`}
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="text-3xl md:text-4xl font-semibold mb-4 font-primary">{step.title}</h3>
                <p className="text-gray-400 font-helvetica-neue text-xl">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
