import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaUserTie, FaUserPlus, FaHome } from "react-icons/fa";
import Logo from "../assets/logohome.png";
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
    <div className="min-h-screen bg-gradient-to-br from-black via-[#18181b] to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#18181b] p-10 rounded-2xl shadow-2xl border border-[#FFD700]">
        {/* Logo y nombre */}
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="Logo Pasos Sin Límites" className="h-16 drop-shadow-lg mb-2" />
          <h1 className="text-2xl font-bold text-[#FFD700] tracking-wide mb-2">PASOS SIN LÍMITES</h1>
        </div>

        <h2 className="text-3xl font-extrabold text-center mb-8 text-[#FFD700] tracking-wide drop-shadow">
          Recuperar Contraseña
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input con ícono */}
          <div className="relative">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full pl-4 pr-12 py-3 bg-[#23232a] border border-[#FFD700] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-[#FFD700] placeholder-[#FFD700]/70 shadow"
            />
            <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#FFD700] text-xl" />
          </div>

          {/* Botón enviar */}
          <button
            type="submit"
            className="w-full bg-black text-[#FFD700] font-bold px-4 py-3 rounded-xl border border-[#FFD700] hover:bg-[#23232a] transition"
          >
            Enviar correo de recuperación
          </button>
        </form>

        {/* Enlaces */}
        <div className="mt-8">
          {/* Iniciar sesión y crear cuenta en fila */}
          <div className="flex flex-col items-center gap-2 mb-4 text-sm text-[#FFD700] font-medium">
            <Link
              to="/login"
              className="hover:underline hover:text-[#FFD700]/80 transition"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <span>
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="hover:underline text-[#FFD700]">Regístrate</Link>
            </span>
          </div>

          {/* Volver al inicio centrado */}
          <div className="text-center text-sm text-[#FFD700] font-medium">
            <Link
              to="/"
              className="hover:underline hover:text-[#FFD700]/80 transition"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
