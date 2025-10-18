import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Play, Eye, Share2, ThumbsUp, Filter } from 'lucide-react';
import { motion } from 'motion/react';

interface Highlight {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  timestamp: string;
  likes: number;
  category: 'homerun' | 'defense' | 'pitching' | 'other';
  team: string;
}

const highlights: Highlight[] = [
  {
    id: '1',
    title: '김도영 끝내기 홈런! 극적인 역전승',
    thumbnail: '🎬',
    duration: '0:45',
    views: 15234,
    timestamp: '2시간 전',
    likes: 1234,
    category: 'homerun',
    team: 'KIA',
  },
  {
    id: '2',
    title: '최원태 9회말 삼자범퇴 완벽 마무리',
    thumbnail: '🎬',
    duration: '1:12',
    views: 12456,
    timestamp: '3시간 전',
    likes: 987,
    category: 'pitching',
    team: '삼성',
  },
  {
    id: '3',
    title: '문보경 레이저빔 송구로 본루 아웃!',
    thumbnail: '🎬',
    duration: '0:38',
    views: 9876,
    timestamp: '5시간 전',
    likes: 765,
    category: 'defense',
    team: 'LG',
  },
  {
    id: '4',
    title: '양의지 시즌 첫 멀티홈런 폭발',
    thumbnail: '🎬',
    duration: '1:05',
    views: 8234,
    timestamp: '6시간 전',
    likes: 654,
    category: 'homerun',
    team: 'NC',
  },
  {
    id: '5',
    title: '박병호 시즌 6호 투런 홈런',
    thumbnail: '🎬',
    duration: '0:52',
    views: 7543,
    timestamp: '8시간 전',
    likes: 543,
    category: 'homerun',
    team: '삼성',
  },
  {
    id: '6',
    title: '구자욱 환상적인 다이빙 캐치',
    thumbnail: '🎬',
    duration: '0:28',
    views: 6892,
    timestamp: '10시간 전',
    likes: 489,
    category: 'defense',
    team: '삼성',
  },
  {
    id: '7',
    title: '소형준 7이닝 무실점 역투',
    thumbnail: '🎬',
    duration: '1:35',
    views: 6234,
    timestamp: '12시간 전',
    likes: 432,
    category: 'pitching',
    team: 'KIA',
  },
  {
    id: '8',
    title: '오늘의 베스트 10 플레이 모음',
    thumbnail: '🎬',
    duration: '3:24',
    views: 5678,
    timestamp: '1일 전',
    likes: 398,
    category: 'other',
    team: 'ALL',
  },
];

export function HighlightsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all', label: '전체', icon: '🎬' },
    { id: 'homerun', label: '홈런', icon: '⚾' },
    { id: 'defense', label: '수비', icon: '🧤' },
    { id: 'pitching', label: '투구', icon: '🎯' },
    { id: 'other', label: '기타', icon: '⭐' },
  ];

  const filteredHighlights = selectedCategory === 'all'
    ? highlights
    : highlights.filter((h) => h.category === selectedCategory);

  const toggleLike = (id: string) => {
    setLikedVideos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-[#0A1628] pb-4">
      {/* Header */}
      <div className="sticky top-14 z-10 bg-[#0A1628] pt-4 px-4 pb-2">
        <h1 className="text-white text-2xl mb-4">영상 하이라이트</h1>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 ${
                selectedCategory === category.id
                  ? 'bg-[#00D9FF] text-[#0A1628] font-semibold'
                  : 'border-[#2D3A4F] text-[#B8C5D6] hover:border-[#00D9FF] hover:text-[#00D9FF]'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div className="px-4 space-y-4 mt-4">
        {filteredHighlights.map((highlight, index) => (
          <motion.div
            key={highlight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl overflow-hidden">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-[#1a1a2e] flex items-center justify-center">
                <div className="text-8xl">{highlight.thumbnail}</div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 rounded-full bg-[#00D9FF] flex items-center justify-center cursor-pointer shadow-lg shadow-[#00D9FF]/50"
                  >
                    <Play className="h-8 w-8 text-[#0A1628] fill-[#0A1628] ml-1" />
                  </motion.div>
                </div>
                <Badge className="absolute top-3 left-3 bg-[#FF3366] text-white border-0 font-semibold">
                  {highlight.team}
                </Badge>
                <Badge className="absolute top-3 right-3 bg-black/80 text-white border-0">
                  {highlight.duration}
                </Badge>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-white mb-3 line-clamp-2 text-lg">{highlight.title}</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[#6B7C93] text-sm">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{highlight.views.toLocaleString()}</span>
                    </div>
                    <span>{highlight.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(highlight.id)}
                      className={`h-8 px-2 ${
                        likedVideos.has(highlight.id)
                          ? 'text-[#FF3366]'
                          : 'text-[#6B7C93] hover:text-[#FF3366]'
                      }`}
                    >
                      <ThumbsUp className={`h-4 w-4 mr-1 ${likedVideos.has(highlight.id) ? 'fill-current' : ''}`} />
                      <span className="text-xs">
                        {likedVideos.has(highlight.id) ? highlight.likes + 1 : highlight.likes}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#6B7C93] hover:text-[#00D9FF]"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="px-4 mt-6">
        <Button
          variant="outline"
          className="w-full border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#0A1628]"
        >
          더 많은 영상 보기
        </Button>
      </div>
    </div>
  );
}
