<script setup lang="ts">
import { Briefcase, GraduationCap, Award } from 'lucide-vue-next';
import type { ExperienceItem } from '../types';

const experiences: ExperienceItem[] = [
  {
    id: 'asee',
    role: 'Software/Data Engineer Intern',
    company: 'ASEE (Asseco)',
    period: '2023 - Present', // Adjust dates as needed
    description: 'Reduced manual financial data prep time by 30% via SQL optimization.',
    type: 'internship'
  },
  {
    id: 'uni',
    role: 'Computer Science Student',
    company: 'University',
    period: '2020 - 2024',
    description: 'Specializing in Data Science and Software Engineering.',
    type: 'university'
  },
  {
    id: 'certs',
    role: 'Certifications',
    company: 'Various',
    description: 'Continuous learning in GPU computing and modern web technologies.',
    type: 'certification'
  }
];

const getIcon = (type: string) => {
  switch (type) {
    case 'internship': return Briefcase;
    case 'university': return GraduationCap;
    case 'certification': return Award;
    default: return Briefcase;
  }
};
</script>

<template>
  <section id="experience" class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold text-white mb-12 flex items-center">
      <span class="text-accent mr-3">/</span> Experience
    </h2>
    <div class="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
      
      <div v-for="(exp, index) in experiences" :key="exp.id" class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        
        <!-- Icon -->
        <div class="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-accent group-hover:shadow-glow transition-all duration-300">
          <component :is="getIcon(exp.type)" class="w-5 h-5 text-zinc-400 group-hover:text-accent transition-colors" />
        </div>
        
        <!-- Content -->
        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-accent hover:shadow-glow transition-all duration-300">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
            <h3 class="font-bold text-white text-lg">{{ exp.role }}</h3>
            <span v-if="exp.period" class="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">{{ exp.period }}</span>
          </div>
          <div class="text-zinc-500 font-medium mb-2">{{ exp.company }}</div>
          <p class="text-zinc-400 text-sm leading-relaxed">{{ exp.description }}</p>
        </div>
        
      </div>

    </div>
  </section>
</template>
