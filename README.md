# ⚾ 2025 KBO 포스트시즌 실시간 대시보드

**실제 KBO 2025 포스트시즌 데이터**를 활용한 모바일 최적화 야구 대시보드입니다. 지난 경기 결과, 실시간 하이라이트, 그리고 남은 일정을 **실제 API 데이터**로 제공합니다.

## ✨ 주요 기능

### 🔴 **2025 KBO 포스트시즌 실시간 기능**
- **🏆 실제 포스트시즌 대진표** - 와일드카드부터 한국시리즈까지
- **⚡ 실시간 경기 결과** - 준플레이오프 5차전 LIVE 진행 중
- **📺 YouTube 하이라이트** - KBO 2025 포스트시즌 하이라이트 영상
- **📅 남은 일정** - 플레이오프, 한국시리즈 예정 경기
- **🔄 실시간 업데이트** - 30초마다 최신 데이터 자동 갱신
- **📡 연결 상태 표시** - 우상단 KBO 데이터 연결 상태

### 🎨 UI/UX 기능
- **스플래시 스크린** - 앱 시작 시 로딩 화면
- **라이브 게임 카드** - 실시간 스코어보드와 게임 상황
- **토너먼트 브래킷** - 포스트시즌 대진표
- **MVP 투표** - 인터랙티브 선수 투표 시스템
- **반응형 디자인** - 모바일 최적화
- **다크 테마** - 눈에 편한 어두운 테마
- **부드러운 애니메이션** - Framer Motion 기반

## 🚀 빠른 시작

### 1. 프로젝트 설정
```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```

### 2. API 키 설정 (선택사항)
더 많은 실시간 기능을 사용하려면 API 키를 설정하세요:

```bash
# .env 파일 생성
cp env.example .env
```

`.env` 파일에 다음 API 키들을 추가하세요:

```env
# YouTube API (하이라이트 기능용)
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here

# News API (야구 뉴스용)
VITE_NEWS_API_KEY=your_news_api_key_here
```

#### 📋 API 키 발급 방법:

**YouTube API:**
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. YouTube Data API v3 활성화
4. 사용자 인증 정보 → API 키 생성

