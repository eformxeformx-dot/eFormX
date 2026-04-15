import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiSettings, FiBell, FiLogOut, FiClock, FiChevronDown, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const UserDropdown = () => {
  const { user, logout, sessionExpiry } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update session countdown
  useEffect(() => {
    if (!sessionExpiry) return;

    const updateTimer = () => {
      const now = new Date();
      const diff = sessionExpiry - now;

      if (diff <= 0) {
        setTimeLeft('Expired');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [sessionExpiry]);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 group cursor-pointer"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
          <span className="font-black text-lg">{user.name?.charAt(0) || 'U'}</span>
        </div>
        <div className="hidden sm:flex flex-col items-start translate-y-[1px]">
          <span className="text-xs font-black tracking-tight leading-none group-hover:text-secondary transition-colors">
            {user.name}
          </span>
          <span className="text-[10px] font-bold opacity-60">ID: {user.user_id?.split('AK')[1] || 'User'}</span>
        </div>
        <FiChevronDown className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute right-0 mt-4 w-72 bg-[#1e1b4b] rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden z-[100]"
          >
            {/* Header / Profile Info */}
            <div className="p-6 bg-gradient-to-br from-white/5 to-transparent border-b border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-purple flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-purple/20">
                  {user.name?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-lg leading-none mb-1">{user.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user.email || 'Free Member'}</p>
                </div>
              </div>
              
              {/* Session Time Section */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-black/40 border border-white/5 group hover:border-purple/30 transition-colors">
                <div className="flex items-center gap-2">
                  <FiClock className="text-purple group-hover:animate-pulse" />
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Session Time</span>
                </div>
                <span className="text-xs font-black text-white tabular-nums">{timeLeft}</span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-3 space-y-1">
              <NavLink 
                to="/profile" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-4 rounded-[1.25rem] hover:bg-white/5 text-slate-400 hover:text-white transition-all group"
              >
                <FiUser className="text-xl group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold">Manage Profile</span>
              </NavLink>

              <NavLink 
                to="/profile" // Mocking settings to profile for now
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-4 rounded-[1.25rem] hover:bg-white/5 text-slate-400 hover:text-white transition-all group"
              >
                <FiSettings className="text-xl group-hover:rotate-45 transition-transform" />
                <span className="text-sm font-bold">Account Settings</span>
              </NavLink>

              <div className="relative">
                <button className="w-full flex items-center justify-between p-4 rounded-[1.25rem] hover:bg-white/5 text-slate-400 hover:text-white transition-all group">
                  <div className="flex items-center gap-3">
                    <FiBell className="text-xl group-hover:animate-bounce" />
                    <span className="text-sm font-bold">Notifications</span>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-red-500 text-[10px] flex items-center justify-center text-white font-black animate-pulse">2</span>
                </button>
              </div>

              <div className="pt-2 mt-2 border-t border-white/5">
                <button 
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full flex items-center gap-3 p-4 rounded-[1.25rem] hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all font-bold text-sm"
                >
                  <FiLogOut className="text-xl" />
                  Logout Session
                </button>
              </div>
            </div>

            {/* Bottom Tagline */}
            <div className="p-4 text-center bg-black/20">
               <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                 <FiShield size={10} /> Secure Protocol v2.0
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
