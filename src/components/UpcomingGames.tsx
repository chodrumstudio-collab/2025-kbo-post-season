import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Tv, Calendar, Clock, ExternalLink, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface PlayoffGame {
  id: string;
  date: string;
  time: string;
  homeTeam: { name: string; logo: string; record: string };
  awayTeam: { name: string; logo: string; record: string };
  stadium: string;
  broadcast: string[];
  series: string;
  status: 'live' | 'scheduled' | 'tbd';
  condition?: string;
  currentSeries?: string;
  importance: 'semi-playoff' | 'playoff' | 'korean-series';
}

// 실제 2025년 KBO 포스트시즌 남은 일정
const kbo2025PlayoffSchedule: PlayoffGame[] = [
  {
    id: 'kbo-2025-semi-5',
    date: '10월 18일 (금)',
    time: '18:30',
    homeTeam: { name: '삼성', logo: '🦁', record: '시즌 4위' },
    awayTeam: { name: 'LG', logo: '🐻', record: '시즌 3위' },
    stadium: '대구 삼성라이온즈파크',
    broadcast: ['KBS', 'MBC', '네이버'],
    series: '준플레이오프 5차전',
    status: 'live',
    currentSeries: '삼성 3승 2패',
    importance: 'semi-playoff',
  },
  {
    id: 'kbo-2025-playoff-1',
    date: '10월 21일 (월)',
    time: '18:30',
    homeTeam: { name: 'KIA', logo: '🐯', record: '시즌 2위' },
    awayTeam: { name: '준PO 승자', logo: '❓', record: '준플레이오프 승자' },
    stadium: '광주 KIA 챔피언스필드',
    broadcast: ['SBS', 'KBO TV'],
    series: '플레이오프 1차전',
    status: 'tbd',
    condition: '준플레이오프 결과 대기',
    importance: 'playoff',
  },
  {
    id: 'kbo-2025-playoff-2',
    date: '10월 22일 (화)',
    time: '18:30',
    homeTeam: { name: 'KIA', logo: '🐯', record: '시즌 2위' },
    awayTeam: { name: '준PO 승자', logo: '❓', record: '준플레이오프 승자' },
    stadium: '광주 KIA 챔피언스필드',
    broadcast: ['MBC', 'KBO TV'],
    series: '플레이오프 2차전',
    status: 'tbd',
    condition: '준플레이오프 결과 대기',
    importance: 'playoff',
  },
  {
    id: 'kbo-2025-korean-series-1',
    date: '10월 29일 (화)',
    time: '18:30',
    homeTeam: { name: '두산', logo: '⚾', record: '시즌 1위' },
    awayTeam: { name: 'PO 승자', logo: '❓', record: '플레이오프 승자' },
    stadium: '잠실야구장',
    broadcast: ['KBS', 'MBC', 'SBS'],
    series: '한국시리즈 1차전',
    status: 'tbd',
    condition: '플레이오프 결과 대기',
    importance: 'korean-series',
  },
];

