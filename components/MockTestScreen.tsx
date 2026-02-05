
import React, { useState, useEffect } from 'react';
import { SAMPLE_PROBLEMS } from '../constants';
import { AppScreen } from '../types';

interface MockTestScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

const MockTestScreen: React.FC<MockTestScreenProps> = ({ onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(SAMPLE_PROBLEMS.length).fill(-1));
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleSelect = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = idx;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    (window as any).confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const calculateScore = () => {
    return answers.reduce((score, ans, idx) => {
      if (ans === SAMPLE_PROBLEMS[idx].correctIndex) {
        return score + SAMPLE_PROBLEMS[idx].points;
      }
      return score;
    }, 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isSubmitted) {
    const score = calculateScore();
    const totalPossible = SAMPLE_PROBLEMS.reduce((sum, p) => sum + p.points, 0);
    
    return (
      <div className="space-y-8 py-8 text-center animate-in zoom-in duration-500">
        <div className="w-32 h-32 gradient-accent mx-auto rounded-full flex items-center justify-center text-white text-5xl shadow-xl animate-bounce">
          <i className="fas fa-flag-checkered"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Hoàn thành bài thi!</h2>
        <div className="glass-card p-8 rounded-3xl max-w-sm mx-auto shadow-lg">
          <p className="text-gray-500 mb-2">Số điểm của Bé là:</p>
          <p className="text-6xl font-black text-blue-600 mb-4">{score}</p>
          <p className="text-sm text-gray-400">Trên tổng số {totalPossible} điểm</p>
          
          <div className="mt-8 grid grid-cols-5 gap-2">
            {SAMPLE_PROBLEMS.map((_, i) => (
              <div 
                key={i} 
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${
                  answers[i] === SAMPLE_PROBLEMS[i].correctIndex ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-red-100 text-red-600 border border-red-200'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        <button 
          onClick={() => onNavigate(AppScreen.HOME)}
          className="px-10 py-4 gradient-primary text-white rounded-2xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          Trở về Trang chủ
        </button>
      </div>
    );
  }

  const problem = SAMPLE_PROBLEMS[currentIdx];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between sticky top-[4rem] bg-gray-50/95 py-3 z-40">
        <div className="flex items-center space-x-4">
          <span className={`px-4 py-2 rounded-xl font-bold ${timeLeft < 60 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-white text-gray-700 border border-gray-200'}`}>
            <i className="fas fa-clock mr-2"></i>
            {formatTime(timeLeft)}
          </span>
        </div>
        <button 
          onClick={handleSubmit}
          className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-md"
        >
          Nộp bài
        </button>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {SAMPLE_PROBLEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`w-10 h-10 rounded-xl font-bold transition-all border ${
                currentIdx === i 
                  ? 'gradient-primary text-white border-transparent' 
                  : (answers[i] !== -1 ? 'bg-blue-50 text-blue-500 border-blue-200' : 'bg-white text-gray-400 border-gray-100')
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{problem.question}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problem.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`p-4 rounded-2xl text-left transition-all border-2 text-lg font-medium ${
                answers[currentIdx] === idx 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-100 bg-white hover:border-blue-200 text-gray-700'
              }`}
            >
              <span className="inline-block w-8 h-8 rounded-full bg-gray-100 mr-3 text-center leading-8 text-sm font-bold text-gray-500">
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <button 
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
            className="px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-500 disabled:opacity-30"
          >
            Quay lại
          </button>
          <button 
            disabled={currentIdx === SAMPLE_PROBLEMS.length - 1}
            onClick={() => setCurrentIdx(currentIdx + 1)}
            className="px-6 py-3 rounded-xl gradient-primary text-white font-bold shadow-md disabled:opacity-30"
          >
            Câu tiếp
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockTestScreen;
