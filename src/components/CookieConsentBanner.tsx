'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const CookieConsent = dynamic(() => import('react-cookie-consent'), { ssr: false });

const CookieConsentBanner = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerRef.current) {
      bannerRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={bannerRef}
      tabIndex={-1}
      role="dialog" // ✅ Move role here instead
      aria-describedby="cookie-banner-desc"
    >
      <CookieConsent
        location="bottom"
        buttonText="I understand"
        cookieName="user-understands-cookies"
        style={{ background: "#040c23", color: "#ffffff", padding: "1rem" }}
        buttonClasses="text-lg md:text-xl py-3 px-6 rounded-md cursor-pointer font-urbanist transition-colors duration-300 hover:bg-blue-700"
        buttonStyle={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-secondary)',
        }}
        expires={150}
        ariaAcceptLabel="I understand, close the cookie banner"
        onAccept={() => {
          // Move focus back to the body after accepting
          document.body.focus();
        }}
      >
        <div id="cookie-banner-desc">
          This website uses cookies to enhance the user experience.{" "}
          <a
            href="/cookie-policy"
            style={{ color: "#108de9" }}
          >
            Learn more
          </a>
        </div>
      </CookieConsent>
    </div>
  );
};

export default CookieConsentBanner;
