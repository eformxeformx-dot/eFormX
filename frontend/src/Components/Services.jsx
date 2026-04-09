import React from 'react'
import { FiShield, FiCpu, FiActivity } from 'react-icons/fi'
import { FaUniversity } from 'react-icons/fa'

const services = [
  {
    icon: <FaUniversity size={32} />,
    title: "Core Fintech Billing",
    desc: "Advanced billing solutions for fintech companies with automated reconciliation.",
    color: "bg-blue-600"
  },
  {
    icon: <FiShield size={32} />,
    title: "Micro-insurance Solution",
    desc: "Comprehensive micro-insurance platform for rural and semi-urban populations.",
    color: "bg-cyan-600"
  },
  {
    icon: <FiCpu size={32} />,
    title: "API-Integrated Solutions",
    desc: "Seamlessly integrate our digital services into your existing systems via our robust API.",
    color: "bg-indigo-600"
  },
  {
    icon: <FiActivity size={32} />,
    title: "Transaction Services",
    desc: "Secure, real-time transaction monitoring and processing for all digital payments.",
    color: "bg-sky-600"
  }
]

const Services = () => {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="text-center mb-16">
        <h4 className="text-secondary font-semibold mb-2">OUR SERVICES</h4>
        <h2 className="text-3xl md:text-4xl text-primary mb-4">Digital Solutions We Provide</h2>
        <p className="text-muted max-w-2xl mx-auto">
          We offer a wide range of digital solutions designed to help your business grow and thrive in the modern era.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center text-center p-8 rounded-3xl border border-slate-100 hover:border-secondary/20 hover:shadow-2xl transition-all duration-300 group">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white mb-8 ${service.color} shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform`}>
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 text-primary">{service.title}</h3>
            <p className="text-muted mb-8 leading-relaxed">
              {service.desc}
            </p>
            <button className="btn-primary w-full py-3 bg-secondary/10 text-secondary hover:bg-secondary hover:text-white border-none shadow-none">
              Explore More
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
