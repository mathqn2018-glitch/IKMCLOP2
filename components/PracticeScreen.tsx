
import React, { useState, useEffect } from 'react';
import { SAMPLE_PROBLEMS } from '../constants';
import { Problem, AppScreen } from '../types';
import { generateExplanation } from '../geminiService';

interface PracticeScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onAddPoints: (points: number, problemId: string) => void;
}

const PracticeScreen: React.FC<PracticeScreenProps> = ({ onNavigate, onAddPoints }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const problem = SAMPLE_PROBLEMS[currentIdx];

  const handleCheck = async () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === problem.correctIndex;
    setIsCorrect(correct);
    
    if (correct) {
      onAddPoints(problem.points, problem.id);
      // Trigger confetti
      (window as any).confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Call AI for personalized explanation
    setIsLoadingAI(true);
    try {
      const exp = await generateExplanation(problem, problem.options[selectedOption]);
      setExplanation(exp || '');
    } catch (e) {
      setExplanation(problem.explanation || 'Đã có lỗi xảy ra khi gọi AI, nhưng bạn đã làm rất tốt!');
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleNext = () => {
    if (currentIdx < SAMPLE_PROBLEMS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setExplanation('');
    } else {
      onNavigate(AppScreen.HOME);
    }
  };

  useEffect(() => {
    // Fix: Access MathJax via (window as any)
    if ((window as any).MathJax) {
      (window as any).MathJax.typesetPromise();
    }
  }, [problem, explanation]);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => onNavigate(AppScreen.HOME)}
          className="text-gray-500 hover:text-blue-600 flex items-center space-x-2"
        >
          <i className="fas fa-arrow-left"></i>
          <span>Quay lại</span>
        </button>
        <span className="text-sm font-medium text-gray-500">Câu hỏi {currentIdx + 1}/{SAMPLE_PROBLEMS.length}</span>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
          {problem.category}
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed" id="question-text">
          {problem.question}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problem.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => isCorrect === null && setSelectedOption(idx)}
              className={`p-4 rounded-2xl text-left transition-all border-2 text-lg font-medium ${
                selectedOption === idx 
                  ? (isCorrect === null ? 'border-blue-500 bg-blue-50 text-blue-700' : (isCorrect && idx === problem.correctIndex ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700'))
                  : 'border-gray-100 bg-white hover:border-blue-200 text-gray-700'
              } ${isCorrect !== null && idx === problem.correctIndex && 'border-green-500 bg-green-50 text-green-700'}`}
              disabled={isCorrect !== null}
            >
              <span className="inline-block w-8 h-8 rounded-full bg-gray-100 mr-3 text-center leading-8 text-sm font-bold text-gray-500">
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
            </button>
          ))}
        </div>

        {isCorrect === null ? (
          <button
            onClick={handleCheck}
            disabled={selectedOption === null}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${
              selectedOption !== null ? 'gradient-primary hover:scale-[1.02] active:scale-95' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Kiểm tra đáp án
          </button>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className={`p-6 rounded-2xl ${isCorrect ? 'bg-green-100 border border-green-200' : 'bg-orange-100 border border-orange-200'}`}>
              <h4 className="font-bold flex items-center mb-2">
                {isCorrect ? (
                  <><i className="fas fa-check-circle text-green-500 mr-2 text-xl"></i> Chính xác! Tuyệt quá!</>
                ) : (
                  <><i className="fas fa-exclamation-circle text-orange-500 mr-2 text-xl"></i> Chưa đúng rồi bé ơi!</>
                )}
              </h4>
              
              {isLoadingAI ? (
                <div className="flex items-center space-x-3 text-gray-500 italic py-2">
                  <i className="fas fa-circle-notch fa-spin"></i>
                  <span>Bạn Gia sư AI đang viết lời giải...</span>
                </div>
              ) : (
                <div className="text-gray-700 leading-relaxed text-sm md:text-base prose prose-blue" 
                     dangerouslySetInnerHTML={{ __html: (window as any).marked.parse(explanation) }}>
                </div>
              )}
            </div>

            <button
              onClick={handleNext}
              className="w-full py-4 rounded-2xl font-bold text-white gradient-accent shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
            >
              {currentIdx < SAMPLE_PROBLEMS.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành bài tập'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeScreen;
