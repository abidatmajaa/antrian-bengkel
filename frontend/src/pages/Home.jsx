import React from 'react';
import { Navbar, HeroSection, ServicesSection, HowItWorks, StatsSection, Footer, ContactButtons, Testimonials, BrandMarquee } from '../components/home-page';

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main>
        <HeroSection />
        <BrandMarquee />
        <ServicesSection />
        <HowItWorks />
        <StatsSection />
        <Testimonials />
      </main>
      <Footer />
      <ContactButtons />
    </div>
  );
};

export default Home;
