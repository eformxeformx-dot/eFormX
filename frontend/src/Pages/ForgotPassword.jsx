import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // API call simulation
      console.log("Forgot Password Request for:", email);
      setMessage("If an account exists with this email, you will receive a reset link shortly.");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="form-card"
      >
        <form className="form" onSubmit={handleSubmit}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Forgot Password</h2>
            <p className="text-gray-500 mt-2">We'll help you get back into your account</p>
          </div>

          <div className="input-group">
            <label className="label">Email Address</label>
            <div className="input-field">
              <svg height={20} viewBox="0 0 32 32" width={20} xmlns="http://www.w3.org/2000/svg">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
              </svg>
              <input 
                type="email" 
                placeholder="Enter your registered email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <button className="button-submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="footer-text">
            Remember your password? <Link to="/login"><span>Log In</span></Link>
          </p>
        </form>
      </motion.div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top left, #f8fafc 0%, #e2e8f0 100%);
  padding: 40px 20px;
  overflow-y: auto;

  .form-card {
    background: white;
    width: 100%;
    max-width: 480px;
    padding: 40px;
    border-radius: 24px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .label {
    font-size: 14px;
    font-weight: 600;
    color: #334155;
  }

  .input-field {
    display: flex;
    align-items: center;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    padding: 0 16px;
    height: 52px;
    transition: all 0.2s ease;
    background: #f8fafc;
  }

  .input-field:focus-within {
    border-color: #2563eb;
    background: white;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
  }

  .input-field svg {
    color: #94a3b8;
    flex-shrink: 0;
  }

  .input-field input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    padding-left: 12px;
    font-size: 15px;
    color: #1e293b;
  }

  .success-message {
    color: #059669;
    font-size: 13px;
    text-align: center;
    background: #d1fae5;
    padding: 10px;
    border-radius: 8px;
  }

  .error-message {
    color: #ef4444;
    font-size: 13px;
    text-align: center;
    background: #fee2e2;
    padding: 10px;
    border-radius: 8px;
  }

  .button-submit {
    height: 52px;
    background: #1e293b;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 10px;
  }

  .button-submit:hover {
    background: #0f172a;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .footer-text {
    text-align: center;
    font-size: 14px;
    color: #64748b;
  }

  .footer-text span {
    color: #2563eb;
    font-weight: 600;
  }

  @media (max-width: 640px) {
    .form-card {
      padding: 30px 20px;
      border-radius: 0;
      box-shadow: none;
      border: none;
    }
    padding: 0;
  }
`;

export default ForgotPassword;
