<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { courses } from '@/data/courses'
import { grammarItems } from '@/data/grammar/grammar'
import { lessons } from '@/data/lessons'

const router = useRouter()
const query = ref('')
const lessonLabels = (grammarId: string, epsLesson?: number) => {
  const labels = lessons
    .filter((lesson) => lesson.grammarSections.some((reference) => reference.grammarId === grammarId))
    .map((lesson) => `${courses.find((course) => course.id === lesson.courseId)?.title ?? lesson.courseId} · Pelajaran ${lesson.lessonNumber}`)
  if (epsLesson) labels.push(`EPS-TOPIK · Pelajaran ${epsLesson}`)
  return labels.join(' · ')
}
const filteredItems = computed(() => {
  const search = query.value.trim().toLowerCase()
  if (!search) return grammarItems
  return grammarItems.filter((item) => {
    const sectionText = item.sections?.map((section) => `${section.title} ${section.explanation}`).join(' ') ?? ''
    return `${item.title} ${item.summary} ${item.explanation} ${item.koreanExplanation ?? ''} ${item.keywords.join(' ')} ${sectionText}`
      .toLowerCase()
      .includes(search)
  })
})
</script>

<template>
  <div class="library-page">
    <header>
      <button type="button" @click="router.push('/')">Kembali</button>
      <RouterLink to="/">Hanguk Step</RouterLink>
      <span>Tata Bahasa</span>
    </header>

    <main>
      <section class="library-heading">
        <p>KAMUS TATA BAHASA</p>
        <h1>문법 사전</h1>
        <span>Temukan {{ grammarItems.length }} tata bahasa yang digunakan di semua kursus.</span>
        <input v-model="query" type="search" placeholder="Cari tata bahasa atau penjelasan...">
      </section>

      <section class="grammar-list">
        <article v-for="item in filteredItems" :id="item.id" :key="item.id">
          <div class="grammar-title"><span>{{ lessonLabels(item.id, item.epsLesson) || 'KAMUS TATA BAHASA' }}</span><h2>{{ item.title }}</h2><p>{{ item.summary }}</p></div>
          <div class="grammar-detail">
            <p>{{ item.explanation }}</p>
            <details v-if="item.koreanExplanation" class="korean-explanation">
              <summary>한국어 설명</summary>
              <p>{{ item.koreanExplanation }}</p>
            </details>
            <div v-for="example in item.examples" :key="example.korean" class="example-row">
              <strong>{{ example.korean }}</strong><span v-if="example.indonesian">{{ example.indonesian }}</span>
            </div>
            <section v-for="section in item.sections" :id="`${item.id}-${section.id}`" :key="section.id" class="grammar-section">
              <small>{{ section.type === 'exception' ? 'PENGECUALIAN' : 'ATURAN' }}</small>
              <h3>{{ section.title }}</h3>
              <p>{{ section.explanation }}</p>
              <div v-for="example in section.examples" :key="example.korean" class="example-row">
                <strong>{{ example.korean }}</strong><span>{{ example.indonesian }}</span>
              </div>
            </section>
          </div>
        </article>
        <p v-if="!filteredItems.length" class="empty-result">Tata bahasa tidak ditemukan.</p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.library-page { min-height: 100vh; background: #f6f8fb; color: var(--navy-950); }
.library-page header { height: 68px; padding: 0 5vw; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; border-bottom: 1px solid var(--line); background: var(--white); }
.library-page header button { justify-self: start; border: 0; background: transparent; color: var(--muted); font-weight: 800; cursor: pointer; }
.library-page header a { color: inherit; font-size: 20px; font-weight: 900; text-decoration: none; }
.library-page header > span { justify-self: end; color: var(--blue-600); font-size: 12px; font-weight: 900; }
.library-page main { width: min(980px, 90vw); margin: 0 auto; padding: 48px 0; }
.library-heading { max-width: 680px; }
.library-heading > p { margin: 0; color: var(--blue-600); font-size: 11px; font-weight: 900; }
.library-heading h1 { margin: 7px 0 8px; font-size: 39px; }
.library-heading > span { color: var(--muted); }
.library-heading input { width: 100%; min-height: 48px; margin-top: 24px; padding: 0 15px; border: 1px solid var(--line); border-radius: 6px; background: var(--white); outline: none; }
.library-heading input:focus { border-color: var(--blue-600); box-shadow: 0 0 0 3px rgba(47, 108, 244, .1); }
.grammar-list { margin-top: 32px; display: grid; gap: 13px; }
.grammar-list article { display: grid; grid-template-columns: 280px 1fr; border: 1px solid var(--line); border-radius: 7px; background: var(--white); overflow: hidden; }
.grammar-title { padding: 24px; border-right: 1px solid var(--line); background: #f3f6fb; }
.grammar-title > span { color: var(--blue-600); font-size: 10px; font-weight: 900; }
.grammar-title h2 { margin: 7px 0 9px; font-size: 25px; }
.grammar-title p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.5; }
.grammar-detail { padding: 24px; }
.grammar-detail > p { margin: 0 0 17px; line-height: 1.65; white-space: pre-line; }
.example-row { padding: 10px 12px; display: flex; justify-content: space-between; gap: 20px; background: #f7f8fa; }
.example-row + .example-row { margin-top: 6px; }
.example-row span { color: var(--muted); }
.korean-explanation { margin: 0 0 16px; padding: 11px 13px; border: 1px solid var(--line); background: #fafbfc; }
.korean-explanation summary { color: var(--blue-600); font-size: 12px; font-weight: 900; cursor: pointer; }
.korean-explanation p { margin: 10px 0 0; line-height: 1.65; white-space: pre-line; }
.grammar-section { margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--line); }
.grammar-section small { color: var(--blue-600); font-size: 10px; font-weight: 900; }
.grammar-section h3 { margin: 5px 0 7px; }
.grammar-section p { margin: 0 0 10px; color: var(--muted); line-height: 1.6; }
.empty-result { padding: 30px; text-align: center; color: var(--muted); }
@media (max-width: 700px) { .grammar-list article { grid-template-columns: 1fr; } .grammar-title { border-right: 0; border-bottom: 1px solid var(--line); } .example-row { flex-direction: column; gap: 5px; } }
</style>
