import React from 'react';

const SheetTable = ({ rows, stickyFirstColumn = false }) => {
  if (!rows || rows.length === 0) {
    return (
      <div className="w-full bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 text-center border border-gray-700/50 shadow-2xl">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-2xl">📊</span>
        </div>
        <p className="text-xl font-semibold" style={{ color: '#ffffff' }}>Không có dữ liệu</p>
        <p className="text-gray-400 mt-2">Vui lòng kiểm tra lại nguồn dữ liệu</p>
      </div>
    );
  }

  // Ensure rows is an array
  if (!Array.isArray(rows)) {
    return (
      <div className="w-full bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 text-center border border-gray-700/50 shadow-2xl">
        <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>
        <p className="text-xl font-semibold" style={{ color: '#ffffff' }}>Dữ liệu không đúng định dạng</p>
        <p className="text-gray-400 mt-2">Vui lòng kiểm tra cấu trúc dữ liệu</p>
      </div>
    );
  }

  if (rows.length < 3) {
    return (
      <div className="w-full bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 text-center border border-gray-700/50 shadow-2xl">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-2xl">📋</span>
        </div>
        <p className="text-xl font-semibold" style={{ color: '#ffffff' }}>Dữ liệu không đủ để hiển thị bảng</p>
        <p className="text-gray-400 mt-2">Cần ít nhất 3 hàng: tiêu đề, tiêu đề phụ và dữ liệu</p>
      </div>
    );
  }

  const headers = rows[0];
  const subHeaders = rows[1];
  const dataRows = rows.slice(2);

  // Ensure headers and subHeaders are arrays
  if (!Array.isArray(headers) || !Array.isArray(subHeaders)) {
    return (
      <div className="w-full bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 text-center border border-gray-700/50 shadow-2xl">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-2xl">🔧</span>
        </div>
        <p className="text-xl font-semibold" style={{ color: '#ffffff' }}>Cấu trúc tiêu đề không đúng</p>
        <p className="text-gray-400 mt-2">Vui lòng kiểm tra định dạng dữ liệu</p>
      </div>
    );
  }

  // Enhanced color system with actual CSS gradient values
  const getColumnColor = (index) => {
    const colors = [
      'linear-gradient(135deg, #475569, #334155, #1e293b)',           // First column - Professional slate
      'linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8)',          // Second column - Vibrant blue
      'linear-gradient(135deg, #10b981, #059669, #047857)',           // Third column - Fresh green
      'linear-gradient(135deg, #f97316, #ea580c, #c2410c)',          // Fourth column - Warm orange
      'linear-gradient(135deg, #a855f7, #9333ea, #7c3aed)',          // Fifth column - Rich purple
      'linear-gradient(135deg, #f43f5e, #e11d48, #be123c)',          // Sixth column - Bold rose
      'linear-gradient(135deg, #06b6d4, #0891b2, #0e7490)',          // Seventh column - Bright cyan
      'linear-gradient(135deg, #f59e0b, #d97706, #b45309)',          // Eighth column - Golden amber
    ];
    return colors[index % colors.length];
  };

  // Get lighter version for sub-headers
  const getSubHeaderColor = (index) => {
    const colors = [
      'linear-gradient(135deg, #64748b, #475569, #334155)',           // First column - Lighter slate
      'linear-gradient(135deg, #60a5fa, #3b82f6, #2563eb)',          // Second column - Lighter blue
      'linear-gradient(135deg, #34d399, #10b981, #059669)',          // Third column - Lighter green
      'linear-gradient(135deg, #fb923c, #f97316, #ea580c)',          // Fourth column - Lighter orange
      'linear-gradient(135deg, #c084fc, #a855f7, #9333ea)',          // Fifth column - Lighter purple
      'linear-gradient(135deg, #fb7185, #f43f5e, #e11d48)',          // Sixth column - Lighter rose
      'linear-gradient(135deg, #22d3ee, #06b6d4, #0891b2)',          // Seventh column - Bright cyan
      'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)',          // Eighth column - Golden amber
    ];
    return colors[index % colors.length];
  };

  // Function to convert newlines to HTML line breaks
  const formatTextWithLineBreaks = (text) => {
    if (!text) return '';
    // Convert \n to <br> for HTML rendering
    return text.toString().replace(/\n/g, '<br>');
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl border border-gray-700/30 overflow-hidden shadow-2xl">
      {/* Table Container - Full Width with Better Spacing */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-full border-collapse">
          {/* Main Headers - Enhanced with Better Gradients */}
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-10 py-6 text-center font-bold text-lg border-r border-gray-600/20 last:border-r-0 whitespace-normal shadow-lg"
                  style={{
                    color: '#ffffff',
                    background: getColumnColor(index),
                    padding: '8px 4px',
                    ...(stickyFirstColumn && index === 0 ? { position: 'sticky', left: 0, zIndex: 30 } : {})
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span 
                      className="text-white font-bold text-lg" 
                      dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(header || `Cột ${index + 1}`) }}
                    />
                    {index === 0 && (
                      <div className="w-8 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
            {/* Sub Headers - Softer, More Elegant */}
            <tr>
              {subHeaders.map((subHeader, index) => (
                <th
                  key={index}
                  className="px-10 py-4 text-center font-medium text-sm border-r border-gray-600/20 last:border-r-0 whitespace-normal"
                  style={{
                    color: '#ffffff',
                    background: getSubHeaderColor(index),
                    opacity: 0.9,
                    padding: '8px 4px',
                    ...(stickyFirstColumn && index === 0 ? { position: 'sticky', left: 0, zIndex: 30 } : {})
                  }}
                >
                  <span 
                    dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(subHeader || `Mô tả ${index + 1}`) }}
                  />
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Table Body - Enhanced with Better Visual Effects */}
          <tbody>
            {dataRows.map((row, rowIndex) => {
              // Ensure row is an array
              if (!Array.isArray(row)) {
                return null;
              }
              
              return (
                <tr 
                  key={rowIndex}
                  className={`
                    ${rowIndex % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-900/50'} 
                    hover:bg-gradient-to-r hover:from-gray-700/80 hover:to-gray-600/80 
                    transition-all duration-500 ease-out border-b border-gray-600/20
                    ${rowIndex === dataRows.length - 1 ? 'border-b-0' : ''}
                    group
                  `}
                >
                  {row.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex} 
                      className={`
                        text-center text-base border-r border-gray-600/20 last:border-r-0
                        ${cellIndex === 0 ? 'font-bold text-left' : 'text-center'}
                        transition-all duration-300
                      `}
                      style={{
                        color: cellIndex === 0 ? '#ffffff' :
                               cell === 'Liên Hệ' ? '#60a5fa' :
                               cell === '✓' || cell === 'Yes' || cell === 'Có' ? '#10b981' :
                               cell === '✗' || cell === 'No' || cell === 'Không' ? '#ef4444' :
                               '#e5e7eb',
                        backgroundColor: cellIndex === 0 ? 'rgba(31, 41, 55, 0.95)' : 'transparent',
                        padding: '8px 4px',
                        ...(stickyFirstColumn && cellIndex === 0 ? { position: 'sticky', left: 0, zIndex: 10 } : {})
                      }}
                    >
                      <div className={`
                        ${cellIndex === 0 ? 'text-left' : 'text-center'}
                        ${cell === 'Liên Hệ' ? 'bg-blue-500/20 px-8 py-4 rounded-full text-blue-300 font-medium' : ''}
                        ${cell === '✓' || cell === 'Yes' || cell === 'Có' ? 'bg-green-500/20 px-8 py-4 rounded-full text-green-300 font-medium' : ''}
                        ${cell === '✗' || cell === 'No' || cell === 'Không' ? 'bg-red-500/20 px-8 py-4 rounded-full text-red-300 font-medium' : ''}
                        ${!cell || cell === '-' ? 'px-4 py-4' : 'px-8 py-5'}
                      `}
                      style={{
                        padding: cell === 'Liên Hệ' || cell === '✓' || cell === 'Yes' || cell === 'Có' || cell === '✗' || cell === 'No' || cell === 'Không' || !cell || cell === '-' ? 'px 32px' : '12px 40px'
                      }}>
                        {cell || 'Liên hệ'}
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SheetTable;
