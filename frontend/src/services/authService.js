import apiClient from './api';

const authService = {
  async login(email, password) {
    const { token } = await apiClient.post('/auth/login', { email, password });
    localStorage.setItem('connex_token', token);
    return { token };
  },

  async register(companyName, email, password) {
    const { token } = await apiClient.post('/auth/register', { companyName, email, password });
    localStorage.setItem('connex_token', token);
    return { token };
  },

  logout() {
    localStorage.removeItem('connex_token');
  },

  getToken() {
    return localStorage.getItem('connex_token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};

export default authService;
