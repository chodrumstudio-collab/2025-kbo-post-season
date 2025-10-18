import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, TrendingUp } from 'lucide-react';

interface LiveGameCardProps {
  isLive: boolean;
  homeTeam: {
    name: string;
    logo: string;
    score: number;
    color: string;
  };
  awayTeam: {
    name: string;
    logo: string;
    score: number;
    color: string;
  };
  inning: string;
  situation: string;
  outs: number;
  bases: { first: boolean; second: boolean; third: boolean };
  currentPitcher: { name: string; pitches: number };
  currentBatter: { name: string; avg: string };
  scoreByInning: { team: string; innings: (number | string)[] }[];
}

export function LiveGameCard({ isLive, homeTeam, awayTeam, inning, situation, outs, bases, currentPitcher, currentBatter, scoreByInning }: LiveGameCardProps) {
  if (!isLive) {
    return (
      <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] p-6 mx-4 mt-4 rounded-2xl">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚾</div>
          <p className="text-[#B8C5D6] mb-4">현재 진행 중인 경기가 없습니다</p>
          <div className="text-white text-3xl mb-2">다음 경기까지</div>
          <div className="font-mono text-[#00D9FF] text-5xl mb-6">02:34:15</div>
          <Button className="bg-[#00D9FF] text-[#0A1628] hover:bg-[#00D9FF]/90 font-semibold">
            <Bell className="mr-2 h-4 w-4" />
            다음 경기 알림 받기
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] mx-4 mt-4 rounded-2xl overflow-hidden">
      {/* Live Badge */}
      <div className="p-4 pb-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Badge className="bg-[#FF3366] text-white border-0 px-3 py-1">
              <span className="w-2 h-2 bg-white rounded-full mr-2 inline-block" />
              LIVE
            </Badge>
          </motion.div>
          <span className="text-[#B8C5D6]">{inning}</span>
        </div>
        <div className="flex items-center gap-1 text-[#6B7C93]">
          <Clock className="h-4 w-4" />
          <span>진행 45분</span>
        </div>
      </div>

      {/* Teams */}
      <div className="p-4">
        {/* Away Team */}
        <div
          className="flex items-center justify-between p-4 rounded-xl mb-2"
          style={{ background: `linear-gradient(to right, ${awayTeam.color}20, transparent)` }}
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl">{awayTeam.logo}</div>
            <span className="text-white">{awayTeam.name}</span>
          </div>
          <div className="font-mono text-white text-5xl">{awayTeam.score}</div>
        </div>

        {/* VS Divider */}
        <div className="flex items-center justify-center gap-2 my-2">
          <div className="h-px bg-[#2D3A4F] flex-1" />
          <span className="text-[#6B7C93]">VS</span>
          <div className="h-px bg-[#2D3A4F] flex-1" />
        </div>

        {/* Home Team */}
        <div
          className="flex items-center justify-between p-4 rounded-xl"
          style={{ background: `linear-gradient(to right, ${homeTeam.color}20, transparent)` }}
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl">{homeTeam.logo}</div>
            <span className="text-white">{homeTeam.name}</span>
          </div>
          <div className="font-mono text-white text-5xl">{homeTeam.score}</div>
        </div>
      </div>

      {/* Game Situation */}
      <div className="px-4 pb-4">
        <div className="bg-[#1a1a2e] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[#B8C5D6]">{situation}</div>
            <div className="flex items-center gap-2">
              <span className="text-[#B8C5D6]">아웃</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < outs ? 'bg-[#FF3366]' : 'bg-[#2D3A4F]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bases Diamond */}
          <div className="flex justify-center mb-4">
            <div className="relative w-20 h-20">
              {/* Second Base */}
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 ${
                  bases.second ? 'bg-[#39FF14]' : 'bg-[#2D3A4F]'
                }`}
              />
              {/* Third Base */}
              <div
                className={`absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 rotate-45 ${
                  bases.third ? 'bg-[#39FF14]' : 'bg-[#2D3A4F]'
                }`}
              />
              {/* First Base */}
              <div
                className={`absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 rotate-45 ${
                  bases.first ? 'bg-[#39FF14]' : 'bg-[#2D3A4F]'
                }`}
              />
              {/* Home Plate */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white" />
            </div>
          </div>

          {/* Current At-Bat */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#2D3A4F] flex items-center justify-center text-xl">
                ⚾
              </div>
              <div>
                <div className="text-white text-sm">{currentPitcher.name}</div>
                <div className="text-[#6B7C93] text-xs">{currentPitcher.pitches}구</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <div className="text-white text-sm text-right">{currentBatter.name}</div>
                <div className="text-[#6B7C93] text-xs text-right">{currentBatter.avg}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#2D3A4F] flex items-center justify-center text-xl">
                🏏
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="px-4 pb-4 overflow-x-auto">
        <table className="w-full text-center">
          <thead>
            <tr className="text-[#6B7C93]">
              <th className="py-2 px-1 text-left sticky left-0 bg-[#16213E]/40 backdrop-blur-md">팀</th>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <th key={i} className="py-2 px-1 min-w-8">{i}</th>
              ))}
              <th className="py-2 px-1 min-w-8">R</th>
              <th className="py-2 px-1 min-w-8">H</th>
              <th className="py-2 px-1 min-w-8">E</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {scoreByInning.map((row, idx) => (
              <tr key={idx}>
                <td className="py-2 px-1 text-left sticky left-0 bg-[#16213E]/40 backdrop-blur-md">{row.team}</td>
                {row.innings.map((score, i) => (
                  <td key={i} className="py-2 px-1 font-mono">{score}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2 p-4 pt-0">
        <Button variant="outline" className="border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#0A1628]">
          문자중계
        </Button>
        <Button variant="outline" className="border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#0A1628]">
          영상하이라이트
        </Button>
        <Button variant="outline" className="border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#0A1628]">
          통계
        </Button>
      </div>
    </Card>
  );
}
