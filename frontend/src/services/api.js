import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';
//'http://localhost:3000/api'
//https://job-application-tracker-be.vercel.app/api
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname !== '/auth') {
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
};

export const jobsAPI = {
  createJob: (jobData) => api.post('/jobs', jobData),
  getJobs: () => api.get('/jobs'),
  getJobById: (id) => api.get(`/jobs/${id}`),
  updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  getJobsByStatus: (status) => api.get(`/jobs/status/${status}`),
  searchJobs: (query) => api.get(`/jobs/search?query=${encodeURIComponent(query)}`),
};

export default api;
