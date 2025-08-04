'use client';

import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 bg-[var(--color-background)] bg-opacity-80 backdrop-blur-sm shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[var(--color-primary)] font-secondary">
          PeopleLead.AI
        </Link>
        <div className="space-x-6">
          <Link href="/services" className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 font-helvetica-neue">
            Services
          </Link>
          <Link href="/about" className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 font-helvetica-neue">
            About
          </Link>
          <Link href="/resources" className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 font-helvetica-neue">
            Resources
          </Link>
          <Link href="/contact" className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 font-helvetica-neue">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;