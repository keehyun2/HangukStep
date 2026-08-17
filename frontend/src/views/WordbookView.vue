<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWordbookStore } from '@/stores/wordbook'
import { romanizeKorean } from '@/utils/romanizeKorean'

const router = useRouter()
const wordbook = useWordbookStore()
const query = ref('')
const speakingId = ref('')

const filteredWords = computed(() => {
  const search = query.value.trim().toLowerCase()
  if (!search) return wordbook.words
  return wordbook.words.filter((word) => (
    `${word.korean} ${word.meaning} ${romanizeKorean(word.korean)}`.toLowerCase().includes(search)
  ))
})

function speak(wordId: string, korean: string) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(korean)
  utterance.lang = 'ko-KR'
  utterance.rate = 0.82
  utterance.onstart = () => { speakingId.value = wordId }
  utterance.onend = () => { speakingId.value = '' }
  utterance.onerror = () => { speakingId.value = '' }
  window.speechSynthesis.speak(utterance)
}
</script>

<template>
  <div class="wordbook-page">
    <header>
      <button type="button" @click="router.push('/')">Kembali</button>
      <RouterLink to="/">Hanguk Step</RouterLink>
      <span>Kosakata Saya</span>
    </header>

    <main>
      <section class="wordbook-heading">
        <div><p>내 단어북</p><h1>Kosakata Saya</h1><span>Simpan dan catat kata yang ingin kamu pelajari lagi.</span></div>
        <strong>{{ wordbook.words.length }} kata tersimpan</strong>
      </section>

      <input v-if="wordbook.words.length" v-model="query" class="word-search" type="search" placeholder="Cari kata tersimpan...">

      <section v-if="filteredWords.length" class="saved-list">
        <article v-for="word in filteredWords" :key="word.id">
          <div class="saved-word">
            <h2>{{ word.korean }}</h2>
            <p>{{ romanizeKorean(word.korean) }}</p>
            <strong>{{ word.meaning }}</strong>
          </div>
          <textarea
            :value="word.memo"
            rows="2"
            placeholder="Tambahkan catatan pribadi..."
            @change="wordbook.updateMemo(word.id, ($event.target as HTMLTextAreaElement).value)"
          ></textarea>
          <div class="saved-actions">
            <button type="button" @click="speak(word.id, word.korean)">{{ speakingId === word.id ? 'Memutar...' : 'Dengar' }}</button>
            <button class="remove" type="button" @click="wordbook.toggle(word)">Hapus</button>
          </div>
        </article>
      </section>

      <section v-else class="empty-wordbook">
        <p>{{ query ? 'Tidak ada kata yang cocok.' : 'Belum ada kosakata tersimpan.' }}</p>
        <button v-if="!query" type="button" @click="router.push('/courses/basic/lessons/1')">Buka Pelajaran 1</button>
      </section>
    </main>
  </div>
</template>

<style scoped>
.wordbook-page { min-height: 100vh; background: #f6f8fb; color: var(--navy-950); }
.wordbook-page header { height: 68px; padding: 0 5vw; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; border-bottom: 1px solid var(--line); background: var(--white); }
.wordbook-page header button { justify-self: start; border: 0; background: transparent; color: var(--muted); font-weight: 800; cursor: pointer; }
.wordbook-page header a { color: inherit; font-size: 20px; font-weight: 900; text-decoration: none; }
.wordbook-page header > span { justify-self: end; color: #b33f35; font-size: 12px; font-weight: 900; }
.wordbook-page main { width: min(960px, 90vw); margin: 0 auto; padding: 48px 0; }
.wordbook-heading { display: flex; align-items: end; justify-content: space-between; gap: 20px; }
.wordbook-heading p { margin: 0; color: #b33f35; font-size: 11px; font-weight: 900; }
.wordbook-heading h1 { margin: 6px 0 8px; font-size: 38px; }
.wordbook-heading span { color: var(--muted); }
.wordbook-heading > strong { color: var(--blue-600); font-size: 13px; }
.word-search { width: 100%; min-height: 47px; margin: 26px 0 17px; padding: 0 14px; border: 1px solid var(--line); border-radius: 6px; background: var(--white); outline: none; }
.saved-list { display: grid; gap: 10px; }
.saved-list article { min-height: 135px; padding: 18px 20px; display: grid; grid-template-columns: 220px 1fr auto; align-items: center; gap: 20px; border: 1px solid var(--line); border-radius: 7px; background: var(--white); }
.saved-word h2 { margin: 0; font-size: 24px; }
.saved-word p { margin: 4px 0 8px; color: var(--muted); font-size: 13px; }
.saved-word strong { color: #b33f35; font-size: 13px; }
.saved-list textarea { width: 100%; padding: 10px; border: 1px solid var(--line); border-radius: 5px; resize: vertical; }
.saved-actions { display: grid; gap: 7px; }
.saved-actions button { min-width: 68px; min-height: 34px; border: 1px solid #cbd4df; border-radius: 5px; background: #f8fafc; font-size: 11px; font-weight: 800; cursor: pointer; }
.saved-actions button.remove { color: #b42318; }
.empty-wordbook { min-height: 430px; display: grid; place-content: center; justify-items: center; color: var(--muted); }
.empty-wordbook button { min-height: 43px; padding: 0 18px; border: 0; border-radius: 6px; background: var(--blue-600); color: var(--white); font-weight: 800; cursor: pointer; }
@media (max-width: 700px) { .wordbook-heading { align-items: start; flex-direction: column; } .saved-list article { grid-template-columns: 1fr; } .saved-actions { grid-template-columns: 1fr 1fr; } }
</style>
