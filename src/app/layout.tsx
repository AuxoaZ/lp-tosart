import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tosart | Apparel Design & Branding Studio",
  description: "Tosart is a creative studio specializing in apparel design, branding, and visual content production.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="scroll-smooth">
      <body className={`${syne.variable} ${jakarta.variable} font-jakarta antialiased min-h-screen bg-black text-base-content overflow-x-hidden`}>
        {/* Fixed Background Image for entire site */}
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: "url('/img/hero-background.png')" }}
        />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </body>
    </html>
  );
}
