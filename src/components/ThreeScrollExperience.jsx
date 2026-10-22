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
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function ThreeScrollExperience({ setActivePage }) {
  const containerRef = useRef(null);
  const canvasMountRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // Milestone data for the scroll sequence
  const steps = [
    {
      step: 1,
      badge: "Kỹ Sư Cơ Điện Tử",
      title: "VÕ MINH KIỆT",
      subtitle: "Sinh viên năm 4 • Đại học Lạc Hồng",
      desc: "Nền tảng vững chắc về mô hình hóa cơ khí 3D CAD trên SolidWorks, làm chủ lập trình vi điều khiển ARM STM32 và am hiểu quy trình sản xuất công nghiệp 3S-5S.",
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
      badge: "Học Vấn Trọng Tâm",
      title: "Đại Học Lạc Hồng (LHU)",
      subtitle: "Khoa Cơ Điện Tử • Khóa 2023 - 2027",
      desc: "Tiếp cận chương trình đào tạo kỹ thuật ứng dụng thực tiễn: Cơ học lý thuyết, Chi tiết máy, Đồ họa kỹ thuật CAD, Hệ thống nhúng vi điều khiển và Tự động hóa dây chuyền.",
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
      badge: "Chứng Chỉ Quốc Tế",
      title: "SolidWorks CSWA Quốc Tế",
      subtitle: "Certified SolidWorks Associate (Dassault Systèmes)",
      desc: "Khẳng định chuyên môn mô hình hóa chi tiết phức tạp, lắp ráp cụm máy kiểm tra xung đột động học và xuất bản vẽ gia công 2D đạt chuẩn kỹ thuật quốc tế ISO/JIS.",
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
      badge: "Kinh Nghiệm Thực Chiến",
      title: "Thực Tập Brother Sài Gòn",
      subtitle: "KCN Amata, Long Bình, Đồng Nai • Chuẩn 3S-5S",
      desc: "Trực tiếp vận hành máy may công nghiệp tiêu chuẩn Nhật Bản. Tuân thủ nghiêm ngặt nguyên tắc Zero-Defect (Không tạo hàng NG - Not Good), đảm bảo an toàn tuyệt đối và năng suất.",
      stats: [
        { label: "Nhà máy", val: "Brother Amata" },
        { label: "Tiêu chuẩn", val: "3S-5S Nhật Bản" },
        { label: "Mục tiêu", val: "Zero NG Defect" }
      ],
      icon: Briefcase,
      color: "emerald"
    }
  ];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (containerHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / containerHeight));
      setScrollProgress(progress);

      // Determine active step (0 to 3)
      const currentStep = Math.min(3, Math.floor(progress * 4));
      setActiveStep(currentStep);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three.js 3D Solid Model & Scene
  useEffect(() => {
    if (!canvasMountRef.current) return;
    const mount = canvasMountRef.current;
    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00f2fe, 3.5);
    keyLight.position.set(12, 16, 14);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf59e0b, 2.5);
    rimLight.position.set(-12, -10, -8);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 2, 40);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Main 3D Solid Character Plaque / Monolith Group
    const monolithGroup = new THREE.Group();
    scene.add(monolithGroup);

    // 1. Solid Block Geometry with Depth (Thickness)
    const blockWidth = 7.5;
    const blockHeight = 10.5;
    const blockDepth = 0.9;
    const blockGeo = new THREE.BoxGeometry(blockWidth, blockHeight, blockDepth);

    // Texture Loader for Kiệt's Portrait
    const textureLoader = new THREE.TextureLoader();
    const portraitTex = textureLoader.load('./images/avatar_night.jpg');
    portraitTex.colorSpace = THREE.SRGBColorSpace;

    // Multi-Material for Box: [right, left, top, bottom, front, back]
    const metallicSideMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.15,
    });

    const frontMat = new THREE.MeshStandardMaterial({
      map: portraitTex,
      metalness: 0.1,
      roughness: 0.35,
    });

    const backMat = new THREE.MeshStandardMaterial({
      color: 0x070d18,
      metalness: 0.95,
      roughness: 0.2,
    });

    const monolithMesh = new THREE.Mesh(blockGeo, [
      metallicSideMat, // right
      metallicSideMat, // left
      metallicSideMat, // top
      metallicSideMat, // bottom
      frontMat,        // front
      backMat          // back
    ]);
    monolithGroup.add(monolithMesh);

    // Glowing Neon Edge Lines for the Solid Model
    const edgesGeo = new THREE.EdgesGeometry(blockGeo);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0x00f2fe, linewidth: 2 });
    const edgesLine = new THREE.LineSegments(edgesGeo, edgesMat);
    monolithGroup.add(edgesLine);

    // 2. Mechatronic Rotating Gear / Circuit Rings surrounding the 3D model
    const ringGeo = new THREE.TorusGeometry(7.8, 0.08, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.6
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2;
    monolithGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(8.8, 0.06, 16, 100),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.45 })
    );
    ring2.rotation.y = Math.PI / 3;
    monolithGroup.add(ring2);

    // 3. Cyber Hologram Base Pedestal
    const baseGeo = new THREE.CylinderGeometry(5.5, 6.2, 0.5, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x09111e,
      metalness: 0.85,
      roughness: 0.3
    });
    const pedestal = new THREE.Mesh(baseGeo, baseMat);
    pedestal.position.y = -5.8;
    monolithGroup.add(pedestal);

    // Background floating particle swarm
    const pCount = 140;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 60;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
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

    // Mouse parallax variables
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize handler
    const onResize = () => {
      if (!canvasMountRef.current) return;
      width = canvasMountRef.current.clientWidth || window.innerWidth;
      height = canvasMountRef.current.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // Animation loop with smooth scroll mapping
    let animId;
    const clock = new THREE.Clock();

    // Target transformation state for interpolation
    let currentX = 0;
    let currentY = 0;
    let currentZ = 0;
    let currentRotY = 0;
    let currentRotX = 0;

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const time = clock.getElapsedTime();
      const isMobile = window.innerWidth < 768;

      // Extract current scroll percentage from ref
      const p = parseFloat(containerRef.current?.getAttribute('data-progress') || 0);

      // Define 3D transformation choreography based on scroll progression (0.0 to 1.0)
      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;
      let targetRotY = 0;
      let targetRotX = 0;

      if (p < 0.25) {
        // Step 1: Centered / Intro stage
        const localP = p / 0.25;
        targetX = isMobile ? 0 : 3.8;
        targetY = Math.sin(time * 1.5) * 0.2;
        targetZ = 0;
        targetRotY = -0.25 + Math.sin(time * 0.8) * 0.08;
        targetRotX = 0.05;
      } else if (p < 0.5) {
        // Step 2: Lạc Hồng University stage - Rotate left, expose 3D thickness and side
        const localP = (p - 0.25) / 0.25;
        targetX = isMobile ? 0 : -4.2;
        targetY = Math.sin(time * 1.5) * 0.2;
        targetZ = 1.0;
        targetRotY = 0.55 + Math.cos(time * 0.7) * 0.08;
        targetRotX = -0.08;
      } else if (p < 0.75) {
        // Step 3: SolidWorks CSWA stage - Shift right, gear rings tilt dynamically
        const localP = (p - 0.5) / 0.25;
        targetX = isMobile ? 0 : 4.2;
        targetY = Math.sin(time * 1.5) * 0.2;
        targetZ = 0.5;
        targetRotY = -0.65 + Math.sin(time * 0.7) * 0.08;
        targetRotX = 0.12;
      } else {
        // Step 4: Brother Sài Gòn & Ready stage - Grand 3D showcase
        const localP = (p - 0.75) / 0.25;
        targetX = isMobile ? 0 : -3.8;
        targetY = 0.2 + Math.sin(time * 1.5) * 0.15;
        targetZ = 1.2;
        targetRotY = 0.35 + Math.sin(time * 0.6) * 0.06;
        targetRotX = 0.04;
      }

      // Smooth damping interpolation (lerp)
      currentX += (targetX + mouseX * 0.8 - currentX) * 0.08;
      currentY += (targetY - mouseY * 0.6 - currentY) * 0.08;
      currentZ += (targetZ - currentZ) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;
      currentRotX += (targetRotX - currentRotX) * 0.08;

      monolithGroup.position.set(currentX, currentY, currentZ);
      monolithGroup.rotation.y = currentRotY;
      monolithGroup.rotation.x = currentRotX;

      // Continuous mechatronic rotation of rings
      ring1.rotation.z = time * 0.8;
      ring2.rotation.x = time * 0.6;
      particleField.rotation.y = time * 0.05;

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

  // Update data attribute for animation loop
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.setAttribute('data-progress', scrollProgress.toString());
    }
  }, [scrollProgress]);

  const scrollToStep = (idx) => {
    if (!containerRef.current) return;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = containerRef.current.offsetTop + (idx / 4) * containerHeight + 20;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const activeData = steps[activeStep];
  const StepIcon = activeData.icon;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[360vh] bg-gradient-to-b from-[#070b12] via-[#09111c] to-[#070b12]"
    >
      {/* Sticky 3D Viewport (Pins for the duration of the 360vh scroll) */}
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
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-24 pointer-events-none">
          
          {/* Top Step Indicators Pill */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span>3D Scroll Interactive Showcase • Cuộn chuột để xem chi tiết</span>
            </div>

            {/* Quick Step Jump Tabs */}
            <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-xl glass-panel border border-cyan-500/30">
              {steps.map((st, i) => (
                <button
                  key={st.step}
                  onClick={() => scrollToStep(i)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    activeStep === i
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 scale-105'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  0{st.step}
                </button>
              ))}
            </div>
          </div>

          {/* Main Informational Story Card (Transitions based on scroll step) */}
          <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center pointer-events-none transition-all duration-500`}>
            
            {/* The text card alternates sides: Left when 3D model is on Right, Right when 3D model is on Left */}
            <div className={`md:col-span-6 pointer-events-auto ${
              activeStep % 2 === 0 ? 'md:order-1' : 'md:order-2 md:col-start-7'
            }`}>
              <div className="glass-panel-glow rounded-3xl p-6 md:p-8 border border-cyan-500/40 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                
                {/* Step badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
                    <StepIcon className="w-3.5 h-3.5" />
                    <span>0{activeData.step} • {activeData.badge}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {Math.round(scrollProgress * 100)}% Lộ trình
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-wide mb-1">
                  {activeData.title}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-cyan-300 font-mono mb-4">
                  {activeData.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {activeData.desc}
                </p>

                {/* Dynamic Stats for this milestone */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono mb-6">
                  {activeData.stats.map((s, idx) => (
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
                  {activeStep === 0 && (
                    <button
                      onClick={() => setActivePage('journey')}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
                    >
                      <span>Xem Lộ Trình Đào Tạo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {activeStep === 1 && (
                    <button
                      onClick={() => setActivePage('journey')}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
                    >
                      <span>Khám Phá ĐH Lạc Hồng</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {activeStep === 2 && (
                    <button
                      onClick={() => setActivePage('projects')}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
                    >
                      <span>Xem Dự Án SolidWorks</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {activeStep === 3 && (
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

                  {activeStep < 3 && (
                    <button
                      onClick={() => scrollToStep(activeStep + 1)}
                      className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
                    >
                      <span>Cuộn tiếp</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Scroll Progress Bar */}
          <div className="w-full flex items-center justify-between gap-4 pointer-events-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span>Tiếp tục cuộn xuống để xoay mô hình 3D</span>
            </div>

            <div className="flex-1 max-w-xs h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 rounded-full transition-all duration-150"
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
