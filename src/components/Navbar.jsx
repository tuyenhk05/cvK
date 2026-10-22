import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  FileText, 
  Menu, 
  X, 
  Home, 
  GraduationCap, 
  Cpu, 
  PhoneCall, 
  Download
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Auto-hide navbar when scrolling DOWN, reveal when scrolling UP
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at top of page
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
        setMobileMenuOpen(false); // Close mobile drawer if open
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Tổng Quan', icon: Home },
    { id: 'journey', label: 'Quá Trình & Học Vấn', icon: GraduationCap },
    { id: 'projects', label: 'Dự Án & Thực Chiến', icon: Cpu },
    { id: 'cv', label: 'Xem CV Thực Tế', icon: FileText, highlight: true },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 w-full glass-panel border-b border-cyan-500/20 backdrop-blur-xl transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 shadow-lg shadow-black/20' : '-translate-y-full pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 cursor-pointer group pointer-events-auto"
        >
          <div className="relative">
            <img 
              src={PERSONAL_INFO.avatar} 
              alt={PERSONAL_INFO.name} 
              className="w-11 h-11 rounded-full object-cover ring-2 ring-cyan-400 group-hover:scale-105 transition-transform"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-white text-base md:text-lg tracking-wider group-hover:text-cyan-400 transition-colors">
                {PERSONAL_INFO.name}
              </h1>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                Cơ Điện Tử
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <span>ĐH Lạc Hồng</span>
              <span>•</span>
              <span className="text-amber-400">Brother VN</span>
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/60 border border-cyan-500/20 pointer-events-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25 font-bold scale-[1.02]'
                    : item.highlight
                    ? 'text-cyan-300 hover:text-white hover:bg-slate-800'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>{item.label}</span>
                {item.highlight && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute -top-0.5 -right-0.5" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button: Quick CV Download / Call */}
        <div className="hidden lg:flex items-center gap-3 pointer-events-auto">
          <a
            href={PERSONAL_INFO.socials.phone}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
            <span>{PERSONAL_INFO.phone}</span>
          </a>

          <button
            onClick={() => handleNavClick('cv')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 hover:scale-105"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải CV Bản PDF</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2 pointer-events-auto">
          <button
            onClick={() => handleNavClick('cv')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && isVisible && (
        <div className="md:hidden glass-panel-glow border-b border-cyan-500/30 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 pointer-events-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.label}</span>
                </div>
                {item.highlight && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-mono">
                    PDF gốc
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={PERSONAL_INFO.socials.phone}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 text-xs font-mono text-cyan-300 border border-slate-700"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Gọi: {PERSONAL_INFO.phone}</span>
            </a>
            <a
              href={PERSONAL_INFO.cvPdfPath}
              download
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold"
            >
              <Download className="w-4 h-4" />
              <span>Tải CV_Võ Minh Kiệt.pdf</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
