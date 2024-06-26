import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

export const fetchChannels = async () => {
  const response = await axios.get(`${API_URL}/channels`); 
  return response.data;
};
