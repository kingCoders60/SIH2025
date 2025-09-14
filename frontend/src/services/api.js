import axios from "axios"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// API endpoints
export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  signup: (data) => api.post("/auth/signup", data),
  logout: () => api.post("/auth/logout"),
}

export const modulesAPI = {
  getAll: () => api.get("/modules"),
  getById: (id) => api.get(`/modules/${id}`),
  submitQuiz: (data) => api.post("/quiz", data),
}

export const drillsAPI = {
  getAll: () => api.get("/drills"),
  getById: (id) => api.get(`/drills/${id}`),
  participate: (id) => api.post(`/drills/${id}/participate`),
}

 export const gamificationAPI = {
  getLeaderboard: (params) => api.get('/leaderboard', { params }),
 };

export const alertsAPI = {
  getAll: () => api.get("/alerts"),
  getContacts: () => api.get("/emergency-contacts"),
}

export const adminAPI = {
  getStats: () => api.get("/admin/stats"),
  getUsers: () => api.get("/admin/users"),
  getDrillLogs: () => api.get("/admin/drill-logs"),
}

export default api;
