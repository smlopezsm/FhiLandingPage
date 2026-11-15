import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
 * Procedural fallback texture for tests or offline environments.
 */
function createProceduralEarthFallback(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#061613';
    ctx.fillRect(0, 0, 1024, 512);
    ctx.fillStyle = '#1D5344';
    ctx.beginPath();
    ctx.arc(320, 280, 140, 0, Math.PI * 2);
    ctx.arc(680, 200, 160, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

/**
 * Creates an authentic fallback satellite mesh if GLTF is loading or in headless test environment.
 */
function createProceduralSatelliteMesh(accentColor: string): THREE.Group {
  const group = new THREE.Group();

  // Spacecraft bus with gold thermal MLI insulation
  const busGeo = new THREE.BoxGeometry(0.2, 0.16, 0.32);
  const busMat = new THREE.MeshStandardMaterial({
    color: 0xdfb15b,
    metalness: 0.9,
    roughness: 0.22,
  });
  const busMesh = new THREE.Mesh(busGeo, busMat);
  group.add(busMesh);

  // Parabolic high-gain communications dish
  const dishGeo = new THREE.SphereGeometry(0.08, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2.2);
  const dishMat = new THREE.MeshStandardMaterial({
    color: 0xf0f4f1,
    metalness: 0.8,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const dishMesh = new THREE.Mesh(dishGeo, dishMat);
  dishMesh.position.set(0, 0.18, -0.12);
  dishMesh.rotation.x = -Math.PI / 3;
  group.add(dishMesh);

  // Articulated solar array wing
  const wingGeo = new THREE.BoxGeometry(0.72, 0.015, 0.24);
  const wingMat = new THREE.MeshStandardMaterial({
    color: 0x0e2438,
    metalness: 0.7,
    roughness: 0.2,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.3,
  });
  const wingMesh = new THREE.Mesh(wingGeo, wingMat);
  wingMesh.position.set(0.55, 0, 0);
  group.add(wingMesh);

  // Nadir optical sensor aperture
  const lensGeo = new THREE.CylinderGeometry(0.045, 0.05, 0.09, 16);
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x111918, metalness: 0.85, roughness: 0.15 });
  const lensMesh = new THREE.Mesh(lensGeo, lensMat);
  lensMesh.rotation.x = Math.PI / 2;
  lensMesh.position.set(0, -0.09, 0.16);
  group.add(lensMesh);

  return group;
}

/**
 * Creates clean, refined orbit line geometry.
 */
function createOrbitLine(radius: number, color: string, segments = 180): THREE.Line {
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
    depthTest: true,
    depthWrite: false,
  });
  return new THREE.Line(geometry, material);
}

/**
 * Photorealistic Rayleigh Scattering Atmospheric Limb Shader.
 * Features an exponential rim falloff:
 * - Center of the planet: cosTheta ~ 1.0 -> fresnel = 0.0 (strictly 100% transparent, ZERO haze over continents)
 * - Grazing limb horizon: fresnel rises smoothly to a delicate, luminous cyan-lime atmospheric edge.
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
      // High-power exponent guarantees zero haze in center, only glowing at limb
      float fresnel = pow(1.0 - clamp(cosTheta, 0.0, 1.0), 4.2);
      vec3 cyanAtmosphere = vec3(0.32, 0.82, 0.77);
      vec3 limeAtmosphere = vec3(0.68, 0.92, 0.38);
      vec3 color = mix(cyanAtmosphere, limeAtmosphere, fresnel * 0.45);
      gl_FragColor = vec4(color, fresnel * 0.8);
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

/**
 * Creates 3D active thermal fire hotspot flares on Argentina's coordinates.
 */
