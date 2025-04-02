// stores/authStore.js
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create(
  persist(
    set => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // Login action
      login: (userData, token) => {
        set({
          user: userData,
          token: token,
          isAuthenticated: true,
        });
      },

      // Register action (you might want to auto-login after register)
      register: (userData, token) => {
        set({
          user: userData,
          token: token,
          isAuthenticated: true,
        });
      },

      // Logout action
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      // Update user profile
      updateUser: userData => {
        set({user: userData});
      },
    }),
    {
      name: 'auth-storage', // unique name for storage
      storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage in RN
    },
  ),
);

export default useAuthStore;
