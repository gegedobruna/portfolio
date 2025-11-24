<script setup lang="ts">
import { ExternalLink, Github } from 'lucide-vue-next';
import type { Project } from '../types';

defineProps<{
  project: Project
}>();
</script>

<template>
  <div class="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300 hover:-translate-y-1 group h-full flex flex-col">
    <div class="p-6 flex-1 flex flex-col">
      <div class="flex justify-between items-start mb-4">
        <div class="flex items-center space-x-3">
          <div v-if="project.logoUrl" class="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center overflow-hidden">
            <img :src="project.logoUrl" :alt="project.title" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <div v-else class="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-lg">
            {{ project.title.charAt(0) }}
          </div>
          <h3 class="text-xl font-bold text-white group-hover:text-accent transition-colors">{{ project.title }}</h3>
        </div>
        <div class="flex space-x-2">
          <a v-if="project.repoLink" :href="project.repoLink" target="_blank" class="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors" title="View Code">
            <Github class="w-5 h-5" />
          </a>
          <a v-if="project.demoLink" :href="project.demoLink" target="_blank" class="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors" title="Live Demo">
            <ExternalLink class="w-5 h-5" />
          </a>
        </div>
      </div>
      
      <p class="text-zinc-400 mb-6 flex-1">{{ project.description }}</p>
      
      <div class="flex flex-wrap gap-2 mt-auto">
        <span v-for="tech in project.techStack" :key="tech" class="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-medium rounded-full border border-zinc-700">
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>
