export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'user' | 'admin';
}

export interface Complaint {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: string;
  status: 'pending' | 'in-progress' | 'resolved';
  mediaUrl?: string;
  createdAt: string;
}

// Mock data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    phone: '1234567890',
    type: 'user'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '9876543210',
    type: 'admin'
  }
];

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    userId: '1',
    title: 'Speeding Vehicle',
    description: 'Vehicle speeding in school zone',
    type: 'Speeding',
    status: 'pending',
    mediaUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80',
    createdAt: '2024-03-10T10:00:00Z'
  },
  {
    id: '2',
    userId: '1',
    title: 'Illegal Parking',
    description: 'Vehicle parked in no parking zone',
    type: 'Parking',
    status: 'in-progress',
    mediaUrl: 'https://images.unsplash.com/photo-1573348722427-f1d6819dd313?auto=format&fit=crop&q=80',
    createdAt: '2024-03-09T15:30:00Z'
  }
];