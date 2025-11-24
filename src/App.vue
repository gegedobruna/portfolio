<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import HeroSection from './components/HeroSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import ExperienceSection from './components/ExperienceSection.vue';
import ContactSection from './components/ContactSection.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-400 selection:bg-accent selection:text-zinc-950">
    <Navbar />
    
    <main class="pt-32">
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
    
    <Footer />
  </div>
</template>
