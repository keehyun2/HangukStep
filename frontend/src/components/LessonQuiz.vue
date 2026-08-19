<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { getGrammarById } from '@/data/grammar/grammar'
import type { LessonQuestion } from '@/data/questions'

const props = defineProps<{
  questions: LessonQuestion[]
  courseId: string
}>()
const questions = computed(() => props.questions)
const courseId = computed(() => props.courseId)

const emit = defineEmits<{
  complete: [score: number]
}>()

const currentIndex = ref(0)
const answers = ref<Record<string, string | string[]>>({})
const checked = ref<Record<string, boolean>>({})
const results = ref<Record<string, boolean>>({})
const isFinished = ref(false)
const isSpeaking = ref(false)

const currentQuestion = computed(() => props.questions[currentIndex.value]!)
const currentAnswer = computed(() => answers.value[currentQuestion.value.id])
const isChecked = computed(() => Boolean(checked.value[currentQuestion.value.id]))
const isCorrect = computed(() => Boolean(results.value[currentQuestion.value.id]))
const correctCount = computed(() => Object.values(results.value).filter(Boolean).length)
const score = computed(() => props.questions.length ? Math.round((correctCount.value / props.questions.length) * 100) : 0)
const answeredCount = computed(() => Object.keys(checked.value).length)
const relatedGrammar = computed(() => (currentQuestion.value.grammarRefs ?? []).flatMap((reference) => {
  const grammar = getGrammarById(reference.grammarId)
  return grammar ? [{ ...reference, title: grammar.title }] : []
}))

function selectOption(value: string) {
  if (isChecked.value) return
  answers.value[currentQuestion.value.id] = value
}

function addToken(token: string) {
  if (isChecked.value) return
  const selected = getSelectedTokens()
  if (!selected.includes(token)) answers.value[currentQuestion.value.id] = [...selected, token]
}

function removeToken(index: number) {
  if (isChecked.value) return
  const selected = [...getSelectedTokens()]
  selected.splice(index, 1)
  answers.value[currentQuestion.value.id] = selected
}

function getSelectedTokens() {
  const answer = answers.value[currentQuestion.value.id]
  return Array.isArray(answer) ? answer : []
}

function hasAnswer(question: LessonQuestion) {
  const answer = answers.value[question.id]
  return Array.isArray(answer) ? answer.length > 0 : Boolean(answer)
}

function checkAnswer() {
  const question = currentQuestion.value
  const answer = answers.value[question.id]
  let correct = false

  if (question.type === 'sentence-builder') {
    correct = Array.isArray(answer) && answer.join('|') === question.correctTokens.join('|')
  } else {
    correct = answer === question.correctAnswer
  }

  results.value[question.id] = correct
  checked.value[question.id] = true
}

function nextQuestion() {
  stopAudio()
  if (currentIndex.value < props.questions.length - 1) {
    currentIndex.value += 1
    return
  }

  isFinished.value = true
  emit('complete', score.value)
}

function retryQuiz() {
  stopAudio()
  currentIndex.value = 0
  answers.value = {}
  checked.value = {}
  results.value = {}
  isFinished.value = false
}

function playAudio(text: string) {
  if (!('speechSynthesis' in window)) return
  stopAudio()
  const utterance = new SpeechSynthesisUtterance(text)
  const koreanVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith('ko'))
  utterance.lang = 'ko-KR'
  utterance.rate = 0.78
  if (koreanVoice) utterance.voice = koreanVoice
  utterance.onstart = () => { isSpeaking.value = true }
  utterance.onend = () => { isSpeaking.value = false }
  utterance.onerror = () => { isSpeaking.value = false }
  window.speechSynthesis.speak(utterance)
}

function stopAudio() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  isSpeaking.value = false
}

onBeforeUnmount(stopAudio)
</script>

