'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.to(buttonRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(buttonRef.current, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: 0 },
      ease: 'power2.inOut',
      onComplete: () => {
        const body = document.body;
        body.tabIndex = -1;
        body.focus();
        body.addEventListener('blur', () => {
          body.removeAttribute('tabIndex');
        }, { once: true });
      }
    });
  };

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
  };

  return (
    <button
      ref={buttonRef}
      className={`scroll-to-top fixed right-3 bottom-4 md:bottom-8 md:right-8 p-4 rounded-full bg-transparent border border-white text-white shadow-lg transition-transform transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] cursor-pointer`}
      onClick={scrollToTop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: 0 }}
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="md:h-6 md:w-6 h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;