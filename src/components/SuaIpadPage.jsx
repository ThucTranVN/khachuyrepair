import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import FooterComponent from './FooterComponent';
import SheetData from './SheetData';
import SheetTable from './SheetTable';
import { Tablet } from 'lucide-react';

const SuaIpadPage = () => {
  const navigate = useNavigate();
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Environment variables for Google Sheets
  const sheetId = import.meta.env.VITE_IPAD_ID;
  const range = import.meta.env.VITE_IPAD_RANGE;
  const apiKey = import.meta.env.VITE_BLOG_API_KEY;

  const handleDataLoaded = (data) => {
    setSheetData(data);
  };

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleErrorChange = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen bg-black" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      {/* Header */}
      <Header />
      
      {/* Google Sheets Data Loader */}
      <SheetData 
        sheetId={sheetId}
        apiKey={apiKey}
        range={range}
        mode="table"
        onDataLoaded={handleDataLoaded}
        onLoadingChange={handleLoadingChange}
        onErrorChange={handleErrorChange}
      />
      
      {/* Main Content */}
      <div className="pt-16 pb-24" style={{ marginTop: '120px' }}>
        {/* Page Header - Centered with container */}
        <div className="container mx-auto px-4 mb-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full mb-6 shadow-xl">
              <Tablet className="w-10 h-10 text-white" />
          </div>
            <h1 className="text-5xl font-bold mb-6" style={{ color: '#ffffff' }}>
            Sửa Chữa iPad
          </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#cccccc', marginBottom: '24px' }}>
            Dịch vụ sửa chữa iPad chuyên nghiệp với đội ngũ kỹ thuật viên giàu kinh nghiệm. 
            Chúng tôi cam kết mang đến giải pháp tối ưu cho mọi vấn đề của thiết bị iPad của bạn.
          </p>
          </div>
        </div>

        {/* Dynamic Data Table Section - Full Width */}
        {loading && (
          <div className="container mx-auto px-4 mb-16">
            <div className="bg-gray-900 rounded-2xl p-8 text-center border border-gray-600">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-lg font-medium" style={{ color: '#ffffff' }}>Đang tải dữ liệu...</p>
              </div>
            </div>
        )}

        {error && (
          <div className="container mx-auto px-4 mb-16">
            <div className="bg-red-900/50 rounded-2xl p-8 text-center border border-red-600">
              <p className="text-lg font-medium mb-2" style={{ color: '#fecaca' }}>Lỗi khi tải dữ liệu:</p>
              <p className="text-base" style={{ color: '#fca5a5' }}>{error}</p>
          </div>
        </div>
        )}

        {!loading && !error && sheetData.length > 0 && (
          <div className="mb-16" style={{
            // HEIGHT FIX: Adjust outer container height on mobile to match scaled table
            height: window.innerWidth >= 1024 ? 'auto' : 'auto',
            minHeight: window.innerWidth >= 1024 ? 'auto' : 'auto'
          }}>
            <div className="container mx-auto px-4 mb-8">
              <h2 className="text-3xl font-bold text-center" style={{ color: '#ffffff', marginBottom: '24px' }}>
                Bảng Giá Dịch Vụ iPad
              </h2>
            </div>
            {/* Single Responsive Table with proper padding and mobile scaling */}
            <div 
              className="w-full px-3 lg:px-32" 
              style={{
                paddingLeft: window.innerWidth >= 1024 ? '128px' : '12px',
                paddingRight: window.innerWidth >= 1024 ? '128px' : '12px'
              }}
              ref={(el) => {
                if (el) {
                  // Force re-render on resize for debugging
                  const handleResize = () => {
                    const newComputedStyle = window.getComputedStyle(el);
                    const newScreenWidth = window.innerWidth;
                    const newPadding = newScreenWidth >= 1024 ? '128px' : '12px';
                    
                    // Update inline styles on resize
                    el.style.paddingLeft = newPadding;
                    el.style.paddingRight = newPadding;
                  };
                  
                  window.addEventListener('resize', handleResize);
                  
                  // Cleanup
                  return () => window.removeEventListener('resize', handleResize);
                }
              }}
            >
              {/* Responsive Table Container */}
              <div 
                style={{
                  transform: window.innerWidth >= 1024 ? 'none' : `scale(${Math.min(1, (window.innerWidth - 24) / 1200)})`,
                  transformOrigin: window.innerWidth >= 1024 ? 'initial' : 'top left',
                  width: '100%',
                  maxWidth: '100%',
                  overflow: 'visible',
                  // HEIGHT FIX: Adjust container height on mobile to match scaled table
                  height: window.innerWidth >= 1024 ? 'auto' : 'auto',
                  minHeight: window.innerWidth >= 1024 ? 'auto' : 'auto'
                }}
                ref={(tableEl) => {
                  if (tableEl) {
                    const computedStyle = window.getComputedStyle(tableEl);
                    const screenWidth = window.innerWidth;
                    const isLargeScreen = screenWidth >= 1024;
                    
                    // Calculate optimal scale for mobile
                    const calculateOptimalScale = () => {
                      if (screenWidth >= 1024) return 1; // No scaling on desktop
                      
                      // Estimate table width (adjust this value based on your actual table width)
                      const estimatedTableWidth = 1200; // Approximate table width in pixels
                      const mobilePadding = 24; // 12px left + 12px right
                      const availableWidth = screenWidth - mobilePadding;
                      
                      // Calculate scale to fit table in available width
                      const optimalScale = Math.min(1, availableWidth / estimatedTableWidth);
                      
                      return optimalScale;
                    };
                    
                    const optimalScale = calculateOptimalScale();
                    
                    // Apply the calculated scale
                    if (!isLargeScreen) {
                      tableEl.style.transform = `scale(${optimalScale})`;
                      // CRITICAL FIX: Compensate for scale factor to maintain full width
                      const scaleCompensation = 1 / optimalScale;
                      tableEl.style.width = `${scaleCompensation * 100}%`;
                      tableEl.style.maxWidth = `${scaleCompensation * 100}%`;
                      
                      // HEIGHT FIX: Adjust container height to match scaled table
                      // The container should only take up the space of the scaled table
                      tableEl.style.height = 'auto';
                      tableEl.style.minHeight = 'auto';
                      
                      // HEIGHT FIX: Also adjust the outer container height
                      const outerContainer = tableEl.closest('.mb-16');
                      if (outerContainer) {
                        outerContainer.style.height = 'auto';
                        outerContainer.style.minHeight = 'auto';
                      }
                      
                    } else {
                      tableEl.style.transform = 'none';
                      tableEl.style.width = '100%';
                      tableEl.style.maxWidth = 'none';
                      tableEl.style.height = 'auto';
                      tableEl.style.minHeight = 'auto';
                      
                      // HEIGHT FIX: Reset outer container height on desktop
                      const outerContainer = tableEl.closest('.mb-16');
                      if (outerContainer) {
                        outerContainer.style.height = 'auto';
                        outerContainer.style.minHeight = 'auto';
                      }
                    }
                    
                    // Enhanced debugging for width issues
                    
                    // Update styles on resize
                    const handleTableResize = () => {
                      const newScreenWidth = window.innerWidth;
                      const isLarge = newScreenWidth >= 1024;
                      
                      if (isLarge) {
                        // Desktop: no scaling, full width
                        tableEl.style.transform = 'none';
                        tableEl.style.width = '100%';
                        tableEl.style.maxWidth = 'none';
                        tableEl.style.height = 'auto';
                        tableEl.style.minHeight = 'auto';
                        
                        // HEIGHT FIX: Reset outer container height on desktop
                        const outerContainer = tableEl.closest('.mb-16');
                        if (outerContainer) {
                          outerContainer.style.height = 'auto';
                          outerContainer.style.minHeight = 'auto';
                        }
                        
                      } else {
                        // Mobile: calculate optimal scale and compensate width
                        const newOptimalScale = Math.min(1, (newScreenWidth - 24) / 1200);
                        tableEl.style.transform = `scale(${newOptimalScale})`;
                        
                        // CRITICAL FIX: Compensate for scale factor
                        const newScaleCompensation = 1 / newOptimalScale;
                        tableEl.style.width = `${newScaleCompensation * 100}%`;
                        tableEl.style.maxWidth = `${newScaleCompensation * 100}%`;
                        
                        // HEIGHT FIX: Adjust container height to match scaled table
                        tableEl.style.height = 'auto';
                        tableEl.style.minHeight = 'auto';
                        
                        // HEIGHT FIX: Also adjust the outer container height on resize
                        const outerContainer = tableEl.closest('.mb-16');
                        if (outerContainer) {
                          outerContainer.style.height = 'auto';
                          outerContainer.style.minHeight = 'auto';
                        }
                      }
                      
                      tableEl.style.transformOrigin = isLarge ? 'initial' : 'top left';
                      tableEl.style.overflow = 'visible';
                      
                      // Enhanced resize debugging
                    };
                    
                    window.addEventListener('resize', handleTableResize);
                    
                    // Cleanup
                    return () => window.removeEventListener('resize', handleTableResize);
                  }
                }}
              >
                <SheetTable rows={sheetData} />
              </div>
        </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

export default SuaIpadPage;
