// src/components/UserLayout.js
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const UserLayout = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black grid md:grid-cols-[16rem_1fr] relative">
      <Sidebar
        user={user}
        onLogout={onLogout}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <div className="flex flex-col overflow-y-auto">
        {!menuOpen && (
          <div className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow sticky top-0 z-30">
            <h1 className="text-lg font-bold text-[#0056A6]-600">SIGS</h1>
            <button onClick={() => setMenuOpen(true)}>
              <FaBars size={22} />
            </button>
          </div>
        )}

        <main className="flex-1 min-h-screen p-6">
          <div className="w-full max-w-4xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
