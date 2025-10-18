import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface MVPCandidate {
  id: string;
  name: string;
  team: string;
  position: string;
  rank: number;
  stats: {
    avg?: string;
    hr?: number;
    rbi?: number;
    ops?: string;
    era?: string;
    wins?: number;
    so?: number;
  };
  votes: number;
  teamColor: string;
}

const candidates: MVPCandidate[] = [
  {
    id: '1',
    name: '김도영',
    team: 'KIA',
    position: '내야수',
    rank: 1,
    stats: { avg: '.362', hr: 5, rbi: 18, ops: '1.124' },
    votes: 2847,
    teamColor: '#EA0029',
  },
  {
    id: '2',
    name: '문보경',
    team: 'LG',
    position: '외야수',
    rank: 2,
    stats: { avg: '.348', hr: 4, rbi: 15, ops: '1.056' },
    votes: 2156,
    teamColor: '#C30452',
  },
  {
    id: '3',
    name: '양의지',
    team: 'NC',
    position: '포수',
    rank: 3,
    stats: { avg: '.325', hr: 3, rbi: 12, ops: '.987' },
    votes: 1823,
    teamColor: '#315288',
  },
  {
    id: '4',
    name: '최원태',
    team: '삼성',
    position: '투수',
    rank: 4,
    stats: { era: '1.89', wins: 3, so: 28 },
    votes: 1654,
    teamColor: '#074CA1',
  },
];

export function MVPRace() {
  const [votedId, setVotedId] = useState<string | null>(null);

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return '#2D3A4F';
    }
  };

  const handleVote = (id: string) => {
    setVotedId(id);
  };

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#FFD700]" />
          <h2 className="text-white">MVP 후보</h2>
        </div>
        <Button variant="ghost" className="text-[#00D9FF] h-auto p-0">
          전체 순위 →
        </Button>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-2">
          {candidates.map((candidate) => (
            <motion.div
              key={candidate.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="flex-shrink-0 w-44 bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl p-4">
                {/* Rank Badge */}
                <div className="flex justify-between items-start mb-3">
                  <Badge
                    style={{ backgroundColor: getMedalColor(candidate.rank) }}
                    className="text-white border-0"
                  >
                    #{candidate.rank}
                  </Badge>
                  {votedId === candidate.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    >
                      <Heart className="h-5 w-5 text-[#FF3366] fill-[#FF3366]" />
                    </motion.div>
                  )}
                </div>

                {/* Player Photo Placeholder */}
                <div
                  className="w-28 h-28 mx-auto rounded-full mb-3 flex items-center justify-center text-5xl border-4"
                  style={{ borderColor: candidate.teamColor }}
                >
                  ⚾
                </div>

                {/* Player Info */}
                <div className="text-center mb-3">
                  <h3 className="text-white mb-1">{candidate.name}</h3>
                  <div className="text-[#B8C5D6]">
                    {candidate.team} · {candidate.position}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {candidate.stats.avg && (
                    <>
                      <div className="text-center">
                        <div className="text-[#6B7C93]">타율</div>
                        <div className="text-white font-mono">{candidate.stats.avg}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#6B7C93]">홈런</div>
                        <div className="text-white font-mono">{candidate.stats.hr}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#6B7C93]">타점</div>
                        <div className="text-white font-mono">{candidate.stats.rbi}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#6B7C93]">OPS</div>
                        <div className="text-white font-mono">{candidate.stats.ops}</div>
                      </div>
                    </>
                  )}
                  {candidate.stats.era && (
                    <>
                      <div className="text-center">
                        <div className="text-[#6B7C93]">ERA</div>
                        <div className="text-white font-mono">{candidate.stats.era}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#6B7C93]">승</div>
                        <div className="text-white font-mono">{candidate.stats.wins}</div>
                      </div>
                      <div className="text-center col-span-2">
                        <div className="text-[#6B7C93]">탈삼진</div>
                        <div className="text-white font-mono">{candidate.stats.so}</div>
                      </div>
                    </>
                  )}
                </div>

                {/* Vote Button */}
                <Button
                  onClick={() => handleVote(candidate.id)}
                  disabled={votedId !== null}
                  className={`w-full ${
                    votedId === candidate.id
                      ? 'bg-[#FF3366] hover:bg-[#FF3366]/90'
                      : 'bg-[#00D9FF] hover:bg-[#00D9FF]/90'
                  } text-[#0A1628] font-semibold`}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  {votedId === candidate.id ? '투표완료' : '투표하기'}
                </Button>

                {/* Vote Count */}
                <div className="text-center text-[#6B7C93] text-xs mt-2">
                  {candidate.votes.toLocaleString()}명이 선택
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
