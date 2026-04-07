import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HeroComponent from './components/HeroComponent';
import ServicesComponent from './components/ServicesComponent';
import AboutComponent from './components/AboutComponent';
import BlogComponent from './components/BlogComponent';

const FooterComponent = lazy(() => import('./components/FooterComponent'));
const BlogPage = lazy(() => import('./components/BlogPage'));
const SuaIphonePage = lazy(() => import('./components/SuaIphonePage'));
const SuaIpadPage = lazy(() => import('./components/SuaIpadPage'));
const PhuKienPage = lazy(() => import('./components/PhuKienPage'));

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
              <Suspense fallback={null}><FooterComponent /></Suspense>
            </>
          } />
          <Route path="/blog" element={<Suspense fallback={null}><BlogPage /></Suspense>} />
          <Route path="/sua-iphone" element={<Suspense fallback={null}><SuaIphonePage /></Suspense>} />
          <Route path="/sua-ipad" element={<Suspense fallback={null}><SuaIpadPage /></Suspense>} />
          <Route path="/phu-kien" element={<Suspense fallback={null}><PhuKienPage /></Suspense>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
