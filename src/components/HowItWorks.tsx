import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    { title: 'Discover your needs', description: 'We start by understanding your unique challenges and goals.' },
    { title: 'Design the right AI approach', description: 'Tailoring AI solutions that align with your people and processes.' },
    { title: 'Deliver results with people in mind', description: 'Implementing AI that enhances human potential and drives impact.' },
  ];

  return (
    <section className="py-16 px-4 bg-white text-[#040c23]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-[var(--color-primary)] font-secondary">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="p-6 rounded-lg shadow-lg bg-white text-[var(--color-background)]">
              <div className="text-5xl font-bold text-[var(--color-primary)] mb-4">{index + 1}.</div>
              <h3 className="text-2xl font-semibold mb-3 font-primary">{step.title}</h3>
              <p className="text-gray-700 font-helvetica-neue">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
