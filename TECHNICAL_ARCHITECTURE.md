# Hanguk Step - 기술 아키텍처 문서

## 🏗️ 현재 아키텍처

### 프론트엔드 구조
```
my-first-web/
├── index.html          # 메인 랜딩 페이지 + 학습 인터페이스
├── login.html          # 로그인/회원가입 페이지
├── style.css           # 전체 스타일 (2660줄)
├── script.js           # 메인 로직 (1912줄)
└── login.js            # 로그인/회원가입 로직
```

### 데이터 구조
- **32개 학습일 (Lesson Days)**: 10~15개 단어, 5개 문장
- **8개 복습일 (Review Days)**: 이전 4일 복습
- **총 400개 단어**: 한국어-인도네시아어 쌍

---

## 🚀 Backend/Frontend 분리 아키텍처

## 기술 스택
```
Backend:
- Java 21
- Spring Boot 3.x
- Spring Security + JWT 인증
- Spring Data JPA
- PostgreSQL
- Lombok
- Oracle Cloud Instance (서버 배포)

Frontend:
- Vue 3 (Composition API)
- TypeScript
- Vite (빌드 도구)
- Pinia (상태 관리)
- Vue Router
- Axios (HTTP 클라이언트)
- TailwindCSS
- Web Speech API (클라이언트)
```

---

## 🗄️ 데이터베이스 설계

