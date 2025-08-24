import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: 'Trang chủ', href: '/', showOnBlog: true, showOnHome: false, showOnServices: true },
    // { name: 'Dịch vụ', href: '#services', showOnBlog: false, showOnHome: true, showOnServices: false },
    { name: 'Sửa iPhone', href: '/sua-iphone', showOnBlog: false, showOnHome: true, showOnServices: false },
    { name: 'Sửa iPad', href: '/sua-ipad', showOnBlog: false, showOnHome: true, showOnServices: false },
    { name: 'Phụ kiện', href: '/phu-kien', showOnBlog: false, showOnHome: true, showOnServices: false },
    { name: 'Giới thiệu', href: '#about', showOnBlog: false, showOnHome: true, showOnServices: false },
    { name: 'Blog', href: '/blog', showOnBlog: false, showOnHome: true, showOnServices: false },
    { name: 'Liên hệ', href: '#contact', showOnBlog: false, showOnHome: true, showOnServices: false },
  ];

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNavigationClick = (href) => {
    if (href.startsWith('/')) {
      // If it's a route (like /blog, /), navigate to it
      navigate(href);
    } else {
      // If it's a hash link (like #home), scroll to it
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Check if we're on specific pages
  const isOnBlogPage = location.pathname === '/blog';
  const isOnHomePage = location.pathname === '/';
  const isOnServicePage = ['/sua-iphone', '/sua-ipad', '/phu-kien'].includes(location.pathname);

  // Filter navigation items based on current page
  const getVisibleNavigationItems = () => {
    return navigationItems.filter(item => {
      if (isOnBlogPage) {
        return item.showOnBlog;
      } else if (isOnHomePage) {
        return item.showOnHome;
      } else if (isOnServicePage) {
        return item.showOnServices;
      }
      return true; // Show all on other pages
    });
  };

  const visibleItems = getVisibleNavigationItems();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo - Clickable */}
          <div className="logo cursor-pointer" onClick={handleLogoClick}>
            <img src={logo} alt="Khắc Huy Repair Logo" className="logo-image" />
            <h1>Khắc Huy Repair</h1>
          </div>

          {/* Desktop Navigation - Conditional display */}
          {visibleItems.length > 0 && (
            <nav className="nav">
              {visibleItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigationClick(item.href);
                  }}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          )}

          {/* Mobile menu button - Conditional display */}
          {visibleItems.length > 0 && (
            <div className="mobile-menu-button">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="mobile-menu-toggle"
              >
                <svg className="hamburger-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation - Conditional display */}
        {visibleItems.length > 0 && isMenuOpen && (
          <div className="mobile-nav">
            <div className="mobile-nav-content">
              {visibleItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigationClick(item.href);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
