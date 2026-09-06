<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getGrammarById } from '@/data/grammar/grammar'
import { getLesson } from '@/data/lessons'

type DailySection = 'audio' | 'grammar' | 'example'

const route = useRoute()
const router = useRouter()
const activeSection = ref<DailySection>('audio')
const lesson = computed(() => getLesson(String(route.params.courseId), Number(route.params.lessonNumber)))
const lessonGrammar = computed(() => (lesson.value?.grammarSections ?? []).flatMap((reference) => {
  const grammar = getGrammarById(reference.grammarId)
  return grammar ? [grammar] : []
}))
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
          <button type="button" :class="{ active: activeSection === 'audio' }" @click="activeSection = 'audio'"><b>01</b><span>Dengarkan<small>듣고 따라 해요</small></span></button>
          <button type="button" :class="{ active: activeSection === 'grammar' }" @click="activeSection = 'grammar'"><b>02</b><span>Tata Bahasa<small>문법을 배워요</small></span></button>
          <button type="button" :class="{ active: activeSection === 'example' }" @click="activeSection = 'example'"><b>03</b><span>Perkenalan<small>자기소개 예시</small></span></button>
        </nav>
      </aside>

      <section class="daily-content">
        <div v-if="activeSection === 'audio'" class="audio-section">
          <div class="content-heading"><p>듣고 따라 해요</p><h2>Dengarkan dan ikuti</h2><span>Dengarkan seluruh perkenalan, lalu baca setiap kalimat.</span></div>
          <div class="audio-player">
            <div><span>AUDIO · HARI {{ lesson.lessonNumber }}</span><strong>{{ lesson.title }}</strong></div>
            <audio v-if="lesson.audio" controls preload="metadata" :src="lesson.audio.src">Browser Anda tidak mendukung audio.</audio>
          </div>
          <ol class="transcript">
            <li v-for="(sentence, index) in lesson.sentences" :key="sentence.korean">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <div><strong>{{ sentence.korean }}</strong><p>{{ sentence.indonesian }}</p></div>
            </li>
          </ol>
          <button class="next-action" type="button" @click="activeSection = 'grammar'">Lanjut ke tata bahasa</button>
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
          <button class="next-action" type="button" @click="activeSection = 'example'">Lanjut ke contoh perkenalan</button>
        </div>

        <div v-else class="example-section">
          <div class="content-heading"><p>CONTOH PERKENALAN</p><h2>자기소개</h2><span>Bandingkan kalimat Korea dengan artinya.</span></div>
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
.transcript { margin: 14px 0 0; padding: 0; display: grid; gap: 8px; list-style: none; }.transcript li { min-height: 83px; padding: 14px 18px; display: grid; grid-template-columns: 35px 1fr; align-items: center; gap: 12px; border: 1px solid var(--line); background: var(--white); }.transcript li > span { color: #97a2af; font-size: 11px; font-weight: 900; }.transcript strong { font-size: 18px; }.transcript p { margin: 5px 0 0; color: var(--muted); }
.next-action { width: 100%; min-height: 49px; margin-top: 18px; border: 0; border-radius: 6px; background: var(--blue-600); color: var(--white); font-weight: 900; cursor: pointer; }.next-action.complete { background: #1b8c5a; }
.grammar-section > article { margin-bottom: 14px; padding: 24px; border: 1px solid var(--line); border-radius: 7px; background: var(--white); }.grammar-title { display: grid; grid-template-columns: 34px 1fr auto; align-items: center; gap: 8px; }.grammar-title > span { color: #97a2af; font-size: 11px; font-weight: 900; }.grammar-title h3 { margin: 0; font-size: 26px; }.grammar-title a { color: var(--blue-600); font-size: 11px; font-weight: 800; }.grammar-explanation { margin: 18px 0; padding: 15px; border-left: 3px solid #e2a126; background: #fff9e9; line-height: 1.7; white-space: pre-line; }.examples { display: grid; gap: 7px; }.examples > div, .grammar-detail > div { padding: 10px 12px; display: flex; justify-content: space-between; gap: 18px; background: #f5f7fa; }.examples span, .grammar-detail span { color: var(--muted); }.grammar-detail { margin-top: 15px; padding-top: 14px; border-top: 1px solid var(--line); }.grammar-detail h4 { margin: 0 0 6px; }.grammar-detail > p { color: var(--muted); line-height: 1.6; }
.parallel-text { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--line); background: var(--white); }.parallel-text section { padding: 25px; }.parallel-text section + section { border-left: 1px solid var(--line); background: #f8fafc; }.parallel-text h3 { margin: 0 0 18px; color: var(--blue-600); font-size: 13px; }.parallel-text p { min-height: 28px; margin: 0 0 9px; font-size: 17px; line-height: 1.6; }
@media (max-width: 760px) { .daily-page > header { padding: 0 14px; }.daily-page > header > span { display: none; }.daily-page > main { grid-template-columns: 1fr; }.daily-page aside { padding: 20px 14px; border-right: 0; border-bottom: 1px solid var(--line); }.daily-page aside nav { grid-template-columns: repeat(3, 1fr); }.daily-page aside nav button { grid-template-columns: 1fr; justify-items: center; text-align: center; }.daily-page aside nav small { display: none; }.daily-content { padding: 25px 14px; }.audio-player { grid-template-columns: 1fr; }.parallel-text { grid-template-columns: 1fr; }.parallel-text section + section { border-left: 0; border-top: 1px solid var(--line); }.grammar-title { grid-template-columns: 28px 1fr; }.grammar-title a { grid-column: 2; }.examples > div, .grammar-detail > div { flex-direction: column; gap: 4px; } }
</style>
