import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { MessageCircle, Send, Bot, User, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
}

// OpenAI API 키는 환경변수에서 가져오거나 제거됨 (보안상 하드코딩 금지)

const quickQuestions = [
  "2025 KBO 포스트시즌 현재 상황은?",
  "와일드카드 결과 어떻게 됐어?",
  "준플레이오프 누가 이겼어?", 
  "한국시리즈 언제 시작해?",
  "오늘 KBO 경기 있어?"
];

export function KBOChatbot() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const kboDataSources = [
    {
      title: "KBO 공식 포스트시즌 대진표",
      description: "와일드카드부터 한국시리즈까지 정확한 대진표와 결과",
      url: "https://www.koreabaseball.com",
      icon: "🏆",
      color: "bg-[#074CA1]"
    },
    {
      title: "네이버 스포츠 실시간 중계",
      description: "실시간 스코어, 이닝별 상황, 경기 중계",
      url: "https://sports.news.naver.com/kbaseball/schedule/index",
      icon: "📱",
      color: "bg-[#03C75A]"
    },
    {
      title: "유튜브 KBO 하이라이트",
      description: "포스트시즌 모든 경기 하이라이트 영상",
      url: "https://www.youtube.com/results?search_query=KBO+2025+포스트시즌",
      icon: "🎬",
      color: "bg-[#FF0000]"
    },
    {
      title: "MBC Sports+ 중계",
      description: "실시간 경기 영상 중계",
      url: "https://www.mbcsportsplus.com",
      icon: "📺",
      color: "bg-[#FF6B00]"
    }
  ];

  const quickInfo = [
    {
      question: "와일드카드 결과는?",
      answer: "KBO 공식사이트 → 경기결과 → 포스트시즌에서 확인",
      link: "https://www.koreabaseball.com"
    },
    {
      question: "준플레이오프 현재 상황?",
      answer: "네이버 스포츠 → KBO → 포스트시즌 대진표에서 실시간 확인",
      link: "https://sports.news.naver.com/kbaseball/schedule/index"
    },
    {
      question: "한국시리즈 언제?",
      answer: "KBO 공식 일정표에서 플레이오프 결과에 따른 확정 일정 확인",
      link: "https://www.koreabaseball.com/Schedule/Schedule.aspx"
    },
    {
      question: "하이라이트 보고싶어",
      answer: "YouTube에서 'KBO 2025 포스트시즌' 검색하면 최신 하이라이트 영상",
      link: "https://www.youtube.com/results?search_query=KBO+2025+포스트시즌"
    }
  ];

  const askOpenAI = async (question: string): Promise<string> => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || 'API_KEY_NOT_SET'}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `당신은 2025년 KBO 프로야구 포스트시즌 전문가입니다. 현재 날짜는 2025년 10월 18일입니다. 
                       사용자가 2025년 KBO 포스트시즌(와일드카드, 준플레이오프, 플레이오프, 한국시리즈)에 대해 물어보면 
                       실시간으로 웹에서 검색해서 정확한 실제 정보를 알려주세요. 
                       
                       답변 시 다음을 포함해주세요:
                       - 지난 경기 결과 (정확한 스코어)
                       - 현재 진행 상황
                       - 남은 일정
                       - 간단하고 명확하게 한국어로 답변
                       
                       만약 정확한 정보를 모른다면 "KBO 공식사이트에서 확인하세요"라고 안내해주세요.`
            },
            {
              role: 'user',
              content: question
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'OpenAI 응답을 받을 수 없습니다.';

    } catch (error) {
      console.error('OpenAI API Error:', error);
      return '죄송합니다. 현재 AI 서비스에 연결할 수 없습니다. KBO 공식사이트(koreabaseball.com)에서 최신 정보를 확인해주세요.';
    }
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputMessage.trim();
    if (!messageText || isLoading) return;

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // 로딩 메시지 추가
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: 'KBO 포스트시즌 최신 정보를 검색하고 있습니다...',
      isUser: false,
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, loadingMessage]);

    try {
      // OpenAI로 실시간 정보 검색
      const response = await askOpenAI(`2025년 KBO 포스트시즌에 대한 질문: ${messageText}`);
      
      // 로딩 메시지 제거하고 실제 응답 추가
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          id: (Date.now() + 2).toString(),
          text: response,
          isUser: false,
          timestamp: new Date()
        }];
      });

    } catch (error) {
      // 에러 메시지
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          id: (Date.now() + 2).toString(),
          text: '죄송합니다. 현재 정보를 가져올 수 없습니다. KBO 공식사이트에서 확인해주세요.',
          isUser: false,
          timestamp: new Date()
        }];
      });
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="px-4 py-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-[#FF3366]" />
        <h2 className="text-white">실제 KBO 데이터 바로가기</h2>
        <Badge className="bg-[#FF3366] text-white border-0 text-xs">
          실시간 연결
        </Badge>
      </div>


      {/* 실제 KBO 데이터 소스들 */}
      <div className="space-y-3 mb-6">
        {kboDataSources.map((source, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl p-4 hover:bg-white/5 transition-all cursor-pointer"
              onClick={() => window.open(source.url, '_blank')}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${source.color} rounded-xl flex items-center justify-center text-2xl`}>
                  {source.icon}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{source.title}</div>
                  <div className="text-[#B8C5D6] text-sm mt-1">{source.description}</div>
                </div>
                <ExternalLink className="h-4 w-4 text-[#6B7C93]" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 자주 묻는 질문 */}
      <Card className="bg-[#16213E]/40 backdrop-blur-md border-[#2D3A4F] rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="h-4 w-4 text-[#00D9FF]" />
          <h3 className="text-white font-medium">자주 묻는 질문</h3>
        </div>

        <div className="space-y-3">
          {quickInfo.map((info, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className={`p-3 rounded-xl border border-[#2D3A4F] cursor-pointer transition-all ${
                  selectedQuestion === info.question 
                    ? 'bg-[#00D9FF]/20 border-[#00D9FF]' 
                    : 'bg-[#1a1a2e] hover:bg-[#2D3A4F]/50'
                }`}
                onClick={() => setSelectedQuestion(selectedQuestion === info.question ? null : info.question)}
              >
                <div className="flex items-center justify-between">
                  <div className="text-white text-sm">{info.question}</div>
                  <div className={`text-xs transition-transform ${
                    selectedQuestion === info.question ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </div>
                </div>
                
                <AnimatePresence>
                  {selectedQuestion === info.question && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-[#2D3A4F]">
                        <div className="text-[#B8C5D6] text-sm mb-3">{info.answer}</div>
                        <Button
                          size="sm"
                          className="bg-[#00D9FF] text-[#0A1628] hover:bg-[#00D9FF]/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(info.link, '_blank');
                          }}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          바로 확인하기
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

    </div>
  );
}
