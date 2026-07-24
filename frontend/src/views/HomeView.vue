<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const currentDay = ref(1)
const totalDays = 40
const wordsLearned = ref(0)
const totalWords = 400
const overallProgress = ref(0)

// Curriculum data - 40 days divided into 8 modules of 5 days each
const modules = ref<Array<{
  id: number
  days: number[]
  title: string
  completed: boolean
}>>([])

// Generate curriculum modules
const generateCurriculum = () => {
  const moduleTitles = [
    'Introduction & Greetings',
    'Basic Conversations',
    'Numbers & Time',
    'Food & Dining',
    'Shopping & Directions',
    'Family & Relationships',
    'Daily Activities',
    'Review & Mastery'
  ]

  for (let i = 0; i < 8; i++) {
    const startDay = i * 5 + 1
    const endDay = startDay + 4
    modules.value.push({
      id: i + 1,
      days: Array.from({ length: 5 }, (_, j) => startDay + j),
      title: moduleTitles[i] || `Module ${i + 1}`,
      completed: false
    })
  }
}

onMounted(() => {
  generateCurriculum()
  // Load progress from auth store or localStorage
  const savedProgress = localStorage.getItem('learningProgress')
  if (savedProgress) {
    const progress = JSON.parse(savedProgress)
    currentDay.value = progress.currentDay || 1
    wordsLearned.value = progress.wordsLearned || 0
    overallProgress.value = progress.overallProgress || 0
  }
})

const goToLogin = () => {
  router.push('/login')
}

const goToDashboard = () => {
  router.push('/dashboard')
}

const startDayOne = () => {
  if (authStore.isAuthenticated) {
    router.push('/dashboard')
  } else {
    router.push('/login')
  }
}

const selectDay = (day: number) => {
  if (authStore.isAuthenticated) {
    router.push(`/dashboard?day=${day}`)
  } else {
    router.push('/login')
  }
}

const playAudio = () => {
  // Placeholder for audio playback
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance('안녕하세요')
    utterance.lang = 'ko-KR'
    speechSynthesis.speak(utterance)
  }
}

const showPronunciation = ref(false)
const togglePronunciation = () => {
  showPronunciation.value = !showPronunciation.value
}

