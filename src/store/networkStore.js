import {create} from 'zustand';
import NetInfo from '@react-native-community/netinfo';

// Zustand store for managing network state
const useNetworkStore = create(set => ({
  isConnected: true, // Default to true
  setNetworkStatus: status => set({isConnected: status}),
}));

// Function to listen for network changes
export const listenForNetworkChanges = () => {
  NetInfo.addEventListener(state => {
    useNetworkStore.getState().setNetworkStatus(state.isConnected);
  });
};

export default useNetworkStore;
