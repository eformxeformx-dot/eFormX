import React from 'react'
import { FiShield, FiZap, FiHeadphones } from 'react-icons/fi'
import { FaRocket } from 'react-icons/fa'

const highlights = [
  {
    icon: <FaRocket size={40} />,
    title: "Super Aggregator Platform",
    desc: "Single platform for all your digital service needs. Fast, reliable, and secure.",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: <FiZap size={40} />,
    title: "Fastest Service Processing",
    desc: "Real-time processing for all digital transactions with minimum latency.",
    color: "bg-orange-50 text-orange-600"
  },
  {
    icon: <FiShield size={40} />,
    title: "Secure and Encrypted",
    desc: "Your data is protected with enterprise-grade encryption and security protocols.",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: <FiHeadphones size={40} />,
    title: "24/7 Dedicated Support",
    desc: "Our expert team is always here to help you solve any issues instantly.",
    color: "bg-purple-50 text-purple-600"
  }
]

const Highlights = () => {
  return (
    <section id="features" className="section-padding bg-white relative overflow-hidden">
      <div className="text-center mb-16">
        <h4 className="text-secondary font-semibold mb-2">FEATURES & HIGHLIGHTS</h4>
        <h2 className="text-3xl md:text-4xl text-primary">India's Leading Digital Service Aggregator</h2>
        <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {highlights.map((item, index) => (
          <div key={index} className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300">
            <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <h3 className="text-xl mb-4 text-primary">{item.title}</h3>
            <p className="text-muted leading-relaxed mb-6">
              {item.desc}
            </p>
            <button className="text-secondary font-bold hover:underline flex items-center gap-1 group/btn">
              Learn More
              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Highlights
