
<script setup lang="ts">
import { ExternalLink, Github } from 'lucide-vue-next';
import type { Project } from '../types';

defineProps<{
  project: Project
}>();
</script>

<template>
  <div class="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent transition-all duration-300 group flex flex-col h-full shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[8px_8px_0px_0px_rgb(var(--color-accent))] dark:hover:shadow-[8px_8px_0px_0px_rgb(var(--color-accent))]">
    <div class="h-48 overflow-hidden relative">
      <img :src="project.image" :alt="project.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
      <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60"></div>
    </div>
    
    <div class="p-6 flex flex-col flex-grow">
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-accent transition-colors">{{ project.title }}</h3>
        <div class="flex space-x-3">
          <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="text-zinc-500 dark:text-zinc-400 hover:text-accent transition-colors">
            <Github class="w-5 h-5" />
          </a>
          <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="text-zinc-500 dark:text-zinc-400 hover:text-accent transition-colors">
            <ExternalLink class="w-5 h-5" />
          </a>
        </div>
      </div>
      
      <p class="text-zinc-600 dark:text-zinc-400 mb-6 flex-grow text-sm leading-relaxed">{{ project.description }}</p>
      
      <div class="flex flex-wrap gap-2 mt-auto">
        <span v-for="tech in project.technologies" :key="tech" class="px-3 py-1 bg-zinc-100 dark:bg-neutral-800 text-zinc-600 dark:text-zinc-300 rounded-full text-xs font-medium border border-zinc-200 dark:border-zinc-700">
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>
