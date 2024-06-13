import axios from 'axios';

const API_URL = 'http://your-backend-api-url';

const analyzeText = (text) => {
  return axios.post(`${API_URL}/analyze`, { text });
};

const getRadicalMessages = () => {
  return axios.get(`${API_URL}/radical-messages`);
};

const getRadicalUsers = () => {
  return axios.get(`${API_URL}/radical-users`);
};

export default {
  analyzeText,
  getRadicalMessages,
  getRadicalUsers
};
