import React, { useState } from 'react';
import Header from './Header';
import FooterComponent from './FooterComponent';
import SheetData from './SheetData';
import SheetTableWithFilter from './SheetTableWithFilter';
import { Tablet } from 'lucide-react';

const SuaIpadPage = () => {
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
          <div className="w-full px-4 lg:px-32 mb-16">
            <SheetTableWithFilter rows={sheetData} />
          </div>
        )}

      </div>

      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

export default SuaIpadPage;
