// src/components/AdminUserTable.js
import React from "react";
import { FaUsers, FaSearch } from "react-icons/fa";

const AdminUserTable = ({
  usuarios,
  onEdit,
  onDelete,
  searchTerm,
  setSearchTerm,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#18181b] to-[#23232b] p-6 rounded-2xl shadow-2xl w-full max-w-5xl mx-auto mt-6 border-2 border-[#D4AF37]/20 text-[#B5B5B5]">
      <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 text-center flex items-center justify-center gap-2">
        <FaUsers /> Lista de Usuarios
      </h2>
      <div className="relative max-w-sm mx-auto mb-6">
        <FaSearch className="absolute left-3 top-3 text-[#D4AF37]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre o correo..."
          className="w-full pl-10 pr-4 py-2 bg-[#23232b] border border-[#D4AF37]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-[#B5B5B5] placeholder-[#B5B5B5]"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full text-sm text-left border-separate border-spacing-y-2 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-[#23232b] text-[#D4AF37]">
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Correo</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr
                key={u._id}
                className="bg-[#18181b] hover:bg-[#23232b]/60 rounded-xl transition-all duration-300 border border-[#D4AF37]/10"
              >
                <td className="px-4 py-3 font-medium text-[#E6C86E]">
                  {u.nombre}
                </td>
                <td className="px-4 py-3 text-[#B5B5B5]">{u.correo}</td>
                <td className="px-4 py-3 capitalize text-[#B5B5B5]">{u.rol}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => onEdit(u)}
                    className="px-4 py-1 text-sm font-bold border-2 border-[#D4AF37] bg-[#0B0B0B] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(u._id)}
                    className="px-4 py-1 text-sm font-bold border-2 border-red-600 bg-[#0B0B0B] text-red-500 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded-full border-2 font-bold transition-all duration-300 ${
                currentPage === i + 1
                  ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                  : "bg-[#23232b] text-[#B5B5B5] border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUserTable;
