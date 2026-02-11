// src/pages/admin/VentasAdmin.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VentasAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [ventasDiarias, setVentasDiarias] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user._id || user.rol !== "admin") {
      toast.info("Solo el administrador puede acceder a ventas.");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/productos/`
        );
        setProductos(data || []);
      } catch {
        toast.error("Error al cargar productos");
      }
    };
    fetchProductos();
  }, []);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/sales/daily?userId=${user._id}`
        );
        setVentasDiarias(data.ventas || []);
      } catch {
        toast.error("Error al cargar ventas diarias");
      }
    };
    fetchVentas();
  }, []);

  // 🔥 Reset página si cambian ventas
  useEffect(() => {
    setCurrentPage(1);
  }, [ventasDiarias]);

  const handleSelect = (id, cantidad) => {
    setSeleccionados((prev) => {
      const existe = prev.find((p) => p._id === id);
      if (existe) {
        return prev.map((p) =>
          p._id === id ? { ...p, cantidad } : p
        );
      }
      return [...prev, { _id: id, cantidad }];
    });
  };

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

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/sales/admin`,
        payload
      );

      toast.success("Venta registrada correctamente");
      setSeleccionados([]);

      const { data: ventasData } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/sales/daily?userId=${user._id}`
      );

      setVentasDiarias(ventasData.ventas || []);

      const { data: prodData } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/productos/`
      );

      setProductos(prodData || []);
    } catch (err) {
      if (
        err.response?.data?.message &&
        !String(err.response.data.message).includes("duplicate key")
      ) {
        toast.error(err.response.data.message);
      } else {
        toast.success("Venta registrada correctamente");
      }
    } finally {
      setLoading(false);
    }
  };

  const subtotal = seleccionados.reduce((acc, item) => {
    const prod = productos.find((p) => p._id === item._id);
    return prod ? acc + prod.valor * item.cantidad : acc;
  }, 0);

  // 🔥 PAGINACIÓN
  const totalPages = Math.ceil(
    ventasDiarias.length / itemsPerPage
  );

  const paginatedVentas = ventasDiarias.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B0B] to-[#1A1A1A] p-6 text-[#B5B5B5] flex flex-col items-center">
      <div className="w-full max-w-4xl bg-[#181818] rounded-2xl shadow-2xl p-6 border border-[#23232b]/60">

        <h1 className="text-2xl font-bold mb-4 text-[#D4AF37]">
          Ventas Admin
        </h1>

        {/* Subtotal */}
        <div className="mb-4 p-3 bg-[#23232b]/40 rounded-xl text-[#6EC6FF] font-semibold text-lg">
          Subtotal: {subtotal.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
          })}
        </div>

        {/* Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {productos.map((p) => (
            <div key={p._id} className="bg-[#23232b]/60 border border-[#D4AF37]/20 rounded-2xl p-4 flex items-center gap-4">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${p.imagen}`}
                alt={p.nombre}
                className="h-16 w-16 object-cover rounded-xl border-2 border-[#D4AF37]/40"
              />

              <div className="flex-1">
                <p className="font-semibold text-[#D4AF37]">
                  {p.nombre}
                </p>
                <p>
                  {p.valor.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })}
                </p>
                <p className="text-xs">
                  Stock: {p.stock}
                </p>
              </div>

              <input
                type="number"
                min={1}
                max={p.stock}
                className="w-20 border-2 border-[#D4AF37]/40 rounded-lg px-2 py-1 bg-[#181818] text-[#D4AF37]"
                value={
                  seleccionados.find((s) => s._id === p._id)?.cantidad || ""
                }
                onChange={(e) =>
                  handleSelect(p._id, Number(e.target.value))
                }
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleVenta}
          disabled={loading}
          className="w-full bg-[#D4AF37] text-black py-3 rounded-xl font-bold mb-8 disabled:opacity-60"
        >
          {loading ? "Procesando..." : "Confirmar Venta"}
        </button>

        {/* Tabla ventas */}
        <h2 className="text-lg font-semibold mb-2 text-[#D4AF37]">
          Ventas Diarias
        </h2>

        <div className="overflow-x-auto rounded-xl bg-[#23232b]/40 border border-[#D4AF37]/10">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#181818] text-[#D4AF37]">
                <th className="py-2 px-4">Fecha</th>
                <th className="py-2 px-4">Total</th>
                <th className="py-2 px-4">Productos</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVentas.map((v) => (
                <tr key={v._id}>
                  <td className="py-2 px-4">
                    {new Date(v.fecha).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 text-[#D4AF37] font-semibold">
                    {v.total.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </td>
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

        {/* 🔥 Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 rounded-full bg-[#D4AF37] text-black disabled:opacity-40"
            >
              Anterior
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-full ${
                  currentPage === i + 1
                    ? "bg-[#D4AF37] text-black"
                    : "bg-[#23232b] text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 rounded-full bg-[#D4AF37] text-black disabled:opacity-40"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VentasAdmin;
