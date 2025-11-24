<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MapPin, Music, Code, Palette, Download, Moon, Sun, Clock, Film, GitBranch } from 'lucide-vue-next';

// Theme Toggle Logic
const themes = [
  { name: 'Cyber', color: '0, 255, 157' },
  { name: 'Sunset', color: '255, 107, 107' },
  { name: 'Ocean', color: '59, 130, 246' },
  { name: 'Lavender', color: '167, 139, 250' },
];

const currentThemeIndex = ref(0);
const isDark = ref(true); // Default to dark mode

// Avatar Cycling
const currentAvatarIndex = ref(0);
const totalAvatars = 7;

const cycleAvatar = () => {
  currentAvatarIndex.value = (currentAvatarIndex.value + 1) % totalAvatars;
};

// GitHub API
const latestCommit = ref<{repo: string, message: string, url: string} | null>(null);

const fetchLatestCommit = async () => {
  try {
    console.log('Fetching GitHub events...');
    const response = await fetch('https://api.github.com/users/gegedobruna/events/public');
    
    if (!response.ok) {
      console.error('GitHub API error:', response.status, response.statusText);
      throw new Error(`API returned ${response.status}`);
    }
    
    const events = await response.json();
    console.log('GitHub events:', events);
    
    // Find the first push event
    const pushEvent = events.find((event: any) => event.type === 'PushEvent');
    console.log('Found push event:', pushEvent);
    
    if (pushEvent && pushEvent.repo) {
      const commitMsg = pushEvent.payload?.commits?.[0]?.message || 'Fresh updates pushed';
      latestCommit.value = {
        repo: pushEvent.repo.name.split('/')[1], // Get repo name without username
        message: commitMsg,
        url: `https://github.com/${pushEvent.repo.name}`
      };
      console.log('Latest commit:', latestCommit.value);
    } else {
      console.log('No push events found, using fallback');
      latestCommit.value = { repo: 'portfolio', message: 'Building cool stuff', url: 'https://github.com/gegedobruna' };
    }
  } catch (error) {
    console.error('Failed to fetch GitHub commits:', error);
    latestCommit.value = { repo: 'portfolio', message: 'Building cool stuff', url: 'https://github.com/gegedobruna' };
  }
};

onMounted(() => {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
  } else {
    // Default to dark mode
    isDark.value = true;
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
  console.log('Theme initialized:', isDark.value ? 'dark' : 'light');
  
  // Fetch GitHub data
  fetchLatestCommit();
});

const toggleThemeColor = () => {
  currentThemeIndex.value = (currentThemeIndex.value + 1) % themes.length;
  const theme = themes[currentThemeIndex.value];
  document.documentElement.style.setProperty('--color-accent', theme.color);
};

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  console.log('Toggling to:', isDark.value ? 'dark' : 'light');
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
</script>

