'use client';

import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

const Loader = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchLottie = async () => {
      try {
        const response = await fetch('/Arbee-Logo-Reveal.json');
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Error fetching Lottie animation data:', error);
      }
    };
    fetchLottie();
  }, []);

  if (!animationData) {
    return <div>Loading...</div>; // Fallback text
  }

  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ height: '200px', width: '200px' }}
    />
  );
};

export default Loader;
