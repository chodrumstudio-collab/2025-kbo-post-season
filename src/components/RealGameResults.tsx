import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, MapPin, ExternalLink, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

interface GameResult {
  id: string;
  date: string;
  homeTeam: { name: string; logo: string; score: number; color: string };
  awayTeam: { name: string; logo: string; score: number; color: string };
  stadium: string;
  round: string;
  status: 'final' | 'scheduled';
}

interface RealGameResultsProps {
  games: GameResult[];
  loading?: boolean;
  error?: string | null;
}

export function RealGameResults({ games, loading, error }: RealGameResultsProps) {
  if (loading) {
    return (
      <div className="px-4 py-4">
        <h2 className="text-white mb-4">2025 KBO 포스트시즌 결과</h2>
        <div className="animate-pulse space-y-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl p-4">
              <div className="h-20 bg-[#2D3A4F] rounded animate-pulse" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-4">
        <h2 className="text-white mb-4">2025 KBO 포스트시즌 결과</h2>
        <Card className="bg-[#FF3366]/10 border-[#FF3366]/20 rounded-2xl p-6 text-center">
          <div className="text-[#FF3366] mb-3">❌ 실제 데이터 로드 실패</div>
          <div className="text-[#B8C5D6] text-sm mb-4">{error}</div>
          <div className="flex gap-2 justify-center">
            <Button
              size="sm"
              onClick={() => window.open('https://www.koreabaseball.com', '_blank')}
              className="bg-[#00D9FF] text-[#0A1628] hover:bg-[#00D9FF]/90"
            >
              KBO 공식사이트
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open('https://sports.news.naver.com/kbaseball', '_blank')}
              className="border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#0A1628]"
            >
              네이버 스포츠
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!games.length) {
    return (
      <div className="px-4 py-4">
        <h2 className="text-white mb-4">2025 KBO 포스트시즌 결과</h2>
        <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">⚾</div>
          <div className="text-white mb-2">실제 경기 결과 데이터 없음</div>
          <div className="text-[#6B7C93] text-sm mb-4">
            KBO 공식 API에서 포스트시즌 결과를 가져올 수 없습니다
          </div>
          <Button
            onClick={() => window.open('https://www.koreabaseball.com', '_blank')}
            className="bg-[#00D9FF] text-[#0A1628] hover:bg-[#00D9FF]/90"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            KBO 공식사이트에서 확인
          </Button>
        </Card>
      </div>
    );
  }

  // 완료된 경기와 예정된 경기 분리
  const completedGames = games.filter(game => game.status === 'final');
  const upcomingGames = games.filter(game => game.status === 'scheduled');

  return (
    <div className="px-4 py-4 space-y-6">
      {/* 지난 경기 결과 */}
      {completedGames.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-[#FFD700]" />
            <h2 className="text-white">지난 경기 결과</h2>
            <Badge className="bg-[#39FF14] text-[#0A1628] border-0 text-xs">
              실제 데이터
            </Badge>
          </div>

          <div className="space-y-3">
            {completedGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl p-4">
                  {/* 라운드 및 날짜 */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-[#00D9FF] text-[#0A1628] border-0">
                      {game.round}
                    </Badge>
                    <div className="flex items-center gap-1 text-[#6B7C93] text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{game.date}</span>
                    </div>
                  </div>

                  {/* 팀 점수 */}
                  <div className="flex items-center justify-between mb-4">
                    {/* 원정팀 */}
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-4xl">{game.awayTeam.logo}</div>
                      <div>
                        <div className="text-white">{game.awayTeam.name}</div>
                        <div className="text-[#6B7C93] text-sm">원정</div>
                      </div>
                    </div>

                    {/* 점수 */}
                    <div className="text-center mx-4">
                      <div className="flex items-center gap-3">
                        <div className={`font-mono text-3xl ${
                          game.awayTeam.score > game.homeTeam.score ? 'text-[#39FF14]' : 'text-white'
                        }`}>
                          {game.awayTeam.score}
                        </div>
                        <div className="text-[#B8C5D6]">:</div>
                        <div className={`font-mono text-3xl ${
                          game.homeTeam.score > game.awayTeam.score ? 'text-[#39FF14]' : 'text-white'
                        }`}>
                          {game.homeTeam.score}
                        </div>
                      </div>
                      <div className="text-[#6B7C93] text-xs mt-1">최종</div>
                    </div>

                    {/* 홈팀 */}
                    <div className="flex items-center gap-3 flex-1 justify-end text-right">
                      <div>
                        <div className="text-white">{game.homeTeam.name}</div>
                        <div className="text-[#6B7C93] text-sm">홈</div>
                      </div>
                      <div className="text-4xl">{game.homeTeam.logo}</div>
                    </div>
                  </div>

                  {/* 경기장 정보 */}
                  <div className="flex items-center justify-between text-[#6B7C93] text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{game.stadium}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#00D9FF] hover:text-[#00D9FF]/90 h-auto p-1"
                      onClick={() => window.open('https://www.koreabaseball.com', '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      상세보기
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 남은 일정 */}
      {upcomingGames.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-[#00D9FF]" />
            <h2 className="text-white">남은 일정</h2>
            <Badge className="bg-[#39FF14] text-[#0A1628] border-0 text-xs">
              실제 데이터
            </Badge>
          </div>

          <div className="space-y-3">
            {upcomingGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl p-4">
                  {/* 라운드 및 날짜 */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="border-[#00D9FF] text-[#00D9FF]">
                      {game.round}
                    </Badge>
                    <div className="flex items-center gap-1 text-[#00D9FF] text-sm font-medium">
                      <Calendar className="h-4 w-4" />
                      <span>{game.date}</span>
                    </div>
                  </div>

                  {/* 팀 대진 */}
                  <div className="flex items-center justify-between mb-4">
                    {/* 원정팀 */}
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-4xl">{game.awayTeam.logo}</div>
                      <div>
                        <div className="text-white">{game.awayTeam.name}</div>
                        <div className="text-[#6B7C93] text-sm">원정</div>
                      </div>
                    </div>

                    <div className="text-[#B8C5D6] mx-4 text-lg font-bold">VS</div>

                    {/* 홈팀 */}
                    <div className="flex items-center gap-3 flex-1 justify-end text-right">
                      <div>
                        <div className="text-white">{game.homeTeam.name}</div>
                        <div className="text-[#6B7C93] text-sm">홈</div>
                      </div>
                      <div className="text-4xl">{game.homeTeam.logo}</div>
                    </div>
                  </div>

                  {/* 경기장 정보 */}
                  <div className="flex items-center justify-between text-[#6B7C93] text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{game.stadium}</span>
                    </div>
                    <div className="text-[#FFD700] text-sm">예정</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center pt-4">
        <div className="text-[#6B7C93] text-sm mb-3">
          🔍 실제 KBO 2025 포스트시즌 데이터를 표시합니다
        </div>
        <Button
          variant="outline"
          className="border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#0A1628]"
          onClick={() => window.open('https://www.koreabaseball.com', '_blank')}
        >
          KBO 공식사이트에서 더 자세히 보기
        </Button>
      </div>
    </div>
  );
}
