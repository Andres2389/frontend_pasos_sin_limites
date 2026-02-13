import React, { useState } from "react";

const TALLAS_DISPONIBLES = [35, 36, 37, 38, 39, 40, 41, 42, 43];

const AdminEditProductsModal = ({
  product,
  onClose,
  onChange,
  onSave,
  onCreate,
  isEditing,
}) => {
  const [previewImage, setPreviewImage] = useState(
    product.imagen && typeof product.imagen === "string"
      ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${product.imagen}`
      : null
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      onChange({ ...product, imagen: file });
    }
  };

  // ✅ MANEJO DE TALLAS COMO STRING
  const handleTallaChange = (talla) => {
    const tallasActuales = product.tallas
      ? product.tallas.split(",")
      : [];

    let nuevasTallas;

    if (tallasActuales.includes(String(talla))) {
      nuevasTallas = tallasActuales.filter(
        (t) => t !== String(talla)
      );
    } else {
      nuevasTallas = [...tallasActuales, String(talla)];
    }

    onChange({
      ...product,
      tallas: nuevasTallas.join(","),
    });
  };

  // 🔥 ESTA FUNCIÓN FALTABA
  const handleSubmit = () => {
    if (isEditing) {
      onSave();
    } else {
      onCreate();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transition-all max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className={`text-2xl font-bold mb-6 text-center ${
            isEditing ? "text-[#0056A6]" : "text-blue-700"
          }`}
        >
          {isEditing ? "Editar Producto" : "Nuevo Producto"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            value={product.nombre ?? ""}
            onChange={(e) => onChange({ ...product, nombre: e.target.value })}
            placeholder="Nombre del producto"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />

          <input
            type="number"
            value={product.cantidad ?? ""}
            onChange={(e) => onChange({ ...product, cantidad: e.target.value })}
            placeholder="Cantidad"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />

          <input
            type="number"
            value={product.valor ?? ""}
            onChange={(e) => onChange({ ...product, valor: e.target.value })}
            placeholder="Valor"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />

          <input
            type="text"
            value={product.descripcion ?? ""}
            onChange={(e) =>
              onChange({ ...product, descripcion: e.target.value })
            }
            placeholder="Descripción"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />

          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Tallas Disponibles
            </label>

            <div className="flex flex-wrap gap-3">
              {TALLAS_DISPONIBLES.map((talla) => (
                <label
                  key={talla}
                  className="flex items-center gap-2 text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={
                      product.tallas
                        ? product.tallas.split(",").includes(String(talla))
                        : false
                    }
                    onChange={() => handleTallaChange(talla)}
                    className="accent-blue-600"
                  />
                  {talla}
                </label>
              ))}
            </div>
          </div>

          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />

          {previewImage && (
            <img
              src={previewImage}
              alt="Vista previa"
              className="mt-2 w-full h-40 object-cover rounded border"
            />
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className={`px-4 py-2 text-white rounded ${
              isEditing
                ? "bg-[#0056A6] hover:bg-[#004c94]"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isEditing ? "Guardar Cambios" : "Crear Producto"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProductsModal;
