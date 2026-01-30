import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaUser, FaBox, FaDashcube, FaCartArrowDown, FaChartBar } from "react-icons/fa";
import Logo from "../assets/logohome.png";

const Sidebar = ({ user: propUser, onLogout, menuOpen, setMenuOpen }) => {
  const [user, setUser] = useState(propUser || null);

  useEffect(() => {
    if (!propUser) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    } else {
      setUser(propUser);
    }
  }, [propUser]);

  const isAdmin = user?.rol === "admin";

  const adminItems = [
    { name: "Dashboard", icon: <FaDashcube />, path: "/dashboard" },
    { name: "Usuarios",   icon: <FaUser />,     path: "/admin/usuarios" },
    { name: "Productos",  icon: <FaBox />,      path: "/admin/productos" },
    { name: "Pedidos",  icon: <FaCartArrowDown />,      path: "/admin/pedidos" },
    { name: "Inventario", icon: <FaBox />, path: "/admin/inventario" },
    { name: "Ventas", icon: <FaChartBar />, path: "/admin/ventas" }, // <-- Nuevo enlace
  ];

  const userItems = [
    { name: "Dashboard", icon: <FaDashcube />, path: "/dashboard" },
    { name: "Pedidos", icon: <FaCartArrowDown />, path: "/pedidos" },
  
  ];

  const menuItems = isAdmin ? adminItems : userItems;

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-[#0056A]/20 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`bg-gradient-to-b from-[#0B0B0B] to-[#181818] w-64 shadow-lg fixed md:relative z-20 transition-transform duration-300 md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:block flex flex-col justify-start h-screen`}
      >
        {/* Logo y título */}
        <div className="p-4 flex items-center justify-between bg-transparent">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-20 mr-2 rounded-xl shadow" />
          </div>
          <button
            className="md:hidden text-[#D4AF37]"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Contenido alineado arriba */}
        <div className="p-4 text-left overflow-y-auto flex-1">
          <div className="mb-6">
            <p className="font-bold text-[#D4AF37]">Bienvenido,</p>
            <p className="font-bold text-[#D4AF37]">{user?.nombre || "Usuario"}</p>
            <p className="text-sm italic capitalize text-[#D4AF37]">{user?.rol || "usuario"}</p>
          </div>

          <nav className="flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-[#D4AF37] hover:text-[#E6C86E] transition-colors p-2 rounded-md font-semibold"
            >
              <FaDashcube /> Inicio
            </Link>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-[#D4AF37] hover:text-[#E6C86E] transition-colors p-2 rounded-md font-semibold"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Botón de logout */}
        <div className="p-4">
          <button
            onClick={onLogout}
            className="w-full bg-[#D4AF37] text-black px-4 py-2 rounded-xl font-bold hover:bg-[#E6C86E] transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
