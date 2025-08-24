import React from 'react';
import heroImg from '../assets/logo/hero-img.png';

const HeroComponent = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          {/* Left Section - Text Content */}
          <div className="hero-left">
            <div className="welcome-text">CHÀO MỪNG BẠN ĐẾN VỚI <br></br> KHẮC HUY REPAIR</div>
            <h1 className="hero-title">
              Don't Delay, <span className="highlight">Repair Today.</span>
            </h1>
            <div className="hero-slogan">Uy Tín Tạo Niềm Tin!</div>
            <p className="hero-description">
            Đừng để các rắc rối kỹ thuật của điện thoại khiến bạn khó chịu. Tại Khắc Huy Repair, chúng tôi mang đến sức sống mới cho thiết bị của bạn, nhanh chóng & mượt mà.
            </p>
            {/* <div className="hero-links">
              <a href="#warranty" className="hero-link">WARRANTY POLICY</a>
              <a href="#terms" className="hero-link">SERVICE TERMS</a>
              <a href="#support" className="hero-link">SUPPORT</a>
            </div> */}
            <div className="video-section">
              <a href="https://www.tiktok.com/@khachuyrepair" target="_blank" rel="noopener noreferrer" className="video-link">
                <div className="play-button">
                  <div className="play-triangle"></div>
                </div>
                <span className="video-text">Xem Video</span>
              </a>
            </div>
          </div>

          {/* Middle Section - Hero Image */}
          <div className="hero-center">
            <div className="hero-image-container">
              <img 
                src={heroImg} 
                alt="Khắc Huy Repair Hero Image" 
                className="hero-image"
              />
            </div>
          </div>

          {/* Right Section - Stats & CTA */}
          <div className="hero-right">
            <div className="stats-section">
              <div className="stats-number">2.5k <span className="highlight">+</span></div>
              <div className="stats-label">KHÁCH HÀNG Ở HCM.</div>
            </div>
            
            {/* New Promotional Section */}
            <div className="promo-section">
              <div className="promo-header">
                <span className="gift-icon">🎁</span>
                <span className="promo-title">Khi sửa iPhone tại Khắc Huy Repair, bạn sẽ được:</span>
              </div>
              <div className="promo-benefits">
                <div className="benefit-item">
                  <span className="check-icon">✅</span>
                  <span className="benefit-text">Kiểm tra full máy miễn phí</span>
                </div>
                <div className="benefit-item">
                  <span className="check-icon">✅</span>
                  <span className="benefit-text">Vệ sinh full máy miễn phí</span>
                </div>
                <div className="benefit-item">
                  <span className="check-icon">✅</span>
                  <span className="benefit-text">Dán lại ron kháng nước miễn phí</span>
                </div>
                <div className="benefit-item">
                  <span className="check-icon">✅</span>
                  <span className="benefit-text">Dán cường lực miễn phí</span>
                </div>
              </div>
            </div>
            
            <div className="expert-section">
              <div className="expert-avatar">
                <div className="avatar-placeholder">👨‍🔧</div>
              </div>
              <div className="expert-text">
              Chúng tôi sẵn sàng chẩn đoán thiết bị của bạn miễn phí. Hãy liên hệ cho chúng tôi!
              </div>
            </div>
            <div className="cta-section">
              <a href="#services" className="cta-link">
                Dịch vụ sửa chữa
                <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
