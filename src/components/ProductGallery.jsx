// src/components/ProductGallery.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductModal from "./ProductModal";
import { FaSyringe, FaTimes, FaUtensils } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const ProductGallery = ({ openSidebar }) => {
  const { addItem } = useContext(CartContext);
  const [productos, setProductos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 8;

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const endpoint = searchTerm
          ? `${import.meta.env.VITE_API_BASE_URL}/api/productos/buscar?query=${searchTerm}`
          : `${import.meta.env.VITE_API_BASE_URL}/api/productos/productos-gallery?page=${page}&limit=${limit}`;
        const res = await axios.get(endpoint);
        const nuevos = searchTerm ? res.data : res.data.productos;
        if (searchTerm) {
          setProductos(nuevos);
          setHasMore(false);
        } else {
          setProductos(nuevos);
          setHasMore(nuevos.length === limit);
        }
      } catch (err) {
        console.error("Error cargando productos", err);
      }
      setLoading(false);
    };
    fetchProductos();
  }, [page, searchTerm]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPage(1);
    setProductos([]);
    setHasMore(!value);
  };

  // reset search on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSearchTerm("");
        setPage(1);
        setProductos([]);
        setHasMore(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Track selected size per product (by _id)
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <section className="py-12 w-full max-w-7xl mx-auto px-2 sm:px-4 bg-[#18181b] min-h-screen">
      {/* Header + buscador */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6 bg-gradient-to-r from-[#23232b] to-[#18181b] p-6 rounded-2xl shadow-xl border border-[#D4AF37]">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] flex items-center gap-2">
          <FaSyringe className="text-[#D4AF37]" />
          Catálogo de Productos
        </h2>
        <div className="w-full sm:w-[400px] relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="🔍 Buscar producto por nombre..."
            className="w-full pl-4 pr-10 py-3 rounded-lg border border-[#D4AF37] bg-[#1A1A1A] text-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => handleSearchChange({ target: { value: "" } })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B5B5B5] hover:text-red-500"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
        {productos.map((p, i) => {
          const tallas = [38, 39, 40, 41, 42, '+2'];
          const selectedTalla = selectedSizes[p._id] || null;
          return (
            <div
              key={`${p._id}-${i}`}
              className="bg-gradient-to-br from-[#23232b] to-[#18181b] rounded-2xl border border-[#D4AF37]/40 shadow-lg p-5 flex flex-col justify-between min-h-[420px] group transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl hover:border-[#E6C86E]/60"
            >
              <div className="cursor-pointer flex-1 flex flex-col items-center" onClick={() => setSelected(p)}>
                <div className="w-full flex items-center justify-center mb-4">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${p.imagen}`}
                    alt={p.nombre}
                    className="h-56 w-56 object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#D4AF37] text-center mb-1 truncate w-full">{p.nombre}</h3>
                <p className="text-[#E6C86E] text-2xl font-bold text-center mb-1">${p.valor}</p>
                {/* Selector de talla funcional */}
                <div className="flex flex-wrap justify-center gap-2 my-2">
                  {tallas.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`px-3 py-1 rounded-md border border-[#D4AF37] text-[#D4AF37] bg-transparent hover:bg-[#D4AF37] hover:text-black transition-all duration-200 font-semibold text-sm ${selectedTalla === t ? 'bg-[#D4AF37] text-black' : ''}`}
                      tabIndex={-1}
                      disabled={p.cantidad === 0}
                      onClick={e => {
                        e.stopPropagation();
                        handleSizeSelect(p._id, t);
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {p.cantidad === 0 ? (
                  <p className="text-sm text-red-500 mt-1 font-semibold text-center">Sin stock</p>
                ) : (
                  <p className="text-sm text-[#B5B5B5] mt-1 text-center">Disponible: <span className="font-semibold">{p.cantidad}</span></p>
                )}
              </div>
              <button
                className={`mt-6 px-6 py-2 rounded-full font-bold shadow transition-all duration-300 w-full ${p.cantidad === 0 || !selectedTalla ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-[#D4AF37] text-black hover:bg-[#E6C86E] cursor-pointer'} focus:outline-none focus:ring-2 focus:ring-[#D4AF37]`}
                disabled={p.cantidad === 0 || !selectedTalla}
                onClick={() => {
                  if (p.cantidad > 0 && selectedTalla) {
                    const itemToAdd = { ...p, talla: selectedTalla };
                    console.log('[ADD TO CART]', itemToAdd);
                    addItem(itemToAdd);
                  }
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.6 17h8.8a1 1 0 00.95-.68L21 9M7 13V6h13" /></svg>
                  Agregar al Carrito
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Paginación */}
      {loading && <p className="text-center mt-4">Cargando productos...</p>}
      {!loading && productos.length === 0 && (
        <p className="text-center mt-4 text-red-500">No hay productos.</p>
      )}
      {!searchTerm && productos.length > 0 && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-500"
          >
            Anterior
          </button>
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
            Página {page}
          </span>
          <button
            onClick={() => hasMore && setPage((p) => p + 1)}
            disabled={!hasMore}
            className="px-4 py-2 rounded-lg border bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-500"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Modal */}
      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          openSidebar={openSidebar}
        />
      )}
    </section>
  );
};

export default ProductGallery;
