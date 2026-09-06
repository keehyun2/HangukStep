<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { vocabularyTopics, vocabularyWordCount } from '@/data/vocabulary'
import { useWordbookStore } from '@/stores/wordbook'
import { romanizeKorean } from '@/utils/romanizeKorean'

type StudySection = 'words' | 'expressions' | 'quiz'

const router = useRouter()
const wordbook = useWordbookStore()
const selectedTopicId = ref(vocabularyTopics[0]?.id ?? '')
const activeSection = ref<StudySection>('words')
const query = ref('')
const wordIndex = ref(0)
const questionIndex = ref(0)
const selectedAnswer = ref<number | null>(null)
const answerChecked = ref(false)
const hintOpen = ref(false)
const quizFinished = ref(false)
const correctAnswers = ref(0)
const speakingId = ref('')

const selectedTopic = computed(() => vocabularyTopics.find((topic) => topic.id === selectedTopicId.value) ?? vocabularyTopics[0])
const visibleWords = computed(() => {
  const search = query.value.trim().toLowerCase()
  if (!search) return selectedTopic.value?.words ?? []
  return vocabularyTopics
    .flatMap((topic) => topic.words)
    .filter((word) => `${word.korean} ${word.pronunciation} ${word.meaning}`.toLowerCase().includes(search))
})
const currentWord = computed(() => visibleWords.value[wordIndex.value])
const currentQuestion = computed(() => selectedTopic.value?.questions[questionIndex.value])
const isCorrect = computed(() => selectedAnswer.value === currentQuestion.value?.correctIndex)

function resetQuiz() {
  questionIndex.value = 0
  selectedAnswer.value = null
  answerChecked.value = false
  hintOpen.value = false
  quizFinished.value = false
  correctAnswers.value = 0
}

function selectTopic(topicId: string) {
  selectedTopicId.value = topicId
  activeSection.value = 'words'
  query.value = ''
  wordIndex.value = 0
  resetQuiz()
  stopSpeech()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function selectSection(section: StudySection) {
  activeSection.value = section
  stopSpeech()
}

function moveWord(amount: number) {
  const next = wordIndex.value + amount
  if (next >= 0 && next < visibleWords.value.length) wordIndex.value = next
  stopSpeech()
}

function checkAnswer() {
  if (selectedAnswer.value === null) return
  answerChecked.value = true
  if (isCorrect.value) correctAnswers.value += 1
}

function nextQuestion() {
  if (!selectedTopic.value) return
  if (questionIndex.value >= selectedTopic.value.questions.length - 1) {
    quizFinished.value = true
    return
  }
  questionIndex.value += 1
  selectedAnswer.value = null
  answerChecked.value = false
  hintOpen.value = false
}

function speak(id: string, korean: string) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(korean)
  const koreanVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith('ko'))
  utterance.lang = 'ko-KR'
  utterance.rate = 0.82
  if (koreanVoice) utterance.voice = koreanVoice
  utterance.onstart = () => { speakingId.value = id }
  utterance.onend = () => { speakingId.value = '' }
  utterance.onerror = () => { speakingId.value = '' }
  window.speechSynthesis.speak(utterance)
}

function stopSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  speakingId.value = ''
}

watch(query, () => { wordIndex.value = 0 })
onBeforeUnmount(stopSpeech)
</script>

