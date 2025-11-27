
<script setup lang="ts">
import type { Project } from '../types';

defineProps<{
  project: Project
}>();
</script>

<template>
  <div class="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent transition-all duration-300 group flex flex-col h-full shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[8px_8px_0px_0px_color-mix(in_srgb,rgb(var(--color-accent))_55%,#000)] dark:hover:shadow-[8px_8px_0px_0px_color-mix(in_srgb,rgb(var(--color-accent))_50%,#000)] overflow-hidden">
    <div class="h-48 bg-zinc-100 dark:bg-neutral-700 overflow-hidden border-b border-zinc-200 dark:border-zinc-700">
      <img
        v-if="project.logo"
        :src="project.logo"
        :alt="project.title + ' logo'"
        :class="[
          'w-full h-full transition-transform duration-300',
          project.title === 'Java Chess Puzzle' || project.title === 'SQL Interest Calculator'
            ? 'object-contain p-4 filter grayscale brightness-[0.3] contrast-[1.05] dark:filter-none'
            : 'object-cover object-top'
        ]"
        loading="lazy"
      />
      <span v-else class="text-lg font-bold text-zinc-500">{{ project.title }}</span>
    </div>
    <div class="p-5 flex flex-col gap-3 flex-1">
      <div class="flex-1">
        <h3 class="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-accent transition-colors leading-tight">{{ project.title }}</h3>
        <p class="text-zinc-600 dark:text-zinc-400 text-sm mt-2 leading-relaxed">{{ project.description }}</p>
      </div>

      <div class="flex flex-wrap gap-2">
        <span v-for="tech in project.tech" :key="tech" class="px-3 py-1 bg-zinc-100 dark:bg-neutral-800 text-zinc-600 dark:text-zinc-300 rounded-full text-xs font-medium border border-zinc-200 dark:border-zinc-700">
          {{ tech }}
        </span>
      </div>

      <div class="flex flex-wrap gap-3 mt-auto pt-3">
        <a
          v-for="button in project.buttons"
          :key="button.label"
          :href="button.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center px-4 py-2 font-semibold rounded-lg text-sm border-2 transition-colors transition-transform border-accent text-accent bg-transparent active:bg-accent/15 active:border-accent/80 active:text-zinc-900 dark:active:text-white active:translate-y-[1px]"
        >
          {{ button.label }}
        </a>
      </div>
    </div>
  </div>
</template>
