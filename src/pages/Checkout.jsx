// src/pages/Checkout.jsx
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Integración Mercado Pago
// ...existing code...

const Checkout = () => {
  const { items, totalPrice, removeItem, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  // ...existing code...

  // 1) Validar que el usuario esté logueado
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.info("Debes iniciar sesión para continuar al checkout.");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleFinish = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user._id) {
      toast.info("Debes iniciar sesión para completar la compra.");
      navigate("/login", { replace: true });
      return;
    }

    try {
      const payload = {
        userId: user._id,               // <-- agregamos userId
        items: items.map(({ _id, cantidad }) => ({
          productId: _id,
          cantidad,
        })),
        total: totalPrice,
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
        payload
      );

      // Guardar orderId para Mercado Pago
      if (data.order && data.order._id) {
        localStorage.setItem("lastOrderId", data.order._id);
      }

      toast.success(`Pedido ${data.order.codigoRecogida} creado! Ahora puedes pagar con Mercado Pago.`);
      // Ya no limpiamos el carrito ni navegamos aquí. El usuario puede pagar ahora.
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al procesar pedido");
    }
  };

  // Integración Mercado Pago
  const handleMercadoPago = async () => {
    try {
      const orderId = localStorage.getItem("lastOrderId");
      if (!orderId) {
        toast.error("No se encontró la orden para pagar");
        return;
      }
      const response = await axios.post(
        "http://localhost:5000/api/payments/create-preference",
        { orderId }
      );
      const { sandbox_init_point, init_point } = response.data;
      const redirectUrl = sandbox_init_point || init_point;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        toast.error("No se pudo iniciar el pago");
      }
    } catch (err) {
      toast.error("Error al conectar con Mercado Pago");
    }
  };

  // Si no hay items, mostramos mensaje
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No tienes productos en el carrito.</p>
      </div>
    );
  }

  // ...existing code...

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Confirmar Compra</h1>
        {items.map((i) => (
          <div
            key={i._id}
            className="flex items-center justify-between border-b py-2"
          >
            <div className="flex items-center gap-4">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${i.imagen}`}
                alt={i.nombre}
                className="h-12 w-12 object-cover rounded"
              />
              <div>
                <p className="font-medium">{i.nombre}</p>
                <p>
                  {i.cantidad} × ${i.valor.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeItem(i._id)}
              className="text-red-500 hover:text-red-700"
              title="Eliminar"
            >
              <FaTimes />
            </button>
          </div>
        ))}

        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-semibold">Total:</p>
          <p className="text-lg font-bold">${totalPrice.toFixed(2)}</p>
        </div>

        {/* Botón checkout normal */}
        <button
          onClick={handleFinish}
          className="mt-4 w-full bg-[#0056A6] text-white py-3 rounded-lg hover:bg-[#004488] transition"
        >
          Finalizar Compra
        </button>

        {/* Botón Mercado Pago */}
        <button
          onClick={handleMercadoPago}
          className="mt-4 w-full bg-[#00A650] text-white py-3 rounded-lg hover:bg-[#008f39] transition"
        >
          Pagar con Mercado Pago
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition"
        >
          Volver al Home
        </button>

      </div>
    </div>
  );
};

export default Checkout;
