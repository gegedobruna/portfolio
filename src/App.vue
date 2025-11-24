<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 selection:bg-accent selection:text-zinc-950 transition-colors duration-300">
    <Navbar />
    
    <router-view></router-view>
    
    <Footer />
  </div>
</template>
