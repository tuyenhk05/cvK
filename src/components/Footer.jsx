import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MapPin, Heart, ChevronUp, FileText } from 'lucide-react';

export default function Footer({ setActivePage }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-cyan-500/20 bg-[#060a12] pt-14 pb-24 overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={PERSONAL_INFO.avatar} 
                alt={PERSONAL_INFO.name} 
                className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-500/40"
              />
              <div>
                <h3 className="font-display font-extrabold text-white text-lg tracking-wider">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs text-cyan-400 font-mono">
                  {PERSONAL_INFO.title}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Sinh viên Kỹ thuật Cơ điện tử Đại học Lạc Hồng. Sẵn sàng gia nhập doanh nghiệp trong vai trò Kỹ sư Thiết kế CAD SolidWorks, Kỹ sư R&D Cơ Điện Tử, Kỹ sư Vận hành & QC/QA theo chuẩn 3S-5S.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono">
                Dự kiến tốt nghiệp: T5/2027
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono">
                SolidWorks CSWA
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">
              Điều hướng website
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => { setActivePage('home'); scrollToTop(); }} 
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Trang Chủ • Giới Thiệu
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('journey'); scrollToTop(); }} 
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Quá Trình Học Tập & Phát Triển
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('projects'); scrollToTop(); }} 
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Dự Án Khóa Cửa & Brother VN
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActivePage('cv'); scrollToTop(); }} 
                  className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Xem & Tải CV Thực Tế</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">
              Liên Hệ Trực Tiếp
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <a 
                href={PERSONAL_INFO.socials.phone}
                className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="font-mono">{PERSONAL_INFO.phone}</span>
              </a>
              <a 
                href={PERSONAL_INFO.socials.email}
                className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="truncate">{PERSONAL_INFO.email}</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{PERSONAL_INFO.address}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © 2026 Võ Minh Kiệt. Kỹ Sư Cơ Điện Tử • Mechatronics Portfolio.
          </div>

          <div className="flex items-center gap-3">
            <span>Hiệu ứng Three.js & Motion Design</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors border border-slate-700"
              title="Lên đầu trang"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
