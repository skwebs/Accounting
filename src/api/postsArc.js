import axios from 'axios';
// import NetInfo from '@react-native-community/netinfo';
import {API_URL} from '../config';
import useNetworkStore from '../store/networkStore';

// const checkInternetConnection = async () => {
//   const state = await NetInfo.fetch();
//   return state.isConnected && state.isInternetReachable;
// };

export const fetchPosts = async () => {
  const isConnected = useNetworkStore.getState().isConnected;
  if (!isConnected) {
    throw new Error('No Internet Connection');
  }

  try {
    const {data} = await axios.get(`${API_URL}/posts?limit=50`);
    console.log(data);
    return data.data;
  } catch (error) {
    // console.log('Error fetching posts:', error);
    console.log(JSON.stringify(error));
    throw error;
  }
};

export const deletePost = async id => {
  const isConnected = useNetworkStore.getState().isConnected;
  if (!isConnected) {
    throw new Error('No Internet Connection');
  }

  try {
    await axios.delete(`${API_URL}/posts/${id}`);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
