<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { curriculum, getWordsForDay } from '@/data/curriculum'
import { romanizeKorean } from '@/utils/romanizeKorean'

const pronunciationOverrides: Record<string, string> = {
  씻다: '씯따',
}

const router = useRouter()
const selectedDay = ref(1)
const currentIndex = ref(0)
const isRevealed = ref(false)
const isSpeaking = ref(false)
const pronunciationError = ref('')
const learned = ref<number[]>(readProgress(1))

const days = curriculum.map((lesson) => lesson.day)
const lesson = computed(() => curriculum.find((item) => item.day === selectedDay.value)!)
const words = computed(() => getWordsForDay(selectedDay.value))
const currentWord = computed(() => words.value[currentIndex.value]!)
const currentRomanization = computed(() => romanizeKorean(currentWord.value.korean))
const progress = computed(() => Math.round((learned.value.length / words.value.length) * 100))
const isCurrentLearned = computed(() => learned.value.includes(currentIndex.value))
const lessonTitle = computed(() => lesson.value.title)

function readProgress(day: number) {
  try {
    const saved = JSON.parse(localStorage.getItem(`hangukstep-day-${day}`) || '[]')
    const wordCount = getWordsForDay(day).length
    return Array.isArray(saved) ? saved.filter((value) => Number.isInteger(value) && value >= 0 && value < wordCount) : []
  } catch {
    return []
  }
}

function isDayComplete(day: number) {
  return readProgress(day).length === getWordsForDay(day).length
}

function selectDay(day: number) {
  stopPronunciation()
  selectedDay.value = day
  currentIndex.value = 0
  isRevealed.value = false
  learned.value = readProgress(day)
}

function selectWord(index: number) {
  stopPronunciation()
  currentIndex.value = index
  isRevealed.value = false
}

function stopPronunciation() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  isSpeaking.value = false
}

function playPronunciation() {
  pronunciationError.value = ''

  if (!('speechSynthesis' in window)) {
    pronunciationError.value = 'Browser ini tidak mendukung pemutaran suara.'
    return
  }

  if (isSpeaking.value) {
    stopPronunciation()
    return
  }

  const speechText = pronunciationOverrides[currentWord.value.korean] ?? currentWord.value.korean
  const utterance = new SpeechSynthesisUtterance(speechText)
  const koreanVoice = window.speechSynthesis
    .getVoices()
    .find((voice) => voice.lang.toLowerCase().startsWith('ko'))

  utterance.lang = 'ko-KR'
  utterance.rate = 0.82
  utterance.pitch = 1
  if (koreanVoice) utterance.voice = koreanVoice
  utterance.onstart = () => { isSpeaking.value = true }
  utterance.onend = () => { isSpeaking.value = false }
  utterance.onerror = () => {
    isSpeaking.value = false
    pronunciationError.value = 'Suara bahasa Korea tidak dapat diputar.'
  }

  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}

function move(offset: number) {
  const nextIndex = currentIndex.value + offset
  if (nextIndex >= 0 && nextIndex < words.value.length) selectWord(nextIndex)
}

function toggleLearned() {
  learned.value = isCurrentLearned.value
    ? learned.value.filter((index) => index !== currentIndex.value)
    : [...learned.value, currentIndex.value].sort((a, b) => a - b)
  localStorage.setItem(`hangukstep-day-${selectedDay.value}`, JSON.stringify(learned.value))

  if (currentIndex.value < words.value.length - 1 && isCurrentLearned.value) {
    setTimeout(() => move(1), 180)
  }
}

onBeforeUnmount(stopPronunciation)
</script>