<template>
  <div v-if="questions.length && !isFinished" class="quiz-shell">
    <div class="quiz-status">
      <span>SOAL {{ currentIndex + 1 }} / {{ questions.length }}</span>
      <div><i :style="{ width: `${(answeredCount / questions.length) * 100}%` }"></i></div>
    </div>

    <section class="question-panel">
      <div class="question-heading">
        <p>{{ currentQuestion.instruction }}</p>
        <h2>{{ currentQuestion.prompt }}</h2>
      </div>

      <div v-if="currentQuestion.type === 'fill-blank'" class="fill-question">
        <div class="blank-sentence">
          <span>{{ currentQuestion.beforeBlank }}</span>
          <b>{{ currentAnswer || '______' }}</b>
          <span>{{ currentQuestion.afterBlank }}</span>
        </div>
        <div class="option-grid">
          <button
            v-for="option in currentQuestion.options"
            :key="option"
            type="button"
            :class="{ selected: currentAnswer === option }"
            @click="selectOption(option)"
          >{{ option }}</button>
        </div>
      </div>

      <div v-else-if="currentQuestion.type === 'sentence-builder'" class="builder-question">
        <figure>
          <img :src="currentQuestion.imageUrl" :alt="currentQuestion.imageAlt">
          <figcaption v-if="currentQuestion.imageLabel">{{ currentQuestion.imageLabel }}</figcaption>
        </figure>
        <div class="answer-slots" :class="{ empty: !getSelectedTokens().length }">
          <span v-if="!getSelectedTokens().length">Pilih kata dalam urutan yang tepat.</span>
          <button
            v-for="(token, index) in getSelectedTokens()"
            :key="`${token}-${index}`"
            type="button"
            @click="removeToken(index)"
          >{{ token }}</button>
        </div>
        <div class="token-bank">
          <button
            v-for="token in currentQuestion.tokens"
            :key="token"
            type="button"
            :disabled="getSelectedTokens().includes(token)"
            @click="addToken(token)"
          >{{ token }}</button>
        </div>
      </div>

      <div v-else class="audio-question">
        <button class="audio-player" type="button" @click="playAudio(currentQuestion.speechText)">
          {{ isSpeaking ? 'Sedang diputar...' : 'Putar suara' }}
        </button>
        <p>Kamu dapat memutar suara beberapa kali.</p>
        <div class="option-grid">
          <button
            v-for="option in currentQuestion.options"
            :key="option"
            type="button"
            :class="{ selected: currentAnswer === option }"
            @click="selectOption(option)"
          >{{ option }}</button>
        </div>
      </div>

      <div v-if="isChecked" class="answer-feedback" :class="isCorrect ? 'correct' : 'incorrect'">
        <div>
          <strong>{{ isCorrect ? 'Benar!' : 'Belum tepat.' }}</strong>
          <span v-if="currentQuestion.type === 'sentence-builder'">Jawaban: {{ currentQuestion.completedSentence }}</span>
          <span v-else>Jawaban: {{ currentQuestion.correctAnswer }}</span>
          <p v-if="currentQuestion.explanation">{{ currentQuestion.explanation }}</p>
          <RouterLink
            v-for="grammar in relatedGrammar"
            :key="`${grammar.grammarId}-${grammar.sectionId ?? 'all'}`"
            :to="`/grammar#${grammar.sectionId ? `${grammar.grammarId}-${grammar.sectionId}` : grammar.grammarId}`"
          >Lihat tata bahasa {{ grammar.title }}</RouterLink>
        </div>
      </div>

      <div class="quiz-actions">
        <button
          v-if="!isChecked"
          class="check-action"
          type="button"
          :disabled="!hasAnswer(currentQuestion)"
          @click="checkAnswer"
        >Periksa jawaban</button>
        <button v-else class="check-action" type="button" @click="nextQuestion">
          {{ currentIndex === questions.length - 1 ? 'Lihat hasil' : 'Soal berikutnya' }}
        </button>
      </div>
    </section>
  </div>

  <section v-else-if="questions.length" class="quiz-result">
    <p>HASIL LATIHAN</p>
    <strong>{{ score }}</strong>
    <h2>{{ correctCount }} dari {{ questions.length }} jawaban benar</h2>
    <span>{{ score >= 70 ? 'Bagus! Kamu telah menyelesaikan latihan ini.' : 'Pelajari kembali materi lalu coba sekali lagi.' }}</span>
    <div>
      <button type="button" @click="retryQuiz">Ulangi latihan</button>
      <RouterLink :to="`/courses/${courseId}`">Kembali ke kursus</RouterLink>
    </div>
  </section>
  <section v-else class="quiz-result"><h2>Latihan sedang disiapkan.</h2></section>
</template>

