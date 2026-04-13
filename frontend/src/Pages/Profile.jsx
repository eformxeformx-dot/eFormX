import React from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiCreditCard, FiShield, FiTrendingUp } from 'react-icons/fi';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <DashboardLayout>
        <div className="p-12 text-center">
          <h2 className="text-2xl font-bold text-slate-400">Please log in to view your profile</h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Your Profile</h1>
          <p className="text-slate-500 font-medium">Manage your account and view balance</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="w-32 h-32 rounded-[2.5rem] bg-purple flex items-center justify-center shadow-2xl shadow-purple/30 group">
                  <span className="text-5xl text-white font-black group-hover:scale-110 transition-transform">
                    {user.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">{user.name}</h2>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <span className="bg-purple/10 text-purple px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest leading-none border border-purple/10">Standard User</span>
                    <span className="bg-green-500/10 text-green-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest leading-none border border-green-500/10">Active Account</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Contact Number</label>
                  <p className="flex items-center gap-3 text-slate-700 font-bold">
                    <FiPhone className="text-purple" /> {user.number || 'N/A'}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Email Address</label>
                  <p className="flex items-center gap-3 text-slate-700 font-bold">
                    <FiMail className="text-purple" /> {user.email || 'N/A'}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">User ID</label>
                  <p className="flex items-center gap-3 text-slate-700 font-bold">
                    <FiShield className="text-purple" /> {user.user_id || 'Generating...'}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activities Placeholder */}
            <div className="bg-slate-50 rounded-[2.5rem] p-10 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
               <FiTrendingUp size={48} className="text-slate-300 mb-4" />
               <h4 className="text-slate-500 font-black uppercase tracking-widest text-sm mb-1">Transaction History</h4>
               <p className="text-slate-400 text-xs">Recent service applications and payments will appear here</p>
            </div>
          </div>

          {/* Balance Sidebar Card */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple to-secondary rounded-[2.5rem] p-10 text-white shadow-2xl shadow-purple/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <FiCreditCard size={120} />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-2">Available Balance</p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-sm font-bold opacity-70">₹</span>
                  <span className="text-5xl font-black tracking-tighter">{parseFloat(user.balance || 0).toLocaleString()}</span>
                </div>
                <button className="w-full bg-white text-purple py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-transform active:scale-95">
                  Add New Funds
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
               <h4 className="text-slate-800 font-black text-sm uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">Account Security</h4>
               <div className="space-y-4">
                 <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                    <span className="text-sm font-bold text-slate-600 group-hover:text-purple">Change Password</span>
                    <FiShield className="text-slate-400 group-hover:text-purple" />
                 </button>
                 <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                    <span className="text-sm font-bold text-slate-600 group-hover:text-purple">Security Logs</span>
                    <FiTrendingUp className="text-slate-400 group-hover:text-purple" />
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
