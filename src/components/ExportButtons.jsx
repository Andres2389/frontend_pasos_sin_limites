import React from 'react';

const ExportButtons = ({ type, params = {} }) => {
  const handleExport = (format) => {
    const query = new URLSearchParams({ ...params, t: Date.now() }).toString();
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    const endpoint = `${baseUrl}/api/reports/${type}/${format}?${query}`;
    window.open(endpoint, '_blank');
  };
  return (
    <div className="flex gap-2 my-2">
      <button
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
        onClick={() => handleExport('excel')}
      >
        Exportar Excel
      </button>
      <button
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        onClick={() => handleExport('pdf')}
      >
        Exportar PDF
      </button>
    </div>
  );
};

export default ExportButtons;
