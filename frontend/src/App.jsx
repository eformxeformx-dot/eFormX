import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import Contact from './Pages/Contact'
import TermAndCondition from './Pages/TermAndCondition'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import Disclaimer from './Pages/Disclaimer'
import About from './Pages/About'
import Profile from './Pages/Profile'
import HelpPage from './Pages/HelpPage'
import NotFoundPage from './Pages/NotFoundPage'
import Dashboard from './Pages/Dashboard'

import Navbar from './Components/Navbar'
import ScrollToTop from './Components/ScrollToTop'

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = [
    '/dashboard',
    '/profile',
    '/term-and-condition',
    '/privacy',
    '/disclaimer',
    '/about-us',
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password'
  ];
  const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="min-h-screen font-sans">
      <ScrollToTop />
      {!shouldHideNavbar && <Navbar />}
      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/services' element={<HomePage />} />
        <Route path='/features' element={<HomePage />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/team' element={<HomePage />} />
        <Route path='/testimonials' element={<HomePage />} />
        <Route path='/faq' element={<HomePage />} />
        <Route path='/download' element={<HomePage />} />
        <Route path='/help' element={<HelpPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/term-and-condition" element={<TermAndCondition />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/about" element={<About />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App