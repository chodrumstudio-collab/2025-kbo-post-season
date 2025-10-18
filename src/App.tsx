import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
// 라이브 기능 제거됨 - 지난 결과와 남은 일정만 표시
import { ScrollToTop } from './components/ScrollToTop';
import { Toaster } from './components/ui/sonner';
// DataStatusIndicator 제거 - API 접근 불가로 의미 없음

// useRealTimeGames 제거됨 - CORS 정책으로 모든 API 차단

// Page Components
import { KBOChatbot } from './components/KBOChatbot';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // CORS 정책으로 모든 API 접근 차단됨 - 공식 사이트 바로가기만 제공

  // QuickStatusBar 기능 제거됨 - 라이브 스코어는 필요 없음

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // 라이브 게임 관련 기능 제거됨

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Toaster />
      
      {/* Header */}
      <Header />

      {/* 라이브 스코어 배너 제거 - 실제 데이터 모드에서는 사용하지 않음 */}

      {/* Main Content */}
      <main className="relative">
        {/* 실제 KBO 포스트시즌 데이터 바로가기 */}
        <KBOChatbot />

        {/* Bottom padding for fixed elements */}
        <div className="h-8" />
      </main>

      {/* Floating Action Button */}
      <ScrollToTop />

      {/* 사이드 메뉴 제거됨 - 다크모드 고정 */}
    </div>
  );
}
