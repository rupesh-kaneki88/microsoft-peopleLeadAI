'use client';

import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' }, // Added Home link
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Resources', href: '/resources' },
  { name: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Using Maps to store refs dynamically for desktop and mobile links
  const desktopTextRefs = useRef<Map<string, HTMLSpanElement | null>>(new Map());
  const desktopHoverTextRefs = useRef<Map<string, HTMLSpanElement | null>>(new Map());
  const mobileTextRefs = useRef<Map<string, HTMLSpanElement | null>>(new Map());
  const mobileHoverTextRefs = useRef<Map<string, HTMLSpanElement | null>>(new Map());

  // Ref for mobile menu container
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  // Refs for hamburger icon paths
  const line1Ref = useRef<SVGPathElement | null>(null);
  const line2Ref = useRef<SVGPathElement | null>(null);
  const line3Ref = useRef<SVGPathElement | null>(null);

  const handleMouseEnter = (textRefMap: React.MutableRefObject<Map<string, HTMLSpanElement | null>>, hoverTextRefMap: React.MutableRefObject<Map<string, HTMLSpanElement | null>>, href: string) => {
    const textElement = textRefMap.current.get(href);
    const hoverTextElement = hoverTextRefMap.current.get(href);
    if (textElement && hoverTextElement) {
      gsap.to(textElement, { y: -20, opacity: 0, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(hoverTextElement, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleMouseLeave = (textRefMap: React.MutableRefObject<Map<string, HTMLSpanElement | null>>, hoverTextRefMap: React.MutableRefObject<Map<string, HTMLSpanElement | null>>, href: string) => {
    const textElement = textRefMap.current.get(href);
    const hoverTextElement = hoverTextRefMap.current.get(href);
    if (textElement && hoverTextElement) {
      gsap.to(textElement, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(hoverTextElement, { y: 20, opacity: 0, duration: 0.3, ease: "power2.out" });
    }
  };

  // Animation for mobile menu slide-in/out
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(mobileMenuRef.current, { x: "100%", duration: 0.3, ease: "power2.out" });
      }
    }
  }, [isMobileMenuOpen]);

  // Animation for hamburger to cross
  useEffect(() => {
    if (line1Ref.current && line2Ref.current && line3Ref.current) {
      if (isMobileMenuOpen) {
        gsap.to(line1Ref.current, { attr: { d: "M6 18L18 6" }, duration: 0.3, ease: "power2.out" });
        gsap.to(line2Ref.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(line3Ref.current, { attr: { d: "M6 6l12 12" }, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(line1Ref.current, { attr: { d: "M4 6h16" }, duration: 0.3, ease: "power2.out" });
        gsap.to(line2Ref.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(line3Ref.current, { attr: { d: "M4 18h16" }, duration: 0.3, ease: "power2.out" });
      }
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname]);

  const renderNavLink = (item: NavItem, isMobile: boolean) => {
    const textRefMap = isMobile ? mobileTextRefs : desktopTextRefs;
    const hoverTextRefMap = isMobile ? mobileHoverTextRefs : desktopHoverTextRefs;
    
    // Determine active link styling
    const isActive = pathname === item.href || (item.href === '/' && pathname === '/');
    const activeColorClass = isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary)]';

    const linkClasses = `relative overflow-hidden ${activeColorClass} hover:text-[var(--color-primary)] transition-colors duration-300 font-helvetica-neue ${isMobile ? 'text-xl py-2 w-full flex items-center justify-center' : 'py-4 px-10 inline-flex items-center justify-center'}`;

    return (
      <Link
        key={item.href}
        href={item.href}
        className={linkClasses}
        onMouseEnter={() => handleMouseEnter(textRefMap, hoverTextRefMap, item.href)}
        onMouseLeave={() => handleMouseLeave(textRefMap, hoverTextRefMap, item.href)}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
      >
        <span ref={el => { textRefMap.current.set(item.href, el); }} className="absolute inset-0 flex items-center justify-center" aria-hidden="true">{item.name}</span>
        <span ref={el => { hoverTextRefMap.current.set(item.href, el); }} className="absolute inset-0 flex items-center justify-center translate-y-full opacity-0">{item.name}</span>
      </Link>
    );
  };

  return (
    <nav role="navigation" className="fixed top-0 left-0 w-full z-50 p-4 bg-[var(--color-background)] bg-opacity-80 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/PeopleLead-AI-Logo-1.png"
            alt="PeopleLead-AI Logo"
            width={150}
            height={35}
            className="mr-2"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          {navItems.map(item => renderNavLink(item, false))}
        </div>

        {/* Mobile Menu Button (outside the sliding menu) */}
        <button
          className="md:hidden text-[var(--color-secondary)] focus:outline-none z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={line1Ref}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16"
            ></path>
            <path
              ref={line2Ref}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 12h16"
            ></path>
            <path
              ref={line3Ref}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`fixed top-0 right-0 h-screen w-64 bg-[var(--color-background)] bg-opacity-95 backdrop-blur-sm shadow-lg transform translate-x-full md:hidden z-40`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col items-center space-y-8 pt-20">
          {navItems.map(item => renderNavLink(item, true))}
        </div>

        {/* Mobile Menu Footer Links */}
        <div className="absolute bottom-0 w-full p-4 text-center">
          <p className="text-[var(--color-secondary)] text-sm">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link> | <Link href="/terms" className="hover:underline">Terms of Service</Link>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
