'use client';

import React from 'react';

const TermsPage = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="w-full min-h-screen bg-[var(--color-background)] text-[var(--color-secondary)] mb-4 md:mb-24 md:mx-8 mt-24 md:mt-28">
      <div className="max-w-4xl mx-4 md:mx-auto text-left">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--color-primary)] font-primary leading-tight">
          Terms of Use
        </h1>
        <div className="prose prose-invert max-w-none">
          <p className="mb-4">By accessing or using the PeopleLead.AI website and services, you agree to be bound by these terms. If you do not agree, please do not use our services.</p>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary)] font-primary leading-tight">Use of Content and Intellectual Property</h3>
          <p className="mb-4">All materials, including text, images, logos, and software, are the exclusive property of PeopleLead.AI or its licensors unless otherwise stated. This content is protected by copyright and other intellectual property laws.</p>
          <ul className="list-disc list-inside mb-4">
            <li>You may not reproduce, distribute, or create derivative works from our content without our express written permission.</li>
            <li>You may use the content solely for your personal, non-commercial use, in line with the intended purpose of our services.</li>
          </ul>
          <div className="mt-8">
            <a href="#top" onClick={scrollToTop} className="text-lg md:text-xl underline cursor-pointer font-urbanist text-[var(--color-primary)]">
              Back to Top
            </a>
          </div>

          <hr className="my-8 border-gray-700" />

          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary)] font-primary leading-tight">Limitation of Liability</h3>
          <p className="mb-4">Our website and services are provided “as is” and “as available.” We make no warranties or guarantees, express or implied, regarding their operation or availability.</p>
          <p className="mb-4">PeopleLead.AI is not liable for any direct, indirect, incidental, or consequential damages resulting from your use of, or inability to use, our site or services. This includes any loss of data, profits, or business interruption.</p>
          <p className="mb-4">While we strive to provide accurate information, we do not guarantee the completeness or accuracy of any content on our site.</p>
          <div className="mt-8">
            <a href="#top" onClick={scrollToTop} className="text-lg md:text-xl underline cursor-pointer font-urbanist text-[var(--color-primary)]">
              Back to Top
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsPage;