<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getGrammarById } from '@/data/grammar/grammar'
import { getLesson } from '@/data/lessons'
import { useWordbookStore } from '@/stores/wordbook'
import { romanizeKorean } from '@/utils/romanizeKorean'

type DailySection = 'listen' | 'vocabulary' | 'notes' | 'grammar' | 'practice'

const route = useRoute()
const router = useRouter()
const wordbook = useWordbookStore()
const activeSection = ref<DailySection>('listen')
const showGuide = ref(false)
const speakingId = ref('')
const lesson = computed(() => getLesson(String(route.params.courseId), Number(route.params.lessonNumber)))
const lessonGrammar = computed(() => (lesson.value?.grammarSections ?? []).flatMap((reference) => {
  const grammar = getGrammarById(reference.grammarId)
  return grammar ? [grammar] : []
}))
const sections = computed(() => {
  const items: { id: DailySection; label: string; korean: string }[] = [
    { id: 'listen', label: 'Dengarkan', korean: '먼저 들어 보세요' },
  ]
  if (lesson.value?.vocabulary.length) items.push({ id: 'vocabulary', label: 'Kosakata', korean: '가족 단어' })
  if (lesson.value?.notes?.length) items.push({ id: 'notes', label: 'Penjelasan', korean: '표현 설명' })
  if (lesson.value?.grammarSections.length) items.push({ id: 'grammar', label: 'Tata Bahasa', korean: '문법을 배워요' })
  if (lesson.value?.introduction) items.push({ id: 'practice', label: 'Berlatih', korean: '혼자 말해 보세요' })
  return items
})

function nextSection() {
  const index = sections.value.findIndex((section) => section.id === activeSection.value)
  const next = sections.value[index + 1]
  if (next) activeSection.value = next.id
}

function speak(id: string, text: string) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  const koreanVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith('ko'))
  utterance.lang = 'ko-KR'
  utterance.rate = 0.8
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

onBeforeUnmount(stopSpeech)
</script>

