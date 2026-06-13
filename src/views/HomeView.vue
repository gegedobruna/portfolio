<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue';
import ProjectsSection from '../components/ProjectsSection.vue';
import ExperienceSection from '../components/ExperienceSection.vue';
import ContactSection from '../components/ContactSection.vue';
import PipelineNav from '../components/PipelineNav.vue';
</script>

<template>
  <main class="pt-16">
    <PipelineNav />
    <HeroSection />
    <ProjectsSection />
    <ExperienceSection />
    <ContactSection />
  </main>
</template>
