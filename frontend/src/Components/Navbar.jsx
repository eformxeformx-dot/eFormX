import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiMail, FiPhone, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <header className="w-full fixed top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4 md:px-12 flex justify-between items-center text-sm border-b border-white/10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FiMail size={14} className="text-secondary" />
            <span>support@eformx.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FiPhone size={14} className="text-secondary" />
            <span>+91 7275004901</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <FiFacebook size={14} className="hover:text-secondary cursor-pointer transition-colors" />
          <FiTwitter size={14} className="hover:text-secondary cursor-pointer transition-colors" />
          <FiInstagram size={14} className="hover:text-secondary cursor-pointer transition-colors" />
          <FiLinkedin size={14} className="hover:text-secondary cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm py-4 px-4 md:px-12 flex justify-between items-center transition-all duration-300">
        <NavLink to="/" className="text-2xl font-display font-black text-primary flex items-center gap-2">
          <img src={logo} alt="EFORMX Logo" className="h-10 w-auto" />
          eFormX
        </NavLink>

        <div className="hidden md:flex items-center gap-8 font-semibold text-primary/80">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-secondary" : "hover:text-secondary transition-colors"
            }
          >
            Home
          </NavLink>

          <a href="#services" className="hover:text-secondary transition-colors">
            Services
          </a>

          <a href="#features" className="hover:text-secondary transition-colors">
            Features
          </a>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-secondary" : "hover:text-secondary transition-colors"
            }
          >
            Contact
          </NavLink>
        </div>

        <NavLink to="/dashboard" className="btn-primary">
          Get Started
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar