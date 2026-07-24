"use strict";

/* =========================================================
   1. 40일 학습 데이터
   단어 원본과 화면 출력 코드를 분리해 수정하기 쉽게 만들었다.
========================================================= */
const REVIEW_DAYS = new Set([5, 10, 15, 20, 25, 30, 35, 40]);

const lessonMeta = {
  1: [
    "Salam dan Perkenalan",
    "인사와 자기소개",
    "Pelajari salam dan cara memperkenalkan diri.",
    "👋",
    "저는 ___입니다",
    "Saya adalah ___.",
  ],
  2: [
    "Hubungan dan Pekerjaan",
    "기본 관계와 직업",
    "Kenali hubungan dekat dan pekerjaan dasar.",
    "🧑‍🤝‍🧑",
    "___은/는 ___입니다",
    "___ adalah ___.",
  ],
  3: [
    "Ungkapan Salam",
    "기본 인사 표현",
    "Gunakan ungkapan sopan dalam pertemuan sehari-hari.",
    "🙇",
    "감사합니다 / 죄송합니다",
    "Terima kasih / Maaf.",
  ],
  4: [
    "Pertanyaan Dasar",
    "기본 질문",
    "Belajar kata tanya yang paling sering digunakan.",
    "❓",
    "___이/가 무엇입니까?",
    "Apa ___?",
  ],
  6: [
    "Angka Korea Asli",
    "고유어 숫자",
    "Hitung satu sampai sepuluh dengan angka Korea asli.",
    "🔢",
    "___개 주세요",
    "Tolong beri ___ buah.",
  ],
  7: [
    "Keluarga",
    "가족",
    "Perkenalkan anggota keluarga dengan tepat.",
    "🏠",
    "저의 ___입니다",
    "Ini ___ saya.",
  ],
  8: [
    "Makanan",
    "음식",
    "Kenali makanan dan minuman yang umum.",
    "🍚",
    "___을/를 먹어요",
    "Saya makan ___.",
  ],
  9: [
    "Makan dan Rasa",
    "식사 동작과 맛",
    "Jelaskan aktivitas makan dan rasa makanan.",
    "😋",
    "___이/가 맛있어요",
    "___ enak.",
  ],
  11: [
    "Sekolah dan Belajar",
    "학교와 공부",
    "Pelajari benda dan kegiatan penting di sekolah.",
    "📚",
    "___에서 공부해요",
    "Saya belajar di ___.",
  ],
  12: [
    "Rumah",
    "집",
    "Sebutkan ruangan dan benda di dalam rumah.",
    "🛋️",
    "___에 있어요",
    "Ada di ___.",
  ],
  13: [
    "Tanggal dan Waktu",
    "날짜와 시간",
    "Bicarakan waktu dan kegiatan harian.",
    "🕐",
    "지금 ___시입니다",
    "Sekarang pukul ___.",
  ],
  14: [
    "Hari dan Kebiasaan",
    "요일과 주기",
    "Pelajari nama hari dan frekuensi dasar.",
    "📅",
    "___요일에 만나요",
    "Mari bertemu hari ___.",
  ],
  16: [
    "Tempat",
    "장소",
    "Kenali tempat yang sering dikunjungi.",
    "📍",
    "___에 가요",
    "Saya pergi ke ___.",
  ],
  17: [
    "Transportasi",
    "교통",
    "Gunakan kosakata perjalanan dan kendaraan.",
    "🚌",
    "___을/를 타요",
    "Saya naik ___.",
  ],
  18: [
    "Aktivitas Dasar",
    "기본 동작",
    "Pelajari kata kerja untuk rutinitas sehari-hari.",
    "🏃",
    "___을/를 해요",
    "Saya melakukan ___.",
  ],
  19: [
    "Keadaan Dasar",
    "기본 상태",
    "Bandingkan ukuran, jumlah, kecepatan, dan tingkat kesulitan.",
    "⚖️",
    "___이/가 커요",
    "___ besar.",
  ],
  21: [
    "Di Restoran",
    "식당 이용",
    "Pesan makanan dan lakukan pembayaran di restoran.",
    "🍽️",
    "___ 주세요",
    "Tolong beri ___.",
  ],
  22: [
    "Berbelanja",
    "쇼핑",
    "Tanyakan harga, ukuran, dan lakukan pembayaran.",
    "🛍️",
    "이거 얼마예요?",
    "Berapa harga ini?",
  ],
  23: [
    "Pakaian dan Barang",
    "옷과 소지품",
    "Bicarakan pakaian dan barang yang dibawa.",
    "👕",
    "___을/를 입어요",
    "Saya memakai ___.",
  ],
  24: [
    "Cuaca dan Musim",
    "날씨와 계절",
    "Jelaskan cuaca dan empat musim di Korea.",
    "🌤️",
    "오늘은 ___",
    "Hari ini ___.",
  ],
  26: [
    "Tubuh",
    "몸",
    "Pelajari bagian tubuh yang penting.",
    "🧍",
    "___이/가 아파요",
    "___ saya sakit.",
  ],
  27: [
    "Kesehatan dan Rumah Sakit",
    "건강과 병원",
    "Jelaskan gejala dan kebutuhan medis dasar.",
    "🏥",
    "___이/가 아파요",
    "Saya sakit ___.",
  ],
  28: [
    "Perasaan",
    "감정",
    "Ungkapkan emosi dan keadaan perasaan.",
    "😊",
    "저는 ___",
    "Saya merasa ___.",
  ],
  29: [
    "Hobi dan Waktu Luang",
    "취미와 여가",
    "Ceritakan kegiatan favorit pada waktu luang.",
    "⚽",
    "취미는 ___입니다",
    "Hobi saya adalah ___.",
  ],
  31: [
    "Kehidupan Kantor",
    "회사 생활",
    "Gunakan kosakata penting dalam lingkungan kerja.",
    "💼",
    "___ 때문에 바빠요",
    "Saya sibuk karena ___.",
  ],
  32: [
    "Kehidupan Sekolah",
    "학교생활",
    "Bicarakan pelajaran, tugas, dan proses belajar.",
    "🎓",
    "___을/를 이해해요",
    "Saya memahami ___.",
  ],
  33: [
    "Mencari Jalan",
    "길 찾기",
    "Tanyakan lokasi dan pahami arah dengan mudah.",
    "🧭",
    "___에 있어요",
    "Ada di ___.",
  ],
  34: [
    "Perjalanan dan Lalu Lintas",
    "이동과 교통 표현",
    "Jelaskan perjalanan dan kondisi lalu lintas.",
    "🚦",
    "___에서 내려요",
    "Saya turun di ___.",
  ],
  36: [
    "Janji dan Rencana",
    "약속과 계획",
    "Atur jadwal, undangan, dan rencana bersama.",
    "🗓️",
    "___기로 했어요",
    "Saya memutuskan untuk ___.",
  ],
  37: [
    "Aktivitas Sehari-hari",
    "생활 동작",
    "Jelaskan urutan kegiatan di rumah.",
    "🧹",
    "___고 나서 ___",
    "Setelah ___, saya ___.",
  ],
  38: [
    "Komunikasi",
    "의사소통",
    "Minta bantuan dan sampaikan pendapat dengan sopan.",
    "💬",
    "___다고 생각해요",
    "Saya pikir ___.",
  ],
  39: [
    "Frekuensi dan Tingkat",
    "빈도와 정도",
    "Buat kalimat lebih alami dengan kata keterangan.",
    "📊",
    "___ 자주 해요",
    "Saya sering ___.",
  ],
};

