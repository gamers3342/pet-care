import React from 'react';
import AdminDashboard from '../components/AdminDashboard';
import AdminProtectedRoute from '../components/AdminProtectedRoute';

const AdminDashboardPage = () => {
  return (
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  );
};

export default AdminDashboardPage;
