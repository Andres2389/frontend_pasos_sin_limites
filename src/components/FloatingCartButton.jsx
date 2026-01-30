// src/components/FloatingCartButton.jsx
import { FaShoppingCart } from "react-icons/fa";

export default function FloatingCartButton({ totalItems = 0, onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-6 z-50 bg-[#18181b]/90 backdrop-blur-md border-2 border-[#D4AF37] hover:bg-[#23232b] transition-all duration-300 p-4 rounded-full shadow-2xl flex items-center justify-center group"
      title="Ver carrito"
      style={{ minWidth: 56, minHeight: 56 }}
    >
      <FaShoppingCart size={24} className="text-[#D4AF37] group-hover:text-[#E6C86E] transition" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#18181b] shadow-md">
          {totalItems}
        </span>
      )}
    </button>
  );
}
