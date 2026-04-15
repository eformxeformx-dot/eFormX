import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { registerUser } from '../../services/Api';
import { useAuth } from '../../context/AuthContext';

const SignupForm = ({ onSuccess, isModal = false }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    number: '',
    email_id: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await registerUser(formData);
      console.log("Registration Success:", res);
      
      if (res.status) {
        // If the API returns a token on register, login immediately
        if (res.data?.auth_token) {
          login(res.data, res.data.auth_token);
        }

        if (onSuccess) {
          onSuccess(res.data);
        } else {
          alert("Registration Successful! 🚀");
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
      <form className="form" onSubmit={handleSubmit}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h2>
          <p className="text-gray-500 mt-2">Join the eFormx infrastructure</p>
        </div>

        <div className="flex gap-4">
          <div className="input-group flex-1">
            <label className="label">First Name</label>
            <div className="input-field">
              <input 
                type="text" 
                name="first_name"
                placeholder="First name" 
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-group flex-1">
            <label className="label">Last Name</label>
            <div className="input-field">
              <input 
                type="text" 
                name="last_name"
                placeholder="Last name" 
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
            <input 
              type="email" 
              name="email_id"
              placeholder="Enter email address" 
              value={formData.email_id}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label className="label">Password</label>
          <div className="input-field">
            <input 
              type="password" 
              name="password"
              placeholder="Create password" 
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="button-submit" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="footer-text">
          Already have an account? <Link to="/login"><span>Log In</span></Link>
        </p>
        
        <div className="divider">
          <span>Or register with</span>
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
  max-width: ${props => props.$isModal ? '100%' : '520px'};
  
  /* Hide scrollbar but keep functionality */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  .form {
    display: flex;
    flex-direction: column;
    gap: 16px;
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
    height: 48px;
    transition: all 0.2s ease;
    background: #f8fafc;
  }

  .input-field:focus-within {
    border-color: #2563eb;
    background: white;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
  }

  .input-field input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-size: 15px;
    color: #1e293b;
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

export default SignupForm;
