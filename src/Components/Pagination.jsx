
import React from 'react';

function Pagination({ pageHandler, page, dynamicPage }) {
  const pages = Array.from({ length: dynamicPage }, (_, i) => i + 1);

  return (
    <div className="flex gap-2 items-center">
      {pages.map((pg) => (
        <button
          key={pg}
          onClick={() => pageHandler(pg)}
          className={`px-3 py-1 rounded ${
            pg === page ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-800'
          } hover:bg-teal-400 hover:text-white transition`}
        >
          {pg}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
