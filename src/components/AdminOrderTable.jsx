// src/components/AdminOrderTable.jsx
import React from "react";

export default function AdminOrderTable({ orders, onView }) {
  if (!orders.length) {
    return (
      <p className="text-center text-[#D4AF37]/80 mt-10">
        No hay pedidos por el momento.
      </p>
    );
  }

  return (
    <div className="bg-[#181818] p-2 sm:p-4 md:p-6 rounded-xl shadow-md w-full max-w-full md:max-w-4xl lg:max-w-6xl mx-auto mt-6 overflow-x-auto border-2 border-[#D4AF37]/60">
      <table className="min-w-[600px] w-full text-xs sm:text-sm text-left border-separate border-spacing-y-2 break-words">
        <thead>
          <tr className="bg-[#23232b] text-[#D4AF37]">
            <th className="px-4 py-3">Código</th>
            <th className="px-4 py-3">Cliente</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="bg-[#181818] hover:bg-[#23232b] transition border-b border-[#23232b]">
              <td className="px-4 py-3 text-[#D4AF37]">{o.codigoRecogida}</td>
              <td className="px-4 py-3 text-white">{o.user?.nombre || "Sin usuario"}</td>
              <td className="px-4 py-3 text-white">${o.total.toFixed(2)}</td>
              <td className="px-4 py-3 capitalize text-white">{o.estado}</td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onView(o)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
