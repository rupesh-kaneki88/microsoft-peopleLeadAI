import React from 'react';

const ValuePropositions: React.FC = () => {
  const propositions = [
    { title: 'Empower your people with AI', description: 'Leverage AI to augment human capabilities, not replace them.' },
    { title: 'Built for inclusivity and impact', description: 'AI solutions designed with accessibility and ethical considerations at their core.' },
    { title: 'Trusted experts in AI strategy', description: 'Guidance from seasoned professionals to navigate your AI journey.' },
    { title: 'Simple, actionable solutions', description: 'Practical AI implementations that deliver tangible results.' },
  ];

  return (
    <section className="py-16 px-4 bg-[#040c23] text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-[var(--color-primary)] font-secondary">Our Value Propositions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {propositions.map((prop, index) => (
            <div key={index} className="bg-white text-[var(--color-background)] p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold mb-3 font-primary">{prop.title}</h3>
              <p className="text-gray-700 font-helvetica-neue">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositions;
