import { Home } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', label: '홈', icon: Home },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-[#0A1628]/95 backdrop-blur-md border-t border-[#2D3A4F] pb-safe">
      <div className="flex justify-center h-18">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center gap-1 py-2 px-8 transition-colors"
            >
              <Icon
                className={`h-6 w-6 transition-colors ${
                  isActive ? 'text-[#00D9FF]' : 'text-[#6B7C93]'
                }`}
                fill={isActive ? 'currentColor' : 'none'}
              />
              <span
                className={`text-xs transition-colors ${
                  isActive ? 'text-[#00D9FF]' : 'text-[#6B7C93]'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#00D9FF] rounded-full"
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
