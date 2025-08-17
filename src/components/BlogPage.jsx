import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SheetData from './SheetData';
import ArticleGrid from './ArticleGrid';
import Header from './Header';
import FooterComponent from './FooterComponent';

const BlogPage = () => {
  // Local state for UI management
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get credentials from environment variables
  const SHEET_ID = import.meta.env.VITE_BLOG_SHEET_ID;
  const API_KEY = import.meta.env.VITE_BLOG_API_KEY;
  const RANGE = import.meta.env.VITE_BLOG_RANGE;

  const handleDataLoaded = useCallback((data) => {
    setData(data);
  }, []);

  const handleLoadingChange = useCallback((isLoading) => {
    setLoading(isLoading);
  }, []);

  const handleErrorChange = useCallback((errorMessage) => {
    setError(errorMessage);
  }, []);

  // Check if environment variables are set
  if (!SHEET_ID || !API_KEY || !RANGE) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FF6600] to-[#FF8533] flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Blog Page</h1>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <p>Vui lòng cấu hình API</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF6600] to-[#FF8533]">
      {/* Header */}
      <Header />
      
      {/* Main Content with margin-top to account for fixed header */}
      <div className="container mx-auto px-4 pt-16 pb-24" style={{ marginTop: '120px', marginBottom: '120px' }}>
        <div className="text-center" style={{ marginBottom: '24px' }}>
          <h1 className="text-5xl font-bold text-white mb-8 leading-tight">
            Blog Thủ Thuật
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Khám phá các thủ thuật, mẹo vặt và hướng dẫn hữu ích về sửa chữa thiết bị
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="loading-spinner mb-6"></div>
            <p className="text-white text-xl font-medium">Đang tải bài viết...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-24">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 inline-block max-w-md">
              <div className="text-red-100 mb-6">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-semibold mb-4">Có lỗi xảy ra</h3>
              <p className="text-white/80 text-lg mb-6">Chúng tôi đang khắc phục sự cố, hãy quay lại sau</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-white text-[#FF6600] font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
              >
                Thử lại
              </button>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && !error && data && data.length > 0 && (
          <ArticleGrid articles={data} />
        )}

        {/* Empty State */}
        {!loading && !error && (!data || data.length === 0) && (
          <div className="text-center py-24">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 inline-block max-w-md">
              <div className="text-white/60 mb-6">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Chưa có bài viết nào</h3>
              <p className="text-white/80">Hãy quay lại sau khi có nội dung mới</p>
            </div>
          </div>
        )}

        {/* Hidden SheetData component for data fetching */}
        <SheetData
          sheetId={SHEET_ID}
          apiKey={API_KEY}
          range={RANGE}
          onDataLoaded={handleDataLoaded}
          onLoadingChange={handleLoadingChange}
          onErrorChange={handleErrorChange}
        />
      </div>

      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

export default BlogPage;
