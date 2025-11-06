export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  createdAt: string;
}

export interface QuizResult {
  quizId: string;
  answers: number[];
  score: number;
  totalQuestions: number;
}

export interface QuizConfig {
  numberOfQuestions: number;
  questionType: 'multiple-choice' | 'true-false' | 'mixed';
}