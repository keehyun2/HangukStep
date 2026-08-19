import rinaProfileImage from '@/assets/quiz/rina-profile.png'
import indonesianPersonImage from '@/assets/quiz/indonesian-person.png'
import type { LessonQuestion } from '@/data/questions/types'

export const basicLessonOneQuestions: LessonQuestion[] = [
  {
    id: 'basic-001-q001', courseId: 'basic', lessonId: 'basic-001', order: 1,
    type: 'fill-blank', prompt: 'Pilih tata bahasa yang tepat untuk mengisi bagian kosong.',
    instruction: '빈칸에 알맞은 말을 고르세요.', difficulty: 'easy', tags: ['grammar', 'imnida'],
    beforeBlank: '저는 학생', afterBlank: '.', options: ['입니다', '입니까?', '이다', '제'], correctAnswer: '입니다',
    explanation: 'Kalimat ini menyatakan identitas dengan sopan, jadi gunakan 입니다 setelah kata benda 학생.',
    grammarRefs: [{ grammarId: 'imnida-imnikka' }],
  },
  {
    id: 'basic-001-q002', courseId: 'basic', lessonId: 'basic-001', order: 2,
    type: 'fill-blank', prompt: 'Pilih kata yang tepat untuk mengisi bagian kosong.',
    instruction: '빈칸에 알맞은 말을 고르세요.', difficulty: 'easy', tags: ['grammar', 'jeo-je'],
    beforeBlank: '', afterBlank: ' 이름은 리나입니다.', options: ['저', '제', '나', '사람'], correctAnswer: '제',
    explanation: '제 berarti “milik saya” dan digunakan sebelum 이름 untuk mengatakan “nama saya”.',
    grammarRefs: [{ grammarId: 'jeo-je' }],
  },
  {
    id: 'basic-001-q003', courseId: 'basic', lessonId: 'basic-001', order: 3,
    type: 'sentence-builder', prompt: 'Lihat gambar dan susun kalimat yang tepat.',
    instruction: '그림을 보고 문장을 완성하세요.', difficulty: 'easy', tags: ['sentence', 'self-introduction'],
    imageUrl: rinaProfileImage, imageAlt: 'Seorang perempuan bernama Rina', imageLabel: 'Nama: Rina',
    tokens: ['제', '입니다', '리나', '저는', '이다', '나'], correctTokens: ['저는', '리나', '입니다'],
    completedSentence: '저는 리나입니다.', grammarRefs: [{ grammarId: 'imnida-imnikka' }],
  },
  {
    id: 'basic-001-q004', courseId: 'basic', lessonId: 'basic-001', order: 4,
    type: 'sentence-builder', prompt: 'Lihat gambar dan susun kalimat yang tepat.',
    instruction: '그림을 보고 문장을 완성하세요.', difficulty: 'easy', tags: ['sentence', 'nationality'],
    imageUrl: indonesianPersonImage, imageAlt: 'Seorang warga Indonesia berdiri di sebelah bendera Indonesia',
    tokens: ['한국', '사람', '저는', '제', '입니다', '인도네시아'],
    correctTokens: ['저는', '인도네시아', '사람', '입니다'], completedSentence: '저는 인도네시아 사람입니다.',
    grammarRefs: [{ grammarId: 'imnida-imnikka' }],
  },
  {
    id: 'basic-001-q005', courseId: 'basic', lessonId: 'basic-001', order: 5,
    type: 'audio-choice', prompt: 'Pilih kata yang kamu dengar.', instruction: '음성에 나오는 단어를 선택하세요.',
    difficulty: 'easy', tags: ['listening', 'occupation'], speechText: '학생',
    options: ['회사원', '학생', '선생님', '경찰'], correctAnswer: '학생',
  },
  {
    id: 'basic-001-q006', courseId: 'basic', lessonId: 'basic-001', order: 6,
    type: 'audio-choice', prompt: 'Pilih kata yang kamu dengar.', instruction: '음성에 나오는 단어를 선택하세요.',
    difficulty: 'easy', tags: ['listening', 'occupation'], speechText: '선생님',
    options: ['은행원', '소방관', '학생', '선생님'], correctAnswer: '선생님',
  },
]
