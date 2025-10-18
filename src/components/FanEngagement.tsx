import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { MessageCircle, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function FanEngagement() {
  const [selectedWinner, setSelectedWinner] = useState<string | null>(null);
  const [selectedPlay, setSelectedPlay] = useState<string | null>(null);

  const todayPrediction = {
    team1: { name: '삼성', logo: '🦁', votes: 1234, percentage: 58 },
    team2: { name: 'SSG', logo: '🔱', votes: 892, percentage: 42 },
  };

  const bestPlays = [
    { id: '1', title: '김도영 끝내기 홈런', thumbnail: '⚾', votes: 456 },
    { id: '2', title: '최원태 9회 삼자범퇴', thumbnail: '🎯', votes: 389 },
    { id: '3', title: '문보경 레이저빔 송구', thumbnail: '⚡', votes: 312 },
  ];



  const handleVoteWinner = (team: string) => {
    if (!selectedWinner) {
      setSelectedWinner(team);
    }
  };

  const handleVotePlay = (playId: string) => {
    if (!selectedPlay) {
      setSelectedPlay(playId);
    }
  };

  return (
    <div className="px-4 py-4 space-y-4">
      <h2 className="text-white flex items-center gap-2">
        <Trophy className="h-5 w-5 text-[#FFD700]" />
        팬 참여
      </h2>

      {/* Today's Prediction */}
      <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl p-4">
        <h3 className="text-white mb-4">오늘의 승자를 예측하세요!</h3>

        <div className="space-y-3">
          <motion.button
            onClick={() => handleVoteWinner('team1')}
            disabled={selectedWinner !== null}
            className={`w-full p-4 rounded-xl border-2 transition-all ${
              selectedWinner === 'team1'
                ? 'border-[#00D9FF] bg-[#00D9FF]/10'
                : 'border-[#2D3A4F] hover:border-[#00D9FF]/50'
            } ${selectedWinner && selectedWinner !== 'team1' ? 'opacity-50' : ''}`}
            whileHover={!selectedWinner ? { scale: 1.02 } : {}}
            whileTap={!selectedWinner ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{todayPrediction.team1.logo}</span>
                <span className="text-white">{todayPrediction.team1.name}</span>
              </div>
              <span className="text-white font-mono text-xl">
                {todayPrediction.team1.percentage}%
              </span>
            </div>
            <Progress value={todayPrediction.team1.percentage} className="h-2" />
          </motion.button>

          <motion.button
            onClick={() => handleVoteWinner('team2')}
            disabled={selectedWinner !== null}
            className={`w-full p-4 rounded-xl border-2 transition-all ${
              selectedWinner === 'team2'
                ? 'border-[#00D9FF] bg-[#00D9FF]/10'
                : 'border-[#2D3A4F] hover:border-[#00D9FF]/50'
            } ${selectedWinner && selectedWinner !== 'team2' ? 'opacity-50' : ''}`}
            whileHover={!selectedWinner ? { scale: 1.02 } : {}}
            whileTap={!selectedWinner ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{todayPrediction.team2.logo}</span>
                <span className="text-white">{todayPrediction.team2.name}</span>
              </div>
              <span className="text-white font-mono text-xl">
                {todayPrediction.team2.percentage}%
              </span>
            </div>
            <Progress value={todayPrediction.team2.percentage} className="h-2" />
          </motion.button>
        </div>

        {selectedWinner && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center text-[#39FF14]"
          >
            ✓ 투표가 완료되었습니다!
          </motion.div>
        )}

        <div className="mt-3 text-center text-[#6B7C93]">
          총 {(todayPrediction.team1.votes + todayPrediction.team2.votes).toLocaleString()}명 참여
        </div>
      </Card>

      {/* Best Play Vote */}
      <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl p-4">
        <h3 className="text-white mb-4">오늘의 베스트 플레이는?</h3>

        <div className="space-y-2">
          {bestPlays.map((play) => (
            <motion.button
              key={play.id}
              onClick={() => handleVotePlay(play.id)}
              disabled={selectedPlay !== null}
              className={`w-full p-3 rounded-xl border transition-all flex items-center justify-between ${
                selectedPlay === play.id
                  ? 'border-[#00D9FF] bg-[#00D9FF]/10'
                  : 'border-[#2D3A4F] hover:border-[#00D9FF]/50'
              } ${selectedPlay && selectedPlay !== play.id ? 'opacity-50' : ''}`}
              whileHover={!selectedPlay ? { scale: 1.02 } : {}}
              whileTap={!selectedPlay ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{play.thumbnail}</span>
                <span className="text-white">{play.title}</span>
              </div>
              <Badge variant="outline" className="border-[#2D3A4F]">
                {play.votes}
              </Badge>
            </motion.button>
          ))}
        </div>

        {selectedPlay && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center text-[#39FF14]"
          >
            ✓ 투표가 완료되었습니다!
          </motion.div>
        )}
      </Card>
    </div>
  );
}
