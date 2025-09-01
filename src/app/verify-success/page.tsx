import React from 'react';
import Link from 'next/link';

const VerifySuccessPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-background)] text-[var(--color-secondary)] p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: '#10e98d' }}>
          You have been verified!
        </h1>
        <p className="text-lg mb-8">Thank you for verifying your email address.</p>
        <Link href="/" className="mt-8 px-6 py-3 rounded-md bg-[var(--color-primary)] text-white font-helvetica-neue hover:bg-blue-700 transition-colors">
          Go to Home
        </Link>
      </div>
    </main>
  );
};

export default VerifySuccessPage;