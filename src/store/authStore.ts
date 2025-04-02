// import { create } from 'zustand';
// import * as Keychain from 'react-native-keychain';

// type AuthState = {
//   token: string | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;
// };

// type AuthActions = {
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   initializeAuth: () => Promise<void>;
// };

// const useAuthStore = create<AuthState & AuthActions>((set) => ({
//   token: null,
//   isAuthenticated: false,
//   isLoading: true,
//   error: null,

//   login: async (email, password) => {
//     set({ isLoading: true, error: null });
//     try {
//       // Replace with your actual API call
//       const response = await fetch('https://api.example.com/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Login failed');
//       }

//       await Keychain.setGenericPassword('authToken', data.token);
//       set({ token: data.token, isAuthenticated: true, isLoading: false });
//     } catch (error) {
//       set({ error: error.message, isLoading: false });
//     }
//   },

//   logout: async () => {
//     await Keychain.resetGenericPassword();
//     set({ token: null, isAuthenticated: false });
//   },

//   initializeAuth: async () => {
//     try {
//       const credentials = await Keychain.getGenericPassword();
//       if (credentials) {
//         set({ token: credentials.password, isAuthenticated: true, isLoading: false });
//       } else {
//         set({ isLoading: false });
//       }
//     } catch (error) {
//       set({ error: error.message, isLoading: false });
//     }
//   },
// }));

// export default useAuthStore;