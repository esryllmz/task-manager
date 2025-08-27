<script setup>
import { ref, onMounted } from "vue";
import TaskList from "./components/TaskList.vue";

const theme = ref("dark");
function applyTheme(t) {
  document.documentElement.setAttribute(
    "data-theme",
    t === "light" ? "light" : "dark"
  );
  theme.value = t;
  localStorage.setItem("theme", t);
}
function toggleTheme() {
  applyTheme(theme.value === "dark" ? "light" : "dark");
}
onMounted(() => applyTheme(localStorage.getItem("theme") || "dark"));
</script>

<template>
  <div class="task-container">
    <div class="toolbar">
      <h1>Görev Yöneticisi <span class="accent">Pro</span></h1>
      <button class="theme-btn" @click="toggleTheme">
        Tema: {{ theme === "dark" ? "Dark" : "Light" }}
      </button>
    </div>
    <TaskList />
  </div>
</template>
