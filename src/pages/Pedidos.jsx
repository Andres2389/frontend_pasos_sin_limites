// src/pages/Pedidos.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderTable from "../components/OrderTable";
import OrderModal from "../components/OrderModal";
import { toast } from "react-toastify";

const Pedidos = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchOrders = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user._id) {
      toast.info("Por favor inicia sesión.");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/my?userId=${user._id}`
      );
      setOrders(res.data);
    } catch {
      toast.error("Error al cargar tus pedidos");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const filtered = orders.filter((o) =>
    o.codigoRecogida.toLowerCase().includes(searchTerm.toLowerCase())
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
      {/* Cabecera */}
      <div className="w-full max-w-full md:max-w-4xl lg:max-w-6xl mx-auto bg-[#181818] rounded-xl shadow-md p-4 sm:p-6 mb-6 text-center border border-[#23232b]/60">
        <h1 className="text-3xl font-bold text-[#D4AF37] drop-shadow">Mis Pedidos</h1>
      </div>

      {/* Buscador */}
      <div className="w-full max-w-full md:max-w-4xl lg:max-w-6xl mx-auto mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por código..."
          className="w-full sm:w-1/2 mx-auto block pl-4 pr-4 py-2 border border-[#23232b] bg-[#181818] text-[#D4AF37] placeholder-[#D4AF37]/60 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        />
      </div>

      {/* Tabla */}
      <OrderTable
        orders={filtered}
        onView={(order) => {
          // Mapear items para asegurar estructura y talla
          const mappedOrder = {
            ...order,
            items: order.items.map(it => ({
              nombre: it.nombre || (it.product && it.product.nombre),
              talla: it.talla || (it.product && it.product.talla),
              cantidad: it.cantidad,
              subTotal: it.subTotal
            }))
          };
          setSelectedOrder(mappedOrder);
          setShowModal(true);
        }}
        onCancelSuccess={fetchOrders}
      />

      {/* Modal */}
      {showModal && selectedOrder && (
        <OrderModal order={selectedOrder} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Pedidos;
