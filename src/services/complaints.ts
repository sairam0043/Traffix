import api from './api';
import { Complaint } from '../types';

export const getComplaints = async (): Promise<Complaint[]> => {
  const response = await api.get<Complaint[]>('/complaints');
  return response.data;
};

export const createComplaint = async (complaintData: {
  title: string;
  description: string;
  type: string;
  mediaUrl?: string;
}): Promise<Complaint> => {
  const response = await api.post<Complaint>('/complaints', complaintData);
  return response.data;
};

export const updateComplaintStatus = async (
  complaintId: string,
  status: 'pending' | 'in-progress' | 'resolved'
): Promise<Complaint> => {
  const response = await api.patch<Complaint>(`/complaints/${complaintId}/status`, { status });
  return response.data;
};

export const getComplaintStatistics = async (): Promise<{ _id: string; count: number }[]> => {
  const response = await api.get('/complaints/statistics');
  return response.data;
};