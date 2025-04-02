import {create} from 'zustand';

create(set => ({
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  errors: {} || null,
  setIsAuthenticated: isAuthenticated => set({isAuthenticated}),
  setLoading: isLoading => set({isLoading}),
  setIsError: isError => set({isError}),
  setErrors: errors => set({errors}),
}));
