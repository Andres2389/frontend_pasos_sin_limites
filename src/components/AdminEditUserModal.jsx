// src/components/AdminEditUserModal.js
import React from "react";

const AdminEditUserModal = ({ selectedUser, onClose, onChange, onSave }) => {
  if (!selectedUser) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md animate-fade-in transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#0056A6]-700">
          Editar Usuario
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            value={selectedUser.nombre ?? ""}
            onChange={(e) =>
              onChange({ ...selectedUser, nombre: e.target.value })
            }
            placeholder="Nombre"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-[#0056A6]-200 focus:border-[#0056A6]-600 outline-none"
          />
          <input
            type="email"
            value={selectedUser.correo ?? ""}
            onChange={(e) =>
              onChange({ ...selectedUser, correo: e.target.value })
            }
            placeholder="Correo"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-[#0056A6]-200 focus:border-[#0056A6]-600 outline-none"
          />
          <select
            value={selectedUser.rol ?? "user"}
            onChange={(e) =>
              onChange({ ...selectedUser, rol: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-[#0056A6]-200 focus:border-[#0056A6]-600 outline-none"
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
            <option value="user">user</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-[#0056A6]-600 text-white rounded hover:bg-[#0056A6]-700 transition"
          >
            Guardar
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditUserModal;
