import axios from 'axios';

const API_URL = 'http://localhost:3001';

const register = async (email, username, password) => {
  try {
    console.log('Register request data:', { email, username, password });
    return await axios.post(`${API_URL}/register`, { email, username, password });
  } catch (error) {
    console.error('Error in register:', error.response.data);
    throw error;
  }
};

const forgotPassword = async (email) => {
  try {
    console.log('Forgot Password request data:', { email });
    return await axios.post(`${API_URL}/forgot-password`, { email });
  } catch (error) {
    console.error('Error in forgotPassword:', error.response.data);
    throw error;
  }
};

const resetPassword = async (email, code, newPassword) => {
  try {
    console.log('Reset Password request data:', { email, code, newPassword });
    return await axios.post(`${API_URL}/reset-password`, { email, code, newPassword });
  } catch (error) {
    console.error('Error in resetPassword:', error.response.data);
    throw error;
  }
};

const AuthService = {
  register,
  forgotPassword,
  resetPassword,
};

export default AuthService;
