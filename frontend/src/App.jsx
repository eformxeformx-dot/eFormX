import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Contact from './Pages/Contact'
import TermAndCondition from './Pages/TermAndCondition'
import Dashboard from './Pages/Dashboard'
import Navbar from './Components/Navbar'

const App = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen">
      {!isDashboard && <Navbar />}
      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/term-and-condition" element={<TermAndCondition />} />
        <Route path="/privacy" element={<div className="pt-32 text-center text-4xl font-bold">Privacy Policy (Coming Soon)</div>} />
        <Route path="/about" element={<div className="pt-32 text-center text-4xl font-bold">About Us (Coming Soon)</div>} />
        <Route path="/disclaimer" element={<div className="pt-32 text-center text-4xl font-bold">Disclaimer (Coming Soon)</div>} />
        <Route path='*' element={<div className="pt-32 text-center text-4xl font-black">404 Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App