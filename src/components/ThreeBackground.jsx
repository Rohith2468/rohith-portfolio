import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);
  const [requestGyro, setRequestGyro] = useState(null);

  useEffect(() => {
    // Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0814, 0.015); // Purple fog matching dark background
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Add canvas to DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // --- Create Particles (Stars) ---
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const posArray = new Float32Array(starCount * 3);
    for(let i = 0; i < starCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starMaterial = new THREE.PointsMaterial({ size: 0.06, color: 0xffffff, transparent: true, opacity: 0.85 });
    const starMesh = new THREE.Points(starGeometry, starMaterial);
    scene.add(starMesh);

    // --- Create Floating Geometries ---
    const shapes = [];
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const colors = [0x8b5cf6, 0x06b6d4, 0xec4899]; // purple-500, cyan-500, pink-500
    
    const isMobile = window.innerWidth < 768;
    const baseOffset = isMobile ? 0.6 : 1;

    const positions = [
      [-4 * baseOffset, 2 * baseOffset, -5],
      [4 * baseOffset, -2 * baseOffset, -3],
      [0, -5 * baseOffset, -8]
    ];

    for(let i = 0; i < 3; i++) {
      const material = new THREE.MeshStandardMaterial({ 
        color: colors[i], 
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      const mesh = new THREE.Mesh(geometry, material);
      const [x, y, z] = positions[i];
      mesh.position.set(x, y, z);
      
      const baseScale = isMobile ? 0.5 : 0.8;
      const stepScale = isMobile ? 0.2 : 0.4;
      const scale = baseScale + i * stepScale;
      
      mesh.scale.set(scale, scale, scale);
      mesh.userData.baseScale = scale;
      
      scene.add(mesh);
      shapes.push(mesh);
    }

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const dirLight1 = new THREE.DirectionalLight(0x8b5cf6, 3);
    dirLight1.position.set(10, 10, 5);
    scene.add(dirLight1);
    
    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 3);
    dirLight2.position.set(-10, -10, -5);
    scene.add(dirLight2);

    camera.position.z = 5;

    // --- Mouse & Touch Interaction ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    const handleMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };
    
    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        mouseX = (event.touches[0].clientX - windowHalfX);
        mouseY = (event.touches[0].clientY - windowHalfY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // --- Mobile Gyroscope Interaction ---
    const handleDeviceOrientation = (event) => {
      if (event.gamma !== null && event.beta !== null) {
         const gamma = event.gamma || 0;
         const beta = event.beta || 0;
         const normalizedBeta = beta - 45;

         mouseX = (gamma / 45) * windowHalfX; 
         mouseY = (normalizedBeta / 45) * windowHalfY;
      }
    };
    
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      setRequestGyro(() => async () => {
        try {
          const response = await DeviceOrientationEvent.requestPermission();
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation, true);
            setRequestGyro(null);
          }
        } catch (error) {
          console.error("Device orientation permission denied or failed:", error);
        }
      });
    } else {
      window.addEventListener('deviceorientation', handleDeviceOrientation, true);
    }

    // --- Resize Handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      const isMobileNow = window.innerWidth < 768;
      const baseOffsetNow = isMobileNow ? 0.6 : 1;
      const positionsNow = [
        [-4 * baseOffsetNow, 2 * baseOffsetNow, -5],
        [4 * baseOffsetNow, -2 * baseOffsetNow, -3],
        [0, -5 * baseOffsetNow, -8]
      ];
      
      shapes.forEach((shape, i) => {
        const [x, y, z] = positionsNow[i];
        shape.position.set(x, y, z);
        
        const baseScaleNow = isMobileNow ? 0.5 : 0.8;
        const stepScaleNow = isMobileNow ? 0.2 : 0.4;
        const scaleNow = baseScaleNow + i * stepScaleNow;
        shape.scale.set(scaleNow, scaleNow, scaleNow);
      });
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Increased camera movement factor for high visibility (0.008)
      targetX = mouseX * 0.008;
      targetY = mouseY * 0.008;
      
      camera.position.x += (targetX - camera.position.x) * 0.08;
      camera.position.y += (-targetY - camera.position.y) * 0.08;
      camera.lookAt(scene.position);

      // Rotate stars and shift with mouse
      starMesh.rotation.y = elapsedTime * 0.03 + targetX * 0.2;
      starMesh.rotation.x = elapsedTime * 0.01 + targetY * 0.2;

      // Float shapes & tilt towards mouse
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.003 * (index + 1);
        shape.rotation.y += 0.004;
        shape.rotation.z = targetX * 0.3;
        shape.position.y += Math.sin(elapsedTime * 1.8 + index) * 0.004;
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      geometry.dispose();
    };
  }, []);

  return (
    <>
      <div 
        ref={mountRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1, // Visible above background color, behind content (zIndex 2)
          pointerEvents: 'none'
        }} 
      />
      {requestGyro && (
        <button 
          onClick={requestGyro}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            background: 'rgba(139, 92, 246, 0.3)',
            color: '#ffffff',
            border: '1px solid rgba(139, 92, 246, 0.6)',
            padding: '12px 24px',
            borderRadius: '9999px',
            backdropFilter: 'blur(16px)',
            fontSize: '0.9rem',
            fontWeight: '700',
            boxShadow: '0 0 25px rgba(139, 92, 246, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            pointerEvents: 'auto',
            transition: 'all 0.3s ease'
          }}
        >
          <span>📱</span> Enable 3D Gyro
        </button>
      )}
    </>
  );
}
