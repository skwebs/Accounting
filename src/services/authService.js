import api from '../api/api';

const AuthService = {
  login: loginData => api.post('/login', loginData),
  register: registerData => api.post('/register', registerData),
};

export default AuthService;