function createThermalHotspotsGroup(earthRadius: number): THREE.Group {
  const group = new THREE.Group();

  const hotspots: [number, number, string, number][] = [
    [-31.4, -64.2, '#FF6B35', 0.045], // Córdoba
    [-32.8, -60.5, '#FF9C55', 0.05],  // Paraná Delta
    [-27.4, -60.0, '#FF6B35', 0.045], // Gran Chaco
    [-28.5, -57.8, '#FF9C55', 0.04],  // Corrientes
    [-39.0, -68.5, '#FFA84D', 0.035], // North Patagonia
  ];

  hotspots.forEach(([lat, lon, color, size]) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const r = earthRadius * 1.002;

    const x = -(r * Math.sin(phi) * Math.cos(theta));
    const z = r * Math.sin(phi) * Math.sin(theta);
    const y = r * Math.cos(phi);

    const flareGeo = new THREE.SphereGeometry(size, 8, 8);
    const flareMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.85,
    });
    const flareMesh = new THREE.Mesh(flareGeo, flareMat);
    flareMesh.position.set(x, y, z);
    group.add(flareMesh);

    const coreGeo = new THREE.SphereGeometry(size * 0.4, 6, 6);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(x, y, z);
    group.add(coreMesh);
  });

  return group;
}

export const HeroPlanet3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglAvailable] = useState<boolean>(() => isWebGLAvailable());

  useEffect(() => {
    if (!webglAvailable || !containerRef.current) return;

    const container = containerRef.current;
    let animationFrameId: number;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(44, aspect, 0.1, 100);

    const updateCameraFrustum = () => {
      const currentAspect = container.clientWidth / container.clientHeight;
      camera.aspect = currentAspect;
      // Responsive distance: pulls back on narrow viewports so orbits stay fully visible
      if (currentAspect < 1.0) {
        camera.position.set(0, 0, 9.8);
      } else if (currentAspect < 1.4) {
        camera.position.set(0, 0, 8.8);
      } else {
        camera.position.set(0, 0, 8.0);
      }
      camera.updateProjectionMatrix();
    };

    updateCameraFrustum();

    // 3. Renderer with sRGB Color Space & Antialiasing
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // 4. Scientifically Grounded Solar & Exosphere Lighting
    // Ambient exosphere fill: green/cyan tinted space undertone without corrupting continents
    const ambientLight = new THREE.AmbientLight(0x0a1c17, 0.75);
    scene.add(ambientLight);

    // Main Orbital Sun: Crisp warm directional sunlight producing authentic terminator & ocean specular reflection
    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.5);
    sunLight.position.set(6, 3, 5);
    scene.add(sunLight);

    // Secondary Rim Light: Gentle exosphere cyan scatter
    const rimLight = new THREE.DirectionalLight(0x52d1c5, 0.6);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    // 5. Earth Master Group with Realistic 23.4° Obliquity
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = THREE.MathUtils.degToRad(-23.4);
    scene.add(earthGroup);

    // Earth Sphere (radius 1.85, giving ample breathing room for orbits)
    const earthRadius = 1.85;
    const earthGeometry = new THREE.SphereGeometry(earthRadius, 64, 64);

    // Load authentic NASA Blue Marble satellite textures with anisotropic filtering
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const textureLoader = new THREE.TextureLoader();

    let earthTexture: THREE.Texture;
    let normalTexture: THREE.Texture | null = null;
    let specularTexture: THREE.Texture | null = null;
    let cloudsTexture: THREE.Texture | null = null;

    try {
      earthTexture = textureLoader.load(
        '/textures/earth_atmos_2048.jpg',
        undefined,
        undefined,
        () => {
          earthMaterial.map = createProceduralEarthFallback();
          earthMaterial.needsUpdate = true;
        }
      );
      earthTexture.colorSpace = THREE.SRGBColorSpace;
      earthTexture.anisotropy = maxAnisotropy;

      normalTexture = textureLoader.load('/textures/earth_normal_2048.jpg');
      normalTexture.anisotropy = maxAnisotropy;

      specularTexture = textureLoader.load('/textures/earth_specular_2048.jpg');
      specularTexture.anisotropy = maxAnisotropy;

      cloudsTexture = textureLoader.load('/textures/earth_clouds_1024.png');
      cloudsTexture.colorSpace = THREE.SRGBColorSpace;
      cloudsTexture.anisotropy = maxAnisotropy;
    } catch {
      earthTexture = createProceduralEarthFallback();
    }

    // PBR Material: Non-plastic, matte continents with specular liquid ocean glint
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      normalMap: normalTexture,
      normalScale: new THREE.Vector2(0.7, 0.7),
      roughnessMap: specularTexture,
      roughness: 0.85, // Continents are diffuse, non-plastic
      metalness: 0.05,
    });

    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    // Orient South America & Argentina toward camera in sunlit daylight
    earthMesh.rotation.y = THREE.MathUtils.degToRad(80);
    earthGroup.add(earthMesh);

    // Active Thermal Fire Hotspots on Argentina
    const hotspotsGroup = createThermalHotspotsGroup(earthRadius);
    earthMesh.add(hotspotsGroup);

    // Cloud Layer: Real NASA satellite clouds with subtle parallax
    let cloudMesh: THREE.Mesh | null = null;
    if (cloudsTexture) {
      const cloudGeo = new THREE.SphereGeometry(earthRadius * 1.012, 64, 64);
      const cloudMat = new THREE.MeshStandardMaterial({
        map: cloudsTexture,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        roughness: 0.9,
      });
      cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      cloudMesh.rotation.y = THREE.MathUtils.degToRad(80);
      earthGroup.add(cloudMesh);
    }

    // Atmospheric Rayleigh Scattering Rim (100% transparent in center, razor-thin luminous limb)
    const atmosphereGeometry = new THREE.SphereGeometry(earthRadius * 1.022, 64, 64);
    const atmosphereMaterial = createAtmosphericRimShaderMaterial();
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    earthGroup.add(atmosphereMesh);

    // 6. Constellation: MODIS & VIIRS Satellites & Orbits
    // Orbit 1: TERRA (MODIS · 705 km, 10:30 AM sun-synchronous node, Cyan)
    const terraRadius = 2.48;
    const terraOrbitGroup = new THREE.Group();
    terraOrbitGroup.rotation.x = THREE.MathUtils.degToRad(36);
    terraOrbitGroup.rotation.z = THREE.MathUtils.degToRad(-24);
    scene.add(terraOrbitGroup);

    const terraOrbitLine = createOrbitLine(terraRadius, '#68D9D0');
    terraOrbitGroup.add(terraOrbitLine);

    const terraHolder = new THREE.Group();
    terraOrbitGroup.add(terraHolder);

    // Orbit 2: AQUA (MODIS · 705 km, 1:30 PM sun-synchronous node, Lime)
    const aquaRadius = 2.64;
    const aquaOrbitGroup = new THREE.Group();
    aquaOrbitGroup.rotation.x = THREE.MathUtils.degToRad(-40);
    aquaOrbitGroup.rotation.z = THREE.MathUtils.degToRad(46);
    scene.add(aquaOrbitGroup);

    const aquaOrbitLine = createOrbitLine(aquaRadius, '#B8EE68');
    aquaOrbitGroup.add(aquaOrbitLine);

    const aquaHolder = new THREE.Group();
    aquaOrbitGroup.add(aquaHolder);

    // Orbit 3: SUOMI NPP (VIIRS · 824 km nominal, higher orbit, Orange)
    const viirsRadius = 2.95;
    const viirsOrbitGroup = new THREE.Group();
    viirsOrbitGroup.rotation.x = THREE.MathUtils.degToRad(64);
    viirsOrbitGroup.rotation.z = THREE.MathUtils.degToRad(16);
    scene.add(viirsOrbitGroup);

    const viirsOrbitLine = createOrbitLine(viirsRadius, '#FF9C55');
    viirsOrbitGroup.add(viirsOrbitLine);

    const viirsHolder = new THREE.Group();
    viirsOrbitGroup.add(viirsHolder);

    // Load Real NASA 3D Models with GLTFLoader (with procedural backup)
    const gltfLoader = new GLTFLoader();

    const loadSatelliteModel = (
      modelPath: string,
      targetGroup: THREE.Group,
      targetScale: number,
      accentColor: string
    ) => {
      const fallbackMesh = createProceduralSatelliteMesh(accentColor);
      targetGroup.add(fallbackMesh);

      try {
        gltfLoader.load(
          modelPath,
          (gltf) => {
            const model = gltf.scene;

            model.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                if (mesh.material) {
                  if (Array.isArray(mesh.material)) {
                    mesh.material.forEach((m) => {
                      m.depthWrite = true;
                    });
                  } else {
                    mesh.material.depthWrite = true;
                  }
                }
              }
            });

            // Center pivot and scale accurately
            const box = new THREE.Box3().setFromObject(model);
            const center = new THREE.Vector3();
            box.getCenter(center);
            model.position.sub(center);

            const size = new THREE.Vector3();
            box.getSize(size);
            const maxDim = Math.max(size.x, size.y, size.z);

            if (maxDim > 0) {
              const scale = targetScale / maxDim;
              model.scale.set(scale, scale, scale);
            }

            targetGroup.remove(fallbackMesh);
            targetGroup.add(model);
          },
          undefined,
          () => {
            // Keep fallback mesh on error
          }
        );
      } catch {
        // Keep fallback in test environments
      }
    };

    loadSatelliteModel('/models/terra.glb', terraHolder, 0.46, '#68D9D0');
    loadSatelliteModel('/models/aqua.glb', aquaHolder, 0.46, '#B8EE68');
    loadSatelliteModel('/models/suomi.glb', viirsHolder, 0.48, '#FF9C55');

    // 7. Interactive Drag & Zoom Controls
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
      if (cloudMesh) cloudMesh.rotation.y += rotationVelocityX;
      earthGroup.rotation.x = Math.max(-0.6, Math.min(0.6, earthGroup.rotation.x + rotationVelocityY));

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      // Zoom on Ctrl+Wheel without hijacking default page scrolling
      if (e.ctrlKey) {
        e.preventDefault();
        camera.position.z = Math.max(6.5, Math.min(11.5, camera.position.z + e.deltaY * 0.004));
      }
    };

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
      if (cloudMesh) cloudMesh.rotation.y += rotationVelocityX;
      earthGroup.rotation.x = Math.max(-0.6, Math.min(0.6, earthGroup.rotation.x + deltaY * 0.003));

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

    // 8. Fluid Animation Loop
    let clock = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        clock += 0.008;

        if (!isDragging) {
          rotationVelocityX *= 0.95;
          rotationVelocityY *= 0.95;
          earthMesh.rotation.y += 0.001 + rotationVelocityX;
          if (cloudMesh) cloudMesh.rotation.y += 0.0014 + rotationVelocityX;
          earthGroup.rotation.x = Math.max(-0.6, Math.min(0.6, earthGroup.rotation.x + rotationVelocityY));
        }

        // Terra Orbital Motion (MODIS morning pass)
        const terraAngle = clock * 0.65;
        terraHolder.position.set(
          Math.cos(terraAngle) * terraRadius,
          0,
          Math.sin(terraAngle) * terraRadius
        );
        terraHolder.lookAt(0, 0, 0);

        // Aqua Orbital Motion (MODIS afternoon pass)
        const aquaAngle = clock * 0.6 + Math.PI;
        aquaHolder.position.set(
          Math.cos(aquaAngle) * aquaRadius,
          0,
          Math.sin(aquaAngle) * aquaRadius
        );
        aquaHolder.lookAt(0, 0, 0);

        // Suomi NPP Orbital Motion (VIIRS afternoon pass)
        const viirsAngle = clock * 0.52 + Math.PI * 0.5;
        viirsHolder.position.set(
          Math.cos(viirsAngle) * viirsRadius,
          0,
          Math.sin(viirsAngle) * viirsRadius
        );
        viirsHolder.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      updateCameraFrustum();
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
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [webglAvailable]);

  return (
    <div className="w-full h-full bg-transparent select-none flex items-center justify-center">
      {webglAvailable ? (
        /* WebGL Three.js 3D Canvas - completely unobstructed in hero composition */
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          title="Earth 3D Observation · Drag to rotate · Scroll to zoom"
        />
      ) : (
        /* High-fidelity Fallback (for environments without WebGL, e.g. tests) */
        <div className="w-full h-full flex items-center justify-center p-6 bg-transparent">
          <div className="relative w-64 h-64 rounded-full border border-[#21312D] bg-gradient-to-tr from-[#07100F] via-[#0E241E] to-[#163D31] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#B8EE68]/30 animate-spin-slow" />
            <div className="text-center space-y-1 font-mono text-xs text-[#93A39C]">
              <div className="text-[#EFF5ED] font-bold text-sm">Earth 3D Simulation</div>
              <div className="text-[#B8EE68]">MODIS & VIIRS Constellation</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
