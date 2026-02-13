// src/components/OrderModal.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";

const OrderModal = ({ order, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-[#18181b] to-[#23232b] rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative border-2 border-[#D4AF37]/30 text-[#B5B5B5]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#D4AF37] hover:text-[#E6C86E] transition"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-[#D4AF37]">Pedido {order.codigoRecogida}</h2>
        <p className="text-sm text-[#E6C86E] mb-4">
          Fecha: {new Date(order.createdAt).toLocaleString()}
        </p>
        <table className="w-full text-left mb-6 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-[#23232b] text-[#D4AF37]">
              <th className="py-2 px-3">Producto</th>
              <th className="py-2 px-3">Talla</th>
              <th className="py-2 px-3">Cantidad</th>
              <th className="py-2 px-3">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it) => (
              <tr key={it.product} className="hover:bg-[#23232b]/40 transition">
                <td className="py-2 px-3">{it.nombre}</td>
                <td className="py-2 px-3 text-center">
                  {typeof it.talla !== "undefined" && it.talla !== null && it.talla !== "" ? (
                    <span className="text-xs text-[#E6C86E] font-semibold">{it.talla}</span>
                  ) : (
                    <span className="text-xs text-[#B5B5B5]">-</span>
                  )}
                </td>
                <td className="py-2 px-3">{it.cantidad}</td>
                <td className="py-2 px-3 text-[#D4AF37] font-bold">${it.subTotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-[#B5B5B5]">Total:</span>
          <span className="font-bold text-[#D4AF37] text-lg">${order.total.toFixed(2)}</span>
        </div>
        <div className="text-right">
          <span className="px-4 py-2 text-xs rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/40 font-bold">
            {order.estado}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
