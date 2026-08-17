<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courses } from '@/data/learning'

const route = useRoute()
const router = useRouter()
const course = computed(() => courses.find((item) => item.id === route.params.courseId))
</script>

<template>
  <div v-if="course" class="course-page">
    <header>
      <button type="button" @click="router.push('/')">Kembali</button>
      <RouterLink to="/">Hanguk Step</RouterLink>
      <span>{{ course.title }}</span>
    </header>

    <main>
      <section class="course-intro">
        <p>{{ course.subtitle }}</p>
        <h1>{{ course.title }}</h1>
        <span>{{ course.description }}</span>
      </section>

      <section v-if="course.status === 'available'" class="lesson-list">
        <div class="lesson-heading"><h2>Daftar pelajaran</h2><span>1 pelajaran tersedia</span></div>
        <RouterLink class="lesson-row" to="/courses/basic/lessons/1">
          <span class="lesson-index">01</span>
          <div><strong>인사와 자기소개</strong><small>Salam dan perkenalan diri</small></div>
          <span class="lesson-state">Mulai</span>
        </RouterLink>
      </section>

      <section v-else class="empty-course">
        <span>DALAM PERSIAPAN</span>
        <h2>Materi {{ course.title }} sedang disusun.</h2>
        <p>Kursus ini sudah memiliki tempat sendiri dan pelajaran baru akan muncul di sini saat ditambahkan.</p>
        <button type="button" @click="router.push('/')">Kembali ke pilihan kursus</button>
      </section>
    </main>
  </div>
</template>

<style scoped>
.course-page { min-height: 100vh; background: #f6f8fb; color: var(--navy-950); }
.course-page header { height: 68px; padding: 0 5vw; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; border-bottom: 1px solid var(--line); background: var(--white); }
.course-page header button { justify-self: start; border: 0; background: transparent; color: var(--muted); font-weight: 800; cursor: pointer; }
.course-page header a { color: inherit; font-size: 20px; font-weight: 900; text-decoration: none; }
.course-page header > span { justify-self: end; color: var(--blue-600); font-size: 12px; font-weight: 900; }
.course-page main { width: min(920px, 90vw); margin: 0 auto; padding: 50px 0; }
.course-intro { padding-bottom: 34px; border-bottom: 1px solid var(--line); }
.course-intro p { margin: 0; color: var(--blue-600); font-size: 12px; font-weight: 900; }
.course-intro h1 { margin: 8px 0 12px; font-size: 42px; }
.course-intro > span { color: var(--muted); line-height: 1.6; }
.lesson-list { padding-top: 35px; }
.lesson-heading { margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; }
.lesson-heading h2 { margin: 0; font-size: 22px; }
.lesson-heading span { color: var(--muted); font-size: 12px; }
.lesson-row { min-height: 92px; padding: 16px 20px; display: grid; grid-template-columns: 50px 1fr auto; align-items: center; gap: 16px; border: 1px solid var(--line); border-radius: 7px; background: var(--white); color: inherit; text-decoration: none; }
.lesson-index { color: #a2adba; font-size: 13px; font-weight: 900; }
.lesson-row strong, .lesson-row small { display: block; }
.lesson-row strong { font-size: 18px; }
.lesson-row small { margin-top: 5px; color: var(--muted); }
.lesson-state { color: var(--blue-600); font-size: 13px; font-weight: 900; }
.empty-course { min-height: 440px; display: grid; place-content: center; justify-items: center; text-align: center; }
.empty-course > span { color: #b34b3f; font-size: 11px; font-weight: 900; }
.empty-course h2 { margin: 10px 0; }
.empty-course p { max-width: 520px; margin: 0 0 22px; color: var(--muted); line-height: 1.6; }
.empty-course button { min-height: 43px; padding: 0 18px; border: 0; border-radius: 6px; background: var(--navy-950); color: var(--white); font-weight: 800; cursor: pointer; }
</style>
