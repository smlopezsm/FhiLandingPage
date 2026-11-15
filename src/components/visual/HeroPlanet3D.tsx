import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Checks WebGL support safely (prevents crashes in test/jsdom environments).
 */
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Generates a high-definition, semi-realistic and holographic Earth surface texture.
 * Features vibrant emerald oceans with continental shelf shallows, high-detail
 * continental landmasses with elevation contours, an highlighted Argentine territory,
 * and warm glowing thermal fire hotspots (active MODIS and VIIRS detections).
 */
function createDetailedEarthTexture(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Helper: converts lon/lat coordinates to canvas pixel space
  const toXY = (lon: number, lat: number): [number, number] => [
    ((lon + 180) / 360) * width,
    ((90 - lat) / 180) * height,
  ];

  // 1. Deep Space-Ocean Gradient Base (deep space emerald-sapphire depths)
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#061915');
  oceanGrad.addColorStop(0.5, '#0A251F');
  oceanGrad.addColorStop(1, '#051613');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Latitude & Longitude Graticule (Scientific Coordinate Grid)
  ctx.strokeStyle = 'rgba(104, 217, 208, 0.16)';
  ctx.lineWidth = 1;

  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Highlight Equator
  const eqY = height / 2;
  ctx.strokeStyle = 'rgba(184, 238, 104, 0.4)';
  ctx.setLineDash([8, 6]);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, eqY);
  ctx.lineTo(width, eqY);
  ctx.stroke();

  // Highlight Tropic of Capricorn (crosses northern Argentina at 23.4° S)
  const caprY = ((90 - -23.4) / 180) * height;
  ctx.strokeStyle = 'rgba(104, 217, 208, 0.3)';
  ctx.setLineDash([4, 6]);
  ctx.beginPath();
  ctx.moveTo(0, caprY);
  ctx.lineTo(width, caprY);
  ctx.stroke();

  ctx.setLineDash([]);

  // 3. Draw Continents with Topographic Terrain & Luminous Coastlines
  const drawLandmass = (
    points: [number, number][],
    fillColor = '#1F5A4A',
    strokeColor = '#5AE5A8',
    glowColor = '#349377'
  ) => {
    // Continental Shelf Shallows Glow
    ctx.save();
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    points.forEach(([lon, lat], i) => {
      const [x, y] = toXY(lon, lat);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2.4;
    ctx.stroke();
    ctx.restore();
  };

  // South America (High detail with proper geographical contours)
  const southAmerica: [number, number][] = [
    [-77, 12], [-72, 12], [-60, 10], [-52, 5], [-48, -1], [-35, -5],
    [-35, -10], [-39, -15], [-42, -23], [-48, -28], [-53, -33], [-58, -35],
    [-65, -42], [-66, -48], [-68, -55], [-74, -53], [-75, -46], [-72, -38],
    [-71, -30], [-70, -18], [-77, -9], [-81, -5], [-80, 2], [-77, 8], [-77, 12]
  ];
  drawLandmass(southAmerica, '#246B58', '#63EBB0', '#38A081');

  // North America
  const northAmerica: [number, number][] = [
    [-168, 66], [-150, 71], [-130, 70], [-95, 74], [-80, 62], [-60, 60],
    [-55, 48], [-65, 44], [-75, 36], [-80, 26], [-82, 23], [-98, 26],
    [-97, 19], [-88, 16], [-83, 9], [-78, 8], [-85, 14], [-105, 20],
    [-110, 31], [-124, 40], [-125, 50], [-135, 57], [-160, 58], [-168, 66]
  ];
  drawLandmass(northAmerica, '#1D5948', '#54D89F', '#2C846B');

  // Eurasia (Europe + Asia)
  const eurasia: [number, number][] = [
    [-10, 36], [0, 44], [10, 45], [15, 38], [25, 40], [30, 31],
    [35, 32], [50, 25], [60, 25], [70, 20], [80, 10], [88, 22],
    [95, 15], [105, 10], [108, 20], [120, 25], [122, 32], [130, 43],
    [142, 53], [170, 65], [180, 70], [170, 74], [110, 77], [60, 72],
    [30, 70], [25, 60], [10, 58], [5, 62], [-5, 58], [-9, 44], [-10, 36]
  ];
  drawLandmass(eurasia, '#1A5343', '#50D29C', '#287B63');

  // Africa
  const africa: [number, number][] = [
    [-17, 15], [-12, 28], [0, 36], [10, 37], [25, 32], [32, 31],
    [43, 12], [51, 10], [42, -5], [35, -20], [30, -32], [20, -34],
    [17, -33], [12, -18], [10, -5], [0, 5], [-10, 5], [-17, 15]
  ];
  drawLandmass(africa, '#206150', '#5CE0AA', '#318D72');

  // Australia
  const australia: [number, number][] = [
    [114, -22], [120, -15], [135, -12], [142, -11], [146, -18], [152, -26],
    [153, -32], [148, -38], [138, -35], [130, -32], [118, -35], [114, -28], [114, -22]
  ];
  drawLandmass(australia, '#1D5948', '#54D89F', '#2C846B');

  // Antarctica
  const antarctica: [number, number][] = [
    [-180, -78], [-120, -75], [-60, -68], [0, -70], [60, -67], [120, -72], [180, -78],
    [180, -90], [-180, -90]
  ];
  drawLandmass(antarctica, '#226453', '#60E5AC', '#328E73');

  // 4. Highlight ARGENTINA Territory with Precision & Topography
  const argentina: [number, number][] = [
    [-66.8, -21.8], [-64.5, -22.0], [-62.5, -22.2], [-60.8, -23.9], [-57.6, -25.3],
    [-55.9, -27.4], [-53.6, -26.2], [-54.2, -27.5], [-57.6, -30.2], [-58.4, -33.8],
    [-57.0, -35.8], [-57.5, -38.0], [-62.0, -39.0], [-65.0, -41.0], [-66.0, -44.0],
    [-67.5, -46.5], [-66.0, -47.8], [-68.5, -51.5], [-68.5, -54.8], [-65.0, -54.8],
    [-66.5, -55.2], [-71.5, -52.0], [-72.5, -48.0], [-71.8, -44.0], [-71.5, -40.0],
    [-70.5, -36.0], [-69.8, -32.0], [-69.0, -28.0], [-67.0, -24.0], [-66.8, -21.8]
  ];

  ctx.save();
  ctx.shadowColor = '#B8EE68';
  ctx.shadowBlur = 18;
  ctx.beginPath();
  argentina.forEach(([lon, lat], i) => {
    const [x, y] = toXY(lon, lat);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  // Vivid emerald fill for Argentina
  ctx.fillStyle = '#2F856C';
  ctx.fill();
  // Luminous lime border
  ctx.strokeStyle = '#B8EE68';
  ctx.lineWidth = 3.2;
  ctx.stroke();
  ctx.restore();

  // 5. Andes Mountain Elevation Spine
  ctx.save();
  ctx.strokeStyle = 'rgba(184, 238, 104, 0.7)';
  ctx.lineWidth = 1.6;
  ctx.setLineDash([4, 4]);
  const andesSpine: [number, number][] = [
    [-66.5, -22.5], [-68.8, -27.0], [-70.0, -32.5], [-71.2, -38.0], [-71.8, -45.0], [-69.5, -52.0]
  ];
  ctx.beginPath();
  andesSpine.forEach(([lon, lat], i) => {
    const [x, y] = toXY(lon, lat);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.restore();

  // 6. Active Thermal Fire Hotspots (MODIS & VIIRS active fire detections)
  const fireHotspots: [number, number, string, number][] = [
    [-64.2, -31.4, '#FF6759', 14], // Córdoba (Sierras)
    [-60.5, -32.8, '#FF9C55', 16], // Rosario / Paraná Delta
    [-60.0, -27.4, '#FF6759', 15], // Gran Chaco
    [-57.8, -28.5, '#FF9C55', 14], // Corrientes (Iberá)
    [-68.5, -39.0, '#FFA64D', 12], // North Patagonia
    [-65.2, -26.8, '#FF9C55', 11], // Tucumán / NOA
    [-64.8, -36.6, '#FF6759', 13], // La Pampa
  ];

  fireHotspots.forEach(([lon, lat, color, radius]) => {
    const [x, y] = toXY(lon, lat);

    // Multi-stage Radiant Glow
    const grad = ctx.createRadialGradient(x, y, 1, x, y, radius);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.25, '#FFE285');
    grad.addColorStop(0.6, color);
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Hot Core Point
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x, y, 2.0, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates an articulated 3D satellite mesh:
 * Metallic avionics body + articulated solar array wings + nadir sensor aperture.
 */
function createSatelliteMesh(accentColor: string): THREE.Group {
  const satGroup = new THREE.Group();

  // Central bus (spacecraft body)
  const busGeo = new THREE.BoxGeometry(0.14, 0.14, 0.2);
  const busMat = new THREE.MeshStandardMaterial({
    color: 0xeff5ed,
    metalness: 0.85,
    roughness: 0.2,
  });
  const busMesh = new THREE.Mesh(busGeo, busMat);
  satGroup.add(busMesh);

  // Solar array wings with photovoltaic grid styling
  const wingGeo = new THREE.BoxGeometry(0.44, 0.015, 0.13);
  const wingMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    metalness: 0.6,
    roughness: 0.25,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.5,
  });

  // Left wing
  const leftWing = new THREE.Mesh(wingGeo, wingMat);
  leftWing.position.x = 0.32;
  satGroup.add(leftWing);

  // Right wing
  const rightWing = new THREE.Mesh(wingGeo, wingMat);
  rightWing.position.x = -0.32;
  satGroup.add(rightWing);

  // Optical sensor aperture lens
  const lensGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.08, 16);
  const lensMat = new THREE.MeshBasicMaterial({ color: 0x05110e });
  const lensMesh = new THREE.Mesh(lensGeo, lensMat);
  lensMesh.rotation.x = Math.PI / 2;
  lensMesh.position.z = 0.11;
  satGroup.add(lensMesh);

  return satGroup;
}

/**
 * Creates an orbit track line geometry with delicate glowing depth.
 */
function createOrbitLine(radius: number, color: string, segments = 160): THREE.Line {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.45,
  });
  return new THREE.Line(geometry, material);
}

/**
 * Custom Atmospheric Fresnel Rim Shader.
 * Mathematically guarantees that the center of the planet is 100% TRANSPARENT (zero haze),
 * while grazing angles at the planetary limb ramp up to a luminous cyan/lime atmospheric halo.
 */
function createAtmosphericRimShaderMaterial(): THREE.ShaderMaterial {
  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vViewVec;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewVec = normalize(-mvPosition.xyz);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vViewVec;
    void main() {
      float cosTheta = dot(vNormal, vViewVec);
      // Fresnel rim factor: 0.0 at center, 1.0 at edge
      float fresnel = pow(1.0 - clamp(cosTheta, 0.0, 1.0), 3.4);
      vec3 cyanColor = vec3(0.408, 0.851, 0.816);
      vec3 limeColor = vec3(0.722, 0.933, 0.408);
      vec3 rimColor = mix(cyanColor, limeColor, fresnel);
      gl_FragColor = vec4(rimColor, fresnel * 0.9);
    }
  `;

  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.FrontSide,
  });
}

export const HeroPlanet3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglAvailable] = useState<boolean>(() => isWebGLAvailable());

  useEffect(() => {
    if (!webglAvailable || !containerRef.current) return;

    const container = containerRef.current;
    let animationFrameId: number;

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera: Sits closer for commanding planetary presence
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(36, aspect, 0.1, 100);
    camera.position.set(0, 0.25, 5.7);

    // 3. Renderer: High-performance, transparent canvas with linear tone mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 4. Volumetric Lighting Stack
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Main Orbital Sun: Crisp white-mint illumination
    const sunLight = new THREE.DirectionalLight(0xf4fff8, 2.0);
    sunLight.position.set(5, 3.5, 5);
    scene.add(sunLight);

    // Backside Terminator Rim Light: Luminous cyan fill
    const rimLight = new THREE.DirectionalLight(0x68d9d0, 0.8);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // 5. Earth Master Group with Realistic Obliquity (23.4° axial tilt)
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = THREE.MathUtils.degToRad(-23.4);
    scene.add(earthGroup);

    // Core Globe Mesh: Sharp, high-contrast, crystal clear surface
    const earthRadius = 2.22;
    const earthGeometry = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthTexture = createDetailedEarthTexture();
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.42,
      metalness: 0.12,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    // Initial rotation orienting South America & Argentina directly toward camera
    earthMesh.rotation.y = THREE.MathUtils.degToRad(82);
    earthGroup.add(earthMesh);

    // Atmospheric Glowing Rim (Fresnel Rim Shader - 100% transparent in center, glows only at horizon)
    const atmosphereGeometry = new THREE.SphereGeometry(earthRadius * 1.026, 64, 64);
    const atmosphereMaterial = createAtmosphericRimShaderMaterial();
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    earthGroup.add(atmosphereMesh);

    // 6. Constellation: MODIS & VIIRS Satellites & Orbits
    // Orbit 1: TERRA (MODIS · 705 km, 10:30 AM pass, Cyan)
    const terraRadius = 3.0;
    const terraOrbitGroup = new THREE.Group();
    terraOrbitGroup.rotation.x = THREE.MathUtils.degToRad(42);
    terraOrbitGroup.rotation.z = THREE.MathUtils.degToRad(-28);
    scene.add(terraOrbitGroup);

    const terraOrbitLine = createOrbitLine(terraRadius, '#68D9D0');
    terraOrbitGroup.add(terraOrbitLine);

    const terraSatellite = createSatelliteMesh('#68D9D0');
    terraOrbitGroup.add(terraSatellite);

    // Orbit 2: AQUA (MODIS · 705 km, 1:30 PM pass, Lime)
    const aquaRadius = 3.15;
    const aquaOrbitGroup = new THREE.Group();
    aquaOrbitGroup.rotation.x = THREE.MathUtils.degToRad(-46);
    aquaOrbitGroup.rotation.z = THREE.MathUtils.degToRad(52);
    scene.add(aquaOrbitGroup);

    const aquaOrbitLine = createOrbitLine(aquaRadius, '#B8EE68');
    aquaOrbitGroup.add(aquaOrbitLine);

    const aquaSatellite = createSatelliteMesh('#B8EE68');
    aquaOrbitGroup.add(aquaSatellite);

    // Orbit 3: SUOMI NPP (VIIRS · 824 km nominal, higher altitude, Orange)
    const viirsRadius = 3.55;
    const viirsOrbitGroup = new THREE.Group();
    viirsOrbitGroup.rotation.x = THREE.MathUtils.degToRad(72);
    viirsOrbitGroup.rotation.z = THREE.MathUtils.degToRad(18);
    scene.add(viirsOrbitGroup);

    const viirsOrbitLine = createOrbitLine(viirsRadius, '#FF9C55');
    viirsOrbitGroup.add(viirsOrbitLine);

    const viirsSatellite = createSatelliteMesh('#FF9C55');
    viirsOrbitGroup.add(viirsSatellite);

    // 7. Interactive Drag, Inertia & Zoom
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
      rotationVelocityX = 0;
      rotationVelocityY = 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      rotationVelocityX = deltaX * 0.005;
      rotationVelocityY = deltaY * 0.003;

      earthMesh.rotation.y += rotationVelocityX;
      earthGroup.rotation.x = Math.max(-0.65, Math.min(0.65, earthGroup.rotation.x + rotationVelocityY));

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Wheel zoom
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(4.4, Math.min(7.5, camera.position.z + e.deltaY * 0.004));
    };

    // Touch Support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMouseX;
      const deltaY = e.touches[0].clientY - previousMouseY;

      rotationVelocityX = deltaX * 0.005;
      rotationVelocityY = deltaY * 0.003;

      earthMesh.rotation.y += rotationVelocityX;
      earthGroup.rotation.x = Math.max(-0.65, Math.min(0.65, earthGroup.rotation.x + rotationVelocityY));

      previousMouseX = e.touches[0].clientX;
      previousMouseY = e.touches[0].clientY;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domEl.addEventListener('wheel', onWheel, { passive: false });
    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // 8. Animation Loop
    let clock = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        clock += 0.01;

        // Smooth slow axial rotation of the Earth
        if (!isDragging) {
          rotationVelocityX *= 0.94;
          rotationVelocityY *= 0.94;
          earthMesh.rotation.y += 0.0012 + rotationVelocityX;
          earthGroup.rotation.x = Math.max(-0.65, Math.min(0.65, earthGroup.rotation.x + rotationVelocityY));
        }

        // Orbital motion: Terra (MODIS 10:30 AM pass)
        const terraAngle = clock * 0.65;
        terraSatellite.position.set(
          Math.cos(terraAngle) * terraRadius,
          0,
          Math.sin(terraAngle) * terraRadius
        );
        terraSatellite.lookAt(0, 0, 0);

        // Orbital motion: Aqua (MODIS 1:30 PM pass)
        const aquaAngle = clock * 0.6 + Math.PI;
        aquaSatellite.position.set(
          Math.cos(aquaAngle) * aquaRadius,
          0,
          Math.sin(aquaAngle) * aquaRadius
        );
        aquaSatellite.lookAt(0, 0, 0);

        // Orbital motion: Suomi NPP (VIIRS 1:30 PM pass, higher orbit)
        const viirsAngle = clock * 0.54 + Math.PI * 0.5;
        viirsSatellite.position.set(
          Math.cos(viirsAngle) * viirsRadius,
          0,
          Math.sin(viirsAngle) * viirsRadius
        );
        viirsSatellite.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('wheel', onWheel);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);

      earthGeometry.dispose();
      earthMaterial.dispose();
      earthTexture.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [webglAvailable]);

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/10] min-h-[460px] sm:min-h-[540px] lg:min-h-[580px] bg-transparent select-none flex items-center justify-center">
      {webglAvailable ? (
        /* WebGL Three.js 3D Canvas */
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          title="Drag to rotate Earth · Scroll to zoom"
        />
      ) : (
        /* High-fidelity Fallback (for environments without WebGL, e.g. tests) */
        <div className="w-full h-full flex items-center justify-center p-6 bg-[#0A1613]">
          <div className="relative w-72 h-72 rounded-full border border-[#21312D] bg-gradient-to-tr from-[#07100F] via-[#0E241E] to-[#163D31] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#B8EE68]/30 animate-spin-slow" />
            <div className="text-center space-y-1 font-mono text-xs text-[#93A39C]">
              <div className="text-[#EFF5ED] font-bold text-sm">Earth 3D Simulation</div>
              <div className="text-[#B8EE68]">MODIS & VIIRS Constellation</div>
              <div className="text-[10px] text-[#93A39C]">Active Thermal Observation</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
