// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../assets/logohome.png";
import ButtonGold from "../ui/ButtonGold";
const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const navigate = useNavigate();

  // 1) Si ya estoy logueado, voy directo a dashboard o checkout
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const cart = JSON.parse(localStorage.getItem("costehuilense_cart") || "[]");
      if (cart.length > 0) {
        navigate("/checkout", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
        correo,
        password,
      });

      // 2) Guardamos token y user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Inicio de sesión exitoso");

      // 3) Luego redirijo según carrito
      const cart = JSON.parse(localStorage.getItem("costehuilense_cart") || "[]");
      if (cart.length > 0) {
        navigate("/checkout");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B0B] to-[#1A1A1A] flex items-center justify-center px-4 text-[#B5B5B5] font-sans">
      <div className="max-w-md w-full bg-[#18181b] p-8 rounded-2xl shadow-2xl border border-[#D4AF37]/20">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-20 w-auto" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-[#D4AF37] tracking-wide">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* correo */}
          <div className="relative">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full pl-4 pr-10 py-3 bg-[#23232b] border border-[#D4AF37]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-[#B5B5B5] placeholder-[#B5B5B5]"
            />
            <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#D4AF37]" />
          </div>
          {/* password */}
          <div className="relative">
            <input
              type={mostrarPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-4 pr-10 py-3 bg-[#23232b] border border-[#D4AF37]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-[#B5B5B5] placeholder-[#B5B5B5]"
            />
            <button
              type="button"
              onClick={() => setMostrarPassword(!mostrarPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#D4AF37]"
            >
              {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {/* submit */}
          <ButtonGold type="submit" className="w-full py-3 mt-2">
            Iniciar Sesión
          </ButtonGold>
        </form>
        {/* enlaces secundarios */}
        <div className="mt-7 flex flex-col items-center gap-2 text-sm">
          <Link
            to="/forgot-password"
            className="font-semibold text-[#D4AF37] hover:text-[#E6C86E] transition"
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <span>
            ¿No tienes cuenta?{' '}
            <Link
              to="/register"
              className="font-semibold text-[#D4AF37] hover:text-[#E6C86E] transition"
            >
              Regístrate
            </Link>
          </span>
          <Link to="/" className="font-semibold text-[#D4AF37] hover:text-[#E6C86E] transition">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
