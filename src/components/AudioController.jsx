import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from 'lucide-react';

export default function AudioController() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [isMuted, setIsMuted] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    // Attempt direct autoplay
    const attemptPlay = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setIsAutoplayBlocked(false);
        })
        .catch(() => {
          // Blocked by browser autoplay security policy
          setIsAutoplayBlocked(true);
          setIsPlaying(false);
        });
    };

    attemptPlay();

    // Unlock audio on first user gesture
    const unlockAudio = () => {
      if (audio.paused) {
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setIsAutoplayBlocked(false);
          })
          .catch((err) => console.log('Autoplay unlock retry:', err));
      }
      // Remove listeners once unlocked
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('scroll', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setIsAutoplayBlocked(false);
      });
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (newVol === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="./audio/bg_music.mp3"
        loop
        preload="auto"
      />

      {/* Floating Audio Controller */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 pointer-events-auto">
        {/* Friendly Autoplay prompt toast if blocked by browser policy */}
        {isAutoplayBlocked && (
          <button
            onClick={togglePlay}
            className="animate-bounce flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-2xl border border-cyan-300 shadow-cyan-500/40 hover:scale-105 transition-transform"
          >
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>Chạm để bật nhạc nền 🎵</span>
          </button>
        )}

        {/* Main Floating Pill */}
        <div className="glass-panel-glow rounded-2xl p-2 px-3 border border-cyan-500/40 shadow-2xl flex items-center gap-3 backdrop-blur-xl">
          {/* Animated equalizer waves */}
          <button
            onClick={togglePlay}
            className="flex items-center gap-1 h-7 px-1.5 rounded-lg hover:bg-white/10 transition-colors"
            title={isPlaying ? "Tạm dừng" : "Phát nhạc"}
          >
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-5 w-5 justify-center">
                <span className="w-1 bg-cyan-400 rounded-full animate-wave-1"></span>
                <span className="w-1 bg-cyan-300 rounded-full animate-wave-2"></span>
                <span className="w-1 bg-cyan-400 rounded-full animate-wave-3"></span>
                <span className="w-1 bg-amber-400 rounded-full animate-wave-4"></span>
              </div>
            ) : (
              <Music className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Track name & Play/Pause */}
          <div 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="cursor-pointer select-none text-left"
          >
            <div className="text-[11px] font-mono text-cyan-300 font-bold flex items-center gap-1.5">
              <span>BGM Portfolio</span>
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            </div>
            <div className="text-[10px] text-slate-400 max-w-[110px] truncate">
              {isPlaying ? 'Đang phát...' : 'Đã tạm dừng'}
            </div>
          </div>

          {/* Quick Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/30 transition-all"
            aria-label={isPlaying ? "Dừng" : "Phát"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label={isMuted ? "Bật tiếng" : "Tắt tiếng"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Volume slider when expanded */}
          {isExpanded && (
            <div className="flex items-center gap-1 pl-1 border-l border-cyan-500/20">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] font-mono text-slate-400 w-6">
                {Math.round(volume * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
