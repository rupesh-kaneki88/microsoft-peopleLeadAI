'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useLoading } from '@/providers/LoadingProvider';

interface AnimatedLinkProps {
  href: string;
  text: string;
  isMobile?: boolean;
  onClick: () => void;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({ href, text, isMobile, onClick }) => {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const hoverTextRef = useRef<HTMLSpanElement | null>(null);

  const handleMouseEnter = () => {
    if (textRef.current && hoverTextRef.current && !isMobile) {
      gsap.to(textRef.current, { y: -20, opacity: 0, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(hoverTextRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (textRef.current && hoverTextRef.current && !isMobile) {
      gsap.to(textRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(hoverTextRef.current, { y: 20, opacity: 0, duration: 0.3, ease: 'power2.out' });
    }
  };

  return (
    <Link
      href={href}
      aria-label={text}
      className="relative text-lg py-2 px-4 cursor-pointer mx-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <span className="invisible" aria-hidden="true">{text}</span>
      <span ref={textRef} className="absolute inset-0 flex items-center justify-center" aria-hidden="true">{text}</span>
      <span ref={hoverTextRef} className="absolute inset-0 flex items-center justify-center opacity-0" aria-hidden="true">{text}</span>
    </Link>
  );
};


const Footer: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { showLoading } = useLoading();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const links = [
    { href: "/terms", text: "Terms of Use" },
    { href: "/privacy", text: "Privacy Policy" },
    { href: "/accessibility", text: "Accessibility" },
    { href: "/cookie-policy", text: "Cookie Policy" },
    { href: "/disclaimer", text: "Disclaimer" },
    { href: "/responsible-ai", text: "Responsible AI" },
    { href: "/contact", text: "Contact Us" },
  ];

  return (
    <footer className="bg-black text-white mb-2 border-t border-gray-700 py-2">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="mb-2">
          <Link href="/" aria-label='PeopleLead AI Home'>
            <Image src="/PeopleLead-AI-Logo-1.png" alt="PeopleLead AI Logo" width={150} height={50} />
          </Link>
        </div>
        <div className="w-full md:w-auto">
          {isMobile ? (
            <ul className="grid grid-cols-2 mb-8 gap-x-4 font-urbanist text-[var(--color-primary)]">
              {links.map((link) => (
                <li key={link.href} className="py-1 text-center">
                  <Link href={link.href} className="text-lg py-2 px-4" onClick={showLoading}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="flex flex-row items-center justify-center font-urbanist text-[var(--color-primary)] mb-8 flex-wrap">
              {links.map((link, index) => (
                <React.Fragment key={link.href}>
                  <li><AnimatedLink href={link.href} text={link.text} isMobile={isMobile} onClick={showLoading} /></li>
                  {index < links.length - 1 && <span className="mx-2">|</span>}
                </React.Fragment>
              ))}
            </ul>
          )}
        </div>
        <div className='text-sm text-gray-400'>
          <p>© 2025 PeopleLead.AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;