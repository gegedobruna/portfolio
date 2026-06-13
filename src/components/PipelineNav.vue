<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { logOnce } from '../composables/telemetry';

const stages = [
  { id: 'about', label: 'stg_about' },
  { id: 'projects', label: 'fct_projects' },
  { id: 'experience', label: 'dim_experience' },
  { id: 'contact', label: 'mart_contact' },
];

// Continuous progress through the DAG: 0 = top of first section,
// stages.length - 1 = last section reached.
const progress = ref(0);
const activeIndex = ref(0);
let raf = 0;

const measure = () => {
  const tops = stages.map((s) => {
    const el = document.getElementById(s.id);
    return el ? el.getBoundingClientRect().top + window.scrollY : 0;
  });
  // Read position against a marker a third of the way down the viewport so
  // a section counts as "running" once it's prominently on screen.
  const marker = window.scrollY + window.innerHeight * 0.35;

  let p = 0;
  for (let i = 0; i < tops.length - 1; i++) {
    if (marker >= tops[i + 1]) {
      p = i + 1;
    } else if (marker >= tops[i]) {
      p = i + (marker - tops[i]) / Math.max(tops[i + 1] - tops[i], 1);
      break;
    }
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
    p = stages.length - 1;
  }
  progress.value = p;
  activeIndex.value = Math.min(Math.floor(p + 0.001), stages.length - 1);
};

const onScroll = () => {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(measure);
};

watch(activeIndex, (idx) => {
  const stage = stages[idx];
  logOnce(`section-${stage.id}`, 'INGEST', `visitor reached /${stage.id}`);
});

const edgeFill = (i: number) => `${Math.min(Math.max(progress.value - i, 0), 1) * 100}%`;

const goTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

onMounted(() => {
  measure();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onScroll);
  cancelAnimationFrame(raf);
});
</script>

<template>
  <nav
    class="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-start"
    aria-label="Page sections as pipeline stages"
  >
    <template v-for="(stage, i) in stages" :key="stage.id">
      <button
        @click="goTo(stage.id)"
        class="dag-node group relative flex items-center"
        :aria-label="`Go to ${stage.id}`"
        :aria-current="i === activeIndex ? 'true' : undefined"
      >
        <span
          class="block w-3 h-3 rounded-full border-2 transition-colors duration-300"
          :class="[
            progress >= i
              ? 'bg-accent border-accent'
              : 'bg-transparent border-zinc-400 dark:border-zinc-600',
            i === activeIndex && 'node-running',
          ]"
        ></span>
        <span
          class="absolute left-6 font-mono text-[10px] font-bold whitespace-nowrap px-2 py-1 rounded-md border transition-all duration-200"
          :class="i === activeIndex
            ? 'opacity-100 translate-x-0 text-accent border-accent/40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm'
            : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm'"
        >{{ stage.label }}</span>
      </button>
      <!-- Edge between this node and the next -->
      <span
        v-if="i < stages.length - 1"
        class="dag-edge relative block w-px h-14 ml-[5px] bg-zinc-300 dark:bg-zinc-700 overflow-hidden"
        aria-hidden="true"
      >
        <span
          class="absolute top-0 left-0 w-full bg-accent transition-[height] duration-150 ease-linear"
          :style="{ height: edgeFill(i) }"
        ></span>
      </span>
    </template>
  </nav>
</template>

<style scoped>
.dag-node {
  padding: 4px;
  margin: -4px;
}

.node-running {
  animation: node-pulse 1.6s ease-in-out infinite;
}

@keyframes node-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgb(var(--color-accent) / 0.5);
  }
  50% {
    box-shadow: 0 0 0 5px rgb(var(--color-accent) / 0);
  }
}
</style>