// 각 줄은 “한국어|인도네시아어” 형식이다. 총 400개가 들어 있다.
const vocabularyRows = {
  1: `안녕하세요|halo
저|saya
이름|nama
사람|orang
한국|Korea
인도네시아|Indonesia
한국인|orang Korea
인도네시아인|orang Indonesia
학생|pelajar / siswa
선생님|guru`,
  2: `친구|teman
가족|keluarga
사장님|pemilik usaha
직원|karyawan
의사|dokter
간호사|perawat
요리사|koki
경찰|polisi
가수|penyanyi
배우|aktor / aktris`,
  3: `감사합니다|terima kasih
죄송합니다|maaf
괜찮아요|tidak apa-apa
반갑습니다|senang bertemu dengan Anda
네|ya
아니요|tidak / bukan
안녕히 가세요|selamat jalan
안녕히 계세요|selamat tinggal
처음|pertama kali
다음|berikutnya`,
  4: `무엇|apa
누구|siapa
어디|di mana
언제|kapan
왜|mengapa / kenapa
어떻게|bagaimana
어느|yang mana
몇|berapa
맞다|benar
모르다|tidak tahu`,
  6: `하나|satu
둘|dua
셋|tiga
넷|empat
다섯|lima
여섯|enam
일곱|tujuh
여덟|delapan
아홉|sembilan
열|sepuluh`,
  7: `부모님|orang tua
아버지|ayah
어머니|ibu
형|kakak laki-laki bagi laki-laki
오빠|kakak laki-laki bagi perempuan
누나|kakak perempuan bagi laki-laki
언니|kakak perempuan bagi perempuan
동생|adik
아들|anak laki-laki
딸|anak perempuan`,
  8: `밥|nasi / makanan
물|air
빵|roti
우유|susu
커피|kopi
고기|daging
생선|ikan
과일|buah
채소|sayuran
김치|kimchi`,
  9: `먹다|makan
마시다|minum
맛있다|enak
맛없다|tidak enak
맵다|pedas
달다|manis
짜다|asin
뜨겁다|panas
차갑다|dingin
배고프다|lapar`,
  11: `학교|sekolah
교실|ruang kelas
책|buku
공책|buku catatan
연필|pensil
지우개|penghapus
시험 문제|soal ujian
시험|ujian
공부하다|belajar
배우다|mempelajari`,
  12: `집|rumah
방|kamar
거실|ruang keluarga
부엌|dapur
화장실|toilet / kamar mandi
침대|tempat tidur
의자|kursi
책상|meja belajar
문|pintu
창문|jendela`,
  13: `오늘|hari ini
어제|kemarin
내일|besok
아침|pagi
점심|siang / makan siang
저녁|malam / makan malam
지금|sekarang
시간|waktu
시|pukul / jam
분|menit`,
  14: `월요일|hari Senin
화요일|hari Selasa
수요일|hari Rabu
목요일|hari Kamis
금요일|hari Jumat
토요일|hari Sabtu
일요일|hari Minggu
주말|akhir pekan
매일|setiap hari
자주|sering`,
  16: `회사|perusahaan / kantor
병원|rumah sakit
은행|bank
시장|pasar
마트|supermarket
편의점|minimarket
식당|restoran
카페|kafe
공원|taman
도서관|perpustakaan`,
  17: `버스|bus
지하철|kereta bawah tanah
택시|taksi
자동차|mobil
기차|kereta api
비행기|pesawat
역|stasiun
공항|bandara
정류장|halte
표|tiket`,
  18: `가다|pergi
오다|datang
보다|melihat / menonton
듣다|mendengar
말하다|berbicara / mengatakan
읽다|membaca
쓰다|menulis
자다|tidur
일어나다|bangun
쉬다|beristirahat`,
  19: `좋다|baik / bagus
나쁘다|buruk / jelek
크다|besar
작다|kecil
많다|banyak
적다|sedikit
빠르다|cepat
느리다|lambat
쉽다|mudah
어렵다|sulit`,
  21: `메뉴|menu
주문|pesanan
주문하다|memesan
계산|pembayaran / perhitungan
계산하다|membayar / menghitung
숟가락|sendok
젓가락|sumpit
포크|garpu
접시|piring
컵|cangkir / gelas
반찬|lauk pendamping
국|sup
주세요|tolong berikan
더|lebih / lagi
조금|sedikit`,
  22: `돈|uang
가격|harga
카드|kartu
현금|uang tunai
사다|membeli
팔다|menjual
비싸다|mahal
싸다|murah
할인|diskon
영수증|struk
봉투|kantong
얼마|berapa harganya
색깔|warna
사이즈|ukuran
바꾸다|mengganti / menukar`,
  23: `옷|pakaian
셔츠|kemeja
바지|celana
치마|rok
신발|sepatu
양말|kaus kaki
모자|topi
가방|tas
안경|kacamata
시계|jam tangan
우산|payung
지갑|dompet
휴대전화|telepon genggam
입다|memakai pakaian
벗다|melepas pakaian`,
  24: `날씨|cuaca
비|hujan
눈|salju
바람|angin
구름|awan
봄|musim semi
여름|musim panas
가을|musim gugur
겨울|musim dingin
덥다|panas
춥다|dingin
따뜻하다|hangat
시원하다|sejuk
맑다|cerah
흐리다|mendung`,
  26: `몸|tubuh
머리|kepala / rambut
얼굴|wajah
눈|mata
코|hidung
입|mulut
귀|telinga
목|leher / tenggorokan
어깨|bahu
팔|lengan
손|tangan
손가락|jari tangan
배|perut
다리|kaki
발|telapak kaki / kaki`,
  27: `아프다|sakit
감기|flu
열|demam
기침|batuk
약|obat
약국|apotek
환자|pasien
치료|pengobatan
건강|kesehatan
검사|pemeriksaan
예약|reservasi / janji
낫다|sembuh
다치다|terluka
조심하다|berhati-hati
운동하다|berolahraga`,
  28: `기쁘다|senang
행복하다|bahagia
슬프다|sedih
화나다|marah
무섭다|takut / menakutkan
걱정하다|khawatir
피곤하다|lelah
심심하다|bosan
재미있다|menarik / menyenangkan
재미없다|tidak menarik / membosankan
놀라다|terkejut
부끄럽다|malu
편하다|nyaman
불편하다|tidak nyaman
좋아하다|menyukai`,
  29: `취미|hobi
음악|musik
노래|lagu
영화|film
드라마|drama
게임|permainan
사진|foto
여행|perjalanan / wisata
산책|jalan-jalan
운동|olahraga
축구|sepak bola
수영|berenang
요리|memasak
노래하다|bernyanyi
찍다|mengambil foto`,
  31: `일하다|bekerja
출근하다|berangkat kerja
퇴근하다|pulang kerja
회의|rapat
사무실|kantor
대표님|direktur / pimpinan perusahaan
부장님|kepala departemen
팀장님|ketua tim
동료|rekan kerja
업무|pekerjaan / tugas kerja
자료|bahan / data
이메일|surel / email
전화|telepon
바쁘다|sibuk
끝나다|selesai`,
  32: `수업|pelajaran / kelas
숙제|pekerjaan rumah
질문|pertanyaan
대답|jawaban
설명|penjelasan
연습|latihan
단어|kosakata
문장|kalimat
문법|tata bahasa
발음|pelafalan
뜻|arti
기억하다|mengingat
잊다|lupa
이해하다|memahami
가르치다|mengajar`,
  33: `길|jalan
위치|lokasi
왼쪽|kiri
오른쪽|kanan
앞|depan
뒤|belakang
옆|samping
안|dalam
밖|luar
위|atas
아래|bawah
근처|sekitar / dekat
멀다|jauh
가깝다|dekat
건너다|menyeberang`,
  34: `타다|naik
내리다|turun
출발하다|berangkat
도착하다|tiba
기다리다|menunggu
걷다|berjalan kaki
운전하다|mengemudi
돌아가다|kembali / pulang
지나가다|melewati
세우다|menghentikan / mendirikan
신호등|lampu lalu lintas
횡단보도|penyeberangan pejalan kaki
길을 잃다|tersesat
교통|transportasi / lalu lintas
막히다|macet / tersumbat`,
  36: `약속|janji
계획|rencana
일정|jadwal
준비하다|mempersiapkan
시작하다|memulai
결정하다|memutuskan
만나다|bertemu
연락하다|menghubungi
초대하다|mengundang
참석하다|menghadiri
가능하다|memungkinkan / bisa
취소하다|membatalkan
늦다|terlambat
일찍|lebih awal
함께|bersama`,
  37: `씻다|mencuci / membersihkan diri
샤워하다|mandi
청소하다|membersihkan
빨래하다|mencuci pakaian
요리하다|memasak
만들다|membuat
열다|membuka
닫다|menutup
켜다|menyalakan
끄다|mematikan
넣다|memasukkan
꺼내다|mengeluarkan
앉다|duduk
서다|berdiri
눕다|berbaring`,
  38: `부탁하다|meminta bantuan
도와주다|membantu
물어보다|bertanya
대화하다|bercakap-cakap
소개하다|memperkenalkan
인사하다|memberi salam
약속하다|berjanji
동의하다|setuju
반대하다|tidak setuju / menentang
생각하다|berpikir
믿다|percaya
알다|tahu / mengenal
필요하다|perlu / membutuhkan
원하다|menginginkan
괜찮다|baik-baik saja`,
  39: `항상|selalu
보통|biasanya
가끔|kadang-kadang
별로|tidak terlalu
전혀|sama sekali tidak
아직|masih / belum
벌써|sudah
다시|lagi / kembali
먼저|terlebih dahulu
나중에|nanti
정말|benar-benar
아주|sangat
너무|terlalu / sangat
거의|hampir
꼭|pasti / harus`,
};

