'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import NavDots from '../components/Hero/NavDots';

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
    height: 49.57,
    altGray: 'mobile arbee biomarine gray',
    altFull: 'mobile arbee biomarine',
  },
  {
    gray: '/Arbee-Care-Short-Grey.svg',
    full: '/Arbee-Care-Short.svg',
    width: 49.67,
    height: 16,
    altGray: 'mobile arbee care gray',
    altFull: 'mobile arbee care',
  },
];

const heroVideos = [
  '/Arbee-Care.mp4',
  '/Arbee-Aquatic.mp4',
  '/Arbee-Biomarine.mp4',
  '/ocean.mp4',
];

const heroSubtitles = [
  'Care Division | Wellness & Nutrition Solutions',
  'Aquatic Division | Premium Fish Oil & Marine Extracts',
  'Biomarine Division | Advanced Marine Ingredients',
  'Ocean for Life | Pure Wellness, Naturally Sourced',
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const heroRef = useRef(null);
  const [isSubsidiaryVisible, setIsSubsidiaryVisible] = useState(false);

  const handleLogoClick = (index) => {
    setIsSubsidiaryVisible(false); // fade out
    setActiveIndex(index);
    setTimeout(() => setIsSubsidiaryVisible(true), 1000); // fade in
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full flex flex-col bg-black overflow-hidden lg:min-h-screen"
      style={{ height: '100dvh' }}
    >
      {/* Preload non-active videos */}
      {heroVideos.map((src, idx) =>
        idx !== activeIndex ? (
          <video key={src} src={src} preload="auto" style={{ display: 'none' }} />
        ) : null
      )}

      {/* Active video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src={heroVideos[activeIndex]}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Content */}
      <div className="relative h-screen flex-1 flex flex-col w-full px-4 sm:px-8">
        <h1
          className={`absolute text-stroke-black text-white font-poppins bottom-[13.5rem]
            ${activeIndex === 0 ? 'bottom-[10%] px-[8px]' : 'bottom-[8rem] px-[8px]'}
            text-[40px] md:text-[76px] font-bold mb-[15px] sm:mb-[30px] flex items-center`}
        >
          <span className="mr-2">arbee</span>
          <span
            className={`transition-opacity duration-500 ${isSubsidiaryVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            {activeIndex === 1
              ? 'aquatic'
              : activeIndex === 2
              ? 'biomarine'
              : activeIndex === 3
              ? 'care'
              : ''}
          </span>
        </h1>

        {/* Navigation Dots */}
        <NavDots activeIndex={activeIndex} onDotClick={handleLogoClick} />

        {/* Subtitle and buttons */}
        <div className="absolute inset-x-0 bottom-0">
          <div
            className={`absolute left-0 right-0 w-full z-99 py-[24px] px-[24px] flex flex-col items-center justify-between bg-black/30 backdrop-blur-md transition-all duration-300
              ${
                activeIndex === 0
                  ? 'bottom-[62px] h-[176px] py-[0px]'
                  : 'bottom-[40px] h-[100px] py-[24px] px-[24px]'
              }
               md:bottom-[62px] md:h-[156px] md:py-[0px]`}
          >
            <div className="text-white text-[20px] mb-[28px] font-poppins-sans text-left md:self-start md:pl-8 md:mt-8">
              {heroSubtitles[activeIndex]}
            </div>

            {/* Buttons: shown only for activeIndex 0 */}
            {activeIndex === 0 && (
              <>
                <div className="flex gap-[10px] w-full md:hidden">
                  <button className="w-full h-[44px] text-[14px] bg-[#052833] text-white">
                    About Arbee
                  </button>
                  <button className="w-full h-[44px] text-[14px] bg-[#FFFFFF4D] border-2 text-white">
                    Arbee&apos;s History
                  </button>
                </div>
                <div className="hidden md:flex gap-4 w-full mt-2 mb-4">
                  <button className="h-[44px] text-[16px] bg-[#052833] text-white px-[32px]">
                    About Arbee
                  </button>
                  <button className="h-[44px] text-[16px] bg-[#FFFFFF4D] border-2 text-white px-[32px]">
                    Arbee&apos;s History
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile subsidiaries bar */}
          <div className="flex w-full h-[62px] gap-[16px] justify-center items-center bg-[#222] md:hidden">
            {mobileHeroLogos.map((logo, idx) => (
              <div
                key={logo.full}
                onClick={() => handleLogoClick(idx)}
                className="relative flex items-center px-[10px] cursor-pointer group"
                style={{ width: `${logo.width}px`, height: `${logo.height}px` }}
              >
                <Image
                  src={logo.gray}
                  alt={logo.altGray}
                  width={logo.width}
                  height={logo.height}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 transition-opacity duration-200 ${
                    activeIndex === idx ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <Image
                  src={logo.full}
                  alt={logo.altFull}
                  width={logo.width}
                  height={logo.height}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 transition-opacity duration-200 ${
                    activeIndex === idx ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
