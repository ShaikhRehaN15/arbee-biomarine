"use client";
import React from 'react';
import {useState,useRef,useEffect} from 'react';
import { useActiveIndexStore } from '@/store/useActiveIndexStore';
import NavDots from '@/components/NavDots';


export default function Herobgvideo(){
    const heroVideos = [
    '/ocean.mp4',
    '/Arbee-Aquatic.mp4',
    '/Arbee-Biomarine.mp4',
    '/Arbee-Care.mp4',
  ];
  const heroTitles = [
    'arbee',
    'arbee aquatic',
    'arbee biomarine',
    'arbee care',
  ];
  const heroSubtitles = [
    'Ocean for Life | Pure Wellness, Naturally Sourced',
    'Aquatic Division | Premium Fish Oil & Marine Extracts',
    'Biomarine Division | Advanced Marine Ingredients',
    'Care Division | Wellness & Nutrition Solutions',
  ];

  const { activeIndex, setActiveIndex } = useActiveIndexStore();
  const heroRef = useRef(null);
  const [showHeader, setShowHeader] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [isSubsidiaryVisible, setIsSubsidiaryVisible] = useState(false); 
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogoClick = (index) => {
    setIsSubsidiaryVisible(false); // Hide subsidiary name first
    setActiveIndex(index);
    setTimeout(() => setIsSubsidiaryVisible(true), 1000); // Delay fade-in
  };

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        setShowHeader(heroRect.bottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    return (
       <main className={`relative bg-black min-h-screen overflow-x-hidden`}>
      {/* Hero Section */}
      <section
  ref={heroRef}
  className="relative w-full flex flex-col bg-black overflow-hidden overflow-y-hidden lg:min-h-screen"
  style={{ height: '100dvh' }}

  
>

  {heroVideos.map((src, idx) => (
    <video
      key={src}
      autoPlay
      loop
      muted
      playsInline
      src={src}
      preload="auto"
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
        activeIndex === idx ? 'opacity-100' : 'opacity-0'
      }`}
    />
  ))}
  
  {/* NavDots - Below lg: 40px from top, 96px from right */}
  <div
  className="lg:hidden absolute z-10"
  style={{
    top: '-10%' ,
    right: '10%',
  }}
>
  <NavDots activeIndex={activeIndex} onDotClick={handleLogoClick} />
</div>

</section>

    </main>
    );
}