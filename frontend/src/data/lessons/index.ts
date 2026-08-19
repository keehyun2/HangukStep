import { basicLessonOne } from '@/data/lessons/basic/lesson-001'
import { basicLessonTwo } from '@/data/lessons/basic/lesson-002'

export * from '@/data/lessons/types'

export const lessons = [basicLessonOne, basicLessonTwo]

export function getLesson(courseId: string, lessonNumber: number) {
  return lessons.find(
    (lesson) => lesson.courseId === courseId && lesson.lessonNumber === lessonNumber,
  )
}

export function getPublishedLessons(courseId: string) {
  return lessons.filter((lesson) => lesson.courseId === courseId && lesson.status === 'published')
}
