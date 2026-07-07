import React, { useEffect, useState } from 'react';
import { Instagram } from 'lucide-react';
import googleMapsIcon from '../assets/logo/google-maps.webp';
import facebookIcon from '../assets/logo/facebook.webp';
import tiktokIcon from '../assets/logo/tik-tok.webp';
import youtubeIcon from '../assets/logo/youtube.webp';
import zaloIcon from '../assets/logo/zalo-icon.png';

const VISITOR_SESSION_KEY = 'khr_visited';
const INITIAL_COUNT = 22000;
const VISITOR_ROW_ID = 1;

function useVisitorCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    async function trackVisit() {
      const { supabase } = await import('../utils/supabase');
      const alreadyVisited = sessionStorage.getItem(VISITOR_SESSION_KEY);

      const { data } = await supabase
        .from('visitors')
        .select('count')
        .eq('id', VISITOR_ROW_ID)
        .single();

      if (!data) {
        const initialCount = INITIAL_COUNT + (alreadyVisited ? 0 : 1);
        await supabase
          .from('visitors')
          .insert({ id: VISITOR_ROW_ID, count: initialCount });
        setCount(initialCount);
      } else if (!alreadyVisited) {
        const newCount = data.count + 1;
        await supabase
          .from('visitors')
          .update({ count: newCount })
          .eq('id', VISITOR_ROW_ID);
        setCount(newCount);
      } else {
        setCount(data.count);
      }

      sessionStorage.setItem(VISITOR_SESSION_KEY, '1');
    }

    trackVisit();
  }, []);

  return count;
}

const FooterComponent = () => {
  const visitorCount = useVisitorCount();

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
              <h4 className="footer-contact-group">Tiệm</h4>
              <a href="https://www.tiktok.com/@khachuyrepair.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <img src={tiktokIcon} alt="TikTok Tiệm" className="social-icon" />
                <span>TikTok Tiệm: @khachuyrepair.com</span>
              </a>
              <a href="https://www.facebook.com/khachuyrepair" target="_blank" rel="noopener noreferrer" className="social-link">
                <img src={facebookIcon} alt="Fanpage Tiệm" className="social-icon" />
                <span>Fanpage Tiệm: facebook.com/khachuyrepair</span>
              </a>
              <a href="https://www.instagram.com/khachuyrepair" target="_blank" rel="noopener noreferrer" className="social-link">
                <Instagram className="social-icon-svg" size={24} aria-hidden="true" />
                <span>Instagram Tiệm: instagram.com/khachuyrepair</span>
              </a>
              <a href="https://www.youtube.com/@khachuyrepair" target="_blank" rel="noopener noreferrer" className="social-link">
                <img src={youtubeIcon} alt="YouTube" className="social-icon" />
                <span>YouTube: youtube.com/@khachuyrepair</span>
              </a>
              <a href="https://share.google/Bgrz8VGZaEH0e8RVX" target="_blank" rel="noopener noreferrer" className="social-link">
                <img src={googleMapsIcon} alt="Google" className="social-icon" />
                <span>Google: share.google/Bgrz8VGZaEH0e8RVX</span>
              </a>

              <h4 className="footer-contact-group">Khắc Huy</h4>
              <a href="https://www.tiktok.com/@duongkhachuy.repair" target="_blank" rel="noopener noreferrer" className="social-link">
                <img src={tiktokIcon} alt="TikTok Khắc Huy" className="social-icon" />
                <span>TikTok Khắc Huy: @duongkhachuy.repair</span>
              </a>
              <a href="https://www.facebook.com/duongkhachuy.repair" target="_blank" rel="noopener noreferrer" className="social-link">
                <img src={facebookIcon} alt="Facebook Khắc Huy" className="social-icon" />
                <span>Facebook Khắc Huy: facebook.com/duongkhachuy.repair</span>
              </a>
              <a href="https://www.instagram.com/duongkhachuy.repair" target="_blank" rel="noopener noreferrer" className="social-link">
                <Instagram className="social-icon-svg" size={24} aria-hidden="true" />
                <span>Instagram Khắc Huy: instagram.com/duongkhachuy.repair</span>
              </a>

              <h4 className="footer-contact-group">Zalo - Hotline</h4>
              <a href="https://zalo.me/0972403556" target="_blank" rel="noopener noreferrer" className="social-link">
                <img src={zaloIcon} alt="Zalo" className="social-icon" />
                <span>0972 403 556</span>
              </a>
              <a href="https://zalo.me/0977285289" target="_blank" rel="noopener noreferrer" className="social-link">
                <img src={zaloIcon} alt="Zalo" className="social-icon" />
                <span>0977 285 289</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          {visitorCount !== null && (
            <p className="visitor-count">
              Lượt truy cập: <strong>{visitorCount.toLocaleString('vi-VN')}</strong>
            </p>
          )}
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
