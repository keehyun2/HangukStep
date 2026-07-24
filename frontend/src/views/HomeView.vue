<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const goToLogin = () => {
  router.push('/login')
}

const goToDashboard = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="home-view">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            <strong>Hanguk Step</strong>
            <small>Korean, one step at a time</small>
          </h1>
          <p class="hero-description">
            Platform pembelajaran bahasa Korea sistematis selama 40 hari untuk penutur bahasa Indonesia.
            Pelajari 400 kosakata penting dengan metode yang terstruktur dan mudah diikuti.
          </p>
          <div class="hero-actions">
            <button
              v-if="!authStore.isAuthenticated"
              @click="goToLogin"
              class="button button-primary"
            >
              Mulai Belajar
            </button>
            <button
              v-else
              @click="goToDashboard"
              class="button button-primary"
            >
              Lanjutkan Belajar
            </button>
            <button class="button button-ghost">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2>Mengapa Hanguk Step?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <span class="feature-emoji">📚</span>
            <h3>40 Hari Kurikulum</h3>
            <p>Struktur pembelajaran yang sistematis dengan 400 kosakata penting</p>
          </div>
          <div class="feature-card">
            <span class="feature-emoji">🎯</span>
            <h3>Metode Terbukti</h3>
            <p>Gunakan teknik spaced repetition untuk pembelajaran jangka panjang</p>
          </div>
          <div class="feature-card">
            <span class="feature-emoji">🔊</span>
            <h3>Audio Asli</h3>
            <p>Dengarkan pelafalan Korea asli dengan Web Speech API</p>
          </div>
          <div class="feature-card">
            <span class="feature-emoji">📝</span>
            <h3>Latihan Interaktif</h3>
            <p>Kuis, latihan speaking, dan tracking progress yang lengkap</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
}

.hero {
  padding: 120px 0;
  background: linear-gradient(135deg, var(--sky) 0%, var(--white) 100%);
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: clamp(32px, 5vw, 48px);
  margin-bottom: 24px;
}

.hero-title strong {
  display: block;
  color: var(--navy-950);
}

.hero-title small {
  display: block;
  font-size: 18px;
  color: var(--muted);
  margin-top: 8px;
}

.hero-description {
  font-size: 18px;
  line-height: 1.6;
  color: var(--muted);
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.button-primary {
  background: var(--blue-600);
  color: var(--white);
}

.button-ghost {
  background: transparent;
  color: var(--navy-950);
  border: 1px solid var(--line);
}

.features {
  padding: 80px 0;
}

.features h2 {
  text-align: center;
  font-size: 32px;
  margin-bottom: 48px;
  color: var(--navy-950);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px;
}

.feature-card {
  text-align: center;
  padding: 32px;
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.feature-emoji {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 20px;
  margin-bottom: 12px;
  color: var(--navy-950);
}

.feature-card p {
  color: var(--muted);
  line-height: 1.6;
}
</style>
