import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Tablet, Package } from 'lucide-react';
import homeRepairImg from '../assets/logo/home-repair-img.png';

const ServicesComponent = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Smartphone className="w-12 h-12 text-orange-500" />,
      title: 'Sửa iPhone',
      description: 'Chuyên sửa chữa iPhone với đội ngũ kỹ thuật viên giàu kinh nghiệm. Thay màn hình, pin, camera và các linh kiện khác.',
      link: 'Xem dịch vụ',
      path: '/sua-iphone'
    },
    {
      icon: <Tablet className="w-12 h-12 text-orange-500" />,
      title: 'Sửa iPad',
      description: 'Dịch vụ sửa chữa iPad chuyên nghiệp, sửa màn hình, thay pin, khắc phục các vấn đề phần cứng và phần mềm.',
      link: 'Xem dịch vụ',
      path: '/sua-ipad'
    },
    {
      icon: <Package className="w-12 h-12 text-orange-500" />,
      title: 'Phụ kiện',
      description: 'Cung cấp đầy đủ phụ kiện chính hãng cho iPhone, iPad: sạc, tai nghe, ốp lưng, màn hình và nhiều hơn nữa.',
      link: 'Xem dịch vụ',
      path: '/phu-kien'
    }
  ];

  const handleServiceClick = (path) => {
    navigate(path);
  };

  return (
    <section className="services" id="services">
      <div className="container">
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
                onClick={() => handleServiceClick(service.path)}
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
