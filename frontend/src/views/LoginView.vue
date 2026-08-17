<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const name = ref('')
const passwordCheck = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')

const router = useRouter()
const authStore = useAuthStore()

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data
    if (data?.error === 'INVALID_CREDENTIALS') return 'Email atau kata sandi salah.'
    if (data?.error === 'EMAIL_EXISTS') return 'Email ini sudah terdaftar.'
    if (typeof data?.message === 'string') return data.message
  }

  return 'Tidak dapat terhubung ke server. Silakan coba lagi.'
}

async function submitLogin() {
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    await authStore.login(email.value.trim(), password.value)
    await router.push('/')
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    isSubmitting.value = false
  }
}

async function submitSignup() {
  errorMessage.value = ''

  if (password.value !== passwordCheck.value) {
    errorMessage.value = 'Konfirmasi kata sandi tidak cocok.'
    return
  }

  isSubmitting.value = true

  try {
    await authStore.signup(email.value.trim(), password.value, name.value.trim())
    await router.push('/')
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    isSubmitting.value = false
  }
}

function selectMode(loginMode: boolean) {
  isLogin.value = loginMode
  errorMessage.value = ''
  password.value = ''
  passwordCheck.value = ''
}
</script>

<template>
  <div class="auth-body">
    <header class="auth-header">
      <RouterLink to="/" class="auth-logo">
        <span class="brand-mark" aria-hidden="true"><i></i><b>HS</b></span>
        <span><strong>Hanguk Step</strong><small>Korean, one step at a time</small></span>
      </RouterLink>
      <RouterLink to="/" class="back-link">Kembali</RouterLink>
    </header>

    <main class="auth-main">
      <section class="auth-card">
        <p class="auth-label">SELAMAT DATANG</p>
        <h1>{{ isLogin ? 'Login' : 'Daftar' }}</h1>
        <p class="auth-description">
          {{ isLogin ? 'Masuk untuk melanjutkan pembelajaranmu.' : 'Buat akun dan mulai perjalanan belajarmu.' }}
        </p>

        <div class="auth-tabs">
          <button class="auth-tab" :class="{ 'is-active': isLogin }" type="button" @click="selectMode(true)">
            Login
          </button>
          <button class="auth-tab" :class="{ 'is-active': !isLogin }" type="button" @click="selectMode(false)">
            Daftar
          </button>
        </div>

        <form v-if="isLogin" class="auth-form" @submit.prevent="submitLogin">
          <label for="loginEmail">Email</label>
          <input id="loginEmail" v-model="email" type="email" autocomplete="email" placeholder="contoh@email.com" required>
          <label for="loginPassword">Kata sandi</label>
          <input id="loginPassword" v-model="password" type="password" autocomplete="current-password" placeholder="Masukkan kata sandi" required>
          <p v-if="errorMessage" class="auth-error" role="alert">{{ errorMessage }}</p>
          <button class="button auth-submit" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Memproses...' : 'Login' }}
          </button>
        </form>

        <form v-else class="auth-form" @submit.prevent="submitSignup">
          <label for="signupName">Nama</label>
          <input id="signupName" v-model="name" type="text" autocomplete="name" placeholder="Masukkan nama" minlength="2" required>
          <label for="signupEmail">Email</label>
          <input id="signupEmail" v-model="email" type="email" autocomplete="email" placeholder="contoh@email.com" required>
          <label for="signupPassword">Kata sandi</label>
          <input id="signupPassword" v-model="password" type="password" autocomplete="new-password" placeholder="Minimal 8 karakter" minlength="8" required>
          <label for="signupPasswordCheck">Konfirmasi kata sandi</label>
          <input id="signupPasswordCheck" v-model="passwordCheck" type="password" autocomplete="new-password" placeholder="Masukkan kembali kata sandi" minlength="8" required>
          <p v-if="errorMessage" class="auth-error" role="alert">{{ errorMessage }}</p>
          <button class="button auth-submit" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Memproses...' : 'Daftar' }}
          </button>
        </form>
      </section>
    </main>
  </div>
</template>

<style scoped>
.auth-error {
  margin: 10px 0 0;
  color: #b42318;
  font-size: 13px;
  font-weight: 700;
}

.auth-submit:disabled {
  cursor: wait;
  opacity: 0.65;
}
</style>
