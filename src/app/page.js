import Hero from '../components/sections/Hero';
import LogoCarousel from '../components/shared/LogoCarousel';
import DrivingDemand from '../components/sections/DrivingDemand';
import FeaturedWork from '../components/sections/FeaturedWork';
import Services from '../components/sections/Services';
import ChasingConsumers from '../components/sections/ChasingConsumers';
import Legacy from '../components/sections/Legacy';
import WhatsNew from '../components/sections/WhatsNew';
import ReadyToRise from '../components/sections/ReadyToRise';

export default function Home() {
  return (
    <>
      <Hero />
      <LogoCarousel />
      <DrivingDemand />
      <FeaturedWork />
      <Services />
      <ChasingConsumers />
      <Legacy />
      <WhatsNew />
      <ReadyToRise />
    </>
  );
}
