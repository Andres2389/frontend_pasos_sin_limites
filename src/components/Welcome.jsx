import React from "react";
import Logo from "../assets/logohome.png"; 
const Welcome = ({ user }) => {
  const rolTexto = user?.rol === "admin" ? "Administrador" : "Usuario";
  return (
    <div className="w-full min-h-screen flex items-center justify-center text-[#D4AF37] font-sans bg-gradient-to-br from-[#0B0B0B] to-[#1A1A1A]">
      <div className="bg-[#181818] p-8 rounded-2xl shadow-2xl w-full max-w-4xl border border-[#23232b]/60 backdrop-blur-md">
        <div className="flex flex-col items-center mb-8 text-center">
          <img src={Logo} alt="Farmacenter Logo" className="h-20 mb-4 rounded-xl shadow" />
          <h1 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] drop-shadow">
            Bienvenido al Panel de Administración de Pasos Sin Límites
          </h1>
        </div>

        <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">
          Bienvenido, <span className="text-[#D4AF37]">{user?.nombre}</span>!
        </h2>
        <p className="text-[#D4AF37] mb-6">
          Has ingresado como <span className="italic text-[#D4AF37]">{rolTexto}</span>.
        </p>

        {user?.rol === "admin" && (
          <div className="bg-[#23232b]/40 border-l-4 border-[#D4AF37] p-4 rounded-xl mb-4 shadow-inner">
            <p className="text-[#D4AF37] font-bold text-lg">
              Tienes acceso completo a todas las funcionalidades del panel.
            </p>
          </div>
        )}

        {user?.rol === "user" && (
          <div className="bg-[#23232b]/40 border-l-4 border-[#D4AF37] p-4 rounded-xl mb-4 shadow-inner">
            <p className="text-[#D4AF37] font-bold text-lg">
              Puedes gestionar tu perfil y ver tus pedidos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;