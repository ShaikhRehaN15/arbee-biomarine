"use client";
import React, { useState } from 'react';

const NavDots = ({ activeIndex, onDotClick, className = "" }) => {
  const dots = ['arbeegroup', 'arbeeaquatic', 'arbeebiomarine', 'arbeecare'];

  return (
    <div className={`absolute top-[-22rem] sm:top-[9rem] right-[7%] lg:top-[15rem] right-[7%]  xl:top-[9rem] right-[7%]  flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center mt-[430px] gap-3">
        {/* Connecting lines */}
        <div className="absolute top-[40%] sm:top-[40%] -translate-y-1/2 z-0">
          {/* Line 1: Dot 1 to Dot 2 */}
          <div
            className="absolute h-[2px] w-[12px] bg-white"
            style={{ left: '16px' }}
          />
          {/* Line 2: Dot 2 to Dot 3 */}
          <div
            className="absolute h-[2px] w-[12px] bg-white"
            style={{ left: '44px' }}
          />
          {/* Line 3: Dot 3 to Dot 4 */}
          <div
            className="absolute h-[2px] w-[12px] bg-white"
            style={{ left: '72px' }}
          />
        </div>
        
        {/* Dots */}
        {dots.map((dot, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className="w-4 h-4 rounded-full border-2 border-white z-10 bg-transparent"
          />
        ))}
        
        {/* Moving white dot */}
        <div 
          className="absolute w-2.5 h-2.5 bg-white rounded-full transition-all duration-500 z-20"
          style={{
            left: `calc(${activeIndex * 28}px + 3px)`,
            top: '3px',
          }}
        />
      </div>
    </div>
  );
};

export default NavDots;