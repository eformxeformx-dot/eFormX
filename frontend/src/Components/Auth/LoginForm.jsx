import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { loginUser } from '../../services/Api';
import { useAuth } from '../../context/AuthContext';

const LoginForm = ({ onSuccess, isModal = false }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await loginUser({
        login_id: formData.email,
        password: formData.password
      });

      console.log("Login Success:", res);
      
      if (res.status) {
        // Save token and login globally
        login(res.data, res.data.auth_token);
        
        if (onSuccess) {
          onSuccess(res.data);
        } else {
          alert("Login Successful 🚀");
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
      <form className="form" onSubmit={handleSubmit}>
        <div className="text-center mb-2 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-700 tracking-tight">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your eFormx account</p>
        </div>

        <div className="input-group">
          <label className="label">Email or Mobile Number</label>
          <div className="input-field">
            <svg height={20} viewBox="0 0 32 32" width={20} xmlns="http://www.w3.org/2000/svg">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
            </svg>
            <input 
              type="text" 
              name="email"
              placeholder="Enter email or number" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label className="label">Password</label>
          <div className="input-field">
            <svg height={20} viewBox="-64 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg">
              <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
              <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
            </svg>
            <input 
              type="password" 
              name="password"
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="flex-row">
          <label className="remember-me">
            <input 
              type="checkbox" 
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <span>Remember me </span>
          </label>
          <Link to="/forgot-password" style={{ color: '#2563eb', fontSize: '14px', fontWeight: '500' }}>
            Forget your password?
          </Link>
        </div>

        <button className="button-submit" disabled={loading}>
          {loading ? "Authenticating..." : "Sign In"}
        </button>

        <p className="footer-text">
          Don't have an account? <Link to="/signup"><span>Sign Up</span></Link>
        </p>
        
        <div className="divider">
          <span>Or continue with</span>
        </div>

        <div className="social-login">
          <button type="button" className="social-btn">
            <svg version="1.1" width={20} viewBox="0 0 512 512">
              <path style={{ fill: '#FBBB00' }} d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z" />
              <path style={{ fill: '#518EF8' }} d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z" />
              <path style={{ fill: '#28B446' }} d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" />
              <path style={{ fill: '#F14336' }} d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z" />
            </svg>
            Google
          </button>
          <button type="button" className="social-btn">
            <svg height={20} width={20} viewBox="0 0 22.773 22.773">
              <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />
              <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
            </svg>
            Apple
          </button>
        </div>
      </form>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.$isModal ? '100%' : '480px'};
  
  /* Hide scrollbar but keep functionality */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  
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
    font-weight: 700;
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

  .flex-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .remember-me {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
    color: #64748b;
  }

  .error-message {
    color: #ef4444;
    font-size: 13px;
    text-align: center;
    background: #fee2e2;
    padding: 8px;
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

  .divider {
    display: flex;
    align-items: center;
    text-align: center;
    color: #94a3b8;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 10px 0;
  }

  .divider::before, .divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }

  .divider span {
    padding: 0 10px;
  }

  .social-login {
    display: flex;
    gap: 12px;
  }

  .social-btn {
    flex: 1;
    height: 48px;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .social-btn:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

export default LoginForm;
