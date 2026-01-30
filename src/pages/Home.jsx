// src/pages/Home.jsx
import { useEffect, useState, useContext } from "react";
import Logo from "../assets/logohome.png";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaUserPlus,
  FaTruck,
  FaCreditCard,
  FaShieldAlt,
  FaUndoAlt,
} from "react-icons/fa";
import ProductGallery from "../components/ProductGallery";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import ScrollToTopButton from "../components/ScrollToTopButton";
import FloatingCartButton from "../components/FloatingCartButton";
import CartSidebar from "../components/CartSidebar";
import { CartContext } from "../context/CartContext";


const Home = () => {
  const [user, setUser] = useState(null);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useContext(CartContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

const cerrarSesion = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUser(null);           // Limpiar estado local
  navigate("/");      // Redirigir al login
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B0B] to-[#1A1A1A] text-[#B5B5B5] flex flex-col items-center font-sans">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-[#0B0B0B] to-[#1A1A1A] text-[#D4AF37]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-6 gap-4">
          <img src={Logo} alt="Logo" className="h-20 md:h-20 w-auto" />
          <div className="flex items-center flex-wrap justify-center gap-4">
           {!user ? (
                    <>
                      <Link
                        to="/register"
                        className="hidden sm:flex px-4 py-2 border-2 border-[#D4AF37] rounded-full text-sm text-[#D4AF37] bg-[#0B0B0B] hover:bg-[#D4AF37] hover:text-black transition font-bold"
                      >
                        <FaUserPlus /> Registrarse
                      </Link>
                      <Link
                        to="/login"
                        className="hidden sm:flex px-4 py-2 border-2 border-[#D4AF37] rounded-full text-sm text-[#D4AF37] bg-[#0B0B0B] hover:bg-[#D4AF37] hover:text-black transition font-bold"
                      >
                        <FaUserTie /> Iniciar Sesión
                      </Link>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:block text-sm text-[#E6C86E]">
                        Bienvenido, <strong>{user.nombre}</strong>
                      </span>
                      {user.rol === "admin" ? (
                        <Link
                          to="/admin"
                          className="px-4 py-2 border-2 border-[#D4AF37] rounded-full text-sm text-[#D4AF37] bg-[#0B0B0B] hover:bg-[#D4AF37] hover:text-black transition font-bold"
                        >
                          Panel Admin
                        </Link>
                      ) : (
                        <Link
                          to="/dashboard"
                          className="px-4 py-2 border-2 border-[#D4AF37] rounded-full text-sm text-[#D4AF37] bg-[#0B0B0B] hover:bg-[#D4AF37] hover:text-black transition font-bold"
                        >
                          Mi Panel
                        </Link>
                      )}
                      <button
                        onClick={cerrarSesion}
                        className="px-4 py-2 border-2 border-[#D4AF37] rounded-full text-sm text-[#D4AF37] bg-[#0B0B0B] hover:bg-[#D4AF37] hover:text-black transition font-bold"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  )}

            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1BvUCSYRmm/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} className="hover:text-[#E6C86E]" />
              </a>
              
              <a
                href="https://wa.me/573144701975"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={24} className="hover:text-[#E6C86E]" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Product Gallery + Cart */}
      <ProductGallery openSidebar={() => setSidebarOpen(true)} />
      <FloatingCartButton
        onClick={() => setSidebarOpen(true)}
        totalItems={totalItems}
      />
      <CartSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Other Floating Buttons */}
      <FloatingWhatsAppButton />
      <ScrollToTopButton />

