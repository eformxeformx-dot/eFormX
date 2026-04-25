import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiMail, FiPhone, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'
import logo from '../assets/logo.png'
import { useAuth } from '../context/AuthContext'
import UserDropdown from './UserDropdown'

const socials = [
  { Icon: FiFacebook, href: "/" },
  { Icon: FiTwitter, href: "/" },
  { Icon: FiInstagram, href: "https://www.instagram.com/eformx_pvt" },
  { Icon: FiLinkedin, href: "https://www.linkedin.com/company/eformx-digital-solutions-pvt-ltd/" },
]

const Navbar = () => {
  const { user, openLogin } = useAuth();

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
          {socials.map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary cursor-pointer transition-colors"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm py-4 px-4 md:px-12 flex justify-between items-center transition-all duration-300">
        <NavLink to="/" className="text-2xl font-display font-black text-primary flex items-center gap-2">
          <img src={logo} alt="EFORMX Logo" className="h-10 w-auto" />
          eFormX
        </NavLink>

        <div className="hidden md:flex items-center gap-8 font-semibold text-primary/80">
          {[
            { label: 'Home', to: '/' },
            { label: 'Services', to: '/services' },
            { label: 'Features', to: '/features' },
            { label: 'About', to: '/about' },
            { label: 'Contact', to: '/contact' },
          ].map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                isActive ? 'text-secondary' : 'hover:text-secondary transition-colors'
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="scale-90 md:scale-100">
              <UserDropdown />
            </div>
          )}

          {user ? (
            <NavLink to="/dashboard" className="btn-primary cursor-pointer">
              Dashboard
            </NavLink>
          ) : (
            <button onClick={openLogin} className="btn-primary cursor-pointer">
              Get Started
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