const openFirstReview = () => {
  if (authStore.isAuthenticated) {
    router.push('/dashboard?review=5')
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <div class="home-view">
    <!-- Hero section from origin -->
    <section class="hero section-pad">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow"><span>✦</span> Belajar bahasa Korea dengan cara yang lebih terarah</p>
          <h1>Belajar bahasa Korea,<br><em>satu langkah</em> setiap hari.</h1>
          <p class="hero-description">
            Pelajari <strong>400 kosakata Korea</strong> melalui program 40 hari yang dilengkapi contoh kalimat,
            audio, latihan berbicara, dan review.
          </p>
          <div class="hero-actions">
            <button class="button start-day-one" type="button" @click="startDayOne">
              Mulai Day 1 <span>→</span>
            </button>
            <a class="button button-ghost" href="#kurikulum">Lihat Kurikulum</a>
          </div>
          <div class="trust-row">
            <span>✓ Gratis untuk belajar</span>
            <span>✓ Progres tersimpan</span>
          </div>
        </div>
        <div class="hero-visual" aria-label="Contoh kartu kosakata Korea">
          <span class="float-tag tag-today">오늘의 단어</span>
          <span class="float-tag tag-level">🇰🇷 Level Pemula</span>
          <article class="demo-card">
            <div class="demo-top">
              <span class="day-pill">DAY 1</span>
              <span class="tiny-progress">1 / 10</span>
            </div>
            <p class="demo-label">KOSAKATA HARI INI</p>
            <h2>안녕하세요</h2>
            <p class="demo-meaning">Halo</p>
            <p class="demo-romanization" v-if="showPronunciation">annyeonghaseyo</p>
            <div class="demo-actions">
              <button type="button" class="icon-button demo-audio" @click="playAudio" aria-label="Dengarkan kata 안녕하세요">
                🔊 <span>Dengarkan</span>
              </button>
              <button type="button" class="text-button demo-pronunciation" @click="togglePronunciation">
                {{ showPronunciation ? 'Sembunyikan' : 'Lihat' }} pelafalan
              </button>
            </div>
            <div class="progress-track">
              <span style="width: 10%"></span>
            </div>
          </article>
          <span class="decor decor-one">가</span>
          <span class="decor decor-two">A</span>
          <span class="decor decor-three">✦</span>
        </div>
      </div>
    </section>

    <!-- Stats section from origin -->
    <section class="stats-section" aria-label="Statistik program">
      <div class="container stats-grid">
        <article><strong>400</strong><span>Kosakata</span></article>
        <article><strong>32</strong><span>Hari Belajar</span></article>
        <article><strong>8</strong><span>Hari Review</span></article>
        <article><strong>40</strong><span>Hari Program</span></article>
      </div>
    </section>

    <!-- Curriculum section from origin -->
    <section class="curriculum section-pad" id="kurikulum">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow">KURIKULUM LENGKAP</p>
            <h2>Kurikulum 40 Hari</h2>
          </div>
          <p>Belajar empat hari, lalu kuatkan ingatanmu lewat satu hari review.</p>
        </div>
        <div class="modules-grid">
          <div
            v-for="module in modules"
            :key="module.id"
            class="module-card"
            :class="{ 'module-completed': module.completed }"
          >
            <div class="module-header">
              <span class="module-number">Module {{ module.id }}</span>
              <span class="module-days">Day {{ module.days[0] }} - {{ module.days[4] }}</span>
            </div>
            <h3 class="module-title">{{ module.title }}</h3>
            <div class="module-days-list">
              <button
                v-for="day in module.days"
                :key="day"
                class="day-chip"
                :class="{ 'is-review': day % 5 === 0 }"
                @click="selectDay(day)"
              >
                {{ day % 5 === 0 ? `Review ${day}` : `Day ${day}` }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning section from origin -->
    <section class="learning-section section-pad" id="belajar">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow">RUANG BELAJAR</p>
            <h2>Mulai langkah pertamamu</h2>
          </div>
          <p>
            Pilih Day pada kurikulum untuk membuka materi.
            <br>
            <b>Progres seluruh kursus: <span>{{ overallProgress }}%</span></b>
          </p>
        </div>
        <div class="learning-shell">
          <aside class="day-sidebar">
            <h3>40 Hari</h3>
            <div class="sidebar-days">
              <button
                v-for="day in 40"
                :key="day"
                class="sidebar-day"
                :class="{ 'is-review': day % 5 === 0, 'is-current': day === currentDay }"
                @click="selectDay(day)"
              >
                {{ day % 5 === 0 ? `R${Math.floor(day / 5)}` : day }}
              </button>
            </div>
          </aside>
          <div class="learning-main">
            <div class="empty-state">
              <span>가</span>
              <h3>Pilih Day untuk mulai belajar</h3>
              <p>Kosakata, kalimat, audio, latihan berbicara, dan kuis akan muncul di sini.</p>
              <button type="button" class="button start-day-one" @click="startDayOne">Buka Day 1</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Review banner from origin -->
    <section class="review-banner section-pad" id="review">
      <div class="container review-inner">
        <div>
          <span class="review-icon">📝</span>
          <p class="eyebrow">SETIAP 5 HARI</p>
          <h2>Review agar tidak cepat lupa.</h2>
          <p>Kerjakan 15 soal bertahap dari empat hari sebelumnya dan ulangi hanya jawaban yang masih salah.</p>
        </div>
        <button type="button" class="button button-coral" @click="openFirstReview">
          Coba Review Day 5 <span>→</span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
  background: var(--cream);
}

/* Hero section styles from origin */
.hero {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 12% 18%, rgba(47, 108, 244, 0.09), transparent 25%),
    radial-gradient(circle at 88% 20%, rgba(240, 106, 91, 0.08), transparent 24%),
    var(--cream);
}

.hero::after {
  content: "";
  position: absolute;
  width: 560px;
  height: 560px;
  border: 1px solid rgba(47, 108, 244, 0.08);
  border-radius: 50%;
  right: -220px;
  top: -280px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  align-items: center;
  gap: 72px;
  min-height: 580px;
}

.hero-copy h1 {
  max-width: 670px;
  margin: 0;
  color: var(--navy-950);
  font-size: clamp(44px, 5.5vw, 72px);
  line-height: 1.08;
  letter-spacing: -0.055em;
}

.hero-copy h1 em {
  position: relative;
  color: var(--blue-600);
  font-style: normal;
}

.hero-copy h1 em::after {
  content: "";
  position: absolute;
  height: 9px;
  left: 0;
  right: 0;
  bottom: 1px;
  background: rgba(240, 106, 91, 0.22);
  border-radius: 50%;
  z-index: -1;
}

.hero-description {
  max-width: 610px;
  margin: 25px 0 29px;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.85;
}

.hero-description strong {
  color: var(--navy-950);
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.trust-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.trust-row span {
  color: var(--muted);
  font-size: 14px;
  font-weight: 500;
}

/* Hero visual / demo card */
.hero-visual {
  position: relative;
}

.float-tag {
  position: absolute;
  padding: 8px 16px;
  background: var(--white);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 8px 20px rgba(16, 38, 63, 0.08);
  z-index: 2;
}

.tag-today {
  top: 20px;
  left: 20px;
  color: var(--coral-500);
}

.tag-level {
  top: 20px;
  right: 20px;
}

.demo-card {
  position: relative;
  background: var(--white);
  border-radius: var(--radius);
  padding: 32px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(16, 38, 63, 0.06);
}

.demo-card::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: var(--radius);
  background: linear-gradient(135deg, rgba(47, 108, 244, 0.1), rgba(240, 106, 91, 0.1));
  z-index: -1;
}

.demo-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.day-pill {
  background: var(--blue-100);
  color: var(--blue-600);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 800;
}

.tiny-progress {
  font-size: 12px;
  color: var(--muted);
  font-weight: 600;
}

.demo-label {
  margin: 0 0 8px;
  color: var(--muted);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.demo-card h2 {
  margin: 0 0 8px;
  color: var(--navy-950);
  font-size: 42px;
  line-height: 1.1;
}

.demo-meaning {
  margin: 0 0 24px;
  color: var(--muted);
  font-size: 18px;
}

.demo-romanization {
  margin: 0 0 24px;
  color: var(--blue-600);
  font-size: 16px;
  font-style: italic;
}

.demo-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.progress-track {
  height: 4px;
  background: var(--blue-100);
  border-radius: 2px;
  overflow: hidden;
}

.progress-track span {
  display: block;
  height: 100%;
  background: var(--blue-600);
  border-radius: 2px;
  transition: width 0.3s;
}

.decor {
  position: absolute;
  font-size: 120px;
  font-weight: 900;
  color: var(--navy-950);
  opacity: 0.03;
  pointer-events: none;
}

.decor-one {
  bottom: -40px;
  left: -20px;
}

.decor-two {
  bottom: -40px;
  right: -20px;
  font-family: Arial, sans-serif;
}

.decor-three {
  top: -20px;
  right: 50%;
}

/* Stats section */
.stats-section {
  padding: 64px 0;
  background: var(--white);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  text-align: center;
}

.stats-grid article {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stats-grid strong {
  font-size: 48px;
  font-weight: 800;
  color: var(--navy-950);
  line-height: 1;
}

.stats-grid span {
  font-size: 14px;
  color: var(--muted);
  font-weight: 600;
}

/* Curriculum section */
.curriculum {
  background: var(--cream);
}

.section-heading {
  margin-bottom: 56px;
}

.section-heading > div {
  margin-bottom: 16px;
}

.section-heading h2 {
  margin: 8px 0;
  color: var(--navy-950);
  font-size: clamp(28px, 4vw, 40px);
}

.section-heading p {
  color: var(--muted);
  max-width: 600px;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.module-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 24px;
  border: 1px solid var(--line);
  transition: transform 0.2s, box-shadow 0.2s;
}

.module-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.module-number {
  font-size: 12px;
  font-weight: 800;
  color: var(--blue-600);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.module-days {
  font-size: 12px;
  color: var(--muted);
  font-weight: 600;
}

.module-title {
  margin: 0 0 20px;
  color: var(--navy-950);
  font-size: 18px;
  line-height: 1.4;
}

.module-days-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.day-chip {
  padding: 10px 16px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: transparent;
  font-size: 14px;
  font-weight: 600;
  color: var(--navy-950);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.day-chip:hover {
  border-color: var(--blue-600);
  color: var(--blue-600);
}

.day-chip.is-review {
  background: var(--coral-100);
  border-color: var(--coral-500);
  color: var(--coral-500);
}

/* Learning section */
.learning-section {
  background: var(--white);
}

.learning-shell {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px;
  background: var(--cream);
  border-radius: var(--radius);
  padding: 32px;
  min-height: 400px;
}

.day-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.day-sidebar h3 {
  margin: 0;
  color: var(--navy-950);
  font-size: 16px;
}

.sidebar-days {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.sidebar-day {
  padding: 8px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--white);
  font-size: 12px;
  font-weight: 600;
  color: var(--navy-950);
  cursor: pointer;
  transition: all 0.2s;
}

.sidebar-day:hover {
  border-color: var(--blue-600);
  color: var(--blue-600);
}

.sidebar-day.is-review {
  background: var(--coral-100);
  border-color: var(--coral-500);
  color: var(--coral-500);
}

.sidebar-day.is-current {
  background: var(--blue-600);
  border-color: var(--blue-600);
  color: var(--white);
}

.learning-main {
  background: var(--white);
  border-radius: 16px;
  padding: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state {
  text-align: center;
  max-width: 400px;
}

.empty-state span:first-child {
  font-size: 64px;
  display: block;
  margin-bottom: 16px;
}

.empty-state h3 {
  margin: 0 0 12px;
  color: var(--navy-950);
  font-size: 24px;
}

.empty-state p {
  color: var(--muted);
  margin: 0 0 24px;
  line-height: 1.6;
}

/* Review banner */
.review-banner {
  background: linear-gradient(135deg, var(--coral-100), var(--white));
  border-radius: var(--radius);
  padding: 64px;
  margin: 0 20px;
}

.review-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.review-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
}

.review-inner h2 {
  margin: 8px 0;
  color: var(--navy-950);
  font-size: clamp(24px, 3vw, 32px);
}

.review-inner p {
  color: var(--muted);
  max-width: 500px;
  margin: 0;
}

/* Responsive design */
@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .hero-visual {
    order: -1;
  }

  .learning-shell {
    grid-template-columns: 1fr;
  }

  .day-sidebar {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .sidebar-days {
    display: flex;
    flex-wrap: wrap;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-actions {
    flex-direction: column;
  }

  .hero-actions .button,
  .hero-actions .button-ghost {
    width: 100%;
    justify-content: center;
  }

  .review-inner {
    flex-direction: column;
    text-align: center;
  }

  .section-pad {
    padding: 64px 0;
  }

  .review-banner {
    padding: 32px;
    margin: 0;
  }
}
</style>
