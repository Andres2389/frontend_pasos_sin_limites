// src/components/AdminProductsTable.js
import React from "react";
import { FaSearch, FaBox, FaEdit, FaTrash } from "react-icons/fa";

const AdminProductsTable = ({
  productos,
  onEdit,
  onDelete,
  onCreate,
  searchTerm,
  setSearchTerm,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#18181b] to-[#23232b] p-6 rounded-2xl shadow-2xl w-full max-w-5xl mx-auto mt-6 border-2 border-[#D4AF37]/20 text-[#B5B5B5]">
      <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 text-center flex items-center justify-center gap-2">
        Productos
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full text-sm text-left border-separate border-spacing-y-2 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-[#23232b] text-[#D4AF37]">
              <th className="px-4 py-3">Imagen</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, idx) => (
              <tr
                key={p._id}
                className={`transition-all duration-300 border border-[#D4AF37]/10 ${idx % 2 === 0 ? 'bg-[#18181b]' : 'bg-[#111112]'} hover:bg-[#23232b]/80 rounded-xl`}
              >
                <td className="px-4 py-3">
                  {p.imagen ? (
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${p.imagen}`}
                      alt={p.nombre}
                      className="h-14 w-14 object-cover rounded-xl border-2 border-[#D4AF37]/60 shadow-md bg-[#23232b]"
                    />
                  ) : (
                    <span className="text-xs text-[#B5B5B5]">Sin imagen</span>
                  )}
                </td>
                <td className="px-4 py-3 font-extrabold text-lg text-[#D4AF37] tracking-wide drop-shadow">
                  {p.nombre}
                </td>
                <td className="px-4 py-3 text-[#D4AF37] font-bold text-base">
                  {typeof p.valor === 'number' && !isNaN(p.valor)
                    ? p.valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })
                    : <span className="text-[#B5B5B5]">—</span>}
                </td>
                <td className="px-4 py-3 text-[#D4AF37] font-extrabold text-base">
                  {typeof p.cantidad === 'number' && !isNaN(p.cantidad)
                    ? p.cantidad
                    : <span className="text-[#B5B5B5]">—</span>}
                </td>
                <td className="px-4 py-3 space-x-2 flex flex-wrap items-center">
                  <button
                    onClick={() => onEdit(p)}
                    className="px-4 py-1 text-sm font-bold border-2 border-[#D4AF37] bg-[#181818] text-[#D4AF37] rounded-full shadow hover:bg-[#D4AF37] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 transition-all duration-300"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(p._id)}
                    className="px-4 py-1 text-sm font-bold border-2 border-red-600 bg-[#181818] text-red-500 rounded-full shadow hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-all duration-300"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductsTable;
