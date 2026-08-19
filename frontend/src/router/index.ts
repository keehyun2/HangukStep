import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import CourseView from '@/views/CourseView.vue'
import LessonView from '@/views/LessonView.vue'
import GrammarView from '@/views/GrammarView.vue'
import WordbookView from '@/views/WordbookView.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (_to.hash) return { el: _to.hash, top: 20, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/courses/:courseId',
      name: 'course',
      component: CourseView,
    },
    {
      path: '/courses/:courseId/lessons/:lessonNumber',
      name: 'lesson',
      component: LessonView,
      meta: { requiresAuth: true },
    },
    {
      path: '/grammar',
      name: 'grammar',
      component: GrammarView,
    },
    {
      path: '/wordbook',
      name: 'wordbook',
      component: WordbookView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

// Navigation guard for protected routes
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
