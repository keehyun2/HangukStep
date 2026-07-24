<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isMenuOpen = ref(false)

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token && !authStore.isAuthenticated) {
    try {
      await authStore.fetchCurrentUser()
    } catch (error) {
      console.error('Failed to fetch user:', error)
      localStorage.removeItem('token')
      router.push('/login')
    }
  }
})

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const goToHome = () => {
  router.push('/')
}

const goToLogin = () => {
  router.push('/login')
}

const goToDashboard = () => {
  router.push('/dashboard')
}

const goToCurriculum = () => {
  router.push('/#kurikulum')
}

const goToLearning = () => {
  router.push('/#belajar')
}

const goToReview = () => {
  router.push('/#review')
}

const startDayOne = () => {
  if (authStore.isAuthenticated) {
    router.push('/dashboard')
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <div id="app">
    <!-- Origin-style header -->
    <header class="site-header" id="beranda">
      <div class="container nav-wrap">
        <a class="brand" href="#" @click.prevent="goToHome" aria-label="Hanguk Step, kembali ke beranda">
          <span class="brand-mark" aria-hidden="true"><i></i><b>한</b></span>
          <span><strong>Hanguk Step</strong><small>Korean, one step at a time</small></span>
        </a>
        <button
          class="menu-toggle"
          type="button"
          :aria-label="isMenuOpen ? 'Tutup menu' : 'Buka menu'"
          :aria-expanded="isMenuOpen"
          @click="toggleMenu"
        >
          <span></span><span></span><span></span>
        </button>
        <nav class="main-nav" :class="{ 'nav-open': isMenuOpen }" aria-label="Navigasi utama">
          <!-- 다른 HTML 페이지로 이동하는 로그인 메뉴 -->
          <a v-if="!authStore.isAuthenticated" href="#" @click.prevent="goToLogin" class="login-link">Login</a>
          <a v-else href="#" @click.prevent="goToDashboard" class="login-link">{{ authStore.user?.name || 'Dashboard' }}</a>
          <a href="#" @click.prevent="goToHome">Beranda</a>
          <a href="#" @click.prevent="goToCurriculum">Kurikulum</a>
          <a href="#" @click.prevent="goToLearning">Belajar</a>
          <a href="#" @click.prevent="goToReview">Review</a>
          <button
            v-if="authStore.isAuthenticated"
            class="button button-small start-day-one"
            type="button"
            @click="handleLogout"
          >
            Keluar
          </button>
          <button
            v-else
            class="button button-small start-day-one"
            type="button"
            @click="startDayOne"
          >
            Mulai Belajar
          </button>
        </nav>
      </div>
    </header>

    <main>
      <router-view />
    </main>

    <!-- Origin-style footer -->
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

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

/* Site header from origin */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(251, 250, 246, 0.9);
  border-bottom: 1px solid rgba(16, 38, 63, 0.07);
  backdrop-filter: blur(18px);
}

.nav-wrap {
  min-height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.brand-mark {
  position: relative;
  width: 43px;
  height: 43px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  overflow: hidden;
  background: var(--white);
  box-shadow: 0 7px 20px rgba(16, 38, 63, 0.12);
}

.brand-mark i {
  position: absolute;
  inset: 0 0 50%;
  background: var(--coral-500);
}

.brand-mark::after {
  content: "";
  position: absolute;
  inset: 50% 0 0;
  background: var(--blue-600);
}

.brand-mark b {
  position: relative;
  z-index: 1;
  width: 25px;
  height: 25px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #fff;
  color: var(--navy-950);
  font-size: 15px;
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  font-size: 17px;
  letter-spacing: -0.02em;
  color: var(--navy-950);
}

.brand small {
  font-size: 11px;
  color: var(--muted);
  margin-top: -2px;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 27px;
  font-size: 14px;
  font-weight: 700;
}

.main-nav a {
  transition: 0.2s;
  cursor: pointer;
}

.main-nav a:hover {
  color: var(--blue-600);
}

.login-link {
  color: var(--blue-600);
}

.menu-toggle {
  display: none;
  width: 44px;
  height: 44px;
  border: 0;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  margin: 5px auto;
  background: var(--navy-950);
  transition: 0.3s;
}

/* Footer from origin */
footer {
  padding: 48px 0;
  background: var(--cream);
  border-top: 1px solid var(--line);
  text-align: center;
}

footer .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

footer .brand {
  margin-bottom: 8px;
}

footer p {
  color: var(--muted);
  font-size: 14px;
  margin: 0;
}

footer span:last-child {
  color: var(--muted);
  font-size: 12px;
}

/* Mobile menu */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .main-nav {
    position: fixed;
    top: 78px;
    left: 0;
    right: 0;
    background: var(--white);
    flex-direction: column;
    padding: 24px;
    gap: 16px;
    border-bottom: 1px solid var(--line);
    transform: translateY(-100%);
    opacity: 0;
    transition: transform 0.3s, opacity 0.3s;
    pointer-events: none;
  }

  .main-nav.nav-open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .menu-toggle[aria-expanded="true"] span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .menu-toggle[aria-expanded="true"] span:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle[aria-expanded="true"] span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
}
</style>
