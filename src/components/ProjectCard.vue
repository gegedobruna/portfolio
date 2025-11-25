
<script setup lang="ts">
import type { Project } from '../types';

defineProps<{
  project: Project
}>();
</script>

<template>
  <div class="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent transition-all duration-300 group flex flex-col h-full shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[8px_8px_0px_0px_rgb(var(--color-accent))] dark:hover:shadow-[8px_8px_0px_0px_rgb(var(--color-accent))] overflow-hidden">
    <div class="h-44 bg-zinc-100 dark:bg-neutral-700 flex items-center justify-center overflow-hidden border-b border-zinc-200 dark:border-zinc-700">
      <img
        v-if="project.logo"
        :src="project.logo"
        :alt="project.title + ' logo'"
        class="w-full h-full object-contain"
        :class="{
          'max-w-[70%] max-h-[70%]': project.title === 'Schengo',
          'max-w-[110%] max-h-[110%]': project.title === 'Portfolio'
        }"
        loading="lazy"
      />
      <span v-else class="text-lg font-bold text-zinc-500">{{ project.title }}</span>
    </div>
    <div class="p-6 flex flex-col h-full gap-4">
      <div class="flex-1">
        <h3 class="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-accent transition-colors leading-tight">{{ project.title }}</h3>
        <p class="text-zinc-600 dark:text-zinc-400 text-sm mt-2 leading-relaxed">{{ project.description }}</p>
      </div>

      <div class="flex flex-wrap gap-2">
        <span v-for="tech in project.tech" :key="tech" class="px-3 py-1 bg-zinc-100 dark:bg-neutral-800 text-zinc-600 dark:text-zinc-300 rounded-full text-xs font-medium border border-zinc-200 dark:border-zinc-700">
          {{ tech }}
        </span>
      </div>

      <div class="flex flex-wrap gap-3">
        <a
          v-for="button in project.buttons"
          :key="button.label"
          :href="button.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center px-4 py-2 text-slate-950 dark:text-zinc-900 font-semibold rounded-lg bg-zinc-200 dark:bg-white hover:opacity-90 transition-opacity text-sm"
        >
          {{ button.label }}
        </a>
      </div>
    </div>
  </div>
</template>
