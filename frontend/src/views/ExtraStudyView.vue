<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { extraStudyLessons } from '@/data/extraStudy'
import { getWordsForDay } from '@/data/curriculum'
import { romanizeKorean } from '@/utils/romanizeKorean'

const router = useRouter()
const selectedDay = ref(extraStudyLessons[0]!.day)
const speakingLine = ref<number | null>(null)
const completedDays = ref(readCompletedDays())

const lesson = computed(() => (
  extraStudyLessons.find((item) => item.day === selectedDay.value) ?? extraStudyLessons[0]!
))
const isSelectedUnlocked = computed(() => isUnlocked(selectedDay.value))
const isSelectedCompleted = computed(() => completedDays.value.includes(selectedDay.value))

function readMainProgress(day: number) {
  try {
    const progress = JSON.parse(localStorage.getItem(`hangukstep-day-${day}`) || '[]')
    return Array.isArray(progress) ? progress.length : 0
  } catch {
    return 0
  }
}

function readCompletedDays() {
  try {
    const saved = JSON.parse(localStorage.getItem('hangukstep-extra-completed') || '[]')
    return Array.isArray(saved) ? saved.filter(Number.isInteger) : []
  } catch {
    return []
  }
}

function isUnlocked(day: number) {
  const wordCount = getWordsForDay(day).length
  return wordCount > 0 && readMainProgress(day) >= wordCount
}

function selectDay(day: number) {
  stopSpeech()
  selectedDay.value = day
}

function playLine(index: number, korean: string) {
  if (!('speechSynthesis' in window)) return

  if (speakingLine.value === index) {
    stopSpeech()
    return
  }

  stopSpeech()
  const utterance = new SpeechSynthesisUtterance(korean)
  const koreanVoice = window.speechSynthesis
    .getVoices()
    .find((voice) => voice.lang.toLowerCase().startsWith('ko'))

  utterance.lang = 'ko-KR'
  utterance.rate = 0.82
  if (koreanVoice) utterance.voice = koreanVoice
  utterance.onstart = () => { speakingLine.value = index }
  utterance.onend = () => { speakingLine.value = null }
  utterance.onerror = () => { speakingLine.value = null }
  window.speechSynthesis.speak(utterance)
}

function stopSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  speakingLine.value = null
}

function toggleCompleted() {
  completedDays.value = isSelectedCompleted.value
    ? completedDays.value.filter((day) => day !== selectedDay.value)
    : [...completedDays.value, selectedDay.value].sort((a, b) => a - b)
  localStorage.setItem('hangukstep-extra-completed', JSON.stringify(completedDays.value))
}

onBeforeUnmount(stopSpeech)
</script>

