import type { LessonSentence } from '@/data/lessons/types'

export type GrammarLevel = 'beginner' | 'intermediate' | 'advanced'
export type GrammarSectionType = 'rule' | 'exception' | 'usage-note'

export interface GrammarSection {
  id: string
  type: GrammarSectionType
  title: string
  explanation: string
  examples?: LessonSentence[]
}

export interface GrammarItem {
  id: string
  title: string
  summary: string
  explanation: string
  level: GrammarLevel
  category: string
  keywords: string[]
  examples: LessonSentence[]
  sections?: GrammarSection[]
  relatedGrammarIds?: string[]
}

export const grammarItems: GrammarItem[] = [
  {
    id: 'jeo-je',
    title: '저 / 제',
    summary: 'Menyatakan saya dan milik saya dengan sopan.',
    explanation: '저 berarti “saya” dan digunakan dalam situasi sopan.\n\n제 adalah bentuk singkat dari 저의 dan berarti “milik saya” atau digunakan seperti “… saya”.',
    level: 'beginner',
    category: 'pronoun',
    keywords: ['저', '제', 'saya', 'milik saya', 'kata ganti'],
    examples: [
      { korean: '저는 학생입니다.', indonesian: 'Saya seorang pelajar.' },
      { korean: '제 이름은 리나입니다.', indonesian: 'Nama saya Rina.' },
    ],
  },
  {
    id: 'imnida-imnikka',
    title: '~입니다 / ~입니까?',
    summary: 'Menyatakan atau menanyakan identitas dengan sopan.',
    explanation: '입니다 digunakan setelah kata benda untuk menyatakan “adalah / merupakan” dengan sopan.\n\n입니까? digunakan untuk membuat pertanyaan formal.\n\nDalam bahasa Korea, bentuk ini tidak dapat dihilangkan begitu saja.',
    level: 'beginner',
    category: 'expression',
    keywords: ['입니다', '입니까', 'adalah', 'pertanyaan formal'],
    examples: [
      { korean: '저는 회사원입니다.', indonesian: 'Saya seorang karyawan perusahaan.' },
      { korean: '선생님입니까?', indonesian: 'Apakah Anda seorang guru?' },
    ],
  },
  {
    id: 'particle-eseo',
    title: '~에서',
    summary: 'Menunjukkan tempat berlangsungnya kegiatan atau asal perpindahan.',
    explanation: '~에서 adalah partikel yang digunakan setelah nama tempat. Partikel ini menunjukkan tempat terjadinya suatu kegiatan atau tempat asal suatu perpindahan.',
    level: 'beginner',
    category: 'particle',
    keywords: ['에서', 'tempat', 'asal', 'partikel'],
    examples: [
      { korean: '인도네시아에서 왔습니다.', indonesian: 'Saya datang dari Indonesia.' },
      { korean: '학교에서 공부합니다.', indonesian: 'Saya belajar di sekolah.' },
      { korean: '회사에서 일합니다.', indonesian: 'Saya bekerja di perusahaan.' },
    ],
  },
  {
    id: 'particle-eul-reul',
    title: '~을/를',
    summary: 'Menunjukkan objek yang dikenai suatu tindakan.',
    explanation: '~을/를 adalah partikel yang menunjukkan objek dari suatu tindakan. Dengan kata lain, 을/를 menunjukkan “apa yang dikenai tindakan?”.',
    level: 'beginner',
    category: 'particle',
    keywords: ['을', '를', 'objek', 'batchim', 'partikel'],
    examples: [
      { korean: '한국어를 공부합니다.', indonesian: 'Belajar bahasa Korea.' },
      { korean: '밥을 먹습니다.', indonesian: 'Makan nasi.' },
      { korean: '책을 읽습니다.', indonesian: 'Membaca buku.' },
    ],
    sections: [
      {
        id: 'batchim',
        type: 'rule',
        title: 'Kata dengan batchim',
        explanation: 'Jika kata memiliki batchim (konsonan akhir), gunakan 을.',
        examples: [
          { korean: '밥 → 밥을', indonesian: '밥 memiliki batchim.' },
          { korean: '책 → 책을', indonesian: '책 memiliki batchim.' },
        ],
      },
      {
        id: 'no-batchim',
        type: 'rule',
        title: 'Kata tanpa batchim',
        explanation: 'Jika kata tidak memiliki batchim, gunakan 를.',
        examples: [
          { korean: '한국어 → 한국어를', indonesian: '한국어 tidak memiliki batchim.' },
          { korean: '커피 → 커피를', indonesian: '커피 tidak memiliki batchim.' },
        ],
      },
      {
        id: 'spoken-omission',
        type: 'exception',
        title: 'Penghilangan dalam percakapan',
        explanation: 'Dalam percakapan sehari-hari, 을/를 terkadang dihilangkan jika objeknya sudah jelas dari konteks.',
        examples: [
          { korean: '밥 먹었어요?', indonesian: 'Sudah makan?' },
        ],
      },
    ],
  },
  {
    id: 'progressive-go-itsseumnida',
    title: '~고 있습니다',
    summary: 'Menyatakan kegiatan yang sedang dilakukan atau berlangsung.',
    explanation: '~고 있습니다 digunakan setelah kata kerja untuk menyatakan kegiatan yang sedang dilakukan atau masih berlangsung. Bentuk ini digunakan dalam situasi yang sopan dan formal.',
    level: 'beginner',
    category: 'expression',
    keywords: ['고 있습니다', 'sedang', 'kegiatan', 'progresif'],
    examples: [
      { korean: '공부하고 있습니다.', indonesian: 'Sedang belajar.' },
      { korean: '일하고 있습니다.', indonesian: 'Sedang bekerja.' },
    ],
  },
]

export function getGrammarById(id: string) {
  return grammarItems.find((grammar) => grammar.id === id)
}
