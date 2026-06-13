<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Building2, CheckCircle2, GanttChartSquare, Rows3, Layers } from 'lucide-vue-next';
import { logEvent } from '../composables/telemetry';
import type { ExperienceItem } from '../types';

const experiences: ExperienceItem[] = [
  {
    id: 'genpact',
    role: 'Data Engineering Intern',
    company: 'Genpact',
    period: 'Since March 2026',
    description:
      'Building and working with the modern data stack to develop strong data engineering fundamentals across the full lifecycle. From data modelling and transformation to pipeline orchestration and end-to-end ETL workflows. Gaining hands-on exposure to major cloud platforms, Data Lakes and Lakehouse architectures, and enterprise tools, through guided project simulations and structured team environments that mirror global delivery standards.',
    type: 'internship',
    tags: ['SQL', 'Python', 'Apache Spark', 'ETL Pipelines', 'AWS', 'Azure', 'GCP', 'Databricks', 'Snowflake', 'Data Lakehouse'],
    dailyTech: ['Databricks', 'Apache Spark', 'Delta Live Tables', 'Azure Storage', 'Python', 'SQL'],
    gantt: { start: 2026.17, end: 2026.5 }
  },
  {
    id: 'asee',
    role: 'Software/Data Engineer Intern',
    company: 'ASEE (Asseco) · Prishtina',
    period: 'Aug 2025 - Oct 2025',
    description:
      'Developed SQL/T-SQL pipelines, C#/.NET services, and interest-calculation modules for internal financial tools. Optimized data workflows, automated recurring data tasks, and improved financial validation logic used by banking systems.',
    type: 'internship',
    footerNote: 'Recommendation from supervisor available',
    footerIcon: 'check',
    tags: ['SQL Server', 'T-SQL', 'C# / .NET'],
    gantt: { start: 2025.58, end: 2025.79 }
  },
  {
    id: 'uni',
    role: 'Computer Science Student',
    company: 'University of Debrecen · Hungary',
    period: '2022 - 2025',
    description:
      'Focused on algorithms, databases, Python and scripting languages, and full-stack development. Built applications across web, desktop, and server environments with a strong emphasis on SQL, data modelling, and software engineering principles.',
    type: 'university',
    footerNote: 'GPA: 4.6 / 5',
    tags: ['Python', 'SQL', 'Algorithms', 'Full-Stack'],
    gantt: { start: 2022.7, end: 2025.45 }
  },
  {
    id: 'certs',
    role: 'Certifications',
    company: 'Various',
    description: 'Industry certifications backing the day-to-day work with hands-on, project-based curricula.',
    type: 'certification',
    certs: [
      {
        name: 'Databricks Data Engineer Associate',
        description:
          'Building production ETL pipelines on the Databricks Lakehouse: Spark SQL and Python transformations, Delta Lake storage and optimization, Delta Live Tables, and workflow orchestration with Databricks Jobs.'
      },
      {
        name: 'NVIDIA Accelerated Data Science',
        description:
          'NVIDIA Fundamentals of Accelerated Data Science: GPU-accelerated data workflows with RAPIDS (cuDF, cuML, cuGraph) and XGBoost, focusing on large-scale machine learning and graph analytics on multi-GPU setups.'
      }
    ]
  }
];

// Gantt view
const ganttView = ref(false);
watch(ganttView, (v) => {
  logEvent('QUERY', `experience view switched to ${v ? 'gantt' : 'timeline'}`, 'text-blue-400');
});
const ganttStart = 2022.5;
const ganttEnd = 2026.75;
const ganttYears = [2023, 2024, 2025, 2026];

const ganttRows = computed(() =>
  experiences
    .filter((item): item is ExperienceItem & { gantt: { start: number; end: number } } => !!item.gantt)
    .sort((a, b) => a.gantt.start - b.gantt.start)
    .map((item) => ({
      item,
      left: ((item.gantt.start - ganttStart) / (ganttEnd - ganttStart)) * 100,
      width: ((item.gantt.end - item.gantt.start) / (ganttEnd - ganttStart)) * 100,
    }))
);

const yearPosition = (year: number) => ((year - ganttStart) / (ganttEnd - ganttStart)) * 100;
</script>

