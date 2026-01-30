import React, { useEffect, useState } from "react";
import ExportButtons from '../../components/ExportButtons';
import axios from "axios";
import { toast } from "react-toastify";

const VentasDiarias = () => {
  const [fecha, setFecha] = useState(() => {
    const hoy = new Date();
    return hoy.toISOString().slice(0, 10);
  });
  const [ventas, setVentas] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user._id || user.rol !== "admin") {
      toast.error("Acceso solo para administradores");
      window.location.href = "/";
      return;
    }
    fetchVentas();
    // eslint-disable-next-line
  }, []);

  const fetchVentas = async (date = fecha) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/sales/daily?date=${date}`);
      setVentas({
        fecha: res.data.fecha || date,
        totalVendido: Number(res.data.totalVendido) || 0,
        totalPedidos: Number(res.data.totalPedidos) || 0,
        totalProductos: Number(res.data.totalProductos) || 0,
      });
      console.log(`[FRONT] Refetch ventas diarias para fecha ${date}`);
    } catch (err) {
      toast.error("Error al cargar ventas diarias");
      setVentas(null);
    } finally {
      setLoading(false);
    }
  };

  // Permite refetch externo
  window.refetchVentasDiarias = fetchVentas;

  const handleFechaChange = (e) => {
    setFecha(e.target.value);
    fetchVentas(e.target.value);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-[#18181b] to-[#23232b] rounded-2xl shadow-2xl mt-8 border-2 border-[#D4AF37]/20 text-[#B5B5B5]">
      <ExportButtons type="sales" params={{ from: fecha, to: fecha }} />
      <h1 className="text-2xl font-bold mb-4 text-[#D4AF37]">Ventas Diarias</h1>
      <div className="mb-6 flex items-center gap-4">
        <label className="font-semibold text-[#E6C86E]">Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={handleFechaChange}
          className="border border-[#D4AF37]/30 rounded-xl px-3 py-2 bg-[#23232b] text-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        />
      </div>
      {loading ? (
        <p className="text-center text-[#D4AF37]">Cargando...</p>
      ) : ventas ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-[#23232b] p-4 rounded-xl shadow text-center border border-[#D4AF37]/20">
            <div className="text-[#E6C86E] text-sm mb-1">Fecha</div>
            <div className="text-lg font-bold">{ventas.fecha}</div>
          </div>
          <div className="bg-[#23232b] p-4 rounded-xl shadow text-center border border-[#D4AF37]/20">
            <div className="text-[#E6C86E] text-sm mb-1">Total Vendido</div>
            <div className="text-lg font-bold text-[#D4AF37]">${ventas.totalVendido?.toFixed ? ventas.totalVendido.toFixed(2) : ventas.totalVendido}</div>
          </div>
          <div className="bg-[#23232b] p-4 rounded-xl shadow text-center border border-[#D4AF37]/20">
            <div className="text-[#E6C86E] text-sm mb-1">Pedidos Entregados</div>
            <div className="text-lg font-bold">{ventas.totalPedidos}</div>
          </div>
          <div className="bg-[#23232b] p-4 rounded-xl shadow text-center border border-[#D4AF37]/20">
            <div className="text-[#E6C86E] text-sm mb-1">Productos Vendidos</div>
            <div className="text-lg font-bold">{ventas.totalProductos}</div>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500">No hay datos para la fecha seleccionada.</p>
      )}
    </div>
  );
};

export default VentasDiarias;
