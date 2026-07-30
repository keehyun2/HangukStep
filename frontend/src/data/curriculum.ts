export interface VocabularyWord {
  number: number
  korean: string
  meaning: string
}

export interface CurriculumDay {
  day: number
  title: string
  isReview: boolean
  words: VocabularyWord[]
}

export const curriculum: CurriculumDay[] = [
  {
    "day": 1,
    "title": "인사와 자기소개",
    "isReview": false,
    "words": [
      {
        "number": 1,
        "korean": "안녕하세요",
        "meaning": "halo"
      },
      {
        "number": 2,
        "korean": "저",
        "meaning": "saya"
      },
      {
        "number": 3,
        "korean": "이름",
        "meaning": "nama"
      },
      {
        "number": 4,
        "korean": "사람",
        "meaning": "orang"
      },
      {
        "number": 5,
        "korean": "한국",
        "meaning": "Korea"
      },
      {
        "number": 6,
        "korean": "인도네시아",
        "meaning": "Indonesia"
      },
      {
        "number": 7,
        "korean": "한국사람",
        "meaning": "orang Korea"
      },
      {
        "number": 8,
        "korean": "인도네시아사람",
        "meaning": "orang Indonesia"
      },
      {
        "number": 9,
        "korean": "학생",
        "meaning": "pelajar / siswa"
      },
      {
        "number": 10,
        "korean": "선생님",
        "meaning": "guru"
      }
    ]
  },
  {
    "day": 2,
    "title": "기본 관계와 직업",
    "isReview": false,
    "words": [
      {
        "number": 11,
        "korean": "친구",
        "meaning": "teman"
      },
      {
        "number": 12,
        "korean": "가족",
        "meaning": "keluarga"
      },
      {
        "number": 13,
        "korean": "소방관",
        "meaning": "pemadam"
      },
      {
        "number": 14,
        "korean": "직원",
        "meaning": "karyawan"
      },
      {
        "number": 15,
        "korean": "의사",
        "meaning": "dokter"
      },
      {
        "number": 16,
        "korean": "간호사",
        "meaning": "perawat"
      },
      {
        "number": 17,
        "korean": "요리사",
        "meaning": "koki"
      },
      {
        "number": 18,
        "korean": "경찰",
        "meaning": "polisi"
      },
      {
        "number": 19,
        "korean": "가수",
        "meaning": "penyanyi"
      },
      {
        "number": 20,
        "korean": "남자배우/여자배우",
        "meaning": "aktor / aktris"
      }
    ]
  },
  {
    "day": 3,
    "title": "기본 인사 표현",
    "isReview": false,
    "words": [
      {
        "number": 21,
        "korean": "감사합니다",
        "meaning": "terima kasih"
      },
      {
        "number": 22,
        "korean": "죄송합니다",
        "meaning": "maaf"
      },
      {
        "number": 23,
        "korean": "괜찮아요",
        "meaning": "tidak apa-apa"
      },
      {
        "number": 24,
        "korean": "반갑습니다",
        "meaning": "Senang bertemu."
      },
      {
        "number": 25,
        "korean": "네",
        "meaning": "ya"
      },
      {
        "number": 26,
        "korean": "아니요",
        "meaning": "tidak / bukan"
      },
      {
        "number": 27,
        "korean": "안녕히 가세요",
        "meaning": "selamat jalan"
      },
      {
        "number": 28,
        "korean": "안녕히 계세요",
        "meaning": "selamat tinggal"
      },
      {
        "number": 29,
        "korean": "처음",
        "meaning": "pertama kali"
      },
      {
        "number": 30,
        "korean": "다음",
        "meaning": "berikutnya"
      }
    ]
  },
  {
    "day": 4,
    "title": "기본 질문",
    "isReview": false,
    "words": [
      {
        "number": 31,
        "korean": "무엇",
        "meaning": "apa"
      },
      {
        "number": 32,
        "korean": "누구",
        "meaning": "siapa"
      },
      {
        "number": 33,
        "korean": "어디",
        "meaning": "di mana"
      },
      {
        "number": 34,
        "korean": "언제",
        "meaning": "kapan"
      },
      {
        "number": 35,
        "korean": "왜",
        "meaning": "mengapa / kenapa"
      },
      {
        "number": 36,
        "korean": "어떻게",
        "meaning": "bagaimana"
      },
      {
        "number": 37,
        "korean": "어느",
        "meaning": "yang mana"
      },
      {
        "number": 38,
        "korean": "몇",
        "meaning": "berapa"
      },
      {
        "number": 39,
        "korean": "맞다",
        "meaning": "benar"
      },
      {
        "number": 40,
        "korean": "모르다",
        "meaning": "tidak tahu"
      }
    ]
  },
  {
    "day": 5,
    "title": "복습",
    "isReview": true,
    "words": []
  },
  {
    "day": 6,
    "title": "고유어 숫자",
    "isReview": false,
    "words": [
      {
        "number": 41,
        "korean": "1",
        "meaning": "satu"
      },
      {
        "number": 42,
        "korean": "2",
        "meaning": "dua"
      },
      {
        "number": 43,
        "korean": "3",
        "meaning": "tiga"
      },
      {
        "number": 44,
        "korean": "4",
        "meaning": "empat"
      },
      {
        "number": 45,
        "korean": "5",
        "meaning": "lima"
      },
      {
        "number": 46,
        "korean": "6",
        "meaning": "enam"
      },
      {
        "number": 47,
        "korean": "7",
        "meaning": "tujuh"
      },
      {
        "number": 48,
        "korean": "8",
        "meaning": "delapan"
      },
      {
        "number": 49,
        "korean": "9",
        "meaning": "sembilan"
      },
      {
        "number": 50,
        "korean": "10",
        "meaning": "sepuluh"
      }
    ]
  },
  {
    "day": 7,
    "title": "가족",
    "isReview": false,
    "words": [
      {
        "number": 51,
        "korean": "부모님",
        "meaning": "orang tua"
      },
      {
        "number": 52,
        "korean": "아버지",
        "meaning": "ayah"
      },
      {
        "number": 53,
        "korean": "어머니",
        "meaning": "ibu"
      },
      {
        "number": 54,
        "korean": "형",
        "meaning": "kakak laki-laki bagi laki-laki"
      },
      {
        "number": 55,
        "korean": "오빠",
        "meaning": "kakak laki-laki bagi perempuan"
      },
      {
        "number": 56,
        "korean": "누나",
        "meaning": "kakak perempuan bagi laki-laki"
      },
      {
        "number": 57,
        "korean": "언니",
        "meaning": "kakak perempuan bagi perempuan"
      },
      {
        "number": 58,
        "korean": "동생",
        "meaning": "adik"
      },
      {
        "number": 59,
        "korean": "아들",
        "meaning": "anak laki-laki"
      },
      {
        "number": 60,
        "korean": "딸",
        "meaning": "anak perempuan"
      }
    ]
  },
  {
    "day": 8,
    "title": "음식",
    "isReview": false,
    "words": [
      {
        "number": 61,
        "korean": "밥",
        "meaning": "nasi / makanan"
      },
      {
        "number": 62,
        "korean": "물",
        "meaning": "air"
      },
      {
        "number": 63,
        "korean": "빵",
        "meaning": "roti"
      },
      {
        "number": 64,
        "korean": "우유",
        "meaning": "susu"
      },
      {
        "number": 65,
        "korean": "커피",
        "meaning": "kopi"
      },
      {
        "number": 66,
        "korean": "고기",
        "meaning": "daging"
      },
      {
        "number": 67,
        "korean": "생선",
        "meaning": "ikan"
      },
      {
        "number": 68,
        "korean": "과일",
        "meaning": "buah"
      },
      {
        "number": 69,
        "korean": "채소",
        "meaning": "sayuran"
      },
      {
        "number": 70,
        "korean": "김치",
        "meaning": "kimchi"
      }
    ]
  },
  {
    "day": 9,
    "title": "식사 동작과 맛",
    "isReview": false,
    "words": [
      {
        "number": 71,
        "korean": "먹다",
        "meaning": "makan"
      },
      {
        "number": 72,
        "korean": "마시다",
        "meaning": "minum"
      },
      {
        "number": 73,
        "korean": "맛있다",
        "meaning": "enak"
      },
      {
        "number": 74,
        "korean": "맛없다",
        "meaning": "tidak enak"
      },
      {
        "number": 75,
        "korean": "맵다",
        "meaning": "pedas"
      },
      {
        "number": 76,
        "korean": "달다",
        "meaning": "manis"
      },
      {
        "number": 77,
        "korean": "짜다",
        "meaning": "asin"
      },
      {
        "number": 78,
        "korean": "뜨겁다",
        "meaning": "panas"
      },
      {
        "number": 79,
        "korean": "차갑다",
        "meaning": "dingin"
      },
      {
        "number": 80,
        "korean": "배고프다",
        "meaning": "lapar"
      }
    ]
  },
  {
    "day": 10,
    "title": "복습",
    "isReview": true,
    "words": []
  },
  {
    "day": 11,
    "title": "학교와 공부",
    "isReview": false,
    "words": [
      {
        "number": 81,
        "korean": "학교",
        "meaning": "sekolah"
      },
      {
        "number": 82,
        "korean": "교실",
        "meaning": "ruang kelas"
      },
      {
        "number": 83,
        "korean": "책",
        "meaning": "buku"
      },
      {
        "number": 84,
        "korean": "공책",
        "meaning": "buku tulis"
      },
      {
        "number": 85,
        "korean": "연필",
        "meaning": "pensil"
      },
      {
        "number": 86,
        "korean": "지우개",
        "meaning": "penghapus"
      },
      {
        "number": 87,
        "korean": "문제",
        "meaning": "soal"
      },
      {
        "number": 88,
        "korean": "시험",
        "meaning": "ujian"
      },
      {
        "number": 89,
        "korean": "공부하다",
        "meaning": "belajar"
      },
      {
        "number": 90,
        "korean": "배우다",
        "meaning": "mempelajari"
      }
    ]
  },
  {
    "day": 12,
    "title": "집",
    "isReview": false,
    "words": [
      {
        "number": 91,
        "korean": "집",
        "meaning": "rumah"
      },
      {
        "number": 92,
        "korean": "방",
        "meaning": "kamar"
      },
      {
        "number": 93,
        "korean": "거실",
        "meaning": "ruang tamu"
      },
      {
        "number": 94,
        "korean": "부엌",
        "meaning": "dapur"
      },
      {
        "number": 95,
        "korean": "화장실",
        "meaning": "kamar mandi"
      },
      {
        "number": 96,
        "korean": "침대",
        "meaning": "tempat tidur"
      },
      {
        "number": 97,
        "korean": "의자",
        "meaning": "kursi"
      },
      {
        "number": 98,
        "korean": "책상",
        "meaning": "meja belajar"
      },
      {
        "number": 99,
        "korean": "문",
        "meaning": "pintu"
      },
      {
        "number": 100,
        "korean": "창문",
        "meaning": "jendela"
      }
    ]
  },
  {
    "day": 13,
    "title": "날짜와 시간",
    "isReview": false,
    "words": [
      {
        "number": 101,
        "korean": "오늘",
        "meaning": "hari ini"
      },
      {
        "number": 102,
        "korean": "어제",
        "meaning": "kemarin"
      },
      {
        "number": 103,
        "korean": "내일",
        "meaning": "besok"
      },
      {
        "number": 104,
        "korean": "아침",
        "meaning": "pagi"
      },
      {
        "number": 105,
        "korean": "점심",
        "meaning": "siang"
      },
      {
        "number": 106,
        "korean": "저녁",
        "meaning": "malam"
      },
      {
        "number": 107,
        "korean": "지금",
        "meaning": "sekarang"
      },
      {
        "number": 108,
        "korean": "시간",
        "meaning": "waktu"
      },
      {
        "number": 109,
        "korean": "시",
        "meaning": "jam"
      },
      {
        "number": 110,
        "korean": "분",
        "meaning": "menit"
      }
    ]
  },
  {
    "day": 14,
    "title": "요일과 주기",
    "isReview": false,
    "words": [
      {
        "number": 111,
        "korean": "월요일",
        "meaning": "hari Senin"
      },
      {
        "number": 112,
        "korean": "화요일",
        "meaning": "hari Selasa"
      },
      {
        "number": 113,
        "korean": "수요일",
        "meaning": "hari Rabu"
      },
      {
        "number": 114,
        "korean": "목요일",
        "meaning": "hari Kamis"
      },
      {
        "number": 115,
        "korean": "금요일",
        "meaning": "hari Jumat"
      },
      {
        "number": 116,
        "korean": "토요일",
        "meaning": "hari Sabtu"
      },
      {
        "number": 117,
        "korean": "일요일",
        "meaning": "hari Minggu"
      },
      {
        "number": 118,
        "korean": "주말",
        "meaning": "akhir pekan"
      },
      {
        "number": 119,
        "korean": "매일",
        "meaning": "setiap hari"
      },
      {
        "number": 120,
        "korean": "자주",
        "meaning": "sering"
      }
    ]
  },
  {
    "day": 15,
    "title": "복습",
    "isReview": true,
    "words": []
  },
  {
    "day": 16,
    "title": "장소",
    "isReview": false,
    "words": [
      {
        "number": 121,
        "korean": "회사",
        "meaning": "perusahaan / kantor"
      },
      {
        "number": 122,
        "korean": "병원",
        "meaning": "rumah sakit"
      },
      {
        "number": 123,
        "korean": "은행",
        "meaning": "bank"
      },
      {
        "number": 124,
        "korean": "시장",
        "meaning": "pasar"
      },
      {
        "number": 125,
        "korean": "관공서",
        "meaning": "kantor pemerintahan"
      },
      {
        "number": 126,
        "korean": "편의점",
        "meaning": "minimarket"
      },
      {
        "number": 127,
        "korean": "식당",
        "meaning": "restoran"
      },
      {
        "number": 128,
        "korean": "우체국",
        "meaning": "kantor pos"
      },
      {
        "number": 129,
        "korean": "공원",
        "meaning": "taman"
      },
      {
        "number": 130,
        "korean": "도서관",
        "meaning": "perpustakaan"
      }
    ]
  },
  {
    "day": 17,
    "title": "교통",
    "isReview": false,
    "words": [
      {
        "number": 131,
        "korean": "버스",
        "meaning": "bus"
      },
      {
        "number": 132,
        "korean": "지하철",
        "meaning": "kereta bawah tanah"
      },
      {
        "number": 133,
        "korean": "택시",
        "meaning": "taksi"
      },
      {
        "number": 134,
        "korean": "자동차",
        "meaning": "mobil"
      },
      {
        "number": 135,
        "korean": "기차",
        "meaning": "kereta api"
      },
      {
        "number": 136,
        "korean": "비행기",
        "meaning": "pesawat"
      },
      {
        "number": 137,
        "korean": "역",
        "meaning": "stasiun"
      },
      {
        "number": 138,
        "korean": "공항",
        "meaning": "bandara"
      },
      {
        "number": 139,
        "korean": "정류장",
        "meaning": "halte"
      },
      {
        "number": 140,
        "korean": "표",
        "meaning": "tiket"
      }
    ]
  },
  {
    "day": 18,
    "title": "기본 동작",
    "isReview": false,
    "words": [
      {
        "number": 141,
        "korean": "가다",
        "meaning": "pergi"
      },
      {
        "number": 142,
        "korean": "오다",
        "meaning": "datang"
      },
      {
        "number": 143,
        "korean": "보다",
        "meaning": "melihat / menonton"
      },
      {
        "number": 144,
        "korean": "듣다",
        "meaning": "mendengar"
      },
      {
        "number": 145,
        "korean": "말하다",
        "meaning": "berbicara / mengatakan"
      },
      {
        "number": 146,
        "korean": "읽다",
        "meaning": "membaca"
      },
      {
        "number": 147,
        "korean": "쓰다",
        "meaning": "menulis"
      },
      {
        "number": 148,
        "korean": "자다",
        "meaning": "tidur"
      },
      {
        "number": 149,
        "korean": "일어나다",
        "meaning": "bangun"
      },
      {
        "number": 150,
        "korean": "쉬다",
        "meaning": "beristirahat"
      }
    ]
  },
  {
    "day": 19,
    "title": "기본 상태",
    "isReview": false,
    "words": [
      {
        "number": 151,
        "korean": "좋다",
        "meaning": "baik / bagus"
      },
      {
        "number": 152,
        "korean": "나쁘다",
        "meaning": "buruk / jelek"
      },
      {
        "number": 153,
        "korean": "크다",
        "meaning": "besar"
      },
      {
        "number": 154,
        "korean": "작다",
        "meaning": "kecil"
      },
      {
        "number": 155,
        "korean": "많다",
        "meaning": "banyak"
      },
      {
        "number": 156,
        "korean": "적다",
        "meaning": "sedikit"
      },
      {
        "number": 157,
        "korean": "빠르다",
        "meaning": "cepat"
      },
      {
        "number": 158,
        "korean": "느리다",
        "meaning": "lambat"
      },
      {
        "number": 159,
        "korean": "쉽다",
        "meaning": "mudah"
      },
      {
        "number": 160,
        "korean": "어렵다",
        "meaning": "sulit"
      }
    ]
  },
  {
    "day": 20,
    "title": "종합 복습",
    "isReview": true,
    "words": []
  },
  {
    "day": 21,
    "title": "식당 이용",
    "isReview": false,
    "words": [
      {
        "number": 161,
        "korean": "메뉴",
        "meaning": "menu"
      },
      {
        "number": 162,
        "korean": "주문",
        "meaning": "pesanan"
      },
      {
        "number": 163,
        "korean": "주문하다",
        "meaning": "memesan"
      },
      {
        "number": 164,
        "korean": "계산",
        "meaning": "pembayaran / perhitungan"
      },
      {
        "number": 165,
        "korean": "계산하다",
        "meaning": "membayar / menghitung"
      },
      {
        "number": 166,
        "korean": "숟가락",
        "meaning": "sendok"
      },
      {
        "number": 167,
        "korean": "젓가락",
        "meaning": "sumpit"
      },
      {
        "number": 168,
        "korean": "포크",
        "meaning": "garpu"
      },
      {
        "number": 169,
        "korean": "접시",
        "meaning": "piring"
      },
      {
        "number": 170,
        "korean": "컵",
        "meaning": "gelas"
      },
      {
        "number": 171,
        "korean": "반찬",
        "meaning": "lauk"
      },
      {
        "number": 172,
        "korean": "국",
        "meaning": "kuah"
      },
      {
        "number": 173,
        "korean": "주다",
        "meaning": "memberi"
      },
      {
        "number": 174,
        "korean": "받다",
        "meaning": "mendapat"
      },
      {
        "number": 175,
        "korean": "조금",
        "meaning": "sedikit"
      }
    ]
  },
  {
    "day": 22,
    "title": "쇼핑",
    "isReview": false,
    "words": [
      {
        "number": 176,
        "korean": "돈",
        "meaning": "uang"
      },
      {
        "number": 177,
        "korean": "가격",
        "meaning": "harga"
      },
      {
        "number": 178,
        "korean": "카드",
        "meaning": "kartu"
      },
      {
        "number": 179,
        "korean": "현금",
        "meaning": "uang tunai"
      },
      {
        "number": 180,
        "korean": "사다",
        "meaning": "membeli"
      },
      {
        "number": 181,
        "korean": "팔다",
        "meaning": "menjual"
      },
      {
        "number": 182,
        "korean": "비싸다",
        "meaning": "mahal"
      },
      {
        "number": 183,
        "korean": "싸다",
        "meaning": "murah"
      },
      {
        "number": 184,
        "korean": "할인",
        "meaning": "diskon"
      },
      {
        "number": 185,
        "korean": "영수증",
        "meaning": "bon"
      },
      {
        "number": 186,
        "korean": "봉투",
        "meaning": "kantong"
      },
      {
        "number": 187,
        "korean": "얼마",
        "meaning": "berapa"
      },
      {
        "number": 188,
        "korean": "색깔",
        "meaning": "warna"
      },
      {
        "number": 189,
        "korean": "사이즈",
        "meaning": "ukuran"
      },
      {
        "number": 190,
        "korean": "바꾸다",
        "meaning": "mengganti / menukar"
      }
    ]
  },
  {
    "day": 23,
    "title": "옷과 소지품",
    "isReview": false,
    "words": [
      {
        "number": 191,
        "korean": "옷",
        "meaning": "pakaian"
      },
      {
        "number": 192,
        "korean": "셔츠",
        "meaning": "kemeja"
      },
      {
        "number": 193,
        "korean": "바지",
        "meaning": "celana"
      },
      {
        "number": 194,
        "korean": "치마",
        "meaning": "rok"
      },
      {
        "number": 195,
        "korean": "신발",
        "meaning": "sepatu"
      },
      {
        "number": 196,
        "korean": "양말",
        "meaning": "kaus kaki"
      },
      {
        "number": 197,
        "korean": "모자",
        "meaning": "topi"
      },
      {
        "number": 198,
        "korean": "가방",
        "meaning": "tas"
      },
      {
        "number": 199,
        "korean": "안경",
        "meaning": "kacamata"
      },
      {
        "number": 200,
        "korean": "시계",
        "meaning": "jam tangan"
      },
      {
        "number": 201,
        "korean": "우산",
        "meaning": "payung"
      },
      {
        "number": 202,
        "korean": "지갑",
        "meaning": "dompet"
      },
      {
        "number": 203,
        "korean": "휴대전화",
        "meaning": "ponsel"
      },
      {
        "number": 204,
        "korean": "입다",
        "meaning": "memakai"
      },
      {
        "number": 205,
        "korean": "벗다",
        "meaning": "melepas"
      }
    ]
  },
  {
    "day": 24,
    "title": "날씨와 계절",
    "isReview": false,
    "words": [
      {
        "number": 206,
        "korean": "날씨",
        "meaning": "cuaca"
      },
      {
        "number": 207,
        "korean": "비",
        "meaning": "hujan"
      },
      {
        "number": 208,
        "korean": "눈",
        "meaning": "salju"
      },
      {
        "number": 209,
        "korean": "바람",
        "meaning": "angin"
      },
      {
        "number": 210,
        "korean": "구름",
        "meaning": "awan"
      },
      {
        "number": 211,
        "korean": "봄",
        "meaning": "musim semi"
      },
      {
        "number": 212,
        "korean": "여름",
        "meaning": "musim panas"
      },
      {
        "number": 213,
        "korean": "가을",
        "meaning": "musim gugur"
      },
      {
        "number": 214,
        "korean": "겨울",
        "meaning": "musim dingin"
      },
      {
        "number": 215,
        "korean": "덥다",
        "meaning": "panas"
      },
      {
        "number": 216,
        "korean": "춥다",
        "meaning": "dingin"
      },
      {
        "number": 217,
        "korean": "따뜻하다",
        "meaning": "hangat"
      },
      {
        "number": 218,
        "korean": "시원하다",
        "meaning": "sejuk"
      },
      {
        "number": 219,
        "korean": "맑다",
        "meaning": "cerah"
      },
      {
        "number": 220,
        "korean": "흐리다",
        "meaning": "mendung"
      }
    ]
  },
  {
    "day": 25,
    "title": "복습",
    "isReview": true,
    "words": []
  },
  {
    "day": 26,
    "title": "몸",
    "isReview": false,
    "words": [
      {
        "number": 221,
        "korean": "몸",
        "meaning": "tubuh"
      },
      {
        "number": 222,
        "korean": "머리",
        "meaning": "kepala"
      },
      {
        "number": 223,
        "korean": "얼굴",
        "meaning": "wajah"
      },
      {
        "number": 224,
        "korean": "눈",
        "meaning": "mata"
      },
      {
        "number": 225,
        "korean": "코",
        "meaning": "hidung"
      },
      {
        "number": 226,
        "korean": "입",
        "meaning": "mulut"
      },
      {
        "number": 227,
        "korean": "귀",
        "meaning": "telinga"
      },
      {
        "number": 228,
        "korean": "목",
        "meaning": "leher / tenggorokan"
      },
      {
        "number": 229,
        "korean": "어깨",
        "meaning": "bahu"
      },
      {
        "number": 230,
        "korean": "팔",
        "meaning": "lengan"
      },
      {
        "number": 231,
        "korean": "손",
        "meaning": "tangan"
      },
      {
        "number": 232,
        "korean": "손가락",
        "meaning": "jari tangan"
      },
      {
        "number": 233,
        "korean": "배",
        "meaning": "perut"
      },
      {
        "number": 234,
        "korean": "다리",
        "meaning": "kaki"
      },
      {
        "number": 235,
        "korean": "머리카락",
        "meaning": "rambut"
      }
    ]
  },
  {
    "day": 27,
    "title": "건강과 병원",
    "isReview": false,
    "words": [
      {
        "number": 236,
        "korean": "아프다",
        "meaning": "sakit"
      },
      {
        "number": 237,
        "korean": "감기",
        "meaning": "flu"
      },
      {
        "number": 238,
        "korean": "열",
        "meaning": "demam"
      },
      {
        "number": 239,
        "korean": "기침",
        "meaning": "batuk"
      },
      {
        "number": 240,
        "korean": "약",
        "meaning": "obat"
      },
      {
        "number": 241,
        "korean": "약국",
        "meaning": "apotek"
      },
      {
        "number": 242,
        "korean": "환자",
        "meaning": "pasien"
      },
      {
        "number": 243,
        "korean": "치료",
        "meaning": "pengobatan"
      },
      {
        "number": 244,
        "korean": "건강",
        "meaning": "kesehatan"
      },
      {
        "number": 245,
        "korean": "검사",
        "meaning": "pemeriksaan"
      },
      {
        "number": 246,
        "korean": "예약",
        "meaning": "reservasi"
      },
      {
        "number": 247,
        "korean": "낫다",
        "meaning": "sembuh"
      },
      {
        "number": 248,
        "korean": "다치다",
        "meaning": "terluka"
      },
      {
        "number": 249,
        "korean": "조심하다",
        "meaning": "berhati-hati"
      },
      {
        "number": 250,
        "korean": "운동하다",
        "meaning": "berolahraga"
      }
    ]
  },
  {
    "day": 28,
    "title": "감정",
    "isReview": false,
    "words": [
      {
        "number": 251,
        "korean": "기쁘다",
        "meaning": "senang"
      },
      {
        "number": 252,
        "korean": "행복하다",
        "meaning": "bahagia"
      },
      {
        "number": 253,
        "korean": "슬프다",
        "meaning": "sedih"
      },
      {
        "number": 254,
        "korean": "화나다",
        "meaning": "marah"
      },
      {
        "number": 255,
        "korean": "무섭다",
        "meaning": "takut / menakutkan"
      },
      {
        "number": 256,
        "korean": "걱정하다",
        "meaning": "khawatir"
      },
      {
        "number": 257,
        "korean": "피곤하다",
        "meaning": "lelah"
      },
      {
        "number": 258,
        "korean": "심심하다",
        "meaning": "bosan"
      },
      {
        "number": 259,
        "korean": "재미있다",
        "meaning": "menarik / menyenangkan"
      },
      {
        "number": 260,
        "korean": "재미없다",
        "meaning": "tidak menarik / membosankan"
      },
      {
        "number": 261,
        "korean": "놀라다",
        "meaning": "terkejut"
      },
      {
        "number": 262,
        "korean": "부끄럽다",
        "meaning": "malu"
      },
      {
        "number": 263,
        "korean": "편하다",
        "meaning": "nyaman"
      },
      {
        "number": 264,
        "korean": "불편하다",
        "meaning": "tidak nyaman"
      },
      {
        "number": 265,
        "korean": "좋아하다",
        "meaning": "menyukai"
      }
    ]
  },
  {
    "day": 29,
    "title": "취미와 여가",
    "isReview": false,
    "words": [
      {
        "number": 266,
        "korean": "취미",
        "meaning": "hobi"
      },
      {
        "number": 267,
        "korean": "음악",
        "meaning": "musik"
      },
      {
        "number": 268,
        "korean": "노래",
        "meaning": "lagu"
      },
      {
        "number": 269,
        "korean": "영화",
        "meaning": "film"
      },
      {
        "number": 270,
        "korean": "드라마",
        "meaning": "drama"
      },
      {
        "number": 271,
        "korean": "게임",
        "meaning": "permainan"
      },
      {
        "number": 272,
        "korean": "사진",
        "meaning": "foto"
      },
      {
        "number": 273,
        "korean": "여행",
        "meaning": "perjalanan / wisata"
      },
      {
        "number": 274,
        "korean": "산책",
        "meaning": "jalan-jalan"
      },
      {
        "number": 275,
        "korean": "운동",
        "meaning": "olahraga"
      },
      {
        "number": 276,
        "korean": "축구",
        "meaning": "sepak bola"
      },
      {
        "number": 277,
        "korean": "수영",
        "meaning": "berenang"
      },
      {
        "number": 278,
        "korean": "요리",
        "meaning": "memasak"
      },
      {
        "number": 279,
        "korean": "노래하다",
        "meaning": "bernyanyi"
      },
      {
        "number": 280,
        "korean": "사진을 찍다",
        "meaning": "mengambil foto"
      }
    ]
  },
  {
    "day": 30,
    "title": "복습",
    "isReview": true,
    "words": []
  },
  {
    "day": 31,
    "title": "회사 생활",
    "isReview": false,
    "words": [
      {
        "number": 281,
        "korean": "일하다",
        "meaning": "bekerja"
      },
      {
        "number": 282,
        "korean": "출근하다",
        "meaning": "masuk kerja"
      },
      {
        "number": 283,
        "korean": "퇴근하다",
        "meaning": "pulang kerja"
      },
      {
        "number": 284,
        "korean": "회의",
        "meaning": "rapat"
      },
      {
        "number": 285,
        "korean": "사무실",
        "meaning": "kantor"
      },
      {
        "number": 286,
        "korean": "사장님",
        "meaning": "pemilik perusahaan / direktur"
      },
      {
        "number": 287,
        "korean": "부장님",
        "meaning": "kepala departemen"
      },
      {
        "number": 288,
        "korean": "팀장님",
        "meaning": "ketua tim"
      },
      {
        "number": 289,
        "korean": "동료",
        "meaning": "rekan kerja"
      },
      {
        "number": 290,
        "korean": "업무",
        "meaning": "pekerjaan / tugas kerja"
      },
      {
        "number": 291,
        "korean": "자료",
        "meaning": "bahan / data"
      },
      {
        "number": 292,
        "korean": "이메일",
        "meaning": "surel / email"
      },
      {
        "number": 293,
        "korean": "전화",
        "meaning": "telepon"
      },
      {
        "number": 294,
        "korean": "바쁘다",
        "meaning": "sibuk"
      },
      {
        "number": 295,
        "korean": "끝나다",
        "meaning": "selesai"
      }
    ]
  },
  {
    "day": 32,
    "title": "학교생활",
    "isReview": false,
    "words": [
      {
        "number": 296,
        "korean": "수업",
        "meaning": "pelajaran / kelas"
      },
      {
        "number": 297,
        "korean": "숙제",
        "meaning": "pekerjaan rumah"
      },
      {
        "number": 298,
        "korean": "질문",
        "meaning": "pertanyaan"
      },
      {
        "number": 299,
        "korean": "대답",
        "meaning": "jawaban"
      },
      {
        "number": 300,
        "korean": "설명",
        "meaning": "penjelasan"
      },
      {
        "number": 301,
        "korean": "연습",
        "meaning": "latihan"
      },
      {
        "number": 302,
        "korean": "단어",
        "meaning": "kosakata"
      },
      {
        "number": 303,
        "korean": "문장",
        "meaning": "kalimat"
      },
      {
        "number": 304,
        "korean": "문법",
        "meaning": "tata bahasa"
      },
      {
        "number": 305,
        "korean": "발음",
        "meaning": "pelafalan"
      },
      {
        "number": 306,
        "korean": "뜻",
        "meaning": "arti"
      },
      {
        "number": 307,
        "korean": "기억하다",
        "meaning": "mengingat"
      },
      {
        "number": 308,
        "korean": "잊다",
        "meaning": "lupa"
      },
      {
        "number": 309,
        "korean": "이해하다",
        "meaning": "mengerti"
      },
      {
        "number": 310,
        "korean": "가르치다",
        "meaning": "mengajar"
      }
    ]
  },
  {
    "day": 33,
    "title": "길 찾기",
    "isReview": false,
    "words": [
      {
        "number": 311,
        "korean": "길",
        "meaning": "jalan"
      },
      {
        "number": 312,
        "korean": "위치",
        "meaning": "lokasi"
      },
      {
        "number": 313,
        "korean": "왼쪽",
        "meaning": "kiri"
      },
      {
        "number": 314,
        "korean": "오른쪽",
        "meaning": "kanan"
      },
      {
        "number": 315,
        "korean": "앞",
        "meaning": "depan"
      },
      {
        "number": 316,
        "korean": "뒤",
        "meaning": "belakang"
      },
      {
        "number": 317,
        "korean": "옆",
        "meaning": "samping"
      },
      {
        "number": 318,
        "korean": "안",
        "meaning": "dalam"
      },
      {
        "number": 319,
        "korean": "밖",
        "meaning": "luar"
      },
      {
        "number": 320,
        "korean": "위",
        "meaning": "atas"
      },
      {
        "number": 321,
        "korean": "아래",
        "meaning": "bawah"
      },
      {
        "number": 322,
        "korean": "근처",
        "meaning": "sekitar / dekat"
      },
      {
        "number": 323,
        "korean": "멀다",
        "meaning": "jauh"
      },
      {
        "number": 324,
        "korean": "가깝다",
        "meaning": "dekat"
      },
      {
        "number": 325,
        "korean": "건너다",
        "meaning": "menyeberang"
      }
    ]
  },
  {
    "day": 34,
    "title": "이동과 교통 표현",
    "isReview": false,
    "words": [
      {
        "number": 326,
        "korean": "타다",
        "meaning": "naik"
      },
      {
        "number": 327,
        "korean": "내리다",
        "meaning": "turun"
      },
      {
        "number": 328,
        "korean": "출발하다",
        "meaning": "berangkat"
      },
      {
        "number": 329,
        "korean": "도착하다",
        "meaning": "tiba"
      },
      {
        "number": 330,
        "korean": "기다리다",
        "meaning": "menunggu"
      },
      {
        "number": 331,
        "korean": "걷다",
        "meaning": "berjalan"
      },
      {
        "number": 332,
        "korean": "운전하다",
        "meaning": "mengemudi"
      },
      {
        "number": 333,
        "korean": "돌아가다",
        "meaning": "kembali / pulang"
      },
      {
        "number": 334,
        "korean": "지나가다",
        "meaning": "melewati"
      },
      {
        "number": 335,
        "korean": "오토바이",
        "meaning": "motor"
      },
      {
        "number": 336,
        "korean": "신호등",
        "meaning": "lampu merah"
      },
      {
        "number": 337,
        "korean": "횡단보도",
        "meaning": "penyeberangan pejalan kaki"
      },
      {
        "number": 338,
        "korean": "길을 잃다",
        "meaning": "tersesat"
      },
      {
        "number": 339,
        "korean": "교통",
        "meaning": "lalu lintas"
      },
      {
        "number": 340,
        "korean": "막히다",
        "meaning": "macet"
      }
    ]
  },
  {
    "day": 35,
    "title": "복습",
    "isReview": true,
    "words": []
  },
  {
    "day": 36,
    "title": "약속과 계획",
    "isReview": false,
    "words": [
      {
        "number": 341,
        "korean": "약속",
        "meaning": "janji"
      },
      {
        "number": 342,
        "korean": "계획",
        "meaning": "rencana"
      },
      {
        "number": 343,
        "korean": "일정",
        "meaning": "jadwal"
      },
      {
        "number": 344,
        "korean": "준비하다",
        "meaning": "mempersiapkan"
      },
      {
        "number": 345,
        "korean": "시작하다",
        "meaning": "memulai"
      },
      {
        "number": 346,
        "korean": "결정하다",
        "meaning": "memutuskan"
      },
      {
        "number": 347,
        "korean": "만나다",
        "meaning": "bertemu"
      },
      {
        "number": 348,
        "korean": "연락하다",
        "meaning": "menghubungi"
      },
      {
        "number": 349,
        "korean": "초대하다",
        "meaning": "mengundang"
      },
      {
        "number": 350,
        "korean": "참석하다",
        "meaning": "menghadiri"
      },
      {
        "number": 351,
        "korean": "가능하다",
        "meaning": "memungkinkan / bisa"
      },
      {
        "number": 352,
        "korean": "취소하다",
        "meaning": "membatalkan"
      },
      {
        "number": 353,
        "korean": "늦다",
        "meaning": "terlambat"
      },
      {
        "number": 354,
        "korean": "일찍",
        "meaning": "lebih awal"
      },
      {
        "number": 355,
        "korean": "함께",
        "meaning": "bersama"
      }
    ]
  },
  {
    "day": 37,
    "title": "생활 동작",
    "isReview": false,
    "words": [
      {
        "number": 356,
        "korean": "씻다",
        "meaning": "mencuci"
      },
      {
        "number": 357,
        "korean": "샤워하다",
        "meaning": "mandi"
      },
      {
        "number": 358,
        "korean": "청소하다",
        "meaning": "membersihkan"
      },
      {
        "number": 359,
        "korean": "빨래하다",
        "meaning": "mencuci pakaian"
      },
      {
        "number": 360,
        "korean": "요리하다",
        "meaning": "memasak"
      },
      {
        "number": 361,
        "korean": "만들다",
        "meaning": "membuat"
      },
      {
        "number": 362,
        "korean": "열다",
        "meaning": "membuka"
      },
      {
        "number": 363,
        "korean": "닫다",
        "meaning": "menutup"
      },
      {
        "number": 364,
        "korean": "켜다",
        "meaning": "menyalakan"
      },
      {
        "number": 365,
        "korean": "끄다",
        "meaning": "mematikan"
      },
      {
        "number": 366,
        "korean": "넣다",
        "meaning": "memasukkan"
      },
      {
        "number": 367,
        "korean": "꺼내다",
        "meaning": "mengeluarkan"
      },
      {
        "number": 368,
        "korean": "앉다",
        "meaning": "duduk"
      },
      {
        "number": 369,
        "korean": "서다",
        "meaning": "berdiri"
      },
      {
        "number": 370,
        "korean": "눕다",
        "meaning": "berbaring"
      }
    ]
  },
  {
    "day": 38,
    "title": "의사소통",
    "isReview": false,
    "words": [
      {
        "number": 371,
        "korean": "부탁하다",
        "meaning": "meminta bantuan"
      },
      {
        "number": 372,
        "korean": "도와주다",
        "meaning": "membantu"
      },
      {
        "number": 373,
        "korean": "물어보다",
        "meaning": "bertanya"
      },
      {
        "number": 374,
        "korean": "대화하다",
        "meaning": "bercakap-cakap"
      },
      {
        "number": 375,
        "korean": "소개하다",
        "meaning": "memperkenalkan"
      },
      {
        "number": 376,
        "korean": "인사하다",
        "meaning": "memberi salam"
      },
      {
        "number": 377,
        "korean": "약속하다",
        "meaning": "berjanji"
      },
      {
        "number": 378,
        "korean": "동의하다",
        "meaning": "setuju"
      },
      {
        "number": 379,
        "korean": "반대하다",
        "meaning": "tidak setuju / menentang"
      },
      {
        "number": 380,
        "korean": "생각하다",
        "meaning": "berpikir"
      },
      {
        "number": 381,
        "korean": "믿다",
        "meaning": "percaya"
      },
      {
        "number": 382,
        "korean": "알다",
        "meaning": "tahu / mengenal"
      },
      {
        "number": 383,
        "korean": "필요하다",
        "meaning": "perlu / membutuhkan"
      },
      {
        "number": 384,
        "korean": "원하다",
        "meaning": "menginginkan"
      },
      {
        "number": 385,
        "korean": "괜찮다",
        "meaning": "baik-baik saja"
      }
    ]
  },
  {
    "day": 39,
    "title": "빈도와 정도",
    "isReview": false,
    "words": [
      {
        "number": 386,
        "korean": "항상",
        "meaning": "selalu"
      },
      {
        "number": 387,
        "korean": "보통",
        "meaning": "biasanya"
      },
      {
        "number": 388,
        "korean": "가끔",
        "meaning": "kadang-kadang"
      },
      {
        "number": 389,
        "korean": "별로",
        "meaning": "tidak terlalu"
      },
      {
        "number": 390,
        "korean": "전혀",
        "meaning": "sama sekali tidak"
      },
      {
        "number": 391,
        "korean": "아직",
        "meaning": "masih / belum"
      },
      {
        "number": 392,
        "korean": "벌써",
        "meaning": "sudah"
      },
      {
        "number": 393,
        "korean": "다시",
        "meaning": "lagi / kembali"
      },
      {
        "number": 394,
        "korean": "먼저",
        "meaning": "terlebih dahulu"
      },
      {
        "number": 395,
        "korean": "나중에",
        "meaning": "nanti"
      },
      {
        "number": 396,
        "korean": "정말",
        "meaning": "benar-benar"
      },
      {
        "number": 397,
        "korean": "아주",
        "meaning": "sangat"
      },
      {
        "number": 398,
        "korean": "너무",
        "meaning": "terlalu / sangat"
      },
      {
        "number": 399,
        "korean": "거의",
        "meaning": "hampir"
      },
      {
        "number": 400,
        "korean": "꼭",
        "meaning": "pasti / harus"
      }
    ]
  },
  {
    "day": 40,
    "title": "최종 복습",
    "isReview": true,
    "words": []
  }
]

export function getWordsForDay(day: number): VocabularyWord[] {
  const lesson = curriculum.find((item) => item.day === day)
  if (!lesson) return []
  if (!lesson.isReview) return lesson.words

  const firstDay = day === 20 || day === 40 ? 1 : day - 4
  return curriculum
    .filter((item) => item.day >= firstDay && item.day < day && !item.isReview)
    .flatMap((item) => item.words)
}
