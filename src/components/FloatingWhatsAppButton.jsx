import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative group flex items-center">
        {/* Tooltip */}
        <div className="absolute right-16 bg-gray-900 text-white text-sm rounded-md px-3 py-2 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2 z-50 whitespace-nowrap">
          ¿Necesitas ayuda?
        </div>

        {/* Botón */}
        <a
          href="https://wa.me/573144701975"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition-transform duration-300 transform hover:scale-110"
          aria-label="Chat en WhatsApp"
        >
          <FaWhatsapp size={28} />
        </a>
      </div>
    </div>
  );
};

export default FloatingWhatsAppButton;
