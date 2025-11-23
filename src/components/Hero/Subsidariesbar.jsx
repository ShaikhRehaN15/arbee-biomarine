"use client";
import React from "react";
import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useActiveIndexStore } from '@/store/useActiveIndexStore';
import NavDots from '@/components/NavDots';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
const ENQUIRE_ANIMATION_PATH = '/animations/Get-Support-Animation.json';

const subsidiaries = ['', 'aquatic', 'biomarine', 'care'];

// Mobile-specific logos for subsidiaries bar
const mobileHeroLogos = [
  {
    gray: '/Arbee-Group-Short-Grey.svg',
    full: '/Arbee-Group-Short.svg',
    width: 59.5,
    height: 16,
    altGray: 'mobile arbee group gray',
    altFull: 'mobile arbee group',
  },
  {
    gray: '/Arbee-Aquatic-Short-Grey.svg',
    full: '/Arbee-Aquatic-Short.svg',
    width: 71.59,
    height: 16,
    altGray: 'mobile arbee aquatic gray',
    altFull: 'mobile arbee aquatic',
  },
  {
    gray: '/Arbee-Biomarine-Short-Grey.svg',
    full: '/Arbee-Biomarine-Short.svg',
    width: 88.74,
    height: 16,
    altGray: 'mobile arbee biomarine gray',
    altFull: 'mobile arbee biomarine',
  },
  {
    gray: '/Arbee-Care-Short-Grey.svg',
    full: '/Arbee-Care-Short.svg',
    width: 49.57,
    height: 16,
    altGray: 'mobile arbee care gray',
    altFull: 'mobile arbee care',
  },
];

const heroSubtitles = [
  'Ocean for Life | Pure Wellness, Naturally Sourced',
  'Harvesting Ocean’s Bounty for a Healthier World',
  'From Ocean to Innovation | Ingredients for Life',
  'Together for Good | Supporting Lives, Inspiring Change',
];

