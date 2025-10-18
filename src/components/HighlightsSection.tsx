import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Play, Eye, Share2, ThumbsUp, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useHighlights } from '../hooks/useRealTimeData';

export function HighlightsSection() {
  const { highlights, loading, error } = useHighlights();

  const getTimeAgo = (publishedAt: string) => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '방금 전';
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    return `${Math.floor(diffInHours / 24)}일 전`;
  };

  if (loading) {
    return (
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white">실시간 야구 하이라이트</h2>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl overflow-hidden">
              <div className="aspect-video bg-[#1a1a2e] animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-[#2D3A4F] rounded animate-pulse" />
                <div className="h-4 bg-[#2D3A4F] rounded w-2/3 animate-pulse" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white">실시간 야구 하이라이트</h2>
        </div>
        <Alert className="bg-[#16213E]/40 border-[#FF3366]/20 text-[#FF3366]">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            하이라이트를 불러올 수 없습니다. YouTube API 키를 확인하세요.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white">실시간 야구 하이라이트</h2>
        <Button variant="ghost" className="text-[#00D9FF] h-auto p-0">
          YouTube에서 더보기 →
        </Button>
      </div>

      <div className="space-y-4">
        {highlights.slice(0, 4).map((highlight, index) => (
          <motion.div
            key={highlight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#00D9FF]/20 transition-all"
              onClick={() => window.open(highlight.url, '_blank')}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-[#1a1a2e] overflow-hidden">
                <img
                  src={highlight.thumbnail}
                  alt={highlight.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 bg-[#1a1a2e] flex items-center justify-center text-6xl" style={{display: 'none'}}>
                  🎬
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 rounded-full bg-[#00D9FF] flex items-center justify-center cursor-pointer"
                  >
                    <Play className="h-8 w-8 text-[#0A1628] fill-[#0A1628]" />
                  </motion.div>
                </div>
                <Badge className="absolute top-3 left-3 bg-black/80 text-white border-0">
                  {highlight.channelTitle}
                </Badge>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-white mb-2 line-clamp-2 text-sm leading-5">{highlight.title}</h3>
                <div className="flex items-center justify-between text-[#6B7C93]">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>YouTube</span>
                    </div>
                    <span>{getTimeAgo(highlight.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#6B7C93] hover:text-[#FF3366]"
                      onClick={(e) => {
                        e.stopPropagation();
                        // YouTube 좋아요 기능 (실제 구현은 복잡함)
                      }}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#6B7C93] hover:text-[#00D9FF]"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(highlight.url);
                      }}
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

      <Button 
        variant="outline" 
        className="w-full mt-4 border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#0A1628]"
        onClick={() => window.open('https://www.youtube.com/results?search_query=KBO+highlights', '_blank')}
      >
        YouTube에서 더보기
      </Button>
    </div>
  );
}
