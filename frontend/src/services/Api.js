import axios from 'axios';

// DIRECT API CONFIGURATION
const BASE_URL = 'https://api.eformx.com/api';
const MASTER_BEARER_TOKEN = '1c692a77-6dcc-4f73-89c7-187a6a3eed64';
const API_KEY = 'f2da7aff-6bdb-44a5-b43a-ca1f4bf7d736';

// ---------------------------------------------------------
// 1. REGISTER USER
// ---------------------------------------------------------
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData, {
      headers: {
        'Authorization': `Bearer ${MASTER_BEARER_TOKEN}`,
        'api-token': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Registration failed", status: false };
  }
};

// ---------------------------------------------------------
// 2. LOGIN USER
// ---------------------------------------------------------
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginData, {
      headers: {
        'Authorization': `Bearer ${MASTER_BEARER_TOKEN}`,
        'api-token': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed", status: false };
  }
};

// ---------------------------------------------------------
// 3. FETCH PROFILE
// ---------------------------------------------------------
export const fetchProfile = async () => {
  const userToken = localStorage.getItem('auth_token');
  try {
    const response = await axios.post(`${BASE_URL}/featch?efx=profile`, {}, {
      headers: {
        'Authorization': `Bearer ${MASTER_BEARER_TOKEN}`,
        'auth-token': userToken,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Profile Fetch Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to fetch profile", status: false };
  }
};

// ---------------------------------------------------------
// 4. FETCH SERVICE DATA
// ---------------------------------------------------------
export const fetchService = async (serviceName) => {
  try {
    const response = await axios.post(`${BASE_URL}/featch?efx=get&type=${serviceName}`, {}, {
      headers: {
        'Authorization': `Bearer ${MASTER_BEARER_TOKEN}`,
        'api-token': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Service Data Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to fetch service data", status: false };
  }
};

// ---------------------------------------------------------
// 5. APPLY FOR SERVICE
// ---------------------------------------------------------
export const applyService = async (serviceName, applyId) => {
  const userToken = localStorage.getItem('auth_token');
  try {
    const response = await axios.post(`${BASE_URL}/featch?efx=get&type=${serviceName}&apply_id=${applyId}`, {}, {
      headers: {
        'Authorization': `Bearer ${MASTER_BEARER_TOKEN}`,
        'auth-token': userToken,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Apply Service Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to apply for service", status: false };
  }
};
