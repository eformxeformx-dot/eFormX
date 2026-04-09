import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiUser, 
  FiCreditCard, 
  FiSmartphone, 
  FiBriefcase, 
  FiShield, 
  FiHelpCircle,
  FiChevronRight,
  FiMail,
  FiMessageCircle,
  FiArrowRight
} from 'react-icons/fi';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      icon: <FiUser size={24} />,
      title: "Account & Profile",
      desc: "Manage your account settings, KYC, and security.",
      count: 12
    },
    {
      icon: <FiCreditCard size={24} />,
      title: "Payments & Billing",
      desc: "Information about fees, refunds, and invoices.",
      count: 8
    },
    {
      icon: <FiSmartphone size={24} />,
      title: "App & Services",
      desc: "How to use the mobile app and available services.",
      count: 15
    },
    {
      icon: <FiBriefcase size={24} />,
      title: "Partner Program",
      desc: "Details for digital service partners and agents.",
      count: 10
    },
    {
      icon: <FiShield size={24} />,
      title: "Privacy & Legal",
      desc: "Terms, privacy policy, and security protocols.",
      count: 6
    },
    {
      icon: <FiHelpCircle size={24} />,
      title: "General Support",
      desc: "Frequently asked questions and general help.",
      count: 20
    }
  ];

  const popularArticles = [
    "How to complete your KYC verification?",
    "Linking your bank account to eFormX",
    "Becoming a service partner: A step-by-step guide",
    "Understanding the fee structure for digital services",
    "Security best practices for your mobile app"
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="section-padding">
        
        {/* Hero Search Section */}
        <section className="relative text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h4 className="text-secondary font-black tracking-[0.2em] mb-4">HELP CENTER</h4>
            <h1 className="text-5xl md:text-6xl font-display font-black text-primary mb-8 leading-tight">
              How can we assist you <span className="text-secondary">today?</span>
            </h1>
            
            <div className="relative group max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <FiSearch size={24} className="text-slate-400 group-focus-within:text-secondary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search for articles, guides, or questions..."
                className="w-full pl-16 pr-6 py-6 rounded-[2rem] bg-white border border-slate-100 shadow-2xl shadow-slate-200 outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all text-lg font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-2 right-2">
                <button className="bg-primary hover:bg-secondary text-white px-8 h-full rounded-[1.5rem] font-bold transition-all flex items-center gap-2">
                  Search
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-bold text-slate-400">
              <span>POPULAR TIPS:</span>
              <button className="hover:text-secondary transition-colors">KYC Help</button>
              <span>•</span>
              <button className="hover:text-secondary transition-colors">Partner Setup</button>
              <span>•</span>
              <button className="hover:text-secondary transition-colors">Payment Issues</button>
            </div>
          </motion.div>
        </section>

        {/* Categories Grid */}
        <section className="max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-8 border border-secondary/5 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-black text-primary mb-3">{cat.title}</h3>
                <p className="text-muted font-medium mb-8 leading-relaxed">
                  {cat.desc}
                </p>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-400">{cat.count} ARTICLES</span>
                  <span className="text-secondary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore <FiArrowRight />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Articles & Contact Section */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Popular Articles */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-3xl font-black text-primary flex items-center gap-4">
              <span className="w-2 h-10 bg-secondary rounded-full"></span>
              Popular Articles
            </h3>
            <div className="space-y-4">
              {popularArticles.map((article, idx) => (
                <button
                  key={idx}
                  className="w-full bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between hover:border-secondary/30 hover:shadow-lg transition-all text-left"
                >
                  <span className="text-lg font-bold text-primary/80">{article}</span>
                  <FiChevronRight className="text-secondary" size={24} />
                </button>
              ))}
            </div>
          </div>

          {/* Contact Support Card */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black text-primary flex items-center gap-4">
              <span className="w-2 h-10 bg-primary rounded-full"></span>
              Still stuck?
            </h3>
            <div className="bg-primary text-white p-10 rounded-[2.5rem] shadow-2xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10 space-y-6">
                <p className="text-slate-300 font-medium">
                  Can't find what you're looking for? Our dedicated team is ready to help you with any issue.
                </p>
                
                <div className="space-y-3">
                  <a href="mailto:support@eformx.com" className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all">
                    <FiMail className="text-secondary" />
                    <span className="font-bold">support@eformx.com</span>
                  </a>
                  <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all">
                    <FiMessageCircle className="text-secondary" />
                    <span className="font-bold">Live Chat Support</span>
                  </button>
                </div>
                
                <button className="w-full bg-secondary text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:shadow-secondary/30 hover:-translate-y-1 transition-all">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HelpPage;
