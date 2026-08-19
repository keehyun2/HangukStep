export interface VocabularyWord {
  id: string
  korean: string
  meaning: string
}

export interface LessonSentence {
  korean: string
  indonesian: string
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
  title: string
  subtitle: string
  vocabulary: VocabularyWord[]
  sentences: LessonSentence[]
  grammarSections: LessonGrammarReference[]
}
