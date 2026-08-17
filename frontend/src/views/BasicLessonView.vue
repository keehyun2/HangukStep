<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { grammarItems, lessonOneSentences, lessonOneVocabulary } from '@/data/learning'
import { useWordbookStore } from '@/stores/wordbook'
import { romanizeKorean } from '@/utils/romanizeKorean'
import LessonQuiz from '@/components/LessonQuiz.vue'

const sections = [
  { id: 'vocabulary', label: 'Kosakata', korean: '단어를 배워요' },
  { id: 'sentences', label: 'Kalimat', korean: '문장으로 배워요' },
  { id: 'grammar', label: 'Tata Bahasa', korean: '문법을 배워요' },
  { id: 'practice', label: 'Latihan', korean: '문제를 풀어요' },
]

const router = useRouter()
const wordbook = useWordbookStore()
const currentSection = ref(0)
const speakingKey = ref('')
const highestSection = ref(Number(localStorage.getItem('hangukstep-basic-lesson-1-section') || 0))
const lessonCompleted = ref(localStorage.getItem('hangukstep-basic-lesson-1-complete') === 'true')

const progress = computed(() => lessonCompleted.value ? 100 : Math.round((highestSection.value / sections.length) * 100))

function selectSection(index: number) {
  stopSpeech()
  currentSection.value = index
  if (index > highestSection.value) {
    highestSection.value = index
    localStorage.setItem('hangukstep-basic-lesson-1-section', String(index))
  }
}

function nextSection() {
  if (currentSection.value < sections.length - 1) selectSection(currentSection.value + 1)
}

function speak(key: string, text: string) {
  if (!('speechSynthesis' in window)) return
  if (speakingKey.value === key) {
    stopSpeech()
    return
  }

  stopSpeech()
  const utterance = new SpeechSynthesisUtterance(text)
  const koreanVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith('ko'))
  utterance.lang = 'ko-KR'
  utterance.rate = 0.82
  if (koreanVoice) utterance.voice = koreanVoice
  utterance.onstart = () => { speakingKey.value = key }
  utterance.onend = () => { speakingKey.value = '' }
  utterance.onerror = () => { speakingKey.value = '' }
  window.speechSynthesis.speak(utterance)
}

function stopSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  speakingKey.value = ''
}

function finishLesson(score: number) {
  lessonCompleted.value = true
  highestSection.value = sections.length
  localStorage.setItem('hangukstep-basic-lesson-1-complete', 'true')
  localStorage.setItem('hangukstep-basic-lesson-1-score', String(score))
  localStorage.setItem('hangukstep-basic-lesson-1-section', String(sections.length))
}

onBeforeUnmount(stopSpeech)
</script>

