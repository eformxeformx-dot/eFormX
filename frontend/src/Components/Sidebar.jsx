import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiHome, FiFileText, FiShield, FiInfo, FiAlertTriangle } from 'react-icons/fi'

const Sidebar = () => {
  const menuItems = [
    { icon: <FiHome />, label: "Home", path: "/dashboard" },
    { icon: <FiFileText />, label: "Terms & Conditions", path: "/term-and-condition" },
    { icon: <FiShield />, label: "Privacy Policy", path: "/privacy" },
    { icon: <FiInfo />, label: "About Us", path: "/about" },
    { icon: <FiAlertTriangle />, label: "Disclaimer", path: "/disclaimer" },
  ]

  return (
    <aside className="w-80 h-screen bg-[#2c333d] text-white fixed left-0 top-0 z-50 overflow-y-auto">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <span className="text-secondary font-black text-xl italic">e</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-white/90">eFormX</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) => 
                isActive ? "sidebar-link-active" : "sidebar-link"
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-semibold">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-8 left-8 right-8">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Storage Status</p>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
            <div className="w-1/3 h-full bg-secondary"></div>
          </div>
          <p className="text-[10px] text-slate-500 font-bold">1.2GB of 5GB Used</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
