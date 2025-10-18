import { motion, AnimatePresence } from 'motion/react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Wifi, WifiOff, RefreshCcw, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface DataStatusIndicatorProps {
  isConnected: boolean;
  lastUpdated?: Date | null;
  error?: string | null;
  onRefresh?: () => void;
  isLoading?: boolean;
}

export function DataStatusIndicator({ 
  isConnected, 
  lastUpdated, 
  error, 
  onRefresh, 
  isLoading = false 
}: DataStatusIndicatorProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = () => {
    if (error) return 'bg-[#FF3366]';
    if (isConnected) return 'bg-[#39FF14]';
    return 'bg-[#FFD700]';
  };

  const getStatusText = () => {
    if (error) return '실제 데이터 없음';
    if (isConnected) return '시뮬레이션 모드';
    return 'API 접근 시도';
  };

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return '방금 전';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  };

  return (
    <div className="fixed top-20 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col items-end gap-2"
      >
        {/* Status Badge */}
        <Badge
          className={`${getStatusColor()} text-white border-0 cursor-pointer flex items-center gap-2`}
          onClick={() => setShowDetails(!showDetails)}
        >
          <motion.div
            animate={isConnected ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {error ? (
              <WifiOff className="h-3 w-3" />
            ) : isConnected ? (
              <Wifi className="h-3 w-3" />
            ) : (
              <AlertCircle className="h-3 w-3" />
            )}
          </motion.div>
          <span className="text-xs">{getStatusText()}</span>
        </Badge>

        {/* Details Panel */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="bg-[#16213E]/95 backdrop-blur-md border border-[#2D3A4F] rounded-xl p-4 min-w-64"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">데이터 연결 상태</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-[#B8C5D6] hover:text-[#00D9FF]"
                    onClick={onRefresh}
                    disabled={isLoading}
                  >
                    <RefreshCcw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
                  </Button>
                </div>

                {/* Connection Status */}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
                  <span className="text-[#B8C5D6] text-sm">
                    {error ? '실제 KBO 2025 데이터 없음' : isConnected ? '시뮬레이션 데이터 모드' : '실제 데이터 소스 검색 중'}
                  </span>
                </div>

                {/* Last Updated */}
                {lastUpdated && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-[#39FF14]" />
                    <span className="text-[#B8C5D6] text-sm">
                      마지막 업데이트: {formatLastUpdated(lastUpdated)}
                    </span>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="bg-[#FF3366]/10 border border-[#FF3366]/20 rounded-lg p-2">
                    <div className="text-[#FF3366] text-xs">{error}</div>
                  </div>
                )}

                {/* API Sources */}
                <div className="border-t border-[#2D3A4F] pt-3">
                  <div className="text-[#B8C5D6] text-xs mb-2">KBO 데이터 소스:</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#39FF14]" />
                      <span className="text-[#6B7C93] text-xs">KBO 공식 (2025 포스트시즌)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#FFD700]" />
                      <span className="text-[#6B7C93] text-xs">네이버 스포츠 API</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#00D9FF]" />
                      <span className="text-[#6B7C93] text-xs">YouTube (KBO 하이라이트)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#FF3366]" />
                      <span className="text-[#6B7C93] text-xs">실시간 경기 중계</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
