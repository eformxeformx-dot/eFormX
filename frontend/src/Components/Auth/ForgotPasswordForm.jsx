import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiArrowRight, FiArrowLeft, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const ForgotPasswordForm = () => {
  const { openLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Logic for password reset (placeholder for now)
      console.log("Password reset requested for:", email);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API
      setSuccess(true);
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <SuccessWrapper
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="success-icon">
          <FiCheckCircle size={48} />
        </div>
        <h2 className="title">Email Sent!</h2>
        <p className="subtitle">We've sent a password recovery link to <strong>{email}</strong>. Please check your inbox.</p>
        <button className="submit-btn mt-8" onClick={(e) => { e.preventDefault(); openLogin(); }}>
          Back to Login
        </button>
      </SuccessWrapper>
    );
  }

  return (
    <FormWrapper>
      <div className="text-center mb-8">
        <div className="logo-icon">
          <FiMail size={32} />
        </div>
        <h2 className="title">Reset Password</h2>
        <p className="subtitle">Enter your email to receive recovery instructions</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="label">Registered Email</label>
          <div className="input-field">
            <FiMail className="field-icon" />
            <input 
              type="email" 
              placeholder="john@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="error-box"
            >
              <FiAlertCircle />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button className="submit-btn" disabled={loading}>
          {loading ? (
            <span className="loading-spinner"></span>
          ) : (
            <>
              <span>Send Recovery Link</span>
              <FiArrowRight />
            </>
          )}
        </button>

        <button 
          type="button"
          onClick={(e) => { e.preventDefault(); openLogin(); }}
          className="back-btn"
        >
          <FiArrowLeft />
          <span>Return to Log In</span>
        </button>
      </form>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  width: 100%;

  .logo-icon {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin: 0 auto 1.5rem;
    box-shadow: 0 10px 20px -5px rgba(217, 119, 6, 0.4);

    @media (max-width: 480px) {
      width: 52px;
      height: 52px;
      margin-bottom: 0.75rem;
    }
  }

  .title {
    font-size: 2rem;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 0.5rem;
    @media (max-width: 480px) { font-size: 1.5rem; }
  }

  .subtitle {
    color: #64748b;
    font-size: 0.95rem;
    @media (max-width: 480px) { font-size: 0.85rem; }
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .input-field {
    position: relative;
    display: flex;
    align-items: center;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 16px;
    height: 56px;
    padding: 0 1.25rem;

    @media (max-width: 480px) { height: 48px; }

    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      padding: 0 0.75rem;
      font-size: 1rem;
    }
  }

  .field-icon {
    color: #94a3b8;
    font-size: 1.25rem;
  }

  .error-box {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: #fef2f2;
    padding: 1rem;
    border-radius: 12px;
    color: #b91c1c;
    font-size: 0.875rem;
  }

  .submit-btn {
    height: 56px;
    background: #0f172a;
    color: white;
    border: none;
    border-radius: 16px;
    font-size: 1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .back-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: #64748b;
    font-weight: 600;
    font-size: 0.875rem;
    background: none;
    border: none;
    cursor: pointer;
    &:hover { color: #1e293b; }
  }

  .loading-spinner {
    width: 24px;
    height: 24px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
`;

const SuccessWrapper = styled(motion.div)`
  .success-icon {
    width: 80px;
    height: 80px;
    background: #ecfdf5;
    color: #10b981;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
  }

  .title { font-size: 2rem; font-weight: 800; color: #1e293b; }
  .subtitle { color: #64748b; }
  
  .submit-btn {
    width: 100%;
    height: 56px;
    background: #0f172a;
    color: white;
    border-radius: 16px;
    font-weight: 700;
  }
`;

export default ForgotPasswordForm;
