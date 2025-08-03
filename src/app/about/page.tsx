import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen py-16 px-4 bg-[var(--color-background)] text-[var(--color-secondary)]">
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-[var(--color-primary)] font-secondary">About Us</h1>
        <p className="text-xl font-helvetica-neue mb-8">
          Our mission is simple: to help individuals and organizations harness the power of AI to enhance human potential.
        </p>
      </section>

      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-4xl font-bold mb-8 text-[var(--color-primary)] font-primary text-center">What We Believe</h2>
        <ul className="list-none space-y-4 text-lg text-center">
          <li className="font-helvetica-neue">AI should empower, not overshadow</li>
          <li className="font-helvetica-neue">People are at the center of every great solution</li>
          <li className="font-helvetica-neue">Responsible design leads to lasting change</li>
        </ul>
      </section>

      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-[var(--color-primary)] font-primary">Who We Are</h2>
        <p className="text-lg font-helvetica-neue">
          We’re a team of AI consultants, designers, and strategists who believe technology works best when it supports people. Our backgrounds span accessibility, product strategy, and responsible innovation — all driven by a commitment to people-first progress.
        </p>
      </section>
    </main>
  );
};

export default AboutPage;
