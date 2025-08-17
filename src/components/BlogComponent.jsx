import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SheetData from './SheetData';

const BlogComponent = () => {
  // Local state for UI management
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    const maxIndex = Math.max(0, data.length - 1);
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  // Check if environment variables are set
  if (!SHEET_ID || !API_KEY || !RANGE) {
    return (
      <section className="blog" id="blog">
        <div className="container">
          <div className="blog-content">
            <h2>Blog Thủ Thuật</h2>
            <div className="sheet-error">
              <p>Vui lòng cấu hình API</p>
            </div>
          </div>
        </div>
      </section>
    );
  }



  // Calculate displayed data and pagination
  const maxItems = 1;
  const displayedData = data.slice(currentIndex, currentIndex + maxItems);
  const hasMoreData = data.length > maxItems;
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex + maxItems < data.length;

  return (
    <section className="blog" id="blog">
      <div className="container">
        <div className="blog-content">
          {/* Blog Title */}
          <h2>Blog Thủ Thuật</h2>

          {/* Loading State */}
          {loading && (
            <div className="sheet-loading">
              <div className="loading-spinner"></div>
              <p>Loading...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="sheet-error">
              <p>Chúng tôi đang khắc phục sự cố, hãy quay lại sau</p>
              <button 
                onClick={() => window.location.reload()} 
                className="retry-button"
              >
                Thử lại
              </button>
            </div>
          )}

          {/* Data Display */}
          {!loading && !error && data && data.length > 0 && (
            <div className="sheet-data">
              <div className="blog-cards-container">
                {/* Left Arrow - positioned at left edge */}
                <button 
                  onClick={goToPrevious} 
                  className="nav-arrow nav-arrow-left" 
                  disabled={!canGoPrevious}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Cards Row */}
                <div className="blog-cards-wrapper">
                  <div 
                    className="blog-cards-row"
                    style={{
                      transform: `translateX(-${currentIndex * 100}%)`,
                      transition: 'transform 0.5s ease-in-out'
                    }}
                  >
                    {data.map((item, index) => (
                      <div 
                        key={item.id} 
                        className="blog-card group cursor-pointer"
                      >
                        <div className="p-6 flex flex-col h-full">
                          {/* Date */}
                          <div className="mb-3">
                            <span className="text-sm text-gray-500 font-light">
                              {item.date}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-bold text-gray-800 mb-4 leading-tight line-clamp-2 group-hover:text-[#FF6600] transition-colors duration-300 flex-1">
                            {item.title}
                          </h3>

                          {/* Description */}
                          {item.description && (
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                              {item.description}
                            </p>
                          )}

                          {/* Read More Button */}
                          <div className="mt-auto flex justify-end">
                            <a 
                              href={item.url} 
                              className="inline-block bg-gradient-to-r from-[#FF6600] to-[#E55A00] text-white font-medium text-sm px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              Đọc thêm
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Arrow - positioned at right edge */}
                <button 
                  onClick={goToNext} 
                  className="nav-arrow nav-arrow-right" 
                  disabled={!canGoNext}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Load More Button */}
              {hasMoreData && !showAll && (
                <div className="load-more-section mt-8 text-center">
                  <button 
                    onClick={() => navigate('/blog')}
                    className="bg-[#FF6600] hover:bg-[#E55A00] text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                  >
                    Xem thêm
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && (!data || data.length === 0) && (
            <div className="sheet-empty">
              <p>No data available</p>
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
      </div>
    </section>
  );
};

export default BlogComponent;
