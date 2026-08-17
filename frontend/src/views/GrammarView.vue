<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { grammarItems } from '@/data/learning'

const router = useRouter()
const query = ref('')
const filteredItems = computed(() => {
  const search = query.value.trim().toLowerCase()
  if (!search) return grammarItems
  return grammarItems.filter((item) => (
    `${item.title} ${item.summary} ${item.explanation}`.toLowerCase().includes(search)
  ))
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
        <span>Temukan penjelasan tata bahasa yang digunakan di semua kursus.</span>
        <input v-model="query" type="search" placeholder="Cari tata bahasa atau penjelasan...">
      </section>

      <section class="grammar-list">
        <article v-for="item in filteredItems" :key="item.id">
          <div class="grammar-title"><span>PEMULA</span><h2>{{ item.title }}</h2><p>{{ item.summary }}</p></div>
          <div class="grammar-detail">
            <p>{{ item.explanation }}</p>
            <div v-for="example in item.examples" :key="example.korean" class="example-row">
              <strong>{{ example.korean }}</strong><span>{{ example.indonesian }}</span>
            </div>
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
.empty-result { padding: 30px; text-align: center; color: var(--muted); }
@media (max-width: 700px) { .grammar-list article { grid-template-columns: 1fr; } .grammar-title { border-right: 0; border-bottom: 1px solid var(--line); } .example-row { flex-direction: column; gap: 5px; } }
</style>
