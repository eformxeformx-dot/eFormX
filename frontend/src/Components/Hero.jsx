import React from 'react'
import { FiPlay } from 'react-icons/fi'
 import heroImg from '../../src/assets/hero_image.png' // I'll assume I should copy it to assets or use direct path

const Hero = () => {
  return (
    <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -mr-64 -mt-32 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] -ml-32 -mb-16"></div>

      <div className="section-padding flex flex-col lg:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 text-center lg:text-left">
          <h4 className="text-secondary font-semibold tracking-wider mb-4 animate-fade-in">WELCOME TO EFORMX</h4>
          <h1 className="text-4xl md:text-6xl text-white mb-6 leading-tight">
            India's Most Trusted <br />
            <span className="text-secondary">Digital Service Aggregator</span>
          </h1>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto lg:mx-0">
            Empowering businesses with seamless digital solutions. Join thousands of partners and scale your services with our robust platform.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button className="btn-primary flex items-center gap-2 px-8 py-3.5">
              Get Started
            </button>
            <button className="flex items-center gap-2 text-white font-semibold hover:text-secondary transition-colors px-6 py-3.5 border border-white/20 rounded-lg hover:bg-white/5">
              <span className="bg-secondary p-2 rounded-full">
                <FiPlay size={16} fill="white" />
              </span>
              Watch Video
            </button>
          </div>
        </div>

         <div>
           <img 
            src={heroImg} 
            alt="Hero Illustration" 
            class="w-full  max-w-4xl md:max-w-4xl lg:max-w-5xl mx-auto drop-shadow-2xl rounded-2xl"
          />
          </div>
        
      </div>
    </section>
  )
}

export default Hero
