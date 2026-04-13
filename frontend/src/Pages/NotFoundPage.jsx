import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { FiHome, FiSearch, FiAlertTriangle, FiHelpCircle } from 'react-icons/fi';

/* ── Typing hook ───────────────────────────────────────────── */
const MESSAGES = [
  'GET /this-page → 404 Not Found',
  'Searching the digital void...',
  'Page not found in database',
];

function useTyping() {
  const [text, setText] = useState('');
  const state = useRef({ mi: 0, ci: 0, deleting: false });

  useEffect(() => {
    let timer;
    function tick() {
      const { mi, ci, deleting } = state.current;
      const msg = MESSAGES[mi];
      if (!deleting) {
        const next = ci + 1;
        setText(msg.slice(0, next));
        state.current.ci = next;
        if (next === msg.length) {
          state.current.deleting = true;
          timer = setTimeout(tick, 1800);
        } else {
          timer = setTimeout(tick, 55);
        }
      } else {
        const next = ci - 1;
        setText(msg.slice(0, next));
        state.current.ci = next;
        if (next === 0) {
          state.current.deleting = false;
          state.current.mi = (mi + 1) % MESSAGES.length;
          timer = setTimeout(tick, 300);
        } else {
          timer = setTimeout(tick, 28);
        }
      }
    }
    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, []);

  return text;
}

/* ── Star field ─────────────────────────────────────────────── */
function StarField() {
  const stars = useRef(
    Array.from({ length: 45 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 2.5,
      dur: 1.5 + Math.random() * 3,
      delay: Math.random() * 3,
      opacity: 0.15 + Math.random() * 0.5,
    }))
  ).current;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-inherit">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-violet-400"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
          }}
          animate={{ opacity: [s.opacity, s.opacity * 0.2, s.opacity], scale: [1, 0.6, 1] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ── Satellite ──────────────────────────────────────────────── */
function Satellite({ icon: Icon, color, bg, border, duration, initialAngle, radius }) {
  return (
    <motion.div
      className="absolute flex items-center justify-center rounded-full"
      style={{ width: 36, height: 36, background: bg, border: `1px solid ${border}`, color }}
      animate={{ rotate: [initialAngle, initialAngle + 360] }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      // orbit: translate outward before rotating
    >
      {/* We use a wrapper trick: parent rotates, child counter-rotates so icon stays upright */}
      <motion.div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          x: radius,
          y: -18,
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: bg,
          border: `1px solid ${border}`,
          borderRadius: '50%',
          color,
        }}
        animate={{ rotate: [0, -360] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        <Icon size={15} />
      </motion.div>
    </motion.div>
  );
}

/* ── Orbit ring (visual only) ───────────────────────────────── */
function OrbitRing({ size, delay }) {
  return (
    <motion.div
      className="absolute rounded-full border border-violet-400"
      style={{ width: size, height: size, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
      animate={{ opacity: [0.35, 0.08, 0.35], scale: [1, 1.08, 1] }}
      transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ── Main scene (left side) ─────────────────────────────────── */
function Scene() {
  return (
    <div className="relative flex items-center justify-center" style={{ height: 340 }}>
      {/* Ghost 404 */}
      <div
        className="absolute select-none pointer-events-none font-black text-violet-900"
        style={{ fontSize: 180, opacity: 0.04, letterSpacing: -10, lineHeight: 1, userSelect: 'none' }}
      >
        404
      </div>

      {/* Orbit rings */}
      <OrbitRing size={290} delay={0} />
      <OrbitRing size={230} delay={0.5} />
      <OrbitRing size={170} delay={1} />

      {/* Orbiting satellites via CSS animation wrapping pattern */}
      <OrbitingDot
        Icon={FiAlertTriangle}
        color="#534AB7"
        bg="#EEEDFE"
        border="#AFA9EC"
        radius={135}
        duration={8}
        startDeg={0}
      />
      <OrbitingDot
        Icon={FiSearch}
        color="#993C1D"
        bg="#FAECE7"
        border="#F0997B"
        radius={110}
        duration={13}
        startDeg={120}
      />
      <OrbitingDot
        Icon={FiHome}
        color="#0F6E56"
        bg="#E1F5EE"
        border="#5DCAA5"
        radius={145}
        duration={10}
        startDeg={240}
      />

      {/* Central card */}
      <motion.div
        className="relative z-10 flex items-center justify-center bg-white rounded-[2.5rem] shadow-2xl"
        style={{
          width: 140,
          height: 140,
          border: '1px solid #e2e8f0',
          boxShadow: '0 25px 60px -10px rgba(83,74,183,0.25)',
        }}
        animate={{ y: [0, -16, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          className="font-black text-violet-600 tracking-tighter"
          style={{ fontSize: 38, letterSpacing: -2 }}
        >
          404
        </span>

        {/* Badge */}
        <motion.div
          className="absolute -bottom-3 -right-3 bg-violet-600 text-white rounded-2xl flex items-center justify-center shadow-lg"
          style={{ width: 40, height: 40 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiAlertTriangle size={18} />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── Orbiting dot (CSS keyframe approach via inline style) ──── */
function OrbitingDot({ Icon, color, bg, border, radius, duration, startDeg }) {
  return (
    <div
      className="absolute"
      style={{
        width: 0,
        height: 0,
        top: '50%',
        left: '50%',
        animation: `orbit${duration} ${duration}s linear infinite`,
      }}
    >
      <style>{`
        @keyframes orbit${duration} {
          from { transform: rotate(${startDeg}deg) translateX(${radius}px) rotate(-${startDeg}deg); }
          to   { transform: rotate(${startDeg + 360}deg) translateX(${radius}px) rotate(-${startDeg + 360}deg); }
        }
      `}</style>
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: 34,
          height: 34,
          marginLeft: -17,
          marginTop: -17,
          background: bg,
          border: `1px solid ${border}`,
          color,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}
      >
        <Icon size={14} />
      </div>
    </div>
  );
}

/* ── Quick link chip ────────────────────────────────────────── */
function Chip({ to, label }) {
  return (
    <NavLink
      to={to}
      className="px-4 py-2 rounded-full text-slate-500 text-sm font-semibold bg-white border border-slate-200 hover:border-violet-400 hover:text-violet-600 transition-all duration-200 hover:-translate-y-0.5"
    >
      {label}
    </NavLink>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
const NotFoundPage = () => {
  const typedText = useTyping();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-200 rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-[100px] opacity-30 pointer-events-none" />

      <StarField />

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16">

        {/* ── Visual side ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="order-2 lg:order-1"
        >
          <Scene />
        </motion.div>

        {/* ── Content side ── */}
        <motion.div
          className="order-1 lg:order-2 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-7 flex justify-center lg:justify-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
              </span>
              Error 404
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight mb-5"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Oops! This page
            <br />
            has{' '}
            <span className="relative inline-block text-violet-600">
              vanished.
              <motion.span
                className="absolute left-0 bottom-0.5 h-1 bg-violet-400 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0, width: '100%' }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-slate-500 text-lg leading-relaxed mb-7 max-w-md mx-auto lg:mx-0"
          >
            The link you followed might be broken, or the page may have moved to a new destination in our digital ecosystem.
          </motion.p>

          {/* Typing terminal */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-mono mb-8"
          >
            <span>{typedText}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'steps(1)' }}
              className="inline-block w-0.5 h-4 bg-emerald-500 rounded-sm"
            />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
          >
            <NavLink
              to="/"
              className="group flex items-center justify-center gap-2.5 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              <FiHome size={18} />
              Back to Home
            </NavLink>
            <NavLink
              to="/help"
              className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-slate-700 rounded-2xl font-bold text-base border border-slate-200 hover:border-violet-300 hover:text-violet-600 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-sm"
            >
              <FiHelpCircle size={18} />
              Help Center
            </NavLink>
          </motion.div>

          {/* Suggested links */}
          <motion.div
            variants={itemVariants}
            className="border-t border-slate-200 pt-7"
          >
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4 text-center lg:text-left">
              Suggested pages
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {['Services', 'Features', 'Pricing', 'Contact'].map((label) => (
                <Chip key={label} to={`/${label.toLowerCase()}`} label={label} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;