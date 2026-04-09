import React from 'react'
import Hero from '../../src/Components/Hero'
import Highlights from '../../src/Components/Highlights'
import AboutSection from '../../src/Components/AboutSection'
import Services from '../../src/Components/Services'
import FAQ from '../../src/Components/FAQ'
import Team from '../../src/Components/Team'
import Testimonials from '../../src/Components/Testimonials'
import Footer from '../../src/Components/Footer'

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Highlights />
      <AboutSection />
      <Services />
      <FAQ />
      <Team />
      <Testimonials />
      <Footer />
    </main>
  )
}

export default HomePage
