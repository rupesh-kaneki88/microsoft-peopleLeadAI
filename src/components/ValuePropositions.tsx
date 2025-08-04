'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ValuePropositions: React.FC = () => {
  const propositions = [
    { title: 'Empower your people with AI', description: 'Leverage AI to augment human capabilities, not replace them.', image: '/ai-svgrepo-com.svg' },
    { title: 'Built for inclusivity and impact', description: 'AI solutions designed with accessibility and ethical considerations at their core.', image: '/accessibility-svgrepo-com.svg' },
    { title: 'Trusted experts in AI strategy', description: 'Guidance from seasoned professionals to navigate your AI journey.', image: '/ai-trust-svgrepo-com.svg' },
    { title: 'Simple, actionable solutions', description: 'Practical AI implementations that deliver tangible results.', image: '/problem-process-solution-svgrepo-com.svg' },
  ];

  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop setup
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(timelineRef.current, { height: "100%", ease: "none" }, 0);

      propositions.forEach((_, i) => {
        const card = cardsRef.current[i];
        gsap.fromTo(card, { opacity: 0.3 }, {
          opacity: 1, x: 0, ease: 'power4.inOut',
          scrollTrigger: {
            trigger: card, start: 'top center', end: 'bottom center', toggleActions: 'play reverse play reverse',
          }
        });

        ScrollTrigger.create({
          trigger: card, start: 'top center', end: 'bottom center',
          onEnter: () => setActiveIndex(i), onEnterBack: () => setActiveIndex(i),
          onLeave: () => setActiveIndex(null), onLeaveBack: () => setActiveIndex(null),
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile setup - no animations, full opacity
      gsap.set(cardsRef.current, { opacity: 1 });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-8 md:py-16 px-4 bg-[var(--color-background)] text-[var(--color-primary)] overflow-hidden" aria-labelledby="value-propositions-heading">
      <div className="max-w-6xl mx-auto text-center mb-4 md:mb-12">
        <h2 id="value-propositions-heading" className="text-4xl font-bold text-[var(--color-primary)] font-secondary">Our Value Propositions</h2>
      </div>

      <div className="relative flex justify-center">
        {/* Central Progress Bar - Hidden on mobile */}
        <div ref={timelineRef} className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 rounded-full overflow-hidden" aria-hidden="true">
          {propositions.map((_, i) => (
            <div
              key={i}
              style={{ height: `${100 / propositions.length}%` }}
              className={`w-full transition-all duration-300 h-[calc(100%/${propositions.length})] ${
                activeIndex === i ? 'bg-[var(--color-primary)]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="w-full" role="list">
          {propositions.map((prop, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="relative flex flex-col md:flex-row items-center my-4 md:my-12 md:my-0" role="listitem"
            >
              {/* Desktop Layout */}
              <div className="hidden md:flex w-full items-center my-12">
                {index % 2 === 0 ? (
                  <>
                    <div className="w-1/2 p-4 pr-8 text-right">
                      <div className="bg-[var(--color-background)] p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl md:text-4xl font-semibold mb-2 font-primary text-[var(--color-secondary)]">{prop.title}</h3>
                        <p className="font-perfectly-nineties-italic text-sm md:text-lg text-gray-400">{prop.description}</p>
                      </div>
                    </div>
                    <div className="w-1/2 p-4 flex items-center justify-start">
                      <div className="flex items-center">
                        <span className="text-5xl font-bold mr-4 text-gray-400">{index + 1}.</span>
                        <img src={prop.image} alt={`${prop.image} icon`} className="w-24 h-24" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-1/2 p-4 flex items-center justify-end">
                      <div className="flex items-center">
                        <img src={prop.image} alt="" className="w-24 h-24" />
                        <span className="text-5xl font-bold ml-4 text-gray-400">{index + 1}.</span>
                      </div>
                    </div>
                    <div className="w-1/2 p-4 pl-8 text-left">
                      <div className="bg-[var(--color-background)] p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl md:text-4xl font-semibold mb-2 font-primary text-[var(--color-secondary)]">{prop.title}</h3>
                        <p className="font-perfectly-nineties-italic text-sm md:text-lg text-gray-400">{prop.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden w-full">
                <div className="bg-[var(--color-background)] p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl font-bold mr-4 text-gray-400">{index + 1}.</span>
                    <img src={prop.image} alt="" className="w-16 h-16 mr-4" />
                    <h3 className="text-xl font-semibold font-primary text-[var(--color-secondary)]">{prop.title}</h3>
                  </div>
                  <p className="font-helvetica-neue text-gray-400">{prop.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositions;
