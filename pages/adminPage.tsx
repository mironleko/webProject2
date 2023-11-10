import React, { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Mock data for demonstration purposes
  const mockUserData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // ... more users
  ];

  useEffect(() => {
    const isAttackEnabled = localStorage.getItem('isAttackEnabled') === 'true';
    if (status === "unauthenticated" && !isAttackEnabled) {
      router.push('/broken-access-control');
    }
  }, [status, router]);

  const handleLogout = async () => {
    localStorage.setItem('isAttackEnabled',String(false));
    await signOut({ redirect: false });
    router.push('/broken-access-control');
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push('/broken-access-control');
    return null;
  }

  const isAttackEnabled = localStorage.getItem('isAttackEnabled') === 'true';
  const canAccessAdmin = session.user.role === 'admin' || isAttackEnabled;

  if (!canAccessAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl md:text-3xl font-bold text-red-600 mb-4">
            Access Denied
          </p>
          <p className="text-lg md:text-xl text-gray-800">
            You are not authorized to view this page.
          </p>
        </div>
      </div>
    );
      }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
        <p className="mb-6 text-gray-700">
          Welcome to the admin dashboard, {isAttackEnabled ? 'the attack is enabled' : 'you can manage the system'}.
        </p>
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Users List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockUserData.map((user) => (
                  <tr key={user.id}>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-800">{user.name}</td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-800">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
