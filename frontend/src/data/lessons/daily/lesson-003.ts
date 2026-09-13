import type { Lesson } from '@/data/lessons/types'

export const dailyLessonThree: Lesson = {
  id: 'daily-003',
  courseId: 'daily',
  lessonNumber: 3,
  status: 'published',
  format: 'daily',
  title: '친구를 소개해요',
  subtitle: 'Memperkenalkan teman',
  dailyIntro: 'Dengarkan percakapan Adi dan Sujin saat mereka berbicara tentang Rina. Tidak perlu memahami semuanya pada kali pertama.',
  audio: {
    id: 'daily-003-friend-introduction',
    src: '/audio/daily/lesson-003/friend-introduction.mp3',
    transcript: [
      '이분은 누구예요?',
      '제 친구예요. 이름은 리나예요.',
      '리나 씨는 학생이에요?',
      '아니요, 학생이 아닙니다. 회사원이에요.',
      '한국 사람이에요?',
      '아니요. 인도네시아 사람이에요.',
    ],
  },
  vocabulary: [
    { id: 'daily-003-elementary-student', korean: '초등학생', pronunciation: '[초등학쌩]', meaning: 'siswa SD' },
    { id: 'daily-003-middle-school-student', korean: '중학생', pronunciation: '[중학쌩]', meaning: 'siswa SMP' },
    { id: 'daily-003-high-school-student', korean: '고등학생', pronunciation: '[고등학쌩]', meaning: 'siswa SMA' },
    { id: 'daily-003-university-student', korean: '대학생', pronunciation: '[대학쌩]', meaning: 'mahasiswa' },
    { id: 'daily-003-doctor', korean: '의사', pronunciation: '[의사 / 이사]', meaning: 'dokter' },
    { id: 'daily-003-teacher', korean: '선생님', pronunciation: '[선생님]', meaning: 'guru' },
    { id: 'daily-003-friend', korean: '친구', pronunciation: '[친구]', meaning: 'teman' },
    { id: 'daily-003-office-worker', korean: '회사원', pronunciation: '[회사원]', meaning: 'pegawai kantor' },
    { id: 'daily-003-occupation', korean: '직업', pronunciation: '[지겁]', meaning: 'pekerjaan / profesi' },
    { id: 'daily-003-student', korean: '학생', pronunciation: '[학쌩]', meaning: 'pelajar / siswa' },
  ],
  sentences: [
    { korean: '아디: 이분은 누구예요?', pronunciation: '[이부는 누구예요?]', indonesian: 'Adi: Siapa orang ini?' },
    { korean: '수진: 제 친구예요. 이름은 리나예요.', pronunciation: '[제 친구예요. 이르믄 리나예요.]', indonesian: 'Sujin: Dia teman saya. Namanya Rina.' },
    { korean: '아디: 리나 씨는 학생이에요?', pronunciation: '[리나 씨는 학쌩이에요?]', indonesian: 'Adi: Rina seorang pelajar?' },
    { korean: '수진: 아니요, 학생이 아닙니다. 회사원이에요.', pronunciation: '[아니요, 학쌩이 아님니다. 회사워니에요.]', indonesian: 'Sujin: Bukan, dia bukan pelajar. Dia seorang pegawai kantor.' },
    { korean: '아디: 한국 사람이에요?', pronunciation: '[한꾹 싸라미에요?]', indonesian: 'Adi: Dia orang Korea?' },
    { korean: '수진: 아니요. 인도네시아 사람이에요.', pronunciation: '[아니요. 인도네시아 싸라미에요.]', indonesian: 'Sujin: Bukan. Dia orang Indonesia.' },
  ],
  grammarSections: [
    { grammarId: 'eps-grammar-003', mode: 'introduction' },
    { grammarId: 'eps-grammar-004', mode: 'introduction', lessonNote: '아닙니다 adalah bentuk yang lebih formal, sedangkan 아니에요 lebih sering digunakan dalam percakapan sehari-hari.' },
  ],
  notes: [
    {
      id: 'daily-003-vocabulary-examples',
      title: 'Contoh kosakata',
      explanation: 'Gunakan kosakata pekerjaan dan pelajar bersama 이에요 atau 예요 untuk memperkenalkan seseorang.',
      examples: [
        { korean: '저는 대학생이에요.', indonesian: 'Saya seorang mahasiswa.' },
        { korean: '제 친구는 고등학생이에요.', indonesian: 'Teman saya adalah siswa SMA.' },
        { korean: '수진 씨는 의사예요.', indonesian: 'Sujin adalah seorang dokter.' },
        { korean: '아디 씨는 회사원이에요.', indonesian: 'Adi adalah seorang pegawai kantor.' },
        { korean: '제 직업은 선생님이에요.', indonesian: 'Pekerjaan saya adalah guru.' },
      ],
    },
    {
      id: 'daily-003-ssi-nim',
      title: '~씨 / ~님',
      explanation: '씨 digunakan setelah nama seseorang yang usianya hampir sama atau memiliki hubungan setara. 님 menunjukkan rasa hormat yang lebih tinggi dan sering digunakan setelah jabatan, nama pelanggan, atau nama pengguna. 씨 biasanya tidak digunakan kepada orang yang lebih tua atau berkedudukan lebih tinggi. Nama keluarga saja + 씨 juga dapat terdengar kurang sopan.',
      table: {
        headers: ['Ekspresi', 'Situasi', 'Contoh'],
        rows: [
          ['씨', 'Usia hampir sama atau hubungan setara', '수진 씨'],
          ['님', 'Jabatan, pelanggan, pengguna aplikasi', '고객님 / 선생님'],
        ],
      },
      examples: [
        { korean: '리나 씨는 학생이에요?', indonesian: 'Rina seorang pelajar?' },
        { korean: '아디 님, 안녕하세요.', indonesian: 'Halo, Adi.' },
        { korean: '김수진 씨 / 수진 씨', indonesian: 'Lebih wajar daripada hanya memanggil 김 씨.' },
      ],
    },
  ],
  introduction: {
    korean: [
      '이분은 누구예요?',
      '제 친구예요. 이름은 리나예요.',
      '리나 씨는 학생이에요?',
      '아니요, 학생이 아닙니다. 회사원이에요.',
      '한국 사람이에요?',
      '아니요. 인도네시아 사람이에요.',
    ],
    indonesian: [
      'Siapa orang ini?',
      'Dia teman saya. Namanya Rina.',
      'Rina seorang pelajar?',
      'Bukan, dia bukan pelajar. Dia seorang pegawai kantor.',
      'Dia orang Korea?',
      'Bukan. Dia orang Indonesia.',
    ],
  },
}
