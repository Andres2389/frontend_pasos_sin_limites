// src/components/ProductModal.jsx
import { FaTimes } from "react-icons/fa";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const getTallasArray = (tallas) => {
  if (Array.isArray(tallas)) return tallas;
  if (typeof tallas === "string" && tallas.trim() !== "") {
    try {
      const parsed = JSON.parse(tallas);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      return [];
    }
  }
  return [];
};

const ProductModal = ({ product, onClose, openSidebar }) => {
  const { addItem } = useContext(CartContext);
  const [tallaSeleccionada, setTallaSeleccionada] = useState(null);
  const [error, setError] = useState("");

  if (!product) return null;

  const tallas = getTallasArray(product.tallas);

  const handleAdd = () => {
    if (tallas.length > 0 && !tallaSeleccionada) {
      setError("Por favor selecciona una talla");
      return;
    }
    setError("");
    addItem({ ...product, talla: tallaSeleccionada });
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

          {tallas.length > 0 && (
            <div className="mb-4">
              <p className="text-xs mb-2 text-gray-400">Tallas disponibles:</p>
              <div className="flex flex-wrap gap-2">
                {tallas.map((talla) => (
                  <button
                    key={talla}
                    onClick={() => setTallaSeleccionada(talla)}
                    className={`px-3 py-1 rounded-lg border text-sm font-semibold transition-all ${
                      tallaSeleccionada === talla
                        ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                        : "border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                    }`}
                  >
                    {talla}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-2 text-red-500 text-xs font-semibold">{error}</div>
          )}

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
