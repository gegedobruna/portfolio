<script setup lang="ts">
import { computed, ref } from 'vue';
import { Terminal } from 'lucide-vue-next';
import ProjectCard from './ProjectCard.vue';
import SqlConsole from './SqlConsole.vue';
import { logEvent } from '../composables/telemetry';
import type { Project } from '../types';

const filterCategories = ['All', 'Data Engineering', 'Cloud', 'Python', 'SQL', 'Frontend', 'AI'];
const activeFilter = ref('All');

const projects: Project[] = [
  {
    title: "Portfolio",
    logo: new URL('../assets/screenshots/portfolio_sc.webp', import.meta.url).href,
    tech: ["Vue", "JavaScript", "TypeScript", "Tailwind", "Git", "Vercel", "REST APIs"],
    categories: ["Frontend", "Cloud"],
    description: "A fully custom personal portfolio built with Vue and TypeScript, featuring dynamic sections, dark mode, API integrations, and a streamlined Vercel deployment workflow.",
    buttons: [
      { label: "Source Code", url: "https://github.com/gegedobruna/portfolio" }
    ]
  },
  {
    title: "Schengo",
    logo: new URL('../assets/screenshots/schengo_sc.webp', import.meta.url).href,
    tech: ["Vue", "TypeScript"],
    categories: ["Frontend"],
    description: "A modern calculator and planner for tracking Schengen-area stays while staying compliant with the 90/180-day rule. Built with a clean UI, local data handling, and automatic day-range validation.",
    buttons: [
      { label: "View App", url: "https://gegedobruna.github.io/Schengo" },
      { label: "Source Code", url: "https://github.com/gegedobruna/Schengo" }
    ]
  },
  {
    title: "match.fm",
    logo: new URL('../assets/screenshots/match_fm_sc.webp', import.meta.url).href,
    tech: ["Python", "Django", "Celery", "Redis", "Last.fm API", "Requests", "Cosine Similarity", "Render", "Gunicorn", "WhiteNoise"],
    categories: ["Python", "Data Engineering", "Cloud"],
    description: "Compare two Last.fm users and see how closely their listening tastes align. Full-stack Django app on Render with Celery workers and Redis handling async tasks and caching, Requests-driven Last.fm API snapshots with TTL storage and exponential backoff retries, and log-weighted playcount vectors scored via cosine similarity across 3-month, 12-month, and overall windows.",
    buttons: [
      { label: "View App", url: "https://match-fm.onrender.com" },
      { label: "Source Code", url: "https://github.com/gegedobruna/match.fm" }
    ]
  },
  {
    title: "Audiolytics",
    logo: new URL('../assets/screenshots/audiolytics_sc.webp', import.meta.url).href,
    tech: ["Python", "Streamlit", "FastAPI", "NumPy", "Pandas", "Altair", "Machine Learning"],
    categories: ["Python", "Data Engineering", "AI"],
    description: "An interactive analytics dashboard that transforms a prepared listening-history dataset into deep insights: genre evolution, mood/energy arcs, discovery metrics, device usage, listening streaks, and ML-powered 7-day forecasts with confidence bands. Everything runs fully client-side via Streamlit.",
    buttons: [
      { label: "View App", url: "https://audiolytics.streamlit.app" },
      { label: "Source Code", url: "https://github.com/gegedobruna/Audiolytics" }
    ]
  },
  {
    title: "Deckmoor",
    logo: new URL('../assets/screenshots/deckmoor_sc.webp', import.meta.url).href,
    tech: ["Vue", "Firebase", "Scryfall API", "JavaScript", "FastAPI", "Python"],
    categories: ["Frontend", "Cloud", "Python"],
    description: "A Commander (EDH) deck-building and playtesting web app for Magic: The Gathering players. Features card search, deck construction, simulations, and persistent cloud storage using Firebase.",
    buttons: [
      { label: "View App", url: "https://gegedobruna.github.io/Deckmoor/" },
      { label: "Source Code", url: "https://github.com/gegedobruna/Deckmoor" }
    ]
  },
  {
    title: "Java Chess Puzzle",
    logo: new URL('../assets/logos/chess_puzzle_logo.webp', import.meta.url).href,
    tech: ["Java", "JavaFX", "Jackson JSON", "TinyLog"],
    categories: [],
    description: "A Java-based chess-puzzle engine featuring move validation, piece logic, board rendering, and puzzle-solving mechanics. Built with clean object-oriented design patterns as part of coursework.",
    buttons: [
      { label: "Source Code", url: "https://github.com/gegedobruna/java-chess-puzzle" }
    ]
  },
  {
    title: "SQL Interest Calculator",
    logo: new URL('../assets/logos/calculator_logo.webp', import.meta.url).href,
    tech: ["SQL Server", "T-SQL"],
    categories: ["SQL", "Data Engineering"],
    description: "A set of SQL Server utilities for financial systems, including interest-calculation functions, a table-valued function, and a stored procedure. Developed during an internship at ASEE (Asseco) for a banking environment.",
    buttons: [
      { label: "Source Code", url: "https://github.com/gegedobruna/sql-interest-calculator" }
    ]
  }
];