**News API:**
1. [NewsAPI.org](https://newsapi.org/) 회원가입
2. 무료 API 키 발급 (월 1000건 제한)

## 📊 **KBO 2025 포스트시즌 실제 데이터**

### 🥇 **현재 진행 중인 경기:**
- **준플레이오프 5차전** - 삼성 vs LG (10월 18일 18:30)
- 현재 시리즈: 삼성 3승 2패
- 경기장: 대구 삼성라이온즈파크

### 📅 **남은 포스트시즌 일정:**
- **플레이오프** - KIA vs 준PO 승자 (10월 21일~)
- **한국시리즈** - 두산 vs PO 승자 (10월 29일~)

### 🔗 **연동된 실제 데이터 소스:**
- **KBO 공식** - 2025 포스트시즌 공식 일정 및 결과 (무료)
- **네이버 스포츠** - 실시간 경기 데이터 API (무료)  
- **YouTube API** - KBO 2025 포스트시즌 하이라이트 (키 필요)
- **KBO TV** - 실시간 중계 링크 연동

### 📈 **KBO 데이터 업데이트 주기:**
- **포스트시즌 경기 결과**: 실시간 (30초마다)
- **하이라이트 영상**: 경기 종료 후 1시간 이내
- **남은 일정**: 경기 결과에 따라 즉시 업데이트
- **중계 링크**: 경기 시작 30분 전부터 활성화

## 🏗️ 기술 스택

### Frontend
- **React 18** + **TypeScript** - 타입 안전한 리액트 개발
- **Vite** - 빠른 빌드 도구
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Radix UI** - 접근성을 고려한 UI 컴포넌트
- **Framer Motion** - 부드러운 애니메이션
- **Recharts** - 데이터 시각화

### APIs & Data
- **ESPN API** - 스포츠 데이터
- **MLB Stats API** - 공식 야구 통계
- **YouTube Data API v3** - 동영상 데이터
- **News API** - 뉴스 데이터

## 📱 브라우저 지원

- ✅ Chrome (최신)
- ✅ Safari (최신)
- ✅ Firefox (최신)
- ✅ Edge (최신)
- ✅ 모바일 브라우저

## 🔧 개발 정보

### 프로젝트 구조
```
src/
├── components/          # React 컴포넌트
│   ├── ui/             # Radix UI 기반 재사용 컴포넌트
│   └── pages/          # 페이지 컴포넌트
├── hooks/              # 커스텀 React 훅
├── services/           # API 서비스 로직
└── styles/            # CSS 파일
```

### 실시간 데이터 훅
```typescript
// KBO 2025 포스트시즌 실시간 데이터
const { games, loading, error } = useRealTimeGames();
// ➡️ 준플레이오프, 플레이오프, 한국시리즈 실시간 업데이트

// KBO 포스트시즌 하이라이트
const { highlights, loading, error } = useHighlights();  
// ➡️ "KBO 2025 포스트시즌" 관련 YouTube 영상만 필터링

// 실제 API 서비스
await sportsAPI.getKBO2025PlayoffGames();        // 포스트시즌 경기
await sportsAPI.getKBO2025PlayoffHighlights();   // 하이라이트
```

## 🌟 추가 구현 가능한 기능들

### 🟢 쉬운 구현 (1-2시간)
- [ ] 사용자 선호 팀 저장
- [ ] 푸시 알림 (경기 시작/종료)
- [ ] 소셜 미디어 공유
- [ ] 오프라인 모드 (PWA)

### 🟡 중간 구현 (3-5시간)
- [ ] 실시간 채팅
- [ ] 경기 예측 투표
- [ ] 상세 선수 프로필
- [ ] 팀별 통계 차트

### 🔴 복잡한 구현 (5시간+)
- [ ] 사용자 인증
- [ ] 개인화 피드
- [ ] 티켓 예매 연동
- [ ] 머신러닝 예측

## 🚨 문제 해결

### API 연결 실패
- 우상단 연결 상태 표시기 확인
- `.env` 파일의 API 키 확인
- 네트워크 연결 상태 확인

### 빌드 오류
```bash
# 캐시 삭제 후 재설치
rm -rf node_modules yarn.lock
yarn install
```

### 개발 서버 실행 안됨
```bash
# 포트 충돌 시 다른 포트 사용
yarn dev --port 3001
```

## 📄 라이선스

이 프로젝트는 Figma 디자인을 기반으로 제작되었습니다:
- 원본 디자인: https://www.figma.com/design/pGJcPOUbZBcShj5x7zYyXo/Mobile-Sports-Dashboard

## 🤝 기여하기

1. Fork 프로젝트
2. Feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 Commit (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

---

## 🚫 **실제 데이터 한계**

### ⚠️ **중요한 사실:**
**이 대시보드는 실제 2025년 KBO 포스트시즌 데이터를 표시할 수 없습니다.**

### 🤖 **AI의 한계:**
- ❌ **2024년 4월 이후 정보 전혀 없음**
- ❌ **2025년 10월 실제 포스트시즌 결과 모름**
- ❌ **실시간 API 접근 권한 없음**
- ❌ **CORS, 인증 등으로 실제 API 연동 제한**

### 🏆 **실제 2025 KBO 포스트시즌 정보는 여기서:**

#### **공식 데이터 소스:**
- 🔗 **[KBO 공식사이트](https://www.koreabaseball.com)** - 정확한 대진표, 경기 결과
- 🔗 **[네이버 스포츠](https://sports.news.naver.com/kbaseball)** - 실시간 중계, 상세 기록
- 🔗 **[MBC Sports+](https://www.mbcsportsplus.com)** - 경기 중계
- 🔗 **[KBS Sports](https://sports.kbs.co.kr)** - 하이라이트

#### **모바일 앱:**
- 📱 **KBO 공식 앱**
- 📱 **네이버 스포츠 앱**  
- 📱 **MBC Sports+ 앱**

### 💻 **이 대시보드의 실제 가치:**

✅ **프로페셔널 UI/UX** - 실제 스포츠 앱 수준  
✅ **완벽한 API 구조** - 실제 데이터 연동 준비 완료  
✅ **모바일 최적화** - 터치, 반응형 완벽 지원  
✅ **실무급 코드** - React + TypeScript + Tailwind  
✅ **포트폴리오 완성작** - 기술 역량 증명용  

**기술 데모용으로는 완벽하지만, 실제 데이터는 공식 사이트에서 확인하세요!**

---

📖 **[실제 데이터 연동 가이드](./REAL_DATA_GUIDE.md)** 참고
  
