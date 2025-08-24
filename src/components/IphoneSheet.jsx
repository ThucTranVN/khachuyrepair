import React from 'react';

const IphoneSheet = ({ rows, sheetName }) => {
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

  if (rows.length < 2) {
    return (
      <div className="w-full bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 text-center border border-gray-700/50 shadow-2xl">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-2xl">📋</span>
        </div>
        <p className="text-xl font-semibold" style={{ color: '#ffffff' }}>Dữ liệu không đủ để hiển thị bảng</p>
        <p className="text-gray-400 mt-2">Cần ít nhất 2 hàng: tiêu đề và dữ liệu</p>
      </div>
    );
  }

  const headers = rows[0];
  const dataRows = rows.slice(1);

  // Ensure headers is an array
  if (!Array.isArray(headers)) {
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

  // Enhanced color system with special colors for first row and first two columns
  const getColumnColor = (index) => {
    if (index === 0) {
      return 'linear-gradient(135deg, #f97316, #ea580c, #c2410c)'; // First column - Warm orange
    } else if (index === 1) {
      return 'linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8)'; // Second column - Vibrant blue
    } else {
      const colors = [
        'linear-gradient(135deg, #10b981, #059669, #047857)',           // Third column - Fresh green
        'linear-gradient(135deg, #a855f7, #9333ea, #7c3aed)',          // Fourth column - Rich purple
        'linear-gradient(135deg, #f43f5e, #e11d48, #be123c)',          // Fifth column - Bold rose
        'linear-gradient(135deg, #06b6d4, #0891b2, #0e7490)',          // Sixth column - Bright cyan
        'linear-gradient(135deg, #f59e0b, #d97706, #b45309)',          // Seventh column - Golden amber
        'linear-gradient(135deg, #64748b, #475569, #334155)',           // Eighth column - Professional slate
      ];
      return colors[(index - 2) % colors.length];
    }
  };

  // Function to convert newlines to HTML line breaks
  const formatTextWithLineBreaks = (text) => {
    if (!text) return '';
    
    // Convert text to string and handle different newline types
    let processedText = text.toString();
    
    // Handle different types of newline characters
    // \r\n (Windows), \r (Mac), \n (Unix/Linux)
    processedText = processedText.replace(/\r\n/g, '<br>');  // Windows
    processedText = processedText.replace(/\r/g, '<br>');     // Mac
    processedText = processedText.replace(/\n/g, '<br>');     // Unix/Linux
    
    // Handle HTML entities for safety, but preserve the <br> tags we just created
    // First, temporarily replace our <br> tags with a unique marker
    processedText = processedText.replace(/<br>/g, '___BR___');
    
    // Now escape HTML entities
    processedText = processedText.replace(/&/g, '&amp;');
    processedText = processedText.replace(/</g, '&lt;');
    processedText = processedText.replace(/>/g, '&gt;');
    
    // Finally, restore our <br> tags
    processedText = processedText.replace(/___BR___/g, '<br>');
    
    return processedText;
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl border border-gray-700/30 overflow-hidden shadow-2xl">
      {/* Sheet Name Header */}
      <div 
        className="w-full p-8 text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f97316, #ea580c, #dc2626)',
          borderBottom: '1px solid rgba(251, 146, 60, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Pattern Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(251, 146, 60, 0.2), transparent, rgba(239, 68, 68, 0.2))',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0'
          }}
        ></div>
        
        {/* Main Content */}
        <div style={{ position: 'relative', zIndex: '10' }}>
          <h3 
            className="text-3xl font-bold mb-2"
            style={{
              color: '#ffffff',
              fontSize: '30px',
              fontWeight: '700',
              marginBottom: '8px',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
            }}
          >
            {sheetName || 'Bảng Giá Dịch Vụ'}
          </h3>
        </div>
        
        {/* Shimmer Effect */}
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            transform: 'skew(-12deg)',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        ></div>
      </div>
      
      {/* Table Container - Full Width with Better Spacing */}
      <div 
        className="w-full overflow-x-auto custom-scrollbar" 
        style={{ 
          maxHeight: '70vh',
          overflowY: 'auto',
          scrollBehavior: 'smooth',
          // Custom scrollbar styling
          scrollbarWidth: 'thin',
          scrollbarColor: '#f97316 #374151'
        }}
      >
        {/* Custom scrollbar styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .custom-scrollbar::-webkit-scrollbar {
              width: 12px;
              height: 12px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
              background: linear-gradient(135deg, #1f2937, #374151);
              border-radius: 8px;
              border: 1px solid rgba(55, 65, 81, 0.5);
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(135deg, #f97316, #ea580c);
              border-radius: 8px;
              border: 2px solid #1f2937;
              box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
              transition: all 0.3s ease;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(135deg, #ea580c, #dc2626);
              box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4), 0 0 8px rgba(249, 115, 22, 0.4);
              transform: scale(1.05);
            }
            
            .custom-scrollbar::-webkit-scrollbar-corner {
              background: linear-gradient(135deg, #1f2937, #374151);
              border-radius: 8px;
            }
            
            .custom-scrollbar::-webkit-scrollbar:horizontal {
              height: 12px;
            }
          `
        }} />
        <table className="w-full min-w-full border-collapse" style={{ position: 'relative' }}>
          {/* Sticky Main Headers - Enhanced with Better Gradients */}
          <thead style={{ 
            position: 'sticky', 
            top: '0', 
            zIndex: '20',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}>
            <tr>
              {headers.map((header, index) => (
                <th 
                  key={index} 
                  className="px-10 py-6 text-center font-bold text-lg border-r border-gray-600/20 last:border-r-0 whitespace-normal shadow-lg"
                  style={{ 
                    color: '#ffffff',
                    background: getColumnColor(index),
                    padding: '8px 4px',
                    position: 'sticky',
                    top: '0',
                    zIndex: '20',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)'
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
                  style={{
                    position: 'relative',
                    zIndex: '10'
                  }}
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
                        backgroundColor: cellIndex === 0 ? 'rgba(31, 41, 55, 0.8)' : 'transparent',
                        padding: '8px 4px'
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
                        padding: cell === 'Liên Hệ' || cell === '✓' || cell === 'Yes' || cell === 'Có' || cell === '✗' || cell === 'No' || cell === 'Không' || !cell || cell === '-' ? '32px' : '12px 40px'
                      }}>
                        <span 
                          dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(cell || 'Liên hệ') }}
                        />
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

export default IphoneSheet;