const showMore = ref(false);
const sqlMode = ref(false);
const sqlFilter = ref<string[] | null>(null);

const filteredProjects = computed(() => {
  if (sqlFilter.value) return projects.filter((p) => sqlFilter.value!.includes(p.title));
  if (activeFilter.value === 'All') return projects;
  return projects.filter((p) => p.categories.includes(activeFilter.value));
});

const visibleProjects = computed(() => {
  return showMore.value ? filteredProjects.value : filteredProjects.value.slice(0, 4);
});

const setFilter = (category: string) => {
  activeFilter.value = category;
  sqlFilter.value = null;
  showMore.value = false;
  logEvent('FILTER', `projects filtered by '${category.toLowerCase()}'`, 'text-purple-400');
};

const onSqlFilter = (titles: string[] | null) => {
  sqlFilter.value = titles;
  showMore.value = true;
};

const toggleSqlMode = () => {
  sqlMode.value = !sqlMode.value;
  if (!sqlMode.value) sqlFilter.value = null;
  else logEvent('SESSION', 'sql console attached to portfolio_warehouse', 'text-blue-400');
};
</script>

<template>
  <section id="projects" class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold text-zinc-900 dark:text-white mb-12 flex items-center">
      <span class="text-accent mr-3">/</span> Projects
    </h2>
    <div class="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter projects by category">
      <button
        v-for="category in filterCategories"
        :key="category"
        @click="setFilter(category)"
        class="filter-pill px-4 py-2 rounded-full text-xs font-bold border-2 transition-all duration-300"
        :class="activeFilter === category
          ? 'bg-accent text-zinc-950 border-accent scale-105 shadow-[0_4px_14px_-4px_rgb(var(--color-accent)/0.6)]'
          : 'bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 hover:border-accent hover:text-accent'"
        :aria-pressed="activeFilter === category"
      >
        {{ category }}
      </button>
      <button
        @click="toggleSqlMode"
        class="filter-pill flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border-2 transition-all duration-300 font-mono ml-auto"
        :class="sqlMode
          ? 'bg-zinc-950 text-accent border-accent scale-105 shadow-[0_4px_14px_-4px_rgb(var(--color-accent)/0.6)]'
          : 'bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 hover:border-accent hover:text-accent'"
        :aria-pressed="sqlMode"
        aria-label="Toggle SQL console"
      >
        <Terminal class="w-3.5 h-3.5" /> SQL
      </button>
    </div>
    <Transition name="console">
      <div v-if="sqlMode" class="mb-10">
        <SqlConsole :projects="projects" @filter="onSqlFilter" />
        <p v-if="sqlFilter" class="mt-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <span class="text-accent font-bold">WHERE</span> filter active — {{ filteredProjects.length }} of {{ projects.length }} projects shown.
          <button @click="sqlFilter = null" class="text-accent underline underline-offset-2 hover:opacity-80">reset</button>
        </p>
      </div>
    </Transition>
    <TransitionGroup
      tag="div"
      name="project-grid"
      class="grid grid-cols-1 md:grid-cols-2 gap-6 relative"
    >
      <ProjectCard v-for="project in visibleProjects" :key="project.title" :project="project" />
    </TransitionGroup>
    <p v-if="!visibleProjects.length" class="text-zinc-500 dark:text-zinc-400 text-sm">
      No projects in this category yet.
    </p>
    <div v-if="filteredProjects.length > 4" class="flex justify-center mt-10">
      <button
        @click="showMore = !showMore"
        class="inline-flex items-center px-6 py-3 text-slate-950 font-bold rounded-lg hover:opacity-90 transition-opacity shadow-[0_12px_30px_-10px_rgba(0,0,0,0.35)]"
        :style="{ backgroundColor: 'rgb(var(--color-accent))', boxShadow: '0 12px 30px -10px rgba(var(--color-accent), 0.5)' }"
      >
        {{ showMore ? 'See less' : 'See more' }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.project-grid-enter-active,
.project-grid-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.project-grid-enter-from,
.project-grid-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}

.project-grid-leave-active {
  position: absolute;
  width: calc(50% - 0.75rem);
}

@media (max-width: 767px) {
  .project-grid-leave-active {
    width: 100%;
  }
}

.project-grid-move {
  transition: transform 0.4s ease;
}

.console-enter-active,
.console-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.console-enter-from,
.console-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
