import { ScrollArea } from './ui/scroll-area';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  logo: string;
  color: string;
}

const teams: Team[] = [
  { id: 'all', name: '전체', logo: '⚾', color: '#00D9FF' },
  { id: 'lg', name: 'LG', logo: '🐻', color: '#C30452' },
  { id: 'kia', name: 'KIA', logo: '🐯', color: '#EA0029' },
  { id: 'samsung', name: '삼성', logo: '🦁', color: '#074CA1' },
  { id: 'ssg', name: 'SSG', logo: '🔱', color: '#CE0E2D' },
  { id: 'hanwha', name: '한화', logo: '🦅', color: '#FF6600' },
  { id: 'nc', name: 'NC', logo: '🦅', color: '#315288' },
];

interface TeamSelectorProps {
  selectedTeam: string;
  onTeamSelect: (teamId: string) => void;
}

export function TeamSelector({ selectedTeam, onTeamSelect }: TeamSelectorProps) {
  return (
    <div className="px-4 py-4">
      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-2">
          {teams.map((team) => (
            <motion.button
              key={team.id}
              onClick={() => onTeamSelect(team.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-2 transition-all ${
                selectedTeam === team.id ? 'scale-110' : 'opacity-70'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 transition-all ${
                  selectedTeam === team.id
                    ? 'border-current'
                    : 'border-transparent'
                }`}
                style={{
                  borderColor: selectedTeam === team.id ? team.color : 'transparent',
                }}
              >
                {team.logo}
              </div>
              <span className={`text-xs ${selectedTeam === team.id ? 'text-white' : 'text-[#6B7C93]'}`}>
                {team.name}
              </span>
              {team.id === 'kia' && (
                <Star className="h-3 w-3 text-[#FFD700] fill-[#FFD700] absolute -top-1 -right-1" />
              )}
            </motion.button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
