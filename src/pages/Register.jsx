import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash, FaEnvelope, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import Logo from "../assets/logohome.png";
import ButtonGold from "../ui/ButtonGold";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    rol: "user", // fijo a usuario normal
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      if (storedUser.rol === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/register`, formData);
      toast.success("Usuario registrado correctamente. Redirigiendo...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B0B] to-[#1A1A1A] flex items-center justify-center px-4 text-[#B5B5B5] font-sans">
      <div className="max-w-md w-full bg-[#18181b] p-8 rounded-2xl shadow-2xl border border-[#D4AF37]/20">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-20 w-auto" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-[#D4AF37] tracking-wide">Crear Cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre con ícono */}
          <div className="relative">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full pl-4 pr-10 py-3 bg-[#23232b] border border-[#D4AF37]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-[#B5B5B5] placeholder-[#B5B5B5]"
            />
            <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#D4AF37]" />
          </div>
          {/* Correo con ícono */}
          <div className="relative">
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
              className="w-full pl-4 pr-10 py-3 bg-[#23232b] border border-[#D4AF37]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-[#B5B5B5] placeholder-[#B5B5B5]"
            />
            <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#D4AF37]" />
          </div>
          {/* Contraseña con ojito */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-4 pr-10 py-3 bg-[#23232b] border border-[#D4AF37]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-[#B5B5B5] placeholder-[#B5B5B5]"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#D4AF37] cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {/* Botón registrar */}
          <ButtonGold type="submit" className="w-full py-3 mt-2">
            Registrarse
          </ButtonGold>
        </form>
        {/* Enlaces abajo */}
        <div className="mt-7 flex flex-col items-center gap-2 text-sm">
          <Link to="/login" className="font-medium text-[#D4AF37] hover:text-[#E6C86E] transition">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
          <Link to="/" className="font-medium text-[#D4AF37] hover:text-[#E6C86E] transition">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
