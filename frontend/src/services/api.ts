import axios from 'axios';

export const BASE_URL = 'http://127.0.0.1:5000';
const API_URL = `${BASE_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const auth = {
  login: (credentials: any) => api.post('/auth/login', credentials),
  register: (data: any) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
};

export const clients = {
  intake: (data: any) => api.post('/clients/intake', data),
  getAll: () => api.get('/clients'),
  get: (id: string) => api.get(`/clients/${id}`),
};

export const appointments = {
  create: (data: any) => api.post('/appointments', data),
  getAll: () => api.get('/appointments'),
  updateStatus: (id: string, status: string) => api.put(`/appointments/${id}/status`, { status }),
  reschedule: (id: string, date: string) => api.put(`/appointments/${id}/reschedule`, { date }),
};

export const cases = {
  create: (data: any) => api.post('/cases', data),
  getAll: () => api.get('/cases'),
  get: (id: string) => api.get(`/cases/${id}`),
  update: (id: string, data: any) => api.put(`/cases/${id}`, data),
  delete: (id: string) => api.delete(`/cases/${id}`),
  addHearing: (caseId: string, data: any) => api.post(`/cases/${caseId}/hearings`, data),
  getHearings: (caseId: string) => api.get(`/cases/${caseId}/hearings`),
};

export const notes = {
  create: (data: any) => api.post('/notes', data),
  getAll: (params?: any) => api.get('/notes', { params }),
  get: (id: string) => api.get(`/notes/${id}`),
  update: (id: string, data: any) => api.put(`/notes/${id}`, data),
  delete: (id: string) => api.delete(`/notes/${id}`),
};

export const payments = {
  uploadProof: (formData: FormData) => api.post('/payments/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  verify: (id: string) => api.put(`/payments/${id}/verify`),
  reject: (id: string) => api.put(`/payments/${id}/reject`),
  getAll: () => api.get('/payments'),
};

export const dashboard = {
  getOverview: () => api.get('/dashboard'),
  getClientOverview: () => api.get('/dashboard/client'),
  getMonthlyRevenue: () => api.get('/dashboard/monthly-revenue'),
};

export const ai = {
  generateDraft: (prompt: string) => api.post('/ai/generate-draft', { prompt }),
  voiceOver: (text: string) => api.post('/ai/voice-over', { text }, { responseType: 'blob' }),
};

export const documents = {
  upload: (formData: FormData) => api.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getByCase: (caseId: string) => api.get(`/documents/case/${caseId}`),
  delete: (id: string) => api.delete(`/documents/${id}`),
};

export const consultations = {
  createRequest: (data: any) => api.post('/consultations', data),
  getAllRequests: () => api.get('/consultations'),
  updateStatus: (id: string, status: string) => api.put(`/consultations/${id}/status`, { status }),
};

export default api;
