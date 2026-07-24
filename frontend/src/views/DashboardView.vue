<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.currentUser)

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="dashboard-view">
    <div class="container">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p>Selamat datang di Hanguk Step!</p>
      </div>

      <div v-if="user" class="dashboard-content">
        <div class="user-card">
          <div class="user-avatar">
            <span>{{ user.name.charAt(0).toUpperCase() }}</span>
          </div>
          <div class="user-info">
            <h2>{{ user.name }}</h2>
            <p class="user-email">{{ user.email }}</p>
            <p class="user-joined">
              Bergabung sejak {{ formatDate(user.createdAt) }}
            </p>
          </div>
        </div>

        <div class="dashboard-actions">
          <button @click="handleLogout" class="button button-secondary">
            Keluar
          </button>
          <button class="button button-primary">
            Mulai Belajar
          </button>
        </div>

        <div class="coming-soon">
          <h3>Fitur yang akan segera hadir:</h3>
          <ul>
            <li>📚 Kurikulum 40 hari pembelajaran</li>
            <li>📝 Pelacakan progress belajar</li>
            <li>🔊 Latihan speaking dan rekaman</li>
            <li>🎯 Sistem kuis dan review</li>
            <li>📊 Statistik dan pencapaian</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-view {
  min-height: 100vh;
  padding: 40px 0;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 48px;
}

.dashboard-header h1 {
  font-size: 36px;
  color: var(--navy-950);
  margin-bottom: 8px;
}

.dashboard-header p {
  font-size: 18px;
  color: var(--muted);
}

.user-card {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px;
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: 32px;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--blue-600);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 32px;
  font-weight: bold;
}

.user-info {
  flex: 1;
}

.user-info h2 {
  margin: 0 0 8px;
  font-size: 24px;
  color: var(--navy-950);
}

.user-email {
  margin: 0 0 4px;
  color: var(--muted);
}

.user-joined {
  margin: 0;
  font-size: 14px;
  color: var(--muted);
}

.dashboard-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 48px;
}

.button-primary {
  background: var(--blue-600);
  color: var(--white);
}

.button-secondary {
  background: transparent;
  color: var(--navy-950);
  border: 1px solid var(--line);
}

.coming-soon {
  padding: 32px;
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.coming-soon h3 {
  margin: 0 0 16px;
  font-size: 20px;
  color: var(--navy-950);
}

.coming-soon ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.coming-soon li {
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
  font-size: 16px;
  color: var(--muted);
}

.coming-soon li:last-child {
  border-bottom: none;
}
</style>
