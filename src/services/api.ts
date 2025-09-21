import axios from 'axios';
import { type AuthResponse } from '../types';

const API_URL = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in requests
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

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/admin/login', { email, password });
  return response.data;
};

export const addCompany = async (companyData: {
  name: string;
  address: string;
  phone_number: string;
  email: string;
  work_type: string;
  domain: string;
}) => {
  const response = await api.post('/admin/addCompany', companyData);
  return response.data;
};



export const addManager = async (managerData: {
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  password: string;
  gender: string;
  dob: string;
  job_title: string;
  address: string;
  pincode: string;
  organization_id: number;
  managed_by: number;
}) => {
  const response = await api.post('/admin/addManager', managerData);
  return response.data;
};

export default api;