<template>
  <div class="lesson-page">
    <header class="lesson-header">
      <button type="button" @click="router.push('/courses/basic')">Kembali</button>
      <RouterLink to="/">Hanguk Step</RouterLink>
      <span>Belajar Dasar · Pelajaran 1</span>
    </header>

    <div class="lesson-progress">
      <span :style="{ width: `${progress}%` }"></span>
    </div>

    <main class="lesson-layout">
      <aside>
        <p class="eyebrow">PELAJARAN 1</p>
        <h1>인사와 자기소개</h1>
        <p>Salam dan perkenalan diri</p>

        <nav aria-label="Bagian pelajaran">
          <button
            v-for="(section, index) in sections"
            :key="section.id"
            type="button"
            :class="{ active: currentSection === index, visited: highestSection >= index }"
            @click="selectSection(index)"
          >
            <span>{{ index + 1 }}</span>
            <div><strong>{{ section.label }}</strong><small>{{ section.korean }}</small></div>
          </button>
        </nav>
      </aside>

      <section class="lesson-content">
        <div v-if="currentSection === 0">
          <div class="content-heading">
            <div><p class="eyebrow">단어를 배워요</p><h2>Pelajari kosakata</h2></div>
            <span>{{ lessonOneVocabulary.length }} kata</span>
          </div>

          <div class="vocabulary-grid">
            <article v-for="word in lessonOneVocabulary" :key="word.id" class="vocabulary-item">
              <div>
                <h3>{{ word.korean }}</h3>
                <p>{{ romanizeKorean(word.korean) }}</p>
                <strong>{{ word.meaning }}</strong>
              </div>
              <div class="word-actions">
                <button type="button" @click="speak(word.id, word.korean)">
                  {{ speakingKey === word.id ? 'Stop' : 'Dengar' }}
                </button>
                <button
                  type="button"
                  :class="{ saved: wordbook.isSaved(word.id) }"
                  @click="wordbook.toggle(word)"
                >
                  {{ wordbook.isSaved(word.id) ? 'Tersimpan' : 'Simpan' }}
                </button>
              </div>
            </article>
          </div>
          <button class="next-action" type="button" @click="nextSection">Lanjut ke kalimat</button>
        </div>

        <div v-else-if="currentSection === 1">
          <div class="content-heading">
            <div><p class="eyebrow">문장으로 배워요</p><h2>Pelajari dengan kalimat</h2></div>
            <span>{{ lessonOneSentences.length }} kalimat</span>
          </div>

          <div class="sentence-list">
            <article v-for="(sentence, index) in lessonOneSentences" :key="sentence.korean">
              <span>0{{ index + 1 }}</span>
              <div>
                <h3>{{ sentence.korean }}</h3>
                <p class="romanized">{{ romanizeKorean(sentence.korean) }}</p>
                <p>{{ sentence.indonesian }}</p>
              </div>
              <button type="button" @click="speak(`sentence-${index}`, sentence.korean)">
                {{ speakingKey === `sentence-${index}` ? 'Stop' : 'Dengar' }}
              </button>
            </article>
          </div>
          <button class="next-action" type="button" @click="nextSection">Lanjut ke tata bahasa</button>
        </div>

        <div v-else-if="currentSection === 2">
          <div class="content-heading">
            <div><p class="eyebrow">문법을 배워요</p><h2>Pelajari tata bahasa</h2></div>
            <RouterLink to="/grammar">Buka kamus tata bahasa</RouterLink>
          </div>

          <article v-for="grammar in grammarItems" :key="grammar.id" class="grammar-block">
            <p>{{ grammar.summary }}</p>
            <h3>{{ grammar.title }}</h3>
            <div class="grammar-explanation">{{ grammar.explanation }}</div>
            <div class="grammar-examples">
              <div v-for="example in grammar.examples" :key="example.korean">
                <strong>{{ example.korean }}</strong><span>{{ example.indonesian }}</span>
              </div>
            </div>
          </article>
          <button class="next-action" type="button" @click="nextSection">Lanjut ke latihan</button>
        </div>

        <div v-else>
          <LessonQuiz @complete="finishLesson" />
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.lesson-page { min-height: 100vh; background: #f5f7fb; color: var(--navy-950); }
.lesson-header { height: 68px; padding: 0 28px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; border-bottom: 1px solid var(--line); background: var(--white); }
.lesson-header button { justify-self: start; border: 0; background: transparent; color: var(--muted); font-weight: 800; cursor: pointer; }
.lesson-header a { color: inherit; font-size: 20px; font-weight: 900; text-decoration: none; }
.lesson-header > span { justify-self: end; color: var(--blue-600); font-size: 12px; font-weight: 900; }
.lesson-progress { height: 4px; background: #e4e9f0; }
.lesson-progress span { height: 100%; display: block; background: #2f6cf4; transition: width 180ms ease; }
.lesson-layout { min-height: calc(100vh - 72px); display: grid; grid-template-columns: 285px 1fr; }
.lesson-layout > aside { padding: 30px 22px; border-right: 1px solid var(--line); background: var(--white); }
.eyebrow { margin: 0; color: var(--blue-600); font-size: 11px; font-weight: 900; }
.lesson-layout aside h1 { margin: 7px 0 3px; font-size: 23px; }
.lesson-layout aside > p:last-of-type { margin: 0 0 25px; color: var(--muted); font-size: 13px; }
.lesson-layout aside nav { display: grid; gap: 6px; }
.lesson-layout aside nav button { min-height: 55px; padding: 8px 10px; display: grid; grid-template-columns: 30px 1fr; align-items: center; gap: 10px; border: 1px solid transparent; border-radius: 6px; background: transparent; text-align: left; cursor: pointer; }
.lesson-layout aside nav button.active { border-color: #b9caf2; background: #edf3ff; }
.lesson-layout aside nav button > span { width: 27px; height: 27px; display: grid; place-items: center; border-radius: 50%; background: #e9edf2; color: #768293; font-size: 11px; font-weight: 900; }
.lesson-layout aside nav button.visited > span { background: #dfe9ff; color: var(--blue-600); }
.lesson-layout aside nav strong, .lesson-layout aside nav small { display: block; }
.lesson-layout aside nav small { margin-top: 3px; color: var(--muted); }
.lesson-content { padding: 42px; }
.lesson-content > div { width: min(920px, 100%); margin: 0 auto; }
.content-heading { margin-bottom: 24px; display: flex; align-items: end; justify-content: space-between; gap: 20px; }
.content-heading h2 { margin: 5px 0 0; font-size: 30px; }
.content-heading > span, .content-heading > a { color: var(--muted); font-size: 12px; }
.vocabulary-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.vocabulary-item { min-height: 150px; padding: 18px; display: flex; align-items: center; justify-content: space-between; gap: 16px; border: 1px solid var(--line); border-radius: 7px; background: var(--white); }
.vocabulary-item h3 { margin: 0; font-size: 24px; }
.vocabulary-item p { margin: 4px 0 11px; color: var(--muted); font-size: 13px; }
.vocabulary-item strong { color: #b33f35; font-size: 14px; }
.word-actions { display: grid; gap: 7px; }
.word-actions button, .sentence-list button { min-width: 70px; min-height: 34px; border: 1px solid #cbd4df; border-radius: 5px; background: #f8fafc; color: var(--navy-950); font-size: 11px; font-weight: 800; cursor: pointer; }
.word-actions button.saved { border-color: #65ad87; background: #eaf8f1; color: #146a43; }
.next-action { width: 100%; min-height: 49px; margin-top: 22px; border: 0; border-radius: 6px; background: var(--blue-600); color: var(--white); font-weight: 900; cursor: pointer; }
.next-action.complete { background: #1b8c5a; }
.sentence-list { display: grid; gap: 11px; }
.sentence-list article { min-height: 125px; padding: 18px 20px; display: grid; grid-template-columns: 35px 1fr auto; align-items: center; gap: 16px; border: 1px solid var(--line); border-left: 4px solid var(--blue-600); border-radius: 7px; background: var(--white); }
.sentence-list article > span { color: #9aa5b2; font-size: 11px; font-weight: 900; }
.sentence-list h3 { margin: 0; font-size: 20px; }
.sentence-list p { margin: 7px 0 0; color: #4e5c6d; }
.sentence-list .romanized { color: var(--muted); font-size: 13px; }
.grammar-block { margin-bottom: 14px; padding: 25px; border: 1px solid var(--line); border-radius: 7px; background: var(--white); }
.grammar-block > p { margin: 0; color: var(--blue-600); font-size: 12px; font-weight: 800; }
.grammar-block h3 { margin: 8px 0 17px; font-size: 27px; }
.grammar-explanation { padding: 15px; border-left: 3px solid #e2a126; background: #fff9e9; line-height: 1.65; white-space: pre-line; }
.grammar-examples { margin-top: 16px; display: grid; gap: 8px; }
.grammar-examples > div { padding: 11px 13px; display: flex; justify-content: space-between; gap: 20px; background: #f5f7fa; }
.grammar-examples span { color: var(--muted); }
.practice-state { min-height: 65vh; display: grid; align-content: center; justify-items: center; text-align: center; }
.practice-state h2 { margin: 8px 0 10px; font-size: 32px; }
.practice-state > p:not(.eyebrow) { max-width: 630px; margin: 0; color: var(--muted); line-height: 1.65; }
.practice-plan { width: min(600px, 100%); margin: 25px 0 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.practice-plan div { min-height: 105px; display: grid; place-content: center; border: 1px solid var(--line); background: var(--white); }
.practice-plan strong { font-size: 27px; }
.practice-plan span { color: var(--muted); font-size: 12px; }
@media (max-width: 760px) {
  .lesson-header { padding: 0 14px; }
  .lesson-header > span { display: none; }
  .lesson-layout { grid-template-columns: 1fr; }
  .lesson-layout > aside { padding: 20px 15px; border-right: 0; border-bottom: 1px solid var(--line); }
  .lesson-layout aside nav { grid-template-columns: repeat(4, 1fr); }
  .lesson-layout aside nav button { grid-template-columns: 1fr; justify-items: center; text-align: center; }
  .lesson-layout aside nav small { display: none; }
  .lesson-content { padding: 25px 14px; }
  .vocabulary-grid { grid-template-columns: 1fr; }
  .sentence-list article { grid-template-columns: 25px 1fr; }
  .sentence-list button { grid-column: 2; justify-self: start; }
  .grammar-examples > div { flex-direction: column; gap: 5px; }
}
</style>
