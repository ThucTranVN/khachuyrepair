import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Tablet, Package } from 'lucide-react';
import homeRepairImg from '../assets/logo/home-repair-img.png';
import SheetData from './SheetData';
import SheetTableWithFilter from './SheetTableWithFilter';

const ServicesComponent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('iphone');
  const [iphoneData, setIphoneData] = useState([]);
  const [ipadData, setIpadData] = useState([]);
  const [iphoneLoading, setIphoneLoading] = useState(false);
  const [ipadLoading, setIpadLoading] = useState(false);
  const [iphoneError, setIphoneError] = useState(null);
  const [ipadError, setIpadError] = useState(null);

  const apiKey = import.meta.env.VITE_BLOG_API_KEY;

  const services = [
    {
      icon: <Smartphone className="w-12 h-12 text-orange-500" />,
      title: 'Giá sửa iPhone',
      description: 'Chuyên sửa chữa iPhone với đội ngũ kỹ thuật viên giàu kinh nghiệm. Thay màn hình, pin, camera và các linh kiện khác.',
      link: 'Xem dịch vụ',
      path: '/sua-iphone'
    },
    {
      icon: <Tablet className="w-12 h-12 text-orange-500" />,
      title: 'Giá sửa iPad',
      description: 'Dịch vụ sửa chữa iPad chuyên nghiệp, sửa màn hình, thay pin, khắc phục các vấn đề phần cứng và phần mềm.',
      link: 'Xem dịch vụ',
      path: '/sua-ipad'
    },
    {
      icon: <Package className="w-12 h-12 text-orange-500" />,
      title: 'Giá phụ kiện',
      description: 'Cung cấp đầy đủ phụ kiện chính hãng cho iPhone, iPad: sạc, tai nghe, ốp lưng, màn hình và nhiều hơn nữa.',
      link: 'Xem dịch vụ',
      path: '/phu-kien'
    }
  ];

  const loading = activeTab === 'iphone' ? iphoneLoading : ipadLoading;
  const error = activeTab === 'iphone' ? iphoneError : ipadError;
  const tableData = activeTab === 'iphone' ? iphoneData : ipadData;

  return (
    <section className="services" id="services">
      <div className="container">

        {/* Price Table Tabs */}
        <div style={{ marginBottom: '48px' }}>
          {/* Tab Buttons */}
          <div className="flex justify-center" style={{ gap: '16px', marginBottom: '32px' }}>
            {[
              { key: 'iphone', label: 'Giá Sửa iPhone', icon: <Smartphone className="w-5 h-5" /> },
              { key: 'ipad',   label: 'Giá Sửa iPad',   icon: <Tablet className="w-5 h-5" /> },
            ].map(tab => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    borderRadius: '14px',
                    fontWeight: '600',
                    fontSize: '16px',
                    cursor: 'pointer',
                    border: '2px solid',
                    transition: 'all 0.3s ease',
                    ...(isActive ? {
                      background: 'linear-gradient(135deg, #f97316, #ea580c)',
                      color: '#ffffff',
                      borderColor: '#f97316',
                      boxShadow: '0 10px 25px rgba(249, 115, 22, 0.3)',
                    } : {
                      background: '#000000',
                      color: '#ffffff',
                      borderColor: '#374151',
                    }),
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = '#f97316';
                      e.currentTarget.style.background = '#111827';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = '#374151';
                      e.currentTarget.style.background = '#000000';
                    }
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Data fetchers — both always mounted so data is cached when switching tabs */}
          <SheetData
            sheetId={import.meta.env.VITE_IPHONE_ID}
            apiKey={apiKey}
            range={import.meta.env.VITE_IPHONE_RANGE}
            mode="table"
            onDataLoaded={setIphoneData}
            onLoadingChange={setIphoneLoading}
            onErrorChange={setIphoneError}
          />
          <SheetData
            sheetId={import.meta.env.VITE_IPAD_ID}
            apiKey={apiKey}
            range={import.meta.env.VITE_IPAD_RANGE}
            mode="table"
            onDataLoaded={setIpadData}
            onLoadingChange={setIpadLoading}
            onErrorChange={setIpadError}
          />

          {/* Table Output */}
          {loading && (
            <div className="flex justify-center items-center p-12">
              <div
                className="w-12 h-12 border-4 border-orange-200/30 rounded-full"
                style={{ borderTop: '4px solid #f97316', animation: 'spin 1s linear infinite' }}
              />
            </div>
          )}

          {!loading && error && (
            <div className="bg-red-900/50 rounded-2xl p-8 text-center border border-red-600">
              <p className="text-lg font-medium mb-2" style={{ color: '#fecaca' }}>Lỗi khi tải dữ liệu:</p>
              <p style={{ color: '#fca5a5' }}>{error}</p>
            </div>
          )}

          {!loading && !error && tableData.length > 0 && (
            <SheetTableWithFilter rows={tableData} />
          )}
        </div>

        {/* Bridge Image */}
        <div className="bridge-image-container">
          <img
            src={homeRepairImg}
            alt="Mobile Repair Services"
            className="bridge-image"
          />
        </div>

        {/* Services Header */}
        <div className="services-header">
          <div className="services-subtitle">CHÚNG TÔI SỬA CHỮA CÁC THIẾT BỊ CỦA BẠN</div>
          <h2 className="services-title">
            Không Còn Lo Lắng - <span className="highlight">Stress-free.</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <button
                className="service-button"
                onClick={() => navigate(service.path)}
              >
                {service.link}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesComponent;
