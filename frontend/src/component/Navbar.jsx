import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">MyApp</div>
      <div className="space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/register">
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition">
                Sign In
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">
              <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md transition">
                Dashboard
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

