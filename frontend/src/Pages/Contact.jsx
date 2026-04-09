import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Request:", formData);
    alert("Thank you! Your message has been sent.");
  };

  const contactMethods = [
    {
      icon: <FiPhone className="w-6 h-6 text-secondary" />,
      title: "Call Us",
      detail: "+91 98765 43210",
      subDetail: "Support: 24/7 Available"
    },
    {
      icon: <FiMail className="w-6 h-6 text-secondary" />,
      title: "Email Us",
      detail: "info@eformx.com",
      subDetail: "Response within 2 hours"
    },
    {
      icon: <FiMapPin className="w-6 h-6 text-secondary" />,
      title: "Our Headquarters",
      detail: "Digital Plaza, New Delhi",
      subDetail: "India - 110001"
    }
  ];

  return (
    <div className="min-h-screen bg-light pt-32 pb-20">
      <div className="section-padding">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h4 className="text-secondary font-semibold mb-2">CONTACT US</h4>
          <h1 className="text-4xl font-display font-black text-primary tracking-tight">How Can We Help You?</h1>
          <p className="text-muted mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about our digital services or partnership programs? Our team is dedicated to providing you with the best support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          
          {/* Contact Info & Socials */}
          <div className="space-y-6">
            <div className="bg-white p-10 rounded-3xl shadow-xl space-y-8">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="bg-secondary/10 p-4 rounded-2xl">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-xl mb-1">{method.title}</h3>
                    <p className="text-primary font-medium">{method.detail}</p>
                    <p className="text-muted text-sm">{method.subDetail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary p-10 rounded-3xl shadow-xl text-white">
              <h3 className="text-xl font-bold mb-6">Connect with us</h3>
              <div className="flex gap-4">
                {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-secondary transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-10 lg:p-12 border border-slate-100">
            <h3 className="text-2xl font-bold text-primary mb-8">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary uppercase tracking-wider">Your Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary uppercase tracking-wider">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary uppercase tracking-wider">Subject</label>
                <input
                  required
                  type="text"
                  placeholder="Service Inquiry"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary uppercase tracking-wider">Message</label>
                <textarea
                  required
                  rows="5"
                  placeholder="How can we help you?"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full md:w-max px-12 py-4 flex items-center justify-center gap-2 group"
              >
                <FiSend className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;