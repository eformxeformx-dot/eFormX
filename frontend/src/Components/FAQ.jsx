import React, { useState } from 'react'
import { FiPlus, FiMinus } from 'react-icons/fi'

const faqs = [
  {
    q: "What is EFORMX Digital Service Aggregator?",
    a: "EFORMX is a comprehensive platform that aggregates various digital services like banking, insurance, and utilities into a single, easy-to-use interface for businesses and partners."
  },
  {
    q: "How can I become an EFORMX Partner?",
    a: "You can sign up as a partner through our portal. Once your documents are verified, you can start offering our digital services to your customers immediately."
  },
  {
    q: "Are the services on EFORMX secure?",
    a: "Yes, all our services are protected with enterprise-grade encryption and comply with industry security standards and regulations."
  },
  {
    q: "What kind of support does EFORMX provide?",
    a: "We provide 24/7 dedicated technical and business support to all our partners through chat, email, and telephone."
  }
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section-padding bg-light">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3">
          <h4 className="text-secondary font-semibold mb-2">COMMON QUESTIONS</h4>
          <h2 className="text-3xl md:text-4xl text-primary mb-6">Frequently <br /> Asked Questions</h2>
          <p className="text-muted leading-relaxed">
            Need help? Here are some of the most common questions our partners and customers ask. If you don't find what you're looking for, feel free to contact us.
          </p>
        </div>

        <div className="lg:w-2/3 space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`rounded-2xl border transition-all duration-300 ${openIndex === idx ? 'bg-white border-secondary/50 shadow-xl' : 'bg-white/50 border-slate-200 shadow-sm hover:border-secondary/30'}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full text-left p-6 flex justify-between items-center"
              >
                <span className={`text-lg font-bold ${openIndex === idx ? 'text-secondary' : 'text-primary'}`}>
                  {faq.q}
                </span>
                <span className={`p-1 rounded-full transition-colors ${openIndex === idx ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {openIndex === idx ? <FiMinus size={18} /> : <FiPlus size={18} />}
                </span>
              </button>
              
              {openIndex === idx && (
                <div className="px-6 pb-6 text-muted leading-relaxed animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
