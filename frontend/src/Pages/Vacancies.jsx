import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../Layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { FiBriefcase, FiShoppingBag, FiTruck, FiGlobe, FiAlertCircle } from 'react-icons/fi';
import { fetchVacancies } from '../services/Api';

const PURPLE = '#6c3fc5';
const PURPLE_HOVER_BG = '#EAE6FB';
const PURPLE_HOVER_BORDER = '#AFA9EC';
const PURPLE_DARK = '#5430a8';

const getBrandIcon = (brand) => {
  const b = brand.toLowerCase();
  if (b.includes('amazon') || b.includes('flipkart') || b.includes('meesho') || b.includes('myntra'))
    return <FiShoppingBag />;
  if (b.includes('government') || b.includes('govt') || b.includes('sarkari'))
    return <FiGlobe />;
  if (b.includes('delivery') || b.includes('logistics') || b.includes('truck'))
    return <FiTruck />;
  return <FiBriefcase />;
};

const VacancyCard = ({ brand, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? PURPLE_HOVER_BG : '#ffffff',
        border: `0.5px solid ${hovered ? PURPLE_HOVER_BORDER : '#e8e6f0'}`,
        borderRadius: 12,
        padding: '18px 16px 14px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        transition: 'background 0.18s, border-color 0.18s',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
      }}
    >
      {/* Icon box */}
      <div style={{
        width: 42, height: 42,
        borderRadius: 10,
        background: hovered ? '#fff' : '#f4f2fb',
        border: '0.5px solid #e8e6f0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20,
        color: PURPLE,
        marginBottom: 4,
        transition: 'background 0.18s',
      }}>
        {getBrandIcon(brand.name)}
      </div>

      {/* Title */}
      <p style={{
        fontSize: 14, fontWeight: 600, margin: 0,
        color: hovered ? PURPLE : '#1a1a2e',
        transition: 'color 0.18s',
      }}>
        {brand.name}
      </p>

      {/* Count */}
      <p style={{
        fontSize: 11, margin: 0,
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        {brand.count} Available Job{brand.count !== 1 ? 's' : ''}
      </p>

      {/* CTA */}
      <button
        style={{
          marginTop: 6,
          width: '100%',
          padding: '8px 0',
          borderRadius: 8,
          border: 'none',
          background: PURPLE,
          color: '#fff',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
        }}
        onMouseEnter={e => e.currentTarget.style.background = PURPLE_DARK}
        onMouseLeave={e => e.currentTarget.style.background = PURPLE}
      >
        View Jobs
      </button>
    </motion.div>
  );
};

const Vacancies = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadVacancies = async () => {
      try {
        setLoading(true);
        const res = await fetchVacancies();
        const dataArray = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        const grouped = dataArray.reduce((acc, job) => {
          const brand = job.type || job.details?.company_name || 'Other';
          if (!acc[brand]) acc[brand] = { name: brand, count: 0 };
          acc[brand].count += 1;
          return acc;
        }, {});

        setBrands(Object.values(grouped));
      } catch (error) {
        console.error('Failed to fetch vacancies:', error);
      } finally {
        setLoading(false);
      }
    };
    loadVacancies();
  }, []);

  return (
    <DashboardLayout>
      <div style={{ padding: '2rem 2rem 3rem' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '2rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ height: 3, width: 36, background: PURPLE, borderRadius: 99 }} />
            <span style={{
              fontSize: 11, fontWeight: 600, color: PURPLE,
              textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>
              Job Portals
            </span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
            Available Vacancies / रिक्तियां
          </h1>
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 6 }}>
            Browse openings from India's top companies and government sectors
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

        {/* Empty state */}
        {!loading && brands.length === 0 && (
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '3rem 1rem', gap: 12,
            border: '0.5px dashed #d1d5db',
            borderRadius: 12, color: '#94a3b8',
          }}>
            <FiAlertCircle size={32} />
            <p style={{ fontSize: 14, margin: 0 }}>No vacancies found at the moment.</p>
          </div>
        )}

        {/* Cards grid */}
        {!loading && brands.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 14,
          }}>
            {brands.map((brand, idx) => (
              <VacancyCard
                key={idx}
                brand={brand}
                onClick={() => navigate(`/vacancies/${brand.name}`)}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Vacancies;