// 각 학습일에는 해당 날짜의 단어를 활용한 예문이 정확히 5개씩 있다.
const sentenceRows = {
  1: `안녕하세요. 제 이름은 수진입니다.|Halo. Nama saya Sujin.
저는 학생입니다.|Saya seorang pelajar.
저는 인도네시아 사람입니다.|Saya orang Indonesia.
선생님은 한국 사람입니다.|Guru adalah orang Korea.
반갑습니다.|Senang bertemu dengan Anda.`,
  2: `제 친구는 요리사입니다.|Teman saya seorang koki.
우리 가족은 네 명입니다.|Keluarga kami berjumlah empat orang.
저분은 사장님입니다.|Beliau adalah pemilik usaha.
언니는 간호사입니다.|Kakak perempuan saya seorang perawat.
그 사람은 유명한 배우입니다.|Orang itu aktor yang terkenal.`,
  3: `도와주셔서 감사합니다.|Terima kasih sudah membantu saya.
늦어서 죄송합니다.|Maaf saya terlambat.
네, 괜찮아요.|Ya, tidak apa-apa.
처음 뵙겠습니다. 반갑습니다.|Senang bertemu dengan Anda untuk pertama kalinya.
다음에 또 만나요.|Sampai bertemu lagi lain kali.`,
  4: `이것은 무엇입니까?|Apa ini?
저 사람은 누구입니까?|Siapa orang itu?
화장실은 어디입니까?|Di mana toilet?
수업은 언제 시작합니까?|Kapan kelas dimulai?
어떻게 한국어를 공부합니까?|Bagaimana Anda belajar bahasa Korea?`,
  6: `사과 하나 주세요.|Tolong beri saya satu apel.
학생이 둘 있습니다.|Ada dua pelajar.
빵을 세 개 샀어요.|Saya membeli tiga roti.
가족은 다섯 명입니다.|Keluarga saya berjumlah lima orang.
지금 열 시입니다.|Sekarang pukul sepuluh.`,
  7: `저의 부모님입니다.|Ini orang tua saya.
아버지는 회사원입니다.|Ayah saya bekerja di perusahaan.
어머니는 요리를 잘합니다.|Ibu saya pandai memasak.
저는 동생이 한 명 있습니다.|Saya punya satu adik.
언니에게 아들과 딸이 있습니다.|Kakak perempuan saya punya seorang putra dan putri.`,
  8: `저는 아침에 밥을 먹어요.|Saya makan nasi pada pagi hari.
물을 한 잔 마셔요.|Saya minum segelas air.
빵하고 우유를 샀어요.|Saya membeli roti dan susu.
한국 고기와 생선을 좋아해요.|Saya suka daging dan ikan Korea.
김치에는 채소가 들어가요.|Kimchi berisi sayuran.`,
  9: `이 음식을 먹어 보세요.|Cobalah makan makanan ini.
커피를 마시고 싶어요.|Saya ingin minum kopi.
김치가 맵지만 맛있어요.|Kimchi pedas tetapi enak.
이 국은 조금 짜요.|Sup ini sedikit asin.
저는 지금 배고파요.|Saya lapar sekarang.`,
  11: `저는 학교에서 한국어를 공부해요.|Saya belajar bahasa Korea di sekolah.
교실에서 책을 읽어요.|Saya membaca buku di ruang kelas.
공책에 연필로 써요.|Saya menulis di buku catatan dengan pensil.
시험 문제를 풀어요.|Saya mengerjakan soal ujian.
선생님에게 문법을 배워요.|Saya mempelajari tata bahasa dari guru.`,
  12: `우리 집에는 방이 세 개 있어요.|Rumah kami memiliki tiga kamar.
가족이 거실에 있어요.|Keluarga saya ada di ruang keluarga.
어머니는 부엌에서 요리해요.|Ibu memasak di dapur.
책상 옆에 의자가 있어요.|Ada kursi di sebelah meja belajar.
창문을 열고 문을 닫아요.|Saya membuka jendela dan menutup pintu.`,
  13: `오늘 아침에 운동했어요.|Saya berolahraga pagi ini.
어제는 친구를 만났어요.|Kemarin saya bertemu teman.
내일 점심을 같이 먹어요.|Besok mari makan siang bersama.
지금 몇 시예요?|Sekarang pukul berapa?
수업은 삼십 분 후에 시작해요.|Kelas dimulai tiga puluh menit lagi.`,
  14: `월요일에 수업이 있어요.|Saya punya kelas pada hari Senin.
금요일에는 친구를 만나요.|Saya bertemu teman pada hari Jumat.
주말에 공원에 가요.|Saya pergi ke taman pada akhir pekan.
저는 매일 한국어를 공부해요.|Saya belajar bahasa Korea setiap hari.
일요일에는 자주 쉬어요.|Saya sering beristirahat pada hari Minggu.`,
  16: `저는 회사에 가요.|Saya pergi ke kantor.
아프면 병원에 가세요.|Jika sakit, pergilah ke rumah sakit.
은행은 시장 옆에 있어요.|Bank berada di sebelah pasar.
편의점에서 물을 샀어요.|Saya membeli air di minimarket.
도서관 근처에 카페가 있어요.|Ada kafe dekat perpustakaan.`,
  17: `아침에 버스를 타요.|Saya naik bus pada pagi hari.
지하철로 회사에 가요.|Saya pergi ke kantor dengan kereta bawah tanah.
서울역에서 기차를 탔어요.|Saya naik kereta api di Stasiun Seoul.
공항까지 택시로 가요.|Saya pergi ke bandara dengan taksi.
정류장에서 표를 확인해요.|Saya memeriksa tiket di halte.`,
  18: `학교에 가서 친구를 만나요.|Saya pergi ke sekolah dan bertemu teman.
저녁에 드라마를 봐요.|Saya menonton drama pada malam hari.
한국 노래를 듣고 따라 말해요.|Saya mendengarkan lagu Korea dan mengikutinya.
책을 읽고 공책에 써요.|Saya membaca buku dan menulis di buku catatan.
일찍 자고 일찍 일어나요.|Saya tidur dan bangun lebih awal.`,
  19: `이 책은 아주 좋아요.|Buku ini sangat bagus.
큰 가방과 작은 가방이 있어요.|Ada tas besar dan tas kecil.
시장에 사람이 많아요.|Ada banyak orang di pasar.
버스가 지하철보다 느려요.|Bus lebih lambat daripada kereta bawah tanah.
이 문제는 쉽지만 저 문제는 어려워요.|Soal ini mudah, tetapi soal itu sulit.`,
  21: `메뉴를 보고 음식을 주문했어요.|Saya melihat menu dan memesan makanan.
숟가락하고 젓가락 주세요.|Tolong beri sendok dan sumpit.
접시와 컵을 하나 더 주세요.|Tolong beri satu piring dan gelas lagi.
반찬하고 국을 조금 더 주세요.|Tolong beri sedikit lauk dan sup lagi.
카드로 계산해도 돼요?|Bolehkah saya membayar dengan kartu?`,
  22: `이 가방 가격이 얼마예요?|Berapa harga tas ini?
카드와 현금 중에 무엇이 가능해요?|Mana yang bisa digunakan, kartu atau uang tunai?
이 옷은 비싸지만 저 옷은 싸요.|Baju ini mahal, tetapi baju itu murah.
할인한 영수증을 봉투에 넣어 주세요.|Tolong masukkan struk diskon ke dalam kantong.
다른 색깔과 사이즈로 바꾸고 싶어요.|Saya ingin menukarnya dengan warna dan ukuran lain.`,
  23: `오늘은 흰 셔츠와 검은 바지를 입었어요.|Hari ini saya memakai kemeja putih dan celana hitam.
집에서 신발과 양말을 벗어요.|Saya melepas sepatu dan kaus kaki di rumah.
가방 안에 지갑과 휴대전화가 있어요.|Ada dompet dan telepon genggam di dalam tas.
비가 와서 우산을 가져왔어요.|Saya membawa payung karena hujan.
새 모자와 안경이 잘 어울려요.|Topi dan kacamata baru itu terlihat cocok.`,
  24: `오늘 날씨는 맑고 따뜻해요.|Cuaca hari ini cerah dan hangat.
비가 오고 바람이 많이 불어요.|Hujan turun dan angin bertiup kencang.
겨울에는 눈이 와서 추워요.|Pada musim dingin turun salju dan cuacanya dingin.
여름은 덥지만 가을은 시원해요.|Musim panas panas, tetapi musim gugur sejuk.
하늘에 구름이 많아서 흐려요.|Cuaca mendung karena banyak awan di langit.`,
  26: `운동한 후에 몸이 조금 아파요.|Tubuh saya sedikit sakit setelah berolahraga.
머리와 어깨를 천천히 움직이세요.|Gerakkan kepala dan bahu perlahan.
눈, 코, 입은 얼굴에 있어요.|Mata, hidung, dan mulut ada di wajah.
손가락으로 귀와 목을 가리켜 보세요.|Cobalah menunjuk telinga dan leher dengan jari.
많이 걸어서 다리와 발이 피곤해요.|Kaki dan telapak kaki saya lelah karena banyak berjalan.`,
  27: `감기에 걸려서 열과 기침이 있어요.|Saya flu, demam, dan batuk.
약국에서 감기약을 샀어요.|Saya membeli obat flu di apotek.
환자는 병원에서 검사를 받았어요.|Pasien menjalani pemeriksaan di rumah sakit.
치료를 받고 빨리 나았어요.|Saya cepat sembuh setelah mendapat pengobatan.
다치지 않도록 조심해서 운동하세요.|Berolahragalah dengan hati-hati agar tidak terluka.`,
  28: `시험에 합격해서 정말 기쁘고 행복해요.|Saya sangat senang dan bahagia karena lulus ujian.
친구가 떠나서 조금 슬퍼요.|Saya sedikit sedih karena teman saya pergi.
늦을까 봐 걱정하고 화가 났어요.|Saya khawatir akan terlambat dan merasa marah.
무서운 영화를 보고 놀랐어요.|Saya terkejut setelah menonton film yang menakutkan.
이 의자는 편하지만 저 의자는 불편해요.|Kursi ini nyaman, tetapi kursi itu tidak nyaman.`,
  29: `제 취미는 음악을 듣는 것입니다.|Hobi saya adalah mendengarkan musik.
주말에 영화와 드라마를 자주 봐요.|Saya sering menonton film dan drama pada akhir pekan.
친구와 게임을 하고 축구도 해요.|Saya bermain gim dan sepak bola bersama teman.
여행할 때 사진을 많이 찍어요.|Saya mengambil banyak foto saat berwisata.
저는 수영, 산책, 요리를 좋아해요.|Saya suka berenang, berjalan-jalan, dan memasak.`,
  31: `저는 매일 아침 아홉 시에 출근해요.|Saya berangkat kerja pukul sembilan setiap pagi.
대표님과 팀장님이 회의에 참석해요.|Direktur dan ketua tim menghadiri rapat.
동료에게 업무 자료를 이메일로 보냈어요.|Saya mengirim data pekerjaan kepada rekan kerja melalui email.
사무실이 바빠서 전화할 시간이 없어요.|Kantor sibuk sehingga saya tidak punya waktu menelepon.
회의가 끝나면 바로 퇴근할 거예요.|Saya akan langsung pulang kerja setelah rapat selesai.`,
  32: `오늘 수업에서 새로운 문법을 배웠어요.|Saya mempelajari tata bahasa baru di kelas hari ini.
숙제의 질문을 읽고 대답을 써 보세요.|Bacalah pertanyaan tugas dan coba tulis jawabannya.
선생님의 설명을 듣고 문장을 이해했어요.|Saya memahami kalimat setelah mendengar penjelasan guru.
단어의 뜻과 발음을 함께 기억하세요.|Ingatlah arti dan pelafalan kosakata bersama-sama.
잊지 않도록 매일 말하기를 연습해요.|Saya berlatih berbicara setiap hari agar tidak lupa.`,
  33: `은행 위치를 물어보려고 길을 멈췄어요.|Saya berhenti untuk menanyakan lokasi bank.
카페는 도서관 왼쪽에 있어요.|Kafe berada di sebelah kiri perpustakaan.
화장실은 계단 아래가 아니라 위에 있어요.|Toilet berada di atas tangga, bukan di bawah.
집 앞에는 공원이 있고 뒤에는 시장이 있어요.|Ada taman di depan rumah dan pasar di belakangnya.
역은 여기에서 멀지 않고 아주 가까워요.|Stasiun tidak jauh dari sini dan sangat dekat.`,
  34: `버스를 타고 세 번째 정류장에서 내리세요.|Naiklah bus dan turun di halte ketiga.
기차가 출발하기 전에 역에서 기다렸어요.|Saya menunggu di stasiun sebelum kereta berangkat.
공항에 도착한 후 자동차를 운전했어요.|Saya mengemudikan mobil setelah tiba di bandara.
신호등 앞 횡단보도에서 길을 건너세요.|Menyeberanglah di penyeberangan depan lampu lalu lintas.
퇴근 시간에는 교통이 막혀서 늦게 돌아가요.|Saat pulang kerja lalu lintas macet sehingga saya pulang terlambat.`,
  36: `친구와 주말에 만날 약속을 했어요.|Saya membuat janji bertemu teman pada akhir pekan.
여행 계획과 일정을 함께 준비했어요.|Kami mempersiapkan rencana dan jadwal perjalanan bersama.
회의를 아홉 시에 시작하기로 결정했어요.|Kami memutuskan untuk memulai rapat pukul sembilan.
동료를 행사에 초대하고 다시 연락했어요.|Saya mengundang rekan kerja ke acara dan menghubunginya lagi.
참석이 불가능하면 약속을 일찍 취소하세요.|Jika tidak bisa hadir, batalkan janji lebih awal.`,
  37: `아침에 씻고 샤워한 후에 옷을 입어요.|Pada pagi hari saya membersihkan diri, mandi, lalu berpakaian.
주말에는 청소하고 빨래해요.|Pada akhir pekan saya membersihkan rumah dan mencuci pakaian.
부엌에서 요리하고 김치찌개를 만들었어요.|Saya memasak dan membuat kimchi jjigae di dapur.
창문을 열고 방의 불을 켜 주세요.|Tolong buka jendela dan nyalakan lampu kamar.
의자에 앉았다가 침대에 누웠어요.|Saya duduk di kursi lalu berbaring di tempat tidur.`,
  38: `모르는 것이 있으면 선생님에게 물어보세요.|Jika ada yang tidak diketahui, bertanyalah kepada guru.
친구에게 숙제를 도와달라고 부탁했어요.|Saya meminta teman membantu pekerjaan rumah.
새로운 동료를 소개하고 서로 인사했어요.|Saya memperkenalkan rekan baru dan kami saling memberi salam.
저는 그 의견에 동의하지만 팀장님은 반대해요.|Saya setuju dengan pendapat itu, tetapi ketua tim menentangnya.
좋은 대화를 위해 서로 믿는 것이 필요해요.|Saling percaya diperlukan untuk percakapan yang baik.`,
  39: `저는 항상 아침을 먹고 출근해요.|Saya selalu sarapan sebelum berangkat kerja.
보통 주말에 쉬지만 가끔 일해요.|Biasanya saya beristirahat pada akhir pekan, tetapi kadang-kadang bekerja.
아직 숙제를 끝내지 못했는데 친구는 벌써 끝냈어요.|Saya belum menyelesaikan tugas, tetapi teman saya sudah selesai.
먼저 단어를 읽고 나중에 다시 써 보세요.|Baca kosakata terlebih dahulu, lalu coba tulis lagi nanti.
한국어가 아주 어렵지만 꼭 잘하고 싶어요.|Bahasa Korea sangat sulit, tetapi saya benar-benar ingin mahir.`,
};

