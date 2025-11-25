<script setup lang="ts">
import { computed, ref } from 'vue';
import ProjectCard from './ProjectCard.vue';
import type { Project } from '../types';

const projects: Project[] = [
  {
    title: "Portfolio",
    logo: new URL('../assets/logos/portfolio_logo.svg', import.meta.url).href,
    tech: ["Vue", "JavaScript", "TypeScript", "Tailwind", "Git", "Netlify", "REST APIs"],
    description: "A fully custom personal portfolio built with Vue and TypeScript, featuring dynamic sections, dark mode, API integrations, and a streamlined Netlify deployment workflow.",
    buttons: [
      { label: "Source Code", url: "https://github.com/gegedobruna/portfolio" }
    ]
  },
  {
    title: "Schengo",
    logo: new URL('../assets/logos/schengo_logo.svg', import.meta.url).href,
    tech: ["Vue", "TypeScript", "JavaScript", "REST APIs"],
    description: "A modern calculator and planner for tracking Schengen-area stays while staying compliant with the 90/180-day rule. Built with a clean UI, local data handling, and automatic day-range validation.",
    buttons: [
      { label: "View App", url: "https://gegedobruna.github.io/Schengo" },
      { label: "Source Code", url: "https://github.com/gegedobruna/Schengo" }
    ]
  },
  {
    title: "Audiolytics",
    logo: new URL('../assets/logos/audiolytics_logo.svg', import.meta.url).href,
    tech: ["Python", "Streamlit", "FastAPI", "NumPy", "Pandas", "Altair", "Machine Learning"],
    description: "An interactive analytics dashboard that transforms a prepared listening-history dataset into deep insights: genre evolution, mood/energy arcs, discovery metrics, device usage, listening streaks, and ML-powered 7-day forecasts with confidence bands. Everything runs fully client-side via Streamlit.",
    buttons: [
      { label: "View App", url: "https://audiolytics.streamlit.app" },
      { label: "Source Code", url: "https://github.com/gegedobruna/Audiolytics" }
    ]
  },
  {
    title: "Deckmoor",
    logo: new URL('../assets/logos/deckmoor-logo.svg', import.meta.url).href,
    tech: ["Vue", "Firebase", "Scryfall API"],
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
    description: "A Java-based chess-puzzle engine featuring move validation, piece logic, board rendering, and puzzle-solving mechanics. Built with clean object-oriented design patterns as part of coursework.",
    buttons: [
      { label: "Source Code", url: "https://github.com/gegedobruna/java-chess-puzzle" }
    ]
  },
  {
    title: "SQL Interest Calculator",
    logo: new URL('../assets/logos/calculator_logo.svg', import.meta.url).href,
    tech: ["SQL Server", "T-SQL"],
    description: "A set of SQL Server utilities for financial systems, including interest-calculation functions, a table-valued function, and a stored procedure. Developed during an internship at ASEE (Asseco) for a banking environment.",
    buttons: [
      { label: "Source Code", url: "https://github.com/gegedobruna/sql-interest-calculator" }
    ]
  }
];

const showMore = ref(false);

const visibleProjects = computed(() => {
  return showMore.value ? projects : projects.slice(0, 4);
});
</script>

<template>
  <section id="projects" class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold text-zinc-900 dark:text-white mb-12 flex items-center">
      <span class="text-accent mr-3">/</span> Projects
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProjectCard v-for="project in visibleProjects" :key="project.title" :project="project" />
    </div>
    <div class="flex justify-center mt-10">
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
