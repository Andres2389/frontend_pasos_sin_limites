// Botón dorado reutilizable con estilos premium
export default function ButtonGold({ children, className = '', ...props }) {
  return (
    <button
      className={`px-4 py-2 border-2 border-[#D4AF37] rounded-full text-sm text-[#D4AF37] bg-[#0B0B0B] hover:bg-[#D4AF37] hover:text-black transition font-bold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
