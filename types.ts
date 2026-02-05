
export interface Problem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  points: number;
  explanation?: string;
  category: 'logic' | 'arithmetic' | 'geometry' | 'patterns';
}

export interface UserProgress {
  totalPoints: number;
  completedProblems: string[];
  level: number;
  streak: number;
}

export enum AppScreen {
  HOME = 'HOME',
  PRACTICE = 'PRACTICE',
  MOCK_TEST = 'MOCK_TEST',
  AI_CHAT = 'AI_CHAT',
  LEADERBOARD = 'LEADERBOARD'
}
