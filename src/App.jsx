import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HeroComponent from './components/HeroComponent';
import ServicesComponent from './components/ServicesComponent';
import AboutComponent from './components/AboutComponent';
import BlogComponent from './components/BlogComponent';
import FooterComponent from './components/FooterComponent';
import BlogPage from './components/BlogPage';
import SuaIphonePage from './components/SuaIphonePage';
import SuaIpadPage from './components/SuaIpadPage';
import PhuKienPage from './components/PhuKienPage';

// ScrollToTop component to handle smooth scrolling on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <HeroComponent />
              <ServicesComponent />
              <AboutComponent />
              <BlogComponent />
              <FooterComponent />
            </>
          } />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/sua-iphone" element={<SuaIphonePage />} />
          <Route path="/sua-ipad" element={<SuaIpadPage />} />
          <Route path="/phu-kien" element={<PhuKienPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
