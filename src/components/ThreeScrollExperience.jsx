import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  Sparkles, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Cpu, 
  ChevronDown, 
  ArrowRight,
  ShieldCheck,
  FileText,
  Box
} from 'lucide-react';

export default function ThreeScrollExperience({ setActivePage }) {
  const containerRef = useRef(null);
  const canvasMountRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Exact timeline configuration: 4 distinct non-overlapping milestones
  const steps = [
    {
      step: 1,
      center: 0.08,
      halfWidth: 0.09,
      align: 'left',
      badge: "Kỹ Sư Cơ Điện Tử",
      title: "VÕ MINH KIỆT",
      subtitle: "Sinh viên năm 4 • Đại học Lạc Hồng",
      desc: "Nền tảng vững chắc về mô hình hóa cơ khí 3D CAD trên SolidWorks, làm chủ lập trình vi điều khiển ARM STM32 và am hiểu quy trình sản xuất công nghiệp 3S-5S.",
      faceLabel: "Mặt Trước: Chân Dung Đêm",
      stats: [
        { label: "Chuyên ngành", val: "Cơ Điện Tử" },
        { label: "Tốt nghiệp", val: "T5/2027" },
        { label: "Trạng thái", val: "Sẵn sàng làm việc" }
      ],
      icon: Cpu,
      color: "cyan"
    },
    {
      step: 2,
      center: 0.38,
      halfWidth: 0.09,
      align: 'right',
      badge: "Học Vấn Trọng Tâm",
      title: "Đại Học Lạc Hồng (LHU)",
      subtitle: "Khoa Cơ Điện Tử • Khóa 2023 - 2027",
      desc: "Tiếp cận chương trình đào tạo kỹ thuật ứng dụng thực tiễn: Cơ học lý thuyết, Chi tiết máy, Đồ họa kỹ thuật CAD, Hệ thống nhúng vi điều khiển và Tự động hóa dây chuyền.",
      faceLabel: "Mặt Phải: Sinh Viên LHU",
      stats: [
        { label: "Chương trình", val: "Kỹ sư 4 năm" },
        { label: "Ngoại ngữ", val: "Tiếng Anh & Tiếng Trung" },
        { label: "Địa bàn", val: "Đồng Nai" }
      ],
      icon: GraduationCap,
      color: "blue"
    },
    {
      step: 3,
      center: 0.66,
      halfWidth: 0.09,
      align: 'left',
      badge: "Chứng Chỉ Quốc Tế",
      title: "SolidWorks CSWA Quốc Tế",
      subtitle: "Certified SolidWorks Associate (Dassault Systèmes)",
      desc: "Khẳng định chuyên môn mô hình hóa chi tiết phức tạp, lắp ráp cụm máy kiểm tra xung đột động học và xuất bản vẽ gia công 2D đạt chuẩn kỹ thuật quốc tế ISO/JIS.",
      faceLabel: "Mặt Sau: Tinh Thần Đồng Đội",
      stats: [
        { label: "Xác thực", val: "Dassault Systèmes" },
        { label: "Kỹ năng", val: "Part & Assembly" },
        { label: "Độ chính xác", val: "Dung sai cơ khí" }
      ],
      icon: Award,
      color: "amber"
    },
    {
      step: 4,
      center: 0.92,
      halfWidth: 0.09,
      align: 'right',
      badge: "Kinh Nghiệm Thực Chiến",
      title: "Thực Tập Brother Sài Gòn",
      subtitle: "KCN Amata, Long Bình, Đồng Nai • Chuẩn 3S-5S",
      desc: "Trực tiếp vận hành máy may công nghiệp tiêu chuẩn Nhật Bản. Tuân thủ nghiêm ngặt nguyên tắc Zero-Defect (Không tạo hàng NG - Not Good), đảm bảo an toàn tuyệt đối và năng suất.",
      faceLabel: "Mặt Trái: Đời Thường & Năng Động",
      stats: [
        { label: "Nhà máy", val: "Brother Amata" },
        { label: "Tiêu chuẩn", val: "3S-5S Nhật Bản" },
        { label: "Mục tiêu", val: "Zero NG Defect" }
      ],
      icon: Briefcase,
      color: "emerald"
    }
  ];

  // Continuous scroll tracking
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current) return;
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = containerRef.current.getBoundingClientRect();
          const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
          if (totalHeight > 0) {
            const scrolled = -rect.top;
            const progress = Math.max(0, Math.min(1, scrolled / totalHeight));
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three.js 3D Cyber Cube: Combines 360° Rotation + Dynamic Vertical Gliding Swoop!
  useEffect(() => {
    if (!canvasMountRef.current) return;
    const mount = canvasMountRef.current;
    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Dynamic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.45);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00f2fe, 4.2);
    keyLight.position.set(15, 18, 16);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf59e0b, 3.2);
    rimLight.position.set(-15, -12, -10);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 2.5, 45);
    pointLight.position.set(0, 0, 14);
    scene.add(pointLight);

    // Main 3D Cube Group
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    // 1. Equal 3D Cube Geometry (8.0 x 8.0 x 8.0)
    const cubeSize = 8.0;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    // Texture Loader for 4 Distinct Authentic Photos of Kiệt
    const textureLoader = new THREE.TextureLoader();

    // Face 4 (+Z Front): Hero Night Portrait
    const texFront = textureLoader.load('./images/avatar_night.jpg');
    texFront.colorSpace = THREE.SRGBColorSpace;

    // Face 5 (-Z Back): Friends & Billiards
    const texBack = textureLoader.load('./images/kiet_billiards.png');
    texBack.colorSpace = THREE.SRGBColorSpace;

    // Face 0 (+X Right): Official LHU Student Photo
    const texRight = textureLoader.load('./images/kiet_official.png');
    texRight.colorSpace = THREE.SRGBColorSpace;

    // Face 1 (-X Left): Casual Chill Portrait
    const texLeft = textureLoader.load('./images/kiet_chill.jpg');
    texLeft.colorSpace = THREE.SRGBColorSpace;

    // Top & Bottom: Brushed Mechatronic Titanium Plates
    const topBottomMat = new THREE.MeshStandardMaterial({
      color: 0x091220,
      metalness: 0.95,
      roughness: 0.15,
    });

    // Box Materials Array: [+X, -X, +Y, -Y, +Z, -Z]
    const cubeMaterials = [
      new THREE.MeshStandardMaterial({ map: texRight, roughness: 0.25 }), // Right (+X): LHU Official
      new THREE.MeshStandardMaterial({ map: texLeft, roughness: 0.25 }),  // Left (-X): Casual Chill
      topBottomMat,                                                       // Top (+Y): Metallic Plate
      topBottomMat,                                                       // Bottom (-Y): Metallic Plate
      new THREE.MeshStandardMaterial({ map: texFront, roughness: 0.25 }), // Front (+Z): Hero Portrait
      new THREE.MeshStandardMaterial({ map: texBack, roughness: 0.25 }),  // Back (-Z): Billiards & Team
    ];

    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMaterials);
    cubeGroup.add(cubeMesh);

    // 2. Glowing Neon Edge Wireframe for the Cube
    const edgesGeo = new THREE.EdgesGeometry(cubeGeo);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0x00f2fe, linewidth: 2.5 });
    const edgesLine = new THREE.LineSegments(edgesGeo, edgesMat);
    cubeGroup.add(edgesLine);

    // 3. Rotating Mechatronic Gear Rings orbiting the Cube
    const ringGeo1 = new THREE.TorusGeometry(7.2, 0.09, 16, 120);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.85,
      roughness: 0.2,
      transparent: true,
      opacity: 0.65
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2;
    cubeGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(8.2, 0.07, 16, 120);
    const ringMat2 = new THREE.MeshStandardMaterial({ 
      color: 0xf59e0b, 
      metalness: 0.85,
      transparent: true, 
      opacity: 0.5 
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    cubeGroup.add(ring2);

    // 4. Cyber Hologram Base Pedestal
    const baseGeo = new THREE.CylinderGeometry(5.8, 6.6, 0.6, 36);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x09111e,
      metalness: 0.9,
      roughness: 0.25
    });
    const pedestal = new THREE.Mesh(baseGeo, baseMat);
    pedestal.position.y = -5.4;
    cubeGroup.add(pedestal);

    // 5. Floating background particle swarm
    const pCount = 160;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 70;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 55;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 35 - 5;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 1.8,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particleField = new THREE.Points(pGeo, pMat);
    scene.add(particleField);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!canvasMountRef.current) return;
      width = canvasMountRef.current.clientWidth || window.innerWidth;
      height = canvasMountRef.current.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop: SIMULTANEOUS 3D ROTATION + VERTICAL GLIDE SWOOP (LƯỚT LÊN & XUỐNG)
    let animId;
    const clock = new THREE.Clock();

    let currentX = 0;
    let currentY = 0;
    let currentZ = 0;
    let currentRotY = 0;
    let currentRotX = 0;
    let currentP = 0;
    let prevP = 0;

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const time = clock.getElapsedTime();
      const isMobile = window.innerWidth < 768;

      const targetP = parseFloat(containerRef.current?.getAttribute('data-progress') || '0');
      
      // Calculate scroll speed/velocity to apply aerodynamic momentum tilt!
      const scrollVelocity = (targetP - prevP);
      prevP += (targetP - prevP) * 0.1;

      // Smooth interpolation of scroll progress (creates buttery momentum in BOTH directions)
      currentP += (targetP - currentP) * 0.085;

      // 1. VERTICAL GLIDE SWOOP (Hiệu ứng LƯỚT XUỐNG / LƯỚT LÊN):
      // As user scrolls down (p: 0 -> 1): Cube glides down from +3.2 (high) to -3.2 (low)
      // As user scrolls up (p: 1 -> 0): Cube glides smoothly back up from -3.2 to +3.2!
      const verticalGlide = 3.2 - (currentP * 6.4);
      // Plus subtle levitation floating wave
      const floatWave = Math.sin(time * 1.6) * 0.18;
      const targetY = verticalGlide + floatWave;

      // 2. HORIZONTAL WEAVING (Dạt trái / dạt phải để nhường chỗ cho thẻ thông tin):
      const targetX = isMobile ? 0 : Math.cos(currentP * Math.PI * 3.3) * 4.6;

      // 3. DEPTH ZOOM (Hút gần và xa):
      const targetZ = Math.sin(currentP * Math.PI) * 1.6;

      // 4. CONTINUOUS 360° ROTATION (Xoay tròn 4 mặt ảnh):
      const targetRotY = (currentP * Math.PI * 2.6) - 0.2;

      // 5. AERODYNAMIC INERTIAL PITCH TILT (Nghiêng khí động học khi lướt xuống/lên):
      // When scrolling down fast (scrollVelocity > 0), cube pitches forward!
      // When scrolling up fast (scrollVelocity < 0), cube pitches backward!
      const pitchTilt = scrollVelocity * 3.5;
      const targetRotX = Math.sin(currentP * Math.PI * 2.5) * 0.12 + pitchTilt + (mouseY * -0.12);

      // Smooth damping interpolation (lerp)
      currentX += (targetX + mouseX * 0.7 - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      currentZ += (targetZ - currentZ) * 0.08;
      currentRotY += (targetRotY + mouseX * 0.25 - currentRotY) * 0.08;
      currentRotX += (targetRotX - currentRotX) * 0.08;

      cubeGroup.position.set(currentX, currentY, currentZ);
      cubeGroup.rotation.y = currentRotY;
      cubeGroup.rotation.x = currentRotX;

      // Orbiting mechatronic rings spin continuously
      ring1.rotation.z = time * 0.9;
      ring2.rotation.x = time * 0.7;
      particleField.rotation.y = time * 0.04;

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.setAttribute('data-progress', scrollProgress.toString());
    }
  }, [scrollProgress]);

  const scrollToStep = (targetCenter) => {
    if (!containerRef.current) return;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = containerRef.current.offsetTop + targetCenter * totalHeight + 10;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const getActiveIndex = () => {
    if (scrollProgress < 0.23) return 0;
    if (scrollProgress < 0.52) return 1;
    if (scrollProgress < 0.79) return 2;
    return 3;
  };
  const activeIdx = getActiveIndex();

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[400vh] bg-gradient-to-b from-[#070b12] via-[#09111c] to-[#070b12]"
    >
      {/* Sticky 3D Viewport (Pins continuously throughout the 400vh scroll) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-between pointer-events-none">
        
        {/* Full-screen Three.js 3D Canvas */}
        <div 
          ref={canvasMountRef} 
          className="absolute inset-0 z-0 pointer-events-auto cursor-grab active:cursor-grabbing" 
        />

        {/* Ambient Radial Cyber Lights */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

        {/* Foreground Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between pt-24 pb-16 pointer-events-none">
          
          {/* Top Step Indicators Pill */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold backdrop-blur-md">
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hộp 3D Vừa Lướt Lên/Xuống Vừa Xoay 360°</span>
            </div>

            {/* Quick Step Jump Tabs */}
            <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-xl glass-panel border border-cyan-500/30">
              {steps.map((st, i) => (
                <button
                  key={st.step}
                  onClick={() => scrollToStep(st.center)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    activeIdx === i
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 scale-105'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  0{st.step}
                </button>
              ))}
            </div>
          </div>

          {/* Bi-directional Non-Overlapping Story Cards */}
          <div className="relative w-full h-[450px] pointer-events-none">
            {steps.map((st) => {
              const StepIcon = st.icon;
              const dist = Math.abs(scrollProgress - st.center);

              if (dist >= st.halfWidth) {
                return null;
              }

              const normDist = dist / st.halfWidth;
              const opacity = Math.cos(normDist * (Math.PI / 2));
              const translateY = (scrollProgress - st.center) * -120;

              return (
                <div
                  key={st.step}
                  style={{
                    opacity: opacity,
                    transform: `translateY(${translateY}px) scale(${0.94 + opacity * 0.06})`,
                    pointerEvents: opacity > 0.5 ? 'auto' : 'none'
                  }}
                  className={`absolute inset-0 flex items-center ${
                    st.align === 'left' ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className="w-full max-w-lg glass-panel-glow rounded-3xl p-6 md:p-8 border border-cyan-500/40 shadow-2xl backdrop-blur-xl">
                    
                    {/* Step badge & 3D face label */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
                        <StepIcon className="w-3.5 h-3.5" />
                        <span>0{st.step} • {st.badge}</span>
                      </div>
                      <span className="text-[11px] font-mono text-amber-400 font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                        {st.faceLabel}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-wide mb-1">
                      {st.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-cyan-300 font-mono mb-4">
                      {st.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                      {st.desc}
                    </p>

                    {/* Dynamic Stats */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono mb-6">
                      {st.stats.map((s, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-[10px] text-slate-400 uppercase">
                            {s.label}
                          </div>
                          <div className="text-xs font-bold text-white truncate mt-0.5">
                            {s.val}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      {st.step === 1 && (
                        <button
                          onClick={() => setActivePage('journey')}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
                        >
                          <span>Xem Lộ Trình Đào Tạo</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {st.step === 2 && (
                        <button
                          onClick={() => setActivePage('journey')}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
                        >
                          <span>Khám Phá ĐH Lạc Hồng</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {st.step === 3 && (
                        <button
                          onClick={() => setActivePage('projects')}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
                        >
                          <span>Xem Dự Án SolidWorks</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {st.step === 4 && (
                        <div className="flex gap-2 w-full">
                          <button
                            onClick={() => setActivePage('cv')}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Xem & Tải CV Ngay</span>
                          </button>
                          <a
                            href={PERSONAL_INFO.socials.phone}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all"
                          >
                            <span>Gọi Tuyển Dụng</span>
                          </a>
                        </div>
                      )}

                      <span className="text-[11px] font-mono text-slate-400 ml-auto">
                        {st.step < 4 ? 'Cuộn tiếp ▾' : 'Cuộn lên ▴'}
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Scroll Progress Bar */}
          <div className="w-full flex items-center justify-between gap-4 pointer-events-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span>Khối 3D lướt dọc theo màn hình và xoay tương tác</span>
            </div>

            <div className="flex-1 max-w-xs h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 rounded-full transition-all duration-100"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>

            <span className="text-xs font-mono font-bold text-cyan-300 w-10 text-right">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
