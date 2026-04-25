import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../Layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiBriefcase, FiCheckCircle, FiLogIn, FiAlertCircle } from 'react-icons/fi';
import { fetchVacancies, applyService } from '../services/Api';
import { useAuth } from '../context/AuthContext';

const PURPLE = '#6c3fc5';
const PURPLE_DARK = '#5430a8';

const VacancyDetails = () => {
  const { type } = useParams();
  const { user, openLogin } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const res = await fetchVacancies();
        if (res.status) {
          const dataArray = Array.isArray(res.data) ? res.data : res.data?.data || [];
          const filtered = dataArray.filter(job =>
            job.type?.toLowerCase() === type.toLowerCase() ||
            job.details?.company_name?.toLowerCase() === type.toLowerCase()
          );
          setJobs(filtered);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, [type]);

  const handleApply = async (job) => {
    if (!user) { openLogin(); return; }
    try {
      const normalizedType = job.type?.toLowerCase().trim();
      const res = await applyService(normalizedType, job.token);
      if (res.status) {
        alert('Application Submitted Successfully!');
      } else {
        alert(`Failed to apply: ${res.message}`);
      }
    } catch (error) {
      console.error('Apply Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <DashboardLayout>
      <div style={{ padding: '2rem' }}>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 600, color: '#94a3b8',
            textTransform: 'uppercase', letterSpacing: '0.1em',
            background: 'none', border: 'none', cursor: 'pointer',
            marginBottom: '1.5rem',
          }}
          onMouseEnter={e => e.currentTarget.style.color = PURPLE}
          onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
        >
          <FiArrowLeft /> Back to Brands
        </button>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ marginBottom: '2rem' }}
        >
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1a1a2e' }}>{type} Openings</h1>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
            Currently showing all active and upcoming roles at {type}
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              border: `3px solid ${PURPLE}20`,
              borderTop: `3px solid ${PURPLE}`,
              animation: 'spin 0.8s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Empty */}
        {!loading && jobs.length === 0 && (
          <div style={{
            background: '#fff', borderRadius: 16,
            border: '0.5px solid #e8e6f0',
            padding: '4rem 2rem', textAlign: 'center',
          }}>
            <FiBriefcase size={48} style={{ color: '#e2e8f0', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a2e' }}>No Openings Found</h3>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 6 }}>
              We couldn't find any active vacancies for {type} at this time.
            </p>
          </div>
        )}

        {/* Job cards */}
        {!loading && jobs.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {jobs.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                style={{
                  background: '#fff',
                  border: '0.5px solid #e8e6f0',
                  borderRadius: 16,
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 24,
                  flexWrap: 'wrap',
                }}
              >
                {/* Left info */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 99,
                      fontSize: 10, fontWeight: 600,
                      background: '#EEEDFE', color: '#534AB7',
                      border: '0.5px solid #AFA9EC',
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}>
                      {job.details?.applicable_type || 'Full Time'}
                    </span>
                    {job.status === 'approved' && (
                      <span style={{
                        padding: '3px 10px', borderRadius: 99,
                        fontSize: 10, fontWeight: 600,
                        background: '#EAF3DE', color: '#3B6D11',
                        border: '0.5px solid #97C459',
                        display: 'flex', alignItems: 'center', gap: 4,
                        textTransform: 'uppercase', letterSpacing: '0.08em',
                      }}>
                        <FiCheckCircle size={10} /> Hiring Now
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: 17, fontWeight: 600, color: '#1a1a2e', margin: 0 }}>
                    {job.details?.service_name || job.name}
                  </h3>

                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      fontSize: 11, color: '#94a3b8', fontWeight: 500,
                      textTransform: 'uppercase', letterSpacing: '0.07em',
                    }}>
                      <FiClock size={11} /> Opens: {job.opening_date?.split(' ')[0]}
                    </span>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      fontSize: 11, color: PURPLE, fontWeight: 500,
                      textTransform: 'uppercase', letterSpacing: '0.07em',
                    }}>
                      <FiClock size={11} /> Closes: {job.closing_date?.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Right CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Fee: ₹{(job.platform_fees ?? 0) + (job.service_provider_fees ?? 0) + (job.gst_fees ?? 0)}
                  </p>
                  <button
                    onClick={() => handleApply(job)}
                    style={{
                      background: PURPLE, color: '#fff',
                      padding: '10px 24px', borderRadius: 10,
                      border: 'none', cursor: 'pointer',
                      fontSize: 12, fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: 6,
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = PURPLE_DARK}
                    onMouseLeave={e => e.currentTarget.style.background = PURPLE}
                  >
                    {user ? <FiCheckCircle size={13} /> : <FiLogIn size={13} />}
                    {user ? 'Apply Now' : 'Login to Apply'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VacancyDetails;