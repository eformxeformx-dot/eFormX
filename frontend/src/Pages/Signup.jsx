import React from 'react';
import styled from 'styled-components';
import SignupForm from '../Components/Auth/SignupForm';
import { motion } from 'framer-motion';

const Signup = () => {
  return (
    <StyledWrapper>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="form-card"
      >
        <SignupForm />
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
    max-width: 520px;
    padding: 40px;
    border-radius: 24px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.05);
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

export default Signup;