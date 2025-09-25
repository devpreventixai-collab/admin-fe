export interface User {
  id: number;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  role: string;
  organization_id: number;
  created_at: number;
  updated_at: number;
  work_type: string;
  organization_name: string;
}

export interface AuthResponse {
  success: boolean;
  result: {
    success: boolean;
    data: User;
    token: string;
    message: string;
  };
}

export interface Company {
  id: number;
  name: string;
  address: string;
  phone_number: string;
  email: string;
  work_type: string;
  domain: string;
  created_at: number;
  updated_at: number;
}

export interface Admin {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
  organization_id: number;
  created_at: number;
  updated_at: number;
}