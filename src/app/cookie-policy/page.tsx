'use client';

import React from 'react';

const CookiePolicyPage = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="w-full min-h-screen bg-[var(--color-background)] text-[var(--color-secondary)] mb-4 md:mb-24 md:mx-8 mt-24 md:mt-28">
      <div className="max-w-4xl mx-4 md:mx-auto text-left">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--color-primary)] font-primary leading-tight">
          Cookie Policy
        </h1>
        <div className="prose prose-invert max-w-none">
          <p className="mb-4">This policy explains how and why PeopleLead.AI uses cookies and other similar technologies on our website.</p>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary)] font-primary leading-tight">What Are Cookies and How We Use Them</h3>
          <p className="mb-4">Cookies are small text files that are placed on your device by a website you visit. They are widely used to make websites work more efficiently and to provide a better browsing experience. We use cookies for a few key reasons:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Improved Performance: Cookies help us optimize our site's performance and load times.</li>
            <li>Traffic Analysis: We use cookies to analyze website traffic, which helps us understand how our users interact with our platform and improve our services.</li>
            <li>Enhanced Browsing: Cookies allow us to remember your preferences and enhance your browsing experience, such as keeping you logged in.</li>
          </ul>
          <div className="mt-8">
            <a href="#top" onClick={scrollToTop} className="text-lg md:text-xl underline cursor-pointer font-urbanist text-[var(--color-primary)]">
              Back to Top
            </a>
          </div>

          <hr className="my-8 border-gray-700" />

          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary)] font-primary leading-tight">Your Choices</h3>
          <p className="mb-4">You have the ability to manage your cookie preferences through your web browser settings. Please note that if you disable cookies, some features of our website may not function as intended.</p>
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

export default CookiePolicyPage;