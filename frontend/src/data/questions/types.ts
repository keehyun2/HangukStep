export interface GrammarReference {
  grammarId: string
  sectionId?: string
}

interface QuestionBase {
  id: string
  courseId: string
  lessonId: string
  order: number
  prompt: string
  instruction: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
  explanation?: string
  grammarRefs?: GrammarReference[]
}

export interface FillBlankQuestion extends QuestionBase {
  type: 'fill-blank'
  beforeBlank: string
  afterBlank: string
  options: string[]
  correctAnswer: string
}

export interface SentenceBuilderQuestion extends QuestionBase {
  type: 'sentence-builder'
  imageUrl: string
  imageAlt: string
  imageLabel?: string
  tokens: string[]
  correctTokens: string[]
  completedSentence: string
}

export interface AudioChoiceQuestion extends QuestionBase {
  type: 'audio-choice'
  speechText: string
  options: string[]
  correctAnswer: string
}

export type LessonQuestion = FillBlankQuestion | SentenceBuilderQuestion | AudioChoiceQuestion
