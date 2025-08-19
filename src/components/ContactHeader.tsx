'use client';

import Link from 'next/link';
import React from 'react';
import { useLoading } from '@/providers/LoadingProvider'; // Import useLoading

const ContactHeader: React.FC = () => {
  const { showLoading } = useLoading(); // Get showLoading

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 bg-[var(--color-background)] bg-opacity-60 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 text-lg font-semibold"
          onClick={showLoading} // Call showLoading on click
        >
          &larr; Back to Home
        </Link>
      </div>
    </header>
  );
};

export default ContactHeader;