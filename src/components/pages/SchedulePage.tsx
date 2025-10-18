import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { MapPin, Tv, Bell, Ticket, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface Game {
  id: string;
  date: string;
  time: string;
  homeTeam: { name: string; logo: string };
  awayTeam: { name: string; logo: string };
  stadium: string;
  broadcast: string[];
  status: 'scheduled' | 'live' | 'final' | 'postponed';
  homeScore?: number;
  awayScore?: number;
}

const allGames: Game[] = [
  {
    id: '1',
    date: '10월 18일 (금)',
    time: '18:30',
    homeTeam: { name: '삼성', logo: '🦁' },
    awayTeam: { name: 'SSG', logo: '🔱' },
    stadium: '대구 삼성 라이온즈파크',
    broadcast: ['KBS', 'MBC'],
    status: 'live',
    homeScore: 4,
    awayScore: 3,
  },
  {
    id: '2',
    date: '10월 19일 (토)',
    time: '14:00',
    homeTeam: { name: '한화', logo: '🦅' },
    awayTeam: { name: '삼성', logo: '🦁' },
    stadium: '대전 한화생명 볼파크',
    broadcast: ['KBS', 'MBC'],
    status: 'scheduled',
  },
  {
    id: '3',
    date: '10월 19일 (토)',
    time: '18:00',
    homeTeam: { name: 'LG', logo: '🐻' },
    awayTeam: { name: 'KIA', logo: '🐯' },
    stadium: '서울 잠실야구장',
    broadcast: ['SBS', 'ESPN'],
    status: 'scheduled',
  },
  {
    id: '4',
    date: '10월 20일 (일)',
    time: '14:00',
    homeTeam: { name: 'SSG', logo: '🔱' },
    awayTeam: { name: 'NC', logo: '🦅' },
    stadium: '인천 SSG 랜더스필드',
    broadcast: ['KBS'],
    status: 'scheduled',
  },
  {
    id: '5',
    date: '10월 20일 (일)',
    time: '18:30',
    homeTeam: { name: 'KIA', logo: '🐯' },
    awayTeam: { name: 'LG', logo: '🐻' },
    stadium: '광주 기아 챔피언스필드',
    broadcast: ['MBC', 'SBS'],
    status: 'scheduled',
  },
  {
    id: '6',
    date: '10월 21일 (월)',
    time: '18:30',
    homeTeam: { name: '한화', logo: '🦅' },
    awayTeam: { name: 'NC', logo: '🦅' },
    stadium: '대전 한화생명 볼파크',
    broadcast: ['KBS'],
    status: 'scheduled',
  },
];

export function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const getStatusBadge = (game: Game) => {
    switch (game.status) {
      case 'live':
        return <Badge className="bg-[#FF3366] text-white border-0">진행중</Badge>;
      case 'final':
        return <Badge className="bg-[#2D3A4F] text-white border-0">종료</Badge>;
      case 'postponed':
        return <Badge className="bg-[#6B7C93] text-white border-0">우천순연</Badge>;
      default:
        return <Badge className="bg-[#16213E] text-[#00D9FF] border-[#00D9FF]">예정</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1628] pb-4">
      {/* Header */}
      <div className="sticky top-14 z-10 bg-[#0A1628] pt-4 px-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-2xl">경기 일정</h1>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' 
                ? 'bg-[#00D9FF] text-[#0A1628] font-semibold' 
                : 'border-[#00D9FF] text-[#00D9FF]'}
            >
              리스트
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('calendar')}
              className={viewMode === 'calendar' 
                ? 'bg-[#00D9FF] text-[#0A1628] font-semibold' 
                : 'border-[#00D9FF] text-[#00D9FF]'}
            >
              캘린더
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="px-4 mb-6">
          <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md text-white"
            />
          </Card>
        </div>
      )}

      {/* Games List */}
      <div className="px-4 space-y-3">
        {allGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl p-4">
              {/* Date and Status */}
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-[#00D9FF] text-[#0A1628] border-0 font-semibold">
                  {game.date}
                </Badge>
                {getStatusBadge(game)}
              </div>

              {/* Teams */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-4xl">{game.awayTeam.logo}</span>
                  <div>
                    <div className="text-white">{game.awayTeam.name}</div>
                    {game.awayScore !== undefined && (
                      <div className="font-mono text-[#00D9FF] text-xl">{game.awayScore}</div>
                    )}
                  </div>
                </div>

                <div className="text-center px-4">
                  <div className="text-[#B8C5D6] mb-1">{game.time}</div>
                  <div className="text-[#6B7C93]">VS</div>
                </div>

                <div className="flex items-center gap-3 flex-1 justify-end">
                  <div className="text-right">
                    <div className="text-white">{game.homeTeam.name}</div>
                    {game.homeScore !== undefined && (
                      <div className="font-mono text-[#00D9FF] text-xl">{game.homeScore}</div>
                    )}
                  </div>
                  <span className="text-4xl">{game.homeTeam.logo}</span>
                </div>
              </div>

              {/* Game Info */}
              <div className="bg-[#1a1a2e] rounded-xl p-3 mb-3 space-y-2">
                <div className="flex items-center gap-2 text-[#B8C5D6] text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{game.stadium}</span>
                </div>
                <div className="flex items-center gap-2 text-[#B8C5D6] text-sm">
                  <Tv className="h-4 w-4" />
                  <div className="flex gap-2">
                    {game.broadcast.map((channel) => (
                      <Badge key={channel} variant="outline" className="border-[#2D3A4F] text-xs">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {game.status === 'scheduled' && (
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#0A1628]"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    알림 설정
                  </Button>
                  <Button className="bg-[#00D9FF] text-[#0A1628] hover:bg-[#00D9FF]/90 font-semibold">
                    <Ticket className="mr-2 h-4 w-4" />
                    티켓 예매
                  </Button>
                </div>
              )}

              {game.status === 'live' && (
                <Button className="w-full bg-[#FF3366] text-white hover:bg-[#FF3366]/90 font-semibold">
                  실시간 중계 보기
                </Button>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