<template>
  <div class="learn-view">
    <header class="learn-header">
      <button class="back-button" type="button" @click="router.push('/')">Kembali</button>
      <RouterLink class="learn-brand" to="/">Hanguk Step</RouterLink>
      <span class="day-label">DAY {{ selectedDay }}</span>
    </header>

    <main class="learn-layout">
      <aside class="lesson-sidebar">
        <p class="sidebar-label">KURIKULUM</p>
        <h1>{{ lessonTitle }}</h1>
        <p>
          {{ lesson.isReview
            ? `Ulangi ${words.length} kosakata dari pelajaran sebelumnya.`
            : `Pelajari ${words.length} kosakata secara bertahap.` }}
        </p>

        <div class="lesson-progress">
          <div><span>Progres</span><strong>{{ progress }}%</strong></div>
          <div class="progress-track"><span :style="{ width: `${progress}%` }"></span></div>
          <small>{{ learned.length }} dari {{ words.length }} selesai</small>
        </div>

        <div class="day-picker" aria-label="Pilih hari belajar">
          <button
            v-for="day in days"
            :key="day"
            type="button"
            :class="{ active: selectedDay === day, complete: isDayComplete(day) }"
            @click="selectDay(day)"
          >
            {{ day }}
          </button>
        </div>

        <ol class="word-list">
          <li v-for="(word, index) in words" :key="`${selectedDay}-${word.korean}`">
            <button
              type="button"
              :class="{ active: currentIndex === index, done: learned.includes(index) }"
              @click="selectWord(index)"
            >
              <span>{{ index + 1 }}</span>
              <b>{{ word.korean }}</b>
              <i>{{ learned.includes(index) ? 'Selesai' : '' }}</i>
            </button>
          </li>
        </ol>
      </aside>

      <section class="study-area">
        <div v-if="progress === 100" class="completion-banner">
          <strong>Day {{ selectedDay }} selesai!</strong>
          <span>Kamu sudah mempelajari semua kosakata hari ini.</span>
        </div>

        <article class="word-card">
          <div class="card-meta">
            <span>{{ lesson.isReview ? 'REVIEW' : `KOSAKATA ${currentWord.number}` }}</span>
            <span>{{ currentIndex + 1 }} / {{ words.length }}</span>
          </div>

          <div class="word-content">
            <h2>{{ currentWord.korean }}</h2>
            <p class="romanization">{{ currentRomanization }}</p>
            <button
              class="pronunciation-button"
              :class="{ speaking: isSpeaking }"
              type="button"
              :aria-label="`Dengarkan pelafalan ${currentWord.korean}`"
              @click="playPronunciation"
            >
              {{ isSpeaking ? 'Hentikan suara' : 'Dengarkan pelafalan' }}
            </button>
            <small v-if="pronunciationError" class="pronunciation-error" role="alert">
              {{ pronunciationError }}
            </small>

            <button v-if="!isRevealed" class="reveal-button" type="button" @click="isRevealed = true">
              Lihat arti
            </button>

            <div v-else class="meaning-panel">
              <strong>{{ currentWord.meaning }}</strong>
            </div>
          </div>

          <div class="card-actions">
            <button type="button" :disabled="currentIndex === 0" @click="move(-1)">Sebelumnya</button>
            <button class="learned-button" :class="{ selected: isCurrentLearned }" type="button" @click="toggleLearned">
              {{ isCurrentLearned ? 'Sudah dipelajari' : 'Tandai dipelajari' }}
            </button>
            <button type="button" :disabled="currentIndex === words.length - 1" @click="move(1)">Berikutnya</button>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<style scoped>