<template>
  <div v-if="lesson" class="daily-page">
    <header>
      <button type="button" @click="router.push('/courses/daily')">Kembali</button>
      <RouterLink to="/">Hanguk Step</RouterLink>
      <span>Belajar Harian · Hari {{ lesson.lessonNumber }}</span>
    </header>

    <main>
      <aside>
        <p>HARI {{ lesson.lessonNumber }}</p>
        <h1>{{ lesson.title }}</h1>
        <span>{{ lesson.subtitle }}</span>
        <nav aria-label="Bagian pelajaran harian">
          <button v-for="(section, index) in sections" :key="section.id" type="button" :class="{ active: activeSection === section.id }" @click="activeSection = section.id">
            <b>{{ String(index + 1).padStart(2, '0') }}</b><span>{{ section.label }}<small>{{ section.korean }}</small></span>
          </button>
        </nav>
      </aside>

      <section class="daily-content">
        <div v-if="activeSection === 'listen'" class="audio-section">
          <div class="content-heading"><p>먼저 들어 보세요</p><h2>Dengarkan dulu</h2><span>{{ lesson.dailyIntro || 'Dengarkan seluruh perkenalan, lalu baca setiap kalimat.' }}</span></div>
          <div v-if="lesson.audio" class="audio-player">
            <div><span>AUDIO · HARI {{ lesson.lessonNumber }}</span><strong>{{ lesson.title }}</strong></div>
            <audio controls preload="metadata" :src="lesson.audio.src">Browser Anda tidak mendukung audio.</audio>
          </div>
          <button class="guide-toggle" type="button" @click="showGuide = !showGuide">{{ showGuide ? 'Sembunyikan cara baca dan arti' : 'Tampilkan cara baca dan arti' }}</button>
          <ol class="transcript">
            <li v-for="(sentence, index) in lesson.sentences" :key="sentence.korean">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <div><strong>{{ sentence.korean }}</strong><p v-if="showGuide">{{ sentence.pronunciation || romanizeKorean(sentence.korean) }}<br>{{ sentence.indonesian }}</p></div>
              <button type="button" @click="speak(`sentence-${index}`, sentence.korean)">{{ speakingId === `sentence-${index}` ? 'Stop' : 'Dengar' }}</button>
            </li>
          </ol>
          <button class="next-action" type="button" @click="nextSection">Lanjut</button>
        </div>

        <div v-else-if="activeSection === 'vocabulary'" class="vocabulary-section">
          <div class="content-heading"><p>KOSAKATA KELUARGA</p><h2>가족 단어</h2><span>Pelajari kata-kata yang digunakan untuk memperkenalkan keluarga.</span></div>
          <div class="vocabulary-grid">
            <article v-for="word in lesson.vocabulary" :key="word.id">
              <div><h3>{{ word.korean }}</h3><p>{{ word.pronunciation || romanizeKorean(word.korean) }}</p><strong>{{ word.meaning }}</strong></div>
              <div><button type="button" @click="speak(word.id, word.korean)">{{ speakingId === word.id ? 'Stop' : 'Dengar' }}</button><button type="button" :class="{ saved: wordbook.isSaved(word.id) }" @click="wordbook.toggle(word)">{{ wordbook.isSaved(word.id) ? 'Tersimpan' : 'Simpan' }}</button></div>
            </article>
          </div>
          <button class="next-action" type="button" @click="nextSection">Lanjut</button>
        </div>

        <div v-else-if="activeSection === 'notes'" class="notes-section">
          <div class="content-heading"><p>PENJELASAN KELUARGA</p><h2>형, 오빠, 누나, 언니</h2><span>Pahami pilihan kata berdasarkan orang yang berbicara.</span></div>
          <article v-for="note in lesson.notes" :key="note.id">
            <h3>{{ note.title }}</h3><p>{{ note.explanation }}</p>
            <div v-if="note.table" class="note-table"><div class="table-row header"><strong v-for="header in note.table.headers" :key="header">{{ header }}</strong></div><div v-for="row in note.table.rows" :key="row.join('-')" class="table-row"><span v-for="cell in row" :key="cell">{{ cell }}</span></div></div>
            <div class="note-examples"><div v-for="example in note.examples" :key="example.korean"><strong>{{ example.korean }}</strong><span>{{ example.indonesian }}</span></div></div>
          </article>
          <button class="next-action" type="button" @click="nextSection">Lanjut</button>
        </div>

        <div v-else-if="activeSection === 'grammar'" class="grammar-section">
          <div class="content-heading"><p>PENJELASAN BAHASA INDONESIA</p><h2>Tata Bahasa</h2><span>Pelajari pola yang digunakan dalam audio.</span></div>
          <article v-for="(grammar, index) in lessonGrammar" :key="grammar.id">
            <div class="grammar-title"><span>0{{ index + 1 }}</span><h3>{{ grammar.title }}</h3><RouterLink :to="`/grammar#${grammar.id}`">Buka di kamus</RouterLink></div>
            <p class="grammar-explanation">{{ grammar.explanation }}</p>
            <div class="examples">
              <div v-for="example in grammar.examples" :key="example.korean"><strong>{{ example.korean }}</strong><span>{{ example.indonesian }}</span></div>
            </div>
            <section v-for="detail in grammar.sections" :key="detail.id" class="grammar-detail">
              <h4>{{ detail.title }}</h4><p>{{ detail.explanation }}</p>
              <div v-for="example in detail.examples" :key="example.korean"><strong>{{ example.korean }}</strong><span>{{ example.indonesian }}</span></div>
            </section>
          </article>
          <button class="next-action" type="button" @click="nextSection">Lanjut</button>
        </div>

        <div v-else class="example-section">
          <div class="content-heading"><p>COBA UCAPKAN SENDIRI</p><h2>혼자 말해 보세요</h2><span>Coba ucapkan dari awal sampai akhir tanpa melihat artinya.</span></div>
          <div v-if="lesson.audio" class="audio-player review-audio">
            <div><span>DENGARKAN LAGI</span><strong>{{ lesson.title }}</strong></div>
            <audio controls preload="metadata" :src="lesson.audio.src">Browser Anda tidak mendukung audio.</audio>
          </div>
          <div class="parallel-text">
            <section><h3>한국어</h3><p v-for="line in lesson.introduction?.korean" :key="line">{{ line }}</p></section>
            <section><h3>Arti</h3><p v-for="line in lesson.introduction?.indonesian" :key="line">{{ line }}</p></section>
          </div>
          <button class="next-action complete" type="button" @click="router.push('/courses/daily')">Selesai</button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.daily-page { min-height: 100vh; background: #f5f7fb; color: var(--navy-950); }
.daily-page > header { height: 68px; padding: 0 28px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; border-bottom: 1px solid var(--line); background: var(--white); }
.daily-page > header button { justify-self: start; border: 0; background: transparent; color: var(--muted); font-weight: 800; cursor: pointer; }.daily-page > header a { color: inherit; font-size: 20px; font-weight: 900; text-decoration: none; }.daily-page > header > span { justify-self: end; color: var(--blue-600); font-size: 12px; font-weight: 900; }
.daily-page > main { min-height: calc(100vh - 68px); display: grid; grid-template-columns: 285px 1fr; }
.daily-page aside { padding: 31px 22px; border-right: 1px solid var(--line); background: var(--white); }.daily-page aside > p { margin: 0; color: var(--blue-600); font-size: 11px; font-weight: 900; }.daily-page aside h1 { margin: 7px 0 4px; font-size: 25px; }.daily-page aside > span { color: var(--muted); font-size: 13px; }
.daily-page aside nav { margin-top: 26px; display: grid; gap: 6px; }.daily-page aside nav button { min-height: 57px; padding: 8px 10px; display: grid; grid-template-columns: 30px 1fr; align-items: center; gap: 10px; border: 1px solid transparent; border-radius: 6px; background: transparent; color: inherit; text-align: left; cursor: pointer; }.daily-page aside nav button.active { border-color: #b9caf2; background: #edf3ff; }.daily-page aside nav b { color: #8793a2; font-size: 11px; }.daily-page aside nav span, .daily-page aside nav small { display: block; }.daily-page aside nav small { margin-top: 3px; color: var(--muted); }
.daily-content { padding: 42px; }.daily-content > div { width: min(880px, 100%); margin: 0 auto; }.content-heading { margin-bottom: 22px; }.content-heading p { margin: 0; color: var(--blue-600); font-size: 11px; font-weight: 900; }.content-heading h2 { margin: 5px 0 6px; font-size: 31px; }.content-heading span { color: var(--muted); }
.audio-player { min-height: 130px; padding: 22px; display: grid; grid-template-columns: 1fr minmax(260px, 420px); align-items: center; gap: 24px; border-radius: 7px; background: var(--navy-950); color: var(--white); }.audio-player span, .audio-player strong { display: block; }.audio-player span { margin-bottom: 7px; color: #b8c8dc; font-size: 10px; font-weight: 900; }.audio-player strong { font-size: 22px; }.audio-player audio { width: 100%; }
.review-audio { margin-bottom: 16px; }
.guide-toggle { min-height: 38px; margin-top: 14px; padding: 0 14px; border: 1px solid var(--line); border-radius: 5px; background: var(--white); color: var(--blue-600); font-size: 12px; font-weight: 800; cursor: pointer; }
.transcript { margin: 14px 0 0; padding: 0; display: grid; gap: 8px; list-style: none; }.transcript li { min-height: 83px; padding: 14px 18px; display: grid; grid-template-columns: 35px 1fr auto; align-items: center; gap: 12px; border: 1px solid var(--line); background: var(--white); }.transcript li > span { color: #97a2af; font-size: 11px; font-weight: 900; }.transcript strong { font-size: 18px; }.transcript p { margin: 5px 0 0; color: var(--muted); line-height: 1.55; }.transcript button, .vocabulary-grid article > div:last-child button { min-width: 70px; min-height: 34px; border: 1px solid #cbd4df; border-radius: 5px; background: #f8fafc; color: inherit; font-size: 11px; font-weight: 800; cursor: pointer; }
.next-action { width: 100%; min-height: 49px; margin-top: 18px; border: 0; border-radius: 6px; background: var(--blue-600); color: var(--white); font-weight: 900; cursor: pointer; }.next-action.complete { background: #1b8c5a; }
.vocabulary-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }.vocabulary-grid article { min-height: 142px; padding: 17px; display: flex; align-items: center; justify-content: space-between; gap: 15px; border: 1px solid var(--line); border-radius: 7px; background: var(--white); }.vocabulary-grid h3 { margin: 0; font-size: 23px; }.vocabulary-grid p { margin: 4px 0 8px; color: var(--muted); font-size: 12px; }.vocabulary-grid strong { color: #b33f35; font-size: 13px; line-height: 1.45; }.vocabulary-grid article > div:last-child { flex: 0 0 72px; display: grid; gap: 6px; }.vocabulary-grid article > div:last-child button.saved { border-color: #65ad87; background: #eaf8f1; color: #146a43; }
.notes-section > article { margin-bottom: 12px; padding: 24px; border: 1px solid var(--line); border-radius: 7px; background: var(--white); }.notes-section > article > h3 { margin: 0 0 10px; font-size: 25px; }.notes-section > article > p { color: #4d5b6b; line-height: 1.7; }.note-table { margin: 18px 0; border: 1px solid var(--line); }.table-row { display: grid; grid-template-columns: repeat(3, 1fr); }.table-row + .table-row { border-top: 1px solid var(--line); }.table-row > * { padding: 10px; }.table-row > * + * { border-left: 1px solid var(--line); }.table-row.header { background: #edf3ff; color: var(--blue-600); font-size: 12px; }.note-examples { display: grid; gap: 7px; }.note-examples > div { padding: 11px 13px; display: grid; grid-template-columns: minmax(180px, .8fr) 1.2fr; gap: 15px; background: #f5f7fa; }.note-examples span { color: var(--muted); line-height: 1.5; }
.grammar-section > article { margin-bottom: 14px; padding: 24px; border: 1px solid var(--line); border-radius: 7px; background: var(--white); }.grammar-title { display: grid; grid-template-columns: 34px 1fr auto; align-items: center; gap: 8px; }.grammar-title > span { color: #97a2af; font-size: 11px; font-weight: 900; }.grammar-title h3 { margin: 0; font-size: 26px; }.grammar-title a { color: var(--blue-600); font-size: 11px; font-weight: 800; }.grammar-explanation { margin: 18px 0; padding: 15px; border-left: 3px solid #e2a126; background: #fff9e9; line-height: 1.7; white-space: pre-line; }.examples { display: grid; gap: 7px; }.examples > div, .grammar-detail > div { padding: 10px 12px; display: flex; justify-content: space-between; gap: 18px; background: #f5f7fa; }.examples span, .grammar-detail span { color: var(--muted); }.grammar-detail { margin-top: 15px; padding-top: 14px; border-top: 1px solid var(--line); }.grammar-detail h4 { margin: 0 0 6px; }.grammar-detail > p { color: var(--muted); line-height: 1.6; }
.parallel-text { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--line); background: var(--white); }.parallel-text section { padding: 25px; }.parallel-text section + section { border-left: 1px solid var(--line); background: #f8fafc; }.parallel-text h3 { margin: 0 0 18px; color: var(--blue-600); font-size: 13px; }.parallel-text p { min-height: 28px; margin: 0 0 9px; font-size: 17px; line-height: 1.6; }
@media (max-width: 760px) { .daily-page > header { padding: 0 14px; }.daily-page > header > span { display: none; }.daily-page > main { grid-template-columns: 1fr; }.daily-page aside { padding: 20px 14px; border-right: 0; border-bottom: 1px solid var(--line); }.daily-page aside nav { grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); }.daily-page aside nav button { grid-template-columns: 1fr; justify-items: center; text-align: center; }.daily-page aside nav small { display: none; }.daily-content { padding: 25px 14px; }.audio-player { grid-template-columns: 1fr; }.vocabulary-grid { grid-template-columns: 1fr; }.parallel-text { grid-template-columns: 1fr; }.parallel-text section + section { border-left: 0; border-top: 1px solid var(--line); }.grammar-title { grid-template-columns: 28px 1fr; }.grammar-title a { grid-column: 2; }.examples > div, .grammar-detail > div { flex-direction: column; gap: 4px; }.note-examples > div { grid-template-columns: 1fr; gap: 5px; } }
@media (max-width: 480px) { .transcript li { grid-template-columns: 28px 1fr; }.transcript button { grid-column: 2; justify-self: start; }.table-row { font-size: 12px; }.table-row > * { padding: 8px 5px; overflow-wrap: anywhere; } }
</style>