<template>
  <section id="experience" class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-12 gap-4 flex-wrap">
      <h2 class="text-3xl font-bold text-zinc-900 dark:text-white flex items-center">
        <span class="text-accent mr-3">/</span> Experience
      </h2>
      <div class="inline-flex rounded-lg border-2 border-zinc-300 dark:border-zinc-700 overflow-hidden text-xs font-bold" role="group" aria-label="Timeline view mode">
        <button
          @click="ganttView = false"
          class="flex items-center gap-1.5 px-3 py-2 transition-colors"
          :class="!ganttView ? 'bg-accent text-zinc-950' : 'text-zinc-600 dark:text-zinc-400 hover:text-accent'"
          :aria-pressed="!ganttView"
        >
          <Rows3 class="w-4 h-4" /> Timeline
        </button>
        <button
          @click="ganttView = true"
          class="flex items-center gap-1.5 px-3 py-2 transition-colors"
          :class="ganttView ? 'bg-accent text-zinc-950' : 'text-zinc-600 dark:text-zinc-400 hover:text-accent'"
          :aria-pressed="ganttView"
        >
          <GanttChartSquare class="w-4 h-4" /> Gantt
        </button>
      </div>
    </div>

    <!-- Gantt View -->
    <div
      v-if="ganttView"
      class="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-zinc-300 dark:border-zinc-700 p-6 pt-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]"
    >
      <div class="relative">
        <!-- Year axis -->
        <div class="relative h-6 mb-4">
          <span
            v-for="year in ganttYears"
            :key="year"
            class="absolute -translate-x-1/2 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 tabular-nums"
            :style="{ left: `${yearPosition(year)}%` }"
          >{{ year }}</span>
        </div>
        <!-- Year gridlines -->
        <div class="absolute top-6 bottom-0 left-0 right-0 pointer-events-none">
          <span
            v-for="year in ganttYears"
            :key="year"
            class="absolute top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700"
            :style="{ left: `${yearPosition(year)}%` }"
          ></span>
        </div>
        <!-- Bars -->
        <div class="space-y-3 relative">
          <div v-for="row in ganttRows" :key="row.item.id" class="relative h-10">
            <div
              class="gantt-bar group absolute top-0 h-10 rounded-lg border-2 border-accent/60 bg-accent/15 hover:bg-accent/25 hover:border-accent transition-colors cursor-default flex items-center px-3 overflow-visible"
              :style="{ left: `${row.left}%`, width: `${Math.max(row.width, 7)}%` }"
            >
              <span class="text-[11px] font-bold text-zinc-900 dark:text-white truncate whitespace-nowrap">
                {{ row.item.company.split('·')[0].trim() }}
              </span>
              <!-- Tech tooltip on hover -->
              <div
                v-if="row.item.tags?.length"
                class="gantt-tooltip absolute left-0 top-full mt-2 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 bg-white dark:bg-neutral-900 border-2 border-zinc-300 dark:border-zinc-700 rounded-xl p-3 shadow-xl min-w-[200px]"
              >
                <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">{{ row.item.role }}</p>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="tag in row.item.tags"
                    :key="tag"
                    class="px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-accent/10 text-accent border border-accent/25"
                  >{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="text-[11px] text-zinc-500 dark:text-zinc-400 mt-5">Hover a bar to see the tech used. Certifications are listed in the timeline view.</p>
    </div>

    <!-- Timeline View -->
    <div v-else class="relative">
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
              <div v-if="item.certs && item.certs.length" class="mt-4 space-y-4">
                <div v-for="cert in item.certs" :key="cert.name">
                  <div
                    class="inline-flex items-center px-2.5 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-semibold mb-1.5"
                  >
                    {{ cert.name }}
                  </div>
                  <p class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    {{ cert.description }}
                  </p>
                </div>
              </div>
              <div
                v-if="item.dailyTech && item.dailyTech.length"
                class="mt-3 rounded-xl border border-dashed border-accent/40 bg-accent/5 px-3 py-2.5"
              >
                <p
                  class="text-[10px] font-bold uppercase tracking-wider text-accent mb-1 flex items-center gap-1.5"
                  :class="{ 'md:justify-end': index % 2 === 0 }"
                >
                  <Layers class="w-3 h-3" /> Daily Technologies
                </p>
                <p class="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  {{ item.dailyTech.join(' • ') }}
                </p>
              </div>
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
              <div
                v-if="item.tags && item.tags.length"
                class="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700 flex flex-wrap gap-1.5"
                :class="{ 'md:justify-end': index % 2 === 0 }"
              >
                <span
                  v-for="tag in item.tags"
                  :key="tag"
                  class="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent/10 text-accent border border-accent/25"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
