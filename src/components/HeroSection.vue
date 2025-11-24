<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MapPin, Music, Code, Palette, Download, Moon, Sun, Monitor, Clock } from 'lucide-vue-next';

// Theme Toggle Logic
const themes = [
  { name: 'Emerald', value: '52 211 153', class: 'bg-emerald-400' },
  { name: 'Blue', value: '59 130 246', class: 'bg-blue-400' },
  { name: 'Purple', value: '168 85 247', class: 'bg-purple-400' },
  { name: 'Rose', value: '251 113 133', class: 'bg-rose-400' },
];

const currentThemeIndex = ref(0);
const isDark = ref(true);

onMounted(() => {
  // Check for saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
  }
});

const toggleThemeColor = () => {
  currentThemeIndex.value = (currentThemeIndex.value + 1) % themes.length;
  const theme = themes[currentThemeIndex.value];
  document.documentElement.style.setProperty('--color-accent', theme.value);
};

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

// Now Status Logic
type StatusMode = 'looking' | 'employed' | 'project';
const statusMode = ref<StatusMode>('looking'); // Change this manually as requested

const getStatusConfig = (mode: StatusMode) => {
  switch (mode) {
    case 'looking': return { text: 'Looking for a job', color: 'bg-green-500', glow: 'shadow-[0_0_15px_rgba(34,197,94,0.6)]' };
    case 'employed': return { text: 'Full-time employed', color: 'bg-red-500', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.6)]' };
    case 'project': return { text: 'Working on a project', color: 'bg-yellow-500', glow: 'shadow-[0_0_15px_rgba(234,179,8,0.6)]' };
  }
};

// Spotify Mock
const isPlaying = ref(true);
</script>

<template>
  <section id="about" class="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-4 auto-rows-min gap-4">
      
      <!-- Box 1: Hero/Bio (Spans 2x2) -->
      <div class="md:col-span-2 md:row-span-2 bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div class="flex items-center space-x-4 mb-6">
            <div class="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden border-2 border-accent">
              <!-- Placeholder Avatar -->
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" class="w-full h-full object-cover" />
            </div>
            <div>
              <h1 class="text-2xl font-bold text-zinc-900 dark:text-white">Full-Stack Developer &<br/>Data Science Enthusiast</h1>
            </div>
          </div>
          <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
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
      <div class="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300 hover:scale-[1.02]">
        <div class="flex items-center mb-4 text-accent">
          <Code class="w-6 h-6 mr-2" />
          <h3 class="font-bold text-zinc-900 dark:text-white">Tech Stack</h3>
        </div>
        <ul class="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
          <li class="flex items-center"><span class="w-2 h-2 rounded-full bg-accent mr-2"></span>Java</li>
          <li class="flex items-center"><span class="w-2 h-2 rounded-full bg-accent mr-2"></span>Vue 3 / TypeScript</li>
          <li class="flex items-center"><span class="w-2 h-2 rounded-full bg-accent mr-2"></span>PHP / SQL</li>
          <li class="flex items-center"><span class="w-2 h-2 rounded-full bg-accent mr-2"></span>Tailwind CSS</li>
        </ul>
      </div>

      <!-- Box 3: Now Status (Spans 1x1) -->
      <div class="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300 hover:scale-[1.02] flex flex-col justify-center relative overflow-hidden">
        <div class="flex items-center mb-2 text-zinc-500 dark:text-zinc-400">
          <Clock class="w-5 h-5 mr-2" />
          <span class="text-xs font-bold uppercase tracking-wider">Now</span>
        </div>
        <div class="mt-2">
          <div class="flex items-center space-x-3">
            <div class="relative">
              <div :class="['w-3 h-3 rounded-full animate-pulse', getStatusConfig(statusMode).color, getStatusConfig(statusMode).glow]"></div>
            </div>
            <p class="text-zinc-900 dark:text-white font-medium text-sm">{{ getStatusConfig(statusMode).text }}</p>
          </div>
          <p class="text-zinc-500 text-xs mt-2 pl-6">Based in Belgium</p>
        </div>
      </div>

      <!-- Box 4: Spotify (Spans 1x1) -->
      <div class="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300 hover:scale-[1.02] flex flex-col justify-center">
        <div class="flex items-center mb-2 text-green-500">
          <Music class="w-5 h-5 mr-2 animate-pulse" />
          <span class="text-xs font-bold uppercase tracking-wider">Now Playing</span>
        </div>
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-md flex-shrink-0 overflow-hidden">
             <!-- Placeholder Album Art -->
             <div class="w-full h-full bg-zinc-200 dark:bg-zinc-700 animate-pulse"></div>
          </div>
          <div class="min-w-0">
            <p class="text-zinc-900 dark:text-white font-medium truncate">Florence + the Machine</p>
            <p class="text-zinc-500 text-sm truncate">Dog Days Are Over</p>
          </div>
        </div>
      </div>

      <!-- Box 5: Globe/Location (Spans 1x1) -->
      <router-link to="/globe" class="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300 hover:scale-[1.02] flex flex-col items-center justify-center text-center cursor-pointer group">
        <MapPin class="w-8 h-8 text-accent mb-2 group-hover:animate-bounce" />
        <h3 class="text-zinc-900 dark:text-white font-bold mb-1">Countries Visited</h3>
        <div class="flex flex-wrap justify-center gap-2 mt-2">
          <span class="text-2xl" title="Belgium">🇧🇪</span>
          <span class="text-2xl" title="Kosovo">🇽🇰</span>
          <span class="text-2xl" title="USA">🇺🇸</span>
          <span class="text-xs text-zinc-500 mt-1 block w-full">+ more</span>
        </div>
      </router-link>

      <!-- Box 6: Theme Toggle (Spans 1x1) -->
      <div class="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300 hover:scale-[1.02] flex flex-col items-center justify-center gap-4">
        <div class="flex items-center gap-4">
           <button @click="toggleThemeColor" class="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors" title="Change Color">
            <Palette class="w-5 h-5 text-accent" />
          </button>
          <button @click="toggleDarkMode" class="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors" title="Toggle Dark Mode">
            <Moon v-if="isDark" class="w-5 h-5 text-zinc-900 dark:text-white" />
            <Sun v-else class="w-5 h-5 text-yellow-500" />
          </button>
        </div>
        <p class="text-zinc-500 text-xs">{{ themes[currentThemeIndex].name }} Mode</p>
      </div>

    </div>
  </section>
</template>
