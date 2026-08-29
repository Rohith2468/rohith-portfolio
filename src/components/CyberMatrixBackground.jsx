import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CyberMatrixBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080612, 0.015);

    const width = window.innerWidth || 1920;
    const height = window.innerHeight || 1080;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    if (mountRef.current) {
      // Clear any previous canvas element on hot-reload/refresh
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.domElement);
    }

    // Force canvas layout calculation on load
    const forceResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };
    forceResize();
    requestAnimationFrame(forceResize);

    // 2. Create Background Constellation Network Nodes
    const nodeCount = 90;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities = [];

    for (let i = 0; i < nodeCount; i++) {
      nodePositions[i * 3] = (Math.random() - 0.5) * 45;
      nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      nodePositions[i * 3 + 2] = -10 - Math.random() * 25;

      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.015,
      });
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.22,
      transparent: true,
      opacity: 0.65,
    });

    const nodeParticles = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodeParticles);

    // Line connections between nearby nodes
    const lineMaxConnections = nodeCount * 3;
    const linePositions = new Float32Array(lineMaxConnections * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.18,
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x06b6d4, 3, 40);
    light1.position.set(15, 15, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x8b5cf6, 3, 40);
    light2.position.set(-15, -15, 5);
    scene.add(light2);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - windowHalfX);
      mouseY = (e.clientY - windowHalfY);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseX = (e.touches[0].clientX - windowHalfX);
        mouseY = (e.touches[0].clientY - windowHalfY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Gyroscope tilt
    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const gamma = Math.min(Math.max(e.gamma, -45), 45);
        const beta = Math.min(Math.max(e.beta - 45, -45), 45);
        mouseX = (gamma / 45) * windowHalfX;
        mouseY = (beta / 45) * windowHalfY;
      }
    };

    const handleIOSGyro = async () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const resp = await DeviceOrientationEvent.requestPermission();
          if (resp === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
          }
        } catch (err) {
          // silently handle
        }
      }
    };

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      document.addEventListener('click', handleIOSGyro, { once: true });
    } else {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    // Resize Handler
    window.addEventListener('resize', forceResize);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth reference-style camera flow lerping
      targetX = mouseX * 0.003;
      targetY = mouseY * 0.003;

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Ambient continuous rotation on page refresh (active even before mouse moves)
      nodeParticles.rotation.y = elapsedTime * 0.04;
      nodeParticles.rotation.x = Math.sin(elapsedTime * 0.2) * 0.08;
      lineMesh.rotation.y = elapsedTime * 0.04;
      lineMesh.rotation.x = Math.sin(elapsedTime * 0.2) * 0.08;

      // Animate Nodes & Lines
      const positions = nodeGeometry.attributes.position.array;
      let lineVertexIndex = 0;

      for (let i = 0; i < nodeCount; i++) {
        positions[i * 3] += nodeVelocities[i].x;
        positions[i * 3 + 1] += nodeVelocities[i].y;
        positions[i * 3 + 2] += nodeVelocities[i].z;

        if (Math.abs(positions[i * 3]) > 25) nodeVelocities[i].x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 20) nodeVelocities[i].y *= -1;
        if (positions[i * 3 + 2] > -5 || positions[i * 3 + 2] < -35) nodeVelocities[i].z *= -1;

        for (let j = i + 1; j < nodeCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 8 && lineVertexIndex < lineMaxConnections * 6 - 6) {
            linePositions[lineVertexIndex++] = positions[i * 3];
            linePositions[lineVertexIndex++] = positions[i * 3 + 1];
            linePositions[lineVertexIndex++] = positions[i * 3 + 2];

            linePositions[lineVertexIndex++] = positions[j * 3];
            linePositions[lineVertexIndex++] = positions[j * 3 + 1];
            linePositions[lineVertexIndex++] = positions[j * 3 + 2];
          }
        }
      }

      nodeGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineVertexIndex / 3);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('deviceorientation', handleOrientation, true);
      document.removeEventListener('click', handleIOSGyro);
      window.removeEventListener('resize', forceResize);
      cancelAnimationFrame(animId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
