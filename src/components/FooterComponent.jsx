import React from 'react';
import googleMapsIcon from '../assets/logo/google-maps.png';
import facebookIcon from '../assets/logo/facebook.png';
import tiktokIcon from '../assets/logo/tik-tok.png';
import youtubeIcon from '../assets/logo/youtube.png';
import zaloIcon from '../assets/logo/zalo-icon.png';

const FooterComponent = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-content">
          {/* Left Section - Address & Map */}
          <div className="footer-left">
            <h3>Địa Chỉ</h3>
            <div className="social-links">
              <a href="https://maps.app.goo.gl/Ty96Ddr5BTU6Rkym8" target="_blank" rel="noopener noreferrer" className="social-link">
                <img src={googleMapsIcon} alt="TikTok" className="social-icon" />
                <span>11/2 Trần Minh Quyền, Phường 10, Quận 10, HCM</span>
              </a>    
            </div>
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5416701838303!2d106.67253857457483!3d10.769762759317564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x610fb1e7c12275e9%3A0x6259fcca57af471f!2sKh%E1%BA%AFc%20Huy%20Repair!5e0!3m2!1svi!2s!4v1755315760421!5m2!1svi!2s" 
                width="400" 
                height="300" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Khắc Huy Repair Location"
              ></iframe>
            </div>
            
          </div>

          {/* Right Section - Social Media & Contact */}
          <div className="footer-right">
            <h3>Liên Hệ</h3>
            <div className="social-links">
              <a href="https://www.tiktok.com/@khachuyrepair" target="_blank" rel="noopener noreferrer" className="social-link">
                <img src={tiktokIcon} alt="TikTok" className="social-icon" />
                <span>TikTok: @khachuyrepair</span>
              </a>
              <a href="https://www.facebook.com/khachuyrepair.iphone" target="_blank" rel="noopener noreferrer" className="social-link">
                <img src={facebookIcon} alt="Facebook" className="social-icon" />
                <span>Fanpage: Khắc Huy Repair</span>
              </a>
              <a href="https://www.youtube.com/@khachuyrepair" target="_blank" rel="noopener noreferrer" className="social-link">
                <img src={youtubeIcon} alt="YouTube" className="social-icon" />
                <span>YouTube: @khachuyrepair</span>
              </a>
              <a href="https://zalo.me/0393.296.576" target="_blank" rel="noopener noreferrer" className="social-link">
                <img src={zaloIcon} alt="Zalo" className="social-icon" />
                <span>Zalo: 0393.296.576</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Khắc Huy Repair. All rights reserved.</p>
          <p className="tdk-credit">
            Website made with ❤️ by{' '}
            <a 
              href="https://tdk.best/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="tdk-link"
              style={{ color: '#f97316' }}
            >
              TDK
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
