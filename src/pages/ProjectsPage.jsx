import React, { useState } from 'react';
import { FEATURED_PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { 
  Cpu, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Terminal, 
  ExternalLink, 
  Boxes, 
  Sliders, 
  Wrench,
  Factory,
  ChevronRight,
  Sparkles,
  Zap,
  Lock
} from 'lucide-react';

export default function ProjectsPage({ setActivePage }) {
  const [selectedProject, setSelectedProject] = useState(FEATURED_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'hardware' | 'cad'

  return (
    <div className="min-h-screen py-12 md:py-20 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
            <Cpu className="w-4 h-4" />
            <span>Dự Án Đồ Án & Thực Tập Doanh Nghiệp</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
            Dự Án & Năng Lực Cơ Điện Tử
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Minh chứng năng lực triển khai thực tế qua các đồ án kỹ thuật vi điều khiển STM32 và kinh nghiệm kiểm soát chất lượng tại tập đoàn Brother Sài Gòn.
          </p>
        </div>

        {/* Project Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {FEATURED_PROJECTS.map((proj) => {
            const isSelected = selectedProject.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`p-5 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'glass-panel-glow border-cyan-400 shadow-xl shadow-cyan-500/20 scale-[1.02]'
                    : 'glass-panel border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-300'
                  }`}>
                    {proj.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {proj.category}
                  </span>
                </div>

                <h3 className="font-bold text-base text-white font-display line-clamp-1 mb-2">
                  {proj.name}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {proj.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* In-depth Featured Project Detail Showcase */}
        <div className="glass-panel-glow rounded-3xl p-6 md:p-10 border border-cyan-500/30 mb-20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Description & Specs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
                  {selectedProject.category}
                </span>
                <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/30">
                  {selectedProject.role}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
                  {selectedProject.name}
                </h2>
                <p className="text-sm text-cyan-400 font-mono mt-1">
                  Nền tảng / Thiết bị: {selectedProject.mcu}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Key Features bullet points */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Các đặc tính kỹ thuật đã thực hiện:</span>
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedProject.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200">
                      <span className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-400 font-mono font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                        0{i+1}
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Blueprint / Specs Grid (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              
              <div className="glass-panel rounded-2xl p-5 border border-cyan-500/30">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                    Bảng Thông Số Kỹ Thuật
                  </span>
                </div>

                <div className="space-y-3">
                  {selectedProject.specs.map((sp, idx) => (
                    <div key={idx} className="flex flex-col gap-0.5 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs">
                      <span className="text-slate-400 font-mono text-[11px]">
                        {sp.label}
                      </span>
                      <span className="text-white font-semibold">
                        {sp.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Spotlight based on project */}
              {selectedProject.id === 'smart-door-lock' && (
                <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 bg-gradient-to-br from-cyan-950/30 to-blue-950/30">
                  <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-bold mb-2">
                    <Lock className="w-4 h-4" />
                    <span>Kiến trúc hệ thống Khóa Cửa:</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-cyan-500/30 text-[11px] font-mono text-slate-300 space-y-1">
                    <div>[Input] Bàn phím Ma trận / Cảm biến</div>
                    <div className="text-cyan-400 pl-4">↳ [MCU] STM32F103C8T6 ARM 32-bit (Xử lý mã)</div>
                    <div className="text-amber-400 pl-8">↳ [Driver] Relay & Mosfet cách ly quang</div>
                    <div className="text-emerald-400 pl-12">↳ [Cơ cấu] Solenoid Khóa + Khung CAD SolidWorks</div>
                  </div>
                </div>
              )}

              {selectedProject.id === 'brother-industrial' && (
                <div className="glass-panel rounded-2xl p-5 border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-slate-900/40">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-mono font-bold mb-2">
                    <Factory className="w-4 h-4" />
                    <span>Nguyên tắc Zero Defect (Không hàng NG):</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Tại dây chuyền may Brother Amata, mỗi chi tiết cơ khí đều được kiểm định dung sai chính xác trước khi xuất xưởng, đảm bảo sản phẩm hoàn hảo 100% đến tay khách hàng toàn cầu.
                  </p>
                </div>
              )}

              {selectedProject.id === 'solidworks-cswa-portfolio' && (
                <div className="glass-panel rounded-2xl p-5 border border-cyan-500/30 bg-gradient-to-br from-blue-950/20 to-slate-900/40">
                  <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-bold mb-2">
                    <Boxes className="w-4 h-4" />
                    <span>Tiêu Chuẩn Thiết Kế CAD 3D:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Khả năng dựng hình tham số (Parametric Modeling), kiểm soát cây thư mục thiết kế (Feature Manager Tree), lắp ráp ràng buộc chuyển động và xuất bản vẽ theo chuẩn ISO/JIS.
                  </p>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* 3S - 5S Methodology in Practice Section */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Quy Trình Chuẩn Nhật Bản
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-2">
              Triển Khai Tiêu Chuẩn 3S-5S
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Ứng dụng thực tiễn trong công việc và quản lý xưởng cơ điện tử
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { code: "1S", jp: "Seiri (整理)", vn: "Sàng Lọc", desc: "Loại bỏ chi tiết lỗi, phôi thừa, chỉ giữ dụng cụ gia công cần thiết.", color: "border-cyan-500/30" },
              { code: "2S", jp: "Seiton (整頓)", vn: "Sắp Xếp", desc: "Bố trí đồ gá, máy móc và dụng cụ đo kiểm khoa học, dễ tìm - dễ lấy.", color: "border-blue-500/30" },
              { code: "3S", jp: "Seiso (清掃)", vn: "Sạch Sẽ", desc: "Vệ sinh bàn máy, lau chùi dầu mỡ kim loại để ngăn ngừa sự cố hỏng hóc.", color: "border-emerald-500/30" },
              { code: "4S", jp: "Seiketsu (清潔)", vn: "Săn Sóc", desc: "Duy trì tiêu chuẩn 3S hàng ngày, biến thành văn hóa làm việc chuyên nghiệp.", color: "border-amber-500/30" },
              { code: "5S", jp: "Shitsuke (躾)", vn: "Sẵn Sàng", desc: "Tự giác tuân thủ nội quy an toàn lao động và cải tiến Kaizen liên tục.", color: "border-purple-500/30" }
            ].map((step, i) => (
              <div key={i} className={`glass-panel rounded-2xl p-5 border ${step.color} hover:scale-105 transition-all text-center flex flex-col justify-between`}>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 mx-auto flex items-center justify-center font-mono font-black text-white text-base mb-2">
                    {step.code}
                  </div>
                  <div className="text-xs font-mono text-cyan-400 font-bold">
                    {step.jp}
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5 mb-2 font-display">
                    {step.vn}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-800">
          <button
            onClick={() => { setActivePage('journey'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            ← Xem Quá Trình Học Tập
          </button>
          <button
            onClick={() => { setActivePage('cv'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
          >
            <span>Đến Trang Xem CV Thực Tế</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
