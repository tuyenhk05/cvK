import React, { useState } from 'react';
import { PERSONAL_INFO, CORE_STATS, SKILL_CATEGORIES } from '../data/portfolioData';
import ThreeScrollExperience from '../components/ThreeScrollExperience';
import ThreePhotoGallery from '../components/ThreePhotoGallery';
import PhotoModal from '../components/PhotoModal';
import { 
  ArrowRight, 
  FileText, 
  Award, 
  ShieldCheck, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  PhoneCall, 
  Sparkles
} from 'lucide-react';

export default function HomePage({ setActivePage }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const getStatIcon = (iconName) => {
    switch(iconName) {
      case 'GraduationCap': return GraduationCap;
      case 'Award': return Award;
      case 'Briefcase': return Briefcase;
      case 'ShieldCheck': return ShieldCheck;
      default: return Sparkles;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Lightbox Photo Modal */}
      <PhotoModal 
        photo={selectedPhoto} 
        onClose={() => setSelectedPhoto(null)} 
      />

      {/* 1. SCROLL-DRIVEN 3D CINEMATIC EXPERIENCE */}
      <ThreeScrollExperience setActivePage={setActivePage} />

      {/* 2. CORE STATS BAR */}
      <section className="py-12 border-y border-cyan-500/20 bg-slate-950/70 backdrop-blur relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {CORE_STATS.map((stat, i) => {
              const Icon = getStatIcon(stat.icon);
              return (
                <div 
                  key={i}
                  className="glass-panel rounded-2xl p-4 md:p-5 border border-cyan-500/20 hover:border-cyan-400/50 transition-all hover:scale-[1.02] flex items-center gap-3.5"
                >
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-black font-display text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-200">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {stat.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. 3D ALBUM PHOTO CAROUSEL SHOWCASE */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-[#070c16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Không Gian 3D Tương Tác</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white tracking-wide">
              Bộ Sưu Tập Hình Ảnh 3D Không Gian
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Các hình ảnh của chủ nhân CV (hoạt động thể thao bida cùng bạn bè, chân dung, khoảnh khắc đời thường) được mô hình hóa trong không gian 3D Three.js.
            </p>
          </div>

          {/* Three.js 3D Gallery Canvas */}
          <ThreePhotoGallery onSelectPhoto={(photo) => setSelectedPhoto(photo)} />

        </div>
      </section>

      {/* 4. MECHATRONICS COMPETENCIES SECTION */}
      <section className="py-16 bg-[#080d16] border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-wide">
              Năng Lực Kỹ Thuật Cơ Điện Tử
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Tổng hợp kỹ năng cốt lõi được đào tạo tại Đại học Lạc Hồng và thực hành tại doanh nghiệp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div 
                key={idx}
                className="glass-panel rounded-3xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white text-base font-display">
                      {cat.category}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {cat.skills.map((s, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-200">{s.name}</span>
                          <span className="text-cyan-400 font-mono">{s.level}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
                            style={{ width: `${s.level}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {s.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono text-cyan-400/90 flex items-center gap-1">
                    <span>Đã qua kiểm định thực tế</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Recruiter Banner */}
          <div className="mt-14 glass-panel-glow rounded-3xl p-8 border border-cyan-500/40 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Sẵn Sàng Gia Nhập Doanh Nghiệp Cơ Điện Tử
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Võ Minh Kiệt luôn mong muốn cống hiến năng lực thiết kế CAD SolidWorks, lập trình vi điều khiển STM32 và tác phong làm việc chuẩn 3S-5S Nhật Bản.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={PERSONAL_INFO.socials.phone}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Gọi Tuyển Dụng: {PERSONAL_INFO.phone}</span>
                </a>
                <button
                  onClick={() => setActivePage('cv')}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Xem Trực Tuyến Bản CV Gốc</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
