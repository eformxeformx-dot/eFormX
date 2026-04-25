import { NavLink } from 'react-router-dom'
import { FiMenu, FiBell, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import UserDropdown from './UserDropdown'
import { useSearch } from '../context/SearchContext'

const DashboardNavbar = ({ onLoginClick, onSignupClick, isSidebarCollapsed, toggleSidebar, toggleMobileMenu }) => {
  const { user } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <nav className="h-16 md:h-20 bg-purple text-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 shadow-lg">
      <div className="flex items-center gap-3 md:gap-6">
        {/* Desktop Toggle */}
        <button 
          onClick={toggleSidebar}
          className="hidden lg:flex text-2xl p-2 hover:bg-white/10 rounded-lg transition-all items-center justify-center cursor-pointer"
        >
          {isSidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>

        {/* Mobile Toggle (Hamburger) */}
        <button 
          onClick={toggleMobileMenu}
          className="flex lg:hidden text-2xl p-2 hover:bg-white/10 rounded-lg transition-all items-center justify-center cursor-pointer"
        >
          <FiMenu />
        </button>

        <div className="hidden sm:flex items-center gap-4 font-bold tracking-tight">
          <span className="text-lg md:text-xl opacity-90">eFormX Dashboard</span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        {/* Search Bar */}
        <div className="hidden xl:flex items-center bg-white/10 rounded-full px-5 py-2.5 gap-3 border border-white/10 focus-within:bg-white/20 transition-all">
          <FiSearch className="text-white/50" />
          <input 
            type="text" 
            placeholder="Search services..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/40 w-64"
          />
        </div>

        {/* Notification Bell (Quick view) */}
        <button className="relative p-2 text-xl hover:bg-white/10 rounded-lg transition-all cursor-pointer">
          <FiBell />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-purple"></span>
        </button>

        <div className="flex items-center gap-2 md:gap-3 border-l border-white/20 pl-3 md:pl-6 ml-1 md:ml-2">
          {user ? (
            <UserDropdown />
          ) : (
            <>
              {onLoginClick ? (
                <button 
                  onClick={onLoginClick}
                  className="px-6 py-2 rounded-full border-2 border-white/40 font-bold text-sm hover:bg-white hover:text-purple transition-all cursor-pointer"
                >
                  Login
                </button>
              ) : (
                <NavLink to="/login" className="px-6 py-2 rounded-full border-2 border-white/40 font-bold text-sm hover:bg-white hover:text-purple transition-all">
                  Login
                </NavLink>
              )}

              {onSignupClick ? (
                <button 
                  onClick={onSignupClick}
                  className="px-6 py-2 rounded-full bg-white text-purple font-black text-sm hover:bg-secondary hover:text-white transition-all shadow-xl cursor-pointer"
                >
                  Register
                </button>
              ) : (
                <NavLink to="/signup" className="px-6 py-2 rounded-full bg-white text-purple font-black text-sm hover:bg-secondary hover:text-white transition-all shadow-xl">
                  Register
                </NavLink>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
export default DashboardNavbar
