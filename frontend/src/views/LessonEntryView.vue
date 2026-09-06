<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getLesson } from '@/data/lessons'
import LessonView from '@/views/LessonView.vue'
import DailyLessonView from '@/views/DailyLessonView.vue'

const route = useRoute()
const lesson = computed(() => getLesson(String(route.params.courseId), Number(route.params.lessonNumber)))
const lessonComponent = computed(() => lesson.value?.format === 'daily' ? DailyLessonView : LessonView)
</script>

<template>
  <component :is="lessonComponent" v-if="lesson" />
  <main v-else class="missing-lesson">
    <h1>Pelajaran tidak ditemukan</h1>
    <RouterLink to="/">Kembali ke beranda</RouterLink>
  </main>
</template>

<style scoped>
.missing-lesson { min-height: 100vh; display: grid; place-content: center; justify-items: center; background: #f6f8fb; color: var(--navy-950); }
.missing-lesson h1 { font-size: 28px; }
.missing-lesson a { color: var(--blue-600); font-weight: 800; }
</style>
