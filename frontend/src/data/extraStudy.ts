export interface DialogueLine {
  speaker: string
  korean: string
  indonesian: string
}

export interface ExtraStudyLesson {
  day: number
  title: string
  conversationTitle: string
  dialogue: DialogueLine[]
  notes: string[]
}

export const extraStudyLessons: ExtraStudyLesson[] = [
  {
    "day": 1,
    "title": "인사와 자기소개",
    "conversationTitle": "처음 만난 사람",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "안녕하세요. 제 이름은 민수입니다.",
        "indonesian": "Halo. Nama saya Minsu."
      },
      {
        "speaker": "B",
        "korean": "안녕하세요. 저는 카르멘입니다.",
        "indonesian": "Halo. Saya carmen."
      },
      {
        "speaker": "A",
        "korean": "카르멘씨는 한국 사람입니까?",
        "indonesian": "Anda orang Korea, Carmen?"
      },
      {
        "speaker": "B",
        "korean": "아니요. 저는 인도네시아인입니다.",
        "indonesian": "Bukan. Saya orang Indonesia."
      }
    ],
    "notes": [
      "~입니다 adalah bentuk formal dan sopan dari \"adalah\", digunakan setelah kata benda.",
      "~는 adalah partikel topik setelah kata berakhiran vokal. Setelah konsonan gunakan ~은.",
      "~씨 adalah sapaan sopan setelah nama, mirip Saudara/Bapak/Ibu sesuai konteks."
    ]
  },
  {
    "day": 2,
    "title": "관계와 직업",
    "conversationTitle": "친구의 직업",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "저 사람은 누구예요?",
        "indonesian": "Siapa orang itu?"
      },
      {
        "speaker": "B",
        "korean": "제 친구예요. 요리사로 일해요.",
        "indonesian": "Dia teman saya. Dia bekerja sebagai koki."
      },
      {
        "speaker": "A",
        "korean": "옆에 있는 사람은 직원이에요?",
        "indonesian": "Orang di sebelahnya seorang karyawan?"
      },
      {
        "speaker": "B",
        "korean": "아니요. 저분은 사장님이에요.",
        "indonesian": "Bukan. Beliau adalah pemilik restoran."
      }
    ],
    "notes": [
      "저분 adalah bentuk hormat dari 저 사람. Gunakan saat menyebut orang yang perlu dihormati."
    ]
  },
  {
    "day": 3,
    "title": "기본 인사 표현",
    "conversationTitle": "도움을 받은 후",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "가방을 들어 주셔서 감사합니다.",
        "indonesian": "Terima kasih sudah membantu membawa tas saya."
      },
      {
        "speaker": "B",
        "korean": "네, 괜찮아요. 무겁지 않았어요.",
        "indonesian": "Ya, tidak apa-apa. Tasnya tidak berat."
      },
      {
        "speaker": "A",
        "korean": "처음 만났는데 도와주셔서 정말 감사합니다.",
        "indonesian": "Terima kasih sudah membantu meskipun kita baru pertama kali bertemu."
      },
      {
        "speaker": "B",
        "korean": "천만에요",
        "indonesian": "Sama Sama"
      }
    ],
    "notes": [
      "무겁다 berarti berat.",
      "천만에요 berarti sama-sama."
    ]
  },
  {
    "day": 4,
    "title": "기본 질문",
    "conversationTitle": "학교에서 질문하기",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "이것은 무엇입니까?",
        "indonesian": "Apa ini?"
      },
      {
        "speaker": "B",
        "korean": "한국어 시험 문제입니다.",
        "indonesian": "Ini soal ujian bahasa Korea."
      },
      {
        "speaker": "A",
        "korean": "이 문제의 정답은 몇 번입니까?",
        "indonesian": "Jawaban yang benar untuk soal ini nomor berapa?"
      },
      {
        "speaker": "B",
        "korean": "저도 잘 모르겠습니다.",
        "indonesian": "Saya kurang tahu."
      }
    ],
    "notes": [
      "시험 문제 berarti soal ujian. 시험 adalah ujian dan 문제 adalah soal/masalah."
    ]
  },
  {
    "day": 6,
    "title": "고유어 숫자",
    "conversationTitle": "빵집에서 주문하기",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "빵 한 개랑 우유 두 개 주세요.",
        "indonesian": "Tolong beri satu roti dan dua susu."
      },
      {
        "speaker": "B",
        "korean": "네. 사과도 필요하세요?",
        "indonesian": "Baik.  Anda juga membutuhkan apel?"
      },
      {
        "speaker": "A",
        "korean": "네, 사과도 세 개 주세요.",
        "indonesian": "Ya, tolong beri tiga apel."
      },
      {
        "speaker": "B",
        "korean": "네, 알겠습니다.",
        "indonesian": "Baiklah."
      }
    ],
    "notes": [
      "빵 berarti roti, 우유 berarti susu, dan 사과 berarti apel.",
      "Angka Korea asli: 하나, 둘, 셋, 넷, 다섯, 여섯, 일곱, 여덟, 아홉, 열.",
      "Di depan kata bantu bilangan 개, 하나/둘/셋/넷 berubah menjadi 한 개/두 개/세 개/네 개."
    ]
  },
  {
    "day": 7,
    "title": "가족",
    "conversationTitle": "형제자매 부르는 방법",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "남자가 자기보다 나이 많은 남자를 뭐라고 불러요?",
        "indonesian": "Laki-laki biasanya memanggil pria yang lebih tua dengan sebutan apa?"
      },
      {
        "speaker": "B",
        "korean": "나이 차이가 많이 나지 않으면 형이라고 불러요.",
        "indonesian": "Jika perbedaan usianya tidak terlalu jauh, dia memanggilnya hyeong."
      },
      {
        "speaker": "A",
        "korean": "여자는 자기보다 나이 많은 남자를 오빠라고 하지요?",
        "indonesian": "Perempuan memanggil laki-laki yang lebih tua darinya dengan sebutan oppa, bukan?"
      },
      {
        "speaker": "B",
        "korean": "네. 남자는 자기보다 나이 많은 여자를 누나라고 해요.",
        "indonesian": "Ya. Laki-laki memanggil perempuan yang lebih tua darinya dengan sebutan nuna."
      }
    ],
    "notes": [
      "형: kakak laki-laki yang dipanggil oleh laki-laki.",
      "오빠: kakak laki-laki yang dipanggil oleh perempuan.",
      "누나: kakak perempuan yang dipanggil oleh laki-laki.",
      "언니: kakak perempuan yang dipanggil oleh perempuan."
    ]
  },
  {
    "day": 8,
    "title": "음식",
    "conversationTitle": "아침 식사",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "아침에 밥을 먹어요, 빵을 먹어요?",
        "indonesian": "Saat sarapan Anda makan nasi atau roti?"
      },
      {
        "speaker": "B",
        "korean": "보통 빵을 먹고 우유를 마셔요.",
        "indonesian": "Biasanya saya makan roti dan minum susu."
      },
      {
        "speaker": "A",
        "korean": "커피도 마셔요?",
        "indonesian": "Anda juga minum kopi?"
      },
      {
        "speaker": "B",
        "korean": "네, 커피도 마시고 과일도 먹어요.",
        "indonesian": "Ya, saya juga minum kopi dan makan buah."
      }
    ],
    "notes": [
      "아침 berarti pagi/sarapan, 점심 berarti siang/makan siang, 저녁 berarti malam/makan malam."
    ]
  },
  {
    "day": 9,
    "title": "식사 동작과 맛",
    "conversationTitle": "디저트 맛보기",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "이 빵은 달고 맛있어요.",
        "indonesian": "Roti ini manis dan enak."
      },
      {
        "speaker": "B",
        "korean": "저는 너무 단 음식은 별로예요.",
        "indonesian": "Saya kurang suka makanan yang terlalu manis."
      },
      {
        "speaker": "A",
        "korean": "그러면 이 과일을 먹어 보세요.",
        "indonesian": "Kalau begitu, cobalah buah ini."
      },
      {
        "speaker": "B",
        "korean": "이 과일은 달고 맛있네요.",
        "indonesian": "Buah ini manis dan enak, ya."
      }
    ],
    "notes": []
  },
  {
    "day": 11,
    "title": "학교와 공부",
    "conversationTitle": "교실에서 준비하기",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "오늘 학교에서 시험이 있어요?",
        "indonesian": "Hari ini ada ujian di sekolah?"
      },
      {
        "speaker": "B",
        "korean": "네, 교실에서 한국어 시험을 봐요.",
        "indonesian": "Ya, kami mengikuti ujian bahasa Korea di kelas."
      },
      {
        "speaker": "A",
        "korean": "책과 공책을 가져왔어요?",
        "indonesian": "Anda membawa buku dan buku catatan?"
      },
      {
        "speaker": "B",
        "korean": "네, 연필도 가져왔는데 지우개가 없어요.",
        "indonesian": "Ya, saya juga membawa pensil, tetapi tidak punya penghapus."
      }
    ],
    "notes": [
      "~에서 menandai tempat berlangsungnya suatu tindakan, misalnya 교실에서 공부해요."
    ]
  },
  {
    "day": 12,
    "title": "집",
    "conversationTitle": "집 소개하기",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "집에 방이 몇 개 있어요?",
        "indonesian": "Ada berapa kamar di rumah Anda?"
      },
      {
        "speaker": "B",
        "korean": "방 두 개와 거실, 부엌이 있어요.",
        "indonesian": "Ada dua kamar, ruang keluarga, dan dapur."
      },
      {
        "speaker": "A",
        "korean": "화장실은 어디에 있어요?",
        "indonesian": "Di mana kamar mandinya?"
      },
      {
        "speaker": "B",
        "korean": "거실 옆에 있어요.",
        "indonesian": "Ada di sebelah ruang keluarga."
      }
    ],
    "notes": []
  },
  {
    "day": 13,
    "title": "날짜와 시간",
    "conversationTitle": "점심 약속",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "오늘 점심 같이 먹을 시간이 있어요?",
        "indonesian": "Anda punya waktu untuk makan siang bersama hari ini?"
      },
      {
        "speaker": "B",
        "korean": "네. 지금 몇 시예요?",
        "indonesian": "Ya, ada. Sekarang jam berapa?"
      },
      {
        "speaker": "A",
        "korean": "지금 열한 시 삼십 분이에요.",
        "indonesian": "Sekarang jam sebelas tiga puluh."
      },
      {
        "speaker": "B",
        "korean": "그러면 열두 시에 만나요.",
        "indonesian": "Kalau begitu, kita bertemu jam dua belas."
      }
    ],
    "notes": []
  },
  {
    "day": 14,
    "title": "요일과 주기",
    "conversationTitle": "일주일 수업",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "한국어 수업은 무슨 요일에 있어요?",
        "indonesian": "Kelas bahasa Korea diadakan hari apa?"
      },
      {
        "speaker": "B",
        "korean": "월요일, 수요일, 금요일에 있어요.",
        "indonesian": "Ada hari Senin, Rabu, dan Jumat.."
      },
      {
        "speaker": "A",
        "korean": "화요일과 목요일에는 무엇을 해요?",
        "indonesian": "Apa yang Anda lakukan hari Selasa dan Kamis?"
      },
      {
        "speaker": "B",
        "korean": "화요일과 목요일에는 집에서 단어를 공부해요.",
        "indonesian": "Hari Selasa dan Kamis, saya belajar kosakata di rumah."
      }
    ],
    "notes": []
  },
  {
    "day": 16,
    "title": "장소",
    "conversationTitle": "필요한 장소 찾기",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "은행에 갔다가 시장에 갈 거예요.",
        "indonesian": "Saya akan pergi ke bank lalu ke pasar."
      },
      {
        "speaker": "B",
        "korean": "은행은 병원 옆에 있어요.",
        "indonesian": "Bank berada di sebelah rumah sakit."
      },
      {
        "speaker": "A",
        "korean": "근처에 편의점도 있어요?",
        "indonesian": "Ada minimarket di dekatnya?"
      },
      {
        "speaker": "B",
        "korean": "네, 편의점과 카페가 나란히 있어요.",
        "indonesian": "Ya, minimarket dan kafe ada bersebelahan."
      }
    ],
    "notes": []
  },
  {
    "day": 17,
    "title": "교통",
    "conversationTitle": "공항 가기",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "공항까지 버스를 탈까요, 지하철을 탈까요?",
        "indonesian": "Kita ke bandara naik bus atau kereta bawah tanah?"
      },
      {
        "speaker": "B",
        "korean": "짐이 많으니까 택시를 타요..",
        "indonesian": "Karena barang bawaan kita banyak, kita naik taksi saja."
      },
      {
        "speaker": "A",
        "korean": "자동차로 가면 시간이 얼마나 걸려요?",
        "indonesian": "Kalau naik mobil, berapa lama?"
      },
      {
        "speaker": "B",
        "korean": "한 시간 정도 걸려요.",
        "indonesian": "Sekitar satu jam."
      }
    ],
    "notes": []
  },
  {
    "day": 18,
    "title": "기본 동작",
    "conversationTitle": "하루 일과",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "아침에 몇 시에 일어나요?",
        "indonesian": "Anda bangun jam berapa?"
      },
      {
        "speaker": "B",
        "korean": "일곱 시에 일어나서 학교에 가요.",
        "indonesian": "Saya bangun jam tujuh lalu pergi ke sekolah."
      },
      {
        "speaker": "A",
        "korean": "학교는 보통 몇 시에 끝나요?",
        "indonesian": "Sekolah biasanya selesai jam berapa?"
      },
      {
        "speaker": "B",
        "korean": "보통 오후 두 시에 끝나요.",
        "indonesian": "Biasanya selesai jam dua siang."
      }
    ],
    "notes": []
  },
  {
    "day": 19,
    "title": "기본 상태",
    "conversationTitle": "가방 고르기",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "이 큰 가방이 좋아요, 작은 가방이 좋아요?",
        "indonesian": "Anda suka tas besar ini atau tas kecil?"
      },
      {
        "speaker": "B",
        "korean": "작은 가방이 더 좋아요.",
        "indonesian": "Saya lebih suka tas kecil."
      },
      {
        "speaker": "A",
        "korean": "그런데 작은 가방에는 물건이 적게 들어가요.",
        "indonesian": "Tapi tas kecil hanya bisa memuat sedikit barang."
      },
      {
        "speaker": "B",
        "korean": "저는 물건이 많지 않아서 괜찮아요.",
        "indonesian": "Barang saya tidak banyak, jadi tidak masalah."
      }
    ],
    "notes": []
  },
  {
    "day": 21,
    "title": "식당 이용",
    "conversationTitle": "음식 주문하기",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "메뉴를 보고 주문하시겠어요?",
        "indonesian": "Mau lihat menunya dulu sebelum memesan?"
      },
      {
        "speaker": "B",
        "korean": "네, 떡볶이랑 튀김 주세요.",
        "indonesian": "Ya, saya mau pesan tteokbokki dan gorengan."
      },
      {
        "speaker": "A",
        "korean": "숟가락과 젓가락이 필요하세요?",
        "indonesian": "Perlu sendok dan sumpit?"
      },
      {
        "speaker": "B",
        "korean": "네, 포크도 하나 주세요.",
        "indonesian": "Ya, tolong bawakan satu garpu juga."
      }
    ],
    "notes": []
  },
  {
    "day": 22,
    "title": "쇼핑",
    "conversationTitle": "옷 가격 묻기",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "이 옷 가격이 얼마예요?",
        "indonesian": "Baju ini harganya berapa?"
      },
      {
        "speaker": "B",
        "korean": "오만 원인데 지금 할인 중이에요.",
        "indonesian": "Harganya lima puluh ribu won, tapi sekarang sedang diskon."
      },
      {
        "speaker": "A",
        "korean": "할인하면 많이 싸요?",
        "indonesian": "Kalau diskon, harganya jadi jauh lebih murah?"
      },
      {
        "speaker": "B",
        "korean": "네, 지금은 삼만 원이에요.",
        "indonesian": "Ya, sekarang harganya tiga puluh ribu won."
      }
    ],
    "notes": []
  },
  {
    "day": 23,
    "title": "옷과 소지품",
    "conversationTitle": "외출 준비",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "오늘 어떤 옷을 입을 거예요?",
        "indonesian": "Hari ini Anda mau pakai baju apa?"
      },
      {
        "speaker": "B",
        "korean": "흰 셔츠하고 검은 바지를 입을 거예요.",
        "indonesian": "Saya akan memakai kemeja putih dan celana hitam."
      },
      {
        "speaker": "A",
        "korean": "치마는 입지 않아요?",
        "indonesian": "Anda tidak pakai rok?"
      },
      {
        "speaker": "B",
        "korean": "오늘은 많이 걸어야 해서 바지가 편해요.",
        "indonesian": "Hari ini saya akan banyak jalan, jadi celana lebih nyaman."
      }
    ],
    "notes": []
  },
  {
    "day": 24,
    "title": "날씨와 계절",
    "conversationTitle": "오늘 날씨",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "오늘 날씨가 어때요?",
        "indonesian": "Bagaimana cuaca hari ini?"
      },
      {
        "speaker": "B",
        "korean": "아침에는 맑고 따뜻했어요.",
        "indonesian": "Pagi tadi cerah dan hangat."
      },
      {
        "speaker": "A",
        "korean": "그런데 지금은 구름이 많고 흐려요.",
        "indonesian": "Tapi sekarang banyak awan dan cuacanya mendung."
      },
      {
        "speaker": "B",
        "korean": "바람도 불어서 조금 시원해요.",
        "indonesian": "Ada angin juga, jadi agak sejuk."
      }
    ],
    "notes": []
  },
  {
    "day": 26,
    "title": "몸",
    "conversationTitle": "아픈 곳 말하기",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "몸 어디가 아파요?",
        "indonesian": "Sakit di bagian mana?"
      },
      {
        "speaker": "B",
        "korean": "머리와 목이 아파요.",
        "indonesian": "Kepala dan tenggorokan saya sakit."
      },
      {
        "speaker": "A",
        "korean": "코가 막히거나 귀도 아파요?",
        "indonesian": "Hidung tersumbat atau telinga juga sakit?"
      },
      {
        "speaker": "B",
        "korean": "코는 괜찮지만 눈이 조금 아파요.",
        "indonesian": "Hidung saya baik-baik saja, tapi mata saya sedikit sakit."
      }
    ],
    "notes": []
  },
  {
    "day": 27,
    "title": "건강과 병원",
    "conversationTitle": "병원 진료",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "어디가 아파서 병원에 오셨어요?",
        "indonesian": "Anda datang ke rumah sakit karena sakit apa?"
      },
      {
        "speaker": "B",
        "korean": "감기에 걸려서 열이 나고 기침도 해요.",
        "indonesian": "Saya terkena flu, jadi saya demam dan juga batuk."
      },
      {
        "speaker": "A",
        "korean": "먼저 검사를 받아야 합니다.",
        "indonesian": "Anda harus menjalani pemeriksaan terlebih dahulu."
      },
      {
        "speaker": "B",
        "korean": "치료를 받으면 빨리 나을 수 있어요?",
        "indonesian": "Kalau mendapat pengobatan, saya bisa cepat sembuh?"
      },
      {
        "speaker": "A",
        "korean": "네, 약을 먹고 충분히 쉬면 좋아질 거예요.",
        "indonesian": "Ya, kalau minum obat dan cukup istirahat, Anda akan segera membaik."
      },
      {
        "speaker": "B",
        "korean": "네, 알겠습니다.",
        "indonesian": "Baik, saya mengerti."
      }
    ],
    "notes": []
  },
  {
    "day": 28,
    "title": "감정",
    "conversationTitle": "시험 결과",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "시험에 합격해서 기뻐 보여요.",
        "indonesian": "Anda terlihat senang karena lulus ujian."
      },
      {
        "speaker": "B",
        "korean": "네, 정말 기쁘고 행복해요.",
        "indonesian": "Ya, saya sangat senang."
      },
      {
        "speaker": "A",
        "korean": "시험 전에 많이 걱정했어요?",
        "indonesian": "Anda sangat khawatir sebelum ujian?"
      },
      {
        "speaker": "B",
        "korean": "네, 떨어질까 봐 걱정되고 무서웠어요.",
        "indonesian": "Ya, saya khawatir dan takut tidak lulus."
      }
    ],
    "notes": []
  },
  {
    "day": 29,
    "title": "취미와 여가",
    "conversationTitle": "취미 이야기",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "취미가 무엇이에요?",
        "indonesian": "Hobi Anda apa?"
      },
      {
        "speaker": "B",
        "korean": "음악을 듣고 노래하는 것을 좋아해요.",
        "indonesian": "Saya suka mendengarkan musik dan bernyanyi."
      },
      {
        "speaker": "A",
        "korean": "영화나 드라마도 자주 봐요?",
        "indonesian": "Anda juga sering menonton film atau drama?"
      },
      {
        "speaker": "B",
        "korean": "네, 주말에는 드라마를 많이 봐요.",
        "indonesian": "Ya, saya sering menonton drama di akhir pekan."
      }
    ],
    "notes": []
  },
  {
    "day": 31,
    "title": "회사 생활",
    "conversationTitle": "출근 후 업무",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "오늘 몇 시에 출근했어요?",
        "indonesian": "Hari ini Anda sampai di kantor jam berapa?"
      },
      {
        "speaker": "B",
        "korean": "아침 아홉 시에 사무실에 왔어요.",
        "indonesian": "Saya sampai di kantor jam sembilan pagi."
      },
      {
        "speaker": "A",
        "korean": "오늘 회의가 있어요?",
        "indonesian": "Ada rapat hari ini?"
      },
      {
        "speaker": "B",
        "korean": "네, 대표님, 부장님, 팀장님이 참석해요.",
        "indonesian": "Ya, direktur utama, kepala departemen, dan ketua tim akan hadir."
      }
    ],
    "notes": []
  },
  {
    "day": 32,
    "title": "학교생활",
    "conversationTitle": "한국어 공부법",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "한국어를 어떻게 공부해요?",
        "indonesian": "Bagaimana Anda belajar bahasa Korea?"
      },
      {
        "speaker": "B",
        "korean": "수업에서 배우고 집에서 숙제해요.",
        "indonesian": "Saya belajar bahasa Korea di kelas dan mengerjakan tugas di rumah."
      },
      {
        "speaker": "A",
        "korean": "단어와 문장을 매일 연습해요?",
        "indonesian": "Anda berlatih kosakata dan kalimat setiap hari?"
      },
      {
        "speaker": "B",
        "korean": "네, 뜻을 읽고 발음을 따라 해요.",
        "indonesian": "Ya, saya melihat artinya dan menirukan pelafalannya."
      }
    ],
    "notes": []
  },
  {
    "day": 33,
    "title": "길 찾기",
    "conversationTitle": "은행 위치 묻기",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "실례합니다. 은행 위치가 어디예요?",
        "indonesian": "Permisi, banknya di mana?"
      },
      {
        "speaker": "B",
        "korean": "이 길로 가면 오른쪽에 있어요.",
        "indonesian": "Kalau lewat jalan ini, banknya ada di sebelah kanan."
      },
      {
        "speaker": "A",
        "korean": "은행 앞에는 무엇이 있어요?",
        "indonesian": "Apa yang ada di depan bank?"
      },
      {
        "speaker": "B",
        "korean": "앞에는 카페가 있고 뒤에는 공원이 있어요.",
        "indonesian": "Di depan bank ada kafe, dan di belakangnya ada taman."
      }
    ],
    "notes": []
  },
  {
    "day": 34,
    "title": "이동과 교통 표현",
    "conversationTitle": "버스로 이동하기",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "회사에 가려면 어떤 버스를 타요?",
        "indonesian": "Untuk pergi ke kantor, harus naik bus apa?"
      },
      {
        "speaker": "B",
        "korean": "103번 버스를 타고 다섯 번째 정류장에서 내리세요.",
        "indonesian": "Naik bus nomor 103 dan turun di halte kelima."
      },
      {
        "speaker": "A",
        "korean": "버스가 언제 출발해요?",
        "indonesian": "Kapan bus berangkat?"
      },
      {
        "speaker": "B",
        "korean": "십 분 후에 출발하니까 여기서 기다리세요.",
        "indonesian": "Busnya berangkat sepuluh menit lagi, jadi tunggu di sini."
      }
    ],
    "notes": []
  },
  {
    "day": 36,
    "title": "약속과 계획",
    "conversationTitle": "주말 약속 잡기",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "이번 주말에 만날 수 있어요?",
        "indonesian": "Kita bisa bertemu akhir pekan ini?"
      },
      {
        "speaker": "B",
        "korean": "네, 토요일은 가능합니다.",
        "indonesian": "Ya, saya bisa hari Sabtu."
      },
      {
        "speaker": "A",
        "korean": "그러면 오후 두 시에 만날까요?",
        "indonesian": "Kalau begitu, bagaimana kalau kita bertemu jam dua siang?"
      },
      {
        "speaker": "B",
        "korean": "좋아요. 일정을 확인하고 다시 연락할게요.",
        "indonesian": "Baik. Saya akan cek jadwal dulu, lalu menghubungi Anda lagi."
      }
    ],
    "notes": []
  },
  {
    "day": 37,
    "title": "생활 동작",
    "conversationTitle": "아침 준비",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "아침에 일어나서 먼저 무엇을 해요?",
        "indonesian": "Setelah bangun tidur, Anda pertama kali melakukan apa?"
      },
      {
        "speaker": "B",
        "korean": "얼굴을 씻고 샤워해요.",
        "indonesian": "Saya mencuci muka lalu mandi."
      },
      {
        "speaker": "A",
        "korean": "그다음에는 무엇을 해요?",
        "indonesian": "Apa yang Anda lakukan setelah itu?"
      },
      {
        "speaker": "B",
        "korean": "부엌에서 아침 식사를 준비해요.",
        "indonesian": "Saya menyiapkan sarapan di dapur."
      }
    ],
    "notes": []
  },
  {
    "day": 38,
    "title": "의사소통",
    "conversationTitle": "도움 부탁하기",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "숙제를 도와달라고 부탁해도 괜찮아요?",
        "indonesian": "Boleh saya minta bantuan untuk mengerjakan pekerjaan rumah?"
      },
      {
        "speaker": "B",
        "korean": "네, 모르는 것을 물어보세요.",
        "indonesian": "Ya, tanyakan bagian yang tidak Anda mengerti."
      },
      {
        "speaker": "A",
        "korean": "이 문장의 뜻을 알고 있어요?",
        "indonesian": "Anda mengerti arti kalimat ini?"
      },
      {
        "speaker": "B",
        "korean": "네, 제가 설명하고 예문도 알려 드릴게요.",
        "indonesian": "Ya, saya akan menjelaskan artinya dan memberikan contoh kalimat juga."
      }
    ],
    "notes": []
  },
  {
    "day": 39,
    "title": "빈도와 정도",
    "conversationTitle": "공부 습관",
    "dialogue": [
      {
        "speaker": "A",
        "korean": "한국어를 자주 공부해요?",
        "indonesian": "Anda sering belajar bahasa Korea?"
      },
      {
        "speaker": "B",
        "korean": "보통 매일 공부하고 주말에는 가끔 쉬어요.",
        "indonesian": "Biasanya saya belajar setiap hari, tapi terkadang saya tidak belajar di akhir pekan."
      },
      {
        "speaker": "A",
        "korean": "단어 공부도 많이 하나요?",
        "indonesian": "Anda juga sering belajar kosakata?"
      },
      {
        "speaker": "B",
        "korean": "네, 단어 공부도 열심히 해요.",
        "indonesian": "Ya, saya juga rajin belajar kosakata."
      }
    ],
    "notes": []
  }
]
