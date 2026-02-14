import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { items, totalPrice, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  // Validar login
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.info("Debes iniciar sesión para continuar.");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleFinish = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user._id) {
      toast.info("Debes iniciar sesión.");
      navigate("/login", { replace: true });
      return;
    }

    try {
      const payload = {
        userId: user._id,
        items: items.map(({ _id, cantidad, talla }) => ({
          productId: _id,
          cantidad,
          talla: typeof talla !== "undefined" && talla !== null ? talla : "",
        })),
        total: totalPrice,
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
        payload
      );

      if (data.order?._id) {
        localStorage.setItem("lastOrderId", data.order._id);
      }

      toast.success("Pedido creado. Ahora puedes pagar.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al crear pedido");
    }
  };

  // 👉 MERCADO PAGO PRODUCCIÓN
  const handleMercadoPago = async () => {
    try {
      const orderId = localStorage.getItem("lastOrderId");
      if (!orderId) {
        toast.error("No hay orden para pagar");
        return;
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/create-preference`,
        { orderId }
      );

      if (data.init_point) {
        window.location.href = data.init_point; // 🔥 PRODUCCIÓN
      } else {
        toast.error("No se pudo iniciar el pago");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al conectar con Mercado Pago");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No tienes productos en el carrito.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Confirmar Compra</h1>

        {items.map((i) => (
          <div key={i._id} className="flex justify-between border-b py-2">
            <div className="flex gap-4">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${i.imagen}`}
                alt={i.nombre}
                className="h-12 w-12 rounded"
              />
              <div>
                <p className="font-medium">{i.nombre}</p>
                <p>{i.cantidad} × ${i.valor}</p>
              </div>
            </div>
            <button
              onClick={() => removeItem(i._id)}
              className="text-red-500"
            >
              <FaTimes />
            </button>
          </div>
        ))}

        <div className="mt-4 flex justify-between font-bold">
          <span>Total:</span>
          <span>${totalPrice}</span>
        </div>

        <button
          onClick={handleFinish}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded"
        >
          Finalizar Pedido
        </button>

        <button
          onClick={handleMercadoPago}
          className="mt-4 w-full bg-green-600 text-white py-3 rounded"
        >
          Pagar con Mercado Pago
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full bg-gray-300 py-3 rounded"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default Checkout;
