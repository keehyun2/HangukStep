import type { Lesson } from '@/data/lessons/types'

export const dailyLessonOne: Lesson = {
  id: 'daily-001',
  courseId: 'daily',
  lessonNumber: 1,
  status: 'published',
  format: 'daily',
  title: '자기소개',
  subtitle: 'Perkenalan diri',
  vocabulary: [],
  sentences: [
    { korean: '안녕하세요.', indonesian: 'Halo.' },
    { korean: '저는 아디입니다.', indonesian: 'Saya Adi.' },
    { korean: '저는 인도네시아 사람입니다.', indonesian: 'Saya orang Indonesia.' },
    { korean: '저는 학생입니다.', indonesian: 'Saya seorang siswa.' },
    { korean: '만나서 반갑습니다.', indonesian: 'Senang bertemu dengan Anda.' },
  ],
  grammarSections: [
    { grammarId: 'imnida-imnikka', mode: 'introduction' },
    { grammarId: 'particle-eun-neun', mode: 'introduction' },
    { grammarId: 'jeo-je', mode: 'introduction' },
  ],
  audio: {
    id: 'daily-001-introduction',
    src: '/audio/daily/lesson-001/introduction.mp3',
    transcript: [
      '안녕하세요.',
      '저는 아디입니다.',
      '저는 인도네시아 사람입니다.',
      '저는 학생입니다.',
      '만나서 반갑습니다.',
    ],
  },
  introduction: {
    korean: [
      '안녕하세요.',
      '저는 아디입니다.',
      '제 이름은 아디입니다.',
      '저는 인도네시아 사람입니다.',
      '저는 학생입니다.',
      '만나서 반갑습니다.',
    ],
    indonesian: [
      'Halo.',
      'Saya Adi.',
      'Nama saya Adi.',
      'Saya orang Indonesia.',
      'Saya seorang siswa.',
      'Senang bertemu dengan Anda.',
    ],
  },
}
