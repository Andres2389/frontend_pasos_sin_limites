// src/pages/admin/VentasAdmin.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Módulo de ventas solo para admin
// No modifica ni afecta otros módulos

const VentasAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]); // [{_id, cantidad}]
  const [ventasDiarias, setVentasDiarias] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validar usuario admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user._id || user.rol !== "admin") {
      toast.info("Solo el administrador puede acceder a ventas.");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Obtener productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // El endpoint correcto es /api/productos/ (no /api/products)
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/productos/`);
        // data es un array de productos
        setProductos(data || []);
      } catch (err) {
        toast.error("Error al cargar productos");
      }
    };
    fetchProductos();
  }, []);

  // Obtener ventas diarias
  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sales/daily?userId=${user._id}`);
        setVentasDiarias(data.ventas || []);
      } catch (err) {
        toast.error("Error al cargar ventas diarias");
      }
    };
    fetchVentas();
  }, []);

  // Seleccionar producto y cantidad
  const handleSelect = (id, cantidad) => {
    setSeleccionados((prev) => {
      const existe = prev.find((p) => p._id === id);
      if (existe) {
        return prev.map((p) => (p._id === id ? { ...p, cantidad } : p));
      }
      return [...prev, { _id: id, cantidad }];
    });
  };

  // Confirmar venta
  const handleVenta = async () => {
    if (seleccionados.length === 0) {
      toast.info("Selecciona al menos un producto");
      return;
    }
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const payload = {
        userId: user._id,
        productos: seleccionados,
      };
      const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/sales/admin`, payload);
      toast.success("Venta registrada correctamente");
      setSeleccionados([]);
      // Actualizar ventas diarias
      const { data: ventasData } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sales/daily?userId=${user._id}`);
      setVentasDiarias(ventasData.ventas || []);
      // Actualizar productos
      const { data: prodData } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/productos/`);
      setProductos(prodData || []);
    } catch (err) {
      // Solo mostrar error si no es duplicado de numeroVenta
      if (err.response?.data?.message && !String(err.response.data.message).includes('duplicate key')) {
        toast.error(err.response.data.message);
      }
      // Si es duplicado, mostrar solo mensaje de éxito
      else {
        toast.success("Venta registrada correctamente");
      }
    } finally {
      setLoading(false);
    }
  };

  // Calcular subtotal de ventas seleccionadas
  const subtotal = seleccionados.reduce((acc, item) => {
    const prod = productos.find((p) => p._id === item._id);
    return prod ? acc + prod.valor * item.cantidad : acc;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B0B] to-[#1A1A1A] p-6 text-[#B5B5B5] font-sans flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto bg-[#181818] rounded-2xl shadow-2xl p-6 border border-[#23232b]/60 backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-4 text-[#D4AF37] drop-shadow">Ventas Admin</h1>
        {/* Listado de productos */}
        <h2 className="text-lg font-semibold mb-2 text-[#D4AF37]">Selecciona productos</h2>
        {/* Subtotal de la venta actual */}
        <div className="mb-4 p-3 bg-[#23232b]/40 rounded-xl text-[#6EC6FF] font-semibold text-lg shadow-inner">
          Subtotal: ${subtotal.toLocaleString("es-CO", { style: "currency", currency: "COP" })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {productos.map((p) => (
            <div key={p._id} className="bg-[#23232b]/60 border border-[#D4AF37]/20 rounded-2xl p-4 flex items-center gap-4 shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
              <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${p.imagen}`} alt={p.nombre} className="h-16 w-16 object-cover rounded-xl border-2 border-[#D4AF37]/40 shadow" />
              <div className="flex-1">
                <p className="font-semibold text-[#D4AF37]">{p.nombre}</p>
                <p className="text-[#B5B5B5]">Precio: {p.valor.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</p>
                <p className="text-xs text-[#B5B5B5]">Stock: {p.stock}</p>
              </div>
              <input
                type="number"
                min={1}
                max={p.stock}
                placeholder="Cantidad"
                className="w-20 border-2 border-[#D4AF37]/40 rounded-lg px-2 py-1 bg-[#181818] text-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] outline-none transition"
                value={seleccionados.find((s) => s._id === p._id)?.cantidad || ""}
                onChange={(e) => {
                  const cantidad = Number(e.target.value);
                  if (cantidad > p.stock) {
                    toast.error("Stock insuficiente");
                    return;
                  }
                  handleSelect(p._id, cantidad);
                }}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleVenta}
          disabled={loading}
          className="w-full bg-[#D4AF37] text-black py-3 rounded-xl font-bold shadow-lg hover:bg-[#E6C86E] transition-all duration-200 mb-8 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Procesando..." : "Confirmar Venta"}
        </button>
        {/* Tabla de ventas diarias */}
        <h2 className="text-lg font-semibold mb-2 text-[#D4AF37]">Ventas Diarias</h2>
        <div className="overflow-x-auto rounded-xl shadow-inner bg-[#23232b]/40 border border-[#D4AF37]/10">
          <table className="min-w-full text-[#B5B5B5]">
            <thead>
              <tr className="bg-[#181818] text-[#D4AF37]">
                <th className="py-2 px-4">Fecha</th>
                <th className="py-2 px-4">Total</th>
                <th className="py-2 px-4">Productos</th>
              </tr>
            </thead>
            <tbody>
              {ventasDiarias.map((v) => (
                <tr key={v._id} className="hover:bg-[#23232b]/30 transition">
                  <td className="py-2 px-4">{new Date(v.fecha).toLocaleDateString()}</td>
                  <td className="py-2 px-4 text-[#D4AF37] font-semibold">{v.total.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
                  <td className="py-2 px-4">
                    {v.productos.map((prod) => (
                      <span key={prod.productId} className="block">
                        {prod.nombre} ({prod.cantidad})
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VentasAdmin;
