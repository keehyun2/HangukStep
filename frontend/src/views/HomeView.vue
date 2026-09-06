<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { courses } from '@/data/courses'
import { getPublishedLessons } from '@/data/lessons'
import heroImage from '@/assets/hero.png'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const availableLessonCount = (courseId: string) => getPublishedLessons(courseId).length
</script>

<template>
  <div class="catalog-page">
    <header class="catalog-header">
      <RouterLink class="catalog-brand" to="/">
        <span class="brand-symbol">HS</span>
        <span><strong>Hanguk Step</strong><small>Korean, one step at a time</small></span>
      </RouterLink>
      <nav aria-label="Navigasi utama">
        <RouterLink to="/vocabulary">Kosakata</RouterLink>
        <RouterLink to="/grammar">Tata Bahasa</RouterLink>
        <RouterLink to="/wordbook">Kosakata Saya</RouterLink>
        <RouterLink class="account-link" :to="isAuthenticated ? '/dashboard' : '/login'">
          {{ isAuthenticated ? 'Akun' : 'Login' }}
        </RouterLink>
      </nav>
    </header>

    <main>
      <section class="welcome-band">
        <div>
          <p class="section-kicker">PILIH JALUR BELAJAR</p>
          <h1>Belajar bahasa Korea sesuai tujuanmu.</h1>
          <p>Mulai dari dasar, lalu lanjutkan ke TOPIK I atau EPS-TOPIK saat kamu siap.</p>
        </div>
        <img :src="heroImage" alt="Contoh materi belajar bahasa Korea Hanguk Step">
      </section>

      <section class="course-section">
        <div class="section-title">
          <div><p class="section-kicker">KURSUS</p><h2>Jalur belajar</h2></div>
          <p>Setiap kursus memiliki pelajaran dan progres yang terpisah.</p>
        </div>

        <div class="course-grid">
          <article v-for="(course, index) in courses" :key="course.id" class="course-card">
            <div class="course-number">0{{ index + 1 }}</div>
            <div class="course-copy">
              <span>{{ course.subtitle }}</span>
              <h3>{{ course.title }}</h3>
              <p>{{ course.description }}</p>
            </div>
            <div class="course-meta">
              <span v-if="course.status === 'available'">{{ availableLessonCount(course.id) }} pelajaran tersedia</span>
              <span v-else class="coming-label">Segera hadir</span>
              <RouterLink
                v-if="course.status === 'available'"
                class="course-action"
                :to="isAuthenticated ? `/courses/${course.id}` : '/login'"
              >
                Buka kursus
              </RouterLink>
              <RouterLink v-else class="course-action secondary" :to="`/courses/${course.id}`">
                Lihat rencana
              </RouterLink>
            </div>
          </article>
        </div>
      </section>

      <section class="study-tools">
        <div><p class="section-kicker">ALAT BELAJAR</p><h2>Pelajari kembali kapan saja</h2></div>
        <RouterLink to="/vocabulary">
          <strong>Kamus Kosakata</strong>
          <span>Jelajahi kosakata Korea berdasarkan tema.</span>
        </RouterLink>
        <RouterLink to="/grammar">
          <strong>Kamus Tata Bahasa</strong>
          <span>Lihat penjelasan dan contoh dari semua kursus.</span>
        </RouterLink>
        <RouterLink to="/wordbook">
          <strong>Kosakata Saya</strong>
          <span>Simpan kata penting dan tambahkan catatanmu.</span>
        </RouterLink>
      </section>
    </main>
  </div>
</template>

