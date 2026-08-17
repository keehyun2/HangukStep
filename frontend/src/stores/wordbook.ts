import { defineStore } from 'pinia'
import type { VocabularyWord } from '@/data/learning'

export interface SavedWord extends VocabularyWord {
  savedAt: string
  memo: string
}

function loadSavedWords(): SavedWord[] {
  try {
    const value = JSON.parse(localStorage.getItem('hangukstep-wordbook') || '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

export const useWordbookStore = defineStore('wordbook', {
  state: () => ({
    words: loadSavedWords(),
  }),

  actions: {
    persist() {
      localStorage.setItem('hangukstep-wordbook', JSON.stringify(this.words))
    },

    isSaved(wordId: string) {
      return this.words.some((word) => word.id === wordId)
    },

    toggle(word: VocabularyWord) {
      if (this.isSaved(word.id)) {
        this.words = this.words.filter((item) => item.id !== word.id)
      } else {
        this.words.push({ ...word, memo: '', savedAt: new Date().toISOString() })
      }
      this.persist()
    },

    updateMemo(wordId: string, memo: string) {
      const word = this.words.find((item) => item.id === wordId)
      if (word) {
        word.memo = memo
        this.persist()
      }
    },
  },
})
