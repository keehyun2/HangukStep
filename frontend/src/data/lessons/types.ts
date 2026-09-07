export interface VocabularyWord {
  id: string
  korean: string
  meaning: string
  pronunciation?: string
}

export interface LessonSentence {
  korean: string
  indonesian: string
  pronunciation?: string
}

export interface LessonNote {
  id: string
  title: string
  explanation: string
  examples?: LessonSentence[]
  table?: {
    headers: string[]
    rows: string[][]
  }
}

export interface LessonGrammarReference {
  grammarId: string
  mode: 'introduction' | 'review'
  sectionIds?: string[]
  lessonNote?: string
}

export interface Lesson {
  id: string
  courseId: string
  lessonNumber: number
  status: 'published' | 'draft'
  format?: 'standard' | 'daily'
  title: string
  subtitle: string
  vocabulary: VocabularyWord[]
  sentences: LessonSentence[]
  grammarSections: LessonGrammarReference[]
  audio?: {
    id: string
    src: string
    transcript: string[]
  }
  introduction?: {
    korean: string[]
    indonesian: string[]
  }
  dailyIntro?: string
  notes?: LessonNote[]
}
