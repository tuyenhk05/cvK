import React, { useState } from 'react';
import { PERSONAL_INFO, CORE_STATS, SKILL_CATEGORIES } from '../data/portfolioData';
import ThreeBackground from '../components/ThreeBackground';
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
  Compass, 
  PhoneCall, 
  ExternalLink,
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
      {/* Photo Modal */}
      <PhotoModal 
        photo={selectedPhoto} 
        onClose={() => setSelectedPhoto(null)} 
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* 3D Background Particles & Wireframes */}
        <ThreeBackground />

        {/* Radial Glow Underlay */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Intro & Headline (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Sinh viên năm 4 • Đại học Lạc Hồng • Cơ Điện Tử</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                  <span className="block text-slate-100">XIN CHÀO, TÔI LÀ</span>
                  <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent glow-cyan">
                    {PERSONAL_INFO.name}
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-cyan-200/90 font-display">
                  {PERSONAL_INFO.title}
                </p>
              </div>

              {/* Bio description */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {PERSONAL_INFO.bio}
              </p>

              {/* Highlight bullet points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium text-slate-300 max-w-xl mx-auto lg:mx-0 text-left">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-cyan-500/20">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Chứng chỉ SolidWorks CSWA Quốc Tế</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-cyan-500/20">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Lập trình STM32 & Hệ thống Khóa Tự Động</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-amber-500/20">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Thực tập Brother Sài Gòn • Quản lý 3S-5S</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Chuẩn Ngoại ngữ Tiếng Anh & Tiếng Trung HK2</span>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => setActivePage('journey')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm transition-all shadow-xl shadow-cyan-500/25 hover:scale-105"
                >
                  <span>Khám Phá Hành Trình</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActivePage('projects')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-sm border border-cyan-500/30 transition-all hover:border-cyan-400"
                >
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Dự Án Khóa Cửa STM32</span>
                </button>

                <button
                  onClick={() => setActivePage('cv')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-semibold text-sm border border-amber-500/40 transition-all"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Xem CV Thực Tế</span>
                </button>
              </div>

            </div>

            {/* Right Column: Hero Portrait & Holographic Card (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                
                {/* Decorative glowing back rings */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-3xl opacity-30 blur-2xl animate-pulse" />
                
                {/* Cyber Card Container */}
                <div className="relative glass-panel-glow rounded-3xl p-5 border border-cyan-500/40 overflow-hidden shadow-2xl">
                  
                  {/* Portrait photo */}
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/20 group">
                    <img 
                      src={PERSONAL_INFO.avatar} 
                      alt={PERSONAL_INFO.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* Watermark / Badge over photo */}
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl glass-panel border border-cyan-500/30 backdrop-blur-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs uppercase font-mono font-bold text-cyan-400">
                            Mechatronics Student
                          </div>
                          <div className="text-sm font-bold text-white">
                            Võ Minh Kiệt
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                          Ready to work
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick stats floating chips */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-center font-mono">
                    <div className="p-2 rounded-xl bg-slate-900/80 border border-cyan-500/20">
                      <div className="text-base font-bold text-cyan-400">CSWA</div>
                      <div className="text-[10px] text-slate-400">SolidWorks</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900/80 border border-amber-500/20">
                      <div className="text-base font-bold text-amber-400">Brother VN</div>
                      <div className="text-[10px] text-slate-400">Thực Tập 3S-5S</div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Stats Bar */}
      <section className="py-10 border-y border-cyan-500/20 bg-slate-950/60 backdrop-blur">
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

      {/* Centerpiece 3D Album Showcase */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Không Gian 3D Tương Tác</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white tracking-wide">
              Bộ Sưu Tập Hình Ảnh 3D Không Gian
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Các hình ảnh của chủ nhân CV được dựng trong mô hình 3D xoay vòng thời gian thực với Three.js. Hãy cuộn chuột hoặc vuốt chạm để khám phá từng khoảnh khắc học tập, thực tập và đời sống.
            </p>
          </div>

          {/* Three.js 3D Gallery Canvas */}
          <ThreePhotoGallery onSelectPhoto={(photo) => setSelectedPhoto(photo)} />

        </div>
      </section>

      {/* Mechatronics Tech Stack & Competencies Section */}
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

          {/* Quick Call To Action Banner */}
          <div className="mt-14 glass-panel-glow rounded-3xl p-8 border border-cyan-500/40 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Bạn Đang Tìm Kiếm Kỹ Sư Cơ Điện Tử Năng Động & Kỷ Luật?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Võ Minh Kiệt sẵn sàng tham gia phỏng vấn, thử việc hoặc đảm nhiệm các dự án thiết kế CAD SolidWorks, lập trình nhúng STM32 và kiểm soát chất lượng 3S-5S.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={PERSONAL_INFO.socials.phone}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Gọi Ngay: {PERSONAL_INFO.phone}</span>
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
