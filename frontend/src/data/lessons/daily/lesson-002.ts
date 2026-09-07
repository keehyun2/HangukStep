import type { Lesson } from '@/data/lessons/types'

export const dailyLessonTwo: Lesson = {
  id: 'daily-002',
  courseId: 'daily',
  lessonNumber: 2,
  status: 'published',
  format: 'daily',
  title: '가족소개',
  subtitle: 'Memperkenalkan keluarga',
  dailyIntro: 'Dengarkan dulu bagaimana Adi memperkenalkan keluarganya. Untuk sekarang, tidak perlu memahami semua artinya. Cukup dengarkan bahasa Koreanya terlebih dahulu.',
  audio: {
    id: 'daily-002-family-introduction',
    src: '/audio/daily/lesson-002/family-introduction.mp3',
    transcript: [
      '저희 가족을 소개할게요.',
      '우리 가족은 모두 여섯 명이에요.',
      '저는 4남매 중에 셋째예요.',
      '형이 한 명 있고 누나가 한 명 있어요.',
      '그리고 남동생도 한 명 있어요.',
      '저희 가족은 사이가 아주 좋아요.',
    ],
  },
  vocabulary: [
    { id: 'daily-002-father', korean: '아빠', pronunciation: 'appa', meaning: 'ayah / papa' },
    { id: 'daily-002-mother', korean: '엄마', pronunciation: 'eomma', meaning: 'ibu / mama' },
    { id: 'daily-002-oppa', korean: '오빠', pronunciation: 'oppa', meaning: 'kakak laki-laki yang dipanggil oleh perempuan' },
    { id: 'daily-002-hyeong', korean: '형', pronunciation: 'hyeong', meaning: 'kakak laki-laki yang dipanggil oleh laki-laki' },
    { id: 'daily-002-eonni', korean: '언니', pronunciation: 'eonni', meaning: 'kakak perempuan yang dipanggil oleh perempuan' },
    { id: 'daily-002-nuna', korean: '누나', pronunciation: 'nuna', meaning: 'kakak perempuan yang dipanggil oleh laki-laki' },
    { id: 'daily-002-younger-sister', korean: '여동생', pronunciation: 'yeodongsaeng', meaning: 'adik perempuan' },
    { id: 'daily-002-younger-brother', korean: '남동생', pronunciation: 'namdongsaeng', meaning: 'adik laki-laki' },
    { id: 'daily-002-husband', korean: '남편', pronunciation: 'nampyeon', meaning: 'suami' },
    { id: 'daily-002-wife', korean: '아내', pronunciation: 'anae', meaning: 'istri' },
    { id: 'daily-002-daughter', korean: '딸', pronunciation: 'ttal', meaning: 'anak perempuan' },
    { id: 'daily-002-son', korean: '아들', pronunciation: 'adeul', meaning: 'anak laki-laki' },
  ],
  sentences: [
    { korean: '저희 가족을 소개할게요.', pronunciation: 'jeohui gajogeul sogaehalgeyo', indonesian: 'Saya akan memperkenalkan keluarga saya.' },
    { korean: '우리 가족은 모두 여섯 명이에요.', pronunciation: 'uri gajogeun modu yeoseon myeong-ieyo', indonesian: 'Keluarga saya terdiri dari enam orang.' },
    { korean: '저는 4남매 중에 셋째예요.', pronunciation: 'jeoneun sa-nammae junge setjjaeyeyo', indonesian: 'Saya anak ketiga dari empat bersaudara.' },
    { korean: '형이 한 명 있고 누나가 한 명 있어요.', pronunciation: 'hyeongi han myeong itgo nunaga han myeong isseoyo', indonesian: 'Saya punya satu kakak laki-laki dan satu kakak perempuan.' },
    { korean: '그리고 남동생도 한 명 있어요.', pronunciation: 'geurigo namdongsaengdo han myeong isseoyo', indonesian: 'Dan saya juga punya satu adik laki-laki.' },
    { korean: '저희 가족은 사이가 아주 좋아요.', pronunciation: 'jeohui gajogeun saiga aju joayo', indonesian: 'Hubungan keluarga kami sangat akrab.' },
  ],
  grammarSections: [
    { grammarId: 'particle-eul-reul', mode: 'introduction', sectionIds: ['batchim', 'no-batchim'] },
    { grammarId: 'counter-myeong', mode: 'introduction' },
  ],
  notes: [
    {
      id: 'parents-casual-formal',
      title: '아빠 / 엄마',
      explanation: '아빠 dan 엄마 sangat sering digunakan dalam percakapan sehari-hari di dalam keluarga. Dalam situasi yang lebih sopan atau formal, gunakan 아버지 untuk ayah dan 어머니 untuk ibu.',
      examples: [
        { korean: '아빠 / 아버지', indonesian: 'ayah / papa' },
        { korean: '엄마 / 어머니', indonesian: 'ibu / mama' },
      ],
    },
    {
      id: 'older-sibling-terms',
      title: '형, 오빠, 누나, 언니',
      explanation: 'Dalam bahasa Korea, panggilan untuk kakak bergantung pada jenis kelamin orang yang berbicara dan jenis kelamin orang yang lebih tua. Keempat kata ini digunakan untuk orang yang lebih tua. Untuk adik laki-laki gunakan 남동생 dan untuk adik perempuan gunakan 여동생; kata untuk adik tidak berubah berdasarkan jenis kelamin orang yang berbicara.',
      table: {
        headers: ['Yang berbicara', 'Orang yang lebih tua', 'Bahasa Korea'],
        rows: [
          ['Laki-laki', 'Laki-laki', '형'],
          ['Laki-laki', 'Perempuan', '누나'],
          ['Perempuan', 'Laki-laki', '오빠'],
          ['Perempuan', 'Perempuan', '언니'],
        ],
      },
      examples: [
        { korean: '저는 형이 한 명 있어요.', indonesian: 'Saya punya satu kakak laki-laki. Pembicaranya laki-laki.' },
        { korean: '저는 누나가 한 명 있어요.', indonesian: 'Saya punya satu kakak perempuan. Pembicaranya laki-laki.' },
        { korean: '저는 오빠가 한 명 있어요.', indonesian: 'Saya punya satu kakak laki-laki. Pembicaranya perempuan.' },
        { korean: '저는 언니가 한 명 있어요.', indonesian: 'Saya punya satu kakak perempuan. Pembicaranya perempuan.' },
      ],
    },
  ],
  introduction: {
    korean: [
      '저희 가족을 소개할게요.',
      '우리 가족은 모두 여섯 명이에요.',
      '저는 4남매 중에 셋째예요.',
      '형이 한 명 있고 누나가 한 명 있어요.',
      '그리고 남동생도 한 명 있어요.',
      '저희 가족은 사이가 아주 좋아요.',
    ],
    indonesian: [
      'Saya akan memperkenalkan keluarga saya.',
      'Keluarga saya terdiri dari enam orang.',
      'Saya anak ketiga dari empat bersaudara.',
      'Saya punya satu kakak laki-laki dan satu kakak perempuan.',
      'Dan saya juga punya satu adik laki-laki.',
      'Hubungan keluarga kami sangat akrab.',
    ],
  },
}
