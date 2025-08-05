'use client';

import React from 'react';

const ServicesPage: React.FC = () => {
  const serviceAreas = [
    {
      title: 'AI Readiness & Strategy',
      svg: '/AI-strategy.svg',
      description: 'We work with you to define your goals, identify meaningful AI use cases, and build a roadmap that aligns with your people and processes.',
    },
    {
      title: 'Conversational AI & Chatbots',
      svg: '/chatbot.svg',
      description: 'Designing smart, human-centered chatbots that reflect your brand voice and support users with clarity and care.',
    },
    {
      svg: '/accessibility.svg',
      title: 'Inclusive & Accessible AI',
      description: 'From design reviews to user testing, we ensure your AI solutions work for everyone — including people with disabilities.',
    },
    {
      svg: '/practice.svg',
      title: 'Responsible AI Practices',
      description: 'We guide your team through principles, governance, and implementation to ensure ethical, bias-aware AI.',
    },
    {
      svg: '/workshop.svg',
      title: 'Custom AI Enablement Workshops',
      description: 'Upskill your teams through tailored sessions that demystify AI and spark collaboration.',
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-secondary)] mb-4 mx-4 md:4 mt-22 md:mt-20">
      <section className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-primary)] font-secondary">Our Services</h1>
        <p className="text-xl font-helvetica-neue">
          Our services are designed to amplify what your people do best — with thoughtful, ethical, and effective AI.
        </p>
      </section>

      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {serviceAreas.map((service, index) => (
            <div
              key={index}
              className={`relative group ${
                index === serviceAreas.length - 1 ? 'md:col-span-2' : ''
              }`}
              style={{ perspective: '700px' }}
            >
              {/* <div className="absolute inset-0 bg-[var(--color-primary)] rounded-lg transform transition-transform duration-300 group-hover:rotate-0"></div> */}
              <div
                className="relative bg-gradient-to-r from-[#16161A] from-100% to-transparent text-white p-8 rounded-2xl shadow-lg h-full min-h-[250px] transform transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              >
                <img
                  src={service.svg}
                  alt={`${service.title} icon`}
                  className="absolute bottom-0 right-0 w-48 h-48 opacity-25"
                />
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-semibold mb-4 md:mb-8 text-[var(--color-primary)] font-primary text-center">{service.title}</h2>
                  <p className="font-helvetica-neue text-center opacity-80">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;