
import React from 'react';
import { AppScreen, UserProgress } from '../types';

interface HeaderProps {
  onNavigate: (screen: AppScreen) => void;
  currentScreen: AppScreen;
  progress: UserProgress;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentScreen, progress }) => {
  return (
    <header className="gradient-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-4xl">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => onNavigate(AppScreen.HOME)}
        >
          <div className="bg-white p-1.5 rounded-xl shadow-sm">
            <i className="fas fa-rocket text-blue-500 text-xl"></i>
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline">Kangaroo Math</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-white/20 px-3 py-1 rounded-full flex items-center space-x-2 border border-white/30">
            <i className="fas fa-star text-yellow-300"></i>
            <span className="font-bold">{progress.totalPoints}</span>
          </div>
          
          <div className="bg-white/20 px-3 py-1 rounded-full flex items-center space-x-2 border border-white/30 hidden xs:flex">
            <i className="fas fa-trophy text-orange-300"></i>
            <span className="font-bold">Lv.{progress.level}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
