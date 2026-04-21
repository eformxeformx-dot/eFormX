import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import { useAuth } from '../../context/AuthContext';

const AuthModal = () => {
  const { isAuthModalOpen, modalType, closeAuthModal } = useAuth();

  return (
    <AnimatePresence mode="wait">
      {isAuthModalOpen && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
        >
          <ModalContent
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={closeAuthModal} aria-label="Close Modal">
              <FiX size={24} />
            </CloseButton>
            
            <div className="modal-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={modalType}
                  initial={{ opacity: 0, x: modalType === 'login' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: modalType === 'login' ? 20 : -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {modalType === 'login' && <LoginForm isModal={true} onSuccess={closeAuthModal} />}
                  {modalType === 'signup' && <SignupForm isModal={true} onSuccess={closeAuthModal} />}
                  {modalType === 'forgot-password' && <ForgotPasswordForm />}
                </motion.div>
              </AnimatePresence>
            </div>
          </ModalContent>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;

  @media (max-width: 480px) {
    padding: 8px;
    align-items: flex-end; /* Mobile bottom sheet style or just centered */
    align-items: center; 
  }
`;

const ModalContent = styled(motion.div)`
  background: white;
  width: 100%;
  max-width: 500px;
  border-radius: 28px;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  @media (max-width: 480px) {
    border-radius: 24px;
    max-height: 95vh;
  }

  .modal-body {
    padding: 40px;
    max-height: 90vh;
    overflow-y: auto;
    
    @media (max-width: 480px) {
      padding: 32px 20px 24px;
    }

    /* Hide scrollbar but keep functionality */
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: #f1f5f9;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s ease;
  z-index: 100;

  @media (max-width: 480px) {
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    background: transparent;
  }

  &:hover {
    background: #e2e8f0;
    color: #1e293b;
    transform: rotate(90deg);
  }
`;

export default AuthModal;
