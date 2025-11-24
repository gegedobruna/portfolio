
<script setup lang="ts">
import { Github, Linkedin, Mail } from 'lucide-vue-next';
</script>

<template>
  <section id="contact" class="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-4xl font-bold text-white mb-6">Let's Connect</h2>
    <p class="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">
      I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300 group flex flex-col items-center justify-center text-center">
        <Linkedin class="w-8 h-8 text-zinc-400 group-hover:text-accent mb-4 transition-colors" />
        <span class="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-accent transition-colors">LinkedIn</span>
        <span class="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Connect professionally</span>
      </a>
      
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300 group flex flex-col items-center justify-center text-center">
        <Github class="w-8 h-8 text-zinc-400 group-hover:text-accent mb-4 transition-colors" />
        <span class="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-accent transition-colors">GitHub</span>
        <span class="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Check out my code</span>
      </a>
      
      <a href="mailto:hello@example.com" class="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300 group flex flex-col items-center justify-center text-center">
        <Mail class="w-8 h-8 text-zinc-400 group-hover:text-accent mb-4 transition-colors" />
        <span class="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-accent transition-colors">Email</span>
        <span class="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Get in touch</span>
      </a>
    </div>
  </section>
</template>
