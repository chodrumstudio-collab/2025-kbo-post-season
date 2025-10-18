import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { usePlayerStats } from '../hooks/useRealTimeData';

export function StatisticsTabs() {
  const [batterSort, setBatterSort] = useState('avg');
  const { playerStats, loading, error } = usePlayerStats();

  // 실제 API 데이터를 기존 형식에 맞게 변환
  const batters = playerStats
    .filter(player => player.stats.avg) // 타자만 필터링
    .slice(0, 10)
    .map((player, index) => ({
      rank: index + 1,
      name: player.name,
      team: player.team,
      avg: player.stats.avg || '.000',
      hits: 0, // MLB API에서 안타수는 별도 호출 필요
      hr: player.stats.hr || 0,
      rbi: player.stats.rbi || 0,
    }));

  const pitchers = playerStats
    .filter(player => player.stats.era) // 투수만 필터링
    .slice(0, 10)
    .map((player, index) => ({
      rank: index + 1,
      name: player.name,
      team: player.team,
      era: player.stats.era || '0.00',
      ip: '0.0', // 이닝은 별도 계산 필요
      so: player.stats.so || 0,
      wins: player.stats.wins || 0,
    }));

  // 임시 팀 데이터 (실제로는 별도 API 호출 필요)
  const teams = [
    {
      name: 'Boston Red Sox',
      logo: '⚾',
      record: '80승 65패',
      avg: '.285',
      era: '3.89',
      runs: 652,
      runsAllowed: 538,
      trend: 'up' as const,
    },
    {
      name: 'New York Yankees',
      logo: '⚾',
      record: '78승 67패',
      avg: '.278',
      era: '4.12',
      runs: 648,
      runsAllowed: 592,
      trend: 'up' as const,
    },
    {
      name: 'Tampa Bay Rays',
      logo: '⚾',
      record: '75승 70패',
      avg: '.265',
      era: '4.45',
      runs: 541,
      runsAllowed: 644,
      trend: 'down' as const,
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

  if (loading) {
    return (
      <div className="px-4 py-4">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00D9FF]"></div>
          <span className="ml-2 text-[#B8C5D6]">실시간 통계 로딩 중...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-4">
        <Alert className="bg-[#16213E]/40 border-[#FF3366]/20 text-[#FF3366]">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            통계를 불러올 수 없습니다: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <Tabs defaultValue="batters" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#16213E]/40 h-12 p-1">
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

        <TabsContent value="batters" className="mt-4">
          <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1a2e] sticky top-0">
                  <tr className="text-[#B8C5D6]">
                    <th className="py-3 px-3 text-left">순위</th>
                    <th className="py-3 px-3 text-left">선수</th>
                    <th className="py-3 px-3 text-left">팀</th>
                    <th className="py-3 px-3 text-right">타율</th>
                    <th className="py-3 px-3 text-right">안타</th>
                    <th className="py-3 px-3 text-right">홈런</th>
                    <th className="py-3 px-3 text-right">타점</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {batters.map((batter) => (
                    <tr key={batter.rank} className="border-t border-[#2D3A4F] hover:bg-white/5">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          {getMedalEmoji(batter.rank)}
                          <span>{batter.rank}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">{batter.name}</td>
                      <td className="py-3 px-3">
                        <Badge variant="outline" className="border-[#2D3A4F]">
                          {batter.team}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-[#39FF14]">
                        {batter.avg}
                      </td>
                      <td className="py-3 px-3 text-right font-mono">{batter.hits}</td>
                      <td className="py-3 px-3 text-right font-mono">{batter.hr}</td>
                      <td className="py-3 px-3 text-right font-mono">{batter.rbi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="pitchers" className="mt-4">
          <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1a2e] sticky top-0">
                  <tr className="text-[#B8C5D6]">
                    <th className="py-3 px-3 text-left">순위</th>
                    <th className="py-3 px-3 text-left">선수</th>
                    <th className="py-3 px-3 text-left">팀</th>
                    <th className="py-3 px-3 text-right">ERA</th>
                    <th className="py-3 px-3 text-right">이닝</th>
                    <th className="py-3 px-3 text-right">탈삼진</th>
                    <th className="py-3 px-3 text-right">승</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {pitchers.map((pitcher) => (
                    <tr key={pitcher.rank} className="border-t border-[#2D3A4F] hover:bg-white/5">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          {getMedalEmoji(pitcher.rank)}
                          <span>{pitcher.rank}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">{pitcher.name}</td>
                      <td className="py-3 px-3">
                        <Badge variant="outline" className="border-[#2D3A4F]">
                          {pitcher.team}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-[#39FF14]">
                        {pitcher.era}
                      </td>
                      <td className="py-3 px-3 text-right font-mono">{pitcher.ip}</td>
                      <td className="py-3 px-3 text-right font-mono">{pitcher.so}</td>
                      <td className="py-3 px-3 text-right font-mono">{pitcher.wins}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="teams" className="mt-4 space-y-3">
          {teams.map((team) => (
            <Card
              key={team.name}
              className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{team.logo}</span>
                  <div>
                    <h3 className="text-white">{team.name}</h3>
                    <div className="text-[#B8C5D6] font-mono">{team.record}</div>
                  </div>
                </div>
                {team.trend === 'up' ? (
                  <TrendingUp className="h-5 w-5 text-[#39FF14]" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-[#FF3366]" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[#6B7C93] mb-1">팀타율</div>
                  <div className="text-white font-mono text-xl">{team.avg}</div>
                </div>
                <div>
                  <div className="text-[#6B7C93] mb-1">팀방어율</div>
                  <div className="text-white font-mono text-xl">{team.era}</div>
                </div>
                <div>
                  <div className="text-[#6B7C93] mb-1">득점</div>
                  <div className="text-white font-mono text-xl">{team.runs}</div>
                </div>
                <div>
                  <div className="text-[#6B7C93] mb-1">실점</div>
                  <div className="text-white font-mono text-xl">{team.runsAllowed}</div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
