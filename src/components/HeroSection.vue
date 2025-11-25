<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { MapPin, Music, Code, Palette, Download, Moon, Sun, Clock, Film, GitBranch } from 'lucide-vue-next';

// Theme Toggle Logic
const themes = [
  { name: 'Cyber', color: '0 255 157' },
  { name: 'Sunset', color: '255 107 107' },
  { name: 'Ocean', color: '59 130 246' },
  { name: 'Lavender', color: '167 139 250' },
];

const currentThemeIndex = ref(0);
const isDark = ref(true); // Default to dark mode

// Avatar Cycling
const currentAvatarIndex = ref(0);
const totalAvatars = 7;
const avatarPaths = Array.from(
  { length: totalAvatars },
  (_, i) => new URL(`../assets/avatars/avatar${i + 1}.webp`, import.meta.url).href
);

const cycleAvatar = () => {
  currentAvatarIndex.value = (currentAvatarIndex.value + 1) % totalAvatars;
};

// GitHub API
type LatestCommit = {
  repo: string;
  message: string;
  date: string;
  url: string;
};

const latestCommit = ref<LatestCommit | null>(null);
const commitState = ref<'loading' | 'ready' | 'empty' | 'error'>('loading');
const commitError = ref<string | null>(null);
const commitCacheKey = 'latestCommitCache';

const formatCommitDate = (dateString?: string) => {
  if (!dateString) return 'Unknown date';
  const parsed = new Date(dateString);
  return Number.isNaN(parsed.getTime())
    ? 'Unknown date'
    : parsed.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
};

const fetchLatestCommit = async () => {
  const cached = getCachedLatestCommit();
  if (cached && !latestCommit.value) {
    latestCommit.value = cached;
    commitState.value = 'ready';
  } else {
    commitState.value = latestCommit.value ? 'ready' : 'loading';
  }

  commitError.value = null;

  try {
    const eventsResponse = await fetch(`https://api.github.com/users/gegedobruna/events?t=${Date.now()}`, {
      cache: 'no-store'
    });

    const eventsText = await eventsResponse.text();
    if (!eventsResponse.ok) {
      const apiMessage = safeParse(eventsText)?.message;
      throw new Error(apiMessage || `API returned ${eventsResponse.status}`);
    }

    const events = safeParse(eventsText) || [];
    const pushEvent = events.find((event: any) => event?.type === 'PushEvent');

    if (!pushEvent) {
      commitState.value = latestCommit.value ? 'ready' : 'empty';
      return;
    }

    const repoFullName = pushEvent?.repo?.name;
    const headSha = pushEvent?.payload?.head;
    const fallbackDate = pushEvent?.created_at;

    if (!repoFullName || !headSha) {
      commitState.value = latestCommit.value ? 'ready' : 'empty';
      return;
    }

    const fallbackCommit: LatestCommit = {
      repo: repoFullName,
      message: 'Latest update',
      date: fallbackDate || '',
      url: `https://github.com/${repoFullName}/commit/${headSha}`
    };

    try {
      const commitResponse = await fetch(`https://api.github.com/repos/${repoFullName}/commits/${headSha}`, {
        cache: 'no-store'
      });

      const commitText = await commitResponse.text();
      if (!commitResponse.ok) {
        const commitMessage = safeParse(commitText)?.message;
        throw new Error(commitMessage || `Commit API returned ${commitResponse.status}`);
      }

      const commitData = safeParse(commitText) || {};
      const commitMessage = commitData?.commit?.message || fallbackCommit.message;
      const commitDate = commitData?.commit?.author?.date || fallbackCommit.date;
      const commitUrl = commitData?.html_url || fallbackCommit.url;

      latestCommit.value = {
        repo: repoFullName,
        message: commitMessage,
        date: commitDate,
        url: commitUrl
      };
      setCachedLatestCommit(latestCommit.value);
      commitState.value = 'ready';
    } catch (commitError) {
      console.warn('Commit fetch failed, showing fallback push info:', commitError);
      latestCommit.value = fallbackCommit;
      setCachedLatestCommit(latestCommit.value);
      commitState.value = 'ready';
    }
  } catch (error: any) {
    console.error('Failed to fetch GitHub commits:', error);
    commitError.value = error?.message || 'Unable to load activity';
    commitState.value = latestCommit.value ? 'ready' : 'error';
  }
};

