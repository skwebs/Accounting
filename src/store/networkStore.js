// import {create} from 'zustand';
// import NetInfo from '@react-native-community/netinfo';

// // Zustand store for managing network state
// const useNetworkStore = create(set => ({
//   isConnected: true, // Default to true
//   setNetworkStatus: status => set({isConnected: status}),
// }));

// // Function to listen for network changes
// export const listenForNetworkChanges = () => {
//   NetInfo.addEventListener(state => {
//     useNetworkStore.getState().setNetworkStatus(state.isConnected);
//   });
// };

// export default useNetworkStore;
import {create} from 'zustand';
import NetInfo from '@react-native-community/netinfo';

// Zustand store for managing network state
const useNetworkStore = create(set => ({
  isConnected: true, // Default to true
  setNetworkStatus: status => set({isConnected: status}),
}));

// Variable to hold the unsubscribe function
// let unsubscribe: (() => void) | null = null;
let unsubscribe = null;

// Function to listen for network changes
export const listenForNetworkChanges = () => {
  // Remove any existing listener first
  if (unsubscribe) {
    unsubscribe();
  }

  // Add new listener and store the unsubscribe function
  unsubscribe = NetInfo.addEventListener(state => {
    useNetworkStore.getState().setNetworkStatus(state.isConnected);
  }).unsubscribe;
};

// Function to remove network listener
export const removeNetworkListener = () => {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
};

export default useNetworkStore;
