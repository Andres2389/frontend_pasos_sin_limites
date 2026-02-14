import { useEffect, useState } from "react";
import axios from "axios";

export default function VentasAdmin() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);

  // 🔍 Buscador
  const [search, setSearch] = useState("");

  // 📄 Paginación independiente
  const [productPage, setProductPage] = useState(1);
  const [salesPage, setSalesPage] = useState(1);

  const productsPerPage = 6;
  const salesPerPage = 5;

  useEffect(() => {
    obtenerVentas();
    obtenerProductos();
  }, []);

  const obtenerVentas = async () => {
    const res = await axios.get("/api/orders");
    setVentas(res.data);
  };

  const obtenerProductos = async () => {
    const res = await axios.get("/api/products");
    setProductos(res.data);
  };

  // 🔍 Filtrar productos
  const filteredProductos = productos.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Paginación productos
  const totalProductPages = Math.ceil(
    filteredProductos.length / productsPerPage
  );

  const paginatedProductos = filteredProductos.slice(
    (productPage - 1) * productsPerPage,
    productPage * productsPerPage
  );

  // 📄 Paginación ventas
  const totalSalesPages = Math.ceil(ventas.length / salesPerPage);

  const paginatedVentas = ventas.slice(
    (salesPage - 1) * salesPerPage,
    salesPage * salesPerPage
  );

  const subtotal = ventas.reduce((acc, v) => acc + v.total, 0);

  return (
    <div className="p-6 text-white">

      {/* 🔥 RESUMEN */}
      <div className="mb-6 text-xl font-bold text-[#D4AF37]">
        Total vendido: ${subtotal.toLocaleString()}
      </div>

      {/* ================= PRODUCTOS ================= */}

      <h2 className="text-2xl font-bold mb-4 text-[#D4AF37]">
        Productos
      </h2>

      {/* 🔍 Buscador */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setProductPage(1);
          }}
          className="w-full px-4 py-2 rounded-xl bg-[#181818] border border-[#D4AF37]/40 text-white focus:outline-none focus:border-[#D4AF37]"
        />
      </div>

      {/* 🛍 Grid productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProductos.map((p) => (
          <div
            key={p._id}
            className="bg-[#1f1f1f] p-4 rounded-2xl border border-[#D4AF37]/30"
          >
            <h3 className="text-lg font-bold text-[#D4AF37]">
              {p.nombre}
            </h3>
            <p>${p.precio.toLocaleString()}</p>
            <p>Stock: {p.stock}</p>
          </div>
        ))}
      </div>

      {/* 📄 Paginación productos */}
      {totalProductPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          <button
            disabled={productPage === 1}
            onClick={() => setProductPage(productPage - 1)}
            className="px-3 py-1 rounded-full bg-[#D4AF37] text-black disabled:opacity-40"
          >
            Anterior
          </button>

          {[...Array(totalProductPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setProductPage(i + 1)}
              className={`px-3 py-1 rounded-full ${
                productPage === i + 1
                  ? "bg-[#D4AF37] text-black"
                  : "bg-[#23232b] text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={productPage === totalProductPages}
            onClick={() => setProductPage(productPage + 1)}
            className="px-3 py-1 rounded-full bg-[#D4AF37] text-black disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* ================= VENTAS ================= */}

      <h2 className="text-2xl font-bold mt-12 mb-4 text-[#D4AF37]">
        Ventas
      </h2>

      <div className="space-y-4">
        {paginatedVentas.map((v) => (
          <div
            key={v._id}
            className="bg-[#1f1f1f] p-4 rounded-2xl border border-[#D4AF37]/30"
          >
            <p className="font-bold">
              Cliente: {v.cliente}
            </p>
            <p>Total: ${v.total.toLocaleString()}</p>
            <p>Fecha: {new Date(v.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {/* 📄 Paginación ventas */}
      {totalSalesPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          <button
            disabled={salesPage === 1}
            onClick={() => setSalesPage(salesPage - 1)}
            className="px-3 py-1 rounded-full bg-[#D4AF37] text-black disabled:opacity-40"
          >
            Anterior
          </button>

          {[...Array(totalSalesPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setSalesPage(i + 1)}
              className={`px-3 py-1 rounded-full ${
                salesPage === i + 1
                  ? "bg-[#D4AF37] text-black"
                  : "bg-[#23232b] text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={salesPage === totalSalesPages}
            onClick={() => setSalesPage(salesPage + 1)}
            className="px-3 py-1 rounded-full bg-[#D4AF37] text-black disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
