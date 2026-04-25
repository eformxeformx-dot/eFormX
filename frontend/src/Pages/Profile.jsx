import React from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiCreditCard, FiShield, FiTrendingUp, FiChevronRight } from 'react-icons/fi';

const PURPLE = '#6c3fc5';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <DashboardLayout>
        <div style={{ padding: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: 20, color: '#94a3b8', fontWeight: 500 }}>
            Please log in to view your profile
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  const card = {
    background: '#fff',
    border: '0.5px solid #e8e6f0',
    borderRadius: 16,
    padding: '24px',
  };

  const fieldLabel = {
    fontSize: 10,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    fontWeight: 500,
    marginBottom: 4,
  };

  const fieldVal = {
    fontSize: 13,
    color: '#1a1a2e',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontWeight: 500,
  };

  return (
    <DashboardLayout>
      <div style={{ padding: '2rem', maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '2rem' }}
        >
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1a1a2e' }}>Your Profile</h1>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
            Manage your account and view balance
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>

          {/* Left col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Profile card */}
            <div style={card}>
              {/* Avatar + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 16,
                  background: PURPLE,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p style={{ fontSize: 18, fontWeight: 600, color: '#1a1a2e', marginBottom: 8 }}>
                    {user.name}
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: 99,
                      fontSize: 11, fontWeight: 500,
                      background: '#EEEDFE', color: '#534AB7',
                      border: '0.5px solid #AFA9EC',
                    }}>Standard User</span>
                    <span style={{
                      padding: '4px 12px', borderRadius: 99,
                      fontSize: 11, fontWeight: 500,
                      background: '#EAF3DE', color: '#3B6D11',
                      border: '0.5px solid #97C459',
                    }}>Active Account</span>
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20,
                paddingTop: 20,
                borderTop: '0.5px solid #e8e6f0',
              }}>
                <div>
                  <p style={fieldLabel}>Contact Number</p>
                  <p style={fieldVal}>
                    <FiPhone size={14} color={PURPLE} />
                    {user.number || 'N/A'}
                  </p>
                </div>
                <div>
                  <p style={fieldLabel}>Email Address</p>
                  <p style={fieldVal}>
                    <FiMail size={14} color={PURPLE} />
                    {user.email || 'N/A'}
                  </p>
                </div>
                <div>
                  <p style={fieldLabel}>User ID</p>
                  <p style={fieldVal}>
                    <FiShield size={14} color={PURPLE} />
                    {user.user_id || 'Generating...'}
                  </p>
                </div>
              </div>
            </div>

            {/* Transaction history placeholder */}
            <div style={{
              border: '0.5px dashed #d1d5db',
              borderRadius: 14,
              padding: '36px 20px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 8,
              color: '#94a3b8', textAlign: 'center',
            }}>
              <FiTrendingUp size={32} style={{ opacity: 0.4 }} />
              <p style={{ fontSize: 13, fontWeight: 500, color: '#64748b' }}>
                Transaction History
              </p>
              <p style={{ fontSize: 12 }}>
                Recent service applications and payments will appear here
              </p>
            </div>
          </div>

          {/* Right col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Balance card */}
            <div style={{
              background: PURPLE,
              borderRadius: 16,
              padding: 24,
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -30, right: -30,
                width: 100, height: 100,
                background: 'rgba(255,255,255,0.07)',
                borderRadius: '50%',
              }} />
              <p style={{
                fontSize: 10, opacity: 0.7,
                textTransform: 'uppercase', letterSpacing: '0.15em',
                fontWeight: 500, marginBottom: 4,
              }}>
                Available Balance
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, margin: '8px 0 20px' }}>
                <span style={{ fontSize: 14, opacity: 0.7 }}>₹</span>
                <span style={{ fontSize: 36, fontWeight: 700 }}>
                  {parseFloat(user.balance || 0).toLocaleString()}
                </span>
              </div>
              <button style={{
                width: '100%', padding: '10px 0',
                borderRadius: 10, border: 'none',
                background: '#fff', color: PURPLE,
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>
                Add New Funds
              </button>
            </div>

            {/* Security card */}
            <div style={card}>
              <p style={{
                fontSize: 11, fontWeight: 500,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                color: '#94a3b8',
                paddingBottom: 12,
                borderBottom: '0.5px solid #e8e6f0',
                marginBottom: 4,
              }}>
                Account Security
              </p>
              {[
                { label: 'Change Password', icon: <FiShield size={14} /> },
                { label: 'Security Logs', icon: <FiTrendingUp size={14} /> },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  style={{
                    width: '100%', display: 'flex',
                    alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px', borderRadius: 10, border: 'none',
                    background: 'transparent', cursor: 'pointer',
                    fontSize: 13, fontWeight: 500, color: '#1a1a2e',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#f4f2fb';
                    e.currentTarget.style.color = PURPLE;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#1a1a2e';
                  }}
                >
                  <span>{label}</span>
                  <FiChevronRight size={14} style={{ opacity: 0.4 }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;