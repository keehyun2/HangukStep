import rawTopics from '@/data/vocabulary/topics.json'
import type { VocabularyWord } from '@/data/lessons'

export interface VocabularyCatalogWord extends VocabularyWord {
  pronunciation: string
}

export interface VocabularyExpression {
  id: string
  korean: string
  pronunciation: string
  meaning: string
}

export interface VocabularyQuestion {
  id: string
  prompt: string
  hint: string
  options: string[]
  correctIndex: number
}

export interface VocabularyTopic {
  id: string
  lessonNumber: number
  titleKorean: string
  titleIndonesian: string
  words: VocabularyCatalogWord[]
  expressions: VocabularyExpression[]
  questions: VocabularyQuestion[]
}

export const vocabularyTopics = rawTopics as VocabularyTopic[]
export const vocabularyWordCount = vocabularyTopics.reduce((total, topic) => total + topic.words.length, 0)
