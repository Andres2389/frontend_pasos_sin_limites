// src/components/AdminProductsTable.js
import React from "react";

const AdminProductsTable = ({
  productos,
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
      
      <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 text-center">
        Productos
      </h2>

      {/* Buscador */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-full bg-[#111112] border border-[#D4AF37]/40 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        />
      </div>

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
            {productos.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No hay productos disponibles
                </td>
              </tr>
            ) : (
              productos.map((p, idx) => (
                <tr
                  key={p._id}
                  className={`transition-all duration-300 border border-[#D4AF37]/10 ${
                    idx % 2 === 0 ? "bg-[#18181b]" : "bg-[#111112]"
                  } hover:bg-[#23232b]/80 rounded-xl`}
                >
                  <td className="px-4 py-3">
                    {p.imagen ? (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${p.imagen}`}
                        alt={p.nombre}
                        className="h-14 w-14 object-cover rounded-xl border-2 border-[#D4AF37]/60 shadow-md bg-[#23232b]"
                      />
                    ) : (
                      <span className="text-xs text-[#B5B5B5]">
                        Sin imagen
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 font-extrabold text-lg text-[#D4AF37] tracking-wide drop-shadow">
                    {p.nombre}
                  </td>

                  <td className="px-4 py-3 text-[#D4AF37] font-bold text-base">
                    {typeof p.valor === "number" && !isNaN(p.valor)
                      ? p.valor.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 0,
                        })
                      : "—"}
                  </td>

                  <td className="px-4 py-3 text-[#D4AF37] font-extrabold text-base">
                    {typeof p.cantidad === "number" && !isNaN(p.cantidad)
                      ? p.cantidad
                      : "—"}
                  </td>

                  <td className="px-4 py-3 space-x-2 flex flex-wrap items-center">
                    <button
                      onClick={() => onEdit(p)}
                      className="px-4 py-1 text-sm font-bold border-2 border-[#D4AF37] bg-[#181818] text-[#D4AF37] rounded-full shadow hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => onDelete(p._id)}
                      className="px-4 py-1 text-sm font-bold border-2 border-red-600 bg-[#181818] text-red-500 rounded-full shadow hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={`px-3 py-1 rounded-full font-bold transition ${
              currentPage === 1
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-[#D4AF37] text-black hover:bg-[#bfa13a]"
            }`}
          >
            Anterior
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded-full font-bold transition ${
                currentPage === i + 1
                  ? "bg-[#D4AF37] text-black"
                  : "bg-[#23232b] text-white hover:bg-[#333]"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className={`px-3 py-1 rounded-full font-bold transition ${
              currentPage === totalPages
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-[#D4AF37] text-black hover:bg-[#bfa13a]"
            }`}
          >
            Siguiente
          </button>

        </div>
      )}
    </div>
  );
};

export default AdminProductsTable;
