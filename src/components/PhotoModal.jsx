import React from 'react';
import { X, Sparkles, ZoomIn, Download, ExternalLink } from 'lucide-react';

export default function PhotoModal({ photo, onClose }) {
  if (!photo) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full max-h-[90vh] glass-panel-glow rounded-3xl border border-cyan-500/40 p-4 md:p-6 overflow-hidden flex flex-col md:flex-row gap-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-red-500/80 hover:border-red-500 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image preview */}
        <div className="flex-1 min-h-[300px] md:min-h-[460px] max-h-[500px] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border border-cyan-500/20 relative group">
          <img 
            src={photo.src} 
            alt={photo.title}
            className="w-full h-full object-contain"
          />
          <a
            href={photo.src}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur border border-white/20 text-xs text-white flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Xem gốc</span>
          </a>
        </div>

        {/* Details column */}
        <div className="w-full md:w-80 flex flex-col justify-between py-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{photo.tag}</span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-3">
              {photo.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {photo.desc}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2 font-mono">
              <div className="flex justify-between">
                <span>Nhân vật:</span>
                <span className="text-cyan-300 font-sans font-semibold">Võ Minh Kiệt</span>
              </div>
              <div className="flex justify-between">
                <span>Chuyên ngành:</span>
                <span className="text-slate-200 font-sans">Kỹ thuật Cơ Điện Tử</span>
              </div>
              <div className="flex justify-between">
                <span>Trường:</span>
                <span className="text-slate-200 font-sans">Đại học Lạc Hồng</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex gap-3">
            <a
              href={photo.src}
              download
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25"
            >
              <Download className="w-4 h-4" />
              <span>Tải Ảnh Về</span>
            </a>
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm border border-slate-700 transition-all"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
