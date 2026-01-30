// src/components/ProductModal.jsx
import { FaTimes } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductModal = ({ product, onClose, openSidebar }) => {
  const { addItem } = useContext(CartContext);

  // ✅ PROTECCIÓN CLAVE
  if (!product) return null;

  const handleAdd = () => {
    addItem(product);
    onClose();
    openSidebar();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagen */}
        <div className="w-full md:w-1/2 p-6 flex items-center justify-center bg-white">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product.imagen}`}
            alt={product.nombre}
            className="w-full h-auto max-h-80 object-contain rounded"
          />
        </div>

        {/* Detalles */}
        <div className="w-full md:w-1/2 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={18} />
          </button>

          <h2 className="text-2xl font-bold mb-2">{product.nombre}</h2>

          <p className="text-gray-600 text-sm mb-4">
            <span className="font-semibold">Descripción:</span>{" "}
            {product.descripcion}
          </p>

          <p className="text-blue-700 font-bold text-xl mb-6">
            ${product.valor}
          </p>

          <button
            onClick={handleAdd}
            className="w-full py-3 bg-[#0056A6] text-white rounded-lg hover:bg-[#004488] transition"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
