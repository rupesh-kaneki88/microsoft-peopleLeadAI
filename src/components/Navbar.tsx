'use client';

import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // Import ScrollToPlugin

gsap.registerPlugin(ScrollToPlugin); // Register it here
import { usePathname } from 'next/navigation';
import { useLoading } from '@/providers/LoadingProvider';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/#services' },
  { name: 'About', href: '/#about' },
  { name: 'Resources', href: '/#resources' },
  { name: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // New state for client-side check
  const pathname = usePathname();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    hideLoading();
  }, [pathname, hideLoading]);

  useEffect(() => {
    setIsClient(true); // Set to true once component mounts on client
  }, []);

  const desktopTextRefs = useRef<Map<string, HTMLSpanElement | null>>(new Map());
  const desktopHoverTextRefs = useRef<Map<string, HTMLSpanElement | null>>(new Map());
  const mobileTextRefs = useRef<Map<string, HTMLSpanElement | null>>(new Map());
  const mobileHoverTextRefs = useRef<Map<string, HTMLSpanElement | null>>(new Map());
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<SVGPathElement | null>(null);
  const line2Ref = useRef<SVGPathElement | null>(null);
  const line3Ref = useRef<SVGPathElement | null>(null);

  const handleMouseEnter = (textRefMap: React.MutableRefObject<Map<string, HTMLSpanElement | null>>, hoverTextRefMap: React.MutableRefObject<Map<string, HTMLSpanElement | null>>, href: string) => {
    if (!isClient || window.innerWidth < 768) return; // Use isClient
    const textElement = textRefMap.current.get(href);
    const hoverTextElement = hoverTextRefMap.current.get(href);
    if (textElement && hoverTextElement) {
      gsap.to(textElement, { y: -20, opacity: 0, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(hoverTextElement, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleMouseLeave = (textRefMap: React.MutableRefObject<Map<string, HTMLSpanElement | null>>, hoverTextRefMap: React.MutableRefObject<Map<string, HTMLSpanElement | null>>, href: string) => {
    if (!isClient || window.innerWidth < 768) return; // Use isClient
    const textElement = textRefMap.current.get(href);
    const hoverTextElement = hoverTextRefMap.current.get(href);
    if (textElement && hoverTextElement) {
      gsap.to(textElement, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(hoverTextElement, { y: 20, opacity: 0, duration: 0.3, ease: "power2.out" });
    }
  };

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(mobileMenuRef.current, { x: "100%", duration: 0.3, ease: "power2.out" });
      }
    }
  }, [isMobileMenuOpen]);

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname]);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isMobile: boolean) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        gsap.to(window, {
          duration: 0.3, // "Little heavy" scroll duration
          scrollTo: {
            y: element.offsetTop,
            autoKill: false
          },
          ease: "power2.out" // Smooth easing
        });
      }
    } else if (href === '/') { // Handle Home link specifically
      e.preventDefault();
      gsap.to(window, {
        scrollTo: {
          y: 0, // Scroll to the very top
          autoKill: false
        },
        ease: "none" // No easing for instant scroll
      });
    } else if (pathname !== href) { // Only show loading if navigating to a different page
      showLoading();
    }
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const renderNavLink = (item: NavItem, isMobile: boolean) => {
    const textRefMap = isMobile ? mobileTextRefs : desktopTextRefs;
    const hoverTextRefMap = isMobile ? mobileHoverTextRefs : desktopHoverTextRefs;
    const isActive = isClient && (pathname === item.href || (item.href.startsWith('/#') && pathname === '/' && window.location.hash === item.href.substring(1))); // Use isClient
    const activeColorClass = 'text-[var(--color-secondary)]';
    const linkClasses = `relative overflow-hidden ${activeColorClass} hover:text-[var(--color-primary)] transition-colors duration-300 font-urbanist ${isMobile ? 'text-xl py-3 w-full flex items-center justify-center' : 'py-4 px-10 inline-flex items-center justify-center'}`;

    return (
      <Link
        key={item.href}
        href={item.href}
        className={linkClasses}
        onMouseEnter={() => handleMouseEnter(textRefMap, hoverTextRefMap, item.href)}
        onMouseLeave={() => handleMouseLeave(textRefMap, hoverTextRefMap, item.href)}
        onClick={(e) => handleNavLinkClick(e, item.href, isMobile)}
      >
        <span ref={el => { textRefMap.current.set(item.href, el); }} className="absolute inset-0 flex items-center justify-center">{item.name}</span>
        <span ref={el => { hoverTextRefMap.current.set(item.href, el); }} className="absolute inset-0 flex items-center justify-center translate-y-full opacity-0" aria-hidden="true">{item.name}</span>
      </Link>
    );
  };

  return (
    <nav className="fixed top-4 left-1/2 w-[95%] sm:w-auto transform -translate-x-1/2 z-50 py-3 px-6 bg-[var(--color-background)] bg-transparent backdrop-blur-sm shadow-lg md:max-w-7xl rounded-lg border border-gray-800" >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center" onClick={(e) => handleNavLinkClick(e, '/', false)}>
          <Image
            src="/PeopleLead-AI-Logo-1.png"
            alt="PeopleLead-AI Logo"
            width={150}
            height={35}
            className="mr-2"
          />
        </Link>

        <div className="hidden md:flex space-x-4">
          {navItems.map(item => renderNavLink(item, false))}
        </div>

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

      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`fixed -top-4 -right-6 h-screen w-64 bg-[var(--color-background)] bg-opacity-70 backdrop-blur-md shadow-lg transform translate-x-full md:hidden z-40`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col items-center space-y-8 pt-20">
          {navItems.map(item => renderNavLink(item, true))}
        </div>

        <div className="absolute bottom-4 w-full p-4 text-center font-urbanist">
          <p className="text-[var(--color-secondary)] text-sm">
            <Link href="https://www.microsoft.com/en-us/privacy/privacystatement" className="hover:underline">Privacy Statement</Link> | <Link href="https://www.microsoft.com/en-us/legal/terms-of-use" className="hover:underline">Terms</Link>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;