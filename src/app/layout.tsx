import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from "gsap/all";
import ScrollToTop from "../components/ScrollToTop"; // Import the new component

gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother);


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PeopleLead AI",
  description: "Human-led. AI-fueled",
};

import { ThemeProvider } from "../providers/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <ThemeProvider>
          <ScrollToTop />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
