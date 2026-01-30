import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaTimes, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CartSidebar({ isOpen, onClose }) {
  const {
    items,
    totalItems,
    totalPrice,
    updateItemQuantity,
    removeItem,
    clearCart,
  } = useContext(CartContext);

  

  const navigate = useNavigate();

  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user?._id) {
      toast.info("Inicia sesión para continuar");
      navigate("/login");
      return;
    }

    try {
      // Mapear items para enviar productId, cantidad y talla
      const itemsToSend = items.map(item => ({
        productId: item._id,
        cantidad: item.cantidad,
        talla: item.talla
      }));
      console.log('[CARTSIDEBAR - itemsToSend]', itemsToSend);
      await axios.post("/api/orders", {
        userId: user._id,
        items: itemsToSend,
        total: totalPrice,
      });

      toast.success("Pedido creado correctamente");
      clearCart();
      onClose();
      navigate("/pedidos");
    } catch {
      toast.error("Error procesando pedido");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="flex-1 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* SIDEBAR */}
      <aside
        className="w-96 max-w-full bg-gradient-to-b from-[#0B0B0B] to-[#1A1A1A] text-[#B5B5B5] shadow-2xl animate-slideIn flex flex-col border-l-2 border-[#D4AF37]/40"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#D4AF37]/30">
          <h2 className="text-lg font-semibold text-[#D4AF37]">
            🛒 Tu Carrito <span className="ml-1">({totalItems})</span>
          </h2>
          <button
            onClick={onClose}
            className="text-[#B5B5B5] hover:text-[#E6C86E] transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 scroll-smooth">
          {items.length === 0 && (
            <p className="text-center text-sm text-[#777]">
              Tu carrito está vacío
            </p>
          )}

          {items.map((item) => (
            <div
              key={item._id}
              className="bg-[#18181b] rounded-2xl p-3 flex gap-3 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-md hover:shadow-2xl"
            >
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${item.imagen}`}
                alt={item.nombre}
                className="w-16 h-16 object-cover rounded-xl border border-[#D4AF37]/20"
              />

              <div className="flex-1">
                <h4 className="text-[#E6C86E] text-sm font-semibold">
                  {item.nombre}
                </h4>
                <p className="text-xs text-[#D4AF37] font-bold">
                  ${item.valor.toLocaleString("es-CO")}
                </p>
                {/* Mostrar talla seleccionada si existe */}
                {item.talla && (
                  <div className="mt-1 mb-1">
                    <span className="inline-block px-2 py-1 rounded-md border border-[#D4AF37] text-[#D4AF37] bg-[#23232b] text-xs font-semibold mr-2">
                      Talla: {item.talla}
                    </span>
                  </div>
                )}
                {/* CONTROLES */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() =>
                      item.cantidad > 1
                        ? updateItemQuantity(item._id, item.cantidad - 1)
                        : removeItem(item._id)
                    }
                    className="w-7 h-7 rounded-full border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-bold"
                  >
                    <FaMinus size={10} />
                  </button>

                  <span className="text-sm text-[#B5B5B5] font-medium">
                    {item.cantidad}
                  </span>

                  <button
                    onClick={() =>
                      updateItemQuantity(item._id, item.cantidad + 1)
                    }
                    className="w-7 h-7 rounded-full border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-bold"
                  >
                    <FaPlus size={10} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(item._id)}
                className="text-red-500 hover:text-red-400 transition"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="border-t border-[#D4AF37]/30 p-4 space-y-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="text-[#D4AF37] font-semibold">
              ${totalPrice.toLocaleString("es-CO")}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full py-3 rounded-xl font-bold bg-[#D4AF37] text-black hover:brightness-110 transition-all duration-300 disabled:opacity-40"
          >
            Proceder al pago
          </button>

          <button
            onClick={clearCart}
            className="w-full text-xs text-[#888] hover:text-red-400 transition"
          >
            Vaciar carrito
          </button>
        </div>
      </aside>
    </div>
  );
}