// Default export for subsidiaries bar
export default function Subsidiariesbar() {
  const { activeIndex, setActiveIndex } = useActiveIndexStore();
  const [shouldFade, setShouldFade] = useState(activeIndex === 3);
  const [visibleText, setVisibleText] = useState(subsidiaries[activeIndex]);

  const handleAnchorClick = (id) => (e) => {
    e.preventDefault();
    const el = typeof document !== 'undefined' ? document.getElementById(id) : null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogoClick = (index) => {
    if (index === activeIndex) return;

    setVisibleText(subsidiaries[index]);
    setActiveIndex(index);

    // Trigger fade animation
    setShouldFade(false);
    requestAnimationFrame(() => {
      setShouldFade(true);
    });
  };

  return (
    <div className="relative w-full">
      {/* Hero Title - Now in normal flow with margins */}
      <h1
        className="text-[clamp(40px,10vw,109px)] text-white font-Poppins font-semibold ml-[24px] flex flex-row flex-wrap items-center "
        style={{ fontWeight: 600 }}
      >
        <span className="leading-none"
        >arbee</span>
        <span
          key={activeIndex}
          className={` text-[clamp(40px,10vw,109px)] leading-none transition-all duration-500 ease-in-out ml-0.5 ${
            shouldFade ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}
          style={{ fontWeight: 200 }}
        >
          {activeIndex === 0 ? '' : activeIndex === 3 ? ' care' : ` ${visibleText}`}
        </span>
      </h1>

      {/* Container for Blur Bar and Logo Bar */}
      <div className="relative">
        {/* NavDots - Below lg: 40px from top, lg and above: 22px above blur bar, 120px from right */}
        <div className="absolute lg:right-[96px] lg:top-auto lg:bottom-[calc(100%+22px)]">
          <NavDots 
            activeIndex={activeIndex} 
            onDotClick={handleLogoClick}
            className="!relative !top-0 !right-0"
          />
        </div>

        {/* Semi-transparent Blur Bar */}
        <div
          className={`w-full p-[24px] bg-black/30 backdrop-blur-md transition-all duration-300
            flex flex-col gap-[20px] mt-[10px] md:flex-row md:items-center md:justify-between
            ${activeIndex === 0 || activeIndex === 3
              ? 'h-auto py-[24px] md:h-[80px] sm:text-[28px] md:px-[34px]'
              : 'h-auto py-[14px] md:h-[80px] px-[24px] md:px-[34px]'
            } md:py-0`}
        >
          <div className="text-white text-[18px] font-poppins text-left md:text-[18px]" style={{ fontWeight: 400 }}>
            {heroSubtitles[activeIndex]}
          </div>

          {/* Desktop buttons */}
          {(activeIndex === 0 || activeIndex === 3) && (
            <div className="hidden md:flex gap-4 justify-end z-30 relative">
              {activeIndex === 0 && (
                <>
                  <a
                    href="https://arbeegroup.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold h-[44px] w-[136px] text-[14px] bg-[#052833] text-white flex items-center justify-center tracking-wide"
                  >
                    Visit Website
                  </a> 
                  <a
                    href="https://arbeegroup.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                   className="font-semibold h-[44px] w-[157px] text-[14px] bg-[#FFFFFF4D] border-1 text-white flex items-center justify-center tracking-wide"
                  >
                    Enquire Now
                  </a>
                
                </>
              )}
              {activeIndex === 3 && (
                <>
                  <Link
                    href="#about-care"
                    onClick={handleAnchorClick('about-care')}
                    className="font-semibold h-[38px] w-[180px] text-[14px] bg-[#052833] text-white flex items-center justify-center tracking-wide"
                  >
                    About Arbee Care
                  </Link>
                  <Link
                    href="#get-support"
                    onClick={handleAnchorClick('get-support')}
                    className="font-semibold h-[37.6px] w-[157px] text-[14px] bg-[#FFFFFF4D] border-1 text-white flex items-center justify-center tracking-wide"
                  >
                    Get Support
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Mobile buttons */}
          {(activeIndex === 0 || activeIndex === 3) && (
            <div className="flex  gap-[20px] w-full md:hidden z-30 relative [@media(max-width:320px)]:flex-col">
              {activeIndex === 0 && (
                <>
                  <a
                    href="https://arbeegroup.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full font-semibold h-[44px] text-[13px] sm:text-[14px] py-[10px] px-[15px] sm:px-[24px] bg-[#052833] text-white tracking-wide text-center flex items-center justify-center"
                  >
                    Visit Website
                  </a>
                  <a
                    href="https://arbeegroup.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                   className="w-full font-semibold h-[44px] w-[157px] text-[14px] bg-[#FFFFFF4D] border-1 text-white flex items-center justify-center tracking-wide"
                  >
                    Enquire Now
                  </a>
                
                </>
              )}
              {activeIndex === 3 && (
                <>
                  <Link
                    href="#about-care"
                    onClick={handleAnchorClick('about-care')}
                    className="w-full font-semibold h-[44px] text-[13px] sm:text-[14px] py-[10px] px-[15px] sm:px-[24px] bg-[#052833] text-white tracking-wide text-center flex items-center justify-center"
                  >
                    Know More
                  </Link>
                  <Link
                    href="#get-support"
                    onClick={handleAnchorClick('get-support')}
                    className="w-full font-semibold h-[44px] text-[13px] sm:text-[14px] py-[10px] px-[15px] sm:px-[24px] bg-[#FFFFFF4D] border-2 text-white tracking-wide text-center flex items-center justify-center"
                  >
                    Get Support
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {/* Logo Bar */}
        <div className="flex w-full h-[50px] gap-[10px] justify-center items-center bg-[#222]">
          {/* Mobile Logos */}
          {mobileHeroLogos.map((logo, idx) => (
            <div
              key={logo.full}
              onClick={() => handleLogoClick(idx)}
              className="relative flex items-center z-10 px-[10px] cursor-pointer group md:hidden"
              style={{ width: `${logo.width}px`, height: `${logo.height}px` }}
            >
              <Image
                src={logo.gray}
                alt={logo.altGray}
                width={logo.width}
                height={logo.height}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
                  activeIndex === idx ? 'opacity-0' : 'opacity-100'
                } ${activeIndex !== idx ? 'group-hover:brightness-150' : ''} w-full h-auto`}
              />
              <Image
                src={logo.full}
                alt={logo.altFull}
                width={logo.width}
                height={logo.height}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
                  activeIndex === idx ? 'opacity-100' : 'opacity-0'
                } w-full h-auto`}
              />
            </div>
          ))}

          {/* Desktop Logos */}
          <div className="hidden md:flex z-20 justify-center items-center gap-[8px] sm:gap-[16px] md:gap-[29px]">
            {[0, 1, 2, 3].map((idx) => {
              const srcs = [
                { gray: '/Arbeegroupgrey.svg', full: '/Arbeegroupfull.svg', w: 130.7, h:24 },
                { gray: '/Arbee-Aquatic-Full-Grey.svg', full: '/Arbee-Aquatic-Full.svg', w: 150.83, h: 24 },
                { gray: '/Arbee-Biomarine-Full-Grey.svg', full: '/Arbee-Biomarine-Full.svg', w: 175, h: 24 },
                { gray: '/Arbee-Care-Full-Grey.svg', full: '/Arbee-Care-Full.svg', w: 115, h: 24 },
              ];
              const { gray, full, w, h } = srcs[idx];
              return (
                <div
                  key={idx}
                  onClick={() => handleLogoClick(idx)}
                  className="relative flex items-center cursor-pointer group "
                  style={{ width: `${w}px`,
                  height: `${h}px` }}
               
                >
                  <Image
                    src={gray}
                    alt={`${['group', 'aquatic', 'biomarine', 'care'][idx]} gray`}
                    width={w}
                    height={h}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
                      activeIndex === idx ? 'opacity-0' : 'opacity-100'
                    } ${activeIndex !== idx ? 'group-hover:brightness-150' : ''} w-full h-auto`}
                  />
                  <Image
                    src={full}
                    alt={`${['group', 'aquatic', 'biomarine', 'care'][idx]}`}
                    width={w}
                    height={h}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
                      activeIndex === idx ? 'opacity-100' : 'opacity-0'
                    } w-full h-auto`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}