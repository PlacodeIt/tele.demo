import axios from 'axios';

const API_URL = 'http://your-backend-api-url';

const register = (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export default {
  register,
  login
};
