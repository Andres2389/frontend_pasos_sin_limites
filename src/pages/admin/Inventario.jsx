import React, { useEffect, useState } from "react";
import axios from "axios";
import ExportButtons from '../../components/ExportButtons';
import Paginacion from "../../components/Paginacion";
import Buscador from "../../components/Buscador";

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ventas, setVentas] = useState(null);
  const [productosPage, setProductosPage] = useState(1);
  const [productosPages, setProductosPages] = useState(1);
  const [productosSearch, setProductosSearch] = useState("");
  const productosLimit = 10;

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/productos`, {
          params: {
            page: productosPage,
            limit: productosLimit,
            search: productosSearch
          }
        });
        setProductos(data.products || []);
        setProductosPages(Math.ceil((data.total || 0) / productosLimit));
      } catch {
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };
    const fetchVentas = async () => {
      try {
        // Sumar ventas de pedidos entregados y ventas admin
        let totalVentas = 0;
        // Pedidos entregados
        const { data: pedidos } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders`);
        const entregados = pedidos.filter(o => o.estado === 'ENTREGADO');
        entregados.forEach(order => {
          order.items.forEach(item => {
            totalVentas += item.cantidad * item.valorUnitario;
          });
        });
        // Ventas admin
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user && user.rol === "admin") {
          const { data: ventasAdmin } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sales/daily?userId=${user._id}`);
          if (ventasAdmin.ventas && Array.isArray(ventasAdmin.ventas)) {
            totalVentas += ventasAdmin.ventas.reduce((acc, v) => acc + v.total, 0);
          }
        }
        setVentas(totalVentas);
      } catch {
        setVentas(null);
      }
    };
    fetchProductos();
    fetchVentas();
  }, [productosPage, productosSearch]);

  if (loading) {
    return <div className="p-8 text-center text-[#D4AF37] bg-gradient-to-br from-[#0B0B0B] to-[#1A1A1A]">Cargando inventario...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#18181b] to-[#23232b] rounded-2xl shadow-2xl p-8 mt-8 border-2 border-[#D4AF37]/20 text-[#B5B5B5]">
      <h1 className="text-2xl font-bold mb-6 text-[#D4AF37]">Inventario</h1>
      <ExportButtons type="inventory" />
      {/* Card resumen de ventas */}
      <div className="bg-[#23232b] p-4 rounded-xl shadow mb-6 flex flex-col items-center border border-[#D4AF37]/20">
        <div className="text-[#E6C86E] text-sm mb-1">Ventas (solo entregados)</div>
        <div className="text-2xl font-bold text-[#D4AF37]">${ventas?.toFixed ? ventas.toFixed(2) : ventas || 0}</div>
      </div>
      <Buscador value={productosSearch} onChange={v => { setProductosSearch(v); setProductosPage(1); }} placeholder="Buscar producto..." />
      <table className="w-full text-left border-separate border-spacing-y-2 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#23232b] text-[#D4AF37]">
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Cantidad</th>
            <th className="px-4 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p._id} className="bg-[#18181b] border border-[#D4AF37]/10 hover:bg-[#23232b]/60 transition-all duration-300">
              <td className="px-4 py-2 font-medium text-[#E6C86E]">{p.nombre}</td>
              <td className="px-4 py-2 text-[#B5B5B5]">{p.cantidad}</td>
              <td className="px-4 py-2">
                {p.cantidad === 0 ? (
                  <span className="text-red-500 font-semibold">Sin stock</span>
                ) : (
                  <span className="text-[#D4AF37] font-semibold">Disponible</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginacion currentPage={productosPage} totalPages={productosPages} onPageChange={setProductosPage} />
    </div>
  );
};

export default Inventario;
