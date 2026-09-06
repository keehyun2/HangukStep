export type CourseStatus = 'available' | 'coming-soon'

export interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  status: CourseStatus
}

export const courses: Course[] = [
  {
    id: 'daily',
    title: 'Belajar Harian',
    subtitle: '데일리 학습',
    description: 'Pelajaran singkat untuk membangun kebiasaan belajar bahasa Korea setiap hari.',
    status: 'available',
  },
  {
    id: 'basic',
    title: 'Belajar Dasar',
    subtitle: '기본 공부',
    description: 'Mulai dari kosakata, kalimat, dan tata bahasa yang digunakan sehari-hari.',
    status: 'available',
  },
  {
    id: 'topik-1',
    title: 'TOPIK I',
    subtitle: '한국어능력시험 초급',
    description: 'Persiapan menyimak dan membaca untuk ujian TOPIK I.',
    status: 'coming-soon',
  },
  {
    id: 'eps-topik',
    title: 'EPS-TOPIK',
    subtitle: '고용허가제 한국어능력시험',
    description: 'Bahasa Korea untuk pekerjaan, kehidupan, dan persiapan EPS-TOPIK.',
    status: 'coming-soon',
  },
]
