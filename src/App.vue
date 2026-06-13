<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import EventTicker from './components/EventTicker.vue';
</script>

<template>
  <!-- No background here: the themed texture lives on <body> and shows through -->
  <div class="min-h-screen text-zinc-800 dark:text-zinc-400 selection:bg-accent selection:text-zinc-950 transition-colors duration-300">
    <div class="noise-overlay" aria-hidden="true"></div>
    <Navbar />

    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <EventTicker />
    <Footer />
  </div>
</template>
