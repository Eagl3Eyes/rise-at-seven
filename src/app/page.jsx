"use client";

import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import LogoCarousel from '@/components/sections/LogoCarousel';
import DrivingDemand from '@/components/sections/DrivingDemand';
import FeaturedWork from '@/components/sections/FeaturedWork';
import Services from '@/components/sections/Services';
import ChasingConsumers from '@/components/sections/ChasingConsumers';
import Legacy from '@/components/sections/Legacy';
import WhatsNew from '@/components/sections/WhatsNew';
import ReadyToRise from '@/components/sections/ReadyToRise';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import CircleMaskReveal from '@/components/ui/CircleMaskReveal';

export default function Home() {
  useEffect(() => {
    function setVh() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setVh();
    window.addEventListener('resize', setVh, { passive: true });
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <>
      <CircleMaskReveal />
      <CustomCursor />

      <div className="bg-grey-100">
        <Navbar />
        <main>
          <Hero />
          <LogoCarousel />
          <DrivingDemand />
          <FeaturedWork />
          <Services />
          <ChasingConsumers />
          <Legacy />
          <WhatsNew />
          <ReadyToRise />
          <Footer />
        </main>
      </div>
    </>
  );
}
