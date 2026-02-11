import React from "react";

const Paginacion = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center mt-6 gap-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-4 py-2 rounded-full font-bold border-2 border-[#D4AF37] text-[#D4AF37] bg-[#18181b] shadow hover:bg-[#D4AF37] hover:text-black transition-all duration-300 ${currentPage === i + 1 ? 'bg-[#D4AF37] text-black' : ''}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Paginacion;