.learn-view { min-height: 100vh; background: #f5f7fb; color: var(--navy-950); }
.learn-header { height: 68px; padding: 0 28px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; border-bottom: 1px solid var(--line); background: var(--white); }
.learn-brand { color: var(--navy-950); font-size: 20px; font-weight: 900; text-decoration: none; }
.back-button { justify-self: start; border: 0; background: transparent; color: var(--muted); font-weight: 800; cursor: pointer; }
.day-label { justify-self: end; color: var(--blue-600); font-size: 13px; font-weight: 900; }
.learn-layout { min-height: calc(100vh - 68px); display: grid; grid-template-columns: 310px 1fr; }
.lesson-sidebar { padding: 32px 24px; border-right: 1px solid var(--line); background: var(--white); }
.sidebar-label { margin: 0 0 7px; color: var(--blue-600); font-size: 11px; font-weight: 900; }
.lesson-sidebar h1 { margin: 0 0 8px; font-size: 23px; }
.lesson-sidebar > p:not(.sidebar-label) { margin: 0; color: var(--muted); font-size: 14px; line-height: 1.5; }
.lesson-progress { margin: 25px 0; }
.lesson-progress > div:first-child { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; }
.lesson-progress small { display: block; margin-top: 7px; color: var(--muted); }
.day-picker { max-height: 142px; margin-bottom: 20px; padding-right: 5px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; overflow-y: auto; }
.day-picker button { min-height: 32px; border: 1px solid var(--line); border-radius: 5px; background: var(--white); color: var(--muted); font-size: 12px; font-weight: 800; cursor: pointer; }
.day-picker button:hover, .day-picker button.active { border-color: var(--blue-600); background: var(--blue-600); color: var(--white); }
.day-picker button.complete:not(.active) { border-color: #8bc9ac; background: #e9f8f0; color: #12633f; }
.word-list { max-height: 390px; margin: 0; padding: 0 5px 0 0; display: grid; gap: 5px; overflow-y: auto; list-style: none; }
.word-list button { width: 100%; min-height: 45px; padding: 7px 9px; display: grid; grid-template-columns: 28px 1fr auto; align-items: center; gap: 8px; border: 1px solid transparent; border-radius: 6px; background: transparent; text-align: left; cursor: pointer; }
.word-list button:hover, .word-list button.active { border-color: #bfd0fa; background: #eef3ff; }
.word-list button > span { width: 25px; height: 25px; display: grid; place-items: center; border-radius: 50%; background: #e9edf5; font-size: 11px; font-weight: 800; }
.word-list button.done > span { background: #d8f3e5; color: #16734a; }
.word-list b { font-size: 14px; }
.word-list i { color: #16734a; font-size: 10px; font-style: normal; }
.study-area { padding: 44px; display: grid; align-content: center; justify-items: center; gap: 15px; }
.completion-banner { width: min(680px, 100%); padding: 13px 18px; display: flex; justify-content: space-between; gap: 16px; border-left: 4px solid #1b8c5a; background: #e9f8f0; color: #12633f; }
.word-card { width: min(680px, 100%); min-height: 460px; padding: 27px; display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: 8px; background: var(--white); box-shadow: 0 18px 45px rgba(16, 38, 63, 0.1); }
.card-meta { display: flex; justify-content: space-between; color: var(--muted); font-size: 11px; font-weight: 900; }
.word-content { flex: 1; display: grid; align-content: center; justify-items: center; text-align: center; }
.word-content h2 { margin: 0; font-size: 58px; }
.romanization { margin: 8px 0 0; color: var(--muted); font-size: 18px; font-weight: 700; }
.pronunciation-button { min-height: 38px; margin: 14px 0 22px; padding: 0 16px; border: 1px solid #c6d2e3; border-radius: 6px; background: #f7f9fc; color: var(--navy-950); font-size: 13px; font-weight: 800; cursor: pointer; }
.pronunciation-button:hover, .pronunciation-button.speaking { border-color: #d94f45; background: #fff2f0; color: #b8342b; }
.pronunciation-error { margin: -13px 0 16px; color: #b42318; font-size: 12px; }
.reveal-button { min-height: 42px; padding: 0 22px; border: 1px solid var(--blue-600); border-radius: 6px; background: transparent; color: var(--blue-600); font-weight: 800; cursor: pointer; }
.meaning-panel strong { color: #d94f45; font-size: 27px; }
.meaning-panel p { margin: 22px 0 4px; font-size: 18px; }
.meaning-panel small { color: var(--muted); font-size: 14px; }
.card-actions { display: grid; grid-template-columns: 1fr 1.4fr 1fr; gap: 10px; }
.card-actions button { min-height: 46px; border: 1px solid var(--line); border-radius: 6px; background: var(--white); color: var(--navy-950); font-weight: 800; cursor: pointer; }
.card-actions button:disabled { cursor: default; opacity: 0.35; }
.card-actions .learned-button { border-color: var(--blue-600); background: var(--blue-600); color: var(--white); }
.card-actions .learned-button.selected { border-color: #1b8c5a; background: #1b8c5a; }
@media (max-width: 760px) {
  .learn-header { padding: 0 16px; }
  .learn-layout { grid-template-columns: 1fr; }
  .lesson-sidebar { padding: 22px 18px; border-right: 0; border-bottom: 1px solid var(--line); }
  .word-list { grid-template-columns: repeat(5, 1fr); }
  .word-list button { min-height: 38px; grid-template-columns: 1fr; padding: 5px; text-align: center; }
  .word-list button > span { margin: auto; }
  .word-list b, .word-list i { display: none; }
  .study-area { padding: 24px 14px; align-content: start; }
  .word-card { min-height: 430px; padding: 20px 14px; }
  .word-content h2 { font-size: 43px; }
  .card-actions { grid-template-columns: 1fr 1fr; }
  .card-actions .learned-button { grid-column: 1 / -1; grid-row: 1; }
  .completion-banner { flex-direction: column; }
}
</style>
