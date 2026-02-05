
import React from 'react';
import { AppScreen, UserProgress } from '../types';

interface HomeScreenProps {
  onNavigate: (screen: AppScreen) => void;
  progress: UserProgress;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, progress }) => {
  return (
    <div className="space-y-8 py-4 animate-in fade-in duration-500">
      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Chào mừng Bé tới với Thế giới Toán học! 🦒</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Cùng chú chuột túi Kangaroo khám phá những bài toán thú vị và rèn luyện tư duy logic mỗi ngày nhé.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Practice Card */}
        <button 
          onClick={() => onNavigate(AppScreen.PRACTICE)}
          className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all group text-left border-2 border-transparent hover:border-blue-400"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-white text-3xl shadow-blue-200 shadow-lg group-hover:scale-110 transition-transform">
              <i className="fas fa-pencil-alt"></i>
            </div>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Luyện tập</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Kho bài tập IKMC</h3>
          <p className="text-gray-500 text-sm">Hàng trăm câu hỏi chuẩn cấu trúc Kangaroo dành cho lớp 2.</p>
        </button>

        {/* Mock Test Card */}
        <button 
          onClick={() => onNavigate(AppScreen.MOCK_TEST)}
          className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all group text-left border-2 border-transparent hover:border-orange-400"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center text-white text-3xl shadow-orange-200 shadow-lg group-hover:scale-110 transition-transform">
              <i className="fas fa-stopwatch"></i>
            </div>
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Thử thách</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Thi đấu tính giờ</h3>
          <p className="text-gray-500 text-sm">Thử sức với đề thi chính thức dưới áp lực thời gian.</p>
        </button>

        {/* AI Chat Card */}
        <button 
          // Fix: Use correct enum member AI_CHAT
          onClick={() => onNavigate(AppScreen.AI_CHAT)}
          className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all group text-left border-2 border-transparent hover:border-purple-400"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-purple-200 shadow-lg group-hover:scale-110 transition-transform">
              <i className="fas fa-robot"></i>
            </div>
            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase">AI Gia sư</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Hỏi đáp cùng AI</h3>
          <p className="text-gray-500 text-sm">Bé có chỗ nào không hiểu? Hãy hỏi bạn AI ngay nhé!</p>
        </button>

        {/* Achievement Card */}
        <div className="glass-card p-6 rounded-2xl shadow-sm flex flex-col justify-center">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <i className="fas fa-chart-line text-blue-500 mr-2"></i>
            Tiến độ của Bé
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Điểm kinh nghiệm</span>
                <span className="font-bold">{progress.totalPoints} / {(progress.level * 50)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="gradient-primary h-full transition-all duration-1000" 
                  style={{ width: `${(progress.totalPoints % 50) / 50 * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-around py-2 border-t mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{progress.completedProblems.length}</p>
                <p className="text-xs text-gray-500">Bài đã giải</p>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{progress.streak} ngày</p>
                <p className="text-xs text-gray-500">Chuỗi học tập</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
