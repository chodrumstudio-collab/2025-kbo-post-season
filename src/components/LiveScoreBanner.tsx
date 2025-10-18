import { X } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface LiveScoreBannerProps {
  homeTeam: { name: string; score: number };
  awayTeam: { name: string; score: number };
  inning: string;
  onClose: () => void;
  onClick: () => void;
}

export function LiveScoreBanner({
  homeTeam,
  awayTeam,
  inning,
  onClose,
  onClick,
}: LiveScoreBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-14 left-0 right-0 z-[90] px-4 pt-2"
        >
          <div
            onClick={onClick}
            className="bg-[#16213E]/95 backdrop-blur-md border border-[#2D3A4F] rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-[#16213E]"
          >
            <div className="flex items-center gap-3 flex-1">
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-[#FF3366] rounded-full"
              />
              <div className="flex items-center gap-2">
                <span className="text-white">{awayTeam.name}</span>
                <span className="font-mono text-white">{awayTeam.score}</span>
              </div>
              <span className="text-[#6B7C93]">-</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-white">{homeTeam.score}</span>
                <span className="text-white">{homeTeam.name}</span>
              </div>
              <span className="text-[#B8C5D6] text-xs">{inning}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8 text-[#B8C5D6] hover:text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
