import { basicLessonOneQuestions } from '@/data/questions/basic/lesson-001'
import type { LessonQuestion } from '@/data/questions/types'

export * from '@/data/questions/types'

const questionsByLesson: Record<string, LessonQuestion[]> = {
  'basic-001': basicLessonOneQuestions,
}

export function getQuestionsForLesson(lessonId: string) {
  return questionsByLesson[lessonId] ?? []
}