<template>
  <section id="about" class="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-4 auto-rows-min gap-4">
      
      <!-- Box 1: Hero/Bio (Spans 2x2) -->
      <div class="md:col-span-2 md:row-span-2 bg-white dark:bg-neutral-800 rounded-2xl p-8 border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent transition-all duration-300 flex flex-col justify-between group shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[8px_8px_0px_0px_rgb(var(--color-accent))] dark:hover:shadow-[8px_8px_0px_0px_rgb(var(--color-accent))]">
        <div>
          <div class="flex items-center space-x-4 mb-6">
            <button @click="cycleAvatar" class="w-16 h-16 rounded-full bg-zinc-100 dark:bg-neutral-800 overflow-hidden border-2 border-accent cursor-pointer hover:scale-105 transition-transform">
              <img :src="`/utils/avatar${currentAvatarIndex + 1}.webp`" alt="Gegë's Avatar" class="w-full h-full object-cover" />
            </button>
            <div>
              <h1 class="text-2xl font-bold text-zinc-900 dark:text-white">Gegë Dobruna</h1>
              <p class="text-zinc-600 dark:text-zinc-400 text-sm">Full-Stack & Data Science</p>
            </div>
          </div>
          <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            I'm Gegë - a Prishtina-based dev into data science, AI, and full-stack engineering. Recently graduated, currently building and improving things like Deckmoor, Schengo, and Audiolytics - working across interactive UIs, backend logic, GPU-leaning data workflows, and small tools that actually solve problems.
          </p>
          <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            I like clean builds, fast feedback loops, and projects that grow with me. Looking for places where I can contribute, learn, and level up - enthusiastic by default.
          </p>
        </div>
        <div>
          <a href="#" class="inline-flex items-center px-6 py-3 bg-accent text-slate-950 font-bold rounded-lg hover:opacity-90 transition-opacity">
            <Download class="w-5 h-5 mr-2" />
            Download CV
          </a>
        </div>
      </div>

      <!-- Box 2: Tech Stack (Spans 1x2) -->
      <div class="md:row-span-2 bg-white dark:bg-neutral-800 rounded-2xl p-6 border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent transition-all duration-300 hover:scale-[1.02] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))] dark:hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))]">
        <div class="flex items-center mb-4 text-accent">
          <Code class="w-6 h-6 mr-2" />
          <h3 class="font-bold text-zinc-900 dark:text-white">Tech Stack</h3>
        </div>
        <ul class="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
          <li class="flex items-center"><span class="w-2 h-2 rounded-full bg-accent mr-2"></span>Java</li>
          <li class="flex items-center"><span class="w-2 h-2 rounded-full bg-accent mr-2"></span>Vue 3 / TypeScript</li>
          <li class="flex items-center"><span class="w-2 h-2 rounded-full bg-accent mr-2"></span>Python</li>
          <li class="flex items-center"><span class="w-2 h-2 rounded-full bg-accent mr-2"></span>PHP / SQL / T-SQL</li>
          <li class="flex items-center"><span class="w-2 h-2 rounded-full bg-accent mr-2"></span>PyTorch / TensorFlow</li>
          <li class="flex items-center"><span class="w-2 h-2 rounded-full bg-accent mr-2"></span>Pandas / NumPy</li>
          <li class="flex items-center"><span class="w-2 h-2 rounded-full bg-accent mr-2"></span>Tailwind CSS</li>
        </ul>
      </div>

      <!-- Box 3: Now Status (Spans 1x1) -->
      <div class="bg-white dark:bg-neutral-800 rounded-2xl p-6 border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent transition-all duration-300 hover:scale-[1.02] flex flex-col justify-center relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))] dark:hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))]">
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
      <div class="bg-white dark:bg-neutral-800 rounded-2xl p-6 border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent transition-all duration-300 hover:scale-[1.02] flex flex-col justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))] dark:hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))]">
        <div class="flex items-center mb-2 text-green-500">
          <Music class="w-5 h-5 mr-2 animate-pulse" />
          <span class="text-xs font-bold uppercase tracking-wider">Now Playing</span>
        </div>
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-zinc-100 dark:bg-neutral-800 rounded-md flex-shrink-0 overflow-hidden">
             <!-- Placeholder Album Art -->
             <div class="w-full h-full bg-zinc-200 dark:bg-zinc-700 animate-pulse"></div>
          </div>
          <div class="min-w-0">
            <p class="text-zinc-900 dark:text-white font-medium text-sm truncate">Coming soon...</p>
            <p class="text-zinc-500 text-xs truncate">Spotify integration</p>
          </div>
        </div>
      </div>

      <!-- Box 5: Theme Toggle (Spans 1x1) -->
      <div class="bg-white dark:bg-neutral-800 rounded-2xl p-6 border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent transition-all duration-300 hover:scale-[1.02] flex flex-col items-center justify-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))] dark:hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))]">
        <div class="flex items-center gap-4">
           <button @click="toggleThemeColor" class="w-10 h-10 rounded-full bg-zinc-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors" title="Change Color">
            <Palette class="w-5 h-5 text-accent" />
          </button>
          <button @click="toggleDarkMode" class="w-10 h-10 rounded-full bg-zinc-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors" title="Toggle Dark Mode">
            <Moon v-if="isDark" class="w-5 h-5 text-zinc-900 dark:text-white" />
            <Sun v-else class="w-5 h-5 text-yellow-500" />
          </button>
        </div>
        <p class="text-zinc-500 text-xs">{{ themes[currentThemeIndex].name }} Mode</p>
      </div>

      <!-- Box 6: Fresh Code Drop (Spans 1x1) -->
      <a :href="latestCommit?.url || 'https://github.com/gegedobruna'" target="_blank" rel="noopener noreferrer" class="bg-white dark:bg-neutral-800 rounded-2xl p-6 border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent transition-all duration-300 hover:scale-[1.02] flex flex-col justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))] dark:hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))]">
        <div class="flex items-center mb-3 text-accent">
          <GitBranch class="w-5 h-5 mr-2" />
          <h3 class="font-bold text-zinc-900 dark:text-white text-sm">Fresh Code Drop</h3>
        </div>
        <div v-if="latestCommit">
          <p class="text-zinc-900 dark:text-white font-medium text-sm mb-1">{{ latestCommit.repo }}</p>
          <p class="text-zinc-600 dark:text-zinc-400 text-xs line-clamp-2">{{ latestCommit.message }}</p>
        </div>
        <div v-else class="animate-pulse">
          <div class="h-4 bg-zinc-200 dark:bg-zinc-700 rounded mb-2"></div>
          <div class="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
        </div>
      </a>

      <!-- Box 7: Globe/Countries Visited (Spans 1x1) -->
      <router-link to="/globe" class="bg-white dark:bg-neutral-800 rounded-2xl p-6 border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent transition-all duration-300 hover:scale-[1.02] flex flex-col items-center justify-center text-center cursor-pointer group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))] dark:hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))]">
        <MapPin class="w-8 h-8 text-accent mb-2 group-hover:animate-bounce" />
        <h3 class="text-zinc-900 dark:text-white font-bold mb-1">Countries Visited</h3>
        <div class="flex flex-wrap justify-center gap-2 mt-2">
          <span class="text-2xl" title="Hungary">🇭🇺</span>
          <span class="text-2xl" title="Belgium">🇧🇪</span>
          <span class="text-2xl" title="USA">🇺🇸</span>
          <span class="text-xs text-zinc-500 mt-1 block w-full">+ more</span>
        </div>
      </router-link>

      <!-- Box 8: Favorite Movies (Spans 1x1) -->
      <a href="http://letterboxd.com/cowboyblood/" target="_blank" rel="noopener noreferrer" class="bg-white dark:bg-neutral-800 rounded-2xl p-6 border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent transition-all duration-300 hover:scale-[1.02] flex flex-col items-center justify-center text-center group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))] dark:hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))]">
        <Film class="w-8 h-8 text-accent mb-2 group-hover:scale-110 transition-transform" />
        <h3 class="text-zinc-900 dark:text-white font-bold mb-1">Favorite Movies</h3>
        <p class="text-zinc-600 dark:text-zinc-400 text-xs">View on Letterboxd</p>
      </a>

    </div>
  </section>
</template>
