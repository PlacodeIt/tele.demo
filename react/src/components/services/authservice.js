import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

const register = async ({ email, username, password }) => {
  email = email.toLowerCase();
  username = username.toLowerCase();
  const formattedPassword = password.charAt(0) + password.slice(1).toLowerCase();
  try {
    const response = await axios.post(`${API_URL}/register`, { email, username, password: formattedPassword });
    console.log('Register request data:', { email, username, password });
    return response.data;
  } catch (error) {
    console.error('Error in register:', error.response.data);
    throw error;
  }
};

const forgotPassword = async (email) => {
  email = email.toLowerCase();
  try {
    console.log('Forgot Password request data:', { email });
    return await axios.post(`${API_URL}/forgot-password`, { email });
  } catch (error) {
    console.error('Error in forgotPassword:', error.response.data);
    throw error;
  }
};

const resetPassword = async (email, code, newPassword) => {
  email = email.toLowerCase();
  const formattedPassword = newPassword.charAt(0) + newPassword.slice(1).toLowerCase();
  try {
    console.log('Reset Password request data:', { email, code, newPassword: formattedPassword });
    return await axios.post(`${API_URL}/reset-password`, { email, code, newPassword: formattedPassword });
  } catch (error) {
    console.error('Error in resetPassword:', error.response.data);
    throw error;
  }
};

const login = async ({ credential, password, rememberMe }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { credential, password, rememberMe });
    if (rememberMe) {
      localStorage.setItem('token', response.data.token);
    } else {
      sessionStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error in login:', error.response.data);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  axios.defaults.headers.common['Authorization'] = '';
};

const AuthService = {
  register,
  forgotPassword,
  resetPassword,
  login,
  logout,
};

export default AuthService;