/* 한글 음절을 기본 로마자로 바꾸는 함수이다. 음성은 로마자가 아니라 한국어 원문을 읽는다. */
function romanizeKorean(text) {
  const initials = [
    "g",
    "kk",
    "n",
    "d",
    "tt",
    "r",
    "m",
    "b",
    "pp",
    "s",
    "ss",
    "",
    "j",
    "jj",
    "ch",
    "k",
    "t",
    "p",
    "h",
  ];
  const vowels = [
    "a",
    "ae",
    "ya",
    "yae",
    "eo",
    "e",
    "yeo",
    "ye",
    "o",
    "wa",
    "wae",
    "oe",
    "yo",
    "u",
    "wo",
    "we",
    "wi",
    "yu",
    "eu",
    "ui",
    "i",
  ];
  const finals = [
    "",
    "k",
    "k",
    "ks",
    "n",
    "nj",
    "nh",
    "t",
    "l",
    "lk",
    "lm",
    "lb",
    "ls",
    "lt",
    "lp",
    "lh",
    "m",
    "p",
    "ps",
    "t",
    "t",
    "ng",
    "t",
    "t",
    "k",
    "t",
    "p",
    "h",
  ];
  let result = "";
  for (const char of text) {
    const code = char.charCodeAt(0) - 0xac00;
    if (code >= 0 && code <= 11171) {
      const initial = Math.floor(code / 588);
      const vowel = Math.floor((code % 588) / 28);
      const final = code % 28;
      result += initials[initial] + vowels[vowel] + finals[final];
    } else {
      result += char;
    }
  }
  return result
    .toLowerCase()
    .replace(/ipnida/g, "imnida")
    .replace(/hapnida/g, "hamnida")
    .replace(/seupnida/g, "seumnida")
    .replace(/\s+/g, " ")
    .trim();
}

function inferPartOfSpeech(korean, day) {
  if (day === 39 || ["더", "조금", "매일", "자주", "지금"].includes(korean))
    return "부사";
  if (korean.endsWith("다"))
    return [
      "좋다",
      "나쁘다",
      "크다",
      "작다",
      "많다",
      "적다",
      "빠르다",
      "느리다",
      "쉽다",
      "어렵다",
      "비싸다",
      "싸다",
      "덥다",
      "춥다",
      "따뜻하다",
      "시원하다",
      "맑다",
      "흐리다",
      "아프다",
      "기쁘다",
      "슬프다",
      "무섭다",
      "피곤하다",
      "심심하다",
      "재미있다",
      "재미없다",
      "부끄럽다",
      "편하다",
      "불편하다",
      "바쁘다",
      "멀다",
      "가깝다",
      "가능하다",
      "늦다",
      "괜찮다",
      "맛있다",
      "맛없다",
      "맵다",
      "달다",
      "짜다",
      "뜨겁다",
      "차갑다",
      "배고프다",
    ].includes(korean)
      ? "형용사"
      : "동사";
  if (
    [
      "안녕하세요",
      "감사합니다",
      "죄송합니다",
      "괜찮아요",
      "반갑습니다",
      "네",
      "아니요",
      "안녕히 가세요",
      "안녕히 계세요",
      "주세요",
    ].includes(korean)
  )
    return "표현";
  return "명사";
}