<template>
  <div class="vocabulary-page">
    <header>
      <button type="button" @click="router.push('/')">Kembali</button>
      <RouterLink to="/">Hanguk Step</RouterLink>
      <RouterLink to="/wordbook">Kosakata Saya</RouterLink>
    </header>

    <main>
      <section class="page-heading">
        <div><p>KAMUS KOSAKATA</p><h1>Kosakata</h1><span>{{ vocabularyWordCount }} kata dalam {{ vocabularyTopics.length }} tema</span></div>
        <input v-model="query" type="search" placeholder="Cari kata Korea, pelafalan, atau arti..." @focus="activeSection = 'words'">
      </section>

      <div class="study-layout">
        <aside>
          <label for="topic-select">Pilih tema</label>
          <select id="topic-select" :value="selectedTopicId" @change="selectTopic(($event.target as HTMLSelectElement).value)">
            <option v-for="topic in vocabularyTopics" :key="topic.id" :value="topic.id">{{ topic.lessonNumber }}. {{ topic.titleIndonesian }}</option>
          </select>
          <nav aria-label="Tema kosakata">
            <button v-for="topic in vocabularyTopics" :key="topic.id" type="button" :class="{ active: selectedTopicId === topic.id }" @click="selectTopic(topic.id)">
              <span>{{ String(topic.lessonNumber).padStart(2, '0') }}</span>
              <div><strong>{{ topic.titleIndonesian }}</strong><small>{{ topic.titleKorean }} · {{ topic.words.length }} kata</small></div>
            </button>
          </nav>
        </aside>

        <section v-if="selectedTopic" class="study-area">
          <div class="topic-heading">
            <div><p>TEMA {{ selectedTopic.lessonNumber }}</p><h2>{{ selectedTopic.titleIndonesian }}</h2><span>{{ selectedTopic.titleKorean }}</span></div>
            <strong>{{ selectedTopic.words.length }} kata</strong>
          </div>

          <div class="section-tabs" role="tablist" aria-label="Bagian belajar">
            <button type="button" :class="{ active: activeSection === 'words' }" @click="selectSection('words')">Kosakata</button>
            <button type="button" :class="{ active: activeSection === 'expressions' }" @click="selectSection('expressions')">Ungkapan</button>
            <button type="button" :class="{ active: activeSection === 'quiz' }" @click="selectSection('quiz')">Latihan</button>
          </div>

          <div v-if="activeSection === 'words'" class="word-study">
            <div v-if="currentWord" class="study-progress">
              <span>{{ wordIndex + 1 }} / {{ visibleWords.length }}</span>
              <div><i :style="{ width: `${((wordIndex + 1) / visibleWords.length) * 100}%` }"></i></div>
            </div>
            <article v-if="currentWord" class="word-card">
              <span>{{ query ? 'HASIL PENCARIAN' : selectedTopic.titleIndonesian.toUpperCase() }}</span>
              <h3>{{ currentWord.korean }}</h3>
              <p>{{ currentWord.pronunciation }}</p>
              <strong>{{ currentWord.meaning }}</strong>
              <div class="card-actions">
                <button type="button" @click="speak(currentWord.id, currentWord.korean)">{{ speakingId === currentWord.id ? 'Stop' : 'Dengar' }}</button>
                <button type="button" :class="{ saved: wordbook.isSaved(currentWord.id) }" @click="wordbook.toggle(currentWord)">
                  {{ wordbook.isSaved(currentWord.id) ? 'Tersimpan' : 'Simpan' }}
                </button>
              </div>
            </article>
            <p v-else class="empty-result">Kosakata tidak ditemukan.</p>
            <div v-if="currentWord" class="step-actions">
              <button type="button" :disabled="wordIndex === 0" aria-label="Kata sebelumnya" @click="moveWord(-1)">← Sebelumnya</button>
              <button type="button" :disabled="wordIndex === visibleWords.length - 1" aria-label="Kata berikutnya" @click="moveWord(1)">Berikutnya →</button>
            </div>
          </div>

          <div v-else-if="activeSection === 'expressions'" class="expression-study">
            <div class="content-heading"><p>UNGKAPAN YANG SERING DIGUNAKAN</p><h3>자주 쓰는 표현</h3></div>
            <article v-for="expression in selectedTopic.expressions" :key="expression.id">
              <div><h4>{{ expression.korean }}</h4><p>{{ expression.pronunciation || romanizeKorean(expression.korean) }}</p><strong>{{ expression.meaning }}</strong></div>
              <button type="button" @click="speak(expression.id, expression.korean)">{{ speakingId === expression.id ? 'Stop' : 'Dengar' }}</button>
            </article>
          </div>

          <div v-else class="quiz-study">
            <section v-if="!quizFinished && currentQuestion" class="question-card">
              <div class="study-progress"><span>SOAL {{ questionIndex + 1 }} / {{ selectedTopic.questions.length }}</span><div><i :style="{ width: `${((questionIndex + 1) / selectedTopic.questions.length) * 100}%` }"></i></div></div>
              <h3>{{ currentQuestion.prompt }}</h3>
              <button class="hint-button" type="button" @click="hintOpen = !hintOpen">{{ hintOpen ? 'Tutup Hint' : 'Hint' }}</button>
              <p v-if="hintOpen" class="hint-text">{{ currentQuestion.hint }}</p>
              <div class="option-list">
                <button v-for="(option, index) in currentQuestion.options" :key="option" type="button" :disabled="answerChecked" :class="{ selected: selectedAnswer === index, correct: answerChecked && index === currentQuestion.correctIndex, wrong: answerChecked && selectedAnswer === index && index !== currentQuestion.correctIndex }" @click="selectedAnswer = index">
                  <span>{{ ['①', '②', '③', '④'][index] }}</span>{{ option }}
                </button>
              </div>
              <div v-if="answerChecked" class="answer-result" :class="isCorrect ? 'correct' : 'wrong'">
                <strong>{{ isCorrect ? 'Benar!' : 'Belum tepat.' }}</strong>
                <span>Jawaban: {{ currentQuestion.options[currentQuestion.correctIndex] }}</span>
              </div>
              <button v-if="!answerChecked" class="primary-action" type="button" :disabled="selectedAnswer === null" @click="checkAnswer">Periksa jawaban</button>
              <button v-else class="primary-action" type="button" @click="nextQuestion">{{ questionIndex === selectedTopic.questions.length - 1 ? 'Lihat hasil' : 'Soal berikutnya' }}</button>
            </section>
            <section v-else class="quiz-result">
              <p>HASIL LATIHAN</p><strong>{{ correctAnswers }} / {{ selectedTopic.questions.length }}</strong>
              <h3>{{ correctAnswers >= 4 ? 'Bagus sekali!' : 'Mari pelajari lagi.' }}</h3>
              <button type="button" @click="resetQuiz">Ulangi latihan</button>
            </section>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
