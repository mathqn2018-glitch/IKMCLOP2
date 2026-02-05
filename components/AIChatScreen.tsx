
import React, { useState, useRef, useEffect } from 'react';
import { AppScreen } from '../types';
import { getGeminiResponse } from '../geminiService';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AIChatScreen: React.FC<{ onNavigate: (screen: AppScreen) => void }> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Chào bé! Anh là Gia sư Kangaroo đây. Bé có câu hỏi nào về Toán không? Cứ hỏi anh nhé! 🦒", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // Fix: Access MathJax via (window as any)
    if ((window as any).MathJax) {
      (window as any).MathJax.typesetPromise();
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue;
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(userMsg);
      setMessages(prev => [...prev, { text: response || 'Anh chưa nghĩ ra cách giải thích này, bé hỏi lại nhé!', sender: 'ai' }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: "Ôi, có lỗi kết nối rồi. Bé thử lại sau một chút nhé! 😅", sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] glass-card rounded-3xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-4">
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white">
            <i className="fas fa-robot"></i>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Gia sư Kangaroo AI</h3>
            <span className="text-xs text-green-500 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              Đang sẵn sàng giúp bé
            </span>
          </div>
        </div>
        <button onClick={() => onNavigate(AppScreen.HOME)} className="text-gray-400 hover:text-gray-600">
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-blue-500 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
            }`}>
              <div 
                className={`prose prose-sm ${msg.sender === 'user' ? 'prose-invert' : ''}`}
                dangerouslySetInnerHTML={{ __html: (window as any).marked.parse(msg.text) }}
              ></div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-sm rounded-tl-none border border-gray-100 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-xs text-gray-400 italic">Đang suy nghĩ...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Viết câu hỏi của bé vào đây..."
            className="flex-grow px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="w-12 h-12 gradient-primary text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-md"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatScreen;
