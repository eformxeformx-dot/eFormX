import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Turnstile } from '@marsidev/react-turnstile';
import { useGoogleLogin } from "@react-oauth/google";
import { loginUser, googleAuth } from '../../services/Api';
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiLock, FiArrowRight, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const LoginForm = ({ onSuccess, isModal = false }) => {
  const navigate = useNavigate();
  const { login, openSignup, openForgotPassword } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSwitchToSignup = (e) => {
    if (isModal) {
      e.preventDefault();
      openSignup();
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
        setError(res.message || "Google login failed.");
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
      const res = await loginUser({
        login_id: formData.email,
        password: formData.password,
        cf_turnstile_response: turnstileToken || "dev-token"
      });

      console.log("Login Success:", res);
      
      if (res.status) {
        // Save token and login globally
        login(res.data, res.data.auth_token);
        
        if (onSuccess) {
          onSuccess(res.data);
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(res.message || "Invalid credentials.");
      }

    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed. Please check your credentials.");
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
        <div className="text-center mb-6 md:mb-8">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="logo-icon"
          >
            <FiLock size={32} />
          </motion.div>
          <h2 className="title">Welcome Back</h2>
          <p className="subtitle">Securely sign in to your eFormX account</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">Account Identity</label>
            <div className="input-field">
              <FiMail className="field-icon" />
              <input 
                type="text" 
                name="email"
                placeholder="Email or number" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="label">Security Password</label>
            <div className="input-field">
              <FiLock className="field-icon" />
              <input 
                type="password" 
                name="password"
                placeholder="Enter password" 
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

          <div className="options-row">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span className="checkbox-custom"></span>
              <span className="text text-xs sm:text-sm">Keep me signed in</span>
            </label>
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); openForgotPassword(); }}
              className="text-xs sm:text-sm text-indigo-600 font-semibold hover:text-indigo-500 bg-transparent border-none cursor-pointer"
            >
              Forgot?
            </button>
          </div>

          <button className="submit-btn" disabled={loading}>
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                <span>Sign In Automatically</span>
                <FiArrowRight />
              </>
            )}
          </button>

          <p className="auth-footer text-sm sm:text-base">
            New to eFormX? <Link to="/signup" onClick={handleSwitchToSignup}>Create Account</Link>
          </p>
          
          <div className="auth-divider">
            <span>Enterprise Login</span>
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
    background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin: 0 auto 1rem;
    box-shadow: 0 10px 20px -5px rgba(67, 56, 202, 0.4);

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
    margin-bottom: 0.5rem;

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
    gap: 1.25rem;
    margin-top: 1.5rem;

    @media (max-width: 480px) {
      gap: 1rem;
      margin-top: 1rem;
    }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
    border-radius: 16px;
    height: 56px;
    padding: 0 1.25rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    @media (max-width: 480px) {
      height: 48px;
    }
  }

  .input-field:focus-within {
    background: white;
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }

  .field-icon {
    color: #94a3b8;
    font-size: 1.25rem;
    transition: color 0.3s ease;
  }

  .input-field:focus-within .field-icon {
    color: #6366f1;
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

  .options-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    font-size: 0.875rem;
    color: #64748b;
    user-select: none;
  }

  .checkbox-label input {
    display: none;
  }

  .checkbox-custom {
    width: 20px;
    height: 20px;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    display: inline-block;
    position: relative;
    transition: all 0.2s ease;
  }

  .checkbox-label input:checked + .checkbox-custom {
    background: #6366f1;
    border-color: #6366f1;
  }

  .checkbox-label input:checked + .checkbox-custom::after {
    content: '✓';
    position: absolute;
    color: white;
    font-size: 12px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .options-row a {
    color: #6366f1;
    font-weight: 600;
    font-size: 0.875rem;
    text-decoration: none;
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
    margin-top: 0.5rem;

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
    color: #6366f1;
    font-weight: 700;
    text-decoration: none;
  }

  .auth-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
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

export default LoginForm;
