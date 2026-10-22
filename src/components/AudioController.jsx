import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from 'lucide-react';

export default function AudioController() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('audio_volume');
    return saved ? parseFloat(saved) : 0.5;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [needsUserGesture, setNeedsUserGesture] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    // 1. First attempt: Direct unmuted play
    const startAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setNeedsUserGesture(false);
      } catch (err) {
        console.log('Browser blocked unmuted autoplay, starting muted fallback + gesture unlock:', err.name);
        setNeedsUserGesture(true);

        // 2. Fallback: Start muted playback immediately (browsers always permit muted autoplay!)
        audio.muted = true;
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (e) {
          // If even muted is blocked, we wait for gesture
        }

        // 3. Setup instant unlock on first gesture (wheel, scroll, click, touch, keydown)
        const unlockSound = () => {
          if (!audio) return;
          audio.muted = false;
          audio.volume = volume;
          audio.play()
            .then(() => {
              setIsPlaying(true);
              setNeedsUserGesture(false);
              setIsMuted(false);
            })
            .catch((e) => console.log('Unlock retry:', e));

          cleanupListeners();
        };

        const cleanupListeners = () => {
          window.removeEventListener('click', unlockSound);
          window.removeEventListener('pointerdown', unlockSound);
          window.removeEventListener('wheel', unlockSound);
          window.removeEventListener('scroll', unlockSound);
          window.removeEventListener('keydown', unlockSound);
          window.removeEventListener('touchstart', unlockSound);
        };

        window.addEventListener('click', unlockSound, { once: true });
        window.addEventListener('pointerdown', unlockSound, { once: true });
        window.addEventListener('wheel', unlockSound, { once: true });
        window.addEventListener('scroll', unlockSound, { once: true });
        window.addEventListener('keydown', unlockSound, { once: true });
        window.addEventListener('touchstart', unlockSound, { once: true });
      }
    };

    startAudio();
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !audio.paused && !audio.muted) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      audio.volume = volume;
      audio.play().then(() => {
        setIsPlaying(true);
        setNeedsUserGesture(false);
        setIsMuted(false);
      });
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    localStorage.setItem('audio_volume', newVol.toString());
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (newVol === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted || audio.muted) {
      audio.muted = false;
      setIsMuted(false);
      if (audio.paused) {
        audio.play().then(() => setIsPlaying(true));
      }
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
        
        {/* Pulsating Toast Banner if Browser requires gesture */}
        {needsUserGesture && (
          <button
            onClick={togglePlay}
            className="animate-bounce flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 font-black text-xs shadow-2xl border-2 border-white/60 shadow-cyan-500/50 hover:scale-105 transition-all"
          >
            <Sparkles className="w-4 h-4 animate-spin-slow text-slate-950" />
            <span>🎵 Nhấn hoặc cuộn chuột để bật nhạc nền</span>
          </button>
        )}

        {/* Main Floating Audio Pill */}
        <div className="glass-panel-glow rounded-2xl p-2 px-3 border border-cyan-500/40 shadow-2xl flex items-center gap-3 backdrop-blur-xl">
          {/* Animated sound waves */}
          <button
            onClick={togglePlay}
            className="flex items-center gap-1 h-7 px-1.5 rounded-lg hover:bg-white/10 transition-colors"
            title={isPlaying && !isMuted ? "Tạm dừng" : "Phát nhạc"}
          >
            {isPlaying && !isMuted ? (
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

          {/* Track label */}
          <div 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="cursor-pointer select-none text-left"
          >
            <div className="text-[11px] font-mono text-cyan-300 font-bold flex items-center gap-1.5">
              <span>BGM Portfolio</span>
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying && !isMuted ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            </div>
            <div className="text-[10px] text-slate-400 max-w-[110px] truncate">
              {isPlaying && !isMuted ? 'Đang phát...' : 'Tạm dừng'}
            </div>
          </div>

          {/* Quick Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/30 transition-all"
            aria-label={isPlaying && !isMuted ? "Dừng" : "Phát"}
          >
            {isPlaying && !isMuted ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
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
