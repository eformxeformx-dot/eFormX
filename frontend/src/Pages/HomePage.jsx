import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../../src/Components/Hero'
import Highlights from '../../src/Components/Highlights'
import AboutSection from '../../src/Components/AboutSection'
import Services from '../../src/Components/Services'
import FAQ from '../../src/Components/FAQ'
import Team from '../../src/Components/Team'
import Testimonials from '../../src/Components/Testimonials'
import AppDownloadCard from '../Components/AppDownloadCard'
import Footer from '../../src/Components/Footer'

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    // Handling scroll to section based on path
    const path = location.pathname.replace('/', '');
    if (path) {
      // Small timeout to ensure components are rendered
      const timer = setTimeout(() => {
        const element = document.getElementById(path);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <main>
      <Hero />
      <Highlights />
      <AboutSection />
      <Services />
      <FAQ />
      <Team />
      <Testimonials />
      <AppDownloadCard />
      <Footer />
    </main>
  )
}

export default HomePage
