<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="min-h-screen bg-zinc-100 text-zinc-800 dark:bg-neutral-900 dark:text-zinc-400 selection:bg-accent selection:text-zinc-950 transition-colors duration-300">
    <Navbar />
    
    <router-view></router-view>
    
    <Footer />
  </div>
</template>
