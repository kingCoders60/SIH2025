import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (userData) => api.put('/user/profile', userData),
  getUserStats: () => api.get('/user/stats'),
  getLeaderboard: (filters = {}) => api.get('/user/leaderboard', { params: filters }),
};

// Modules API calls
export const modulesAPI = {
  getModules: () => api.get('/modules'),
  getModule: (id) => api.get(`/modules/${id}`),
  getModuleProgress: (id) => api.get(`/modules/${id}/progress`),
  submitQuiz: (moduleId, answers) => api.post(`/modules/${moduleId}/quiz`, { answers }),
  updateProgress: (moduleId, progress) => api.put(`/modules/${moduleId}/progress`, { progress }),
};

// Drills API calls
export const drillsAPI = {
  getDrills: () => api.get('/drills'),
  getDrill: (id) => api.get(`/drills/${id}`),
  startDrill: (id) => api.post(`/drills/${id}/start`),
  submitDrill: (id, results) => api.post(`/drills/${id}/submit`, { results }),
  getDrillHistory: () => api.get('/drills/history'),
};

// Alerts API calls
export const alertsAPI = {
  getAlerts: () => api.get('/alerts'),
  getAlert: (id) => api.get(`/alerts/${id}`),
  markAsRead: (id) => api.put(`/alerts/${id}/read`),
  createAlert: (alertData) => api.post('/alerts', alertData),
};

// Admin API calls
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (filters = {}) => api.get('/admin/users', { params: filters }),
  getUser: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getDrillAnalytics: (filters = {}) => api.get('/admin/analytics/drills', { params: filters }),
  getModuleAnalytics: (filters = {}) => api.get('/admin/analytics/modules', { params: filters }),
  getRegionalStats: () => api.get('/admin/analytics/regional'),
  getPreparednessScores: () => api.get('/admin/analytics/preparedness'),
};

// Gamification API calls
export const gamificationAPI = {
  getBadges: () => api.get('/gamification/badges'),
  getAchievements: () => api.get('/gamification/achievements'),
  getXPHistory: () => api.get('/gamification/xp-history'),
  getLeaderboard: (type = 'global') => api.get(`/gamification/leaderboard/${type}`),
};

// File upload API calls
export const fileAPI = {
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/upload/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  uploadModuleContent: (file) => {
    const formData = new FormData();
    formData.append('content', file);
    return api.post('/upload/module-content', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

export default api;
