import type { Lesson } from '@/data/lessons/types'

export const basicLessonTwo: Lesson = {
  id: 'basic-002',
  courseId: 'basic',
  lessonNumber: 2,
  status: 'draft',
  title: '장소와 활동',
  subtitle: 'Tempat dan kegiatan',
  vocabulary: [],
  sentences: [],
  grammarSections: [
    { grammarId: 'particle-eseo', mode: 'introduction' },
    { grammarId: 'particle-eul-reul', mode: 'introduction', sectionIds: ['batchim', 'no-batchim'] },
    { grammarId: 'progressive-go-itsseumnida', mode: 'introduction' },
  ],
}
