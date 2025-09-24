import axios from 'axios';
import { type AuthResponse } from '../types';

const API_URL = 'https://dev.preventixai.com/api/v1';

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
  password: string;
  organization_id: string | number;
  job_title: string;
}) => {
  const response = await api.post('/admin/createOpManager', {
    email: managerData.email,
    phone_number: managerData.phone_number,
    password: managerData.password,
    organization_id: Number(managerData.organization_id),
    job_title: managerData.job_title
  });
  return response.data;
};

export const getAllCompany = async () => {
  const response = await api.get('/admin/getAllCompany');
  return response.data;
};

export interface Manager {
  id: number;
  email: string;
  phone_number: string;
  job_title: string;
  organization_id: number;
  created_at: string;
  updated_at: string;
}

export interface ManagersResponse {
  data: Manager[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const getManagers = async (organizationId: number, page: number = 1, limit: number = 10, search: string = ''): Promise<ManagersResponse> => {
  const response = await api.get('/op-manager/getAllOPManagers', {
    params: {
      organization_id: organizationId,
      page,
      limit,
      search: search || undefined
    }
  });
  return response.data;
};

export default api;