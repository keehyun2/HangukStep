import type { LessonSentence } from '@/data/lessons/types'
import rawEpsGrammarItems from '@/data/grammar/eps-grammar.json'

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
  koreanExplanation?: string
  epsLesson?: number
  sourceSequence?: number
  courseTags?: string[]
}

const curatedGrammarItems: GrammarItem[] = [
  {
    id: 'jeo-je',
    title: '저 / 제',
    summary: 'Menyatakan saya dan milik saya dengan sopan.',
    explanation: '저 berarti “saya” dan digunakan dalam situasi sopan.\n\n제 adalah bentuk singkat dan sopan dari 저의. Artinya “milik saya” dan biasanya dipakai sebelum kata benda untuk menunjukkan bahwa sesuatu itu milik atau berhubungan dengan diri sendiri.\n\nDalam percakapan sehari-hari, orang Korea biasanya lebih sering memakai 제 daripada 저의.',
    level: 'beginner',
    category: 'pronoun',
    keywords: ['저', '제', 'saya', 'milik saya', 'kata ganti'],
    examples: [
      { korean: '저는 학생입니다.', indonesian: 'Saya seorang pelajar.' },
      { korean: '제 이름은 리나입니다.', indonesian: 'Nama saya Rina.' },
      { korean: '제 친구입니다.', indonesian: 'Dia teman saya.' },
      { korean: '제 학교입니다.', indonesian: 'Itu sekolah saya.' },
      { korean: '제 가방입니다.', indonesian: 'Itu tas saya.' },
    ],
    sections: [
      {
        id: 'comparison',
        type: 'rule',
        title: 'Perbedaan 저 dan 제',
        explanation: '저 berarti “saya”, sedangkan 제 berarti “milik saya”. Secara tata bahasa, 저의 disingkat menjadi 제.',
        examples: [
          { korean: '저는 학생입니다.', indonesian: 'Saya seorang siswa.' },
          { korean: '제 이름은 아디입니다.', indonesian: 'Nama saya Adi.' },
        ],
      },
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
      { korean: '저는 학생입니다.', indonesian: 'Saya seorang siswa.' },
      { korean: '선생님입니까?', indonesian: 'Apakah Anda seorang guru?' },
      { korean: '회사원입니까?', indonesian: 'Apakah Anda seorang karyawan?' },
    ],
  },
  {
    id: 'particle-eun-neun',
    title: '~은/는',
    summary: 'Menunjukkan topik yang sedang dibicarakan.',
    explanation: '은/는 adalah partikel yang menunjukkan topik yang sedang dibicarakan.\n\nKalau kata sebelumnya memiliki batchim (받침), gunakan 은. Kalau tidak ada batchim, gunakan 는.',
    level: 'beginner',
    category: 'particle',
    keywords: ['은', '는', 'topik', 'batchim', 'partikel'],
    examples: [
      { korean: '저는 학생입니다.', indonesian: 'Saya seorang siswa.' },
      { korean: '저는 인도네시아 사람입니다.', indonesian: 'Saya orang Indonesia.' },
      { korean: '이름은 아디입니다.', indonesian: 'Namanya Adi.' },
      { korean: '직업은 회사원입니다.', indonesian: 'Pekerjaannya adalah karyawan.' },
    ],
    sections: [
      {
        id: 'no-batchim',
        type: 'rule',
        title: 'Kata tanpa batchim',
        explanation: 'Jika kata sebelumnya tidak memiliki batchim, gunakan 는.',
        examples: [{ korean: '저 → 저는', indonesian: '저 tidak memiliki batchim.' }],
      },
      {
        id: 'batchim',
        type: 'rule',
        title: 'Kata dengan batchim',
        explanation: 'Jika kata sebelumnya memiliki batchim, gunakan 은.',
        examples: [{ korean: '이름 → 이름은', indonesian: '이름 memiliki batchim.' }],
      },
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
  {
    id: 'counter-myeong',
    title: '명',
    summary: 'Kata satuan yang digunakan untuk menghitung orang.',
    explanation: '명 adalah kata satuan yang digunakan untuk menghitung orang. Saat angka Korea digunakan bersama 명, beberapa bentuk angka berubah.',
    level: 'beginner',
    category: 'counter',
    keywords: ['명', 'orang', 'menghitung orang', '한 명', '두 명'],
    examples: [
      { korean: '한 명', indonesian: 'satu orang' },
      { korean: '두 명', indonesian: 'dua orang' },
      { korean: '세 명', indonesian: 'tiga orang' },
      { korean: '네 명', indonesian: 'empat orang' },
      { korean: '우리 가족은 모두 여섯 명이에요.', indonesian: 'Keluarga saya terdiri dari enam orang.' },
    ],
    sections: [
      {
        id: 'number-changes',
        type: 'rule',
        title: 'Perubahan bentuk angka',
        explanation: '하나, 둘, 셋, 넷 berubah bentuk ketika digunakan sebelum 명.',
        examples: [
          { korean: '하나 → 한 명', indonesian: 'satu orang' },
          { korean: '둘 → 두 명', indonesian: 'dua orang' },
          { korean: '셋 → 세 명', indonesian: 'tiga orang' },
          { korean: '넷 → 네 명', indonesian: 'empat orang' },
        ],
      },
    ],
  },
]

const importedGrammarItems = rawEpsGrammarItems as GrammarItem[]
const canonicalIdBySourceSequence: Record<number, string> = {
  1: 'imnida-imnikka',
  2: 'particle-eun-neun',
  8: 'particle-eul-reul',
  12: 'particle-eseo',
  39: 'progressive-go-itsseumnida',
}

const mergedCuratedItems = curatedGrammarItems.map((item) => {
  const sourceSequence = Object.entries(canonicalIdBySourceSequence)
    .find(([, canonicalId]) => canonicalId === item.id)?.[0]
  const imported = sourceSequence
    ? importedGrammarItems.find((candidate) => candidate.sourceSequence === Number(sourceSequence))
    : undefined

  if (!imported) return item
  return {
    ...imported,
    ...item,
    koreanExplanation: imported.koreanExplanation,
    epsLesson: imported.epsLesson,
    sourceSequence: imported.sourceSequence,
    courseTags: imported.courseTags,
    keywords: [...new Set([...imported.keywords, ...item.keywords])],
  }
})

const standaloneImportedItems = importedGrammarItems.filter(
  (item) => !canonicalIdBySourceSequence[item.sourceSequence ?? -1],
)

export const grammarItems: GrammarItem[] = [...mergedCuratedItems, ...standaloneImportedItems]

export function getGrammarById(id: string) {
  return grammarItems.find((grammar) => grammar.id === id)
}
