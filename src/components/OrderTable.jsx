// src/components/OrderTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const OrderTable = ({ orders, onView }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_BASE_URL;

  if (!orders.length) {
    return (
      <p className="text-center text-[#D4AF37]/80 mt-10">
        No tienes pedidos por el momento.
      </p>
    );
  }

  const handleCancelar = async (orderId) => {
    try {
      await axios.put(
        `${API}/api/orders/${orderId}/cancel`,
        {
          userId: user._id,
          rol: user.rol,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Pedido cancelado correctamente");
      if (typeof onCancelSuccess === "function") onCancelSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Error al cancelar el pedido");
    }
  };

  return (
    <div className="bg-[#181818] p-2 sm:p-4 md:p-6 rounded-xl shadow-md w-full max-w-full md:max-w-4xl lg:max-w-6xl mx-auto mt-6 overflow-x-auto border-2 border-[#D4AF37]/60">
      <table className="min-w-[600px] w-full text-xs sm:text-sm text-left border-separate border-spacing-y-2 break-words">
        <thead>
          <tr className="bg-[#23232b] text-[#D4AF37]">
            <th className="px-4 py-3">Código</th>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr
              key={o._id}
              className="bg-[#181818] hover:bg-[#23232b] transition border-b border-[#23232b]"
            >
              <td className="px-4 py-3 font-medium text-[#D4AF37]">
                {o.codigoRecogida}
              </td>

              <td className="px-4 py-3 text-white">
                {new Date(o.createdAt).toLocaleDateString()}
              </td>

              <td className="px-4 py-3 text-white">
                {o.total.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                })}
              </td>

              <td className="px-4 py-3 capitalize text-white">
                {o.estado}
              </td>

              <td className="px-4 py-3 text-center">

                {/* VER */}
                <button
                  onClick={() => onView(o)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition mr-2 shadow"
                >
                  Ver
                </button>

                {/* PAGAR */}
                {user.rol === "user" &&
                  (o.estado === "PENDING" || o.estado === "PENDIENTE") &&
                  !o.entregado && (
                    <button
                      onClick={() => {
                        localStorage.setItem("lastOrderId", o._id);

                        const cartItems = o.items.map((i) => ({
                          _id: i.product,
                          nombre: i.nombre,
                          valor: i.valorUnitario,
                          cantidad: i.cantidad,
                          imagen: i.imagen || "",
                          talla: i.talla || "",
                        }));

                        localStorage.setItem(
                          "costehuilense_cart",
                          JSON.stringify(cartItems)
                        );

                        navigate("/checkout");
                      }}
                      className="px-3 py-1 bg-[#D4AF37] text-[#181818] font-bold rounded hover:bg-[#bfa133] transition mr-2 shadow"
                    >
                      Pagar
                    </button>
                  )}

                {/* CANCELAR */}
                {user.rol === "user" &&
                  o.estado !== "CANCELLED" &&
                  o.estado !== "ENTREGADO" && (
                    <button
                      onClick={() => handleCancelar(o._id)}
                      className="px-3 py-1 bg-[#B91C1C] text-white font-bold rounded hover:bg-[#7f1d1d] transition shadow"
                    >
                      Cancelar
                    </button>
                  )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
