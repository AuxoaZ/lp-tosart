"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar({ media }: { media?: { whatsapp: string; instagram: string; email: string; } }) {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = media?.whatsapp || "6285904430581";
  const waUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Tosart%20Studio!%20I'm%20interested%20in%20your%20services.`;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
        <nav className="navbar bg-base-300/40 backdrop-blur-md rounded-full border border-slate-200/30 shadow-xl max-w-5xl px-6 w-full flex justify-between items-center">
          {/* Logo & Brand (Left) */}
          <div className="flex-1 lg:flex-none">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image
                  src="/img/tosart-logo.png"
                  alt="Tosart Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
              <span className="font-syne font-bold text-lg uppercase tracking-widest text-white">
                Tosart Studio
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links (Center) */}
          <div className="hidden lg:flex navbar-center">
            <ul className="menu menu-horizontal px-1 font-medium text-sm gap-2">
              <li>
                <Link
                  href="/apparel-design"
                  className="hover:text-primary transition-colors rounded-full text-white"
                >
                  Apparel Design
                </Link>
              </li>
              <li>
                <Link
                  href="/social-media-design"
                  className="hover:text-primary transition-colors rounded-full text-white"
                >
                  Social Media Design
                </Link>
              </li>
              <li>
                <Link
                  href="/video-marketing"
                  className="hover:text-primary transition-colors rounded-full text-white"
                >
                  Video Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Desktop Right / Mobile Burger Menu (Right) */}
          <div className="flex items-center gap-4">
            {/* Desktop Contact Us button */}
            <div className="hidden lg:block">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm rounded-full text-white hover:bg-white hover:text-black border-white/30"
              >
                Contact Us
              </a>
            </div>

            {/* Mobile Burger Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-ghost btn-circle lg:hidden text-white"
              aria-label="Open Menu"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[80vw] bg-base-300/95 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col shadow-2xl transition-transform duration-300 ease-out transform lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button & Brand Header */}
        <div className="flex justify-between items-center mb-10">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
            <div className="relative w-7 h-7">
              <Image
                src="/img/tosart-logo.png"
                alt="Tosart Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-syne font-bold text-base uppercase tracking-widest text-white">
              Tosart Studio
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="btn btn-ghost btn-circle text-white"
            aria-label="Close Menu"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="menu menu-vertical gap-4 p-0 text-lg font-medium text-white flex-1">
          <li>
            <Link
              href="/apparel-design"
              onClick={() => setIsOpen(false)}
              className="hover:text-primary py-3 transition-colors border-b border-white/5 rounded-none"
            >
              Apparel Design
            </Link>
          </li>
          <li>
            <Link
              href="/social-media-design"
              onClick={() => setIsOpen(false)}
              className="hover:text-primary py-3 transition-colors border-b border-white/5 rounded-none"
            >
              Social Media Design
            </Link>
          </li>
          <li>
            <Link
              href="/video-marketing"
              onClick={() => setIsOpen(false)}
              className="hover:text-primary py-3 transition-colors border-b border-white/5 rounded-none"
            >
              Video Marketing
            </Link>
          </li>
        </ul>


      </div>
    </>
  );
}
