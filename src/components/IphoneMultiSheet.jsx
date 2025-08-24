import React, { useState, useEffect } from 'react';
import IphoneSheet from './IphoneSheet';

const IphoneMultiSheet = ({ sheetId, apiKey, range }) => {
  const [sheetsData, setSheetsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState({ current: 0, total: 0 });

  useEffect(() => {
    if (sheetId && apiKey) {
      loadAllSheets();
    }
  }, [sheetId, apiKey]);

  const loadAllSheets = async () => {
    setLoading(true);
    setError(null);
    setLoadingProgress({ current: 0, total: 0 });

    try {
      // First, get the list of all sheets in the spreadsheet
      const sheetsListUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${apiKey}`;
      const sheetsListResponse = await fetch(sheetsListUrl);
      
      if (!sheetsListResponse.ok) {
        throw new Error('Failed to fetch sheets list');
      }

      const sheetsListData = await sheetsListResponse.json();
      const sheets = sheetsListData.sheets || [];
      const sheetTitles = sheets.map(sheet => sheet.properties.title);

      setSheetNames(sheetTitles);

      // Load data from each sheet in parallel for better performance
      const allSheetsData = {};
      
      // Create an array of promises for parallel execution
      const sheetPromises = sheetTitles.map(async (sheetTitle, index) => {
        try {
          const sheetDataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetTitle}?key=${apiKey}`;
          const sheetResponse = await fetch(sheetDataUrl);
          
          if (sheetResponse.ok) {
            const sheetData = await sheetResponse.json();
            if (sheetData.values && sheetData.values.length > 0) {
              // Update progress
              setLoadingProgress(prev => ({ 
                current: prev.current + 1, 
                total: sheetTitles.length 
              }));
              return { sheetTitle, data: sheetData.values };
            }
          }
          // Update progress even for failed sheets
          setLoadingProgress(prev => ({ 
            current: prev.current + 1, 
            total: sheetTitles.length 
          }));
          return { sheetTitle, data: null };
        } catch (sheetError) {
          // Continue loading other sheets even if one fails
          setLoadingProgress(prev => ({ 
            current: prev.current + 1, 
            total: sheetTitles.length 
          }));
          return { sheetTitle, data: null };
        }
      });
      
      // Execute all promises in parallel
      const sheetResults = await Promise.all(sheetPromises);
      
      // Process results
      sheetResults.forEach(({ sheetTitle, data }) => {
        if (data) {
          allSheetsData[sheetTitle] = data;
        }
      });
      
      // Progressive loading: Show first sheet immediately
      if (sheetTitles.length > 0) {
        const firstSheetTitle = sheetTitles[0];
        if (allSheetsData[firstSheetTitle]) {
          setSelectedCategory(firstSheetTitle);
          // Update state immediately for first sheet
          setSheetsData({ [firstSheetTitle]: allSheetsData[firstSheetTitle] });
          
          // Then update with all sheets in background
          setTimeout(() => {
            setSheetsData(allSheetsData);
          }, 100);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center p-16 space-y-6">
        <div className="relative">
          {/* Main rotating ring */}
          <div 
            className="w-16 h-16 border-4 border-orange-200/30 rounded-full"
            style={{
              borderTop: '4px solid #f97316',
              animation: 'spin 1s linear infinite'
            }}
          ></div>
          
          {/* Inner rotating ring */}
          <div 
            className="absolute top-2 left-2 w-12 h-12 border-4 border-blue-200/30 rounded-full"
            style={{
              borderTop: '4px solid #3b82f6',
              animation: 'spin 1.5s linear infinite reverse'
            }}
          ></div>
          
          {/* Center dot */}
          <div 
            className="absolute top-6 left-6 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
            style={{
              animation: 'pulse 1s ease-in-out infinite alternate'
            }}
          ></div>
          
          {/* Outer pulsing ring */}
          <div 
            className="absolute -top-2 -left-2 w-20 h-20 border-2 border-orange-400/20 rounded-full"
            style={{
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
            }}
          ></div>
        </div>
        
        {/* Progress Indicator */}
        {loadingProgress.total > 0 && (
          <div className="text-center">
            <div className="text-white text-lg font-medium mb-2">
              Đang tải dữ liệu...
            </div>
            <div className="text-orange-400 text-sm">
              {loadingProgress.current} / {loadingProgress.total} sheets
            </div>
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-900/50 rounded-2xl p-8 text-center border border-red-600 mb-8">
        <p className="text-lg font-medium mb-2" style={{ color: '#fecaca' }}>Lỗi khi tải dữ liệu:</p>
        <p className="text-base" style={{ color: '#fca5a5' }}>{error}</p>
      </div>
    );
  }

  if (Object.keys(sheetsData).length === 0) {
    return (
      <div className="w-full bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 text-center border border-gray-700/50 shadow-2xl mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-2xl">📊</span>
        </div>
        <p className="text-xl font-semibold" style={{ color: '#ffffff' }}>Không có dữ liệu</p>
        <p className="text-gray-400 mt-2">Vui lòng kiểm tra lại nguồn dữ liệu</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Selection Buttons - Horizontal Layout */}
      <div className="w-full" style={{ marginBottom: '32px' }}>
        <div className="flex flex-wrap justify-center" style={{ gap: '32px' }}>
          {sheetNames.map((sheetName) => {
            const isSelected = selectedCategory === sheetName;
            return (
              <button
                key={sheetName}
                onClick={() => handleCategorySelect(sheetName)}
                style={{
                  padding: '16px 32px',
                  borderRadius: '16px',
                  fontWeight: '600',
                  fontSize: '18px',
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)',
                  cursor: 'pointer',
                  border: '2px solid',
                  ...(isSelected ? {
                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                    color: '#ffffff',
                    borderColor: '#f97316',
                    boxShadow: '0 10px 25px rgba(249, 115, 22, 0.25)'
                  } : {
                    background: '#000000',
                    color: '#ffffff',
                    borderColor: '#374151',
                    boxShadow: 'none'
                  })
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.target.style.background = '#111827';
                    e.target.style.borderColor = '#f97316';
                    e.target.style.boxShadow = '0 10px 25px rgba(249, 115, 22, 0.2)';
                    e.target.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.target.style.background = '#000000';
                    e.target.style.borderColor = '#374151';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              >
                {sheetName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Category Data Table */}
      {selectedCategory && sheetsData[selectedCategory] && (
        <div className="w-full">
          <IphoneSheet 
            rows={sheetsData[selectedCategory]} 
            sheetName={selectedCategory}
          />
        </div>
      )}

      {/* No Category Selected Message */}
      {!selectedCategory && (
        <div className="w-full bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 text-center border border-gray-700/50 shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-2xl">📱</span>
          </div>
          <p className="text-xl font-semibold" style={{ color: '#ffffff' }}>Chọn Danh Mục Dịch Vụ</p>
          <p className="text-gray-400 mt-2">Vui lòng chọn một danh mục từ các nút bên trên để xem bảng giá</p>
        </div>
      )}
    </div>
  );
};

export default IphoneMultiSheet;
