<script setup lang="ts">
import { Github, Linkedin, Mail } from 'lucide-vue-next';
</script>

<template>
  <section id="contact" class="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-4xl font-bold text-white mb-6">Let's Connect</h2>
    <p class="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">
      I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
    </p>
    
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <a href="https://linkedin.com" target="_blank" class="flex flex-col items-center justify-center p-8 bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-accent hover:shadow-glow hover:-translate-y-1 transition-all duration-300 group">
        <Linkedin class="w-12 h-12 text-zinc-500 group-hover:text-accent mb-4 transition-colors" />
        <span class="text-white font-bold text-lg">LinkedIn</span>
        <span class="text-zinc-500 text-sm mt-2">Connect professionally</span>
      </a>
      
      <a href="https://github.com" target="_blank" class="flex flex-col items-center justify-center p-8 bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-accent hover:shadow-glow hover:-translate-y-1 transition-all duration-300 group">
        <Github class="w-12 h-12 text-zinc-500 group-hover:text-accent mb-4 transition-colors" />
        <span class="text-white font-bold text-lg">GitHub</span>
        <span class="text-zinc-500 text-sm mt-2">Check out my code</span>
      </a>
      
      <a href="mailto:hello@example.com" class="flex flex-col items-center justify-center p-8 bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-accent hover:shadow-glow hover:-translate-y-1 transition-all duration-300 group">
        <Mail class="w-12 h-12 text-zinc-500 group-hover:text-accent mb-4 transition-colors" />
        <span class="text-white font-bold text-lg">Email</span>
        <span class="text-zinc-500 text-sm mt-2">Get in touch directly</span>
      </a>
    </div>
  </section>
</template>