<style scoped>
.quiz-shell { width: min(760px, 100%); margin: 0 auto; }
.quiz-status { margin-bottom: 16px; display: flex; align-items: center; gap: 18px; color: var(--muted); font-size: 11px; font-weight: 900; }
.quiz-status > div { flex: 1; height: 5px; border-radius: 3px; background: #e1e7ef; overflow: hidden; }
.quiz-status i { height: 100%; display: block; background: var(--blue-600); transition: width 180ms ease; }
.question-panel { min-height: 560px; padding: 29px; display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: 8px; background: var(--white); }
.question-heading p { margin: 0; color: var(--blue-600); font-size: 12px; font-weight: 900; }
.question-heading h2 { margin: 7px 0 25px; font-size: 22px; }
.fill-question, .audio-question { flex: 1; display: grid; align-content: center; justify-items: center; }
.blank-sentence { margin-bottom: 32px; display: flex; align-items: end; justify-content: center; font-size: 27px; font-weight: 800; }
.blank-sentence b { min-width: 120px; margin: 0 7px; padding: 0 10px 7px; border-bottom: 3px solid var(--blue-600); color: var(--blue-600); text-align: center; }
.option-grid { width: min(560px, 100%); display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; }
.option-grid button, .token-bank button, .answer-slots button { min-height: 46px; padding: 0 14px; border: 1px solid #cad4e1; border-radius: 6px; background: #f8fafc; color: var(--navy-950); font-size: 16px; font-weight: 800; cursor: pointer; }
.option-grid button.selected { border-color: var(--blue-600); background: #eaf0ff; color: var(--blue-600); }
.builder-question { flex: 1; display: grid; grid-template-columns: 230px 1fr; grid-template-rows: auto auto; gap: 16px 22px; }
.builder-question figure { grid-row: 1 / 3; margin: 0; position: relative; align-self: center; }
.builder-question img { width: 100%; aspect-ratio: 4 / 3; display: block; border-radius: 7px; object-fit: cover; }
.builder-question figcaption { position: absolute; left: 10px; right: 10px; bottom: 10px; padding: 8px; border-radius: 5px; background: rgba(16, 38, 63, .9); color: var(--white); font-size: 13px; font-weight: 900; text-align: center; }
.answer-slots { min-height: 106px; padding: 13px; display: flex; align-content: center; align-items: center; flex-wrap: wrap; gap: 7px; border: 2px dashed #9eb4dd; border-radius: 7px; background: #f5f8ff; }
.answer-slots.empty { justify-content: center; color: var(--muted); font-size: 12px; }
.answer-slots button { border-color: var(--blue-600); background: var(--blue-600); color: var(--white); }
.token-bank { align-self: start; display: flex; flex-wrap: wrap; gap: 7px; }
.token-bank button:disabled { cursor: default; opacity: .3; }
.audio-player { width: 130px; height: 70px; border: 0; border-radius: 7px; background: var(--navy-950); color: var(--white); font-weight: 900; cursor: pointer; }
.audio-question > p { margin: 12px 0 28px; color: var(--muted); font-size: 12px; }
.answer-feedback { margin-top: 18px; padding: 13px 15px; border-left: 4px solid; }
.answer-feedback strong, .answer-feedback span { display: block; }
.answer-feedback span { margin-top: 4px; }
.answer-feedback p { margin: 8px 0; line-height: 1.5; }
.answer-feedback a { display: inline-block; margin: 3px 12px 0 0; color: inherit; font-weight: 800; }
.answer-feedback.correct { border-color: #1b8c5a; background: #eaf8f1; color: #146a43; }
.answer-feedback.incorrect { border-color: #b42318; background: #fff0ee; color: #9d241a; }
.quiz-actions { margin-top: auto; padding-top: 18px; }
.check-action { width: 100%; min-height: 48px; border: 0; border-radius: 6px; background: var(--blue-600); color: var(--white); font-weight: 900; cursor: pointer; }
.check-action:disabled { cursor: default; opacity: .35; }
.quiz-result { min-height: 62vh; display: grid; align-content: center; justify-items: center; text-align: center; }
.quiz-result > p { margin: 0; color: var(--blue-600); font-size: 11px; font-weight: 900; }
.quiz-result > strong { margin-top: 10px; font-size: 76px; line-height: 1; }
.quiz-result h2 { margin: 12px 0 7px; }
.quiz-result > span { color: var(--muted); }
.quiz-result > div { margin-top: 24px; display: flex; gap: 10px; }
.quiz-result button, .quiz-result a { min-height: 43px; padding: 0 17px; display: inline-flex; align-items: center; border: 1px solid var(--line); border-radius: 6px; background: var(--white); color: var(--navy-950); font-weight: 800; text-decoration: none; cursor: pointer; }
@media (max-width: 650px) {
  .question-panel { min-height: 590px; padding: 21px 14px; }
  .builder-question { grid-template-columns: 1fr; }
  .builder-question figure { grid-row: auto; width: min(280px, 100%); margin: 0 auto; }
  .option-grid { grid-template-columns: 1fr; }
  .blank-sentence { font-size: 22px; }
}
</style>
