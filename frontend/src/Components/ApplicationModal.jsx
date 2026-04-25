import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUpload, FiCheckCircle, FiInfo } from 'react-icons/fi';

const ApplicationModal = ({ isOpen, onClose, job, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
  });
  const [files, setFiles] = useState({
    aadhar: null,
    pan: null,
    passbook: null,
    photo: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('phone', formData.phone);
    data.append('email', formData.email);
    if (files.aadhar) data.append('aadhar_card', files.aadhar);
    if (files.pan) data.append('pan_card', files.pan);
    if (files.passbook) data.append('passbook', files.passbook);
    if (files.photo) data.append('photo', files.photo);

    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Apply for {job?.details?.service_name || job?.name}</h2>
              <p className="text-slate-500 font-medium text-sm mt-1">Please fill in your details and upload required documents</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600">
              <FiX size={24} />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8">
            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                <input 
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  type="text" 
                  placeholder="Enter your full name"
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-purple/20 text-slate-800 font-bold placeholder:text-slate-300 transition-all shadow-inner"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                <input 
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="tel" 
                  placeholder="Enter 10-digit number"
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-purple/20 text-slate-800 font-bold placeholder:text-slate-300 transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Document Uploads */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <FiInfo className="text-purple" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-purple">Required Documents</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'aadhar', label: 'Aadhar Card' },
                  { id: 'pan', label: 'PAN Card' },
                  { id: 'passbook', label: 'Bank Passbook' },
                  { id: 'photo', label: 'Passport Photo' }
                ].map((doc) => (
                  <div key={doc.id} className="relative group">
                    <input 
                      type="file" 
                      onChange={(e) => handleFileChange(e, doc.id)}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      accept="image/*,application/pdf"
                    />
                    <div className={`p-4 rounded-2xl border-2 border-dashed transition-all flex items-center justify-between ${files[doc.id] ? 'border-green-500 bg-green-50/50' : 'border-slate-100 bg-slate-50 hover:border-purple/30 group-hover:bg-white'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${files[doc.id] ? 'bg-green-500 text-white' : 'bg-white text-slate-400'}`}>
                          {files[doc.id] ? <FiCheckCircle /> : <FiUpload />}
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-[11px] font-black uppercase tracking-wider ${files[doc.id] ? 'text-green-600' : 'text-slate-500'}`}>{doc.label}</span>
                          <span className="text-[9px] text-slate-400 font-bold truncate max-w-[120px]">
                            {files[doc.id] ? files[doc.id].name : 'Upload File'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Section */}
            <div className="pt-6">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-purple/30 hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <FiCheckCircle />
                    Complete Registration & Apply
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ApplicationModal;
