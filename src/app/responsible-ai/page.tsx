'use client';

import React from 'react';

const ResponsibleAIPage = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="w-full min-h-screen bg-[var(--color-background)] text-[var(--color-secondary)] mb-4 md:mb-24 md:mx-8 mt-24 md:mt-28">
      <div className="max-w-4xl mx-4 md:mx-auto text-left">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--color-primary)] font-primary leading-tight">
          Responsible AI Statement
        </h1>
        <div className="prose prose-invert max-w-none">
          <p className="mb-4">At PeopleLead.AI, we believe AI should amplify human potential—not replace it. Our mission is to build AI that is trustworthy, safe, and beneficial.</p>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary)] font-primary leading-tight">Our Commitments to Responsible AI</h3>
          <p className="mb-4">We are dedicated to the responsible development and deployment of our AI solutions. Our core principles are:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Transparency: We are transparent about what our AI systems do and how they work. We will clearly communicate the capabilities and limitations of our tools.</li>
            <li>Fairness: We are committed to building AI that is fair and minimizes bias. We take proactive steps to promote equitable outcomes and avoid unfair discrimination.</li>
            <li>Privacy: The privacy of our users' data is paramount. We build our AI systems with data protection at their core, ensuring all client and user data is safeguarded.</li>
            <li>Accessibility: We ensure our AI solutions are inclusive and usable by everyone, including those with disabilities.</li>
            <li>Accountability: We take responsibility for the AI guidance and systems we provide. We have internal processes to review and address any issues that arise from our AI's performance.</li>
          </ul>
          <div className="mt-8">
            <a href="#top" onClick={scrollToTop} className="text-lg md:text-xl underline cursor-pointer font-urbanist text-[var(--color-primary)]">
              Back to Top
            </a>
          </div>

          <hr className="my-8 border-gray-700" />

          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary)] font-primary leading-tight">Your Role</h3>
          <p className="mb-4">We encourage all clients and users to use our AI tools responsibly, respecting people’s rights, dignity, and privacy. The human element of leadership is irreplaceable, and our AI is designed to be a supportive partner, not a final decision-maker.</p>
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

export default ResponsibleAIPage;