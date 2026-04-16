import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Turnstile } from '@marsidev/react-turnstile';
import { useGoogleLogin } from '@react-oauth/google';
import { registerUser, googleAuth } from '../../services/Api';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiPhone, FiMail, FiLock, FiArrowRight, FiShield, FiAlertCircle } from 'react-icons/fi';

const SignupForm = ({ onSuccess, isModal = false }) => {
  const navigate = useNavigate();
  const { login, openLogin } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    number: '',
    email_id: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwitchToLogin = (e) => {
    if (isModal) {
      e.preventDefault();
      openLogin();
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    setLoading(true);
    setError('');
    try {
      const res = await googleAuth(tokenResponse.access_token);
      if (res.status && res.data?.auth_token) {
        login(res.data, res.data.auth_token);
        if (onSuccess) onSuccess(res.data);
        else navigate("/dashboard");
      } else {
        setError(res.message || "Google registration failed.");
      }
    } catch (err) {
      setError(err.message || "Google authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setError("Google Login Failed")
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!turnstileToken && process.env.NODE_ENV === 'production') {
      setError("Please complete the security check.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await registerUser({
        ...formData,
        cf_turnstile_response: turnstileToken || "dev-token"
      });
      console.log("Registration Success:", res);
      
      if (res.status) {
        if (res.data?.auth_token) {
          login(res.data, res.data.auth_token);
        }

        if (onSuccess) {
          onSuccess(res.data);
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(res.message || "Registration failed.");
      }

    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <FormWrapper $isModal={isModal}>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="form-container"
      >
        <div className="text-center mb-5 md:mb-6">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="logo-icon"
          >
            <FiShield size={32} />
          </motion.div>
          <h2 className="title">Create Account</h2>
          <p className="subtitle">Join eFormX digital infrastructure</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="name-row">
            <div className="input-group">
              <label className="label">First Name</label>
              <div className="input-field">
                <FiUser className="field-icon" />
                <input 
                  type="text" 
                  name="first_name"
                  placeholder="John" 
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label className="label">Last Name</label>
              <div className="input-field">
                <input 
                  type="text" 
                  name="last_name"
                  placeholder="Doe" 
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label className="label">Phone Number</label>
            <div className="input-field">
              <FiPhone className="field-icon" />
              <input 
                type="text" 
                name="number"
                placeholder="Enter mobile number" 
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="label">Email Address</label>
            <div className="input-field">
              <FiMail className="field-icon" />
              <input 
                type="email" 
                name="email_id"
                placeholder="john@example.com" 
                value={formData.email_id}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="label">Secure Password</label>
            <div className="input-field">
              <FiLock className="field-icon" />
              <input 
                type="password" 
                name="password"
                placeholder="Min. 8 characters" 
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="turnstile-container">
            <Turnstile 
              siteKey="0x4AAAAAAC9ANWPWRygmaguQ" 
              onSuccess={(token) => setTurnstileToken(token)}
            />
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
                <span>Register Account</span>
                <FiArrowRight />
              </>
            )}
          </button>

          <p className="auth-footer text-sm sm:text-base">
            Already have an account? <Link to="/login" onClick={handleSwitchToLogin}>Log In</Link>
          </p>
          
          <div className="auth-divider">
            <span>Quick Register</span>
          </div>

          <div className="auth-social">
            <button 
              type="button" 
              className="social-pill"
              onClick={() => loginWithGoogle()}
              disabled={loading}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" />
              Google
            </button>
            <button type="button" className="social-pill">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="A" />
              Apple
            </button>
          </div>
        </form>
      </motion.div>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.$isModal ? '100%' : '520px'};
  
  .form-container {
    background: transparent;
  }

  .logo-icon {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin: 0 auto 1.25rem;
    box-shadow: 0 10px 20px -5px rgba(16, 185, 129, 0.4);

    @media (max-width: 480px) {
      width: 52px;
      height: 52px;
      margin-bottom: 0.75rem;
      border-radius: 16px;
      
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }

  .title {
    font-size: 2rem;
    font-weight: 800;
    color: #1e293b;
    letter-spacing: -0.025em;
    margin-bottom: 0.25rem;

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }

  .subtitle {
    color: #64748b;
    font-size: 0.95rem;

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;

    @media (max-width: 480px) {
      gap: 0.75rem;
      margin-top: 1rem;
    }
  }

  .name-row {
    display: flex;
    gap: 1rem;

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 0.75rem;
    }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex: 1;
  }

  .label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #475569;
    padding-left: 0.25rem;
  }

  .input-field {
    position: relative;
    display: flex;
    align-items: center;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 14px;
    height: 52px;
    padding: 0 1.25rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    @media (max-width: 480px) {
      height: 48px;
    }
  }

  .input-field:focus-within {
    background: white;
    border-color: #10b981;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
  }

  .field-icon {
    color: #94a3b8;
    font-size: 1.25rem;
    transition: color 0.3s ease;
  }

  .input-field:focus-within .field-icon {
    color: #10b981;
  }

  .input-field input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    padding: 0 0.75rem;
    font-size: 1rem;
    color: #0f172a;
    font-weight: 500;

    @media (max-width: 480px) {
      font-size: 0.9375rem;
    }
  }

  .turnstile-container {
    display: flex;
    justify-content: center;
    margin: 0.25rem 0;
  }

  .error-box {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: #fef2f2;
    border: 1px solid #fee2e2;
    padding: 0.75rem;
    border-radius: 12px;
    color: #b91c1c;
    font-size: 0.875rem;
    font-weight: 500;
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
    margin-top: 0.25rem;

    @media (max-width: 480px) {
      height: 48px;
    }
  }

  .submit-btn:hover:not(:disabled) {
    background: #1e293b;
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .auth-footer {
    text-align: center;
    font-size: 0.9375rem;
    color: #64748b;
  }

  .auth-footer a {
    color: #10b981;
    font-weight: 700;
    text-decoration: none;
  }

  .auth-divider {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0.75rem 0;
  }

  .auth-divider::before, .auth-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e2e8f0;
  }

  .auth-divider span {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #94a3b8;
    letter-spacing: 0.05em;
  }

  .auth-social {
    display: flex;
    gap: 1rem;
  }

  .social-pill {
    flex: 1;
    height: 48px;
    border: 2px solid #e2e8f0;
    border-radius: 14px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    font-weight: 600;
    color: #334155;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (max-width: 480px) {
      height: 40px;
      font-size: 0.8125rem;
      border-radius: 12px;
    }
  }

  .social-pill:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }

  .social-pill img {
    height: 20px;
    width: 20px;
  }

  .loading-spinner {
    width: 24px;
    height: 24px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default SignupForm;
