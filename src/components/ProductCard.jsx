import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product, onOpenModal }) => {
  const { addItem } = useContext(CartContext);
  const [tallaSeleccionada, setTallaSeleccionada] = useState(null);

  const handleAddToCart = () => {
    if (!tallaSeleccionada) {
      alert("Por favor selecciona una talla");
      return;
    }

    addItem({
      ...product,
      talla: tallaSeleccionada,
    });
  };

  return (
    <div className="relative bg-gradient-to-b from-[#18181b] to-[#23232b] rounded-2xl border-2 border-[#D4AF37]/30 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden group">
      
      {/* BADGES */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        <span className="bg-[#D4AF37] text-black text-xs font-extrabold px-3 py-1 rounded-full shadow">
          NUEVO
        </span>
      </div>

      {/* IMAGEN */}
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

        <p className="text-[#D4AF37] text-xl font-extrabold mt-2">
          ${product.valor?.toLocaleString("es-CO")}
        </p>

        {/* 🔥 TALLAS DISPONIBLES */}
        {product.tallas && product.tallas !== "" && (
          <div className="mt-4">
            <p className="text-xs mb-2 text-gray-400">Tallas disponibles:</p>
            <div className="flex flex-wrap gap-2">
              {product.tallas.map((talla) => (
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

        {/* BOTÓN */}
        <button
          onClick={handleAddToCart}
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
