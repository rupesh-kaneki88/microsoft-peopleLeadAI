'use client';

import React from 'react';

const PrivacyPage = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="w-full bg-[var(--color-background)] text-[var(--color-secondary)] mb-4 md:mb-24 md:mx-8 mt-24 md:mt-28">
      <div className="max-w-4xl mx-4 md:mx-auto text-left">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--color-primary)] font-primary leading-tight">
          Privacy Policy
        </h1>
        <p className="text-lg md:text-xl leading-relaxed font-urbanist text-gray-300 mb-8">
          Last Updated: September 2, 2025
        </p>
        <div className="prose prose-invert max-w-none">
          <p className="mb-4">At PeopleLead.AI, your privacy is a top priority. This policy outlines our commitment to protecting your personal information and being transparent about how we handle it.</p>
          
          <h3 id="info-we-collect" className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary)] font-primary leading-tight">Information We Collect</h3>
          <p className="mb-4">We collect information to provide and improve our services to you.</p>
          <h4 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-primary)] font-primary leading-tight">Information You Provide Directly</h4>
          <p className="mb-4">This includes personal information you voluntarily give us when you interact with our platform, such as when you create an account, subscribe to our newsletter, or contact customer support. This information may include your name, email address, and any professional details you choose to share.</p>
          <h4 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-primary)] font-primary leading-tight">Information We Collect Automatically</h4>
          <p className="mb-4">When you use our services, we automatically collect certain data about your device and how you interact with our platform. This data helps us analyze usage patterns and improve the user experience. This includes your IP address, browser type, operating system, and information about the features you use and the pages you visit.</p>
          <div className="mt-8">
            <a href="#top" onClick={scrollToTop} className="text-lg md:text-xl underline cursor-pointer font-urbanist text-[var(--color-primary)]">
              Back to Top
            </a>
          </div>

          <hr className="my-8 border-gray-700" />

          <h3 id="how-we-use-info" className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary)] font-primary leading-tight">How We Use Information</h3>
          <p className="mb-4">We use the information we collect for the following purposes:</p>
          <ul className="list-disc list-inside mb-4">
            <li>To Deliver Our Services: To provide you with our AI-powered leadership tools and manage your account.</li>
            <li>To Communicate With You: To send you important updates about your account, security alerts, and customer support messages. We may also send you promotional emails, which you can opt out of at any time.</li>
            <li>To Improve Our Offerings: We analyze usage data to understand how our users interact with our platform. This allows us to enhance existing features, develop new ones, and personalize your experience.</li>
          </ul>
          <div className="mt-8">
            <a href="#top" onClick={scrollToTop} className="text-lg md:text-xl underline cursor-pointer font-urbanist text-[var(--color-primary)]">
              Back to Top
            </a>
          </div>

          <hr className="my-8 border-gray-700" />

          <h3 id="how-we-share-info" className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary)] font-primary leading-tight">Sharing Information</h3>
          <p className="mb-4">We will never sell or rent your personal data. Information is only shared in the following limited circumstances:</p>
          <ul className="list-disc list-inside mb-4">
            <li>With Trusted Service Providers: We may share your data with third-party vendors and service providers who perform services on our behalf (e.g., data hosting, analytics, customer support). These providers are contractually bound to protect your data and are only permitted to use it to perform the services we&#39;ve requested.</li>
            <li>For Legal Reasons: We may be required to disclose your information if legally compelled to do so, such as in response to a court order or subpoena, or if we believe it&#39;s necessary to protect our rights or the safety of our users.</li>
          </ul>
          <div className="mt-8">
            <a href="#top" onClick={scrollToTop} className="text-lg md:text-xl underline cursor-pointer font-urbanist text-[var(--color-primary)]">
              Back to Top
            </a>
          </div>

          <hr className="my-8 border-gray-700" />

          <h3 id="privacy-rights" className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary)] font-primary leading-tight">Your Rights</h3>
          <p className="mb-4">You have control over your personal data. You may request to:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Access, Correct, or Delete Your Data: You can request a copy of the personal information we hold about you and ask us to correct or delete it from our systems.</li>
            <li>Manage Communications: You can opt out of receiving promotional emails from us at any time by following the unsubscribe instructions in the emails.</li>
          </ul>
          <p className="mb-4">To exercise any of these rights, please email us at contact@peoplelead.ai.</p>
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

export default PrivacyPage;