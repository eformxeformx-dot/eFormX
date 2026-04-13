import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  FiSearch, FiUser, FiCreditCard, FiSmartphone, FiBriefcase,
  FiShield, FiHelpCircle, FiChevronRight, FiMail, FiMessageCircle,
  FiArrowRight, FiZap, FiX
} from 'react-icons/fi';

/* ── Floating particle background ───────────────────────────── */
function Particles() {
  const items = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 4,
      dur: 4 + Math.random() * 6,
      delay: Math.random() * 5,
      opacity: 0.06 + Math.random() * 0.12,
    }))
  ).current;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-violet-500"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ y: [0, -20, 0], opacity: [p.opacity, p.opacity * 3, p.opacity] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ── Animated counter ────────────────────────────────────────── */
function Counter({ value }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = () => {
          start += 1;
          setDisplay(start);
          if (start < value) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>{display}</span>;
}

/* ── Category card ───────────────────────────────────────────── */
const CARD_COLORS = [
  { bg: 'bg-violet-50', border: 'border-violet-100', icon: 'bg-violet-100 text-violet-600', hover: 'group-hover:bg-violet-600 group-hover:text-white', accent: 'text-violet-600', badge: 'bg-violet-50 text-violet-600 border-violet-200' },
  { bg: 'bg-rose-50',   border: 'border-rose-100',   icon: 'bg-rose-100 text-rose-500',     hover: 'group-hover:bg-rose-500 group-hover:text-white',   accent: 'text-rose-500',   badge: 'bg-rose-50 text-rose-600 border-rose-200' },
  { bg: 'bg-emerald-50',border: 'border-emerald-100',icon: 'bg-emerald-100 text-emerald-600',hover:'group-hover:bg-emerald-600 group-hover:text-white',accent:'text-emerald-600', badge:'bg-emerald-50 text-emerald-700 border-emerald-200'},
  { bg: 'bg-amber-50',  border: 'border-amber-100',  icon: 'bg-amber-100 text-amber-600',   hover: 'group-hover:bg-amber-500 group-hover:text-white',  accent: 'text-amber-600',  badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  { bg: 'bg-sky-50',    border: 'border-sky-100',    icon: 'bg-sky-100 text-sky-600',       hover: 'group-hover:bg-sky-600 group-hover:text-white',    accent: 'text-sky-600',    badge: 'bg-sky-50 text-sky-700 border-sky-200' },
  { bg: 'bg-fuchsia-50',border: 'border-fuchsia-100',icon: 'bg-fuchsia-100 text-fuchsia-600',hover:'group-hover:bg-fuchsia-600 group-hover:text-white',accent:'text-fuchsia-600',badge:'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200'},
];

function CategoryCard({ cat, idx }) {
  const c = CARD_COLORS[idx % CARD_COLORS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: idx * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`group relative bg-white border ${c.border} rounded-[2rem] p-8 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-shadow duration-300`}
    >
      {/* Corner accent */}
      <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full ${c.bg} opacity-60 transition-all duration-500 group-hover:scale-[3]`} />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className={`w-14 h-14 rounded-2xl ${c.icon} ${c.hover} flex items-center justify-center mb-6 transition-all duration-300 shadow-sm`}
          whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
        >
          {cat.icon}
        </motion.div>

        <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">{cat.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">{cat.desc}</p>

        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${c.badge}`}>
            <Counter value={cat.count} /> articles
          </span>
          <motion.span
            className={`${c.accent} flex items-center gap-1 text-sm font-bold`}
            whileHover={{ x: 4 }}
          >
            Explore <FiArrowRight size={14} />
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Article row ─────────────────────────────────────────────── */
function ArticleRow({ article, idx }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.07, duration: 0.45, ease: 'easeOut' }}
      whileHover={{ x: 6 }}
      className="w-full group bg-white border border-slate-100 hover:border-violet-200 rounded-2xl px-6 py-4 flex items-center justify-between hover:shadow-lg hover:shadow-violet-50 transition-all duration-200 text-left"
    >
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-violet-50 group-hover:border-violet-200 flex items-center justify-center text-slate-400 group-hover:text-violet-500 text-xs font-black transition-all">
          {String(idx + 1).padStart(2, '0')}
        </div>
        <span className="text-slate-700 font-semibold group-hover:text-slate-900 transition-colors">{article}</span>
      </div>
      <FiChevronRight className="text-slate-300 group-hover:text-violet-500 flex-shrink-0 transition-colors" size={18} />
    </motion.button>
  );
}

