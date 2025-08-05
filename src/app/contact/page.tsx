import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <main className="min-h-screen py-16 px-4 bg-[var(--color-background)] text-[var(--color-secondary)]">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-[var(--color-primary)] font-secondary">Contact Us</h1>
        <p className="text-xl font-helvetica-neue mb-8">
          Let’s talk about how AI can help your people do their best work.
        </p>

        <div className="space-y-4 mb-8">
          <button className="text-xl py-3 px-8 rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-700"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-secondary)', fontFamily: 'var(--font-helvetica-neue)' }}
          >
            Book a Free Consult
          </button>
          <p className="text-lg font-helvetica-neue">
            <a href="mailto:contact@peoplelead.ai" className="text-[var(--color-primary)] hover:underline">Email Us</a>
          </p>
          <p className="text-lg font-helvetica-neue">
            <button type="button" className="text-[var(--color-primary)] hover:underline">Sign Up for Our Newsletter</button>
          </p>
        </div>

        <p className="text-lg font-helvetica-neue">
          Prefer to talk directly? Reach out at <a href="mailto:contact@peoplelead.ai" className="text-[var(--color-primary)] hover:underline">contact@peoplelead.ai</a>
        </p>
      </section>
    </main>
  );
};

export default ContactPage;
