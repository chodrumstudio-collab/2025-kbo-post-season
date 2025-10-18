import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { TrendingUp, TrendingDown, Award, Target } from 'lucide-react';
import { motion } from 'motion/react';

export function StatsPage() {
  const batters = [
    { rank: 1, name: '김도영', team: 'KIA', avg: '.362', hits: 23, hr: 5, rbi: 18, ops: '1.124' },
    { rank: 2, name: '문보경', team: 'LG', avg: '.348', hits: 20, hr: 4, rbi: 15, ops: '1.056' },
    { rank: 3, name: '양의지', team: 'NC', avg: '.325', hits: 18, hr: 3, rbi: 12, ops: '.987' },
    { rank: 4, name: '박병호', team: '삼성', avg: '.312', hits: 17, hr: 6, rbi: 16, ops: '.978' },
    { rank: 5, name: '최정', team: 'SSG', avg: '.298', hits: 16, hr: 4, rbi: 14, ops: '.934' },
    { rank: 6, name: '구자욱', team: '삼성', avg: '.289', hits: 15, hr: 3, rbi: 11, ops: '.892' },
    { rank: 7, name: '나성범', team: 'KIA', avg: '.276', hits: 14, hr: 2, rbi: 9, ops: '.845' },
    { rank: 8, name: '오지환', team: 'LG', avg: '.265', hits: 13, hr: 3, rbi: 10, ops: '.823' },
  ];

  const pitchers = [
    { rank: 1, name: '최원태', team: '삼성', era: '1.89', ip: '19.0', so: 28, wins: 3, whip: '0.95' },
    { rank: 2, name: '윤영철', team: 'LG', era: '2.15', ip: '18.1', so: 24, wins: 2, whip: '1.02' },
    { rank: 3, name: '소형준', team: 'KIA', era: '2.48', ip: '16.2', so: 21, wins: 3, whip: '1.08' },
    { rank: 4, name: '원태인', team: '삼성', era: '2.89', ip: '15.2', so: 19, wins: 2, whip: '1.15' },
    { rank: 5, name: '고영표', team: 'LG', era: '3.12', ip: '14.1', so: 17, wins: 2, whip: '1.22' },
    { rank: 6, name: '양현종', team: 'KIA', era: '3.45', ip: '13.0', so: 15, wins: 1, whip: '1.31' },
  ];

  const teams = [
    {
      name: 'LG',
      logo: '🐻',
      record: '8승 2패',
      avg: '.285',
      era: '2.89',
      runs: 52,
      runsAllowed: 38,
      trend: 'up',
      hr: 12,
      sb: 8,
    },
    {
      name: 'KIA',
      logo: '🐯',
      record: '7승 3패',
      avg: '.278',
      era: '3.12',
      runs: 48,
      runsAllowed: 42,
      trend: 'up',
      hr: 15,
      sb: 6,
    },
    {
      name: '삼성',
      logo: '🦁',
      record: '5승 4패',
      avg: '.265',
      era: '3.45',
      runs: 41,
      runsAllowed: 44,
      trend: 'down',
      hr: 10,
      sb: 5,
    },
    {
      name: 'SSG',
      logo: '🔱',
      record: '4승 5패',
      avg: '.258',
      era: '3.78',
      runs: 38,
      runsAllowed: 47,
      trend: 'down',
      hr: 8,
      sb: 7,
    },
  ];

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '';
    }
  };

  const getStatColor = (value: number, threshold: { good: number; bad: number }) => {
    if (value <= threshold.good) return 'text-[#39FF14]';
    if (value >= threshold.bad) return 'text-[#FF3366]';
    return 'text-white';
  };

  return (
    <div className="min-h-screen bg-[#0A1628] pb-4">
      {/* Header */}
      <div className="sticky top-14 z-10 bg-[#0A1628] pt-4 px-4 pb-2">
        <h1 className="text-white text-2xl mb-4">기록 & 통계</h1>
      </div>

      <div className="px-4">
        <Tabs defaultValue="batters" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#16213E]/40 h-12 p-1 mb-4">
            <TabsTrigger
              value="batters"
              className="data-[state=active]:bg-[#00D9FF] data-[state=active]:text-[#0A1628] data-[state=active]:font-semibold data-[state=inactive]:text-[#B8C5D6]"
            >
              타자
            </TabsTrigger>
            <TabsTrigger
              value="pitchers"
              className="data-[state=active]:bg-[#00D9FF] data-[state=active]:text-[#0A1628] data-[state=active]:font-semibold data-[state=inactive]:text-[#B8C5D6]"
            >
              투수
            </TabsTrigger>
            <TabsTrigger
              value="teams"
              className="data-[state=active]:bg-[#00D9FF] data-[state=active]:text-[#0A1628] data-[state=active]:font-semibold data-[state=inactive]:text-[#B8C5D6]"
            >
              팀
            </TabsTrigger>
          </TabsList>

          {/* Batters Tab */}
          <TabsContent value="batters" className="space-y-3">
            {batters.map((batter, index) => (
              <motion.div
                key={batter.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getMedalEmoji(batter.rank)}</div>
                      <div>
                        <h3 className="text-white">{batter.name}</h3>
                        <Badge variant="outline" className="border-[#2D3A4F] text-xs mt-1">
                          {batter.team}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#6B7C93] text-xs">타율</div>
                      <div className="font-mono text-[#39FF14] text-2xl">{batter.avg}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                      <div className="text-[#6B7C93] text-xs mb-1">안타</div>
                      <div className="text-white font-mono">{batter.hits}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#6B7C93] text-xs mb-1">홈런</div>
                      <div className="text-white font-mono">{batter.hr}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#6B7C93] text-xs mb-1">타점</div>
                      <div className="text-white font-mono">{batter.rbi}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#6B7C93] text-xs mb-1">OPS</div>
                      <div className="text-white font-mono">{batter.ops}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* Pitchers Tab */}
          <TabsContent value="pitchers" className="space-y-3">
            {pitchers.map((pitcher, index) => (
              <motion.div
                key={pitcher.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getMedalEmoji(pitcher.rank)}</div>
                      <div>
                        <h3 className="text-white">{pitcher.name}</h3>
                        <Badge variant="outline" className="border-[#2D3A4F] text-xs mt-1">
                          {pitcher.team}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#6B7C93] text-xs">ERA</div>
                      <div className="font-mono text-[#39FF14] text-2xl">{pitcher.era}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                      <div className="text-[#6B7C93] text-xs mb-1">이닝</div>
                      <div className="text-white font-mono">{pitcher.ip}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#6B7C93] text-xs mb-1">탈삼진</div>
                      <div className="text-white font-mono">{pitcher.so}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#6B7C93] text-xs mb-1">승</div>
                      <div className="text-white font-mono">{pitcher.wins}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#6B7C93] text-xs mb-1">WHIP</div>
                      <div className="text-white font-mono">{pitcher.whip}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams" className="space-y-3">
            {teams.map((team, index) => (
              <motion.div
                key={team.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl">{team.logo}</span>
                      <div>
                        <h3 className="text-white text-xl">{team.name}</h3>
                        <div className="text-[#B8C5D6] font-mono">{team.record}</div>
                      </div>
                    </div>
                    {team.trend === 'up' ? (
                      <TrendingUp className="h-6 w-6 text-[#39FF14]" />
                    ) : (
                      <TrendingDown className="h-6 w-6 text-[#FF3366]" />
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center">
                      <div className="text-[#6B7C93] text-xs mb-1">팀타율</div>
                      <div className="text-white font-mono text-lg">{team.avg}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#6B7C93] text-xs mb-1">팀방어율</div>
                      <div className="text-white font-mono text-lg">{team.era}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#6B7C93] text-xs mb-1">홈런</div>
                      <div className="text-white font-mono text-lg">{team.hr}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-[#6B7C93] text-xs mb-1">득점</div>
                      <div className="text-[#39FF14] font-mono text-lg">{team.runs}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#6B7C93] text-xs mb-1">실점</div>
                      <div className="text-[#FF3366] font-mono text-lg">{team.runsAllowed}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#6B7C93] text-xs mb-1">도루</div>
                      <div className="text-white font-mono text-lg">{team.sb}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
