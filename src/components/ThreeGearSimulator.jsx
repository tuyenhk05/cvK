import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Cog, Zap, RotateCw, Eye } from 'lucide-react';

export default function ThreeGearSimulator() {
  const mountRef = useRef(null);
  const [speed, setSpeed] = useState(1);
  const [wireframe, setWireframe] = useState(false);
  const speedRef = useRef(1);
  speedRef.current = speed;

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f2fe, 3);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 2);
    dirLight2.position.set(-10, -10, -5);
    scene.add(dirLight2);

    // Helper function to build 3D cogwheel / gear
    function createGear(radius, teeth, depth, colorHex) {
      const shape = new THREE.Shape();
      const toothDepth = radius * 0.22;
      const innerRadius = radius - toothDepth;

      for (let i = 0; i < teeth; i++) {
        const a1 = (i / teeth) * Math.PI * 2;
        const a2 = ((i + 0.25) / teeth) * Math.PI * 2;
        const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
        const a4 = ((i + 0.75) / teeth) * Math.PI * 2;

        const x1 = Math.cos(a1) * innerRadius;
        const y1 = Math.sin(a1) * innerRadius;
        const x2 = Math.cos(a2) * radius;
        const y2 = Math.sin(a2) * radius;
        const x3 = Math.cos(a3) * radius;
        const y3 = Math.sin(a3) * radius;
        const x4 = Math.cos(a4) * innerRadius;
        const y4 = Math.sin(a4) * innerRadius;

        if (i === 0) shape.moveTo(x1, y1);
        else shape.lineTo(x1, y1);
        shape.lineTo(x2, y2);
        shape.lineTo(x3, y3);
        shape.lineTo(x4, y4);
      }

      // Center bore hole
      const holePath = new THREE.Path();
      holePath.absarc(0, 0, radius * 0.35, 0, Math.PI * 2, true);
      shape.holes.push(holePath);

      const extrudeSettings = {
        depth: depth,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.15,
        bevelThickness: 0.15
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.center();

      const mat = new THREE.MeshStandardMaterial({
        color: colorHex,
        metalness: 0.85,
        roughness: 0.25,
        wireframe: wireframe
      });

      return new THREE.Mesh(geo, mat);
    }

    const gearsGroup = new THREE.Group();
    scene.add(gearsGroup);

    // Gear 1 (Main Driver Gear - Cyan)
    const gear1 = createGear(4.5, 18, 1.2, 0x00f2fe);
    gear1.position.set(-3.8, 0, 0);
    gearsGroup.add(gear1);

    // Gear 2 (Driven Gear - Amber/Gold)
    const gear2 = createGear(3.0, 12, 1.2, 0xf59e0b);
    gear2.position.set(3.4, 0, 0);
    gearsGroup.add(gear2);

    // Shafts
    const shaftMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.1 });
    const shaftGeo = new THREE.CylinderGeometry(0.7, 0.7, 4, 16);
    shaftGeo.rotateX(Math.PI / 2);

    const shaft1 = new THREE.Mesh(shaftGeo, shaftMat);
    shaft1.position.copy(gear1.position);
    gearsGroup.add(shaft1);

    const shaft2 = new THREE.Mesh(shaftGeo, shaftMat);
    shaft2.position.copy(gear2.position);
    gearsGroup.add(shaft2);

    // Base bracket plate
    const plateGeo = new THREE.BoxGeometry(16, 8, 0.4);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.7,
      roughness: 0.4,
      transparent: true,
      opacity: 0.85
    });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.position.set(0, 0, -1.2);
    gearsGroup.add(plate);

    // Mouse controls for tilting 3D model
    let isDown = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e) => {
      isDown = true;
      prevX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      prevY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    };

    const onPointerMove = (e) => {
      if (!isDown) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      const dx = clientX - prevX;
      const dy = clientY - prevY;

      gearsGroup.rotation.y += dx * 0.01;
      gearsGroup.rotation.x += dy * 0.01;

      prevX = clientX;
      prevY = clientY;
    };

    const onPointerUp = () => {
      isDown = false;
    };

    mount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      width = mountRef.current.clientWidth;
      height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animate
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const sp = speedRef.current;

      gear1.rotation.z += 0.015 * sp;
      gear2.rotation.z -= (0.015 * (18 / 12)) * sp; // Gear ratio mesh

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [wireframe]);

  return (
    <div className="w-full glass-panel-glow rounded-3xl p-5 md:p-6 border border-cyan-500/30">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Cog className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white font-display flex items-center gap-2">
              Mô Phỏng Cơ Cấu Cơ Điện Tử 3D
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                CAD • SolidWorks CSWA
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              Mô hình truyền động bánh răng tỉ số truyền 1.5:1 • Giữ chuột để xoay 360 độ
            </p>
          </div>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSpeed(s => s === 0 ? 1 : (s === 1 ? 2 : 0))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-all"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Tốc độ: {speed}x</span>
          </button>

          <button
            onClick={() => setWireframe(w => !w)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border transition-all ${
              wireframe 
                ? 'bg-cyan-500 text-slate-950 border-cyan-400' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-cyan-500/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{wireframe ? 'Khung dây (CAD)' : 'Khối đặc (Solid)'}</span>
          </button>
        </div>
      </div>

      <div 
        ref={mountRef} 
        className="w-full h-[280px] md:h-[340px] rounded-2xl bg-gradient-to-b from-[#060b13] via-[#09111d] to-[#04080e] border border-cyan-500/20 cursor-grab active:cursor-grabbing relative overflow-hidden"
      >
        <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/60 backdrop-blur text-[11px] font-mono text-cyan-400 border border-cyan-500/30">
          Z1: 18 Răng (Driver) ⇄ Z2: 12 Răng (Driven)
        </div>
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/60 backdrop-blur text-[11px] font-mono text-amber-400 border border-amber-500/30">
          Tỷ số truyền i = 1.5 • Tối ưu SolidWorks
        </div>
      </div>
    </div>
  );
}
