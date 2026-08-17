export type CourseStatus = 'available' | 'coming-soon'

export interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  status: CourseStatus
  lessonCount: number
}

export interface VocabularyWord {
  id: string
  korean: string
  meaning: string
}

export interface LessonSentence {
  korean: string
  indonesian: string
}

export interface GrammarItem {
  id: string
  title: string
  summary: string
  explanation: string
  examples: LessonSentence[]
}

export const courses: Course[] = [
  {
    id: 'basic',
    title: 'Belajar Dasar',
    subtitle: '기본 공부',
    description: 'Mulai dari kosakata, kalimat, dan tata bahasa yang digunakan sehari-hari.',
    status: 'available',
    lessonCount: 1,
  },
  {
    id: 'topik-1',
    title: 'TOPIK I',
    subtitle: '한국어능력시험 초급',
    description: 'Persiapan menyimak dan membaca untuk ujian TOPIK I.',
    status: 'coming-soon',
    lessonCount: 0,
  },
  {
    id: 'eps-topik',
    title: 'EPS-TOPIK',
    subtitle: '고용허가제 한국어능력시험',
    description: 'Bahasa Korea untuk pekerjaan, kehidupan, dan persiapan EPS-TOPIK.',
    status: 'coming-soon',
    lessonCount: 0,
  },
]

export const lessonOneVocabulary: VocabularyWord[] = [
  { id: 'hello', korean: '안녕하세요', meaning: 'halo' },
  { id: 'name', korean: '이름', meaning: 'nama' },
  { id: 'person', korean: '사람', meaning: 'orang' },
  { id: 'imnida', korean: '~입니다', meaning: 'adalah / merupakan (bentuk sopan)' },
  { id: 'i-formal', korean: '저', meaning: 'saya (bentuk sopan)' },
  { id: 'student', korean: '학생', meaning: 'pelajar / siswa' },
  { id: 'teacher', korean: '선생님', meaning: 'guru' },
  { id: 'office-worker', korean: '회사원', meaning: 'karyawan perusahaan' },
  { id: 'bank-worker', korean: '은행원', meaning: 'pegawai bank' },
  { id: 'police', korean: '경찰', meaning: 'polisi' },
  { id: 'firefighter', korean: '소방관', meaning: 'pemadam kebakaran' },
  { id: 'korea', korean: '한국', meaning: 'Korea' },
  { id: 'indonesia', korean: '인도네시아', meaning: 'Indonesia' },
  { id: 'vietnam', korean: '베트남', meaning: 'Vietnam' },
  { id: 'cambodia', korean: '캄보디아', meaning: 'Kamboja' },
  { id: 'uzbekistan', korean: '우즈베키스탄', meaning: 'Uzbekistan' },
  { id: 'philippines', korean: '필리핀', meaning: 'Filipina' },
  { id: 'china', korean: '중국', meaning: 'Tiongkok' },
  { id: 'usa', korean: '미국', meaning: 'Amerika Serikat' },
  { id: 'pakistan', korean: '파키스탄', meaning: 'Pakistan' },
  { id: 'nepal', korean: '네팔', meaning: 'Nepal' },
]

export const lessonOneSentences: LessonSentence[] = [
  { korean: '제 이름은 리나입니다.', indonesian: 'Nama saya Rina.' },
  { korean: '저는 인도네시아 사람입니다.', indonesian: 'Saya orang Indonesia.' },
  { korean: '저는 학생입니다.', indonesian: 'Saya seorang pelajar.' },
  { korean: '만나서 반갑습니다.', indonesian: 'Senang bertemu dengan Anda.' },
]

export const grammarItems: GrammarItem[] = [
  {
    id: 'jeo-je',
    title: '저 / 제',
    summary: 'Menyatakan saya dan milik saya dengan sopan.',
    explanation: '저 berarti “saya” dan digunakan dalam situasi sopan.\n\n제 adalah bentuk singkat dari 저의 dan berarti “milik saya” atau digunakan seperti “… saya”.',
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
    examples: [
      { korean: '저는 회사원입니다.', indonesian: 'Saya seorang karyawan perusahaan.' },
      { korean: '선생님입니까?', indonesian: 'Apakah Anda seorang guru?' },
    ],
  },
]
