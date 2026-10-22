import React, { useState } from 'react';
import { TIMELINE_JOURNEY, CERTIFICATES, PERSONAL_INFO } from '../data/portfolioData';
import ThreeGearSimulator from '../components/ThreeGearSimulator';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  Award, 
  Building2, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe,
  Boxes
} from 'lucide-react';

export default function JourneyPage({ setActivePage }) {
  const [activeCert, setActiveCert] = useState(CERTIFICATES[0]);

  const triggerConfetti = (cert) => {
    setActiveCert(cert);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const getCertIcon = (id) => {
    switch(id) {
      case 'cswa': return Boxes;
      case '3s5s': return ShieldCheck;
      case 'english': return Globe;
      default: return Sparkles;
    }
  };

  return (
    <div className="min-h-screen py-12 md:py-20 relative">
      {/* Background radial accents */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
            <GraduationCap className="w-4 h-4" />
            <span>Hành Trình Đào Tạo & Rèn Luyện</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
            Quá Trình Học Tập & Phát Triển
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Hành trình từ giảng đường Đại học Lạc Hồng đến môi trường sản xuất thực tế tại Tập đoàn Brother Sài Gòn, từng bước trui rèn bản lĩnh kỹ sư Cơ Điện Tử.
          </p>
        </div>

        {/* 3D Mechatronic Gear Simulator Section */}
        <div className="mb-20">
          <ThreeGearSimulator />
        </div>

        {/* Interactive Timeline Roadmap */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Lộ Trình Các Cột Mốc Quan Trọng
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Các giai đoạn tích lũy tri thức, rèn luyện kỹ năng và kinh nghiệm thực chiến
            </p>
          </div>

          <div className="relative border-l-2 border-cyan-500/30 ml-4 md:ml-32 space-y-12">
            {TIMELINE_JOURNEY.map((item, index) => {
              const isBlue = item.color === 'blue';
              const isCyan = item.color === 'cyan';
              const isAmber = item.color === 'amber';
              const isEmerald = item.color === 'emerald';

              return (
                <div key={index} className="relative pl-6 md:pl-10 group">
                  {/* Timeline node icon */}
                  <div className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-transform group-hover:scale-125 ${
                    isBlue ? 'bg-blue-950 border-blue-400 text-blue-300' :
                    isCyan ? 'bg-cyan-950 border-cyan-400 text-cyan-300' :
                    isAmber ? 'bg-amber-950 border-amber-400 text-amber-300' :
                    'bg-emerald-950 border-emerald-400 text-emerald-300'
                  }`}>
                    <span className="text-xs font-mono font-bold">{index + 1}</span>
                  </div>

                  {/* Year Tag */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300">
                      {item.year}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {item.period}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isAmber ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      isEmerald ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                      'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    }`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20 group-hover:border-cyan-400/50 transition-all hover:shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold font-display text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm font-semibold text-cyan-400 flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-4 h-4" />
                          <span>{item.organization}</span>
                        </p>
                      </div>

                      <div className="text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 self-start">
                        {item.role}
                      </div>
                    </div>

                    {item.location && (
                      <p className="text-xs text-amber-400/90 font-mono flex items-center gap-1 mb-3">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </p>
                    )}

                    <div className="space-y-2 mt-4 pt-4 border-t border-slate-800/80">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certificates & Credentials Showroom */}
        <section className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Chứng Chỉ & Chứng Nhận Chuyên Môn</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Bảo Chứng Năng Lực Quốc Tế & Kỹ Năng
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Cert Selectors (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              {CERTIFICATES.map((cert) => {
                const isSelected = activeCert.id === cert.id;
                const Icon = getCertIcon(cert.id);
                return (
                  <div
                    key={cert.id}
                    onClick={() => triggerConfetti(cert)}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                      isSelected
                        ? 'glass-panel-glow border-cyan-400 shadow-lg shadow-cyan-500/20 translate-x-2'
                        : 'glass-panel border-slate-800 hover:border-slate-700 hover:translate-x-1'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${cert.color} text-slate-950 font-bold`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            {cert.name}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-mono">
                            {cert.issuer}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cert Showcase Detail Card (7 cols) */}
            <div className="lg:col-span-7">
              <div className="glass-panel-glow rounded-3xl p-6 md:p-8 border border-cyan-500/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Award className="w-48 h-48 text-cyan-400" />
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {activeCert.type}
                    </span>
                    <span className="text-sm font-mono font-bold text-amber-400">
                      Mastery: {activeCert.level}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black font-display text-white">
                      {activeCert.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      Đơn vị cấp: <span className="text-slate-200">{activeCert.issuer}</span>
                    </p>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-cyan-400 pl-4 py-1">
                    {activeCert.highlight}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/20 space-y-2">
                    <div className="text-xs font-mono text-cyan-300 font-bold uppercase">
                      Ý nghĩa đối với công việc kỹ sư:
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                      <li>Khẳng định năng lực độc lập giải quyết bài toán mô hình 3D và đọc hiểu bản vẽ.</li>
                      <li>Chuẩn hóa tác phong sản xuất theo mô hình nhà xưởng công nghiệp hiện đại.</li>
                      <li>Tiết kiệm thời gian đào tạo lại cho doanh nghiệp tuyển dụng.</li>
                    </ul>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={() => triggerConfetti(activeCert)}
                      className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Xác Nhận Năng Lực (Tương Tác)</span>
                    </button>
                    <button
                      onClick={() => setActivePage('cv')}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center gap-1.5"
                    >
                      <span>Xem Vị Trí Trên CV Gốc</span>
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Footer Navigation helper */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-800">
          <button
            onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            ← Quay lại Trang Chủ
          </button>
          <button
            onClick={() => { setActivePage('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all"
          >
            <span>Khám phá Dự Án & Kỹ Năng</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
