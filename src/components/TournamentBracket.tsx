import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ChevronDown, ChevronUp, Trophy } from 'lucide-react';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface Matchup {
  team1: { name: string; logo: string; seed: number; wins?: number };
  team2: { name: string; logo: string; seed: number; wins?: number };
  series: string;
  status: 'upcoming' | 'active' | 'completed';
  result?: string;
}

export function TournamentBracket() {
  const [isOpen, setIsOpen] = useState(true);

  // 실제 2025년 KBO 포스트시즌 대진표
  const rounds = [
    {
      name: '와일드카드 결정전',
      description: '1경기 승부',
      matchups: [
        {
          team1: { name: '삼성', logo: '🦁', seed: 4, wins: 1 },
          team2: { name: 'kt', logo: '🦊', seed: 5, wins: 0 },
          series: '1경기 승부',
          status: 'completed' as const,
          result: '삼성 7-3 승리 (10월 6일)',
        },
      ],
    },
    {
      name: '준플레이오프',
      description: '5전 3선승',
      matchups: [
        {
          team1: { name: '삼성', logo: '🦁', seed: 4, wins: 3 },
          team2: { name: 'LG', logo: '🐻', seed: 3, wins: 2 },
          series: '5전 3선승',
          status: 'active' as const,
          result: '삼성 3승 2패 (5차전 진행중)',
        },
      ],
    },
    {
      name: '플레이오프',
      description: '5전 3선승',
      matchups: [
        {
          team1: { name: 'KIA', logo: '🐯', seed: 2 },
          team2: { name: '준PO 승자', logo: '❓', seed: 0 },
          series: '5전 3선승',
          status: 'upcoming' as const,
          result: '준플레이오프 결과 대기',
        },
      ],
    },
    {
      name: '한국시리즈',
      description: '7전 4선승',
      matchups: [
        {
          team1: { name: '두산', logo: '⚾', seed: 1 },
          team2: { name: 'PO 승자', logo: '❓', seed: 0 },
          series: '7전 4선승',
          status: 'upcoming' as const,
          result: '플레이오프 결과 대기',
        },
      ],
    },
  ];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mx-4 my-4">
      <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl overflow-hidden">
        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors text-left">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-[#FFD700]" />
          <span className="text-white font-semibold">2025 KBO 포스트시즌</span>
        </div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-[#B8C5D6]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[#B8C5D6]" />
          )}
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-4 pt-0 space-y-6">
            {rounds.map((round, roundIdx) => (
              <div key={roundIdx}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white">{round.name}</h3>
                  <Badge variant="outline" className="border-[#2D3A4F] text-[#B8C5D6]">
                    {round.description}
                  </Badge>
                </div>

                {round.matchups.map((matchup, matchupIdx) => (
                  <motion.div
                    key={matchupIdx}
                    className={`bg-[#1a1a2e] rounded-xl p-4 ${
                      matchup.status === 'active'
                        ? 'ring-2 ring-[#00D9FF] animate-pulse'
                        : ''
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Team 1 */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{matchup.team1.logo}</span>
                        <div>
                          <div className="text-white">{matchup.team1.name}</div>
                          {matchup.team1.seed > 0 && (
                            <Badge className="bg-[#2D3A4F] text-[#B8C5D6] border-0 text-xs mt-1">
                              #{matchup.team1.seed}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {matchup.team1.wins !== undefined && (
                        <div className="font-mono text-white text-2xl">
                          {matchup.team1.wins}
                        </div>
                      )}
                    </div>

                    <div className="h-px bg-[#2D3A4F] my-2" />

                    {/* Team 2 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{matchup.team2.logo}</span>
                        <div>
                          <div className="text-white">{matchup.team2.name}</div>
                          {matchup.team2.seed > 0 && (
                            <Badge className="bg-[#2D3A4F] text-[#B8C5D6] border-0 text-xs mt-1">
                              #{matchup.team2.seed}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {matchup.team2.wins !== undefined && (
                        <div className="font-mono text-white text-2xl">
                          {matchup.team2.wins}
                        </div>
                      )}
                    </div>

                    {matchup.result && (
                      <div className="mt-3 text-center">
                        <div className="text-[#B8C5D6] text-sm">{matchup.result}</div>
                      </div>
                    )}
                    
                    {matchup.status === 'active' && (
                      <div className="mt-3 text-center">
                        <Badge className="bg-[#00D9FF] text-[#0A1628] border-0">
                          🔴 LIVE
                        </Badge>
                      </div>
                    )}
                  </motion.div>
                ))}

                {roundIdx < rounds.length - 1 && (
                  <div className="flex justify-center my-3">
                    <div className="w-px h-6 bg-[#2D3A4F]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