### Users 테이블
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP
);
```

### Days 테이블 (학습일 데이터)
```sql
CREATE TABLE days (
  id SERIAL PRIMARY KEY,
  day_number INTEGER UNIQUE NOT NULL,
  type VARCHAR(10) CHECK (type IN ('lesson', 'review')),
  title_indonesian VARCHAR(255),
  title_korean VARCHAR(255),
  description TEXT,
  emoji VARCHAR(50),
  level VARCHAR(50),
  grammar_korean VARCHAR(255),
  grammar_indonesian VARCHAR(255)
);
```

### Vocabulary 테이블 (단어)
```sql
CREATE TABLE vocabulary (
  id SERIAL PRIMARY KEY,
  day_id INTEGER REFERENCES days(id),
  korean TEXT NOT NULL,
  indonesian TEXT NOT NULL,
  romanization TEXT,
  part_of_speech VARCHAR(20),
  category VARCHAR(100),
  audio_url TEXT, -- S3 URL
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Sentences 테이블 (예문)
```sql
CREATE TABLE sentences (
  id SERIAL PRIMARY KEY,
  day_id INTEGER REFERENCES days(id),
  korean TEXT NOT NULL,
  indonesian TEXT NOT NULL,
  romanization TEXT,
  audio_url TEXT,
  sequence_number INTEGER
);
```

### User_Progress 테이블 (학습 진도)
```sql
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  day_id INTEGER REFERENCES days(id),
  learned_words INTEGER[] DEFAULT '{}', -- 학습 완료한 단어 ID 배열
  learned_sentences TEXT[] DEFAULT '{}', -- 학습 완료한 문장 ID 배열
  quiz_score INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, day_id)
);
```

### Review_Progress 테이블 (복습 진도)
```sql
CREATE TABLE review_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  day_id INTEGER REFERENCES days(id),
  answers JSONB, -- 답안 기록
  wrong_answers JSONB, -- 틀린 문제
  type_scores JSONB, -- 유형별 점수 {A: 0, B: 0, C: 0}
  score INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Recordings 테이블 (녹음 파일)
```sql
CREATE TABLE recordings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  sentence_id INTEGER REFERENCES sentences(id),
  s3_url TEXT NOT NULL,
  duration INTEGER, -- 초 단위
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎨 Frontend Architecture

### 페이지 구조 (Vue Router)
```
src/
├── views/
│   ├── HomeView.vue              # 랜딩 페이지
│   ├── LoginView.vue             # 로그인/회원가입
│   ├── DashboardView.vue         # 학습 대시보드
│   ├── learning/
│   │   ├── DayView.vue           # 특정 Day 학습 페이지
│   │   ├── VocabularyView.vue   # 어휘 탭
│   │   ├── SentencesView.vue     # 문장 탭
│   │   ├── SpeakingView.vue      # 말하기 탭
│   │   └── QuizView.vue          # 퀴즈 탭
│   ├── review/
│   │   ├── ReviewDayView.vue     # 복습 페이지
│   │   └── ResultView.vue        # 결과 페이지
│   └── profile/
│       ├── ProgressView.vue      # 학습 통계
│       └── SettingsView.vue      # 설정
├── router/
│   └── index.ts                  # Vue Router 설정
└── App.vue                       # 루트 컴포넌트
```

### 주요 컴포넌트
```
src/components/
├── layout/
│   ├── AppHeader.vue      # 헤더
│   ├── AppFooter.vue      # 푸터
│   └── Sidebar.vue        # 사이드바
├── learning/
│   ├── DayCard.vue        # Day 카드
│   ├── ModuleCard.vue     # 모듈 카드
│   ├── WordCard.vue       # 단어 카드
│   ├── SentenceCard.vue   # 문장 카드
│   ├── SpeakingRecorder.vue # 말하기 녹음기
│   └── QuizCard.vue       # 퀴즈 카드
├── common/
│   ├── BaseButton.vue     # 버튼
│   ├── ProgressBar.vue    # 진도 바
│   ├── AudioPlayer.vue    # 오디오 플레이어
│   └── ToastNotification.vue # 알림
└── auth/
    ├── LoginForm.vue      # 로그인 폼
    └── SignupForm.vue     # 회원가입 폼
```

### 상태 관리 (Pinia 예시)
```typescript
// stores/learningStore.ts
import { defineStore } from 'pinia'

export const useLearningStore = defineStore('learning', {
  state: () => ({
    currentDay: 0,
    progress: [] as UserProgress[],
    currentLesson: null as Lesson | null
  }),
  actions: {
    setCurrentDay(day: number) {
      this.currentDay = day
    },
    async fetchLesson(day: number) {
      // API 호출
    },
    async updateProgress(dayId: number, data: ProgressData) {
      // API 호출
    }
  }
})

// stores/authStore.ts
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null
  }),
  actions: {
    async login(email: string, password: string) {
      // API 호출
    },
    logout() {
      this.user = null
      this.token = null
    }
  }
})
```

---

## 📡 API 설계

### 인증 API
```
POST /api/auth/signup    - 회원가입
POST /api/auth/login     - 로그인
POST /api/auth/logout    - 로그아웃
GET  /api/auth/me        - 현재 사용자 정보
```

### 학습 API
```
GET  /api/days           - 전체 Day 목록
GET  /api/days/:id       - 특정 Day 상세
GET  /api/days/:id/vocabulary - 어휘 목록
GET  /api/days/:id/sentences  - 예문 목록
```

### 진도 API
```
GET  /api/progress       - 사용자 전체 진도
GET  /api/progress/:dayId  - 특정 Day 진도
PUT  /api/progress/:dayId  - 진도 업데이트
POST /api/progress/:dayId/complete - Day 완료
```

### 복습 API
```
POST /api/review/:dayId/start     - 복습 시작
POST /api/review/:dayId/submit    - 답안 제출
POST /api/review/:dayId/retry     - 틀린 문제 재시도
```

### 녹음 API
```
POST /api/recordings        - 녹음 업로드
GET  /api/recordings/:id    - 녹음 조회
```

---

## 🔧 기술적 개선사항

### 현재 한계
1. **데이터 하드코딩**: 모든 단어가 JavaScript 파일에 내장
2. **인증 없음**: 로그인이 프론트엔드만 있고 백엔드 연결 없음
3. **로컬 저장**: LocalStorage만 사용 (데이터 유실 가능)
4. **녹음 저장 없음**: 녹음 파일이 서버에 저장되지 않음

### 개선 방안
1. **데이터베이스**: PostgreSQL로 모든 학습 데이터 관리
2. **인증 시스템**: Spring Security + JWT 기반 로그인/회원가입
3. **파일 저장**: Oracle Cloud 인스턴스 로컬 저장 (녹음 파일)
4. **API 서버**: Spring Boot RESTful API로 데이터 제공
5. **실시간 동기화**: 여러 디바이스 간 진도 동기화

---

## 🎯 백엔드/프론트엔드 분리 작업 우선순위

### Phase 1: 기본 설정 (1주)
1. 프로젝트 초기화 (Frontend: Vue 3 + Vite, Backend: Spring Boot 3)
2. PostgreSQL 데이터베이스 설계 및 마이그레이션
3. Spring Boot 기본 REST API 구조 설정

### Phase 2: 데이터 이전 (1주)
1. 400개 어휘 데이터 DB 이전
2. 40일 커리큘럼 데이터 구조화
3. API 엔드포인트 구현

### Phase 3: 인증 시스템 (1주)
1. 회원가입/로그인 API
2. JWT 토큰 관리
3. 프론트엔드 인증 UI 연동

### Phase 4: 진도 기능 (2주)
1. 학습 진도 저장 API
2. 복습 시스템 구현
3. 통계 대시보드

### Phase 5: 녹음 기능 (1주)
1. Oracle Cloud 인스턴스 파일 저장 구현
2. 녹음 관리 API
3. 프론트엔드 녹음 인터페이스

### Phase 6: 배포 및 테스트 (1주)
1. Oracle Cloud 인스턴스 배포 환경 구성 (Docker + Nginx)
2. PostgreSQL DB 배포
3. Vue 프론트엔드 빌드 및 배포
4. Spring Boot 백엔드 배포
5. E2E 테스트
6. 성능 최적화

---

## 📚 기술 참고 자료

### 백엔드
- [Spring Boot 공식 문서](https://spring.io/projects/spring-boot)
- [Spring Security 참조](https://docs.spring.io/spring-security/reference/)
- [Spring Data JPA 문서](https://docs.spring.io/spring-data/jpa/reference/current/)
- [PostgreSQL 문서](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)

### 프론트엔드
- [Vue 3 공식 문서](https://vuejs.org/)
- [Pinia 상태 관리](https://pinia.vuejs.org/)
- [Vue Router 문서](https://router.vuejs.org/)
- [Vite 문서](https://vitejs.dev/)
- [Axios 문서](https://axios-http.com/)
- [TailwindCSS 문서](https://tailwindcss.com/)

### 인프라
- [Oracle Cloud Infrastructure](https://www.oracle.com/cloud/)
- [Docker 공식 문서](https://docs.docker.com/)
- [Nginx 문서](https://nginx.org/en/docs/)

---

*이 문서는 Hanguk Step 프로젝트의 기술 아키텍처를 담고 있습니다.*
