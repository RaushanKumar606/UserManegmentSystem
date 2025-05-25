import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole') || 'Employee';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const getNavLinks = () => {
    switch (userRole) {
      case 'Admin':
        return [
          { name: 'Dashboard', path: '/' },
          { name: 'Create Software', path: '/create-software' },
          { name: 'Manage Users', path: '/manage-users' },
          { name: 'Reports', path: '/reports' }
        ];
      case 'Manager':
        return [
          { name: 'Dashboard', path: '/' },
          { name: 'Pending Requests', path: '/pending-requests' },
          { name: 'Team', path: '/team' },
          { name: 'Reports', path: '/access-reports' }
        ];
      default:
        return [
          { name: 'Dashboard', path: '/' },
          { name: 'Request Access', path: '/request-access' },
          { name: 'My Access', path: '/my-requests' },
          { name: 'History', path: '/request-history' }
        ];
    }
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
              UAMS
            </span>
            {
            // token &&
             (
              <div className="hidden md:flex md:ml-10 space-x-4">
                {getNavLinks().map((link) => (
                  <button
                    key={link.name}
                    onClick={() => navigate(link.path)}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isDropdownOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>

            {/* Auth buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {token ? (
                <>
                  <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-md">
                    <span className="text-sm text-gray-600">Role:</span>
                    <span className="text-sm font-medium text-gray-900">{userRole}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 rounded-md"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 text-sm font-medium text-green-600 hover:text-white border border-green-600 hover:bg-green-600 rounded-md"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isDropdownOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {token &&
              getNavLinks().map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    navigate(link.path);
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  {link.name}
                </button>
              ))}
            <div className="border-t border-gray-200 pt-4 pb-3">
              {token ? (
                <div className="px-4">
                  <div className="text-base font-medium text-gray-800 mb-2">Role: {userRole}</div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="px-4 space-y-2">
                  <button
                    onClick={() => {
                      navigate('/login');
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-blue-600 hover:text-white hover:bg-blue-600 rounded-md"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate('/signup');
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-green-600 hover:text-white hover:bg-green-600 rounded-md"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
