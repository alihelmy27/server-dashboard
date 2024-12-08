'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [servers, setServers] = useState<any[]>([]);
  const [selectedServer, setSelectedServer] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>(''); // State for filtering
  const [sortOrder, setSortOrder] = useState<string>('asc'); // State for sorting

  const router = useRouter();

  // Function to check if the user is authenticated
  const checkAuthentication = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  };

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await fetch('/api/servers'); // Fetch server status data
        const data = await response.json();

        if (Array.isArray(data)) {
          setServers(data);
        } else {
          console.error('Invalid data format:', data);
          setError('Failed to load server data.');
        }
      } catch (error) {
        console.error('Error fetching server data:', error);
        setError('Error fetching server data.');
      }
    };

    fetchServers();
    checkAuthentication(); // Check user authentication on page load
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Up':
        return 'bg-green-500';
      case 'Down':
        return 'bg-red-500';
      case 'Degraded':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('authToken'); // Remove token on sign out
    setIsAuthenticated(false); // Update authentication state
    router.push('/login'); // Redirect to login page
  };

  const handleServerClick = (server: any) => {
    setSelectedServer(server);
  };

  // Filter servers based on selected status
  const filteredServers = servers.filter((server) =>
    filter ? server.status === filter : true
  );

  // Sort servers alphabetically by name
  const sortedServers = filteredServers.sort((a, b) =>
    sortOrder === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Server Status</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-between items-center mb-4">
        {!isAuthenticated ? (
          <div>
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Sign Out
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 ml-4"
            >
              Sign Up (Already Logged In)
            </button>
          </div>
        )}
      </div>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Filter Servers by Status:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">All</option>
          <option value="Up">Up</option>
          <option value="Down">Down</option>
          <option value="Degraded">Degraded</option>
        </select>
      </div>

      {/* Sort Dropdown */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Sort Servers:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="asc">Name (A-Z)</option>
          <option value="desc">Name (Z-A)</option>
        </select>
      </div>

      {/* Server Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedServers.map((server) => (
          <div
            key={server.name}
            onClick={() => handleServerClick(server)}
            className="p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold">{server.name}</h3>
            <span
              className={`inline-block px-4 py-2 mt-2 text-white rounded-md ${getStatusBadge(
                server.status
              )}`}
            >
              {server.status}
            </span>
          </div>
        ))}
      </div>

      {/* Selected Server Details */}
      {selectedServer && (
        <div className="mt-8 p-6 border rounded-lg shadow-md bg-gray-50">
          <h3 className="text-2xl font-bold mb-2">Server Details</h3>
          <p><strong>Name:</strong> {selectedServer.name}</p>
          <p><strong>IP Address:</strong> {selectedServer.ip}</p>
          <p><strong>Response Time:</strong> {selectedServer.responseTime}</p>
          <p><strong>Uptime:</strong> {selectedServer.uptime}</p>
        </div>
      )}
    </div>
  );
}
