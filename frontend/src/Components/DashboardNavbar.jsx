import { NavLink } from 'react-router-dom'
import { FiMenu, FiBell, FiSearch, FiChevronLeft, FiChevronRight, FiLogOut, FiUser, FiCreditCard } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

const DashboardNavbar = ({ onLoginClick, onSignupClick, isSidebarCollapsed, toggleSidebar, toggleMobileMenu }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="h-20 bg-purple text-white flex items-center justify-between px-8 sticky top-0 z-40 shadow-lg">
      <div className="flex items-center gap-6">
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

        <div className="hidden md:flex items-center gap-4 font-bold tracking-tight">
          <span className="text-xl opacity-90">eFormX Dashboard</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="hidden xl:flex items-center bg-white/10 rounded-full px-5 py-2.5 gap-3 border border-white/10 focus-within:bg-white/20 transition-all">
          <FiSearch className="text-white/50" />
          <input 
            type="text" 
            placeholder="Search services..." 
            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/40 w-64"
          />
        </div>

        {/* User Stats (If Logged In) */}
        {user && (
          <div className="hidden md:flex items-center gap-4 bg-black/20 px-6 py-2 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <FiCreditCard className="text-secondary" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-black tracking-widest opacity-60 leading-none">Wallet</span>
                <span className="text-sm font-black">₹{parseFloat(user.balance || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        <button className="relative p-2 text-xl hover:bg-white/10 rounded-lg transition-all cursor-pointer">
          <FiBell />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-purple"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-white/20 pl-6 ml-2">
          {user ? (
            <div className="flex items-center gap-4">
              <NavLink to="/profile" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-purple transition-all">
                  <FiUser className="text-lg" />
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-xs font-black tracking-tight leading-none group-hover:text-secondary transition-colors truncate max-w-[100px]">
                    {user.name}
                  </span>
                  <span className="text-[10px] font-bold opacity-60">ID: {user.user_id?.split('AK')[1] || '---'}</span>
                </div>
              </NavLink>
              <button 
                onClick={logout}
                className="p-2.5 rounded-xl bg-red-500/20 text-red-100 hover:bg-red-500 hover:text-white transition-all cursor-pointer border border-red-500/20"
                title="Logout"
              >
                <FiLogOut />
              </button>
            </div>
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