function parseRows(text) {
  return text
    .trim()
    .split("\n")
    .map((row) => row.split("|").map((value) => value.trim()));
}

// 원본을 courseData 배열로 변환한다. 화면은 오직 이 배열을 기준으로 그린다.
const courseData = [];
let vocabularyId = 1;
for (let day = 1; day <= 40; day++) {
  if (REVIEW_DAYS.has(day)) {
    courseData.push({
      day,
      type: "review",
      title:
        day === 40 ? "Review Terakhir" : `Review Day ${day - 4}–${day - 1}`,
      koreanTitle: day === 40 ? "최종 복습" : `Day ${day - 4}~${day - 1} 복습`,
      description: `Ulangi kosakata dari Day ${day - 4} sampai Day ${day - 1}.`,
      emoji: "📝",
      level: "Review",
      reviewDays: [day - 4, day - 3, day - 2, day - 1],
    });
    continue;
  }
  const meta = lessonMeta[day];
  const vocabulary = parseRows(vocabularyRows[day]).map(
    ([korean, indonesian]) => {
      const meaningNumber =
        day === 24 && korean === "눈"
          ? 2
          : day === 26 && korean === "눈"
            ? 1
            : 1;
      return {
        id: vocabularyId++,
        day,
        korean,
        indonesian,
        romanization: romanizeKorean(korean),
        partOfSpeech: inferPartOfSpeech(korean, day),
        category: meta[1],
        meaningNumber,
        audioText: korean,
      };
    },
  );
  const sentences = parseRows(sentenceRows[day]).map(
    ([korean, indonesian], index) => ({
      id: `${day}-${index + 1}`,
      korean,
      indonesian,
      romanization: romanizeKorean(korean),
      audioText: korean,
    }),
  );
  courseData.push({
    day,
    type: "lesson",
    title: meta[0],
    koreanTitle: meta[1],
    description: meta[2],
    emoji: meta[3],
    level: day <= 20 ? "Pemula" : "Pemula–Menengah",
    grammar: meta[4],
    grammarMeaning: meta[5],
    vocabulary,
    sentences,
  });
}

/* =========================================================
   2. 학습 기록과 공통 상태
========================================================= */
const STORAGE_KEY = "hangukStepProgressV1";
let savedProgress = loadProgress();
let currentDay = 1;
let activeTab = "vocabulary";
let speakingIndex = 0;
let quizRuntime = null;
let mediaRecorder = null;
let recordedChunks = [];
let recordedAudioUrl = "";

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (error) {
    return {};
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProgress));
  } catch (error) {
    showToast("Progres belum dapat disimpan di browser ini.");
  }
  updateAllProgressUI();
}

function getDayState(dayNumber) {
  const lesson = courseData.find((item) => item.day === dayNumber);
  if (!savedProgress[dayNumber]) {
    savedProgress[dayNumber] =
      lesson.type === "lesson"
        ? {
            words: [],
            sentences: [],
            checkAnswers: [],
            checkScore: 0,
            completed: false,
          }
        : {
            answers: [],
            wrongAnswers: [],
            typeScores: { A: 0, B: 0, C: 0 },
            score: 0,
            completed: false,
          };
  }
  return savedProgress[dayNumber];
}

function getDayProgress(lesson) {
  const state = getDayState(lesson.day);
  if (lesson.type === "review") {
    if (state.completed) return 100;
    return Math.round((state.answers.length / 15) * 100);
  }
  return Math.round(
    ((state.words.length + state.sentences.length) /
      (lesson.vocabulary.length + lesson.sentences.length)) *
      100,
  );
}

function getOverallProgress() {
  const completedDays = courseData.filter(
    (item) => getDayState(item.day).completed,
  ).length;
  return Math.round((completedDays / courseData.length) * 100);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2500);
}

/* =========================================================
   3. 헤더, 데모 카드, 커리큘럼
========================================================= */
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
});
mainNav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }),
);

document
  .querySelector(".demo-pronunciation")
  .addEventListener("click", (event) => {
    const text = document.querySelector(".demo-romanization");
    text.hidden = !text.hidden;
    event.currentTarget.textContent = text.hidden
      ? "Lihat pelafalan"
      : "Sembunyikan pelafalan";
  });
document
  .querySelector(".demo-audio")
  .addEventListener("click", () => speakKorean("안녕하세요"));

// Web Speech API로 한국어 원문을 읽는다. 미지원 브라우저에서도 오류가 나지 않는다.
function speakKorean(text, rate = 0.9) {
  if (!("speechSynthesis" in window)) {
    showToast("Audio belum didukung di browser ini.");
    return;
  }
  window.speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.lang = "ko-KR";
  speech.rate = rate;
  window.speechSynthesis.speak(speech);
}

function renderCurriculum() {
  const modulesGrid = document.getElementById("modulesGrid");
  modulesGrid.innerHTML = "";
  for (let moduleNumber = 1; moduleNumber <= 8; moduleNumber++) {
    const moduleLessons = courseData.slice(
      (moduleNumber - 1) * 5,
      moduleNumber * 5,
    );
    const completed = moduleLessons.filter(
      (item) => getDayState(item.day).completed,
    ).length;
    const modulePercent = Math.round((completed / moduleLessons.length) * 100);
    const card = document.createElement("article");
    card.className = "module-card visible";
    card.innerHTML = `
      <div class="module-head"><span>MODUL ${moduleNumber}</span><small>${completed} / ${moduleLessons.length} selesai</small></div>
      <h3>${moduleNumber === 8 ? "Langkah terakhir" : `Langkah ${moduleNumber}`}</h3>
      <div class="module-list">${moduleLessons
        .map((item) => {
          const progress = getDayProgress(item);
          const done = getDayState(item.day).completed;
          return `<button type="button" class="module-day-row ${item.type === "review" ? "is-review" : ""} ${done ? "is-done" : ""}" data-day="${item.day}">
          <span class="module-day-icon">${done ? "✓" : item.emoji}</span>
          <span class="module-day-copy"><b>Day ${item.day} · ${item.koreanTitle}</b><small>${item.type === "review" ? "15 soal review" : `${item.vocabulary.length} kosakata`} · ${progress}%</small></span>
          <span aria-hidden="true">›</span>
        </button>`;
        })
        .join("")}</div>
      <div class="module-progress"><span><i style="width:${modulePercent}%"></i></span><small>${modulePercent}%</small></div>`;
    modulesGrid.appendChild(card);
  }
}

function renderDaySidebar() {
  document.getElementById("daySidebar").innerHTML = courseData
    .map((item) => {
      const done = getDayState(item.day).completed;
      return `<button type="button" data-day="${item.day}" class="sidebar-day ${item.type === "review" ? "is-review" : ""} ${item.day === currentDay ? "is-active" : ""}">
      <span>${done ? "✓" : item.emoji}</span><b>Day ${item.day}</b><small>${item.type === "review" ? "Review" : item.koreanTitle}</small>
    </button>`;
    })
    .join("");
}

function updateAllProgressUI() {
  renderCurriculum();
  renderDaySidebar();
  const percent = getOverallProgress();
  document
    .querySelectorAll("[data-overall-progress]")
    .forEach((element) => (element.textContent = `${percent}%`));
}

