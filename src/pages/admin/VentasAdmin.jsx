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
  const [ventaModal, setVentaModal] = useState(null);
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

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/sales/admin`,
        {
          userId: user._id,
          productos: seleccionados,
        }
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
      toast.error(err.response?.data?.message || "Error al registrar venta");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = seleccionados.reduce((acc, item) => {
    const prod = productos.find((p) => p._id === item._id);
    return prod ? acc + prod.valor * item.cantidad : acc;
  }, 0);

  const totalPages = Math.ceil(ventasDiarias.length / itemsPerPage);

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

        <div className="mb-4 p-3 bg-[#23232b]/40 rounded-xl text-[#6EC6FF] font-semibold text-lg">
          Subtotal: {subtotal.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
          })}
        </div>

        {/* Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {productos.map((p) => (
            <div
              key={p._id}
              className="bg-[#23232b]/60 border border-[#D4AF37]/20 rounded-2xl p-4 flex items-center gap-4"
            >
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

      </div>

      {/* Modal */}
      {ventaModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#23232b] p-6 rounded-xl max-w-md w-full border border-[#D4AF37]/20">
            <h2 className="text-lg font-bold text-[#D4AF37] mb-4">
              Productos de la venta
            </h2>

            <div className="max-h-60 overflow-y-auto">
              {ventaModal.productos.map((prod) => (
                <div key={prod.productId} className="mb-2 text-white">
                  {prod.nombre} ({prod.cantidad})
                </div>
              ))}
            </div>

            <button
              className="mt-4 px-4 py-2 bg-[#D4AF37] text-black rounded hover:bg-yellow-400 w-full"
              onClick={() => setVentaModal(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VentasAdmin;
