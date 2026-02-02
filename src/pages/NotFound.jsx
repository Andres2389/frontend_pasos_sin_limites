import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";


const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0056A6] via-[#0077C2] to-[#00B4D8] flex flex-col items-center justify-center px-4">
      {/* Logo y nombre de la aplicación */}
      <div className="flex items-center mb-8">
        <img src={Logo} alt="Logo Pasos Sin Límites" className="h-12 mr-4 drop-shadow-lg" />
        <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow">PASOS SIN LÍMITES</h1>
      </div>
      <div className="bg-white/90 p-10 rounded-2xl shadow-2xl text-center max-w-md w-full border border-[#0056A6]/20">
        <h2 className="text-7xl font-black text-[#0056A6] mb-4 drop-shadow">404</h2>
        <h3 className="text-2xl font-semibold text-[#0056A6] mb-2">Página no encontrada</h3>
        <p className="text-gray-700 mb-8 text-base">
          Lo sentimos, la ruta que estás buscando no existe o fue movida.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0056A6] font-bold rounded-lg shadow hover:scale-105 transition-transform duration-200"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
