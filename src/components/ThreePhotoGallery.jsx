import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GALLERY_PHOTOS } from '../data/portfolioData';
import { Sparkles, RotateCw, ChevronLeft, ChevronRight, Maximize2, Layers } from 'lucide-react';

export default function ThreePhotoGallery({ onSelectPhoto }) {
  const mountRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  
  // Keep refs for animation loop
  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;
  const autoRotateRef = useRef(true);
  autoRotateRef.current = autoRotate;

  const currentRotationY = useRef(0);
  const targetRotationY = useRef(0);
  const planesRef = useRef([]);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 28);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f2fe, 3, 50);
    pointLight.position.set(0, 8, 15);
    scene.add(pointLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 2, 50);
    amberLight.position.set(0, -8, 15);
    scene.add(amberLight);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const carouselGroup = new THREE.Group();
    scene.add(carouselGroup);

    const count = GALLERY_PHOTOS.length;
    const radius = 12.5; // Radius of 3D circle
    const angleStep = (Math.PI * 2) / count;

    const planes = [];

    GALLERY_PHOTOS.forEach((photo, i) => {
      const angle = i * angleStep;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      const cardGroup = new THREE.Group();
      cardGroup.position.set(x, 0, z);
      cardGroup.rotation.y = angle;

      // Outer metallic frame
      const frameGeo = new THREE.PlaneGeometry(7.2, 9.6);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x111c30,
        metalness: 0.8,
        roughness: 0.2,
        side: THREE.DoubleSide
      });
      const frameMesh = new THREE.Mesh(frameGeo, frameMat);
      cardGroup.add(frameMesh);

      // Glowing border line
      const borderEdges = new THREE.EdgesGeometry(frameGeo);
      const borderLine = new THREE.LineSegments(
        borderEdges,
        new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 })
      );
      borderLine.position.z = 0.02;
      cardGroup.add(borderLine);

      // Photo Mesh with Texture
      const photoGeo = new THREE.PlaneGeometry(6.6, 9.0);
      
      // Default placeholder while loading
      const photoMat = new THREE.MeshBasicMaterial({
        color: 0x1e293b,
        side: THREE.DoubleSide,
      });

      const photoMesh = new THREE.Mesh(photoGeo, photoMat);
      photoMesh.position.z = 0.05;
      photoMesh.userData = { id: photo.id, index: i, data: photo };
      cardGroup.add(photoMesh);

      // Load texture asynchronously
      textureLoader.load(
        photo.src,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          photoMesh.material = new THREE.MeshBasicMaterial({
            map: tex,
            side: THREE.DoubleSide,
          });
        },
        undefined,
        (err) => {
          console.warn('Could not load texture:', photo.src, err);
        }
      );

      carouselGroup.add(cardGroup);
      planes.push({ group: cardGroup, mesh: photoMesh, angle, index: i });
    });

    planesRef.current = planes;

    // Raycaster for click and hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Mouse Drag & Touch controls
    let isMouseDown = false;
    let startX = 0;
    let dragDistance = 0;

    const onPointerDown = (e) => {
      isMouseDown = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      dragDistance = 0;
      setIsDragging(true);
    };

    const onPointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      // Update normalized mouse for raycasting
      const rect = mount.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / height) * 2 + 1;

      if (isMouseDown) {
        const deltaX = clientX - startX;
        dragDistance += Math.abs(deltaX);
        targetRotationY.current += deltaX * 0.005;
        startX = clientX;
      }
    };

    const onPointerUp = (e) => {
      if (isMouseDown && dragDistance < 5) {
        // It was a click! Raycast to find clicked photo
        raycaster.setFromCamera(mouse, camera);
        const clickableMeshes = planes.map(p => p.mesh);
        const intersects = raycaster.intersectObjects(clickableMeshes);
        if (intersects.length > 0) {
          const hit = intersects[0].object;
          if (hit.userData && onSelectPhoto) {
            onSelectPhoto(hit.userData.data);
            setActiveIndex(hit.userData.index);
            targetRotationY.current = -hit.userData.index * angleStep;
          }
        }
      }

      isMouseDown = false;
      setIsDragging(false);

      // Snap to nearest photo
      const normalizedAngle = (-targetRotationY.current) % (Math.PI * 2);
      let nearestIdx = Math.round(normalizedAngle / angleStep);
      nearestIdx = (nearestIdx % count + count) % count;
      setActiveIndex(nearestIdx);
      targetRotationY.current = -nearestIdx * angleStep;
    };

    // Scroll-based 3D rotation
    const onWheel = (e) => {
      e.preventDefault();
      targetRotationY.current += e.deltaY * 0.002;
      const normalizedAngle = (-targetRotationY.current) % (Math.PI * 2);
      let nearestIdx = Math.round(normalizedAngle / angleStep);
      nearestIdx = (nearestIdx % count + count) % count;
      setActiveIndex(nearestIdx);
    };

    mount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    mount.addEventListener('wheel', onWheel, { passive: false });

    // Window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      width = mountRef.current.clientWidth;
      height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Auto-rotation when idle
      if (autoRotateRef.current && !isMouseDown) {
        targetRotationY.current -= delta * 0.25;
        const normalizedAngle = (-targetRotationY.current) % (Math.PI * 2);
        let nearestIdx = Math.round(normalizedAngle / angleStep);
        nearestIdx = (nearestIdx % count + count) % count;
        if (nearestIdx !== activeIndexRef.current) {
          setActiveIndex(nearestIdx);
        }
      }

      // Smooth interpolation (damping)
      currentRotationY.current += (targetRotationY.current - currentRotationY.current) * 0.08;
      carouselGroup.rotation.y = currentRotationY.current;

      // Subtle float motion & dynamic scale based on depth to camera
      const time = clock.getElapsedTime();
      planes.forEach((p, idx) => {
        p.group.position.y = Math.sin(time * 1.5 + idx) * 0.35;

        // Calculate world position to determine distance from camera
        const worldPos = new THREE.Vector3();
        p.group.getWorldPosition(worldPos);
        const distToCam = worldPos.distanceTo(camera.position);

        // Highlight nearest photo
        const isFocused = distToCam < 20;
        const targetScale = isFocused ? 1.08 : 0.88;
        p.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      mount.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSelectPhoto]);

  // Navigate to photo
  const goToIndex = (index) => {
    const count = GALLERY_PHOTOS.length;
    const angleStep = (Math.PI * 2) / count;
    setActiveIndex(index);
    targetRotationY.current = -index * angleStep;
    setAutoRotate(false);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % GALLERY_PHOTOS.length;
    goToIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    goToIndex(prevIdx);
  };

  const currentPhoto = GALLERY_PHOTOS[activeIndex];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden glass-panel-glow border border-cyan-500/30 p-4 md:p-6 my-8">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Layers className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg md:text-xl font-bold font-display text-white tracking-wide">
                Mô Hình 3D Album Hình Ảnh
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                Three.js 3D
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Kéo chuột / cuộn trang để xoay không gian 3D • Nhấp vào ảnh để xem chi tiết
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              autoRotate
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 glow-box-cyan'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Bật/Tắt tự động xoay 3D"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            <span>{autoRotate ? 'Đang xoay' : 'Tạm dừng xoay'}</span>
          </button>

          <button
            onClick={() => onSelectPhoto && onSelectPhoto(currentPhoto)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-all shadow-lg shadow-cyan-500/20"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Phóng to</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-[360px] md:h-[480px] rounded-2xl cursor-grab active:cursor-grabbing relative overflow-hidden bg-gradient-to-b from-[#09111e]/90 via-[#0a1424]/90 to-[#070d17]/90 border border-cyan-500/20"
      >
        {/* Subtle grid lines inside canvas overlay */}
        <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40" />

        {/* Navigation arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-slate-900/80 border border-cyan-500/30 text-white hover:bg-cyan-500 hover:text-slate-950 transition-all backdrop-blur shadow-xl hover:scale-110"
          aria-label="Ảnh trước"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-slate-900/80 border border-cyan-500/30 text-white hover:bg-cyan-500 hover:text-slate-950 transition-all backdrop-blur shadow-xl hover:scale-110"
          aria-label="Ảnh kế tiếp"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Active photo indicator pill inside 3D viewer */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-2xl glass-panel border border-cyan-500/40 text-center max-w-[90%] md:max-w-md pointer-events-none">
          <div className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-bold">
            {currentPhoto.tag}
          </div>
          <div className="text-sm font-semibold text-white truncate">
            {currentPhoto.title}
          </div>
        </div>
      </div>

      {/* Thumbnail Bar below */}
      <div className="mt-4 flex items-center justify-center gap-2 md:gap-3 overflow-x-auto py-2">
        {GALLERY_PHOTOS.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => goToIndex(idx)}
            className={`group relative flex-shrink-0 w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${
              activeIndex === idx
                ? 'border-cyan-400 scale-105 shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400/50'
                : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
            }`}
          >
            <img 
              src={photo.src} 
              alt={photo.title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
              <span className="text-[10px] text-white font-mono font-bold truncate w-full">
                0{idx + 1}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
