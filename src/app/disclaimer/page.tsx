'use client';

import React from 'react';

const DisclaimerPage = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="w-full min-h-screen bg-[var(--color-background)] text-[var(--color-secondary)] mb-4 md:mb-24 md:mx-8 mt-24 md:mt-28">
      <div className="max-w-4xl mx-4 md:mx-auto text-left">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--color-primary)] font-primary leading-tight">
          Disclaimer
        </h1>
        <div className="prose prose-invert max-w-none">
          <p className="mb-4">The information provided on the PeopleLead.AI website is for general informational purposes only. It is not intended as professional advice.</p>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary)] font-primary leading-tight">No Guarantees</h3>
          <p className="mb-4">We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information on this website.</p>
          <div className="mt-8">
            <a href="#top" onClick={scrollToTop} className="text-lg md:text-xl underline cursor-pointer font-urbanist text-[var(--color-primary)]">
              Back to Top
            </a>
          </div>

          <hr className="my-8 border-gray-700" />

          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary)] font-primary leading-tight">Third-Party Links</h3>
          <p className="mb-4">Our website may contain links to third-party websites for your convenience. These links do not imply endorsement or responsibility for the content or privacy practices of those sites. We are not liable for any damages or injuries that arise from your use of third-party websites.</p>
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

export default DisclaimerPage;