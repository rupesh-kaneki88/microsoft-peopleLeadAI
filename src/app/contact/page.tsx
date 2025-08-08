'use client';

import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';

const ContactPage: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cta1TextRef = useRef<HTMLSpanElement | null>(null);
  const cta1HoverTextRef = useRef(null);
  const cta2TextRef = useRef<HTMLSpanElement | null>(null);
  const cta2HoverTextRef = useRef(null);
  const cta3TextRef = useRef<HTMLSpanElement | null>(null);
  const cta3HoverTextRef = useRef(null);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  useLayoutEffect(() => {
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

    return () => {
      tlTitle.kill();
    };
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

  const validateEmail = (email: string) => {
    if (!email) {
      return 'Email is required';
    }
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
    } else {
      setEmailError(null);
      // Simulate form submission
      alert('Thank you for subscribing!');
      setEmail(''); // Clear input
    }
  };

  return (
    <main className="bg-[var(--color-background)] text-[var(--color-secondary)] mb-8 md:mb-20 mx-4 md:mx-8 mt-24 md:mt-28">
      <section className="max-w-6xl mx-auto text-center mb-16">
        <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-6 text-[var(--color-primary)] font-primary leading-tight flex justify-center">
          {"Contact Us".split('').map((char, index) => (
            <span key={index} className="relative inline-block overflow-hidden h-[1.2em]">
              <span className="char-initial inline-block">{char}</span>
              <span className="char-incoming absolute inset-0 inline-block opacity-0 transform translate-y-full">{char}</span>
            </span>
          ))}
        </h1>
        <p className="text-2xl md:text-3xl leading-relaxed font-helvetica-neue-ultralight text-gray-300 max-w-3xl mx-auto">
          Let’s talk about how AI can help your people do their best work.
        </p>
      </section>

      <div className="md:flex md:space-x-16 max-w-6xl mx-auto">
        <section className="md:w-1/2 text-center md:text-left">
          <div className="space-y-4 mb-8">
            <button
              className="text-xl py-3 px-8 rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-700 relative overflow-hidden"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-secondary)', fontFamily: 'var(--font-neue-montreal)' }}
              onMouseEnter={() => handleMouseEnter(cta1TextRef, cta1HoverTextRef)}
              onMouseLeave={() => handleMouseLeave(cta1TextRef, cta1HoverTextRef)}
            >
              <span ref={cta1TextRef} className="inline-block">Book a Free Consult</span>
              <span ref={cta1HoverTextRef} className="absolute inset-0 flex items-center justify-center translate-y-full opacity-0">Book a Free Consult</span>
            </button>
            <p className="text-lg font-neue-montreal">
              <a href="mailto:contact@peoplelead.ai" 
                className="text-[var(--color-primary)] hover:underline relative overflow-hidden inline-block"
                onMouseEnter={() => handleMouseEnter(cta2TextRef, cta2HoverTextRef)}
                onMouseLeave={() => handleMouseLeave(cta2TextRef, cta2HoverTextRef)}
              >
                <span ref={cta2TextRef} className="inline-block">Email Us</span>
                <span ref={cta2HoverTextRef} className="absolute inset-0 flex items-center justify-center translate-y-full opacity-0">Email Us</span>
              </a>
            </p>
          </div>

          <p className="text-lg font-neue-montreal">
            Prefer to talk directly? Reach out at <a href="mailto:contact@peoplelead.ai" className="text-[var(--color-primary)] hover:underline">contact@peoplelead.ai</a>
          </p>
        </section>

        <hr className="border-t border-[var(--color-primary)] my-10 md:hidden" />

        <section className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4 text-[var(--color-primary)] font-perfectly-nineties">Stay in the Loop</h2>
          <p className="text-lg font-neue-montreal mb-8">Subscribe to our newsletter for the latest AI insights and updates.</p>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center md:space-x-2">
            <input 
              type="email" 
              placeholder="Enter your email"
              className={`bg-transparent border rounded-md py-2 md:py-4 px-4 text-lg font-neue-montreal focus:outline-none focus:ring-2 w-full mb-2 md:mb-0 ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-[var(--color-primary)] focus:ring-[var(--color-primary)]'}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(null); // Clear error on change
              }}
            />
            <button 
              type="submit" 
              className="text-lg py-2 md:py-1 px-10 rounded-md cursor-pointer transition-colors duration-300 border border-white relative overflow-hidden w-full md:w-auto"
              onMouseEnter={() => handleMouseEnter(cta3TextRef, cta3HoverTextRef)}
              onMouseLeave={() => handleMouseLeave(cta3TextRef, cta3HoverTextRef)}
            >
              <span ref={cta3TextRef} className="inline-block">Sign Up</span>
              <span ref={cta3HoverTextRef} className="absolute inset-0 flex items-center justify-center translate-y-full opacity-0">Sign Up</span>
            </button>
          </form>
          {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
        </section>
      </div>
    </main>
  );
};

export default ContactPage;