<script setup lang="ts">
import { onMounted, ref } from 'vue';
import createGlobe from 'cobe';
import { ArrowLeft } from 'lucide-vue-next';

const canvasRef = ref<HTMLCanvasElement>();

onMounted(() => {
  let phi = 0;

  if (!canvasRef.value) return;

  const globe = createGlobe(canvasRef.value, {
    devicePixelRatio: 2,
    width: 1000,
    height: 1000,
    phi: 0,
    theta: 0,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [varToRgb(getComputedStyle(document.documentElement).getPropertyValue('--color-accent'))],
    glowColor: [0.1, 0.1, 0.1],
    markers: [
      { location: [42.6629, 21.1655], size: 0.1 }, // Kosovo
      { location: [41.3275, 19.8187], size: 0.05 }, // Albania
      { location: [42.4304, 19.2594], size: 0.05 }, // Montenegro
      { location: [41.6086, 21.7453], size: 0.05 }, // Macedonia
      { location: [38.9637, 35.2433], size: 0.05 }, // Turkey
      { location: [47.1625, 19.5033], size: 0.05 }, // Hungary
      { location: [50.8503, 4.3517], size: 0.1 }, // Belgium
      { location: [47.5162, 14.5501], size: 0.05 }, // Austria
      { location: [51.1657, 10.4515], size: 0.05 }, // Germany
      { location: [40.7128, -74.0060], size: 0.05 }, // New York
      { location: [34.0489, -111.0937], size: 0.05 }, // Arizona
      { location: [38.8026, -116.4194], size: 0.05 }, // Nevada
      { location: [36.7783, -119.4179], size: 0.05 }, // California
      { location: [40.6331, -89.3985], size: 0.05 }, // Illinois
      { location: [34.5199, -105.8701], size: 0.05 }, // New Mexico
    ],
    onRender: (state) => {
      state.phi = phi;
      phi += 0.005;
    },
  });
});

function varToRgb(str: string): [number, number, number] {
  // Simple parser for "R G B" string to [0-1, 0-1, 0-1]
  const parts = str.trim().split(' ').map(Number);
  if (parts.length === 3) {
    return [parts[0]/255, parts[1]/255, parts[2]/255];
  }
  return [0.2, 0.8, 0.6]; // Default fallback
}
</script>

<template>
  <div class="min-h-screen pt-32 flex flex-col items-center justify-center relative overflow-hidden">
    <router-link to="/" class="absolute top-32 left-8 z-20 flex items-center text-zinc-400 hover:text-white transition-colors">
      <ArrowLeft class="w-6 h-6 mr-2" />
      Back to Home
    </router-link>
    
    <div class="z-10 text-center mb-8">
      <h1 class="text-4xl font-bold text-white mb-4">Global Footprint</h1>
      <p class="text-zinc-400">Places I've visited and explored.</p>
    </div>

    <div class="w-full max-w-3xl aspect-square relative">
      <canvas
        ref="canvasRef"
        style="width: 100%; height: 100%; contain: layout paint size; opacity: 0; transition: opacity 1s ease;"
        :style="{ opacity: canvasRef ? 1 : 0 }"
      />
    </div>
  </div>
</template>
