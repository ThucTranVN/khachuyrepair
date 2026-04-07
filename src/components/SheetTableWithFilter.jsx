import React, { useState } from 'react';

const SheetTableWithFilter = ({ rows }) => {
  const [selectedColIndex, setSelectedColIndex] = useState(1);

  if (!rows || rows.length < 3) return null;

  const headers = rows[0];
  const subHeaders = rows[1];
  const dataRows = rows.slice(2);

  // Service columns = everything except the first (device) column
  const serviceColumns = headers
    .slice(1)
    .map((label, i) => ({ label: label || `Dịch vụ ${i + 1}`, index: i + 1 }));

  const formatText = (text) => {
    if (!text) return '';
    return text.toString().replace(/\r\n|\r|\n/g, '<br>');
  };

  const colColors = [
    'linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8)',
    'linear-gradient(135deg, #10b981, #059669, #047857)',
    'linear-gradient(135deg, #f97316, #ea580c, #c2410c)',
    'linear-gradient(135deg, #a855f7, #9333ea, #7c3aed)',
    'linear-gradient(135deg, #f43f5e, #e11d48, #be123c)',
    'linear-gradient(135deg, #06b6d4, #0891b2, #0e7490)',
    'linear-gradient(135deg, #f59e0b, #d97706, #b45309)',
  ];

  const selectedColor = colColors[(selectedColIndex - 1) % colColors.length];
  const deviceHeaderColor = 'linear-gradient(135deg, #475569, #334155, #1e293b)';
  const deviceSubColor = 'linear-gradient(135deg, #64748b, #475569, #334155)';
  const selectedSubColor = colColors[(selectedColIndex - 1) % colColors.length];

  return (
    <div>
      <style>{`
        .filter-btn-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 28px;
          padding: 0 20px;
        }
        .filter-btn-grid .filter-btn {
          width: 100%;
        }
        @media (min-width: 768px) {
          .filter-btn-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            padding: 0;
          }
          .filter-btn-grid .filter-btn {
            width: auto;
          }
        }
      `}</style>

      {/* Service filter — buttons if ≤8, dropdown if >8 */}
      {serviceColumns.length <= 8 ? (
        <div className="filter-btn-grid">
          {serviceColumns.map((col) => {
            const isActive = selectedColIndex === col.index;
            const btnColor = colColors[(col.index - 1) % colColors.length];
            return (
              <button
                key={col.index}
                onClick={() => setSelectedColIndex(col.index)}
                dangerouslySetInnerHTML={{ __html: formatText(col.label) }}
                className="filter-btn"
                style={{
                  padding: '11px 20px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  border: '2px solid',
                  transition: 'all 0.2s ease',
                  ...(isActive
                    ? {
                        background: btnColor,
                        color: '#ffffff',
                        borderColor: 'transparent',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                      }
                    : {
                        background: 'rgba(31,41,55,0.6)',
                        color: '#d1d5db',
                        borderColor: '#374151',
                      }),
                }}
              />
            );
          })}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '20px', width: '100%', padding: '0 12px', boxSizing: 'border-box' }}>
          <span style={{ color: '#d1d5db', fontSize: '14px', fontWeight: '600' }}>Chọn dịch vụ</span>
          <select
            value={selectedColIndex}
            onChange={(e) => setSelectedColIndex(Number(e.target.value))}
            style={{
              background: '#1f2937',
              color: '#ffffff',
              border: '2px solid #374151',
              borderRadius: '10px',
              padding: '10px 16px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              outline: 'none',
              width: '100%',
              maxWidth: '400px',
              boxSizing: 'border-box',
            }}
          >
            {serviceColumns.map((col) => (
              <option key={col.index} value={col.index}>
                {col.label.replace(/<br>/g, ' ')}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Two-column table */}
      <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl border border-gray-700/30 overflow-hidden shadow-2xl">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th
                  style={{
                    background: deviceHeaderColor,
                    color: '#ffffff',
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '700',
                    fontSize: '16px',
                    width: '45%',
                    position: 'sticky',
                    left: 0,
                    zIndex: 20,
                  }}
                  dangerouslySetInnerHTML={{ __html: formatText(headers[0] || 'Thiết bị') }}
                />
                <th
                  style={{
                    background: selectedColor,
                    color: '#ffffff',
                    padding: '12px 16px',
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: '16px',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: formatText(headers[selectedColIndex] || 'Giá'),
                  }}
                />
              </tr>
              <tr>
                <th
                  style={{
                    background: deviceSubColor,
                    color: '#ffffff',
                    padding: '8px 16px',
                    textAlign: 'left',
                    fontWeight: '500',
                    fontSize: '13px',
                    opacity: 0.9,
                    position: 'sticky',
                    left: 0,
                    zIndex: 20,
                  }}
                  dangerouslySetInnerHTML={{ __html: formatText(subHeaders[0] || '') }}
                />
                <th
                  style={{
                    background: selectedSubColor,
                    color: '#ffffff',
                    padding: '8px 16px',
                    textAlign: 'center',
                    fontWeight: '500',
                    fontSize: '13px',
                    opacity: 0.85,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: formatText(subHeaders[selectedColIndex] || ''),
                  }}
                />
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, rowIndex) => {
                if (!Array.isArray(row)) return null;
                const cell = row[selectedColIndex];
                const isContact = cell === 'Liên Hệ';
                const isYes = cell === '✓' || cell === 'Yes' || cell === 'Có';
                const isNo = cell === '✗' || cell === 'No' || cell === 'Không';

                return (
                  <tr
                    key={rowIndex}
                    style={{
                      background:
                        rowIndex % 2 === 0
                          ? 'rgba(31,41,55,0.5)'
                          : 'rgba(17,24,39,0.5)',
                      borderBottom: '1px solid rgba(75,85,99,0.2)',
                    }}
                  >
                    {/* Device column — sticky */}
                    <td
                      style={{
                        color: '#ffffff',
                        fontWeight: '600',
                        padding: '10px 16px',
                        backgroundColor: 'rgba(31,41,55,0.95)',
                        position: 'sticky',
                        left: 0,
                        zIndex: 10,
                        borderRight: '1px solid rgba(75,85,99,0.2)',
                      }}
                      dangerouslySetInnerHTML={{ __html: formatText(row[0] || '') }}
                    />
                    {/* Selected service column */}
                    <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 14px',
                          borderRadius: '999px',
                          fontSize: '14px',
                          fontWeight: '500',
                          ...(isContact
                            ? { background: 'rgba(59,130,246,0.2)', color: '#93c5fd' }
                            : isYes
                            ? { background: 'rgba(16,185,129,0.2)', color: '#6ee7b7' }
                            : isNo
                            ? { background: 'rgba(239,68,68,0.2)', color: '#fca5a5' }
                            : { color: '#e5e7eb' }),
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formatText(cell || 'Liên hệ'),
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SheetTableWithFilter;
