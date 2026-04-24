import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../Layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiMapPin, FiBriefcase, FiCheckCircle, FiLogIn } from 'react-icons/fi';
import { fetchVacancies, applyService } from '../services/Api';
import { useAuth } from '../context/AuthContext';

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
          const dataArray = Array.isArray(res.data) ? res.data : (res.data?.data || []);
          const filtered = dataArray.filter(job => 
            (job.type?.toLowerCase() === type.toLowerCase()) || 
            (job.details?.company_name?.toLowerCase() === type.toLowerCase())
          );
          setJobs(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, [type]);

const normalizeType = (type) =>
  type?.toLowerCase().trim();

  const handleApply = async (job) => {
    // console.log(job)
    if (!user) {
      openLogin();
      return;
    }

    try {

      const type = normalizeType(job.type);

     console.log("SENDING TYPE:", type);

      // Using job.name and job.token (apply_id) as per user provided URL structure
      const res = await applyService(type, job.token);
      if (res.status) {
        alert("Application Submitted Successfully! 🚀");
      } else {
        alert(`Failed to apply: ${res.message}`);
      }
    } catch (error) {
       console.error("Apply Error:", error);
       alert("An error occurred. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 lg:p-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-purple transition-colors mb-8"
        >
          <FiArrowLeft /> Back to Brands
        </button>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">{type} Openings</h1>
          <p className="text-slate-500 font-medium">Currently showing all active and upcoming roles at {type}</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] text-center border border-slate-100 shadow-xl shadow-slate-200/50">
             <FiBriefcase size={64} className="text-slate-200 mx-auto mb-6" />
             <h3 className="text-2xl font-black text-slate-800">No Openings Found</h3>
             <p className="text-slate-400 mt-2">We couldn't find any active vacancies for {type} at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple/5 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                       <span className="bg-purple/10 text-purple px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{job.details?.applicable_type || 'Full Time'}</span>
                       {job.status === 'approved' && (
                         <span className="bg-green-500/10 text-green-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                           <FiCheckCircle /> Hiring Now
                         </span>
                       )}
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-slate-800 group-hover:text-purple transition-colors mb-1">{job.details?.service_name || job.name}</h3>
                       <div className="flex flex-wrap items-center gap-6 text-slate-400 font-bold text-xs uppercase tracking-widest">
                          <span className="flex items-center gap-2"><FiClock /> {job.opening_date.split(' ')[0]}</span>
                          <span className="flex items-center gap-2 text-purple"><FiClock /> Closing: {job.closing_date.split(' ')[0]}</span>
                       </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-2">
                     <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Fee: ₹{job.platform_fees + job.service_provider_fees + job.gst_fees}</p>
                     <button
                        onClick={() => handleApply(job)}
                        className="bg-purple text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-purple/20 hover:scale-[1.05] transition-transform active:scale-95 flex items-center gap-2"
                     >
                       {user ? <FiCheckCircle /> : <FiLogIn />}
                       {user ? 'Apply Now' : 'Login to Apply'}
                     </button>
                  </div>
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