<style scoped>
.catalog-page { min-height: 100vh; background: #f6f8fb; color: var(--navy-950); }
.catalog-header { min-height: 72px; padding: 0 5vw; display: flex; align-items: center; justify-content: space-between; gap: 24px; border-bottom: 1px solid var(--line); background: var(--white); }
.catalog-brand { display: flex; align-items: center; gap: 11px; color: inherit; text-decoration: none; }
.brand-symbol { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 6px; background: var(--navy-950); color: var(--white); font-size: 12px; font-weight: 900; }
.catalog-brand strong, .catalog-brand small { display: block; }
.catalog-brand small { margin-top: 2px; color: var(--muted); font-size: 10px; }
.catalog-header nav { display: flex; align-items: center; gap: 24px; }
.catalog-header nav a { color: var(--muted); font-size: 13px; font-weight: 800; text-decoration: none; }
.catalog-header nav .account-link { padding: 9px 15px; border: 1px solid var(--line); border-radius: 6px; color: var(--navy-950); }
.welcome-band { min-height: 310px; padding: 44px max(5vw, calc((100vw - 1180px) / 2)); display: grid; grid-template-columns: minmax(0, 1fr) 360px; align-items: center; gap: 50px; background: #10263f; color: var(--white); overflow: hidden; }
.welcome-band h1 { max-width: 700px; margin: 8px 0 14px; font-size: 42px; line-height: 1.16; }
.welcome-band p:not(.section-kicker) { max-width: 650px; margin: 0; color: #c6d3df; line-height: 1.65; }
.welcome-band img { width: 100%; height: 225px; object-fit: cover; object-position: center; border-radius: 8px; }
.section-kicker { margin: 0; color: #4d7ff0; font-size: 11px; font-weight: 900; }
.course-section { width: min(1180px, 90vw); margin: 0 auto; padding: 52px 0; }
.section-title { margin-bottom: 22px; display: flex; align-items: end; justify-content: space-between; gap: 28px; }
.section-title h2, .study-tools h2 { margin: 5px 0 0; font-size: 28px; }
.section-title > p { max-width: 410px; margin: 0; color: var(--muted); font-size: 13px; }
.course-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.course-card { min-height: 330px; padding: 25px; display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: 8px; background: var(--white); }
.course-number { color: #b8c1cd; font-size: 12px; font-weight: 900; }
.course-copy { flex: 1; padding-top: 34px; }
.course-copy > span { color: var(--blue-600); font-size: 11px; font-weight: 900; }
.course-copy h3 { margin: 7px 0 11px; font-size: 25px; }
.course-copy p { margin: 0; color: var(--muted); font-size: 14px; line-height: 1.6; }
.course-meta { padding-top: 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px; border-top: 1px solid var(--line); }
.course-meta > span { color: var(--muted); font-size: 11px; }
.course-meta .coming-label { color: #b34b3f; font-weight: 900; }
.course-action { color: var(--blue-600); font-size: 13px; font-weight: 900; text-decoration: none; }
.course-action.secondary { color: var(--muted); }
.study-tools { padding: 38px max(5vw, calc((100vw - 1180px) / 2)) 55px; display: grid; grid-template-columns: 1.2fr repeat(3, 1fr); gap: 15px; align-items: stretch; background: var(--white); border-top: 1px solid var(--line); }
.study-tools > a { padding: 20px; display: flex; flex-direction: column; justify-content: center; border-left: 3px solid var(--blue-600); background: #f4f7fd; color: inherit; text-decoration: none; }
.study-tools > a:last-child { border-left-color: #d94f45; background: #fff5f3; }
.study-tools a span { margin-top: 7px; color: var(--muted); font-size: 12px; line-height: 1.45; }
@media (max-width: 820px) {
  .catalog-header { padding: 13px 16px; align-items: flex-start; }
  .catalog-header nav { gap: 12px; flex-wrap: wrap; justify-content: flex-end; }
  .catalog-header nav a:not(.account-link) { display: none; }
  .welcome-band { min-height: auto; padding: 34px 20px; grid-template-columns: 1fr; }
  .welcome-band h1 { font-size: 33px; }
  .welcome-band img { height: 170px; }
  .section-title { align-items: start; flex-direction: column; }
  .course-grid, .study-tools { grid-template-columns: 1fr; }
  .study-tools { padding: 35px 5vw; }
}
</style>
