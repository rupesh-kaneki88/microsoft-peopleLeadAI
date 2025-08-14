'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !titleRef.current) return;

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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        end: 'bottom 40%',
        scrub: 1,
      },
    });

    tl.fromTo(
      '.service-card',
      {
        y: 100,
        opacity: 0,
        rotationX: -30,
        transformOrigin: 'center center',
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      }
    );

    const cards = gsap.utils.toArray<HTMLDivElement>('.service-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const target = e.currentTarget as HTMLDivElement;
        const { left, top, width, height } = target.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        gsap.to(card, { rotationY: x, rotationX: -y, ease: 'power3.out', duration: 0.5 });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotationY: 0, rotationX: 0, ease: 'power3.out', duration: 0.5 });
      });
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const serviceAreas = [
    {
      title: 'AI Readiness & Strategy',
      svg: '/AI-strategy.svg',
      description: 'We work with you to define your goals, identify meaningful AI use cases, and build a roadmap that aligns with your people and processes.',
    },
    {
      title: 'Conversational AI & Chatbots',
      svg: '/chatbot.svg',
      description: 'Designing smart, human-centered chatbots that reflect your brand voice and support users with clarity and care.',
    },
    {
      svg: '/accessibility.svg',
      title: 'Inclusive & Accessible AI',
      description: 'From design reviews to user testing, we ensure your AI solutions work for everyone — including people with disabilities.',
    },
    {
      svg: '/practice.svg',
      title: 'Responsible AI Practices',
      description: 'We guide your team through principles, governance, and implementation to ensure ethical, bias-aware AI.',
    },
    {
      svg: '/workshop.svg',
      title: 'Custom AI Enablement Workshops',
      description: 'Upskill your teams through tailored sessions that demystify AI and spark collaboration.',
    },
  ];

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-[var(--color-background)] text-[var(--color-secondary)] mb-4 md:mb-24 mx-4 md:mx-8 mt-24 md:mt-28"
    >
      <section className="max-w-6xl mx-auto text-center mb-16">
        <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-6 text-[var(--color-primary)] font-primary leading-tight flex justify-center" aria-label="Services">
          {"Services".split('').map((char, index) => (
            <span key={index} className="relative inline-block overflow-hidden h-[1.2em]" aria-hidden="true"> 
              <span className="char-initial inline-block">{char}</span>
              <span className="char-incoming absolute inset-0 inline-block opacity-0 transform translate-y-full">{char}</span>
            </span>
          ))}
        </h1>
          <p className="text-2xl md:text-3xl leading-relaxed font-helvetica-neue-ultralight text-gray-300 max-w-3xl mx-auto">
            Our services are designed to amplify what your people do best — with thoughtful, ethical, and effective AI.
          </p>
      </section>

      <section className="max-w-7xl mx-auto md:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {serviceAreas.map((service, index) => (
            <div
              key={index}
              className={`service-card relative group ${
                index === serviceAreas.length - 1 ? 'md:col-span-2' : ''
              }`}
              style={{ perspective: '1000px' }}
            >
              <div
                className="relative bg-gradient-to-tl from-[#16161A] from-40% to-transparent text-white p-8 rounded-2xl shadow-lg h-full min-h-[280px] transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={service.svg}
                  alt={`${service.title} icon`}
                  className="absolute bottom-4 right-4 w-32 h-32 opacity-15 transition-opacity duration-500 group-hover:opacity-24"
                  aria-hidden="true"
                />
                
                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white font-secondary text-center">
                    {service.title}
                  </h2>
                  <p className="font-helvetica-neue text-lg md:text-xl text-center text-gray-300 opacity-90">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
