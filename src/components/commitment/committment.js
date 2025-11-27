'use client';
import React from 'react';
import Image from 'next/image';

export default function Commitment() {
  return (
    <section
      className="
        min-h-screen lg:h-[100dvh] w-full 
        px-[clamp(24px,calc(24px+(96*(100vw-320px)/704)),120px)]
        py-[clamp(24px,calc(24px+(48*(100vw-320px)/704)),64px)]
        bg-white font-poppins overflow-visible lg:overflow-hidden
        flex flex-col
      "
    >
      {/* Title Row */}
      <div className="flex flex-col sm:flex-row justify-between gap-[2vh] flex-none">
        <div className="flex items-start">
          <h2 className="text-[clamp(28px,calc(28px+(28*(100vw-320px)/704)),56px)] text-[#323232] font-noto font-bold">
            Sustainability
          </h2>
        </div>
        <div className="flex items-start">
          <h2
            className="
              text-[clamp(20px,calc(20px+(8*(100vw-320px)/448)),28px)]
              sm:hidden
              text-[#323232] font-noto font-semibold
            "
          >
            Purpose That Drives Every Step
          </h2>
        </div>
        <div className="flex items-end sm:w-1/2">
          <h3 className="text-[clamp(14px,calc(14px+(2*(100vw-320px)/704)),16px)] text-[#323232] font-noto font-normal leading-snug">
          Our commitment to sustainability drives every step we take. By harnessing renewable energy, managing waste responsibly, and capturing rainwater, we minimize our environmental impact. Our green and blue initiatives support sustainable sourcing, preserve marine biodiversity, and promote eco-conscious practices to protect our planet and oceans for future generations.
          </h3>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        className="
          w-full
          grid
          grid-cols-1
          md:grid-cols-5
          h-[580px]
          lg:h-full
          mt-[32px]
          flex-1
        "
      >
        {/* Card 1 */}
        <div
          className="
            bg-[#F5F5F5] w-full p-[32px] md:py-[60px] md:px-[32px] flex flex-col justify-between
            h-[160px]
            md:h-full
          "
        >
          <h3 className="text-[#454545] font-lato font-regular text-[24px] ">
          Protecting Oceans, Sustaining the Planet
          </h3>
          
         
        </div>

        {/* Card 2 */}
        <div
          className="
            relative group cursor-pointer overflow-hidden
            h-[140px]
            md:h-full
          "
        >
          <Image
            src="/safeguarding.png"
            alt="Safeguarding Marine Life"
            fill
            className="object-cover transition-transform duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
          />
         
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 flex items-start justify-center text-white pt-[60px] text-center">
            <h4 className="text-[clamp(16px,calc(16px+(4*(100vw-320px)/704)),18px)] font-normal font-poppins">
            Healthcare Access
            </h4>
          </div>
        </div>

        {/* Card 3 */}
        <div
          className="
            relative group cursor-pointer overflow-hidden
            h-[140px]
            md:h-full
          "
        >
          <Image
            src="/education.png"
            alt="Responsible Resource Management"
            fill
            className="object-cover transition-transform duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
          />
        
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 flex items-start justify-center text-white pt-[60px] text-center">
            <h4 className="text-[clamp(16px,calc(16px+(4*(100vw-320px)/704)),18px)] font-normal font-poppins">
            Education & Skill Development
            </h4>
          </div>
        </div>

        {/* Card 4 */}
        <div
          className="
            relative group cursor-pointer overflow-hidden
            h-[140px] 
            md:h-full
          "
        >
          <Image
            src="/sustainability.png"
            alt="Powering a Sustainable Future"
            fill
            className="object-cover transition-transform duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
          />
         
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 flex items-start justify-center text-white pt-[60px] text-center">
            <h4 className="text-[clamp(16px,calc(16px+(4*(100vw-320px)/704)),18px)] font-normal font-poppins">
             Sustainability & Environment
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}



