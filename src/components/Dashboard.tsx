import React, { useState, useEffect } from 'react';
import { User, Complaint } from '../types';
import { BarChart3, FileText, Plus, LogOut } from 'lucide-react';
import { getComplaints, createComplaint, updateComplaintStatus, getComplaintStatistics } from '../services/complaints';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [showNewComplaintForm, setShowNewComplaintForm] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<{ _id: string; count: number }[]>([]);

  useEffect(() => {
    loadComplaints();
    if (user.type === 'admin') {
      loadStatistics();
    }
  }, [user.type]);

  const loadComplaints = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (err) {
      setError('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      const data = await getComplaintStatistics();
      setStats(data);
    } catch (err) {
      console.error('Failed to load statistics');
    }
  };

  const handleCreateComplaint = async (formData: any) => {
    try {
      const newComplaint = await createComplaint(formData);
      setComplaints([newComplaint, ...complaints]);
      setShowNewComplaintForm(false);
    } catch (err) {
      setError('Failed to create complaint');
    }
  };

  const handleUpdateStatus = async (complaintId: string, status: 'pending' | 'in-progress' | 'resolved') => {
    try {
      const updatedComplaint = await updateComplaintStatus(complaintId, status);
      setComplaints(complaints.map(c => 
        c.id === complaintId ? updatedComplaint : c
      ));
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const ComplaintForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      type: 'Speeding',
      description: '',
      mediaUrl: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleCreateComplaint(formData);
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">New Complaint</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
            >
              <option>Speeding</option>
              <option>Parking</option>
              <option>Signal Violation</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Media URL</label>
            <input
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={formData.mediaUrl}
              onChange={e => setFormData({ ...formData, mediaUrl: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowNewComplaintForm(false)}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };

  const ComplaintsList = ({ complaints }: { complaints: Complaint[] }) => (
    <div className="space-y-4">
      {complaints.map(complaint => (
        <div key={complaint.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{complaint.title}</h3>
              <p className="text-gray-600 text-sm">
                {new Date(complaint.createdAt).toLocaleDateString()}
              </p>
            </div>
            {user.type === 'admin' ? (
              <select
                value={complaint.status}
                onChange={(e) => handleUpdateStatus(complaint.id, e.target.value as any)}
                className={`px-2 py-1 rounded-full text-xs ${
                  complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            ) : (
              <span className={`px-2 py-1 rounded-full text-xs ${
                complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {complaint.status}
              </span>
            )}
          </div>
          <p className="mt-2 text-gray-700">{complaint.description}</p>
          {complaint.mediaUrl && (
            <img
              src={complaint.mediaUrl}
              alt="Complaint evidence"
              className="mt-2 rounded-md w-full h-48 object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );

  const AdminDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Complaints Statistics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-indigo-600 text-sm">Total Complaints</p>
            <p className="text-2xl font-bold">{complaints.length}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-yellow-600 text-sm">Pending</p>
            <p className="text-2xl font-bold">
              {complaints.filter(c => c.status === 'pending').length}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-600 text-sm">Resolved</p>
            <p className="text-2xl font-bold">
              {complaints.filter(c => c.status === 'resolved').length}
            </p>
          </div>
        </div>
        {stats.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Daily Complaints</h4>
            <div className="space-y-2">
              {stats.map(stat => (
                <div key={stat._id} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{new Date(stat._id).toLocaleDateString()}</span>
                  <span className="text-sm font-medium">{stat.count} complaints</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <ComplaintsList complaints={complaints} />
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {user.type === 'admin' ? (
                <BarChart3 className="h-6 w-6 text-indigo-600" />
              ) : (
                <FileText className="h-6 w-6 text-indigo-600" />
              )}
              <span className="ml-2 text-xl font-semibold">
                Traffic Violation Portal
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user.name}</span>
              <button
                onClick={onLogout}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {user.type === 'admin' ? (
          <AdminDashboard />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Complaints</h2>
              <button
                onClick={() => setShowNewComplaintForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                New Complaint
              </button>
            </div>
            
            {showNewComplaintForm ? (
              <ComplaintForm />
            ) : complaints.length > 0 ? (
              <ComplaintsList complaints={complaints} />
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No complaints</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new complaint.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}