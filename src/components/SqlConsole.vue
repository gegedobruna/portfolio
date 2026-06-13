<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { logEvent } from '../composables/telemetry';
import type { Project } from '../types';

const props = defineProps<{ projects: Project[] }>();
const emit = defineEmits<{ filter: [titles: string[] | null] }>();

type Row = Record<string, string | string[]>;

const tables: Record<string, Row[]> = {
  projects: props.projects.map((p) => ({
    title: p.title,
    tech: p.tech,
    categories: p.categories,
  })),
  certifications: [
    { name: 'Databricks Data Engineer Associate', status: 'certified' },
    { name: 'NVIDIA Accelerated Data Science', status: 'certified' },
    { name: 'AWS Solutions Architect', status: 'in progress' },
    { name: 'Claude Certification', status: 'in progress' },
  ],
  experience: [
    { role: 'Data Engineering Intern', company: 'Genpact', period: '2026 - now', tech: ['Databricks', 'Spark', 'Delta Live Tables', 'Azure', 'Python', 'SQL'] },
    { role: 'Software/Data Engineer Intern', company: 'ASEE (Asseco)', period: '2025', tech: ['SQL Server', 'T-SQL', 'C# / .NET'] },
    { role: 'Computer Science Student', company: 'University of Debrecen', period: '2022 - 2025', tech: ['Python', 'SQL', 'Algorithms'] },
  ],
};

type OutputEntry =
  | { kind: 'cmd'; text: string }
  | { kind: 'error'; text: string }
  | { kind: 'info'; text: string }
  | { kind: 'table'; columns: string[]; rows: Row[]; note?: string };

const output = ref<OutputEntry[]>([
  { kind: 'info', text: "Connected to portfolio_warehouse (read-only). Type HELP for syntax, SHOW TABLES to explore." },
]);
const input = ref('');
const history: string[] = [];
let histIdx = -1;
const outputEl = ref<HTMLElement>();
const inputEl = ref<HTMLInputElement>();

const print = (entry: OutputEntry) => {
  output.value.push(entry);
  nextTick(() => {
    outputEl.value?.scrollTo({ top: outputEl.value.scrollHeight });
  });
};

const cellText = (v: string | string[]) => (Array.isArray(v) ? v.join(', ') : v);

const matchCondition = (row: Row, field: string, op: string, value: string): boolean => {
  const cell = row[field];
  const needle = value.replace(/%/g, '').toLowerCase();
  if (cell === undefined) return false;
  if (Array.isArray(cell)) {
    const hit =
      op.toLowerCase() === 'like'
        ? cell.some((v) => v.toLowerCase().includes(needle))
        : cell.some((v) => v.toLowerCase() === value.toLowerCase());
    return op === '!=' ? !hit : hit;
  }
  const text = String(cell).toLowerCase();
  if (op.toLowerCase() === 'like') return text.includes(needle);
  const eq = text === value.toLowerCase();
  return op === '!=' ? !eq : eq;
};

const run = () => {
  const raw = input.value.trim();
  if (!raw) return;
  print({ kind: 'cmd', text: raw });
  history.push(raw);
  histIdx = history.length;
  input.value = '';

  const q = raw.replace(/;\s*$/, '').trim();

  if (/^clear$/i.test(q)) {
    output.value = [];
    return;
  }
  if (/^help$/i.test(q)) {
    print({
      kind: 'info',
      text: "SELECT <cols|*> FROM <table> [WHERE <field> =|!=|LIKE '<value>' [AND ...]] [LIMIT n] — also: SHOW TABLES, CLEAR. Querying projects filters the grid above.",
    });
    return;
  }
  if (/^show\s+tables$/i.test(q)) {
    print({
      kind: 'table',
      columns: ['table', 'columns'],
      rows: Object.entries(tables).map(([name, rows]) => ({
        table: name,
        columns: Object.keys(rows[0]).join(', '),
      })),
    });
    return;
  }

  const m = q.match(/^select\s+(.+?)\s+from\s+(\w+)(?:\s+where\s+(.+?))?(?:\s+limit\s+(\d+))?$/i);
  if (!m) {
    print({ kind: 'error', text: `Syntax error near '${q.slice(0, 30)}'. Try HELP.` });
    return;
  }

  const [, colsPart, tableName, wherePart, limitPart] = m;
  const table = tables[tableName.toLowerCase()];
  if (!table) {
    print({ kind: 'error', text: `Table '${tableName}' not found. SHOW TABLES lists what exists.` });
    return;
  }

  const schema = Object.keys(table[0]);
  const columns =
    colsPart.trim() === '*'
      ? schema
      : colsPart.split(',').map((c) => c.trim().toLowerCase());
  const badCol = columns.find((c) => !schema.includes(c));
  if (badCol) {
    print({ kind: 'error', text: `Unknown column '${badCol}' in '${tableName}' (${schema.join(', ')}).` });
    return;
  }

  let rows = [...table];
  if (wherePart) {
    const conditions = wherePart.split(/\s+and\s+/i);
    for (const cond of conditions) {
      const cm = cond.match(/^(\w+)\s*(=|!=|like)\s*(?:'([^']*)'|"([^"]*)"|(\S+))$/i);
      if (!cm) {
        print({ kind: 'error', text: `Can't parse condition '${cond}'. Use field = 'value' or field LIKE '%value%'.` });
        return;
      }
      const [, field, op, v1, v2, v3] = cm;
      const fieldLc = field.toLowerCase();
      if (!schema.includes(fieldLc)) {
        print({ kind: 'error', text: `Unknown column '${field}' in '${tableName}' (${schema.join(', ')}).` });
        return;
      }
      rows = rows.filter((r) => matchCondition(r, fieldLc, op, v1 ?? v2 ?? v3));
    }
  }
  if (limitPart) rows = rows.slice(0, Number(limitPart));

  const projected = rows.map((r) =>
    Object.fromEntries(columns.map((c) => [c, r[c]])) as Row
  );

  let note: string | undefined;
  if (tableName.toLowerCase() === 'projects') {
    if (wherePart) {
      emit('filter', rows.map((r) => String(r.title)));
      note = '→ project grid filtered to these rows';
    } else {
      emit('filter', null);
    }
  }

  print({ kind: 'table', columns, rows: projected, note });
  logEvent('QUERY', `${rows.length} row${rows.length === 1 ? '' : 's'} returned from ${tableName.toLowerCase()}`, 'text-blue-400');
};

