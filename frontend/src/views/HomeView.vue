<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)

const modules = Array.from({ length: 8 }, (_, index) => ({
  number: index + 1,
  days: `${index * 5 + 1}–${index * 5 + 5}`,
  title: `Modul ${index + 1}`,
}))
</script>

<template>
  <div class="home-page">
    <header id="beranda" class="site-header">
      <div class="container nav-wrap">
        <a class="brand" href="#beranda" aria-label="Hanguk Step, kembali ke beranda">
          <span class="brand-mark" aria-hidden="true"><i></i><b>한</b></span>
          <span><strong>Hanguk Step</strong><small>Korean, one step at a time</small></span>
        </a>
        <button class="menu-toggle" type="button" aria-label="Buka menu">
          <span></span><span></span><span></span>
        </button>
        <nav class="main-nav" aria-label="Navigasi utama">
          <RouterLink class="login-link" :to="isAuthenticated ? '/dashboard' : '/login'">
            {{ isAuthenticated ? 'Dashboard' : 'Login' }}
          </RouterLink>
          <a href="#beranda">Beranda</a>
          <a href="#kurikulum">Kurikulum</a>
          <a href="#belajar">Belajar</a>
          <a href="#review">Review</a>
          <RouterLink class="button button-small" :to="isAuthenticated ? '/learn' : '/login'">
            Mulai Belajar
          </RouterLink>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero section-pad">
        <div class="container hero-grid">
          <div class="hero-copy">
            <p class="eyebrow"><span>🇰🇷</span> Belajar bahasa Korea dengan cara yang lebih terarah</p>
            <h1>Belajar bahasa Korea,<br><em>satu langkah</em> setiap hari.</h1>
            <p class="hero-description">
              Pelajari <strong>400 kosakata Korea</strong> melalui program 40 hari yang dilengkapi
              contoh kalimat, audio, latihan berbicara, dan review.
            </p>
            <div class="hero-actions">
              <RouterLink class="button" :to="isAuthenticated ? '/learn' : '/login'">
                Mulai Day 1 <span>→</span>
              </RouterLink>
              <a class="button button-ghost" href="#kurikulum">Lihat Kurikulum</a>
            </div>
            <div class="trust-row"><span>✓ Gratis untuk belajar</span><span>✓ Progres tersimpan</span></div>
          </div>

          <div class="hero-visual" aria-label="Contoh kartu kosakata Korea">
            <span class="float-tag tag-today">오늘의 단어</span>
            <span class="float-tag tag-level">🌱 Level Pemula</span>
            <article class="demo-card">
              <div class="demo-top"><span class="day-pill">DAY 1</span><span class="tiny-progress">1 / 10</span></div>
              <p class="demo-label">KOSAKATA HARI INI</p>
              <h2>안녕하세요</h2>
              <p class="demo-meaning">Halo</p>
              <div class="demo-actions">
                <button type="button" class="icon-button">🔊 <span>Dengarkan</span></button>
                <button type="button" class="text-button">Lihat pelafalan</button>
              </div>
              <div class="progress-track"><span style="width: 10%"></span></div>
            </article>
            <span class="decor decor-one">가</span><span class="decor decor-two">A</span><span class="decor decor-three">한</span>
          </div>
        </div>
      </section>

      <section class="stats-section" aria-label="Statistik program">
        <div class="container stats-grid">
          <article><strong>400</strong><span>Kosakata</span></article>
          <article><strong>32</strong><span>Hari Belajar</span></article>
          <article><strong>8</strong><span>Hari Review</span></article>
          <article><strong>40</strong><span>Hari Program</span></article>
        </div>
      </section>

      <section id="kurikulum" class="curriculum section-pad">
        <div class="container">
          <div class="section-heading">
            <div><p class="eyebrow">KURIKULUM LENGKAP</p><h2>Kurikulum 40 Hari</h2></div>
            <p>Belajar empat hari, lalu kuatkan ingatanmu lewat satu hari review.</p>
          </div>
          <div class="modules-grid">
            <article v-for="module in modules" :key="module.number" class="module-card">
              <div class="module-top">
                <span class="module-number">{{ String(module.number).padStart(2, '0') }}</span>
                <span class="module-days">DAY {{ module.days }}</span>
              </div>
              <h3>{{ module.title }}</h3>
              <p>40 kosakata baru dan satu sesi review untuk memperkuat ingatan.</p>
              <div class="module-progress"><span></span></div>
              <small>0% selesai</small>
            </article>
          </div>
        </div>
      </section>

      <section id="belajar" class="learning-section section-pad">
        <div class="container">
          <div class="section-heading">
            <div><p class="eyebrow">RUANG BELAJAR</p><h2>Mulai langkah pertamamu</h2></div>
            <p>Pilih Day pada kurikulum untuk membuka materi.<br><b>Progres seluruh kursus: 0%</b></p>
          </div>
          <div class="learning-shell">
            <aside class="day-sidebar">
              <h3>40 Hari</h3>
              <button v-for="day in 8" :key="day" class="sidebar-day" type="button">
                <span>Day {{ day }}</span><small>{{ day === 5 ? 'Review' : '10 kata' }}</small>
              </button>
            </aside>
            <div class="learning-main">
              <div class="empty-state">
                <span>가</span>
                <h3>Pilih Day untuk mulai belajar</h3>
                <p>Kosakata, kalimat, audio, latihan berbicara, dan kuis akan muncul di sini.</p>
                <RouterLink class="button" :to="isAuthenticated ? '/learn' : '/login'">
                  Buka Day 1
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="review" class="review-banner section-pad">
        <div class="container review-inner">
          <div>
            <span class="review-icon">🧠</span>
            <p class="eyebrow">SETIAP 5 HARI</p>
            <h2>Review agar tidak cepat lupa.</h2>
            <p>Kerjakan 15 soal bertahap dari empat hari sebelumnya dan ulangi hanya jawaban yang masih salah.</p>
          </div>
          <button type="button" class="button button-coral">Coba Review Day 5 <span>→</span></button>
        </div>
      </section>
    </main>

    <footer>
      <div class="container">
        <div class="brand">
          <span class="brand-mark" aria-hidden="true"><i></i><b>한</b></span>
          <span><strong>Hanguk Step</strong><small>Korean, one step at a time</small></span>
        </div>
        <p>Belajar sedikit setiap hari, bertumbuh selangkah demi selangkah.</p>
        <span>© 2026 Hanguk Step</span>
      </div>
    </footer>
  </div>
</template>