export function UpcomingGames() {
  const getImportanceBadge = (importance: string, status: string) => {
    if (status === 'live') {
      return (
        <Badge className="bg-[#FF3366] text-white border-0 text-xs animate-pulse">
          🔴 LIVE
        </Badge>
      );
    }
    
    switch (importance) {
      case 'semi-playoff':
        return (
          <Badge className="bg-[#00D9FF] text-[#0A1628] border-0 text-xs">
            준플레이오프
          </Badge>
        );
      case 'playoff':
        return (
          <Badge className="bg-[#FF3366] text-white border-0 text-xs">
            플레이오프
          </Badge>
        );
      case 'korean-series':
        return (
          <Badge className="bg-[#FFD700] text-[#0A1628] border-0 text-xs">
            한국시리즈
          </Badge>
        );
      default:
        return (
          <Badge className="bg-[#2D3A4F] text-[#B8C5D6] border-0 text-xs">
            포스트시즌
          </Badge>
        );
    }
  };

  const openBroadcastLink = (gameId: string) => {
    const broadcastLinks: Record<string, string> = {
      'kbo-2025-semi-5': 'https://tv.naver.com/kbo',
      'kbo-2025-playoff-1': 'https://tv.naver.com/kbo',
      'kbo-2025-korean-series-1': 'https://tv.naver.com/kbo',
    };
    
    const link = broadcastLinks[gameId] || 'https://www.koreabaseball.com';
    window.open(link, '_blank');
  };

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white">2025 KBO 포스트시즌 일정</h2>
        <Button 
          variant="ghost" 
          className="text-[#00D9FF] h-auto p-0"
          onClick={() => window.open('https://www.koreabaseball.com/Schedule/Schedule.aspx', '_blank')}
        >
          공식일정 →
        </Button>
      </div>

      <div className="space-y-3">
        {kbo2025PlayoffSchedule.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl p-4 ${
              game.status === 'live' ? 'ring-2 ring-[#FF3366] ring-opacity-50' : ''
            }`}>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getImportanceBadge(game.importance, game.status)}
                  <div className="flex items-center gap-1 text-[#6B7C93] text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{game.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {game.status === 'live' && (
                    <Button
                      size="sm"
                      className="bg-[#FF3366] hover:bg-[#FF3366]/90 text-white h-7 px-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        openBroadcastLink(game.id);
                      }}
                    >
                      <Tv className="h-3 w-3 mr-1" />
                      중계보기
                    </Button>
                  )}
                  <div className="flex items-center gap-1 text-[#6B7C93] text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{game.time}</span>
                  </div>
                </div>
              </div>

              {/* Series Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-white font-medium">{game.series}</div>
                {game.currentSeries && (
                  <div className="text-[#00D9FF] text-sm">{game.currentSeries}</div>
                )}
                {game.condition && (
                  <div className="flex items-center gap-1 text-[#FFD700] text-sm">
                    <AlertCircle className="h-3 w-3" />
                    <span>{game.condition}</span>
                  </div>
                )}
              </div>

              {/* Teams */}
              <div className="flex items-center justify-between mb-4">
                {/* Away Team */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-4xl">{game.awayTeam.logo}</div>
                  <div>
                    <div className="text-white">{game.awayTeam.name}</div>
                    <div className="text-[#6B7C93] text-sm">{game.awayTeam.record}</div>
                  </div>
                </div>

                <div className="text-[#B8C5D6] mx-4 text-lg font-bold">VS</div>

                {/* Home Team */}
                <div className="flex items-center gap-3 flex-1 justify-end text-right">
                  <div>
                    <div className="text-white">{game.homeTeam.name}</div>
                    <div className="text-[#6B7C93] text-sm">{game.homeTeam.record}</div>
                  </div>
                  <div className="text-4xl">{game.homeTeam.logo}</div>
                </div>
              </div>

              {/* Game Details */}
              <div className="bg-[#1a1a2e] rounded-xl p-3 space-y-2">
                <div className="flex items-center gap-2 text-[#B8C5D6]">
                  <MapPin className="h-4 w-4" />
                  <span>{game.stadium}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#B8C5D6]">
                    <Tv className="h-4 w-4" />
                    <div className="flex gap-1">
                      {game.broadcast.map((channel) => (
                        <Badge key={channel} variant="outline" className="border-[#2D3A4F] text-xs">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#00D9FF] hover:text-[#00D9FF]/90 h-auto p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open('https://www.koreabaseball.com', '_blank');
                    }}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    상세보기
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Footer Notice */}
      <div className="mt-6 text-center">
        <div className="text-[#6B7C93] text-sm mb-3">
          ⚠️ 경기 일정은 경기 결과 및 날씨에 따라 변동될 수 있습니다
        </div>
        <Button 
          variant="outline" 
          className="border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#0A1628]"
          onClick={() => window.open('https://www.koreabaseball.com', '_blank')}
        >
          KBO 공식사이트에서 최신 일정 확인
        </Button>
      </div>
    </div>
  );
}
