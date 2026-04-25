import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiUser, FiCreditCard, FiSmartphone, FiBriefcase,
  FiShield, FiHelpCircle, FiChevronRight, FiMail, FiMessageCircle,
  FiArrowRight, FiZap, FiX,
} from 'react-icons/fi';

const PURPLE = '#6c3fc5';
const PURPLE_LIGHT = '#EEEDFE';
const PURPLE_BORDER = '#AFA9EC';
const PURPLE_TEXT = '#534AB7';

/* ── Animated counter ── */
function Counter({ value }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
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
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

/* ── Category card ── */
const CATEGORY_COLORS = [
  { bg: '#F5F3FF', border: '#DDD6FE', iconBg: '#EDE9FE', iconColor: '#7C3AED', textColor: '#5B21B6' },
  { bg: '#FFF1F2', border: '#FECDD3', iconBg: '#FFE4E6', iconColor: '#E11D48', textColor: '#9F1239' },
  { bg: '#ECFDF5', border: '#A7F3D0', iconBg: '#D1FAE5', iconColor: '#059669', textColor: '#065F46' },
  { bg: '#FFFBEB', border: '#FDE68A', iconBg: '#FEF3C7', iconColor: '#D97706', textColor: '#92400E' },
  { bg: '#EFF6FF', border: '#BFDBFE', iconBg: '#DBEAFE', iconColor: '#2563EB', textColor: '#1E40AF' },
  { bg: '#FDF4FF', border: '#E9D5FF', iconBg: '#F3E8FF', iconColor: '#9333EA', textColor: '#6B21A8' },
];

function CategoryCard({ cat, idx }) {
  const [hovered, setHovered] = useState(false);
  const c = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: idx * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {}}
      style={{
        background: hovered ? c.bg : '#fff',
        border: `0.5px solid ${hovered ? c.border : '#e8e6f0'}`,
        borderRadius: 16,
        padding: '22px 20px',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'background 0.18s, border-color 0.18s, transform 0.18s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Icon */}
      <div style={{
        width: 46, height: 46, borderRadius: 12,
        background: c.iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 14,
        color: c.iconColor, fontSize: 20,
        transition: 'background 0.18s',
      }}>
        {cat.icon}
      </div>

      <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e', marginBottom: 6 }}>
        {cat.title}
      </h3>
      <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.55, marginBottom: 14 }}>
        {cat.desc}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontSize: 11, padding: '3px 10px', borderRadius: 99,
          background: c.iconBg, color: c.textColor,
          border: `0.5px solid ${c.border}`, fontWeight: 500,
        }}>
          <Counter value={cat.count} /> articles
        </span>
        <span style={{
          fontSize: 12, color: c.iconColor, fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: 4,
          transform: hovered ? 'translateX(3px)' : 'translateX(0)',
          transition: 'transform 0.18s',
        }}>
          Explore <FiArrowRight size={13} />
        </span>
      </div>
    </motion.div>
  );
}

