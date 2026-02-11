// src/pages/admin/Productos.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AdminProductsTable from "../../components/AdminProductsTable";
import AdminEditProductsModal from "../../components/AdminEditProductsModal";
import Logo from "../../assets/logohome.png";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const itemsPerPage = 5;

  // Fetch productos dentro de un useEffect normal
  const fetchProductos = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/productos`);
      setProductos(data);
    } catch {
      toast.error("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const eliminarProducto = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/productos/${id}`);
        setProductos((p) => p.filter((x) => x._id !== id));
        toast.success("Producto eliminado correctamente");
      } catch {
        toast.error("Error al eliminar producto");
      }
    }
  };


  const openEditModal = (p) => {
    // Asegura que el producto tenga todas las propiedades requeridas para inputs controlados
    setSelectedProduct({
      nombre: p.nombre ?? "",
      cantidad: p.cantidad ?? "",
      valor: p.valor ?? "",
      descripcion: p.descripcion ?? "",
      imagen: p.imagen ?? null,
      _id: p._id,
      categoria: p.categoria ?? "",
      tallas: p.tallas ?? [],
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setSelectedProduct({
      nombre: "",
      cantidad: "",
      valor: "",
      descripcion: "",
      categoria: "",
      imagen: null,
      tallas: [],
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const form = new FormData();
      form.append("nombre", selectedProduct.nombre);
      form.append("cantidad", selectedProduct.cantidad);
      form.append("valor", selectedProduct.valor);
      form.append("descripcion", selectedProduct.descripcion);
      form.append("tallas", JSON.stringify(selectedProduct.tallas || []));

      if (selectedProduct.imagen instanceof File) {
        form.append("imagen", selectedProduct.imagen);
      }
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/productos/${selectedProduct._id}`,
        form
      );
      setProductos((p) =>
        p.map((x) => (x._id === data.producto._id ? data.producto : x))
      );
      toast.success("Producto actualizado correctamente");
      setShowModal(false);
    } catch {
      toast.error("Error al actualizar producto");
    }
  };

  const handleCreateProduct = async () => {
    try {
      const form = new FormData();
      form.append("nombre", selectedProduct.nombre);
      form.append("cantidad", selectedProduct.cantidad);
      form.append("valor", selectedProduct.valor);
      form.append("descripcion", selectedProduct.descripcion);
      form.append("tallas", JSON.stringify(selectedProduct.tallas || []));

      if (selectedProduct.imagen instanceof File) {
        form.append("imagen", selectedProduct.imagen);
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/productos`,
        form
      );
      setProductos((p) => [...p, data.producto]);
      toast.success("Producto creado exitosamente");
      setShowModal(false);
    } catch {
      toast.error("Error al crear producto");
    }
  };

  const filtered = productos.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0B0B] to-[#1A1A1A]">
        <p className="text-[#D4AF37] text-xl font-bold">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B0B] to-[#1A1A1A] p-4">
      {/* Cabecera */}
      <div className="max-w-6xl mx-auto bg-[#181818] rounded-2xl shadow-2xl p-6 mb-6 flex items-center border border-[#23232b]/60">
        <img src={Logo} alt="Logo" className="h-14 mr-4 rounded-xl shadow" />
        <h1 className="text-3xl font-extrabold text-[#D4AF37] drop-shadow">
          Gestión de Productos
        </h1>
      </div>

      {/* Botón crear producto */}
      <div className="max-w-6xl mx-auto flex justify-end mb-4">
        <button
          onClick={openCreateModal}
          className="px-6 py-2 bg-[#D4AF37] text-black font-bold rounded-full shadow hover:bg-[#bfa13a] transition-all"
        >
          Crear producto
        </button>
      </div>

      {/* Tabla y buscador */}
      <AdminProductsTable
        productos={paginated}
        onEdit={openEditModal}
        onDelete={eliminarProducto}
        onCreate={openCreateModal}
        searchTerm={search}
        setSearchTerm={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
      {showModal && selectedProduct && (
        <AdminEditProductsModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}   
          onChange={setSelectedProduct}
          onSave={handleSaveChanges}
          onCreate={handleCreateProduct}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default Productos;
