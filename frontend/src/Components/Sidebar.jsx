import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiHome, FiFileText, FiShield, FiInfo, FiAlertTriangle, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo.png'



const Sidebar = ({ isCollapsed, toggleSidebar, isMobile, onClose }) => {
  const menuItems = [
    { icon: <FiHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FiFileText />, label: "Terms & Conditions", path: "/term-and-condition" },
    { icon: <FiShield />, label: "Privacy Policy", path: "/privacy" },
    { icon: <FiInfo />, label: "About Us", path: "/about" },
    { icon: <FiAlertTriangle />, label: "Disclaimer", path: "/disclaimer" },
  ]

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 96 : 320 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="h-screen bg-[#0f172a] text-white flex flex-col border-r border-white/5 shadow-2xl"
    >
      {/* Sidebar Header with Logo */}
      <div className={`p-6 sm:p-8 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-4 sm:mb-6`}>
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex-shrink-0"
          >
            <img src={logo} alt="eFormX Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl" />
          </motion.div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="text-xl sm:text-2xl font-black tracking-tighter text-white">eFormX</span>
              <span className="text-[8px] sm:text-[10px] font-bold text-white tracking-[0.3em] uppercase opacity-70">Solutions</span>
            </motion.div>
          )}
        </div>
        {isMobile && (
          <button 
            onClick={onClose}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <FiX size={24} />
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-5 py-6">
        <nav className="space-y-3">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/25" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-bold text-sm"
                >
                  {item.label}
                </motion.span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Collapse Toggle Section */}
      <div className="p-6 border-t border-white/5">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={toggleSidebar}
            className="w-full bg-white/5 hover:bg-white/10 p-4 rounded-2xl flex items-center justify-center gap-3 transition-all border border-white/5 group"
          >
            {isCollapsed ? <FiChevronRight size={24} /> : (
              <>
                <FiChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold text-xs uppercase tracking-widest">Collapse Sidebar</span>
              </>
            )}
          </button>
        </div>

        {!isCollapsed && (
          <div className="p-5 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 shadow-inner">
            <p className="text-[10px] text-slate-500 font-black mb-2 uppercase tracking-widest">Digital Platform v2.0</p>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                className="h-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]"
              ></motion.div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Enhanced Security Protocol Active</p>
          </div>
        )}
      </div>
    </motion.aside>
  )
}

export default Sidebar
