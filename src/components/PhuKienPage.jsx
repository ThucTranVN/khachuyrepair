import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import FooterComponent from './FooterComponent';
import { Package, Star } from 'lucide-react';

const PhuKienPage = () => {
  const navigate = useNavigate();

  const accessories = [
    {
      name: "Cáp sạc 20W C to Lightning",
      type: "Cáp sạc",
      quality: "Linh Kiện Cao Cấp",
      price: "80.000",
      originalPrice: "120.000",
      discount: "33%",
      rating: "4.8",
      description: "Sạc nhanh, cáp bền bỉ, tương thích iPhone/iPad",
      image: "/images/accessories/20w-C-to-Light-80.jpg"
    },
    {
      name: "Cáp sạc 20W C to Lightning",
      type: "Cáp sạc",
      quality: "Zin Apple",
      price: "145.000",
      originalPrice: "200.000",
      discount: "28%",
      rating: "5.0",
      description: "Chính hãng Apple, chất lượng cao, bảo hành dài hạn",
      image: "/images/accessories/20w-C-to-Ligh-Zin-Apple-145.jpg"
    },
    {
      name: "Cáp sạc nhanh C to C",
      type: "Cáp sạc",
      quality: "Linh Kiện Cao Cấp",
      price: "90.000",
      originalPrice: "130.000",
      discount: "31%",
      rating: "4.7",
      description: "Sạc nhanh USB-C, tương thích đa thiết bị",
      image: "/images/accessories/C-to-C-90.jpg"
    },
    {
      name: "Cáp sạc nhanh C to C",
      type: "Cáp sạc",
      quality: "Zin Apple",
      price: "155.000",
      originalPrice: "220.000",
      discount: "30%",
      rating: "5.0",
      description: "Chính hãng Apple, sạc nhanh, độ bền cao",
      image: "/images/accessories/C-to-C-Zin-Apple-155.jpg"
    },
    {
      name: "Củ sạc nhanh 20W",
      type: "Củ sạc",
      quality: "Linh Kiện Cao Cấp",
      price: "155.000",
      originalPrice: "220.000",
      discount: "30%",
      rating: "4.6",
      description: "Sạc nhanh 20W, tương thích iPhone/iPad",
      image: "/images/accessories/cu-sac-nhanh-155.webp"
    },
    {
      name: "Củ sạc nhanh 20W",
      type: "Củ sạc",
      quality: "Zin Apple",
      price: "295.000",
      originalPrice: "400.000",
      discount: "26%",
      rating: "5.0",
      description: "Chính hãng Apple, sạc nhanh, an toàn tuyệt đối",
      image: "/images/accessories/cu-sac-nhanh-295.webp"
    }
  ];

  // Function to render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
        {hasHalfStar && (
          <Star key="half" className="w-4 h-4 text-yellow-400 fill-current" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="text-sm font-medium text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF6600] to-[#FF8533]">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-16 pb-24" style={{ marginTop: '120px' }}>
        {/* Page Header */}
        <div className="text-center mb-16" style={{marginBottom: '24px' }}>
          <h1 className="text-5xl font-bold text-white mb-6">
            Phụ Kiện Chính Hãng
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Cung cấp đầy đủ phụ kiện chính hãng Apple với chất lượng cao và giá cả cạnh tranh. 
            Chúng tôi cam kết mang đến những sản phẩm tốt nhất cho thiết bị của bạn.
          </p>
        </div>

        {/* Accessories Grid - 3 cards per row with improved spacing */}
        <div 
          className="grid gap-8 mb-16"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            marginBottom: '64px'
          }}
        >
          {accessories.map((product, index) => (
            <div 
              key={index} 
              className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
              style={{
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                minHeight: '480px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02) rotateY(2deg)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Enhanced Discount Badge - Ribbon Style */}
              <div className="relative">
                <div 
                  className="absolute top-4 right-4 z-10 px-4 py-2 text-white font-bold text-sm shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                    zIndex: 10,
                    padding: '10px 20px',
                    borderRadius: '8px',
                    boxShadow: '0 8px 16px -4px rgba(239, 68, 68, 0.4), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    transform: 'rotate(2deg)',
                    animation: 'pulse 2s infinite'
                  }}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '-8px',
                      width: '0',
                      height: '0',
                      borderLeft: '8px solid #b91c1c',
                      borderTop: '8px solid transparent',
                      borderBottom: '8px solid transparent'
                    }}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '-8px',
                      width: '0',
                      height: '0',
                      borderRight: '8px solid #b91c1c',
                      borderTop: '8px solid transparent',
                      borderBottom: '8px solid transparent'
                    }}
                  />
                  -{product.discount}
                </div>
                
                {/* Product Image - Larger with enhanced hover */}
                <div 
                  className="w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
                  style={{ 
                    height: '280px', 
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  {/* Subtle overlay gradient */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.05) 100%)',
                      zIndex: 1
                    }}
                  />
                  
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover relative z-10"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      filter: 'brightness(1.05) contrast(1.1)'
                    }}
                    onError={(e) => {
                      e.target.src = '/tiktok-thumbnail.png';
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.1) rotate(1deg)';
                      e.target.style.filter = 'brightness(1.15) contrast(1.2) saturate(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1) rotate(0deg)';
                      e.target.style.filter = 'brightness(1.05) contrast(1.1)';
                    }}
                  />
                </div>
              </div>
              
              {/* Product Content - Enhanced with gradients */}
              <div 
                className="p-6 flex-1 flex flex-col relative"
                style={{ 
                  padding: '24px',
                  flex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)'
                }}
              >
                {/* Type and Quality Tags - Enhanced styling */}
                <div className="flex items-center gap-3 mb-4">
                  <span 
                    className="text-xs font-semibold px-3 py-2 rounded-full shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)',
                      color: '#ea580c',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      boxShadow: '0 4px 6px -1px rgba(251, 146, 60, 0.3)'
                    }}
                  >
                    {product.type}
                  </span>
                  <span 
                    className="text-xs font-semibold px-3 py-2 rounded-full shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                      color: '#2563eb',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    {product.quality}
                  </span>
                </div>
                
                {/* Product Name - Enhanced typography */}
                <h3 
                  className="text-lg font-bold text-gray-800 mb-3 text-center"
                  style={{
                    fontSize: '18px',
                    fontWeight: '800',
                    color: '#1f2937',
                    lineHeight: '1.4',
                    marginTop: '20px',
                    height: '50px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  {product.name}
                </h3>
                
                {/* Product Description - Enhanced styling */}
                <p 
                  className="text-sm text-gray-600 mb-4 text-center"
                  style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '20px',
                    lineHeight: '1.6',
                    height: '42px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    fontStyle: 'italic'
                  }}
                >
                  {product.description}
                </p>
                
                {/* Rating - Enhanced with glow effect */}
                <div className="mb-4">
                  <div style={{ filter: 'drop-shadow(0 2px 4px rgba(251, 191, 36, 0.3))' }}>
                    {renderStars(parseFloat(product.rating))}
                  </div>
                </div>
                
                {/* Price Section - Animated transitions */}
                <div className="mt-auto text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span 
                      className="text-2xl font-bold text-red-600"
                      style={{
                        fontSize: '24px',
                        fontWeight: '800',
                        color: '#dc2626',
                        textShadow: '0 2px 4px rgba(220, 38, 38, 0.3)',
                        animation: 'pricePulse 2s ease-in-out infinite'
                      }}
                    >
                      {product.price}₫
                    </span>
                    <span 
                      className="text-lg text-gray-500 line-through"
                      style={{
                        fontSize: '18px',
                        color: '#9ca3af',
                        textDecoration: 'line-through',
                        fontWeight: '500',
                        opacity: 0.7,
                        transition: 'opacity 0.3s ease'
                      }}
                    >
                      {product.originalPrice}₫
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add CSS animations */}
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { transform: rotate(2deg) scale(1); }
            50% { transform: rotate(2deg) scale(1.05); }
          }
          
          @keyframes pricePulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}</style>
      </div>

      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

export default PhuKienPage;