/* =========================================================
   4. Day 선택과 일반 학습 화면
========================================================= */
function openDay(dayNumber, shouldScroll = true) {
  currentDay = dayNumber;
  activeTab =
    courseData.find((item) => item.day === dayNumber).type === "review"
      ? "review"
      : "vocabulary";
  quizRuntime = null;
  speakingIndex = 0;
  renderDaySidebar();
  renderLearningDay();
  if (shouldScroll)
    document
      .getElementById("belajar")
      .scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderLearningDay() {
  const lesson = courseData.find((item) => item.day === currentDay);
  const state = getDayState(currentDay);
  const progress = getDayProgress(lesson);
  const tabButtons =
    lesson.type === "lesson"
      ? `
    <div class="lesson-tabs" role="tablist" aria-label="Tahap belajar">
      <button type="button" role="tab" data-tab="vocabulary" class="${activeTab === "vocabulary" ? "is-active" : ""}">01 Kosakata</button>
      <button type="button" role="tab" data-tab="sentences" class="${activeTab === "sentences" ? "is-active" : ""}">02 Kalimat</button>
      <button type="button" role="tab" data-tab="speaking" class="${activeTab === "speaking" ? "is-active" : ""}">03 Berbicara</button>
      <button type="button" role="tab" data-tab="quick" class="${activeTab === "quick" ? "is-active" : ""}">04 Cek Cepat</button>
    </div>`
      : "";
  document.getElementById("learningMain").innerHTML = `
    <div class="lesson-hero ${lesson.type === "review" ? "review-hero" : ""}">
      <div class="lesson-title-row"><span class="lesson-emoji">${lesson.emoji}</span><div><div class="lesson-badges"><span>DAY ${lesson.day}</span><span>${lesson.level}</span>${lesson.type === "review" ? '<span class="review-badge">REVIEW</span>' : ""}</div><h2>${lesson.koreanTitle}</h2><p>${lesson.title}</p></div></div>
      <div class="lesson-progress-box"><strong>${progress}%</strong><span>Progres Day</span></div>
    </div>
    <p class="lesson-description">${lesson.description}</p>
    ${lesson.type === "lesson" ? `<div class="grammar-note"><span>문법</span><div><b>${lesson.grammar}</b><small>${lesson.grammarMeaning}</small></div></div>` : ""}
    ${tabButtons}
    <div id="tabContent" aria-live="polite"></div>`;
  if (lesson.type === "review") renderReviewIntro(lesson);
  else renderLessonTab();
}

function renderLessonTab() {
  const lesson = courseData.find((item) => item.day === currentDay);
  if (activeTab === "vocabulary") renderVocabulary(lesson);
  if (activeTab === "sentences") renderSentences(lesson);
  if (activeTab === "speaking") renderSpeaking(lesson);
  if (activeTab === "quick") renderQuickCheck(lesson);
}

function renderVocabulary(lesson) {
  const state = getDayState(lesson.day);
  document.getElementById("tabContent").innerHTML = `
    <div class="tab-intro"><div><span>LANGKAH 1</span><h3>Pelajari ${lesson.vocabulary.length} kosakata</h3></div><p>Tekan audio, lihat pelafalan jika perlu, lalu tandai kata yang sudah kamu pelajari.</p></div>
    <div class="vocabulary-grid">${lesson.vocabulary
      .map((word) => {
        const done = state.words.includes(word.id);
        return `<article class="word-card ${done ? "is-learned" : ""}" data-word-card="${word.id}">
        <div class="word-card-top"><span>${word.partOfSpeech}</span><span>${word.category}</span></div>
        <h4>${word.korean}</h4><p>${word.indonesian}</p><small class="romanization" hidden>${word.romanization}</small>
        <div class="word-actions"><button type="button" class="round-action" data-action="speak" data-text="${escapeAttribute(word.audioText)}" aria-label="Dengarkan kata ${escapeAttribute(word.korean)}">🔊</button><button type="button" class="pronunciation-toggle" data-action="pronunciation">Lihat pelafalan</button></div>
        <button type="button" class="learn-check ${done ? "is-active" : ""}" data-action="toggle-word" data-id="${word.id}"><span>${done ? "✓" : "○"}</span>${done ? "Sudah dipelajari" : "Tandai sudah belajar"}</button>
      </article>`;
      })
      .join("")}</div>
    <div class="tab-footer"><span>${state.words.length} dari ${lesson.vocabulary.length} kosakata selesai</span><button type="button" class="button" data-tab="sentences">Lanjut ke Kalimat →</button></div>`;
}

function renderSentences(lesson) {
  const state = getDayState(lesson.day);
  document.getElementById("tabContent").innerHTML = `
    <div class="tab-intro"><div><span>LANGKAH 2</span><h3>Belajar lewat 5 kalimat</h3></div><p>Dengarkan pada kecepatan normal atau pelan. Terjemahan menggunakan bentuk sopan “saya”.</p></div>
    <div class="sentence-list">${lesson.sentences
      .map((sentence, index) => {
        const done = state.sentences.includes(sentence.id);
        return `<article class="sentence-card ${done ? "is-learned" : ""}">
        <span class="sentence-number">${String(index + 1).padStart(2, "0")}</span><div class="sentence-copy"><h4>${sentence.korean}</h4><p>${sentence.indonesian}</p><small class="romanization" hidden>${sentence.romanization}</small>
        <div class="sentence-actions"><button type="button" data-action="speak" data-text="${escapeAttribute(sentence.audioText)}" class="mini-action">🔊 Normal</button><button type="button" data-action="speak-slow" data-text="${escapeAttribute(sentence.audioText)}" class="mini-action">🐢 Pelan</button><button type="button" data-action="pronunciation" class="pronunciation-toggle">Lihat pelafalan</button></div></div>
        <button type="button" class="sentence-check ${done ? "is-active" : ""}" data-action="toggle-sentence" data-id="${sentence.id}" aria-label="Tandai kalimat ${index + 1} sudah dipelajari">${done ? "✓" : "○"}</button>
      </article>`;
      })
      .join("")}</div>
    <div class="tab-footer"><span>${state.sentences.length} dari ${lesson.sentences.length} kalimat selesai</span><button type="button" class="button" data-tab="speaking">Lanjut Berbicara →</button></div>`;
}

function renderSpeaking(lesson) {
  const sentence = lesson.sentences[speakingIndex];
  document.getElementById("tabContent").innerHTML = `
    <div class="tab-intro"><div><span>LANGKAH 3</span><h3>Latihan berbicara</h3></div><p>Dengarkan, tirukan, lalu rekam suaramu. Aplikasi tidak menampilkan skor pelafalan palsu.</p></div>
    <div class="speaking-card">
      <div class="speaking-progress"><span>Kalimat ${speakingIndex + 1} / ${lesson.sentences.length}</span><div><i style="width:${((speakingIndex + 1) / lesson.sentences.length) * 100}%"></i></div></div>
      <span class="speaking-quote">“</span><h3>${sentence.korean}</h3><p>${sentence.indonesian}</p><small>${sentence.romanization}</small>
      <div class="listen-row"><button type="button" class="mini-action" data-action="speak" data-text="${escapeAttribute(sentence.audioText)}">🔊 Dengarkan</button><button type="button" class="mini-action" data-action="speak-slow" data-text="${escapeAttribute(sentence.audioText)}">🐢 Pelan</button></div>
      <div class="record-panel"><button type="button" class="record-button" data-action="record" aria-label="Mulai atau hentikan rekaman"><span>🎙️</span></button><div><b id="recordStatus">Tekan mikrofon lalu ucapkan kalimat</b><small>Rekaman hanya diproses di perangkatmu.</small></div><button type="button" class="mini-action" data-action="play-recording" ${recordedAudioUrl ? "" : "disabled"}>▶ Putar ulang</button></div>
      <div class="speaking-nav"><button type="button" class="button button-ghost" data-action="previous-sentence" ${speakingIndex === 0 ? "disabled" : ""}>← Sebelumnya</button><button type="button" class="button" data-action="next-sentence">${speakingIndex === lesson.sentences.length - 1 ? "Mulai Cek Cepat →" : "Berikutnya →"}</button></div>
    </div>`;
}

/* 나중에 SpeechRecognition을 연결할 때 사용할 말하기 비교 함수의 뼈대이다. */
function startSpeakingPractice(sentenceId) {
  speakingIndex = Math.max(0, Number(sentenceId));
  renderSpeaking(courseData.find((item) => item.day === currentDay));
}
function compareSpokenSentence(targetText, spokenText) {
  return { targetText, spokenText, supported: false };
}
function showSpeakingResult() {
  showToast("Pengenalan ucapan dapat ditambahkan pada versi berikutnya.");
}

// MediaRecorder를 지원하면 실제 녹음을 시작한다.
async function startRecording() {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    showToast("Perekaman belum didukung di browser ini.");
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size) recordedChunks.push(event.data);
    });
    mediaRecorder.addEventListener("stop", () => {
      if (recordedAudioUrl) URL.revokeObjectURL(recordedAudioUrl);
      recordedAudioUrl = URL.createObjectURL(
        new Blob(recordedChunks, {
          type: mediaRecorder.mimeType || "audio/webm",
        }),
      );
      stream.getTracks().forEach((track) => track.stop());
      renderSpeaking(courseData.find((item) => item.day === currentDay));
      showToast("Rekaman selesai. Kamu bisa memutarnya kembali.");
    });
    mediaRecorder.start();
    const status = document.getElementById("recordStatus");
    if (status)
      status.textContent = "Sedang merekam… tekan mikrofon untuk berhenti";
    document.querySelector(".record-button")?.classList.add("is-recording");
  } catch (error) {
    showToast("Izin mikrofon diperlukan untuk merekam suara.");
  }
}
function stopRecording() {
  if (mediaRecorder?.state === "recording") mediaRecorder.stop();
}
function playRecordedAudio() {
  if (recordedAudioUrl)
    new Audio(recordedAudioUrl)
      .play()
      .catch(() => showToast("Rekaman belum dapat diputar."));
  else showToast("Belum ada rekaman.");
}

