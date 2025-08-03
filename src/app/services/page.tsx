import React from 'react';

const ServicesPage: React.FC = () => {
  const serviceAreas = [
    {
      title: 'AI Readiness & Strategy',
      description: 'We work with you to define your goals, identify meaningful AI use cases, and build a roadmap that aligns with your people and processes.',
    },
    {
      title: 'Conversational AI & Chatbots',
      description: 'Designing smart, human-centered chatbots that reflect your brand voice and support users with clarity and care.',
    },
    {
      title: 'Inclusive & Accessible AI',
      description: 'From design reviews to user testing, we ensure your AI solutions work for everyone — including people with disabilities.',
    },
    {
      title: 'Responsible AI Practices',
      description: 'We guide your team through principles, governance, and implementation to ensure ethical, bias-aware AI.',
    },
    {
      title: 'Custom AI Enablement Workshops',
      description: 'Upskill your teams through tailored sessions that demystify AI and spark collaboration.',
    },
  ];

  return (
    <main className="min-h-screen py-16 px-4 bg-[var(--color-background)] text-[var(--color-secondary)]">
      <section className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-[var(--color-primary)] font-secondary">Our Services</h1>
        <p className="text-xl font-helvetica-neue">
          Our services are designed to amplify what your people do best — with thoughtful, ethical, and effective AI.
        </p>
      </section>

      <section className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceAreas.map((service, index) => (
          <div key={index} className="bg-[var(--color-secondary)] text-[var(--color-background)] p-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)] font-primary">{service.title}</h2>
            <p className="font-helvetica-neue">{service.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default ServicesPage;
