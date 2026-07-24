# Hanguk Step - 프로젝트 기획 문서

## 📋 프로젝트 개요

### 프로젝트명
**Hanguk Step** (한국 스텝)

### 슬로건
"Korean, one step at a time" (한국어, 한 걸음씩)

### 목표
인도네시아어 사용자를 위한 40일 체계적 한국어 학습 플랫폼으로, 400개 필수 어휘를 통해 실생활 한국어 회화 능력 배양

---

## 🎯 핵심 가치 및 아이디어

### 1. 체계적 학습 구조
- **40일 프로그램**: 32일 학습 + 8일 복습 = 40일 완성
- **5일 주기**: 4일 학습 → 1일 복습 (간격 반복 효과)
- **400개 어휘**: 40일 동안 하루에 10개(초급) ~ 15개(중급) 단어 학습

### 2. 다양한 학습 모드
- **어휘 학습**: 단어, 발음, 품사, 예문 학습
- **문장 학습**: 5개 실생활 예문으로 맥락 학습
- **말하기 연습**: 녹음 및 재생 기능
- **퀴즈**: 3가지 유형 (K→I, I→K, 듣기)
- **복습 시스템**: 틀린 문제만 다시 풀기

### 3. 기술적 특징
- **Web Speech API**: 한국어 발음 듣기 기능
- **MediaRecorder**: 사용자 음성 녹음
- **LocalStorage**: 학습 진도 자동 저장
- **반응형 디자인**: 모바일/태블릿/데스크톱 지원

---

## 🎨 디자인 시스템

### 색상 팔레트
```css
--navy-950: #10263f    /* 주요 텍스트 */
--blue-600: #2f6cf4    /* 강조 색상 */
--blue-100: #eaf1ff    /* 배경 강조 */
--coral-500: #f06a5b   /* 복습/강조 */
--green: #2a9d72       /* 완료/성공 */
--cream: #fbfaf6       /* 메인 배경 */
```

### 타이포그래피
- 제목: Inter, Pretendard, Noto Sans KR
- 본문: 14~17px
- 제목: 32~72px (clamp 사용)

---

## 🌟 핵심 기능 상세

### 1. 학습 흐름
```
Day 선택 → 어휘 학습 → 문장 학습 → 말하기 연습 → 퀴즈 → Day 완료
```

### 2. 복습 시스템
- 매 5일마다 복습일 (Day 5, 10, 15, ..., 40)
- 15문제 퀴즈 (이전 4일에서 출제)
- 틀린 문제만 다시 풀기 기능

### 3. 진도 저장
- 학습한 단어 체크 시 자동 저장
- LocalStorage에서 서버 DB로 이동
- 실시간 진도율 표시

### 4. 오디오 기능
- Web Speech API로 한국어 발음 제공
- 느린 속도 재생 지원 (0.65배속)
- 로마자 표기법 토글

### 5. 말하기 연습
- MediaRecorder로 녹음
- 녹음 재생 기능
- 문장별 진도 추적

---

## 📊 학습 데이터 구조 예시

### Lesson Day 예시 (Day 1)
```json
{
  "day": 1,
  "type": "lesson",
  "title": "Salam dan Perkenalan",
  "koreanTitle": "인사와 자기소개",
  "description": "Pelajari salam dan cara memperkenalkan diri.",
  "emoji": "👋",
  "level": "Pemula",
  "grammar": "저는 ___입니다",
  "grammarMeaning": "Saya adalah ___.",
  "vocabulary": [
    {
      "id": 1,
      "korean": "안녕하세요",
      "indonesian": "halo",
      "romanization": "annyeonghaseyo",
      "partOfSpeech": "표현",
      "category": "인사와 자기소개"
    }
    // ... 총 10개
  ],
  "sentences": [
    {
      "id": "1-1",
      "korean": "안녕하세요. 제 이름은 수진입니다.",
      "indonesian": "Halo. Nama saya Sujin.",
      "romanization": "annyeonghaseyo je ireumeun sujinimnida"
    }
    // ... 총 5개
  ]
}
```

### Review Day 예시 (Day 5)
```json
{
  "day": 5,
  "type": "review",
  "title": "Review Day 1–4",
  "koreanTitle": "Day 1~4 복습",
  "description": "Ulangi kosakata dari Day 1 sampai Day 4.",
  "emoji": "📝",
  "level": "Review",
  "reviewDays": [1, 2, 3, 4]
}
```

---

## 📱 확장 가능성

### 단계 1: MVP (현재)
- ✅ 40일 커리큘럼
- ✅ 400개 어휘
- ✅ 로그인 UI
- ✅ LocalStorage 저장

### 단계 2: Backend 연결
- [ ] REST API 구현
- [ ] PostgreSQL 데이터베이스
- [ ] JWT 인증
- [ ] S3 녹음 저장

### 단계 3: 고급 기능
- [ ] Speech Recognition (발음 평가)
- [ ] 실시간 강의 (WebRTC)
- [ ] 커뮤니티 기능
- [ ] Gamification (포인트, 랭킹)
- [ ] AI 챗봇 대화 연습

---

## 📚 참고 자료

### 학습 데이터
- Day 1-20: 초급 (10개 단어/일)
- Day 21-32: 중급 (15개 단어/일)
- 주제: 인사, 가족, 음식, 장소, 교통, 감정 등

### 기술 문서
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)

---

## 🔗 프로젝트 링크

- 현재 저장소: `/home/keehyun/dev/my-first-web`
- 메인 페이지: `index.html`
- 로그인 페이지: `login.html`
- GitHub: `https://github.com/keehyun2/HangukStep.git`

---

*이 문서는 Hanguk Step 프로젝트의 기획 내용을 담고 있습니다.*
