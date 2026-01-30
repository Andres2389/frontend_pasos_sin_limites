// Card oscura reutilizable con animación y sombra
export default function CardDark({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-[#1A1A1A] rounded-2xl shadow-md hover:scale-105 hover:shadow-2xl transition-all duration-300 p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
