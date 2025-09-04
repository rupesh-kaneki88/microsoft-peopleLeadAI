'use client';

import React from 'react';

const AccessibilityPage = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="w-full min-h-screen bg-[var(--color-background)] text-[var(--color-secondary)] mb-4 md:mb-24 md:mx-8 mt-24 md:mt-28">
      <div className="max-w-4xl mx-4 md:mx-auto text-left">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--color-primary)] font-primary leading-tight">
          Accessibility Statement
        </h1>
        <div className="prose prose-invert max-w-none">
          <p className="mb-4">PeopleLead.AI is committed to ensuring digital accessibility for everyone, including people with disabilities. We believe everyone should have a great experience using our services.</p>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary)] font-primary leading-tight">Our Efforts to Ensure Accessibility</h3>
          <p className="mb-4">We are actively working to increase the accessibility and usability of our platform and strive to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. Our efforts include:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Regular Audits: We conduct regular reviews of our site and services to identify and address accessibility barriers, ensuring we are making consistent progress.</li>
            <li>Accessible Design: We design our user interface with accessibility in mind, including proper color contrast, keyboard navigation, and screen reader compatibility. This is an integral part of our development process.</li>
          </ul>
          <div className="mt-8">
            <a href="#top" onClick={scrollToTop} className="text-lg md:text-xl underline cursor-pointer font-urbanist text-[var(--color-primary)]">
              Back to Top
            </a>
          </div>

          <hr className="my-8 border-gray-700" />

          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary)] font-primary leading-tight">Feedback</h3>
          <p className="mb-4">Accessibility is an ongoing process. If you encounter any accessibility issues or have suggestions on how we can improve, please contact us. We value your feedback and will do our best to address your concerns promptly.</p>
          <p className="mb-2">Email: <a href="mailto:contact@peoplelead.ai" className="text-[var(--color-primary)] font-bold hover:underline">contact@peoplelead.ai</a></p>
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

export default AccessibilityPage;