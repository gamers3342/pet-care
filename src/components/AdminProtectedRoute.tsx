import React, { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = adminService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (!authenticated) {
        // Redirect to admin login if not authenticated
        window.location.href = '/admin/login';
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Loading state
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-mint-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // This shouldn't render as we redirect, but just in case
    return null;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;

