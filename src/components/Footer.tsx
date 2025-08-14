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
          <Link href="/">
            <Image src="/PeopleLead-AI-Logo-1.png" alt="PeopleLead AI Logo" width={150} height={50} />
          </Link>
        </div>
        <div className="flex items-center justify-center font-helvetica-neue  text-[var(--color-primary)]">
          <Link
            href="https://www.microsoft.com/en-us/legal/terms-of-use"
            className="relative overflow-hidden text-lg py-2 px-4 cursor-pointer mx-2"
            onMouseEnter={() => handleMouseEnter(termsTextRef, termsHoverTextRef)}
            onMouseLeave={() => handleMouseLeave(termsTextRef, termsHoverTextRef)}
          >
            <span ref={termsTextRef} className="flex items-center justify-center pl-20">Terms</span>
            <span ref={termsHoverTextRef} className="absolute inset-0 flex items-center justify-center opacity-0 pl-20" aria-hidden="true">Terms</span>
          </Link>
          <span className="mx-2">|</span>
          <Link
            href="https://www.microsoft.com/en-us/privacy/privacystatement"
            className="relative overflow-hidden text-lg py-2 px-4 cursor-pointer mx-2"
            onMouseEnter={() => handleMouseEnter(privacyTextRef, privacyHoverTextRef)}
            onMouseLeave={() => handleMouseLeave(privacyTextRef, privacyHoverTextRef)}
          >
            <span ref={privacyTextRef} className="flex items-center justify-center">Privacy Statement</span>
            <span ref={privacyHoverTextRef} className="absolute inset-0 flex items-center justify-center opacity-0" aria-hidden="true">Privacy Statement</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;