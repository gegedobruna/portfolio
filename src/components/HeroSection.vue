<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MapPin, Music, Code, Cpu, Palette, Download } from 'lucide-vue-next';

// Theme Toggle Logic
const themes = [
  { name: 'Emerald', value: '52 211 153', class: 'bg-emerald-400' },
  { name: 'Blue', value: '59 130 246', class: 'bg-blue-400' },
  { name: 'Purple', value: '168 85 247', class: 'bg-purple-400' },
  { name: 'Rose', value: '251 113 133', class: 'bg-rose-400' },
];

const currentThemeIndex = ref(0);

const toggleTheme = () => {
  currentThemeIndex.value = (currentThemeIndex.value + 1) % themes.length;
  const theme = themes[currentThemeIndex.value];
  document.documentElement.style.setProperty('--color-accent', theme.value);
};

// Spotify Mock
const isPlaying = ref(true);
</script>

<template>
  <section id="about" class="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-4 auto-rows-min gap-4">
      
      <!-- Box 1: Hero/Bio (Spans 2x2) -->
      <div class="md:col-span-2 md:row-span-2 bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div class="flex items-center space-x-4 mb-6">
            <div class="w-16 h-16 rounded-full bg-zinc-800 overflow-hidden border-2 border-accent">
              <!-- Placeholder Avatar -->
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" class="w-full h-full object-cover" />
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white">Full-Stack Developer &<br/>Data Science Enthusiast</h1>
            </div>
          </div>
          <p class="text-zinc-400 leading-relaxed mb-6">
            23-year-old CS student based in Belgium. Focused on practical business logic, UI engineering, and GPU-accelerated data science.
          </p>
        </div>
        <div>
          <a href="#" class="inline-flex items-center px-6 py-3 bg-accent text-slate-950 font-bold rounded-lg hover:opacity-90 transition-opacity">
            <Download class="w-5 h-5 mr-2" />
            Download CV
          </a>
        </div>
      </div>

      <!-- Box 2: Tech Stack (Spans 1x1) -->
      <div class="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300 hover:scale-[1.02]">
        <div class="flex items-center mb-4 text-accent">
          <Code class="w-6 h-6 mr-2" />
          <h3 class="font-bold text-white">Tech Stack</h3>
        </div>
        <ul class="space-y-2 text-zinc-400 text-sm">
          <li class="flex items-center"><span class="w-2 h-2 rounded-full bg-accent mr-2"></span>Java</li>
          <li class="flex items-center"><span class="w-2 h-2 rounded-full bg-accent mr-2"></span>Vue 3 / TypeScript</li>
          <li class="flex items-center"><span class="w-2 h-2 rounded-full bg-accent mr-2"></span>PHP / SQL</li>
          <li class="flex items-center"><span class="w-2 h-2 rounded-full bg-accent mr-2"></span>Tailwind CSS</li>
        </ul>
      </div>

      <!-- Box 3: Specialized Niche (Spans 1x1) -->
      <div class="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
        <div class="relative z-10">
          <div class="flex items-center mb-4 text-accent">
            <Cpu class="w-6 h-6 mr-2" />
            <h3 class="font-bold text-white">GPU Computing</h3>
          </div>
          <div class="space-y-1 text-zinc-400 font-mono text-sm">
            <p>cuDF</p>
            <p>cuML</p>
            <p>cuGraph</p>
            <p>R Language</p>
          </div>
        </div>
        <!-- Decorative background element -->
        <div class="absolute -bottom-4 -right-4 text-zinc-800/50">
          <Cpu class="w-24 h-24" />
        </div>
      </div>

      <!-- Box 4: Spotify (Spans 1x1) -->
      <div class="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300 hover:scale-[1.02] flex flex-col justify-center">
        <div class="flex items-center mb-2 text-green-500">
          <Music class="w-5 h-5 mr-2 animate-pulse" />
          <span class="text-xs font-bold uppercase tracking-wider">Now Playing</span>
        </div>
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-zinc-800 rounded-md flex-shrink-0 overflow-hidden">
             <!-- Placeholder Album Art -->
             <div class="w-full h-full bg-zinc-700 animate-pulse"></div>
          </div>
          <div class="min-w-0">
            <p class="text-white font-medium truncate">Florence + the Machine</p>
            <p class="text-zinc-500 text-sm truncate">Dog Days Are Over</p>
          </div>
        </div>
      </div>

      <!-- Box 5: Globe/Location (Spans 1x1) -->
      <div class="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300 hover:scale-[1.02] flex flex-col items-center justify-center text-center">
        <MapPin class="w-8 h-8 text-accent mb-2" />
        <h3 class="text-white font-bold mb-1">Countries Visited</h3>
        <div class="flex flex-wrap justify-center gap-2 mt-2">
          <span class="text-2xl" title="Belgium">🇧🇪</span>
          <span class="text-2xl" title="Kosovo">🇽🇰</span>
          <span class="text-2xl" title="France">🇫🇷</span>
          <span class="text-2xl" title="Germany">🇩🇪</span>
        </div>
      </div>

      <!-- Box 6: Theme Toggle (Spans 1x1) -->
      <div class="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300 hover:scale-[1.02] flex flex-col items-center justify-center cursor-pointer group" @click="toggleTheme">
        <div class="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-3 group-hover:bg-zinc-700 transition-colors">
          <Palette class="w-6 h-6 text-accent" />
        </div>
        <h3 class="text-white font-bold text-sm">Change Theme</h3>
        <p class="text-zinc-500 text-xs mt-1">{{ themes[currentThemeIndex].name }}</p>
      </div>

    </div>
  </section>
</template>
