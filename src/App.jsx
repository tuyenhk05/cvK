import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AudioController from './components/AudioController';
import HomePage from './pages/HomePage';
import JourneyPage from './pages/JourneyPage';
import ProjectsPage from './pages/ProjectsPage';
import CvViewerPage from './pages/CvViewerPage';

export default function App() {
  // Sync page state with URL hash
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '');
    if (['home', 'journey', 'projects', 'cv'].includes(hash)) {
      return hash;
    }
    return 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);

  // Initialize Lenis Smooth Scroll (Ultra-fluid inertial scrolling in both directions)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.8,
      infinite: false,
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // Update hash when activePage changes
  const handlePageChange = (newPage) => {
    setActivePage(newPage);
    window.location.hash = newPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to hash change from browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'journey', 'projects', 'cv'].includes(hash)) {
        setActivePage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Global Background Audio Player (Continuous across pages) */}
      <AudioController />

      {/* Top Navbar */}
      <Navbar activePage={activePage} setActivePage={handlePageChange} />

      {/* Main Content View with Page Transition */}
      <main className="flex-1 animate-in fade-in duration-300">
        {activePage === 'home' && <HomePage setActivePage={handlePageChange} />}
        {activePage === 'journey' && <JourneyPage setActivePage={handlePageChange} />}
        {activePage === 'projects' && <ProjectsPage setActivePage={handlePageChange} />}
        {activePage === 'cv' && <CvViewerPage />}
      </main>

      {/* Footer */}
      <Footer setActivePage={handlePageChange} />

    </div>
  );
}
