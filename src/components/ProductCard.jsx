import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product, onOpenModal }) => {
  const { addItem } = useContext(CartContext);

  return (
    <div className="relative bg-gradient-to-b from-[#18181b] to-[#23232b] rounded-2xl border-2 border-[#D4AF37]/30 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden group">
      {/* BADGES */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        <span className="bg-[#D4AF37] text-black text-xs font-extrabold px-3 py-1 rounded-full shadow">
          NUEVO
        </span>
      </div>
      {/* IMAGEN GRANDE */}
      <div
        onClick={() => onOpenModal(product)}
        className="cursor-pointer flex items-center justify-center bg-[#0B0B0B] p-10"
      >
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product.imagen}`}
          alt={product.nombre}
          className="h-[220px] object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      {/* INFO */}
      <div className="px-6 pb-6 text-[#B5B5B5]">
        <p className="text-xs uppercase text-[#E6C86E] tracking-wide mb-1">
          PARA ELLA · CASUAL
        </p>
        <h3 className="text-lg font-bold text-[#E6C86E] leading-tight">
          {product.nombre}
        </h3>
        {/* Tallas disponibles */}
        {product.talla && product.talla.length > 0 && (
          <div className="mt-2 text-xs text-[#E6C86E]">
            <span className="font-semibold">Tallas:</span> {Array.isArray(product.talla) ? product.talla.join(", ") : product.talla}
          </div>
        )}
        <p className="text-[#D4AF37] text-xl font-extrabold mt-2">
          ${product.valor?.toLocaleString("es-CO")}
        </p>
        {/* BOTÓN */}
        <button
          onClick={() => addItem(product)}
          disabled={product.cantidad === 0}
          className={`mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm border-2 border-[#D4AF37] bg-[#0B0B0B] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 ${
            product.cantidad === 0
              ? "opacity-40 cursor-not-allowed"
              : ""
          }`}
        >
          <FaShoppingCart />
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
