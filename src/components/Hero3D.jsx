import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import avatar from '../assets/avatar.png';
import './Hero3D.css';

const Hero3D = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Track mouse coordinates for interactive parallax and gravitational tilt
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isHovered = useRef(false);
  const [clickActive, setClickActive] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- 1. Scene setup ---
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true, // transparent background to blend with our index.css ambient-glow
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- 2. Dynamic glowing particle texture generator ---
    const createGlowingParticleTexture = () => {
      const size = 32;
      const particleCanvas = document.createElement('canvas');
      particleCanvas.width = size;
      particleCanvas.height = size;
      const ctx = particleCanvas.getContext('2d');

      const gradient = ctx.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.15, 'rgba(56, 189, 248, 0.9)'); // cyan var(--accent-cyan)
      gradient.addColorStop(0.4, 'rgba(37, 99, 235, 0.3)');   // blue var(--accent-blue)
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      const texture = new THREE.CanvasTexture(particleCanvas);
      texture.needsUpdate = true;
      return texture;
    };

    const particleTexture = createGlowingParticleTexture();

    // --- 3. Stardust Starfield (Background particles) ---
    const starCount = 350;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSpeeds = [];

    for (let i = 0; i < starCount; i++) {
      // Position particles in a spherical shell around the center
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.5 + Math.random() * 2.0; // radius between 2.5 and 4.5

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      // Random speed vectors for slight breathing animation
      starSpeeds.push({
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
        z: (Math.random() - 0.5) * 0.002,
        phase: Math.random() * Math.PI * 2
      });
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      size: 0.08,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.6
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // --- 4. Interactive Outer Orbital Rings (Cyan & Blue theme) ---
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const createOrbitRing = (radius, count, color, tiltX, tiltY) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = Math.sin(angle) * radius;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.15; // slightly fuzzy thickness
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const ringCanvas = document.createElement('canvas');
      ringCanvas.width = 16;
      ringCanvas.height = 16;
      const ringCtx = ringCanvas.getContext('2d');
      const g = ringCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      g.addColorStop(0, '#ffffff');
      g.addColorStop(0.3, color);
      g.addColorStop(1, 'transparent');
      ringCtx.fillStyle = g;
      ringCtx.fillRect(0, 0, 16, 16);
      
      const ringTex = new THREE.CanvasTexture(ringCanvas);

      const material = new THREE.PointsMaterial({
        size: 0.12,
        map: ringTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.8
      });

      const points = new THREE.Points(geometry, material);
      points.rotation.x = tiltX;
      points.rotation.y = tiltY;
      
      return points;
    };

    // Ring 1: Glowing Cyan Inner Orbit (wrapping the avatar closely)
    const ring1 = createOrbitRing(2.1, 120, '#00f0ff', Math.PI / 3, Math.PI / 6);
    // Ring 2: Sleek Blue Outer Orbit (larger and opposite tilt)
    const ring2 = createOrbitRing(2.8, 180, '#3a86ff', -Math.PI / 4, -Math.PI / 5);

    ringGroup.add(ring1);
    ringGroup.add(ring2);

    // --- 5. Interactive Click Shockwave Engine ---
    let shockwaves = [];

    const triggerShockwave = (x, y) => {
      const geometry = new THREE.BufferGeometry();
      const count = 100;
      const positions = new Float32Array(count * 3);
      const velocities = [];

      for (let i = 0; i < count; i++) {
        // Position at center
        positions[i * 3] = 0;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;

        // Radial outward speed vector in the XY plane
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.08 + Math.random() * 0.08;
        velocities.push({
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
          z: (Math.random() - 0.5) * 0.02
        });
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const shockTex = createGlowingParticleTexture();
      const material = new THREE.PointsMaterial({
        size: 0.18,
        map: shockTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 1.0
      });

      const shockPoints = new THREE.Points(geometry, material);
      scene.add(shockPoints);

      shockwaves.push({
        mesh: shockPoints,
        velocities,
        age: 0,
        maxAge: 45 // frames
      });

      // Simple visual feed-back on click
      setClickActive(true);
      setTimeout(() => setClickActive(false), 200);
    };

    // --- 6. Event Listeners ---
    
    // Mouse hover tracking
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      // Normalize mouse between -1 and 1 relative to center
      mouse.current.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.targetY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseEnter = () => {
      isHovered.current = true;
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
      mouse.current.targetX = 0;
      mouse.current.targetY = 0;
    };

    const handleCanvasClick = (e) => {
      triggerShockwave();
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleCanvasClick);

    // Window / container resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    });
    resizeObserver.observe(container);

    // --- 7. Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse coordinate interpolation (inertia / easing)
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

      // Rotate orbital rings
      // Base rotation + subtle mouse tilt influence
      ring1.rotation.z = elapsedTime * 0.25;
      ring2.rotation.z = -elapsedTime * 0.15;
      
      // Scene parallax tilt based on mouse position
      ringGroup.rotation.y = mouse.current.x * 0.6;
      ringGroup.rotation.x = -mouse.current.y * 0.6;

      // Background stars slow rotation + mouse gravity drift
      starField.rotation.y = elapsedTime * 0.02 + mouse.current.x * 0.15;
      starField.rotation.x = elapsedTime * 0.01 - mouse.current.y * 0.15;

      // Animate background star positions slightly for a breathing feeling
      const starPosAttr = starGeometry.attributes.position;
      for (let i = 0; i < starCount; i++) {
        const speed = starSpeeds[i];
        // Calculate dynamic wave adjustment
        const wave = Math.sin(elapsedTime * 0.5 + speed.phase) * 0.001;
        
        starPosAttr.array[i * 3] += speed.x + wave * starPosAttr.array[i * 3];
        starPosAttr.array[i * 3 + 1] += speed.y + wave * starPosAttr.array[i * 3 + 1];
        starPosAttr.array[i * 3 + 2] += speed.z;

        // Keep stars bounded within sphere, bounce back if they drift too far
        const dist = Math.sqrt(
          starPosAttr.array[i * 3] ** 2 +
          starPosAttr.array[i * 3 + 1] ** 2 +
          starPosAttr.array[i * 3 + 2] ** 2
        );
        if (dist > 5.0 || dist < 2.0) {
          speed.x = -speed.x;
          speed.y = -speed.y;
          speed.z = -speed.z;
        }
      }
      starPosAttr.needsUpdate = true;

      // Manage Shockwave Particles
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const wave = shockwaves[s];
        wave.age += 1;
        
        const posAttr = wave.mesh.geometry.attributes.position;
        const array = posAttr.array;
        
        // Expand particles
        for (let i = 0; i < 100; i++) {
          array[i * 3] += wave.velocities[i].x;
          array[i * 3 + 1] += wave.velocities[i].y;
          array[i * 3 + 2] += wave.velocities[i].z;
          
          // Friction / deceleration
          wave.velocities[i].x *= 0.96;
          wave.velocities[i].y *= 0.96;
          wave.velocities[i].z *= 0.96;
        }
        posAttr.needsUpdate = true;

        // Fade out
        const opacity = 1.0 - (wave.age / wave.maxAge);
        wave.mesh.material.opacity = opacity;
        wave.mesh.material.size = 0.18 * opacity;

        // Clean up completed shockwaves
        if (wave.age >= wave.maxAge) {
          scene.remove(wave.mesh);
          wave.mesh.geometry.dispose();
          wave.mesh.material.dispose();
          shockwaves.splice(s, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- 8. Cleanup on unmount ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleCanvasClick);
      resizeObserver.disconnect();

      // Dispose Three.js objects to prevent GPU memory leaks
      starGeometry.dispose();
      starMaterial.dispose();
      particleTexture.dispose();
      ring1.geometry.dispose();
      ring1.material.dispose();
      ring2.geometry.dispose();
      ring2.material.dispose();

      shockwaves.forEach(wave => {
        scene.remove(wave.mesh);
        wave.mesh.geometry.dispose();
        wave.mesh.material.dispose();
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div className={`hero-3d-wrapper ${clickActive ? 'pulsing' : ''}`} ref={containerRef}>
      <canvas className="hero-3d-canvas" ref={canvasRef} />
      
      {/* Centered avatar inside the ring orbit */}
      <div className="hero-3d-avatar-container">
        <div className="hero-3d-avatar-glass-frame">
          <img src={avatar} alt="Abdulhadi Yaseen" className="hero-3d-avatar-img" />
          <div className="hero-3d-avatar-hologram-effect"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero3D;
