// src/pages/admin/AdminOrderList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminOrderTable from "../../components/AdminOrderTable";
import AdminOrderModal from "../../components/AdminOrderModal";

export default function AdminOrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/orders`)
      .then(({ data }) => setOrders(data))
      .catch(() => toast.error("Error al cargar pedidos"))
      .finally(() => setLoading(false));
  }, []);

  // 🔍 FILTRO
  const filtered = orders.filter((o) =>
    o.codigoRecogida.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔥 PAGINACIÓN
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0B0B] to-[#1A1A1A]">
        <p className="text-[#D4AF37]">Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B0B] to-[#1A1A1A] p-2 sm:p-4">
      
      {/* Header */}
      <div className="w-full max-w-full md:max-w-4xl lg:max-w-6xl mx-auto bg-[#18181b] rounded-2xl shadow-2xl p-4 sm:p-6 mb-6 text-center border border-[#D4AF37]/20">
        <h1 className="text-3xl font-bold text-[#D4AF37]">
          Pedidos (Admin)
        </h1>
      </div>

      {/* Search */}
      <div className="w-full max-w-full md:max-w-4xl lg:max-w-6xl mx-auto mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset al buscar
          }}
          placeholder="Buscar por código..."
          className="w-full sm:w-1/2 mx-auto block pl-4 pr-4 py-2 bg-[#23232b] border border-[#D4AF37]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-[#B5B5B5] placeholder-[#B5B5B5]"
        />
      </div>

      {/* Tabla */}
      <AdminOrderTable
        orders={paginated}
        onView={(order) => {
          setSelectedOrder(order);
          setShowModal(true);
        }}
      />

      {/* 🔥 Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
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
              onClick={() => setCurrentPage(i + 1)}
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
            onClick={() => setCurrentPage(currentPage + 1)}
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

      {/* Modal */}
      {showModal && selectedOrder && (
        <AdminOrderModal
          order={selectedOrder}
          onClose={() => setShowModal(false)}
          onDelivered={(updated) => {
            setOrders((prev) =>
              prev.map((o) => (o._id === updated._id ? updated : o))
            );
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
