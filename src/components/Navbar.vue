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
  <div class="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
    <nav class="pointer-events-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-white/5 rounded-full px-6 py-3 shadow-lg shadow-zinc-200/50 dark:shadow-black/20 transition-colors duration-300">
      <div class="flex items-center space-x-1 md:space-x-6">
        <div class="flex-shrink-0 mr-4 md:mr-0">
          <a href="#" class="text-lg font-bold text-zinc-900 dark:text-white tracking-tight hover:text-accent transition-colors">
            Portfolio
          </a>
        </div>
        <div class="hidden md:block w-px h-6 bg-zinc-200 dark:bg-white/10 mx-2 transition-colors duration-300"></div>
        <div class="flex items-center space-x-1">
          <a
            v-for="link in links"
            :key="link.name"
            :href="link.href"
            @click.prevent="scrollToSection(link.href)"
            class="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>
