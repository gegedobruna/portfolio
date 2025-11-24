<script setup lang="ts">
import { Github, Linkedin, Mail } from 'lucide-vue-next';

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-zinc-950 border-t border-white/5 py-8 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="text-zinc-500 text-sm">
        &copy; {{ currentYear }} Portfolio. All rights reserved.
      </div>
      <div class="flex space-x-6">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-zinc-400 hover:text-accent transition-colors">
          <Github class="w-5 h-5" />
          <span class="sr-only">GitHub</span>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-zinc-400 hover:text-accent transition-colors">
          <Linkedin class="w-5 h-5" />
          <span class="sr-only">LinkedIn</span>
        </a>
        <a href="mailto:hello@example.com" class="text-zinc-400 hover:text-accent transition-colors">
          <Mail class="w-5 h-5" />
          <span class="sr-only">Email</span>
        </a>
      </div>
    </div>
  </footer>
</template>
