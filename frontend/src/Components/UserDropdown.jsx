import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiSettings, FiBell, FiLogOut, FiCreditCard, FiChevronDown, FiShield, FiBriefcase } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
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

  if (!user) return null;

  // Extract names from kyc if available, otherwise fallback
  const firstName = user.kyc?.first_name || user.name?.split(' ')[0] || 'User';
  const lastName = user.kyc?.last_name || user.name?.split(' ')[1] || '';
  const fullName = `${firstName} ${lastName}`.trim();
  const balance = user.wallet?.balance ?? 0;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 group cursor-pointer"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg overflow-hidden">
          {user.profile_pic ? (
             <img src={user.profile_pic} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
             <span className="font-black text-lg">{firstName.charAt(0)}</span>
          )}
        </div>
        <div className="hidden sm:flex flex-col items-start translate-y-[1px]">
          <span className="text-xs font-black tracking-tight leading-none group-hover:text-secondary transition-colors">
            {fullName}
          </span>
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
            className="absolute right-0 mt-4 w-72 bg-[#1e1b4b] rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border border-white/10 overflow-hidden z-[100]"
          >
            {/* Header / Profile Info */}
            <div className="p-7 bg-gradient-to-br from-white/10 to-transparent border-b border-white/5">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-[1.25rem] bg-indigo-600 flex items-center justify-center text-2xl font-black text-white shadow-2xl shadow-indigo-500/30">
                  {firstName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-xl text-white leading-tight truncate">{fullName}</h4>
                  <p className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-widest mt-0.5">{user.role || 'Member'}</p>
                </div>
              </div>
              
              {/* Wallet Section */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 group hover:bg-indigo-500/20 transition-all cursor-default">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <FiCreditCard className="text-indigo-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-indigo-400 tracking-tighter">Wallet Balance</span>
                    <span className="text-sm font-black text-white">₹{balance.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <button className="text-[10px] font-black text-indigo-400 hover:text-white uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md transition-colors">
                  Top Up
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-3 space-y-1">
              <NavLink 
                to="/profile" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-4 rounded-[1.5rem] hover:bg-white/5 text-slate-400 hover:text-white transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 transition-all">
                  <FiUser className="text-lg group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-bold">My Profile</span>
              </NavLink>


              <div className="relative">
                <button className="w-full flex items-center justify-between p-4 rounded-[1.5rem] hover:bg-white/5 text-slate-400 hover:text-white transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 transition-all">
                      <FiBell className="text-lg group-hover:animate-bounce" />
                    </div>
                    <span className="text-sm font-bold">Notifications</span>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-indigo-500 text-[10px] flex items-center justify-center text-white font-black">2</span>
                </button>
              </div>

              <div className="pt-2 mt-2 border-t border-white/5">
                <button 
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full flex items-center gap-3 p-4 rounded-[1.5rem] hover:bg-red-500/10 text-red-500/70 hover:text-red-400 transition-all font-bold text-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500/5 flex items-center justify-center transition-all">
                    <FiLogOut className="text-lg" />
                  </div>
                  Logout Account
                </button>
              </div>
            </div>

            {/* Bottom Tagline */}
            <div className="p-5 text-center bg-black/40">
               <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.25em] flex items-center justify-center gap-2">
                 <FiShield size={10} className="text-green-500/50" /> Encrypted Session
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
