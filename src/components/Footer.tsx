'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';

const Footer: React.FC = () => {
  const termsTextRef = useRef<HTMLSpanElement | null>(null);
  const termsHoverTextRef = useRef<HTMLSpanElement | null>(null);
  const privacyTextRef = useRef<HTMLSpanElement | null>(null);
  const privacyHoverTextRef = useRef<HTMLSpanElement | null>(null);

  const handleMouseEnter = (textRef: React.RefObject<HTMLSpanElement | null>, hoverTextRef: React.RefObject<HTMLSpanElement | null>) => {
    if (textRef.current && hoverTextRef.current) {
      gsap.to(textRef.current, { y: -20, opacity: 0, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(hoverTextRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = (textRef: React.RefObject<HTMLSpanElement | null>, hoverTextRef: React.RefObject<HTMLSpanElement | null>) => {
    if (textRef.current && hoverTextRef.current) {
      gsap.to(textRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(hoverTextRef.current, { y: 20, opacity: 0, duration: 0.3, ease: 'power2.out' });
    }
  };

  return (
    <footer className="bg-black text-white mb-4 border-t">
      <div className="max-w-6xl mx-auto flex flex-col mt-4 items-center">
        <div className="mb-4">
          <Image src="/PeopleLead-AI-Logo-1.png" alt="PeopleLead AI Logo" width={150} height={50} />
        </div>
        <div className="flex items-center font-helvetica-neue  text-[var(--color-primary)]">
          <Link
            href="/terms-and-conditions"
            className="relative overflow-hidden text-lg py-2 px-4 cursor-pointer mx-2"
            onMouseEnter={() => handleMouseEnter(termsTextRef, termsHoverTextRef)}
            onMouseLeave={() => handleMouseLeave(termsTextRef, termsHoverTextRef)}
          >
            <span ref={termsTextRef} className="flex items-center justify-center">Terms & Conditions</span>
            <span ref={termsHoverTextRef} className="absolute inset-0 flex items-center justify-center opacity-0">Terms & Conditions</span>
          </Link>
          <span className="mx-2">|</span>
          <Link
            href="/privacy-policy"
            className="relative overflow-hidden text-lg py-2 px-4 cursor-pointer mx-2"
            onMouseEnter={() => handleMouseEnter(privacyTextRef, privacyHoverTextRef)}
            onMouseLeave={() => handleMouseLeave(privacyTextRef, privacyHoverTextRef)}
          >
            <span ref={privacyTextRef} className="flex items-center justify-center">Privacy Policy</span>
            <span ref={privacyHoverTextRef} className="absolute inset-0 flex items-center justify-center opacity-0">Privacy Policy</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
