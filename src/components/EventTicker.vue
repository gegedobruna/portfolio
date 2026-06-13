<script setup lang="ts">
import { telemetry } from '../composables/telemetry';

const events = [
  { tag: 'PIPELINE', text: 'Incremental load completed — 0 failed records', color: 'text-accent' },
  { tag: 'DEPLOY', text: 'Portfolio v2.5 deployed to production', color: 'text-blue-400' },
  { tag: 'STATUS', text: 'Open to Data Engineering roles', color: 'text-green-400' },
  { tag: 'SPARK', text: 'Cluster autoscaled: 2 → 8 workers', color: 'text-orange-400' },
  { tag: 'DELTA', text: 'OPTIMIZE completed — 142 files compacted', color: 'text-purple-400' },
  { tag: 'CERT', text: 'AWS Solutions Architect — in progress', color: 'text-yellow-400' },
  { tag: 'INGEST', text: 'New scrobbles landed in bronze layer', color: 'text-accent' },
];
</script>

<template>
  <div
    class="ticker mt-20 border-t border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950 overflow-hidden flex items-stretch transition-colors duration-300"
  >
    <!-- Live visitor telemetry slot -->
    <Transition name="live-event" mode="out-in">
      <div
        v-if="telemetry.latest"
        :key="telemetry.latest.ts"
        class="live-slot flex items-center gap-2 shrink-0 px-4 py-2.5 font-mono text-xs border-r-2 border-accent/40 bg-accent/5 max-w-[60vw]"
      >
        <span class="relative flex h-2 w-2 shrink-0">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
        </span>
        <span class="font-bold shrink-0" :class="telemetry.latest.color">[{{ telemetry.latest.tag }}]</span>
        <span class="text-zinc-600 dark:text-zinc-300 truncate">{{ telemetry.latest.text }}</span>
      </div>
    </Transition>

    <!-- Looping pipeline log -->
    <div class="overflow-hidden py-2.5 flex-1" aria-hidden="true">
      <div class="ticker-track flex items-center gap-10 whitespace-nowrap font-mono text-xs">
        <template v-for="copy in 2">
          <span
            v-for="event in events"
            :key="`${copy}-${event.tag}-${event.text}`"
            class="flex items-center gap-2 text-zinc-500 dark:text-zinc-400"
          >
            <span class="font-bold" :class="event.color">[{{ event.tag }}]</span>
            {{ event.text }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticker-track {
  width: max-content;
  animation: ticker-scroll 40s linear infinite;
  will-change: transform;
}

.ticker:hover .ticker-track {
  animation-play-state: paused;
}

@keyframes ticker-scroll {
  from {
    transform: translateX(0);
  }
  to {
    /* The track holds two copies of the event list; sliding one copy's
       width and looping reads as an infinite seamless scroll. */
    transform: translateX(-50%);
  }
}

.live-event-enter-active,
.live-event-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.live-event-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.live-event-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .ticker-track {
    animation: none;
  }
}
</style>
