<script setup lang="ts">
import ProjectCard from './ProjectCard.vue';
import type { Project } from '../types';

const projects: Project[] = [
  {
    id: 'schengo',
    title: 'Schengo',
    description: '90/180-day Schengen stay calculator. Mitigates compliance risk using complex date logic.',
    techStack: ['Vue', 'Vite', 'Tailwind'],
    repoLink: '#',
    demoLink: '#'
  },
  {
    id: 'deckmoor',
    title: 'Deckmoor',
    description: 'MTG Deckbuilder App. Manages card collections via external API.',
    techStack: ['Vue', 'REST API'],
    repoLink: '#',
    demoLink: '#'
  },
  {
    id: 'audiolytics',
    title: 'Audiolytics',
    description: 'Music data dashboard visualizing Last.fm & Spotify audio features.',
    techStack: ['Data Viz', 'API'],
    repoLink: '#',
    demoLink: '#'
  },
  {
    id: 'asee',
    title: 'ASEE Internship',
    description: 'SQL Interest Calculator. Optimized financial database procedures.',
    techStack: ['SQL', 'JavaFX'],
    repoLink: '#', // Assuming no public link for internship work usually, but adding placeholder
  }
];
</script>

<template>
  <section id="projects" class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold text-zinc-900 dark:text-white mb-12 flex items-center">
      <span class="text-accent mr-3">/</span> Projects
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
    </div>
  </section>
</template>
