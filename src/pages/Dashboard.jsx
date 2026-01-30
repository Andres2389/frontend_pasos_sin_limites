import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Welcome from '../components/Welcome';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser.user || storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-2 md:px-6 lg:px-12">
      <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl rounded-3xl shadow-2xl border-2 border-[#D4AF37]/30 bg-[#181818] p-4 sm:p-6 md:p-10 flex flex-col items-center transition-all duration-300">
        <Welcome user={user} />
      </div>
    </div>
  );
};

export default Dashboard;