const recall = (dir: -1 | 1) => {
  if (!history.length) return;
  histIdx = Math.min(Math.max(histIdx + dir, 0), history.length);
  input.value = history[histIdx] ?? '';
};

const focusInput = () => inputEl.value?.focus();
defineExpose({ focusInput });
</script>

<template>
  <div
    class="bg-zinc-950 rounded-2xl border-2 border-zinc-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] overflow-hidden font-mono text-xs"
    @click="focusInput"
  >
    <div class="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900">
      <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
      <span class="ml-2 text-zinc-500 font-bold">portfolio_warehouse — sql</span>
    </div>

    <div ref="outputEl" class="max-h-72 overflow-y-auto px-4 py-3 space-y-2">
      <template v-for="(entry, i) in output" :key="i">
        <p v-if="entry.kind === 'cmd'" class="text-zinc-300">
          <span class="text-accent font-bold">sql&gt;</span> {{ entry.text }}
        </p>
        <p v-else-if="entry.kind === 'error'" class="text-red-400">ERROR: {{ entry.text }}</p>
        <p v-else-if="entry.kind === 'info'" class="text-zinc-500">-- {{ entry.text }}</p>
        <div v-else class="overflow-x-auto">
          <table class="border-collapse">
            <thead>
              <tr>
                <th
                  v-for="col in entry.columns"
                  :key="col"
                  class="text-left text-accent border border-zinc-700 px-2 py-1 font-bold"
                >{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, ri) in entry.rows" :key="ri">
                <td
                  v-for="col in entry.columns"
                  :key="col"
                  class="text-zinc-300 border border-zinc-800 px-2 py-1 align-top max-w-[320px]"
                >{{ cellText(row[col]) }}</td>
              </tr>
              <tr v-if="!entry.rows.length">
                <td :colspan="entry.columns.length" class="text-zinc-500 border border-zinc-800 px-2 py-1">(0 rows)</td>
              </tr>
            </tbody>
          </table>
          <p class="text-zinc-500 mt-1">
            {{ entry.rows.length }} row{{ entry.rows.length === 1 ? '' : 's' }}
            <span v-if="entry.note" class="text-accent"> {{ entry.note }}</span>
          </p>
        </div>
      </template>
    </div>

    <div class="flex items-center gap-2 px-4 py-3 border-t border-zinc-800 bg-zinc-900/60">
      <span class="text-accent font-bold shrink-0">sql&gt;</span>
      <input
        ref="inputEl"
        v-model="input"
        @keydown.enter="run"
        @keydown.up.prevent="recall(-1)"
        @keydown.down.prevent="recall(1)"
        type="text"
        spellcheck="false"
        autocomplete="off"
        placeholder="SELECT * FROM projects WHERE tech LIKE '%python%'"
        class="flex-1 bg-transparent text-zinc-200 placeholder-zinc-600 outline-none caret-[rgb(var(--color-accent))]"
        aria-label="SQL query input"
      />
    </div>
  </div>
</template>
