import { defineStore } from 'pinia'
import type { AuthState, User } from './types'
import { authAPI } from '@/api/auth'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    const token = localStorage.getItem('token')
    return {
      user: null,
      token,
      isAuthenticated: Boolean(token),
    }
  },

  getters: {
    currentUser(): User | null {
      return this.user
    },
  },

  actions: {
    async login(email: string, password: string) {
      const response = await authAPI.login(email, password)
      this.token = response.token
      this.user = response.user
      this.isAuthenticated = true
      localStorage.setItem('token', response.token)
    },

    async signup(email: string, password: string, name: string) {
      const response = await authAPI.signup(email, password, name)
      this.token = response.token
      this.user = response.user
      this.isAuthenticated = true
      localStorage.setItem('token', response.token)
    },

    async logout() {
      try {
        await authAPI.logout()
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.token = null
        this.user = null
        this.isAuthenticated = false
        localStorage.removeItem('token')
      }
    },

    async fetchCurrentUser() {
      const user = await authAPI.getCurrentUser()
      this.user = user
      this.isAuthenticated = true
    },

    clearAuth() {
      this.token = null
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },
  },
})
