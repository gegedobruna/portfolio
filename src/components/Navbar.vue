<script setup lang="ts">
import { ref } from 'vue';

const links = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <div class="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-3 md:px-4 pointer-events-none">
    <nav class="pointer-events-auto bg-white dark:bg-neutral-800 border-2 border-zinc-300 dark:border-zinc-700 rounded-2xl md:rounded-full px-4 py-2 md:px-6 md:py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.12)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.35)] transition-colors duration-300 w-full max-w-3xl md:w-auto md:max-w-none">
      <div class="flex items-center justify-between md:justify-start md:space-x-6">
        <div class="flex-shrink-0 mr-2 md:mr-0">
          <a href="#" class="text-base md:text-lg font-bold text-zinc-900 dark:text-white tracking-tight hover:text-accent transition-colors">
            Portfolio
          </a>
        </div>
        <div class="hidden md:block w-px h-6 bg-zinc-200 dark:bg-white/10 mx-2 transition-colors duration-300"></div>
        <div class="flex flex-nowrap items-center space-x-2 md:space-x-3 overflow-x-auto md:overflow-visible">
          <a
            v-for="link in links"
            :key="link.name"
            :href="link.href"
            @click.prevent="scrollToSection(link.href)"
            class="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 px-3 py-2 md:px-4 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>
