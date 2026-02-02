import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaUserTie, FaUserPlus, FaHome } from "react-icons/fa";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [correo, setCorreo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/forgot-password`, { correo });
      toast.success("Revisa tu correo para restablecer tu contraseña");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al enviar el correo");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0056A6] via-[#0077C2] to-[#00B4D8] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/90 p-10 rounded-2xl shadow-2xl border border-[#0056A6]/20">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo Pasos Sin Límites" className="h-16 drop-shadow-lg" />
        </div>

        <h2 className="text-3xl font-extrabold text-center mb-8 text-[#0056A6] tracking-wide drop-shadow">
          Recuperar Contraseña
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input con ícono */}
          <div className="relative">
            <input
              type="email"
              placeholder="Correo registrado"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full pl-4 pr-12 py-3 border-2 border-[#0056A6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-gray-700 shadow"
            />
            <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#0056A6] text-xl" />
          </div>

          {/* Botón enviar */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0056A6] font-bold px-4 py-3 rounded-xl shadow hover:scale-105 transition-transform duration-200"
          >
            Enviar correo de recuperación
          </button>
        </form>

        {/* Enlaces */}
        <div className="mt-8">
          {/* Iniciar sesión y crear cuenta en fila */}
          <div className="flex justify-center gap-8 mb-4 text-sm text-[#0056A6] font-medium">
            <Link
              to="/login"
              className="flex items-center gap-2 hover:text-[#FFA500] transition"
            >
              <FaUserTie /> Iniciar Sesión
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-2 hover:text-[#FFA500] transition"
            >
              <FaUserPlus /> Crear Cuenta
            </Link>
          </div>

          {/* Volver al inicio centrado */}
          <div className="text-center text-sm text-[#0056A6] font-medium">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 hover:text-[#FFA500] transition"
            >
              <FaHome /> Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
