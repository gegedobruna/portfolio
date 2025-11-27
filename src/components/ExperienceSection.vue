<script setup lang="ts">
import { Building2, CheckCircle2 } from 'lucide-vue-next';
import type { ExperienceItem } from '../types';

const experiences: ExperienceItem[] = [
  {
    id: 'asee',
    role: 'Software/Data Engineer Intern',
    company: 'ASEE (Asseco) · Prishtina',
    period: 'Aug 2025 ??" Oct 2025',
    description:
      'Developed SQL/T-SQL pipelines, C#/.NET services, and interest-calculation modules for internal financial tools. Optimized data workflows, automated recurring data tasks, and improved financial validation logic used by banking systems.',
    type: 'internship',
    footerNote: 'Recommendation from supervisor available',
    footerIcon: 'check'
  },
  {
    id: 'uni',
    role: 'Computer Science Student',
    company: 'University of Debrecen · Hungary',
    period: '2022 - 2025',
    description:
      'Focused on algorithms, databases, Python and scripting languages, and full-stack development. Built applications across web, desktop, and server environments with a strong emphasis on SQL, data modelling, and software engineering principles.',
    type: 'university',
    footerNote: 'GPA: 4.6 / 5'
  },
  {
    id: 'certs',
    role: 'Certifications',
    company: 'Various',
    highlight: 'NVIDIA Accelerated Data Science',
    description:
      'NVIDIA Fundamentals of Accelerated Data Science: GPU-accelerated data workflows with RAPIDS (cuDF, cuML, cuGraph) and XGBoost, focusing on large-scale machine learning and graph analytics on multi-GPU setups.',
    type: 'certification'
  }
];
</script>

<template>
  <section id="experience" class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold text-zinc-900 dark:text-white mb-12 flex items-center">
      <span class="text-accent mr-3">/</span> Experience
    </h2>
    <div class="relative">
      <div class="absolute left-4 top-4 bottom-4 w-px bg-zinc-200 dark:bg-neutral-800 md:hidden"></div>
      <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-neutral-800 transform -translate-x-1/2"></div>

      <div class="flex flex-col gap-12 md:gap-16">
        <div
          v-for="(item, index) in experiences"
          :key="index"
          class="relative pl-10 md:pl-0 md:flex md:items-start"
        >
          <div
            class="absolute left-4 md:left-1/2 top-4 w-4 h-4 rounded-full bg-accent border-4 border-zinc-100 dark:border-zinc-950 transform -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(var(--color-accent),0.5)]"
          ></div>

          <div
            :class="[
              'md:w-1/2',
              index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0' : 'md:pl-12 md:ml-auto'
            ]"
          >
            <div
              class="bg-white dark:bg-neutral-800 p-6 rounded-2xl border-2 border-zinc-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent transition-all duration-300 group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_color-mix(in_srgb,rgb(var(--color-accent))_55%,#000)] dark:hover:shadow-[6px_6px_0px_0px_color-mix(in_srgb,rgb(var(--color-accent))_50%,#000)]"
            >
              <span
                v-if="item.period"
                class="inline-block px-3 py-1 rounded-full bg-zinc-100 dark:bg-neutral-800 text-accent text-xs font-bold mb-4 border border-zinc-200 dark:border-zinc-700"
              >
                {{ item.period }}
              </span>
              <h3
                class="text-xl font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-accent transition-colors"
              >
                {{ item.role }}
              </h3>
              <div
                class="text-zinc-500 dark:text-zinc-400 font-medium mb-4 flex items-center gap-2"
                :class="{ 'md:justify-end': index % 2 === 0 }"
              >
                <Building2 class="w-4 h-4" />
                {{ item.company }}
              </div>
              <div
                v-if="item.highlight"
                class="inline-flex items-center px-2.5 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-semibold mb-2"
              >
                {{ item.highlight }}
              </div>
              <p class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                {{ item.description }}
              </p>
              <div
                v-if="item.footerNote"
                class="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700 text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2"
              >
                <CheckCircle2
                  v-if="item.footerIcon === 'check'"
                  class="w-3 h-3 text-emerald-400"
                />
                <span>{{ item.footerNote }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

