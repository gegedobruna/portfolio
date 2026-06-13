<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = withDefaults(
  defineProps<{
    value: number;
    duration?: number;
    suffix?: string;
  }>(),
  { duration: 1500, suffix: '' }
);

const display = ref(0);
const el = ref<HTMLElement>();
let observer: IntersectionObserver | undefined;
let raf = 0;
let hasAnimated = false;

const animate = (target: number) => {
  cancelAnimationFrame(raf);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    display.value = target;
    return;
  }
  const startTime = performance.now();
  const startValue = display.value;
  const step = (now: number) => {
    const t = Math.min((now - startTime) / props.duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    display.value = Math.round(startValue + (target - startValue) * eased);
    if (t < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
};

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animate(props.value);
      }
    },
    { threshold: 0.4 }
  );
  if (el.value) observer.observe(el.value);
});

// If the value arrives async (e.g. an API response) after the element is
// already in view, re-run the count-up toward the new target.
watch(
  () => props.value,
  (v) => {
    if (hasAnimated) animate(v);
  }
);

onBeforeUnmount(() => {
  observer?.disconnect();
  cancelAnimationFrame(raf);
});
</script>

<template>
  <span ref="el" class="tabular-nums">{{ display.toLocaleString() }}{{ suffix }}</span>
</template>
