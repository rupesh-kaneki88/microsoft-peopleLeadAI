import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "../components/NavbarWrapper"; // Changed import
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from "gsap/all";
import ScrollToTop from "../components/ScrollToTop"; // Import the new component
import Footer from "@/components/Footer";

gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother);

export const metadata: Metadata = {
  title: "PeopleLead AI",
  description: "Human-led. AI-fueled",
};

import { ThemeProvider } from "../providers/theme-provider";

import { LoadingProvider } from '@/providers/LoadingProvider';
import { Toaster } from 'sonner';
import CookieConsentBanner from '@/components/CookieConsentBanner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <ThemeProvider>
          <LoadingProvider>
            <CookieConsentBanner />
            <NavbarWrapper /> {/* Changed component */}
            {children}
            <Footer />
            <ScrollToTop />
            <Toaster />
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}