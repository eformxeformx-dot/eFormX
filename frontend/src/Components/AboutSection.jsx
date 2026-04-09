import React from 'react'
import aboutImg from '../../src/assets/about_illustration.png'
import { FiCheck } from 'react-icons/fi'

const stats = [
  { label: "Digital Services", value: "50+" },
  { label: "Service Partners", value: "2500+" },
  { label: "Satisfied Customers", value: "50000+" },
  { label: "Service Categories", value: "20+" }
]

const AboutSection = () => {
  return (
    <section className="section-padding bg-slate-50">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Text Content */}
        <div className="lg:w-1/2">
          <h4 className="text-secondary font-semibold mb-2">ABOUT EFORMX</h4>
          <h2 className="text-3xl md:text-4xl text-primary mb-6 leading-tight">
            India's Trusted Digital Service Aggregator
          </h2>
          <p className="text-muted text-lg mb-8 leading-relaxed">
            EFORMX is leading the digital revolution in India by providing a unified platform for diverse digital services. Our mission is to simplify technology for everyone.
          </p>

          <ul className="space-y-4 mb-10">
            {[
              "Highly Secure & Reliable Platform",
              "Real-time Service Processing",
              "Wide Range of Digital Solutions",
              "Dedicated Partner Support Team"
            ].map((text, idx) => (
              <li key={idx} className="flex items-center gap-3 text-primary font-medium">
                <span className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                  <FiCheck size={14} />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <button className="btn-primary px-10">Read More About Us</button>
        </div>

        {/* Illustration & Stats Card */}
        <div className="lg:w-1/2 relative flex justify-center">
          <div className="relative z-10">
            <img 
              src={aboutImg} 
              alt="About Illustration" 
              className="w-full h-auto max-w-lg drop-shadow-2xl rounded-2xl" 
            />
            
            {/* Stats Overlay */}
            <div className="lg:absolute -bottom-10 -right-10 bg-white p-8 rounded-2xl shadow-2xl grid grid-cols-2 gap-8 min-w-[320px] mt-8 lg:mt-0">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <h3 className="text-2xl text-secondary mb-1">{stat.value}</h3>
                  <p className="text-xs font-bold text-muted uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