/* ── Article row ── */
function ArticleRow({ article, idx }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.06, duration: 0.4, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 14px',
        background: '#fff',
        border: `0.5px solid ${hovered ? PURPLE_BORDER : '#e8e6f0'}`,
        borderRadius: 10, cursor: 'pointer',
        transform: hovered ? 'translateX(5px)' : 'translateX(0)',
        transition: 'border-color 0.15s, transform 0.15s',
        textAlign: 'left',
        marginBottom: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: hovered ? PURPLE_LIGHT : '#f4f2fb',
          border: `0.5px solid ${hovered ? PURPLE_BORDER : '#e8e6f0'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 600,
          color: hovered ? PURPLE : '#94a3b8',
          flexShrink: 0,
          transition: 'background 0.15s, color 0.15s',
        }}>
          {String(idx + 1).padStart(2, '0')}
        </div>
        <span style={{
          fontSize: 13, fontWeight: 500,
          color: hovered ? '#1a1a2e' : '#334155',
          transition: 'color 0.15s',
        }}>
          {article}
        </span>
      </div>
      <FiChevronRight
        size={16}
        style={{ color: hovered ? PURPLE : '#cbd5e1', flexShrink: 0, transition: 'color 0.15s' }}
      />
    </motion.button>
  );
}

/* ── Stats bar ── */
function StatsBar() {
  const stats = [
    { label: 'Articles', value: 71, suffix: '+' },
    { label: 'Categories', value: 6, suffix: '' },
    { label: 'Avg. Response', raw: '< 2h' },
    { label: 'Satisfaction', raw: '98%' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 24 }}
    >
      {stats.map((s, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 16px',
          background: '#fff',
          border: '0.5px solid #e8e6f0',
          borderRadius: 99,
        }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: PURPLE }}>
            {s.raw ?? <><Counter value={s.value} />{s.suffix}</>}
          </span>
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{s.label}</span>
        </div>
      ))}
    </motion.div>
  );
}

/* ── Search bar ── */
function SearchBar({ query, setQuery }) {
  const [focused, setFocused] = useState(false);
  const tips = ['KYC Help', 'Partner Setup', 'Payment Issues', 'App Guide'];

  return (
    <div style={{ maxWidth: 560, margin: '0 auto' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#fff',
        border: `1px solid ${focused ? PURPLE : '#e8e6f0'}`,
        borderRadius: 14, padding: '10px 10px 10px 16px',
        transition: 'border-color 0.18s',
      }}>
        <FiSearch size={16} style={{ color: focused ? PURPLE : '#94a3b8', flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search articles, guides, questions..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, border: 'none', outline: 'none',
            background: 'transparent',
            fontSize: 13, color: '#1a1a2e',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4 }}
          >
            <FiX size={14} />
          </button>
        )}
        <button style={{
          background: PURPLE, color: '#fff',
          border: 'none', borderRadius: 10,
          padding: '8px 16px', fontSize: 12, fontWeight: 600,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
          flexShrink: 0,
        }}>
          <FiZap size={12} /> Search
        </button>
      </div>

      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: 6, marginTop: 12,
      }}>
        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, alignSelf: 'center' }}>
          Popular:
        </span>
        {tips.map(t => (
          <button
            key={t}
            onClick={() => setQuery(t)}
            style={{
              fontSize: 11, fontWeight: 500,
              padding: '4px 10px', borderRadius: 99,
              background: '#fff', border: '0.5px solid #e8e6f0',
              color: '#64748b', cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = PURPLE_BORDER;
              e.currentTarget.style.color = PURPLE;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e8e6f0';
              e.currentTarget.style.color = '#64748b';
            }}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Main page ── */
const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { icon: <FiUser size={20} />,        title: 'Account & Profile',  desc: 'Manage your account settings, KYC, and security.',     count: 12 },
    { icon: <FiCreditCard size={20} />,  title: 'Payments & Billing', desc: 'Information about fees, refunds, and invoices.',         count: 8  },
    { icon: <FiSmartphone size={20} />,  title: 'App & Services',     desc: 'How to use the mobile app and available services.',      count: 15 },
    { icon: <FiBriefcase size={20} />,   title: 'Partner Program',    desc: 'Details for digital service partners and agents.',       count: 10 },
    { icon: <FiShield size={20} />,      title: 'Privacy & Legal',    desc: 'Terms, privacy policy, and security protocols.',         count: 6  },
    { icon: <FiHelpCircle size={20} />,  title: 'General Support',    desc: 'Frequently asked questions and general help.',           count: 20 },
  ];

  const popularArticles = [
    'How to complete your KYC verification?',
    'Linking your bank account to eFormX',
    'Becoming a service partner: a step-by-step guide',
    'Understanding the fee structure for digital services',
    'Security best practices for your mobile app',
  ];

  const section = (color) => ({
    width: 3, height: 22, background: color,
    borderRadius: 0, marginRight: 10, flexShrink: 0,
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7fc' }}>

      {/* ── Hero ── */}
      <section style={{ padding: '60px 24px 48px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {/* Pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 14px', borderRadius: 99,
            background: PURPLE_LIGHT, border: `0.5px solid ${PURPLE_BORDER}`,
            fontSize: 11, fontWeight: 600, color: PURPLE_TEXT,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: PURPLE, display: 'inline-block' }}
            />
            Help Center
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 12, lineHeight: 1.25 }}
        >
          How can we{' '}
          <span style={{ color: PURPLE }}>assist you</span>{' '}
          today?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.45 }}
          style={{ fontSize: 14, color: '#64748b', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}
        >
          Search our knowledge base or browse categories below to find answers fast.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.5 }}
        >
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />
        </motion.div>

        <StatsBar />
      </section>

      {/* ── Categories ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 48px' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}
        >
          <div style={section(PURPLE)} />
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Browse by category</h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 14,
        }}>
          {categories.map((cat, idx) => (
            <CategoryCard key={idx} cat={cat} idx={idx} />
          ))}
        </div>
      </section>

      {/* ── Articles + Contact ── */}
      <section style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '0 24px 64px',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: 24,
      }}>

        {/* Popular articles */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}
          >
            <div style={section('#e11d48')} />
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Popular articles</h2>
          </motion.div>
          {popularArticles.map((a, i) => (
            <ArticleRow key={i} article={a} idx={i} />
          ))}
        </div>

        {/* Contact */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}
          >
            <div style={section('#10b981')} />
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Still stuck?</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              background: '#1e1b2e',
              borderRadius: 16, padding: 24,
              color: '#fff', position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Decorative circle */}
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 120, height: 120, borderRadius: '50%',
              background: 'rgba(124,58,237,0.25)',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Icon */}
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: 'rgba(255,255,255,0.08)',
                border: '0.5px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 14,
              }}>
                <FiMessageCircle size={18} style={{ color: '#a78bfa' }} />
              </div>

              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>We're here to help</h3>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 18 }}>
                Can't find what you need? Our dedicated team responds within 2 hours.
              </p>

              {/* Contact rows */}
              {[
                {
                  icon: <FiMail size={14} style={{ color: '#a78bfa', flexShrink: 0 }} />,
                  label: 'support@eformx.com',
                  extra: null,
                },
                {
                  icon: <FiMessageCircle size={14} style={{ color: '#4ade80', flexShrink: 0 }} />,
                  label: 'Live Chat Support',
                  extra: (
                    <span style={{
                      marginLeft: 'auto', display: 'flex', alignItems: 'center',
                      gap: 5, fontSize: 11, color: '#4ade80', fontWeight: 600,
                    }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: '#4ade80', display: 'inline-block',
                      }} />
                      Online
                    </span>
                  ),
                },
              ].map(({ icon, label, extra }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 12px', borderRadius: 8,
                  background: 'rgba(255,255,255,0.06)',
                  border: '0.5px solid rgba(255,255,255,0.1)',
                  fontSize: 12, color: '#e2e8f0',
                  marginBottom: 8, cursor: 'pointer',
                }}>
                  {icon}
                  {label}
                  {extra}
                </div>
              ))}

              <button style={{
                width: '100%', padding: '11px 0',
                borderRadius: 10, border: 'none',
                background: PURPLE, color: '#fff',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                marginTop: 4,
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#5430a8'}
                onMouseLeave={e => e.currentTarget.style.background = PURPLE}
              >
                Contact Us <FiArrowRight size={14} />
              </button>
            </div>
          </motion.div>

          {/* Response note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            style={{
              marginTop: 12, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 6,
              fontSize: 11, color: '#94a3b8', fontWeight: 500,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
            Average response time under 2 hours
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;