import React from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

const UserPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Mock data for demonstration purposes
  const tasks = [
    { id: 1, title: 'Complete project report', status: 'In Progress' },
    { id: 2, title: 'Update website', status: 'Completed' },
    { id: 3, title: 'Call with the marketing team', status: 'Scheduled' },
    // ... more tasks
  ];

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push('/broken-access-control');
    return null;
  }

  const handleLogout = async () => {
    localStorage.setItem('isAttackEnabled', String(false));
    await signOut({ redirect: false });
    router.push('/broken-access-control');
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">User Dashboard</h1>
        <p className="mb-6 text-gray-600">Welcome to your user dashboard, {session.user.name}!</p>
        <div className="bg-gray-100 shadow-md rounded p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Tasks</h2>
          <ul className="list-disc space-y-2 pl-5">
            {tasks.map((task) => (
              <li key={task.id} className="text-gray-700 text-lg">
                <span className="font-semibold">{task.title}:</span> {task.status}
              </li>
            ))}
          </ul>
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

export default UserPage;