.vocabulary-page { min-height: 100vh; background: #f6f8fb; color: var(--navy-950); }
.vocabulary-page > header { height: 68px; padding: 0 5vw; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; border-bottom: 1px solid var(--line); background: var(--white); }
.vocabulary-page > header button { justify-self: start; border: 0; background: transparent; color: var(--muted); font-weight: 800; cursor: pointer; }
.vocabulary-page > header a { color: inherit; font-weight: 900; text-decoration: none; }
.vocabulary-page > header > a:first-of-type { font-size: 20px; }
.vocabulary-page > header > a:last-child { justify-self: end; color: var(--blue-600); font-size: 12px; }
.vocabulary-page main { width: min(1180px, 92vw); margin: 0 auto; padding: 38px 0 60px; }
.page-heading { display: grid; grid-template-columns: 1fr minmax(300px, 440px); align-items: end; gap: 30px; }
.page-heading p, .topic-heading p, .content-heading p, .quiz-result p { margin: 0; color: var(--blue-600); font-size: 11px; font-weight: 900; }
.page-heading h1 { margin: 5px 0 6px; font-size: 38px; }
.page-heading span, .topic-heading span { color: var(--muted); }
.page-heading input { min-height: 48px; padding: 0 15px; border: 1px solid var(--line); border-radius: 6px; background: var(--white); outline: none; }
.page-heading input:focus { border-color: var(--blue-600); box-shadow: 0 0 0 3px rgba(47,108,244,.1); }
.study-layout { margin-top: 24px; display: grid; grid-template-columns: 250px 1fr; gap: 24px; align-items: start; }
.study-layout > aside { position: sticky; top: 15px; max-height: calc(100vh - 30px); overflow: auto; border: 1px solid var(--line); background: var(--white); }
.study-layout aside label, .study-layout aside select { display: none; }
.study-layout nav { display: grid; }
.study-layout nav button { min-height: 58px; padding: 9px 12px; display: grid; grid-template-columns: 34px 1fr; align-items: center; gap: 8px; border: 0; border-bottom: 1px solid var(--line); background: transparent; color: inherit; text-align: left; cursor: pointer; }
.study-layout nav button.active { background: #edf3ff; box-shadow: inset 3px 0 var(--blue-600); }
.study-layout nav button > span { color: #8a96a5; font-size: 10px; font-weight: 900; }
.study-layout nav strong, .study-layout nav small { display: block; }
.study-layout nav strong { font-size: 13px; }.study-layout nav small { margin-top: 3px; color: var(--muted); font-size: 10px; }
.study-area { min-width: 0; }
.topic-heading { min-height: 70px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.topic-heading h2 { margin: 4px 0 2px; font-size: 29px; }.topic-heading > strong { color: #b33f35; font-size: 13px; }
.section-tabs { height: 48px; margin: 8px 0 20px; padding: 4px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; background: #e8edf5; border-radius: 7px; }
.section-tabs button { border: 0; border-radius: 5px; background: transparent; color: var(--muted); font-weight: 800; cursor: pointer; }
.section-tabs button.active { background: var(--white); color: var(--blue-600); box-shadow: 0 1px 4px rgba(17, 37, 61, .1); }
.study-progress { margin-bottom: 16px; display: flex; align-items: center; gap: 15px; color: var(--muted); font-size: 11px; font-weight: 900; }
.study-progress > div { flex: 1; height: 5px; overflow: hidden; background: #dfe5ed; }.study-progress i { height: 100%; display: block; background: var(--blue-600); }
.word-card { min-height: 360px; padding: 40px; display: grid; place-content: center; justify-items: center; border: 1px solid var(--line); border-radius: 8px; background: var(--white); text-align: center; }
.word-card > span { color: var(--blue-600); font-size: 10px; font-weight: 900; }.word-card h3 { margin: 12px 0 4px; font-size: 52px; }.word-card > p { margin: 0 0 15px; color: var(--muted); font-size: 16px; }.word-card > strong { color: #b33f35; font-size: 20px; }
.card-actions { margin-top: 30px; display: flex; gap: 8px; }.card-actions button, .expression-study article > button { min-height: 39px; padding: 0 16px; border: 1px solid #cad4e1; border-radius: 5px; background: #f8fafc; font-weight: 800; cursor: pointer; }.card-actions button.saved { border-color: #65ad87; background: #eaf8f1; color: #146a43; }
.step-actions { margin-top: 12px; display: flex; justify-content: space-between; gap: 10px; }.step-actions button { min-height: 44px; padding: 0 18px; border: 1px solid var(--line); border-radius: 6px; background: var(--white); font-weight: 800; cursor: pointer; }.step-actions button:disabled { opacity: .35; cursor: default; }
.content-heading { margin-bottom: 15px; }.content-heading h3 { margin: 5px 0 0; font-size: 26px; }
.expression-study article { min-height: 125px; margin-bottom: 10px; padding: 20px; display: flex; align-items: center; justify-content: space-between; gap: 18px; border: 1px solid var(--line); border-left: 4px solid var(--blue-600); background: var(--white); }
.expression-study h4 { margin: 0; font-size: 22px; }.expression-study article p { margin: 5px 0 8px; color: var(--muted); font-size: 13px; }.expression-study article strong { color: #b33f35; font-size: 14px; }
.question-card { min-height: 570px; padding: 28px; display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: 8px; background: var(--white); }.question-card > h3 { margin: 22px 0 14px; font-size: 24px; line-height: 1.5; }
.hint-button { width: max-content; min-height: 34px; padding: 0 13px; border: 1px solid #d6b15f; border-radius: 5px; background: #fff9e9; color: #76520d; font-weight: 800; cursor: pointer; }.hint-text { margin: 10px 0 4px; padding: 12px; background: #fff9e9; color: #66501e; line-height: 1.55; }
.option-list { margin-top: 20px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; }.option-list button { min-height: 54px; padding: 10px 14px; display: flex; align-items: center; gap: 10px; border: 1px solid #cad4e1; border-radius: 6px; background: #f8fafc; color: inherit; font-size: 16px; font-weight: 800; text-align: left; cursor: pointer; }.option-list button > span { color: var(--muted); }.option-list button.selected { border-color: var(--blue-600); background: #edf3ff; }.option-list button.correct { border-color: #1b8c5a; background: #eaf8f1; }.option-list button.wrong { border-color: #b42318; background: #fff0ee; }
.answer-result { margin-top: 15px; padding: 12px 14px; display: flex; justify-content: space-between; gap: 12px; border-left: 4px solid; }.answer-result.correct { border-color: #1b8c5a; background: #eaf8f1; color: #146a43; }.answer-result.wrong { border-color: #b42318; background: #fff0ee; color: #9d241a; }
.primary-action { width: 100%; min-height: 48px; margin-top: auto; border: 0; border-radius: 6px; background: var(--blue-600); color: var(--white); font-weight: 900; cursor: pointer; }.primary-action:disabled { opacity: .35; cursor: default; }
.quiz-result { min-height: 470px; display: grid; place-content: center; justify-items: center; border: 1px solid var(--line); background: var(--white); text-align: center; }.quiz-result > strong { margin: 12px 0; font-size: 58px; }.quiz-result h3 { margin: 0 0 22px; }.quiz-result button { min-height: 43px; padding: 0 18px; border: 0; border-radius: 6px; background: var(--blue-600); color: var(--white); font-weight: 800; cursor: pointer; }
.empty-result { min-height: 320px; display: grid; place-items: center; border: 1px solid var(--line); background: var(--white); color: var(--muted); }
@media (max-width: 800px) { .vocabulary-page main { width: min(94vw, 680px); padding-top: 26px; }.page-heading { grid-template-columns: 1fr; gap: 18px; }.study-layout { grid-template-columns: 1fr; }.study-layout > aside { position: static; border: 0; overflow: visible; }.study-layout aside label { margin-bottom: 6px; display: block; font-size: 12px; font-weight: 800; }.study-layout aside select { width: 100%; min-height: 46px; padding: 0 12px; display: block; border: 1px solid var(--line); border-radius: 6px; background: var(--white); }.study-layout nav { display: none; }.option-list { grid-template-columns: 1fr; } }
@media (max-width: 480px) { .vocabulary-page > header { padding: 0 14px; }.vocabulary-page > header > a:last-child { display: none; }.word-card { min-height: 320px; padding: 25px 15px; }.word-card h3 { font-size: 42px; }.question-card { min-height: 600px; padding: 20px 14px; }.answer-result { flex-direction: column; }.step-actions button { flex: 1; padding: 0 8px; } }
</style>
