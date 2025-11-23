// components/layout.js
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// ✅ Public path to Lottie animation
const ENQUIRE_ANIMATION_PATH = '/animations/Get-Support-Animation.json';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Technology', href: '/technology' },
  { name: 'Sustainability', href: '/sustainability' },
  { name: 'Subsidiaries', href: '/subsidiaries' },
  { name: 'News', href: '/news' },
];

export default function Layout({ children, alwaysShowHeader = false }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(alwaysShowHeader);

  useEffect(() => {
    if (alwaysShowHeader) return;

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.9) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [alwaysShowHeader]);

  return (
    <div className="relative w-full font-poppins">
      {/* Conditional Sticky Header */}
      <header
        className={`fixed top-0 left-0 w-full h-[60px] 2xl:h-[48px] z-50 transition-all duration-500 ${
          showHeader || alwaysShowHeader
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'linear-gradient(90deg, #333333, #0E0E0E)',
          backdropFilter: 'blur(4.7px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        <nav className="flex items-center justify-between w-full h-full">
          {/* Logo */}
          <div className="flex items-center ml-[40px]">
            <Image src="/Arbeelogo.svg" alt="arbee logo" width={119} height={32} priority />
          </div>

          {/* Desktop Nav */}
          <ul className="hidden xl:flex flex-1 justify-center space-x-0">
            {navLinks.map((link) => (
              <li key={link.href} className="h-full">
                <div className="p-5 pb-[14px] h-full flex items-center relative">
                  <div className="flex items-end group" style={{ height: '19px' }}>
                    <Link href={link.href}>
                      <span
                        className="text-white font-medium text-[11px] font-noto-sans flex items-center justify-center h-full min-w-[31.3px] leading-none"
                      >
                        {link.name}
                      </span>
                    </Link>
                  </div>
                  {/* Active underline */}
                  {pathname === link.href && (
                    <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white" style={{ borderRadius: 0 }} />
                  )}
                  {/* Hover underline */}
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#1ed6f7] opacity-0 group-hover:opacity-100 transition-opacity duration-150" style={{ borderRadius: 0 }} />
                </div>
              </li>
            ))}
          </ul>

          {/* Desktop Enquire Button */}
          <Link href="/enquiry" className="hidden xl:block ml-4" style={{ width: '140px', height: '47.73px' }}>
            <div style={{ width: '140px', height: '47.73px' }}>
              <Lottie
                path={ENQUIRE_ANIMATION_PATH}
                loop={true}
                autoplay={true}
                style={{ width: '140px', height: '47.73px', pointerEvents: 'none' }}
              />
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden flex items-center justify-center ml-auto text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect y="5" width="24" height="2" rx="1" fill="currentColor" />
              <rect y="11" width="24" height="2" rx="1" fill="currentColor" />
              <rect y="17" width="24" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-[#181818] h-screen flex flex-col">
            <div className="flex items-center justify-between h-[56px] px-4 bg-gradient-to-r from-[#232323] to-[#181818] border-b border-[#232323]">
              <Image src="/Arbee.svg" alt="arbee logo" width={120} height={40} priority />
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white"
                aria-label="Close menu"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <ul className="flex-1 bg-[#181818]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="block text-white text-[16px] font-semibold py-4 px-6 border-b border-[#232323] text-right"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="px-6 pb-6 pt-2">
                <Link href="/enquiry" className="block w-full h-[60px]">
                  <Lottie
                    path={ENQUIRE_ANIMATION_PATH}
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                  />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      <main>{children}</main>
    </div>
  );
}