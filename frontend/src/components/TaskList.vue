<script setup>
import { ref, computed, onMounted } from "vue";

const API = "http://localhost:5000";

const tasks = ref([]);
const newText = ref("");
const syncing = ref(false);
const errorMsg = ref("");

const filter = ref("all");
const filteredTasks = computed(() => {
  if (filter.value === "active") return tasks.value.filter((t) => !t.done);
  if (filter.value === "done") return tasks.value.filter((t) => t.done);
  return tasks.value;
});
const counts = computed(() => {
  const total = tasks.value.length;
  const done = tasks.value.filter((t) => t.done).length;
  return { total, done, active: total - done };
});

async function load() {
  try {
    const r = await fetch(`${API}/tasks`);
    const j = await r.json();
    tasks.value = j.ok ? j.data : [];
  } catch (e) {
    errorMsg.value = "API'ye ulaşılamadı.";
    console.error(e);
  }
}
async function add() {
  const text = newText.value.trim();
  if (!text) return;
  const r = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const j = await r.json();
  if (!j.ok) return alert("Ekleme hatası");
  tasks.value.unshift(j.data);
  newText.value = "";
}
async function toggle(t) {
  const r = await fetch(`${API}/tasks/${t.id}/toggle`, { method: "POST" });
  const j = await r.json();
  if (j.ok) t.done = j.data.done;
}
async function remove(t, i) {
  await fetch(`${API}/tasks/${t.id}`, { method: "DELETE" });
  tasks.value.splice(i, 1);
}

onMounted(load);
</script>

<template>
  <div>
    <div class="input-row">
      <input
        class="input"
        v-model="newText"
        @keyup.enter="add"
        placeholder="Yeni görev..."
      />
      <button class="btn" @click="add">Ekle</button>
    </div>

    <div class="toolbar">
      <div class="filters">
        <button
          class="chip"
          :class="{ active: filter === 'all' }"
          @click="filter = 'all'"
        >
          Tümü ({{ counts.total }})
        </button>
        <button
          class="chip"
          :class="{ active: filter === 'active' }"
          @click="filter = 'active'"
        >
          Aktif ({{ counts.active }})
        </button>
        <button
          class="chip"
          :class="{ active: filter === 'done' }"
          @click="filter = 'done'"
        >
          Tamamlanan ({{ counts.done }})
        </button>
      </div>
      <span class="meta" v-if="errorMsg">{{ errorMsg }}</span>
      <span class="meta" v-else>Toplam: {{ counts.total }}</span>
    </div>

    <ul class="reset">
      <li
        v-for="(t, i) in filteredTasks"
        :key="t.id"
        class="list-item"
        :class="{ completed: t.done }"
      >
        <div class="task-title" @click="toggle(t)">
          <span class="dot"></span>
          <span class="task-text">{{ t.text }}</span>
        </div>
        <button class="btn-del" @click="remove(t, i)">Sil</button>
      </li>
    </ul>

    <div v-if="!filteredTasks.length" class="empty">
      <span class="emoji">✨</span>
      Bu kategoride görev yok.
    </div>
  </div>
</template>
