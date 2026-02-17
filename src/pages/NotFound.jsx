import { Link } from "react-router-dom";
import Logo from "../assets/logohome.png";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#111827] to-black px-4">
      <div className="bg-[#18181b] border border-[#FFD700]/30 shadow-2xl rounded-3xl p-10 max-w-md w-full text-center">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={Logo}
            alt="Logo Pasos Sin Límites"
            className="h-16 mb-3 drop-shadow-lg"
          />
          <h1 className="text-2xl font-bold text-[#FFD700] tracking-wide">
            PASOS SIN LÍMITES
          </h1>
        </div>

        {/* Código */}
        <h2 className="text-7xl font-black text-[#FFD700] mb-4 drop-shadow-lg">
          404
        </h2>

        {/* Texto */}
        <h3 className="text-xl font-semibold text-white mb-2">
          Página no encontrada
        </h3>

        <p className="text-gray-400 mb-8">
          La ruta que estás buscando no existe o fue movida.
        </p>

        {/* Botón */}
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-[#FFD700] text-black font-bold rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:scale-105"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
