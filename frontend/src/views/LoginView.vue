<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const name = ref('')
const error = ref('')
const loading = ref(false)

const toggleMode = () => {
  isLogin.value = !isLogin.value
  error.value = ''
  // Clear form fields
  email.value = ''
  password.value = ''
  name.value = ''
}

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    if (isLogin.value) {
      await authStore.login(email.value, password.value)
    } else {
      await authStore.signup(email.value, password.value, name.value)
    }
    router.push('/dashboard')
  } catch (err: any) {
    console.error('Auth error:', err)
    if (err.response?.data?.error === 'EMAIL_EXISTS') {
      error.value = 'Email sudah terdaftar. Silakan login.'
    } else if (err.response?.data?.error === 'INVALID_CREDENTIALS') {
      error.value = 'Email atau kata sandi salah.'
    } else if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else {
      error.value = 'Terjadi kesalahan. Silakan coba lagi.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-body">
    <div class="auth-card">
      <div class="auth-header">
        <div class="auth-logo">
          <strong>Hanguk Step</strong>
          <small>Korean, one step at a time</small>
        </div>
      </div>

      <div class="auth-main">
        <h1 id="authTitle">{{ isLogin ? 'Masuk' : 'Daftar' }}</h1>
        <p class="auth-description">
          {{ isLogin ? 'Masuk untuk melanjutkan belajar' : 'Buat akun untuk mulai belajar' }}
        </p>

        <div class="auth-tabs">
          <button
            type="button"
            class="auth-tab"
            :class="{ 'is-active': isLogin }"
            @click="toggleMode"
          >
            Masuk
          </button>
          <button
            type="button"
            class="auth-tab"
            :class="{ 'is-active': !isLogin }"
            @click="toggleMode"
          >
            Daftar
          </button>
        </div>

        <form class="auth-form" @submit.prevent="handleSubmit">
          <div v-if="!isLogin" class="auth-form-group">
            <label for="name">Nama</label>
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="Nama lengkap"
              required
              minlength="2"
              maxlength="100"
            />
          </div>

          <div class="auth-form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="nama@example.com"
              required
            />
          </div>

          <div class="auth-form-group">
            <label for="password">Kata sandi</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Minimal 8 karakter"
              required
              minlength="8"
            />
          </div>

          <button
            type="submit"
            class="auth-submit button"
            :disabled="loading"
          >
            {{ loading ? 'Memproses...' : (isLogin ? 'Masuk' : 'Daftar') }}
          </button>

          <p v-if="error" class="auth-error">{{ error }}</p>
        </form>

        <p class="auth-notice">
          {{ isLogin ? 'Belum punya akun?' : 'Sudah punya akun?' }}
          <button
            type="button"
            class="auth-link"
            @click="toggleMode"
          >
            {{ isLogin ? 'Daftar sekarang' : 'Masuk saja' }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--sky);
}

.auth-card {
  width: 100%;
  max-width: 440px;
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.auth-header {
  padding: 32px 32px 24px;
  background: var(--navy-950);
  color: var(--white);
}

.auth-logo {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.auth-logo strong {
  font-size: 24px;
}

.auth-logo small {
  font-size: 14px;
  opacity: 0.8;
}

.auth-main {
  padding: 32px;
}

.auth-main h1 {
  margin: 0 0 8px;
  font-size: 28px;
  color: var(--navy-950);
}

.auth-description {
  margin: 0 0 24px;
  color: var(--muted);
}

.auth-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  background: var(--blue-100);
  padding: 4px;
  border-radius: 12px;
}

.auth-tab {
  flex: 1;
  padding: 12px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  color: var(--muted);
  transition: all 0.2s;
}

.auth-tab.is-active {
  background: var(--white);
  color: var(--navy-950);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.auth-form label {
  font-size: 14px;
  font-weight: 500;
  color: var(--navy-950);
}

.auth-form input {
  padding: 12px 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.auth-form input:focus {
  outline: none;
  border-color: var(--blue-600);
  box-shadow: 0 0 0 3px rgba(47, 108, 244, 0.1);
}

.auth-submit {
  padding: 14px 24px;
  background: var(--blue-600);
  color: var(--white);
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.auth-submit:hover:not(:disabled) {
  background: var(--blue-500);
}

.auth-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-error {
  margin: 0;
  padding: 12px;
  background: var(--coral-100);
  color: var(--coral-500);
  border-radius: 8px;
  font-size: 14px;
}

.auth-notice {
  margin: 16px 0 0;
  text-align: center;
  font-size: 14px;
  color: var(--muted);
}

.auth-link {
  background: none;
  border: none;
  color: var(--blue-600);
  font-weight: 500;
  cursor: pointer;
  padding: 0;
}

.auth-link:hover {
  text-decoration: underline;
}
</style>
