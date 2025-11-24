<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import ThreeGlobe from 'three-globe';
import { ArrowLeft } from 'lucide-vue-next';

const canvasRef = ref<HTMLCanvasElement>();
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;
let globe: any;

// Countries visited - matching ISO A3 codes
const visitedCountries = [
  'KOS', // Kosovo 
  'ALB', // Albania
  'MNE', // Montenegro
  'MKD', // Macedonia
  'TUR', // Turkey
  'HUN', // Hungary
  'BEL', // Belgium
  'AUT', // Austria
  'DEU', // Germany
  'USA', // United States
];

// Helper function to check if a country is visited
function isCountryVisited(properties: any): boolean {
  const iso3 = properties.ISO_A3;
  const iso3eh = properties.ISO_A3_EH;
  
  // Direct ISO code match
  if (iso3 && visitedCountries.includes(iso3)) {
    return true;
  }
  if (iso3eh && visitedCountries.includes(iso3eh)) {
    return true;
  }
  
  // Special check for Kosovo by name only (not by code)
  const name = properties.NAME?.toLowerCase() || '';
  const admin = properties.ADMIN?.toLowerCase() || '';
  if (name === 'kosovo' || admin === 'kosovo') {
    return true;
  }
  
  return false;
}

function getAccentColor() {
  const accentRGB = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
  if (accentRGB) {
    const [r, g, b] = accentRGB.split(' ').map(Number);
    return `rgb(${r}, ${g}, ${b})`;
  }
  return 'rgb(52, 211, 153)'; // fallback emerald
}

onMounted(async () => {
  if (!canvasRef.value) return;

  // Scene Setup
  scene = new THREE.Scene();

  // Camera Setup
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 300;

  // Renderer Setup
  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.minDistance = 150;
  controls.maxDistance = 500;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(5, 3, 5);
  scene.add(directionalLight);

  // Globe - solid light color instead of texture
  globe = new ThreeGlobe()
    .globeMaterial(new THREE.MeshPhongMaterial({ 
      color: 0xe5e5e5, // light gray
      shininess: 5,
    }))
    .showAtmosphere(true)
    .atmosphereColor('#34d399')
    .atmosphereAltitude(0.15);

  // Load country polygons
  fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson')
    .then(res => res.json())
    .then(countries => {
      const accentColor = getAccentColor();
      
      globe
        .polygonsData(countries.features)
        .polygonCapColor((d: any) => {
          return isCountryVisited(d.properties) ? accentColor : 'rgba(200, 200, 200, 0.1)';
        })
        .polygonSideColor(() => 'rgba(0, 0, 0, 0.05)')
        .polygonStrokeColor(() => '#666666') // Dark gray borders for all countries
        .polygonAltitude((d: any) => {
          return isCountryVisited(d.properties) ? 0.01 : 0.001;
        })
        .polygonsTransitionDuration(300);
    });

  scene.add(globe);

  // Animation Loop
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  // Resize Handler
  window.addEventListener('resize', onWindowResize);
});

const onWindowResize = () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
};

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
  if (renderer) {
    renderer.dispose();
  }
});
</script>

<template>
  <div class="min-h-screen pt-0 flex flex-col items-center justify-center relative overflow-hidden bg-zinc-100 dark:bg-zinc-950 transition-colors duration-300">
    <router-link to="/" class="absolute top-8 left-8 z-20 flex items-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors bg-white/50 dark:bg-zinc-900/50 px-4 py-2 rounded-full backdrop-blur-md border border-zinc-300 dark:border-zinc-800">
      <ArrowLeft class="w-5 h-5 mr-2" />
      Back to Home
    </router-link>
    
    <div class="z-10 text-center mb-0 absolute top-24 pointer-events-none">
      <h1 class="text-4xl font-bold text-zinc-900 dark:text-white mb-2">Global Footprint</h1>
      <p class="text-zinc-600 dark:text-zinc-400">Highlighted countries show places I've visited.</p>
    </div>

    <canvas ref="canvasRef" class="outline-none cursor-move"></canvas>
  </div>
</template>
