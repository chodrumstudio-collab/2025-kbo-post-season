import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface Game {
  id: string;
  homeTeam: { logo: string; name: string };
  awayTeam: { logo: string; name: string };
  status: 'scheduled' | 'live' | 'final' | 'postponed';
  time?: string;
  homeScore?: number;
  awayScore?: number;
}

interface QuickStatusBarProps {
  games: Game[];
  activeGameId?: string;
  onGameClick: (gameId: string) => void;
}

export function QuickStatusBar({ games, activeGameId, onGameClick }: QuickStatusBarProps) {
  const getStatusBadge = (status: Game['status']) => {
    switch (status) {
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
    <div className="px-4 py-4">
      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-2">
          {games.map((game) => (
            <Card
              key={game.id}
              onClick={() => onGameClick(game.id)}
              className={`flex-shrink-0 w-32 bg-[#16213E]/40 backdrop-blur-md border-2 cursor-pointer transition-all ${
                game.id === activeGameId
                  ? 'border-[#00D9FF]'
                  : 'border-[#2D3A4F] hover:border-[#00D9FF]/50'
              } rounded-xl p-3`}
            >
              <div className="mb-2">{getStatusBadge(game.status)}</div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl">{game.awayTeam.logo}</span>
                {game.awayScore !== undefined && (
                  <span className="font-mono text-white">{game.awayScore}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{game.homeTeam.logo}</span>
                {game.homeScore !== undefined && (
                  <span className="font-mono text-white">{game.homeScore}</span>
                )}
              </div>
              {game.time && (
                <div className="text-[#6B7C93] text-xs mt-2 text-center">
                  {game.time}
                </div>
              )}
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
