import React from 'react'
import { FiStar } from 'react-icons/fi'
import { FaQuoteLeft } from 'react-icons/fa'

const testimonials = [
  {
    name: "Sneha Singh",
    role: "Business Owner",
    text: "EFORMX has transformed the way I provide digital services to my customers. The platform is extremely reliable and the support is top-notch.",
    stars: 5,
    img: "https://x-images.vrms.io/v1/a/177987316584"
  },
  {
    name: "Amit Gupta",
    role: "Service Partner",
    text: "Joining the EFORMX network was the best decision for my business. The range of services and fast processing are truly impressive.",
    stars: 5,
    img: "https://x-images.vrms.io/v1/a/177987323635"
  }
]

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Decorative quotes */}
      <FaQuoteLeft className="absolute top-10 left-10 text-secondary/5" size={200} />
      
      <div className="text-center mb-16 relative z-10">
        <h4 className="text-secondary font-semibold mb-2">TESTIMONIALS</h4>
        <h2 className="text-3xl md:text-4xl text-primary">What Our Customers Say</h2>
        <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white p-10 rounded-3xl shadow-xl flex flex-col md:flex-row gap-8 hover:-translate-y-1 transition-all">
            <div className="flex-shrink-0">
              <img 
                src={t.img} 
                alt={t.name} 
                className="w-20 h-20 rounded-full object-cover border-4 border-secondary/10"
              />
            </div>
            <div>
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, i) => (
                  <FiStar key={i} size={16} fill="#FACC15" color="#FACC15" />
                ))}
              </div>
              <p className="text-muted text-lg italic mb-6 leading-relaxed">"{t.text}"</p>
              <h4 className="font-bold text-primary">{t.name}</h4>
              <p className="text-sm text-secondary font-medium">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
