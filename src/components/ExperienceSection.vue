<script setup lang="ts">
import { Building2 } from 'lucide-vue-next';
import type { ExperienceItem } from '../types';

const experiences: ExperienceItem[] = [
  {
    id: 'asee',
    role: 'Software/Data Engineer Intern',
    company: 'ASEE (Asseco)',
    period: '2023 - Present',
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
</script>

<template>
  <section id="experience" class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold text-zinc-900 dark:text-white mb-12 flex items-center">
      <span class="text-accent mr-3">/</span> Experience
    </h2>
    <div class="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
      
      <div class="relative pl-8 md:pl-0">
        <!-- Vertical Line -->
        <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 transform -translate-x-1/2"></div>

        <div v-for="(item, index) in experiences" :key="index" class="relative mb-12 md:mb-24 last:mb-0">
          <!-- Timeline Dot -->
          <div class="absolute left-8 md:left-1/2 top-0 w-4 h-4 rounded-full bg-accent border-4 border-zinc-100 dark:border-zinc-950 transform -translate-x-1/2 translate-y-1.5 z-10 shadow-[0_0_10px_rgba(var(--color-accent),0.5)]"></div>

          <div :class="['md:w-1/2 relative', index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0' : 'md:pl-12 md:ml-auto']">
            <div class="bg-white dark:bg-zinc-900 p-6 rounded-2xl border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent hover:shadow-[6px_6px_0px_0px_rgba(var(--color-accent),0.3)] transition-all duration-300 group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
              <span class="inline-block px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-accent text-xs font-bold mb-4 border border-zinc-200 dark:border-zinc-700">
                {{ item.period }}
              </span>
              <h3 class="text-xl font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-accent transition-colors">{{ item.role }}</h3>
              <div class="text-zinc-500 dark:text-zinc-400 font-medium mb-4 flex items-center gap-2" :class="{ 'md:justify-end': index % 2 === 0 }">
                <Building2 class="w-4 h-4" />
                {{ item.company }}
              </div>
              <p class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