const safeParse = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const getCachedLatestCommit = (): LatestCommit | null => {
  try {
    const stored = localStorage.getItem(commitCacheKey);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const setCachedLatestCommit = (commit: LatestCommit) => {
  try {
    localStorage.setItem(commitCacheKey, JSON.stringify(commit));
  } catch {
    // ignore cache errors
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
  setAccentColor();
  currentAvatarIndex.value = Math.floor(Math.random() * totalAvatars);
  
  // Fetch GitHub data
  fetchLatestCommit();
  // Fetch Spotify data
  fetchNowPlaying();
});

const toggleThemeColor = () => {
  currentThemeIndex.value = (currentThemeIndex.value + 1) % themes.length;
  setAccentColor();
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

const setAccentColor = () => {
  const theme = themes[currentThemeIndex.value];
  document.documentElement.style.setProperty('--color-accent', theme.color);
};

const globeTexture = new URL('../assets/globe/globe.webp', import.meta.url).href;
const moviePosters = [
  new URL('../assets/movies/movie1.webp', import.meta.url).href,
  new URL('../assets/movies/movie2.webp', import.meta.url).href,
  new URL('../assets/movies/movie3.webp', import.meta.url).href
];

const currentAvatarSrc = computed(() => avatarPaths[currentAvatarIndex.value]);

// Spotify Now Playing
type SpotifyNowPlaying = {
  playing: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
};

const spotifyLoading = ref(true);
const spotifyError = ref<string | null>(null);
const spotifyNowPlaying = ref<SpotifyNowPlaying | null>(null);

const fetchNowPlaying = async () => {
  spotifyLoading.value = true;
  spotifyError.value = null;
  try {
    const response = await fetch('/.netlify/functions/now_playing', {
      cache: 'no-store'
    });
    const text = await response.text();
    const data = JSON.parse(text || '{}');

    if (!response.ok) {
      throw new Error(data?.error || `Spotify API returned ${response.status}`);
    }

    spotifyNowPlaying.value = data;
  } catch (err: any) {
    console.error('Failed to fetch Spotify now playing:', err);
    spotifyError.value = 'Unable to load Spotify';
  } finally {
    spotifyLoading.value = false;
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
          <div class="flex items-center justify-between gap-4 mb-6">
            <div class="text-left">
              <h1 class="text-2xl font-bold text-zinc-900 dark:text-white">Gegë Dobruna</h1>
              <p class="text-zinc-600 dark:text-zinc-400 text-sm">Full-Stack & Data Science</p>
            </div>
            <button @click="cycleAvatar" class="w-[8rem] h-[8rem] rounded-2xl bg-zinc-100 dark:bg-neutral-800 overflow-hidden border-2 border-accent cursor-pointer hover:scale-105 transition-transform">
              <img :src="currentAvatarSrc" alt="Gegë's Avatar" class="w-full h-full object-cover" />
            </button>
          </div>
          <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            I'm Gegë - a Prishtina-based dev into data science, AI, and full-stack engineering. Recently graduated, currently building and improving things like Deckmoor, Schengo, and Audiolytics - working across interactive UIs, backend logic, GPU-leaning data workflows, and small tools that actually solve problems.
          </p>
          <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            I like clean builds, fast feedback loops, and projects that grow with me. Looking for places where I can contribute, learn, and level up - enthusiastic by default.
          </p>
        </div>
        <div>
          <a
            href="#"
            class="inline-flex items-center px-6 py-3 text-slate-950 font-bold rounded-lg hover:opacity-90 transition-opacity shadow-[0_12px_30px_-10px_rgba(0,0,0,0.35)]"
            :style="{ backgroundColor: 'rgb(var(--color-accent))', boxShadow: '0 12px 30px -10px rgba(var(--color-accent), 0.5)' }"
          >
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
          <Clock class="w-5 h-5 mr-2 text-accent" />
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
          <Music class="w-5 h-5 mr-2" :class="{'animate-pulse': spotifyNowPlaying?.playing}" />
          <span class="text-xs font-bold uppercase tracking-wider">Now Listening To:</span>
        </div>
        <div v-if="spotifyLoading" class="flex items-center space-x-3 animate-pulse">
          <div class="w-12 h-12 bg-zinc-200 dark:bg-zinc-700 rounded-md"></div>
          <div class="min-w-0 space-y-2">
            <div class="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-32"></div>
            <div class="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-24"></div>
          </div>
        </div>
        <div v-else-if="spotifyError" class="text-xs text-red-500">{{ spotifyError }}</div>
        <a
          v-else-if="spotifyNowPlaying?.playing"
          href="https://open.spotify.com/user/315caev7ytarjdwjnsswov6kqtxm?si=e9a1b08f3012424d"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center space-x-4 group/link"
        >
          <div class="w-20 h-20 bg-zinc-100 dark:bg-neutral-800 rounded-lg flex-shrink-0 overflow-hidden shadow-sm">
            <img v-if="spotifyNowPlaying.albumArt" :src="spotifyNowPlaying.albumArt" alt="Album art" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full bg-zinc-200 dark:bg-zinc-700"></div>
          </div>
          <div class="min-w-0">
            <p class="text-zinc-900 dark:text-white font-semibold text-lg truncate group-hover/link:text-accent transition-colors">
              {{ spotifyNowPlaying.title || 'Unknown track' }}
            </p>
            <p class="text-zinc-500 dark:text-zinc-400 text-base truncate">{{ spotifyNowPlaying.artist || 'Unknown artist' }}</p>
          </div>
        </a>
        <div v-else class="text-xs text-zinc-500 dark:text-zinc-400">Not playing anything</div>
      </div>

      <!-- Box 5: Theme Toggle (Spans 1x1) -->
      <div class="bg-white dark:bg-neutral-800 rounded-2xl p-6 border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent transition-all duration-300 hover:scale-[1.02] flex flex-col items-center justify-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))] dark:hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))] short-tile">
        <div class="flex items-center gap-4">
           <button @click="toggleThemeColor" class="w-14 h-14 rounded-full bg-zinc-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors" title="Change Color">
            <Palette class="w-11 h-11 text-accent" />
          </button>
          <button @click="toggleDarkMode" class="w-14 h-14 rounded-full bg-zinc-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors" title="Toggle Dark Mode">
            <Moon v-if="isDark" class="w-11 h-11 text-zinc-900 dark:text-white" />
            <Sun v-else class="w-11 h-11 text-yellow-500" />
          </button>
        </div>
        <p class="text-zinc-500 text-xs">{{ themes[currentThemeIndex].name }} Mode</p>
      </div>

      <!-- Box 6: Fresh Code Drop (Spans 1x1) -->
      <div class="bg-white dark:bg-neutral-800 rounded-2xl p-6 border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent transition-all duration-300 hover:scale-[1.02] flex flex-col justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))] dark:hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))] short-tile">
        <div class="flex items-center mb-3 text-accent">
          <GitBranch class="w-5 h-5 mr-2" />
          <h3 class="font-bold text-zinc-900 dark:text-white text-sm">Fresh Code Drop</h3>
        </div>
        <div v-if="commitState === 'ready' && latestCommit" class="space-y-2">
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <p class="text-zinc-900 dark:text-white font-medium text-sm truncate">{{ latestCommit.repo }}</p>
              <p class="text-zinc-600 dark:text-zinc-400 text-xs line-clamp-2">{{ latestCommit.message }}</p>
            </div>
            <a :href="latestCommit.url" target="_blank" rel="noopener noreferrer" class="text-xs font-semibold text-accent hover:opacity-80 whitespace-nowrap">View</a>
          </div>
          <p class="text-[11px] text-zinc-500 dark:text-zinc-400">Updated {{ formatCommitDate(latestCommit.date) }}</p>
        </div>
        <div v-else-if="commitState === 'empty'" class="text-zinc-500 dark:text-zinc-400 text-xs">No recent activity</div>
        <div v-else-if="commitState === 'error'" class="text-red-500 text-xs">{{ commitError || 'Unable to load activity' }}</div>
        <div v-else class="animate-pulse">
          <div class="h-4 bg-zinc-200 dark:bg-zinc-700 rounded mb-2"></div>
          <div class="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
        </div>
      </div>

      <!-- Box 7: Globe/Countries Visited (Spans 1x1) -->
      <router-link to="/globe" class="globe-card bg-white dark:bg-neutral-800 rounded-2xl p-5 border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent transition-all duration-300 hover:scale-[1.02] flex flex-col items-center justify-start text-center cursor-pointer group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))] dark:hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))] short-tile">
        <div class="globe-title flex items-center gap-2 mb-3">
          <MapPin class="w-7 h-7 text-accent" />
          <h3 class="text-zinc-900 dark:text-white font-bold">Global Footprint</h3>
          
        </div>
        <div class="globe-wrap" :style="{ '--globe-texture': `url(${globeTexture})` }">
          <div class="globe"></div>
        </div>
      </router-link>

      <!-- Box 8: Favorite Movies (Spans 1x1) -->
      <a href="http://letterboxd.com/cowboyblood/" target="_blank" rel="noopener noreferrer" class="movie-card bg-white dark:bg-neutral-800 rounded-2xl p-5 border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent transition-all duration-300 hover:scale-[1.02] flex flex-col items-start justify-start text-left group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))] dark:hover:shadow-[6px_6px_0px_0px_rgb(var(--color-accent))] short-tile">
        <Film class="w-8 h-8 text-accent mb-2 group-hover:scale-110 transition-transform" />
        <h3 class="text-zinc-900 dark:text-white font-bold mb-3">My Favorite Movies</h3>
        <div class="poster-stack">
          <img v-for="(poster, idx) in moviePosters" :key="poster" :src="poster" :alt="`Movie poster ${idx + 1}`" class="poster" :class="`poster-${idx}`" />
        </div>
      </a>

    </div>
  </section>
</template>

<style scoped>
.globe-wrap {
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 9999px;
  overflow: hidden;
  background: radial-gradient(ellipse at 30% 30%, rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0.05)),
    radial-gradient(ellipse at 70% 70%, rgba(0, 0, 0, 0.3), transparent 60%);
  box-shadow: inset -12px -10px 25px rgba(0, 0, 0, 0.2);
  perspective: 800px;
  flex-shrink: 0;
  margin-top: -4px;
  transition: transform 0.35s ease, margin-top 0.35s ease;
}

.globe {
  position: absolute;
  inset: 0;
  background-image: var(--globe-texture);
  background-repeat: repeat-x;
  background-size: 200% auto;
  animation: globe-glow 6s ease-in-out infinite alternate;
  transition: transform 0.8s ease, animation-play-state 0.2s ease;
}

.globe::before,
.globe::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  pointer-events: none;
}

.globe::before {
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 55%);
  mix-blend-mode: screen;
}

.globe::after {
  background: radial-gradient(circle at 70% 70%, rgba(0, 0, 0, 0.35), transparent 60%);
}

.group:hover .globe,
.globe-wrap:hover .globe {
  animation: globe-spin 1.6s linear infinite;
  transform: rotateY(12deg);
}

.group:hover .globe-wrap,
.globe-wrap:hover {
  transform: scale(1.12) translateY(-12px);
}

.globe-title {
  transition: transform 0.3s ease;
  display: inline-flex;
  align-items: center;
}

.globe-card:hover .globe-title {
  transform: translateY(-20px);
}

@keyframes globe-spin {
  from {
    background-position-x: 0%;
  }
  to {
    background-position-x: -200%;
  }
}

@keyframes globe-glow {
  from {
    filter: brightness(1);
  }
  to {
    filter: brightness(1.08);
  }
}

.poster-stack {
  position: absolute;
  right: -60px;     
  bottom: 0px;    
  width: 140px;    
  height: 120px;
  transform: rotate(-30deg);
  pointer-events: none;    
}

.poster {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 82px;
  height: 112px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.poster-0 { transform: translate(0px, 0px) rotate(10deg); z-index: 2; }
.poster-1 { transform: translate(-10px, -8px) rotate(2deg); z-index: 3; }
.poster-2 { transform: translate(-20px, -2px) rotate(-6deg);  z-index: 1; }

.movie-card:hover .poster-0 {
  transform: translate(18px, -6px) rotate(20deg) scale(1.08);
}

.movie-card:hover .poster-1 {
  transform: translate(-18px, -26px) rotate(4deg) scale(1.15);
  box-shadow: 0 18px 32px rgba(0, 0, 0, 0.32);
}

.movie-card:hover .poster-2 {
  transform: translate(-64px, -6px) rotate(-18deg) scale(1.08);
}
.globe-card,
.movie-card {
  position: relative;
  height: auto;
  overflow: hidden;
  padding-top: 22px;
}

.short-tile {
  height: 150px;
}


.globe-wrap {
  margin-top: -6px;
}
</style>
