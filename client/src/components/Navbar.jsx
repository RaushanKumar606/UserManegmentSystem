import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavLinks = () => {
    if (!user) return [];
    
    const commonLinks = [
      { name: 'Home', path: '/home' },
      { name: 'Profile', path: '/profile' },
      { name: 'Request Access', path: '/request-access' },
      { name: 'My Access', path: '/my-access' }
    ];

    switch (user.role) {
      case 'Admin':
        return [
          ...commonLinks,
          { name: 'User Management', path: '/admin/users' },
          { name: 'System Settings', path: '/admin/settings' },
          { name: 'Access Requests', path: '/admin/requests' }
        ];
      case 'Manager':
        return [
          ...commonLinks,
          { name: 'Team Management', path: '/manager/team' },
          { name: 'Reports', path: '/manager/reports' },
          { name: 'Pending Requests', path: '/manager/pending-requests' }
        ];
      case 'Employee':
        return [
          ...commonLinks,
          { name: 'My Tasks', path: 'my-requests' },
          { name: 'Request History', path: '/employee/history' }
        ];
      default:
        return commonLinks;
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">User Management System</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {getNavLinks().map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </button>
            ))}
            
            {/* User Info and Logout */}
            <div className="ml-4 flex items-center space-x-4">
              <span className="text-gray-700 text-sm">
                {user?.username} ({user?.role})
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {getNavLinks().map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setIsMenuOpen(false);
                }}
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                {link.name}
              </button>
            ))}
            
            {/* Mobile User Info and Logout */}
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="px-4">
                <div className="text-base font-medium text-gray-800">
                  {user?.username}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user?.role}
                </div>
              </div>
              <div className="mt-3 px-2">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
