import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'Employee';

  const features = [
    {
      title: 'Access Control',
      description: 'Manage and control user access to different software and resources',
      icon: '🔒'
    },
    {
      title: 'Role Management',
      description: 'Assign and manage user roles with different permission levels',
      icon: '👥'
    },
    {
      title: 'Request Management',
      description: 'Handle and process access requests efficiently',
      icon: '📝'
    },
    {
      title: 'Audit Trail',
      description: 'Track and monitor all access-related activities',
      icon: '📊'
    }
  ];

  const getRoleBasedActions = () => {
    switch (userRole) {
      case 'Admin':
        return [
          { title: 'Create Software', path: '/create-software', description: 'Add new software to the system' },
          { title: 'Manage Users', path: '/manage-users', description: 'Manage user accounts and permissions' },
          { title: 'View Reports', path: '/reports', description: 'Access system reports and analytics' }
        ];
      case 'Manager':
        return [
          { title: 'Pending Requests', path: '/pending-requests', description: 'Review and approve access requests' },
          { title: 'Team Management', path: '/team', description: 'Manage your team members' },
          { title: 'Access Reports', path: '/access-reports', description: 'View access reports for your team' }
        ];
      default:
        return [
          { title: 'Request Access', path: '/request-access', description: 'Request access to software and resources' },
          { title: 'My Access', path: '/my-access', description: 'View your current access permissions' },
          { title: 'Request History', path: '/request-history', description: 'View your access request history' }
        ];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <header className="bg-white shadow-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">User Access Management System</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome, {userRole}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getRoleBasedActions().map((action, index) => (
              <div
                key={index}
                onClick={() => navigate(action.path)}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:scale-[1.02]"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600">{action.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* System Status */}
        <section className="mt-12 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800">System Status</p>
              <p className="text-2xl font-semibold text-green-600">Operational</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Active Users</p>
              <p className="text-2xl font-semibold text-blue-600">Online</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-800">Last Updated</p>
              <p className="text-2xl font-semibold text-purple-600">Just Now</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;