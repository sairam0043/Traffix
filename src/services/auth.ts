import api from './api';
import { User } from '../types';

interface AuthResponse {
  token: string;
  user: User;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
  phone: string;
}): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', userData);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>('/auth/me');
  return response.data;
};