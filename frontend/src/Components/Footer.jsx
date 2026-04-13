import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    { Icon: FiFacebook,  href: "#" },
    { Icon: FiTwitter,   href: "#" },
    { Icon: FiInstagram, href: "https://www.instagram.com/eformx_pvt" },
    { Icon: FiLinkedin,  href: "https://www.linkedin.com/company/eformx-digital-solutions-pvt-ltd/" },
  ];

  return (
    <footer className="bg-primary text-white pt-20 pb-10 px-4 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Company Bio */}
        <div className="space-y-6">
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="eFormX Logo" className="h-10 w-auto" />
            <span className="text-2xl font-display font-black">
              <span className="text-secondary">e</span>FormX
            </span>
          </NavLink>

          <p className="text-slate-400 leading-relaxed">
            eFormX Digital Solutions Private Limited (Est. 2025) is a
            registered digital service organization in India providing
            secure, reliable, and fast digital business solutions
            nationwide.
          </p>

          <div className="flex gap-4">
            {socials.map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Main Links */}
        <div>
          <h3 className="text-xl font-bold mb-8 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-secondary">
            Main Links
          </h3>
          <ul className="space-y-4 text-slate-400">
            {[
              { label: "Home",     to: "/" },
              { label: "Services", to: "/services" },
              { label: "Features", to: "/features" },
              { label: "Contact",  to: "/contact" },
            ].map(({ label, to }) => (
              <li key={label}>
                <NavLink to={to} className="hover:text-secondary transition-colors">
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-bold mb-8 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-secondary">
            Support
          </h3>
          <ul className="space-y-4 text-slate-400">
            {[
              { label: "Terms of Service", to: "/term-and-condition" },
              { label: "Privacy Policy",   to: "/privacy" },
              { label: "Help Center",      to: "/help" },
              { label: "FAQs",             to: "/faq" },
            ].map(({ label, to }) => (
              <li key={label}>
                <NavLink to={to} className="hover:text-secondary transition-colors">
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-bold mb-8 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-secondary">
            Head Office
          </h3>
          <ul className="space-y-6 text-slate-400">
            <li className="flex gap-4">
              <FiMapPin className="text-secondary flex-shrink-0" size={20} />
              <span>
                Basement Shop No. 01, Tauns Chauraha,<br />
                Kanpur Nagar, Uttar Pradesh – 209401
              </span>
            </li>
            <li className="flex gap-4">
              <FiPhone className="text-secondary flex-shrink-0" size={20} />
              <span>+91 7275004901</span>
            </li>
            <li className="flex gap-4">
              <FiMail className="text-secondary flex-shrink-0" size={20} />
              <span>support@eformx.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
        <p>© {currentYear} eFormX Digital Solutions Private Limited. All rights reserved.</p>
        <p>Designed & Developed with ❤️ for India</p>
      </div>
    </footer>
  );
};

export default Footer;