<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

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
</script>

<template>
  <div id="app">
    <header class="main-header">
      <nav class="main-nav">
        <div class="container">
          <a href="/" class="logo">
            <strong>Hanguk Step</strong>
          </a>
          <div v-if="authStore.isAuthenticated" class="nav-links">
            <span class="nav-user">{{ authStore.user?.name }}</span>
            <button @click="handleLogout" class="nav-link">Keluar</button>
          </div>
          <div v-else class="nav-links">
            <a href="/login" class="nav-link">Masuk</a>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-header {
  background: var(--white);
  border-bottom: 1px solid var(--line);
  position: sticky;
  top: 0;
  z-index: 100;
}

.main-nav {
  padding: 16px 0;
}

.main-nav .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  text-decoration: none;
  color: var(--navy-950);
}

.logo strong {
  font-size: 20px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-user {
  font-size: 14px;
  color: var(--muted);
}

.nav-link {
  background: none;
  border: none;
  color: var(--navy-950);
  font-size: 14px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background 0.2s;
  text-decoration: none;
}

.nav-link:hover {
  background: var(--blue-100);
  color: var(--blue-600);
}

main {
  flex: 1;
}
</style>
