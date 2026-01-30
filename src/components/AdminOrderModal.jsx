import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminOrderModal({ order, onClose, onDelivered }) {
  const [code, setCode] = useState("");

  const handleDeliver = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/${order._id}/deliver`,
        { codigoRecogida: code }
      );
      toast.success("Pedido entregado");
      onDelivered(res.data.order);
    } catch (err) {
      toast.error(err.response?.data?.message || "Código incorrecto");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">
          Detalles del pedido {order.codigoRecogida}
        </h2>

        <table className="w-full text-left mb-4">
          <thead>
            <tr>
              <th className="py-2">Producto</th>
              <th className="py-2">Cantidad</th>
              <th className="py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it) => (
              <tr key={it.product || it._id}>
                <td className="py-2">
                  {it.nombre}
                  {it.talla && (
                    <span className="ml-2 text-xs text-gray-500">
                      (Talla: {it.talla})
                    </span>
                  )}
                </td>
                <td className="py-2">{it.cantidad}</td>
                <td className="py-2 font-semibold">
                  ${Number(it.subTotal).toLocaleString("es-CO")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-bold">
            ${Number(order.total).toLocaleString("es-CO")}
          </span>
        </div>

        <input
          type="text"
          placeholder="Ingresa código de recogida"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={handleDeliver}
          disabled={!code}
          className={`w-full py-3 rounded ${
            !code
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          Entregar Pedido
        </button>
      </div>
    </div>
  );
}
