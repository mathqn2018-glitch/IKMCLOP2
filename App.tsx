
import React, { useState, useEffect } from 'react';
import { AppScreen, UserProgress, Problem } from './types';
import { SAMPLE_PROBLEMS } from './constants';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import PracticeScreen from './components/PracticeScreen';
import MockTestScreen from './components/MockTestScreen';
import AIChatScreen from './components/AIChatScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.HOME);
  // API key is handled via process.env.API_KEY as per guidelines
  const [progress, setProgress] = useState<UserProgress>({
    totalPoints: Number(localStorage.getItem('user_points')) || 0,
    completedProblems: JSON.parse(localStorage.getItem('completed_problems') || '[]'),
    level: Number(localStorage.getItem('user_level')) || 1,
    streak: Number(localStorage.getItem('user_streak')) || 0,
  });

  useEffect(() => {
    localStorage.setItem('user_points', progress.totalPoints.toString());
    localStorage.setItem('completed_problems', JSON.stringify(progress.completedProblems));
    localStorage.setItem('user_level', progress.level.toString());
    localStorage.setItem('user_streak', progress.streak.toString());
  }, [progress]);

  const addPoints = (points: number, problemId: string) => {
    if (!progress.completedProblems.includes(problemId)) {
      setProgress(prev => ({
        ...prev,
        totalPoints: prev.totalPoints + points,
        completedProblems: [...prev.completedProblems, problemId],
        level: Math.floor((prev.totalPoints + points) / 50) + 1
      }));
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.HOME:
        return <HomeScreen onNavigate={setCurrentScreen} progress={progress} />;
      case AppScreen.PRACTICE:
        return <PracticeScreen onNavigate={setCurrentScreen} onAddPoints={addPoints} />;
      case AppScreen.MOCK_TEST:
        return <MockTestScreen onNavigate={setCurrentScreen} />;
      // Fix: Use correct enum member AI_CHAT
      case AppScreen.AI_CHAT:
        return <AIChatScreen onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} progress={progress} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onNavigate={setCurrentScreen} 
        currentScreen={currentScreen} 
        progress={progress}
      />
      
      <main className="flex-grow container mx-auto px-4 py-6 max-w-4xl">
        {renderScreen()}
      </main>

      {/* Footer mini-game bar or status */}
      <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm space-y-1">
        <p className="font-medium text-gray-700">Nội dung được phát triển bởi <span className="text-blue-600">PHAN THỊ NGỌC THÁI</span></p>
        <p>Liên hệ: <a href="mailto:mathqn2018@gmail.com" className="text-blue-500 hover:underline">mathqn2018@gmail.com</a></p>
        <p>© 2024 Kangaroo Math Explorer - Chúc bé học tốt! 🚀</p>
      </footer>
    </div>
  );
};

export default App;
