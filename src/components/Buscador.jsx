import React from "react";
import { FaSearch } from "react-icons/fa";

const Buscador = ({ value, onChange, placeholder }) => (
  <div className="flex justify-end mb-4">
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        className="pl-10 pr-4 py-2 rounded-full border border-[#D4AF37]/40 bg-[#18181b] text-[#D4AF37] placeholder-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] w-full"
        placeholder={placeholder || "Buscar..."}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
    </div>
  </div>
);

export default Buscador;
