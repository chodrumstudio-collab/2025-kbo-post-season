import { useState, useEffect, useRef } from 'react';
import { sportsAPI, LiveGameData, PlayerStats } from '../services/sportsAPI';

export function useRealTimeGames() {
  const [games, setGames] = useState<LiveGameData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchGames = async () => {
    try {
      setError(null);
      
      // API 접근이 모두 CORS로 막혀있음 - 빈 배열 반환
      console.log('⚠️ 모든 스포츠 API가 CORS 정책으로 차단됨');
      const gamesData: any[] = [];

      setGames(gamesData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'KBO 포스트시즌 데이터를 불러오는데 실패했습니다');
      console.error('Failed to fetch KBO playoff games:', err);
    } finally {
      setLoading(false);
    }
  };

  const startRealTimeUpdates = () => {
    // 즉시 한 번 실행
    fetchGames();
    
    // 30초마다 업데이트
    intervalRef.current = setInterval(fetchGames, 30000);
  };

  const stopRealTimeUpdates = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startRealTimeUpdates();

    return () => {
      stopRealTimeUpdates();
    };
  }, []);

  return {
    games,
    loading,
    error,
    lastUpdated,
    refetch: fetchGames,
    startRealTimeUpdates,
    stopRealTimeUpdates
  };
}

export function usePlayerStats() {
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlayerStats = async () => {
    try {
      setError(null);
      const stats = await sportsAPI.getMLBPlayerStats();
      setPlayerStats(stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : '선수 통계를 불러오는데 실패했습니다');
      console.error('Failed to fetch player stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayerStats();
    
    // 5분마다 통계 업데이트
    const interval = setInterval(fetchPlayerStats, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    playerStats,
    loading,
    error,
    refetch: fetchPlayerStats
  };
}

export function useHighlights() {
  const [highlights, setHighlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHighlights = async () => {
    try {
      setError(null);
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      
      // 먼저 KBO 2025 포스트시즌 하이라이트 시도
      let highlightsData = await sportsAPI.getKBO2025PlayoffHighlights(apiKey);
      
      // KBO 하이라이트가 없으면 일반 야구 하이라이트
      if (!highlightsData.length && apiKey) {
        highlightsData = await sportsAPI.getBaseballHighlights(apiKey);
      }

      setHighlights(highlightsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'KBO 포스트시즌 하이라이트를 불러오는데 실패했습니다');
      console.error('Failed to fetch KBO highlights:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHighlights();
    
    // 1시간마다 하이라이트 업데이트
    const interval = setInterval(fetchHighlights, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    highlights,
    loading,
    error,
    refetch: fetchHighlights
  };
}

export function useBaseballNews() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setError(null);
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      
      if (!apiKey) {
        throw new Error('News API 키가 설정되지 않았습니다. .env 파일을 확인하세요.');
      }

      const newsData = await sportsAPI.getBaseballNews(apiKey);
      setNews(newsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '뉴스를 불러오는데 실패했습니다');
      console.error('Failed to fetch news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // 30분마다 뉴스 업데이트
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    news,
    loading,
    error,
    refetch: fetchNews
  };
}