/* =========================================================
   5. 일반 학습일의 3문제 Cek Cepat
========================================================= */
function seededWords(pool, count, seed) {
  const copy = [...pool];
  for (let index = copy.length - 1; index > 0; index--) {
    const target = (seed * 31 + index * 17) % (index + 1);
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy.slice(0, count);
}

function createAnswerOptions(correctWord, wordPool, field, seed = 1) {
  const correct = correctWord[field];
  const uniqueWrong = [
    ...new Set(
      wordPool
        .filter((word) => word.id !== correctWord.id)
        .map((word) => word[field])
        .filter((value) => value !== correct),
    ),
  ];
  const options = [
    correct,
    ...seededWords(
      uniqueWrong.map((value) => ({ value })),
      3,
      seed,
    ).map((item) => item.value),
  ];
  const shift = seed % options.length;
  return [...options.slice(shift), ...options.slice(0, shift)];
}

function createQuickQuestions(lesson) {
  const chosen = seededWords(lesson.vocabulary, 3, lesson.day);
  return [
    {
      type: "A",
      word: chosen[0],
      prompt: `Apa arti “${chosen[0].korean}”?`,
      options: createAnswerOptions(
        chosen[0],
        lesson.vocabulary,
        "indonesian",
        lesson.day,
      ),
      answer: chosen[0].indonesian,
    },
    {
      type: "B",
      word: chosen[1],
      prompt: `Apa bahasa Korea untuk “${chosen[1].indonesian}”?`,
      options: createAnswerOptions(
        chosen[1],
        lesson.vocabulary,
        "korean",
        lesson.day + 1,
      ),
      answer: chosen[1].korean,
    },
    {
      type: "C",
      word: chosen[2],
      prompt: "Dengarkan audio lalu pilih kata Korea yang benar.",
      options: createAnswerOptions(
        chosen[2],
        lesson.vocabulary,
        "korean",
        lesson.day + 2,
      ),
      answer: chosen[2].korean,
      audio: true,
    },
  ];
}

function renderQuickCheck(lesson, reset = false) {
  const state = getDayState(lesson.day);
  if (reset) {
    state.checkAnswers = [];
    state.checkScore = 0;
    state.completed = false;
    saveProgress();
  }
  if (!quizRuntime || quizRuntime.kind !== "quick")
    quizRuntime = {
      kind: "quick",
      questions: createQuickQuestions(lesson),
      index: Math.min(state.checkAnswers.length, 2),
      answered: null,
    };
  if (state.checkAnswers.length >= quizRuntime.questions.length) {
    showQuickResult(lesson);
    return;
  }
  renderQuizQuestion(
    lesson,
    quizRuntime.questions[quizRuntime.index],
    quizRuntime.index,
    quizRuntime.questions.length,
    false,
  );
}

function showQuickResult(lesson) {
  const state = getDayState(lesson.day);
  document.getElementById("tabContent").innerHTML =
    `<div class="result-card"><span class="result-icon">🎉</span><p class="eyebrow">CEK CEPAT SELESAI</p><h3>${state.checkScore} / 3 benar</h3><p>${state.checkScore === 3 ? "Bagus! Semua jawabanmu benar." : "Kerja bagus. Ulangi kosakata yang masih membingungkan."}</p><div class="result-actions"><button type="button" class="button button-ghost" data-action="restart-quick">Ulangi kuis</button><button type="button" class="button" data-action="complete-lesson">Selesaikan Day ${lesson.day}</button></div></div>`;
}

/* =========================================================
   6. 복습일의 15문제와 결과
========================================================= */
function getReviewWords(days) {
  return courseData
    .filter((item) => days.includes(item.day) && item.type === "lesson")
    .flatMap((item) => item.vocabulary);
}

function makeReviewQuestion(word, type, pool, seed) {
  if (type === "A")
    return {
      type,
      word,
      wordId: word.id,
      prompt: `Apa arti “${word.korean}”?`,
      options: createAnswerOptions(word, pool, "indonesian", seed),
      answer: word.indonesian,
    };
  if (type === "B")
    return {
      type,
      word,
      wordId: word.id,
      prompt: `Apa bahasa Korea untuk “${word.indonesian}”?`,
      options: createAnswerOptions(word, pool, "korean", seed),
      answer: word.korean,
    };
  return {
    type,
    word,
    wordId: word.id,
    prompt: "Dengarkan audio lalu pilih kata Korea yang benar.",
    options: createAnswerOptions(word, pool, "korean", seed),
    answer: word.korean,
    audio: true,
  };
}

function createReviewQuestions(days) {
  const pool = getReviewWords(days);
  return ["A", "B", "C"].flatMap((type, typeIndex) =>
    seededWords(pool, 5, days[0] + typeIndex * 9).map((word, index) =>
      makeReviewQuestion(word, type, pool, days[0] + typeIndex * 10 + index),
    ),
  );
}

function renderReviewIntro(lesson) {
  const state = getDayState(lesson.day);
  if (state.completed) {
    showReviewResult(lesson);
    return;
  }
  document.getElementById("tabContent").innerHTML =
    `<div class="review-start"><span class="review-big-icon">📝</span><p class="eyebrow">REVIEW DAY ${lesson.day}</p><h3>Siap menguji ingatanmu?</h3><p>Kerjakan 15 soal dari Day ${lesson.reviewDays[0]}–${lesson.reviewDays[3]}. Soal tampil satu per satu dan terdiri dari tiga tipe.</p><div class="review-types"><span><b>A</b>Korea → Indonesia</span><span><b>B</b>Indonesia → Korea</span><span><b>C</b>Dengar → Korea</span></div><button type="button" class="button button-coral" data-action="start-review">Mulai 15 Soal →</button></div>`;
}

function startReview(lesson, wrongOnly = false) {
  const state = getDayState(lesson.day);
  let questions = createReviewQuestions(lesson.reviewDays);
  if (wrongOnly) {
    questions = state.wrongAnswers
      .map((wrong, index) => {
        const pool = getReviewWords(lesson.reviewDays);
        const word = pool.find((item) => item.id === wrong.wordId);
        return makeReviewQuestion(
          word,
          wrong.type,
          pool,
          lesson.day + index + 50,
        );
      })
      .filter(Boolean);
  } else {
    state.answers = [];
    state.wrongAnswers = [];
    state.typeScores = { A: 0, B: 0, C: 0 };
    state.score = 0;
    state.completed = false;
    saveProgress();
  }
  quizRuntime = {
    kind: "review",
    questions,
    index: 0,
    answered: null,
    retryMode: wrongOnly,
  };
  if (!questions.length) {
    showToast("Tidak ada soal yang perlu diulang.");
    showReviewResult(lesson);
    return;
  }
  renderReviewQuestion();
}

function renderReviewQuestion() {
  const lesson = courseData.find((item) => item.day === currentDay);
  const question = quizRuntime.questions[quizRuntime.index];
  renderQuizQuestion(
    lesson,
    question,
    quizRuntime.index,
    quizRuntime.questions.length,
    true,
  );
}

function renderQuizQuestion(lesson, question, index, total, isReview) {
  const typeText = {
    A: "Korea → Indonesia",
    B: "Indonesia → Korea",
    C: "Dengar → Korea",
  }[question.type];
  document.getElementById("tabContent").innerHTML = `<div class="quiz-card">
    <div class="quiz-head"><div><span>${isReview ? `REVIEW DAY ${lesson.day}` : "CEK CEPAT"}</span><b>Soal ${index + 1} / ${total}</b></div><span class="quiz-type">Tipe ${question.type} · ${typeText}</span></div>
    <div class="quiz-progress"><i style="width:${((index + 1) / total) * 100}%"></i></div>
    ${question.audio ? `<button type="button" class="audio-question" data-action="speak" data-text="${escapeAttribute(question.word.audioText)}" aria-label="Dengarkan kata Korea">🔊 <span>Dengarkan audio</span></button>` : ""}
    <h3>${question.prompt}</h3>
    <div class="answer-grid">${question.options.map((option, optionIndex) => `<button type="button" data-action="answer" data-value="${escapeAttribute(option)}"><span>${String.fromCharCode(65 + optionIndex)}</span>${option}</button>`).join("")}</div>
    <div id="answerFeedback" class="answer-feedback" aria-live="polite"></div>
    <button type="button" class="button quiz-next" data-action="next-question" disabled>${index === total - 1 ? "Lihat hasil" : "Soal berikutnya →"}</button>
  </div>`;
}

function checkQuizAnswer(selectedValue) {
  if (!quizRuntime || quizRuntime.answered) return;
  const question = quizRuntime.questions[quizRuntime.index];
  const correct = selectedValue === question.answer;
  quizRuntime.answered = { correct, selectedValue };
  document.querySelectorAll(".answer-grid button").forEach((button) => {
    button.disabled = true;
    if (button.dataset.value === question.answer)
      button.classList.add("is-correct");
    else if (button.dataset.value === selectedValue)
      button.classList.add("is-wrong");
  });
  const feedback = document.getElementById("answerFeedback");
  feedback.className = `answer-feedback show ${correct ? "correct" : "wrong"}`;
  feedback.innerHTML = correct
    ? `<b>✓ Jawaban benar! 🎉</b><span>${question.word.korean} = ${question.word.indonesian}</span>`
    : `<b>✕ Belum tepat.</b><span>Jawaban yang benar: “${question.answer}”. <button type="button" data-action="speak" data-text="${escapeAttribute(question.word.audioText)}" aria-label="Dengarkan jawaban benar">🔊 ${question.word.korean}</button></span>`;
  document.querySelector(".quiz-next").disabled = false;
}

function checkReviewAnswer(selectedValue) {
  checkQuizAnswer(selectedValue);
}

function nextQuizQuestion() {
  if (!quizRuntime?.answered) return;
  const lesson = courseData.find((item) => item.day === currentDay);
  const question = quizRuntime.questions[quizRuntime.index];
  if (quizRuntime.kind === "quick") {
    const state = getDayState(lesson.day);
    state.checkAnswers.push({
      type: question.type,
      wordId: question.word.id,
      correct: quizRuntime.answered.correct,
    });
    if (quizRuntime.answered.correct) state.checkScore += 1;
    saveProgress();
  } else if (!quizRuntime.retryMode) {
    const state = getDayState(lesson.day);
    state.answers.push({
      type: question.type,
      wordId: question.wordId,
      correct: quizRuntime.answered.correct,
    });
    if (quizRuntime.answered.correct) {
      state.score += 1;
      state.typeScores[question.type] += 1;
    } else
      state.wrongAnswers.push({ type: question.type, wordId: question.wordId });
    saveProgress();
  } else if (quizRuntime.answered.correct) {
    const state = getDayState(lesson.day);
    state.wrongAnswers = state.wrongAnswers.filter(
      (item) =>
        !(item.type === question.type && item.wordId === question.wordId),
    );
    saveProgress();
  }
  quizRuntime.index += 1;
  quizRuntime.answered = null;
  if (quizRuntime.index >= quizRuntime.questions.length) {
    if (quizRuntime.kind === "quick") showQuickResult(lesson);
    else {
      if (!quizRuntime.retryMode) {
        getDayState(lesson.day).completed = true;
        saveProgress();
      }
      showReviewResult(lesson, quizRuntime.retryMode);
    }
  } else {
    quizRuntime.kind === "quick"
      ? renderQuickCheck(lesson)
      : renderReviewQuestion();
  }
}

function showReviewResult(lesson, retryFinished = false) {
  const state = getDayState(lesson.day);
  const percent = Math.round((state.score / 15) * 100);
  const pool = getReviewWords(lesson.reviewDays);
  const wrongWords = state.wrongAnswers
    .map((item) => pool.find((word) => word.id === item.wordId))
    .filter(Boolean);
  document.getElementById("tabContent").innerHTML =
    `<div class="result-card review-result">
    <span class="result-icon">${lesson.day === 40 ? "🏆" : "🎉"}</span><p class="eyebrow">${retryFinished ? "LATIHAN ULANG SELESAI" : "REVIEW SELESAI"}</p>
    <h3>${lesson.day === 40 ? "Program 40 hari selesai!" : "Review selesai!"}</h3>
    ${lesson.day === 40 ? '<p class="final-copy">400 kosakata telah dipelajari.</p>' : ""}
    <div class="score-circle"><strong>${state.score}<small>/15</small></strong><span>${percent}% benar</span></div>
    <div class="type-scores"><span><b>Tipe A</b>${state.typeScores.A} / 5</span><span><b>Tipe B</b>${state.typeScores.B} / 5</span><span><b>Tipe C</b>${state.typeScores.C} / 5</span></div>
    <div class="wrong-words"><h4>Kosakata yang perlu dipelajari lagi</h4>${wrongWords.length ? `<div>${wrongWords.map((word) => `<span><b>${word.korean}</b> — ${word.indonesian} <button type="button" data-action="speak" data-text="${escapeAttribute(word.audioText)}" aria-label="Dengarkan ${escapeAttribute(word.korean)}">🔊</button></span>`).join("")}</div>` : "<p>Hebat! Tidak ada kosakata yang salah.</p>"}</div>
    <div class="result-actions">${wrongWords.length ? '<button type="button" class="button button-ghost" data-action="retry-wrong">Ulangi soal yang salah</button>' : ""}<button type="button" class="button" data-action="finish-review">Selesaikan review</button>${lesson.day === 40 ? '<button type="button" class="button button-coral" data-action="final-exam">Ujian Akhir 400 Kosakata</button>' : ""}</div>
  </div>`;
}

function retryWrongQuestions() {
  startReview(
    courseData.find((item) => item.day === currentDay),
    true,
  );
}
function startFinalExam() {
  showToast("Ujian akhir 400 kosakata akan ditambahkan pada versi berikutnya.");
}

/* =========================================================
   7. 버튼 이벤트와 진행률 갱신
========================================================= */
function toggleArrayItem(array, value) {
  const index = array.indexOf(value);
  if (index >= 0) array.splice(index, 1);
  else array.push(value);
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

document.addEventListener("click", (event) => {
  const dayButton = event.target.closest("[data-day]");
  if (dayButton) {
    openDay(Number(dayButton.dataset.day));
    return;
  }
  const tabButton = event.target.closest("[data-tab]");
  if (tabButton) {
    activeTab = tabButton.dataset.tab;
    quizRuntime = null;
    renderLearningDay();
    return;
  }
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === "speak") speakKorean(actionButton.dataset.text);
  if (action === "speak-slow") speakKorean(actionButton.dataset.text, 0.65);
  if (action === "pronunciation") {
    const card = actionButton.closest(".word-card, .sentence-card");
    const romanization = card.querySelector(".romanization");
    romanization.hidden = !romanization.hidden;
    actionButton.textContent = romanization.hidden
      ? "Lihat pelafalan"
      : "Sembunyikan pelafalan";
  }
  if (action === "toggle-word") {
    const state = getDayState(currentDay);
    toggleArrayItem(state.words, Number(actionButton.dataset.id));
    saveProgress();
    renderLearningDay();
  }
  if (action === "toggle-sentence") {
    const state = getDayState(currentDay);
    toggleArrayItem(state.sentences, actionButton.dataset.id);
    saveProgress();
    renderLearningDay();
  }
  if (action === "record")
    mediaRecorder?.state === "recording" ? stopRecording() : startRecording();
  if (action === "play-recording") playRecordedAudio();
  if (action === "previous-sentence") {
    speakingIndex = Math.max(0, speakingIndex - 1);
    renderSpeaking(courseData.find((item) => item.day === currentDay));
  }
  if (action === "next-sentence") {
    const lesson = courseData.find((item) => item.day === currentDay);
    if (speakingIndex < lesson.sentences.length - 1) {
      speakingIndex += 1;
      renderSpeaking(lesson);
    } else {
      activeTab = "quick";
      quizRuntime = null;
      renderLearningDay();
    }
  }
  if (action === "answer") checkQuizAnswer(actionButton.dataset.value);
  if (action === "next-question") nextQuizQuestion();
  if (action === "restart-quick") {
    quizRuntime = null;
    renderQuickCheck(
      courseData.find((item) => item.day === currentDay),
      true,
    );
  }
  if (action === "complete-lesson") {
    getDayState(currentDay).completed = true;
    saveProgress();
    showToast(`Day ${currentDay} selesai!`);
    renderLearningDay();
  }
  if (action === "start-review")
    startReview(courseData.find((item) => item.day === currentDay));
  if (action === "retry-wrong") retryWrongQuestions();
  if (action === "finish-review") {
    getDayState(currentDay).completed = true;
    saveProgress();
    showToast(`Review Day ${currentDay} selesai!`);
    renderLearningDay();
  }
  if (action === "final-exam") startFinalExam();
});

document
  .querySelectorAll(".start-day-one")
  .forEach((button) => button.addEventListener("click", () => openDay(1)));
document
  .getElementById("openFirstReview")
  .addEventListener("click", () => openDay(5));

// 정적인 영역이 스크롤 안으로 들어오면 부드럽게 나타난다.
const observer =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
          }),
        { threshold: 0.1 },
      )
    : null;
