import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiHome, FiFileText, FiShield, FiInfo, FiAlertTriangle, FiX, FiUser } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo.png'

const Sidebar = ({ isCollapsed, isOpen, onClose }) => {
  const menuItems = [
    { icon: <FiHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FiUser />, label: "My Profile", path: "/profile" },
    { icon: <FiFileText />, label: "Terms & Conditions", path: "/term-and-condition" },
    { icon: <FiShield />, label: "Privacy Policy", path: "/privacy" },
    { icon: <FiInfo />, label: "About Us", path: "/about" },
    { icon: <FiAlertTriangle />, label: "Disclaimer", path: "/disclaimer" },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[55] xl:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={{ 
          width: isCollapsed ? 96 : 300,
          x: isOpen ? 0 : (window.innerWidth < 1280 ? -300 : 0)
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className={`h-screen bg-[#0f172a] text-white fixed left-0 top-0 z-[60] flex flex-col border-r border-white/5 shadow-[25px_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden`}
      >
        {/* Sidebar Header with Logo */}
        <div className={`pt-10 pb-6 px-8 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-6 relative`}>
          <div className={`flex items-center gap-4 ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <motion.div 
              animate={{ 
                scale: isCollapsed ? 0.8 : 1,
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex-shrink-0"
            >
              <img src={logo} alt="eFormX Logo" className="w-12 h-12 rounded-xl shadow-lg shadow-purple/20" />
            </motion.div>
            
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col"
              >
                <span className="text-2xl font-black tracking-tighter text-white">eFormX</span>
                <span className="text-[10px] font-bold text-secondary tracking-[0.3em] uppercase opacity-70">Solutions</span>
              </motion.div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button 
            onClick={onClose}
            className="xl:hidden absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-5 py-6">
          <nav className="space-y-3">
            {menuItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                onClick={() => { if(window.innerWidth < 1280) onClose(); }}
                className={({ isActive }) => 
                  `flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                    isActive 
                      ? "bg-secondary text-white shadow-lg shadow-secondary/25" 
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <div className={`text-2xl flex-shrink-0 group-hover:scale-110 transition-transform ${isCollapsed ? 'w-full flex justify-center' : ''}`}>
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

        {/* Branding Footer */}
        <div className="p-6">
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-5 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 shadow-inner"
            >
              <p className="text-[10px] text-slate-500 font-black mb-2 uppercase tracking-widest">Digital Platform v2.0</p>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  className="h-full bg-secondary shadow-[0_0_10px_rgba(0,123,255,0.5)]"
                ></motion.div>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Enhanced Security Protocol Active</p>
            </motion.div>
          )}
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar
