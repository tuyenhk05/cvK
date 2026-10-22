import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  Download, 
  Printer, 
  Eye, 
  FileText, 
  Sparkles, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Check, 
  Copy, 
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';

export default function CvViewerPage() {
  const [viewMode, setViewMode] = useState('both'); // 'original' | 'digital' | 'both'
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-10 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>Hồ Sơ Ứng Tuyển Chính Thức</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-wide">
            Xem CV Thực Tế Của Võ Minh Kiệt
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Xem trực tiếp bản CV gốc (file PDF trong thư mục) hoặc đối chiếu với bản số hóa tương tác hiện đại.
          </p>
        </div>

        {/* Action & Control Bar */}
        <div className="glass-panel-glow rounded-2xl p-4 border border-cyan-500/40 mb-8 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          
          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'both'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Song Song (Đối Chiếu)
            </button>
            <button
              onClick={() => setViewMode('original')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'original'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bản Gốc PDF
            </button>
            <button
              onClick={() => setViewMode('digital')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'digital'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bản Số Hóa
            </button>
          </div>

          {/* Zoom controls for original image */}
          {(viewMode === 'original' || viewMode === 'both') && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setZoomLevel(z => Math.max(0.7, z - 0.15))}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                title="Thu nhỏ"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-400 w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel(z => Math.min(1.6, z + 0.15))}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                title="Phóng to"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 ml-1"
                title="Đặt lại"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Download & Print Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In CV</span>
            </button>

            <a
              href={PERSONAL_INFO.cvPdfPath}
              download="CV_Vo_Minh_Kiet.pdf"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>Tải CV Gốc (PDF)</span>
            </a>
          </div>

        </div>

        {/* CV Views Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          
          {/* VIEW 1: Original High-Res PDF/Image */}
          {(viewMode === 'original' || viewMode === 'both') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>BẢN GỐC TỪ THƯ MỤC: CV_Võ Minh Kiệt.pdf</span>
                </div>
                <a
                  href={PERSONAL_INFO.cvPdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Mở tab mới</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="glass-panel-glow rounded-3xl p-4 border border-cyan-500/30 overflow-auto max-h-[850px] flex items-center justify-center bg-slate-950/80 shadow-2xl">
                <div 
                  className="transition-transform duration-200 origin-top shadow-2xl rounded-2xl overflow-hidden"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <img 
                    src={PERSONAL_INFO.cvImagePath} 
                    alt="CV Võ Minh Kiệt Bản Gốc"
                    className="w-full h-auto max-w-full rounded-xl select-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: Interactive High-Fidelity Digital CV */}
          {(viewMode === 'digital' || viewMode === 'both') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>BẢN SỐ HÓA TƯƠNG TÁC (CHẤT LƯỢNG CAO)</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Sẵn sàng sao chép thông tin
                </span>
              </div>

              {/* Digital CV Canvas - Styled with identical structure to the original */}
              <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-white text-slate-900 grid grid-cols-1 sm:grid-cols-12 min-h-[850px]">
                
                {/* Left Column (White) - 5 cols */}
                <div className="sm:col-span-5 p-6 bg-slate-50 flex flex-col justify-between border-r border-slate-200 space-y-6">
                  
                  {/* Avatar */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-blue-800 shadow-lg mb-4">
                      <img 
                        src={PERSONAL_INFO.avatar} 
                        alt={PERSONAL_INFO.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>

                  {/* LIÊN HỆ */}
                  <div>
                    <div className="px-4 py-1.5 rounded-full border-2 border-blue-900 text-blue-900 font-display font-black text-sm tracking-wide text-center mb-4 uppercase">
                      Liên Hệ
                    </div>
                    
                    <div className="space-y-3 text-xs text-slate-800">
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-2">
                          <PhoneCall className="w-4 h-4 text-blue-800 flex-shrink-0" />
                          <span className="font-semibold">{PERSONAL_INFO.phone}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                          className="p-1 rounded hover:bg-slate-200 text-slate-500"
                          title="Copy số điện thoại"
                        >
                          {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-2 truncate">
                          <Mail className="w-4 h-4 text-blue-800 flex-shrink-0" />
                          <span className="font-semibold truncate">{PERSONAL_INFO.email}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                          className="p-1 rounded hover:bg-slate-200 text-slate-500 flex-shrink-0"
                          title="Copy email"
                        >
                          {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-blue-800 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{PERSONAL_INFO.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* HỌC VẤN */}
                  <div>
                    <div className="px-4 py-1.5 rounded-full border-2 border-blue-900 text-blue-900 font-display font-black text-sm tracking-wide text-center mb-4 uppercase">
                      Học Vấn
                    </div>

                    <div className="space-y-2 text-xs text-slate-800">
                      <div className="font-bold text-sm text-blue-950 uppercase">
                        Trường Đại Học Lạc Hồng
                      </div>
                      <div className="text-slate-700">
                        Chuyên ngành: <span className="font-semibold">Cơ Điện Tử</span>
                      </div>
                      <div className="pt-2">
                        <div className="font-bold text-xs uppercase text-slate-900">
                          Tình Trạng
                        </div>
                        <div className="text-slate-600">
                          Sinh viên năm 4 (Dự kiến tốt nghiệp T5/2027)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CERTIFICATE */}
                  <div>
                    <div className="px-4 py-1.5 rounded-full border-2 border-blue-900 text-blue-900 font-display font-black text-sm tracking-wide text-center mb-4 uppercase">
                      Certificate
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="font-bold text-slate-900">
                          CHỨNG CHỈ TIẾNG ANH ĐẦU RA CỦA TRƯỜNG
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                          <div className="w-[85%] h-full bg-blue-800 rounded-full" />
                        </div>
                      </div>

                      <div>
                        <div className="font-bold text-slate-900">
                          CHỨNG CHỈ SOLIDWORKS CSWA
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                          <div className="w-[95%] h-full bg-blue-800 rounded-full" />
                        </div>
                      </div>

                      <div>
                        <div className="font-bold text-slate-900">
                          CHỨNG CHỈ KỸ NĂNG MỀM 3S-5S
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                          <div className="w-[90%] h-full bg-blue-800 rounded-full" />
                        </div>
                      </div>

                      <div>
                        <div className="font-bold text-slate-900">
                          NGÔN NGỮ TRUNG HK2
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                          <div className="w-[80%] h-full bg-blue-800 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column (Deep Blue) - 7 cols */}
                <div className="sm:col-span-7 p-6 md:p-8 bg-[#0b3896] text-white flex flex-col justify-between space-y-6">
                  
                  {/* Name Header */}
                  <div className="border-b border-blue-400/30 pb-4">
                    <h2 className="text-3xl font-black font-display tracking-wider text-white">
                      VÕ MINH KIỆT
                    </h2>
                    <p className="text-xs uppercase tracking-widest text-cyan-300 font-mono mt-1">
                      Kỹ Sư Cơ Điện Tử
                    </p>
                  </div>

                  {/* VỀ TÔI */}
                  <div>
                    <div className="inline-block px-5 py-1 rounded-full border-2 border-white/80 font-display font-black text-xs tracking-wider mb-3 uppercase">
                      Về Tôi
                    </div>
                    <p className="text-xs text-slate-100 leading-relaxed pl-3 border-l-2 border-cyan-400">
                      Sinh viên năm 4 ngành Kỹ thuật Cơ điện tử, có nền tảng về thiết kế SolidWorks và am hiểu tiêu chuẩn quản lý sản xuất 3S-5S.
                    </p>
                  </div>

                  {/* KINH NGHIỆM THỰC TẬP */}
                  <div>
                    <div className="inline-block px-5 py-1 rounded-full border-2 border-white/80 font-display font-black text-xs tracking-wider mb-3 uppercase">
                      Kinh Nghiệm Thực Tập
                    </div>

                    <div className="pl-3 border-l-2 border-white/30 space-y-2">
                      <h4 className="font-bold text-xs uppercase text-cyan-200">
                        Thực Tập Công Ty Brother Sài Gòn
                      </h4>
                      <p className="text-[11px] text-slate-300 italic">
                        Địa chỉ: Đường số 7 amata, kcn, Long Bình, Đồng Nai, Việt Nam
                      </p>
                      <p className="text-xs text-slate-100 leading-relaxed">
                        • Vận hành và gia công máy may, kiểm tra hàng hóa và tuân thủ nội quy 3s5s.
                      </p>
                      <p className="text-xs text-slate-100 leading-relaxed">
                        • Phối hợp cùng đồng đội tạo ra sản phẩm không bị NG (Not Good), làm ra sản phẩm chất lượng, an toàn đến tay khách hàng.
                      </p>
                    </div>
                  </div>

                  {/* CÁC DỰ ÁN Ở TRƯỜNG ĐẠI HỌC */}
                  <div>
                    <div className="pl-3 border-l-2 border-white/30 space-y-2">
                      <div className="text-[11px] font-mono uppercase text-amber-300 font-bold">
                        Các Dự Án Ở Trường Đại Học
                      </div>
                      <h4 className="font-bold text-xs uppercase text-white">
                        Thiết Kế Thi Công Bộ Khóa Cửa Tự Động
                      </h4>
                      <p className="text-xs text-cyan-200">
                        • Vai trò: Trưởng nhóm | Lắp đặt phần cứng và lập trình STM32F103C8T6A.
                      </p>
                    </div>
                  </div>

                  {/* SKILLS */}
                  <div>
                    <div className="inline-block px-5 py-1 rounded-full border-2 border-white/80 font-display font-black text-xs tracking-wider mb-3 uppercase">
                      Skills
                    </div>

                    <ul className="text-xs space-y-2 pl-3">
                      <li className="flex items-start gap-1.5">
                        <span className="text-cyan-300 font-bold">•</span>
                        <span><strong>Thiết kế cơ khí:</strong> SolidWorks</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-cyan-300 font-bold">•</span>
                        <span><strong>Kỹ năng sản xuất:</strong> Tiêu chuẩn 3S5S, làm việc nhóm dự án</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-cyan-300 font-bold">•</span>
                        <span><strong>Tin học & Ngoại ngữ:</strong> Word, Excel, PowerPoint; Tiếng Anh</span>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>
            </div>
          )}

        </div>

        {/* Contact Recruiter Card */}
        <div className="mt-14 glass-panel-glow rounded-3xl p-6 md:p-8 border border-cyan-500/30 text-center max-w-3xl mx-auto shadow-2xl">
          <h3 className="text-lg md:text-xl font-bold font-display text-white mb-2">
            Kết Nối Tuyển Dụng Với Võ Minh Kiệt
          </h3>
          <p className="text-xs text-slate-300 mb-6">
            Mọi thông tin liên hệ được cung cấp chính xác từ CV. Sẵn sàng sắp xếp lịch phỏng vấn và trao đổi công việc.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Gọi: {PERSONAL_INFO.phone}</span>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Gửi Email</span>
            </a>

            <a
              href={PERSONAL_INFO.socials.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Nhắn Zalo</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
