"use client";
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../public/Arbee-Biomarine.json';

export default function LoadingScreen({ isLoading = true, onComplete, duration = 7500 }) {
  const [showLoading, setShowLoading] = useState(isLoading);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (showLoading) {
      // Store scroll position
      const y = window.scrollY;
      setScrollY(y);

      // Lock scroll and hide scrollbar
      document.body.style.position = 'fixed';
      document.body.style.top = `-${y}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.scrollbarWidth = 'none'; // Firefox
      document.body.style.msOverflowStyle = 'none'; // IE/Edge
      
      // Hide scrollbar for webkit browsers
      const style = document.createElement('style');
      style.id = 'loading-scrollbar-hide';
      style.textContent = `
        body::-webkit-scrollbar,
        html::-webkit-scrollbar {
          display: none;
        }
      `;
      document.head.appendChild(style);
      
      // Also hide on html element
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.scrollbarWidth = 'none';
      document.documentElement.style.msOverflowStyle = 'none';
    }

    return () => {
      // Restore scroll and show scrollbar
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.scrollbarWidth = '';
      document.body.style.msOverflowStyle = '';
      
      document.documentElement.style.overflow = '';
      document.documentElement.style.scrollbarWidth = '';
      document.documentElement.style.msOverflowStyle = '';
      
      // Remove the style element
      const styleElement = document.getElementById('loading-scrollbar-hide');
      if (styleElement) {
        styleElement.remove();
      }
      
      window.scrollTo(0, scrollY);
    };
  }, [showLoading, scrollY]);

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => {
      setShowLoading(false);
      if (onComplete) onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [isLoading, duration, onComplete]);

  if (!showLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[9999] bg-[#161616] flex items-center justify-center">
      <div className="w-full max-w-[700px] h-[200px] flex items-center justify-center px-4">
        <Lottie
          animationData={animationData}
          loop={false}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
          onComplete={() => {
            setTimeout(() => {
              setShowLoading(false);
              if (onComplete) onComplete();
            }, 1000);
          }}
        />
      </div>
    </div>
  );
}