<template>
  <div class="extra-study-view">
    <header class="extra-header">
      <button type="button" @click="router.push('/')">Kembali</button>
      <RouterLink to="/">Hanguk Step</RouterLink>
      <span>Belajar Tambahan</span>
    </header>

    <main class="extra-layout">
      <aside class="extra-sidebar">
        <p class="section-label">LATIHAN TAMBAHAN</p>
        <h1>Dialog Harian</h1>
        <p>Selesaikan kosakata utama untuk membuka dialog pada Day yang sama.</p>

        <div class="extra-days">
          <button
            v-for="item in extraStudyLessons"
            :key="item.day"
            type="button"
            :class="{
              active: selectedDay === item.day,
              locked: !isUnlocked(item.day),
              complete: completedDays.includes(item.day),
            }"
            @click="selectDay(item.day)"
          >
            <span>Day {{ item.day }}</span>
            <small>
              {{ !isUnlocked(item.day) ? 'Terkunci' : completedDays.includes(item.day) ? 'Selesai' : item.title }}
            </small>
          </button>
        </div>
      </aside>

      <section class="extra-content">
        <div v-if="!isSelectedUnlocked" class="locked-state">
          <span aria-hidden="true">DAY {{ selectedDay }}</span>
          <h2>Selesaikan Day {{ selectedDay }} terlebih dahulu</h2>
          <p>Pelajari dan tandai semua kosakata Day {{ selectedDay }} sebelum membuka dialog tambahan.</p>
          <button class="primary-action" type="button" @click="router.push('/learn')">
            Buka pelajaran utama
          </button>
        </div>

        <div v-else class="dialogue-study">
          <div class="dialogue-heading">
            <div>
              <p class="section-label">DAY {{ lesson.day }} · {{ lesson.title }}</p>
              <h2>{{ lesson.conversationTitle }}</h2>
            </div>
            <span>{{ lesson.dialogue.length }} kalimat</span>
          </div>

          <div class="dialogue-lines">
            <article
              v-for="(line, index) in lesson.dialogue"
              :key="`${lesson.day}-${index}`"
              class="dialogue-line"
              :class="line.speaker === 'B' ? 'speaker-b' : 'speaker-a'"
            >
              <span class="speaker">{{ line.speaker }}</span>
              <div>
                <p class="korean-line">{{ line.korean }}</p>
                <p class="romanized-line">{{ romanizeKorean(line.korean) }}</p>
                <p class="indonesian-line">{{ line.indonesian }}</p>
              </div>
              <button
                class="speak-button"
                type="button"
                :aria-label="`Dengarkan kalimat ${index + 1}`"
                @click="playLine(index, line.korean)"
              >
                {{ speakingLine === index ? 'Stop' : 'Dengar' }}
              </button>
            </article>
          </div>

          <section v-if="lesson.notes.length" class="lesson-notes">
            <p class="section-label">CATATAN</p>
            <ul>
              <li v-for="note in lesson.notes" :key="note">{{ note }}</li>
            </ul>
          </section>

          <button
            class="complete-action"
            :class="{ completed: isSelectedCompleted }"
            type="button"
            @click="toggleCompleted"
          >
            {{ isSelectedCompleted ? 'Latihan selesai' : 'Tandai latihan selesai' }}
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.extra-study-view { min-height: 100vh; background: #f5f7fb; color: var(--navy-950); }
.extra-header { height: 68px; padding: 0 28px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; border-bottom: 1px solid var(--line); background: var(--white); }
.extra-header button { justify-self: start; border: 0; background: transparent; color: var(--muted); font-weight: 800; cursor: pointer; }
.extra-header a { color: var(--navy-950); font-size: 20px; font-weight: 900; text-decoration: none; }
.extra-header > span { justify-self: end; color: #b8342b; font-size: 13px; font-weight: 900; }
.extra-layout { min-height: calc(100vh - 68px); display: grid; grid-template-columns: 320px 1fr; }
.extra-sidebar { padding: 30px 22px; border-right: 1px solid var(--line); background: var(--white); }
.section-label { margin: 0 0 7px; color: var(--blue-600); font-size: 11px; font-weight: 900; }
.extra-sidebar h1 { margin: 0 0 8px; font-size: 25px; }
.extra-sidebar > p:last-of-type { margin: 0 0 24px; color: var(--muted); font-size: 13px; line-height: 1.55; }
.extra-days { max-height: calc(100vh - 230px); padding-right: 5px; display: grid; gap: 6px; overflow-y: auto; }
.extra-days button { min-height: 49px; padding: 7px 10px; display: grid; grid-template-columns: 62px 1fr; align-items: center; border: 1px solid transparent; border-radius: 6px; background: transparent; text-align: left; cursor: pointer; }
.extra-days button:hover, .extra-days button.active { border-color: #bfd0fa; background: #eef3ff; }
.extra-days button.locked { color: #98a1ae; }
.extra-days button.complete:not(.active) { border-color: #a8d8bf; background: #ecf8f2; }
.extra-days span { font-weight: 900; }
.extra-days small { overflow: hidden; color: var(--muted); text-overflow: ellipsis; white-space: nowrap; }
.extra-content { padding: 42px; }
.locked-state { min-height: 65vh; display: grid; place-content: center; justify-items: center; text-align: center; }
.locked-state > span { color: #98a1ae; font-size: 13px; font-weight: 900; }
.locked-state h2 { margin: 10px 0 8px; font-size: 29px; }
.locked-state p { max-width: 480px; margin: 0 0 22px; color: var(--muted); line-height: 1.6; }
.primary-action, .complete-action { min-height: 46px; padding: 0 22px; border: 0; border-radius: 6px; background: var(--blue-600); color: var(--white); font-weight: 900; cursor: pointer; }
.dialogue-study { width: min(850px, 100%); margin: 0 auto; }
.dialogue-heading { margin-bottom: 24px; display: flex; align-items: end; justify-content: space-between; gap: 20px; }
.dialogue-heading h2 { margin: 0; font-size: 31px; }
.dialogue-heading > span { color: var(--muted); font-size: 13px; }
.dialogue-lines { display: grid; gap: 11px; }
.dialogue-line { padding: 18px; display: grid; grid-template-columns: 34px 1fr auto; gap: 14px; border: 1px solid var(--line); border-left: 4px solid var(--blue-600); border-radius: 7px; background: var(--white); }
.dialogue-line.speaker-b { border-left-color: #d94f45; }
.speaker { width: 30px; height: 30px; display: grid; place-items: center; border-radius: 50%; background: #e8efff; color: var(--blue-600); font-weight: 900; }
.speaker-b .speaker { background: #fff0ee; color: #b8342b; }
.korean-line { margin: 0; font-size: 18px; font-weight: 800; }
.romanized-line { margin: 4px 0; color: var(--muted); font-size: 13px; }
.indonesian-line { margin: 8px 0 0; color: #465467; line-height: 1.5; }
.speak-button { align-self: center; min-width: 62px; min-height: 36px; border: 1px solid #c6d2e3; border-radius: 5px; background: #f7f9fc; color: var(--navy-950); font-size: 12px; font-weight: 800; cursor: pointer; }
.lesson-notes { margin-top: 22px; padding: 20px; border-left: 4px solid #e0a329; background: #fff9e9; }
.lesson-notes ul { margin: 8px 0 0; padding-left: 20px; }
.lesson-notes li { margin: 7px 0; line-height: 1.55; }
.complete-action { width: 100%; margin-top: 22px; }
.complete-action.completed { background: #1b8c5a; }
@media (max-width: 760px) {
  .extra-header { padding: 0 15px; }
  .extra-layout { grid-template-columns: 1fr; }
  .extra-sidebar { padding: 20px 16px; border-right: 0; border-bottom: 1px solid var(--line); }
  .extra-days { max-height: 185px; grid-template-columns: repeat(2, 1fr); }
  .extra-content { padding: 25px 14px; }
  .dialogue-heading { align-items: start; flex-direction: column; }
  .dialogue-line { grid-template-columns: 30px 1fr; padding: 15px 12px; }
  .speak-button { grid-column: 2; justify-self: start; }
}
</style>
