"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";


export default function AboutCare() {
  const handleAnchorClick = (id) => (e) => {
    e.preventDefault();
    const el = typeof document !== 'undefined' ? document.getElementById(id) : null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="about-care" className="relative w-full min-h-screen bg-gradient-to-b from-[#1d1d1d] to-[#292929] items-center pt-[21.5vh] font-poppins overflow-x-hidden">
      {/* Background watermark */}
      <div
        className="
          absolute bottom-0
          w-[clamp(200px,calc(200px+((311*(100vw-320px))/1120)),511px)]
          h-[clamp(170px,calc(170px+(330*(100vw-320px)/1120)),500px)]
          pointer-events-none z-10
          right-0 md:right-auto
          md:left-0
        "
      >
        <Image
          src="/Arbee - ICON - Cropped Dark Shade.webp"
          alt="Background Watermark"
          fill
          className="
            object-contain object-bottom
            scale-x-[-1] md:scale-x-100
          "
          priority
        />
      </div>

      {/* Content container */}
      <div className="relative z-20 container px-6 md:px-[120px] w-full">
        {/* Heading */}
        <h2 className="text-white text-[clamp(28px,calc(28px+28*((100vw-320px)/(1200-320))),56px)]
 font-bold mb-4">
          About <span className="text-[#00AEEF]">Arbee Care</span>
        </h2>

        {/* Subheading */}
        <h3 className="text-white font-semibold text-[clamp(18px,calc(18px+14*((100vw-320px)/880)),32px)]
 leading-snug mb-6 w-full">
          Empowering Communities. Sustaining the Future. Pioneering Social Impact
          in Health, Education &amp; the Environment
        </h3>

        {/* Body text */}
        <p className="text-[#BDBDBD] text-[clamp(16px,calc(16px+6*((100vw-320px)/880)),22px)] leading-relaxed w-full mb-8">
  Arbee Care is the CSR and community welfare initiative of Arbee Group.
  Rooted in the same legacy of trust, innovation, and responsibility that
  defines our marine business, we work to improve lives across India
  through accessible healthcare, inclusive education, and environmental
  awareness. We believe every individual deserves the opportunity to
  thrive—and every action can contribute to a better tomorrow.
</p>


        {/* Button */}
        <Link
          href="#get-support"
          onClick={handleAnchorClick('get-support')}
          className="md:hidden w-[132px] mb-[100px] font-semibold h-[44px] text-[13px] py-[10px] px-[15px] bg-[#FFFFFF4D] border-2 text-white tracking-wide text-center flex items-center justify-center"
        >
          Get Support
        </Link>
      </div>
    </section>
  );
}







