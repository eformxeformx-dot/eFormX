import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiMenu, FiBell, FiSearch } from 'react-icons/fi'

const DashboardNavbar = () => {
  return (
    <nav className="h-20 bg-purple text-white flex items-center justify-between px-8 sticky top-0 z-40 shadow-lg">
      <div className="flex items-center gap-6">
        <button className="text-2xl p-2 hover:bg-white/10 rounded-lg transition-all">
          <FiMenu />
        </button>
        <div className="hidden md:flex items-center gap-8 font-semibold">
          <NavLink to="/" className="hover:text-secondary transition-colors uppercase tracking-widest text-sm">Home</NavLink>
          <NavLink to="/contact" className="hover:text-secondary transition-colors uppercase tracking-widest text-sm">Contact</NavLink>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center bg-white/10 rounded-xl px-4 py-2 gap-3 border border-white/10 focus-within:bg-white/20 transition-all">
          <FiSearch className="text-white/50" />
          <input 
            type="text" 
            placeholder="Search services..." 
            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/40 w-64"
          />
        </div>

        <button className="relative p-2 text-xl hover:bg-white/10 rounded-lg transition-all">
          <FiBell />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-purple"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-white/20 pl-6 ml-2">
          <NavLink to="/login" className="px-5 py-1.5 rounded-full border-2 border-white/30 font-bold text-sm hover:bg-white hover:text-purple transition-all">
            Login
          </NavLink>
          <NavLink to="/signup" className="px-5 py-2 rounded-full bg-white text-purple font-bold text-sm hover:bg-secondary hover:text-white transition-all shadow-lg">
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default DashboardNavbar