document
  .querySelectorAll(".reveal")
  .forEach((element) =>
    observer ? observer.observe(element) : element.classList.add("visible"),
  );

/* =========================================================
   8. 데이터 자동 검증
   개발자 도구 콘솔에서 전체 데이터 개수를 즉시 확인할 수 있다.
========================================================= */
function validateCourseData() {
  const lessonDays = courseData.filter((item) => item.type === "lesson");
  const reviews = courseData.filter((item) => item.type === "review");
  const vocabularyCount = lessonDays.reduce(
    (sum, item) => sum + item.vocabulary.length,
    0,
  );
  const errors = [];
  if (courseData.length !== 40) errors.push("Day 개수가 40개가 아닙니다.");
  if (lessonDays.length !== 32) errors.push("학습일이 32개가 아닙니다.");
  if (reviews.length !== 8) errors.push("복습일이 8개가 아닙니다.");
  if (vocabularyCount !== 400)
    errors.push(`전체 단어가 ${vocabularyCount}개입니다.`);
  lessonDays.forEach((item) => {
    const expected = item.day <= 20 ? 10 : 15;
    if (item.vocabulary.length !== expected)
      errors.push(`Day ${item.day} 단어 수 오류`);
    if (item.sentences.length !== 5)
      errors.push(`Day ${item.day} 예문 수 오류`);
  });
  reviews.forEach((item) => {
    if (!REVIEW_DAYS.has(item.day)) errors.push(`Day ${item.day} 복습일 오류`);
  });
  console.info(
    `[Hanguk Step] 검증 완료: ${courseData.length} Days · ${lessonDays.length} lessons · ${reviews.length} reviews · ${vocabularyCount} words`,
  );
  if (errors.length) console.error("[Hanguk Step] 데이터 오류:", errors);
  return { valid: errors.length === 0, errors, vocabularyCount };
}

validateCourseData();
updateAllProgressUI();
openDay(1, false);
