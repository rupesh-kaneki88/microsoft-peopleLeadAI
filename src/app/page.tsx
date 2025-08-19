'use client';

import React from 'react';
import HeroSection from "../components/HeroSection";
import ValuePropositions from "../components/ValuePropositions";
import HowItWorks from "../components/HowItWorks";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import PopularContent from "../components/PopularContent";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ValuePropositions />
      <HowItWorks />

      <section id="services">
        <ServicesSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="resources">
        <PopularContent />
      </section>
    </main>
  );
}