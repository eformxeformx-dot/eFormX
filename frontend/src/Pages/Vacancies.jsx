import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../Layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { FiBriefcase, FiShoppingBag, FiTruck, FiGlobe } from 'react-icons/fi';
import { fetchVacancies } from '../services/Api';

const Vacancies = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadVacancies = async () => {
      try {
        setLoading(true);
        const res = await fetchVacancies();
        console.log("Vacancies API Response:", res);
        
        const dataArray = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        
        if (dataArray.length > 0) {
          const grouped = dataArray.reduce((acc, job) => {
            const brand = job.type || job.details?.company_name || 'Other';
            if (!acc[brand]) {
              acc[brand] = { name: brand, count: 0 };
            }
            acc[brand].count += 1;
            return acc;
          }, {});
          setBrands(Object.values(grouped));
        } else {
          setBrands([]);
        }
      } catch (error) {
        console.error("Failed to fetch vacancies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadVacancies();
  }, []);

  const getBrandIcon = (brand) => {
    const b = brand.toLowerCase();
    if (b.includes('amazon') || b.includes('flipkart') || b.includes('meesho') || b.includes('myntra')) return <FiShoppingBag />;
    if (b.includes('government')) return <FiGlobe />;
    return <FiBriefcase />;
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 lg:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
             <div className="h-1 w-12 bg-purple rounded-full"></div>
             <p className="text-purple font-black uppercase tracking-widest text-xs">Job Portals</p>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Available Vacancies / रिक्तियां</h1>
          <p className="text-slate-500 font-medium mt-2">Browse openings from India's top companies and government sectors</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                onClick={() => navigate(`/vacancies/${brand.name}`)}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-6 cursor-pointer group hover:border-purple/20 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-purple/10 flex items-center justify-center text-purple text-3xl group-hover:bg-purple group-hover:text-white transition-colors">
                  {getBrandIcon(brand.name)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 group-hover:text-purple transition-colors">{brand.name}</h3>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{brand.count} Available Jobs</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Vacancies;
