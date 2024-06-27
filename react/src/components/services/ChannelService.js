import axios from 'axios';

 const fetchChannels = async () => {
  console.log('Channel data proccess.');
    const { data } = await axios.get('http://localhost:3001/api/channels');
    return data;
};

export default fetchChannels;