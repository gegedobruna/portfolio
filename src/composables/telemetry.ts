import { reactive, readonly } from 'vue';

export interface TelemetryEvent {
    tag: string;
    text: string;
    color: string;
    ts: number;
}

const state = reactive<{ latest: TelemetryEvent | null }>({ latest: null });
const seen = new Set<string>();

/** Push a live visitor event into the footer ticker. */
export function logEvent(tag: string, text: string, color = 'text-accent') {
    state.latest = { tag, text, color, ts: Date.now() };
}

/** Like logEvent, but fires at most once per session for the given key. */
export function logOnce(key: string, tag: string, text: string, color?: string) {
    if (seen.has(key)) return;
    seen.add(key);
    logEvent(tag, text, color);
}

export const telemetry = readonly(state);
