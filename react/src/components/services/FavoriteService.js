import axios from 'axios';

const fetchFavoriteChannels = async () => {
  console.log('Fetching favorite channels data.');
  const { data } = await axios.get('http://localhost:3001/api/favorites');
  return data;
};

export default fetchFavoriteChannels;