{/* BENEFICIOS + PAGOS */}
<section className="w-full bg-gradient-to-b from-[#0B0B0B] to-[#111] text-[#B5B5B5] py-20">

  {/* BENEFICIOS */}
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
    <div className="space-y-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-[#23232b]/30 rounded-2xl p-4">
      <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-xl bg-[#D4AF37] text-black text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110">
        <FaTruck />
      </div>
      <h4 className="text-[#D4AF37] font-semibold text-lg">Envíos a Todo el País</h4>
      <p className="text-sm leading-relaxed">
        Entregamos tu pedido en cualquier ciudad de Colombia.
        Envío gratis en compras superiores a <strong>$200.000</strong>.
      </p>
    </div>
    <div className="space-y-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-[#23232b]/30 rounded-2xl p-4">
      <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-xl bg-[#D4AF37] text-black text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110">
        <FaCreditCard />
      </div>
      <h4 className="text-[#D4AF37] font-semibold text-lg">Pago Seguro</h4>
      <p className="text-sm leading-relaxed">
        Aceptamos Nequi y Daviplata.
        Transacciones <strong>100% seguras</strong> y encriptadas.
      </p>
    </div>
    <div className="space-y-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-[#23232b]/30 rounded-2xl p-4">
      <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-xl bg-[#D4AF37] text-black text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110">
        <FaShieldAlt />
      </div>
      <h4 className="text-[#D4AF37] font-semibold text-lg">Garantía de Calidad</h4>
      <p className="text-sm leading-relaxed">
        Productos fabricados con materiales premium y garantía de <strong>6 meses</strong>.
      </p>
    </div>
    <div className="space-y-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-[#23232b]/30 rounded-2xl p-4">
      <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-xl bg-[#D4AF37] text-black text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110">
        <FaUndoAlt />
      </div>
      <h4 className="text-[#D4AF37] font-semibold text-lg">Cambios y Devoluciones</h4>
      <p className="text-sm leading-relaxed">
        Tienes <strong>30 días</strong> para cambiar o devolver tu producto si no quedas satisfecho.
      </p>
    </div>

  </div>

  {/* DIVIDER */}
  <div className="max-w-5xl mx-auto my-16 border-t border-[#D4AF37]/30" />

  {/* MÉTODOS DE PAGO */}
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h3 className="text-[#D4AF37] text-2xl font-semibold mb-10">
      Métodos de Pago
    </h3>

    <div className="flex flex-wrap justify-center gap-6">
      <div className="flex items-center gap-4 bg-[#1A1A1A] px-6 py-4 rounded-xl shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-[#23232b]/30">
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold transition-transform duration-300 group-hover:scale-110">N</div>
        <div className="text-left">
          <p className="text-sm font-semibold text-white">Nequi</p>
          <p className="text-xs text-[#B5B5B5]">Pago instantáneo</p>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-[#1A1A1A] px-6 py-4 rounded-xl shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-[#23232b]/30">
        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold transition-transform duration-300 group-hover:scale-110">D</div>
        <div className="text-left">
          <p className="text-sm font-semibold text-white">Daviplata</p>
          <p className="text-xs text-[#B5B5B5]">Rápido y seguro</p>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-[#1A1A1A] px-6 py-4 rounded-xl shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-[#23232b]/30">
        <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-black transition-transform duration-300 group-hover:scale-110"><FaCreditCard /></div>
        <div className="text-left">
          <p className="text-sm font-semibold text-white">Contra Entrega</p>
          <p className="text-xs text-[#B5B5B5]">Paga al recibir</p>
        </div>
      </div>
    </div>
  </div>

</section>


      {/* Footer */}
      
      <footer className="w-full bg-gradient-to-br from-[#0B0B0B] to-[#1A1A1A] text-[#B5B5B5] mt-20">
  <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

    {/* BRAND */}
    <div className="space-y-4">
      <img
        src={Logo}
        alt="Pasos Sin Límites"
        className="h-20 object-contain"
      />
      <p className="text-sm leading-relaxed">
        En <span className="text-[#D4AF37] font-semibold">Pasos Sin Límites</span>
        ofrecemos productos y experiencias que rompen barreras.
        Calidad, confianza y atención cercana.
      </p>
    </div>

    {/* ATENCIÓN AL CLIENTE */}
    <div>
      <h4 className="text-[#D4AF37] font-semibold text-lg mb-4">
        Atención al Cliente
      </h4>
      <ul className="space-y-3 text-sm">
        <li>🕒 Lunes a Sábado: 8:00 AM – 6:00 PM</li>
        <li>💬 Respuesta rápida por WhatsApp</li>
        <li>📦 Seguimiento de pedidos</li>
        <li>🔄 Cambios </li>
      </ul>
    </div>

    {/* CONTACT */}
    <div>
      <h4 className="text-[#D4AF37] font-semibold text-lg mb-4">
        Contáctanos
      </h4>
      <ul className="space-y-3 text-sm">
        <li>📍 Bogota – Colombia</li>
        <li>📞 314 470 1975</li>
        <li>✉️ pasossinlimites1317@gmail.com</li>
      </ul>

      <div className="flex gap-4 mt-5">
        <a href="https://www.facebook.com/share/1BvUCSYRmm/" target="_blank">
          <FaFacebook className="text-xl hover:text-[#E6C86E]" />
        </a>
        <a href="https://wa.me/573144701975" target="_blank">
          <FaWhatsapp className="text-xl hover:text-[#E6C86E]" />
        </a>
      </div>
    </div>

    {/* INFO EXTRA */}
    <div>
      <h4 className="text-[#D4AF37] font-semibold text-lg mb-4">
        Información
      </h4>
      <ul className="space-y-2 text-sm">
        <li>✔ Envíos seguros</li>
        <li>✔ Atención personalizada</li>
        <li>✔ Pagos confiables</li>
        <li>✔ Garantía de satisfacción</li>
      </ul>
    </div>

  </div>


  {/* COPYRIGHT */}
  <div className="border-t border-[#D4AF37]/30 text-center py-4 text-sm text-[#E6C86E]">
    © {new Date().getFullYear()} <strong>Pasos Sin Límites</strong> · Todos los derechos reservados
  </div>
</footer>

    </div>
  );
};

export default Home;