/* ── Stats bar ───────────────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { label: 'Articles', value: 71 },
    { label: 'Categories', value: 6 },
    { label: 'Avg. Response', value: '< 2h', raw: null },
    { label: 'Satisfaction', value: '98%', raw: null },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="mt-12 flex flex-wrap justify-center gap-6"
    >
      {stats.map((s, i) => (
        <div key={i} className="flex items-center gap-3 px-5 py-3 bg-white/70 border border-slate-200 rounded-full backdrop-blur-sm shadow-sm">
          <span className="text-xl font-black text-violet-600">
            {s.raw === null ? s.value : <><Counter value={s.value} />+</>}
          </span>
          <span className="text-sm text-slate-500 font-semibold">{s.label}</span>
        </div>
      ))}
    </motion.div>
  );
}

/* ── Search bar ──────────────────────────────────────────────── */
function SearchBar({ query, setQuery }) {
  const [focused, setFocused] = useState(false);
  const tips = ['KYC Help', 'Partner Setup', 'Payment Issues', 'App Guide'];

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        animate={{ boxShadow: focused ? '0 20px 60px -10px rgba(109,40,217,0.2)' : '0 8px 30px -8px rgba(0,0,0,0.08)' }}
        className="relative bg-white rounded-[1.75rem] border border-slate-200 overflow-hidden transition-colors duration-200"
        style={{ borderColor: focused ? '#7c3aed' : undefined }}
      >
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <FiSearch size={20} className={`transition-colors duration-200 ${focused ? 'text-violet-500' : 'text-slate-400'}`} />
        </div>
        <input
          type="text"
          placeholder="Search articles, guides, questions..."
          className="w-full pl-14 pr-36 py-5 bg-transparent outline-none text-slate-800 font-medium placeholder-slate-400 text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {query && (
          <button
            className="absolute right-28 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            onClick={() => setQuery('')}
          >
            <FiX size={16} />
          </button>
        )}
        <div className="absolute right-2 inset-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="h-full px-6 bg-violet-600 hover:bg-violet-700 text-white rounded-[1.25rem] font-bold text-sm flex items-center gap-2 transition-colors"
          >
            <FiZap size={14} /> Search
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 flex flex-wrap justify-center gap-2"
      >
        <span className="text-xs text-slate-400 font-bold self-center">POPULAR:</span>
        {tips.map((t) => (
          <button
            key={t}
            onClick={() => setQuery(t)}
            className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:border-violet-300 hover:text-violet-600 transition-all"
          >
            {t}
          </button>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────── */
const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { icon: <FiUser size={22} />,         title: 'Account & Profile',  desc: 'Manage your account settings, KYC, and security.',      count: 12 },
    { icon: <FiCreditCard size={22} />,   title: 'Payments & Billing', desc: 'Information about fees, refunds, and invoices.',          count: 8 },
    { icon: <FiSmartphone size={22} />,   title: 'App & Services',     desc: 'How to use the mobile app and available services.',       count: 15 },
    { icon: <FiBriefcase size={22} />,    title: 'Partner Program',    desc: 'Details for digital service partners and agents.',        count: 10 },
    { icon: <FiShield size={22} />,       title: 'Privacy & Legal',    desc: 'Terms, privacy policy, and security protocols.',          count: 6 },
    { icon: <FiHelpCircle size={22} />,   title: 'General Support',    desc: 'Frequently asked questions and general help.',            count: 20 },
  ];

  const popularArticles = [
    'How to complete your KYC verification?',
    'Linking your bank account to eFormX',
    'Becoming a service partner: A step-by-step guide',
    'Understanding the fee structure for digital services',
    'Security best practices for your mobile app',
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        {/* Mesh background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-violet-100 to-transparent rounded-b-full opacity-50" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-fuchsia-100 rounded-full blur-[80px] opacity-40" />
          <div className="absolute top-10 right-10 w-64 h-64 bg-sky-100 rounded-full blur-[80px] opacity-50" />
        </div>
        <Particles />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200 text-violet-600 text-xs font-bold tracking-widest uppercase mb-6"
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block w-1.5 h-1.5 rounded-full bg-violet-500"
            />
            Help Center
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl font-black text-slate-900 mb-5 leading-tight tracking-tight"
          >
            How can we{' '}
            <span className="relative inline-block text-violet-600">
              assist you
              <motion.span
                className="absolute left-0 bottom-1 h-1.5 bg-violet-200 rounded-full -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: '100%', originX: 0 }}
              />
            </span>{' '}
            today?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-slate-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Search our knowledge base or browse categories below to find answers fast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.55 }}
          >
            <SearchBar query={searchQuery} setQuery={setSearchQuery} />
          </motion.div>

          <StatsBar />
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-1 h-8 bg-violet-500 rounded-full" />
          <h2 className="text-2xl font-black text-slate-900">Browse by category</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <CategoryCard key={idx} cat={cat} idx={idx} />
          ))}
        </div>
      </section>

      {/* ── Articles + Contact ── */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Popular articles */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-7"
          >
            <div className="w-1 h-8 bg-rose-400 rounded-full" />
            <h2 className="text-2xl font-black text-slate-900">Popular articles</h2>
          </motion.div>
          <div className="space-y-3">
            {popularArticles.map((a, i) => (
              <ArticleRow key={i} article={a} idx={i} />
            ))}
          </div>
        </div>

        {/* Contact card */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-7"
          >
            <div className="w-1 h-8 bg-emerald-400 rounded-full" />
            <h2 className="text-2xl font-black text-slate-900">Still stuck?</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-slate-900 text-white rounded-[2rem] p-8 overflow-hidden shadow-2xl shadow-slate-900/20"
          >
            {/* Animated blobs inside card */}
            <motion.div
              className="absolute -top-12 -right-12 w-40 h-40 bg-violet-600 rounded-full blur-2xl opacity-40"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-fuchsia-600 rounded-full blur-2xl opacity-30"
              animate={{ scale: [1.2, 1, 1.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-5">
                <FiMessageCircle size={20} className="text-violet-300" />
              </div>

              <h3 className="text-xl font-black mb-2">We're here to help</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Can't find what you need? Our dedicated team responds within 2 hours.
              </p>

              <div className="space-y-3 mb-6">
                <motion.a
                  href="mailto:support@eformx.com"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/8 border border-white/10 hover:bg-white/15 transition-all text-sm font-semibold"
                >
                  <FiMail size={16} className="text-violet-400" />
                  support@eformx.com
                </motion.a>
                <motion.button
                  whileHover={{ x: 4 }}
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-white/8 border border-white/10 hover:bg-white/15 transition-all text-sm font-semibold text-left"
                >
                  <FiMessageCircle size={16} className="text-emerald-400" />
                  Live Chat Support
                  <span className="ml-auto flex items-center gap-1 text-xs text-emerald-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </motion.button>
              </div>

              <motion.button
                whileHover={{ y: -2, boxShadow: '0 12px 30px -8px rgba(124,58,237,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-black text-sm transition-colors flex items-center justify-center gap-2"
              >
                Contact Us <FiArrowRight size={14} />
              </motion.button>
            </div>
          </motion.div>

          {/* Response time badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500 font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Average response time under 2 hours
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;