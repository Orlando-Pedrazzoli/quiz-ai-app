'use client';

import React from 'react';
import { Quiz } from '@/types';
import { FiCheckCircle, FiXCircle, FiRotateCcw, FiHome } from 'react-icons/fi';

interface QuizResultsProps {
  quiz: Quiz;
  userAnswers: number[];
  onRestart: () => void;
  onReview: () => void;
}

export default function QuizResults({
  quiz,
  userAnswers,
  onRestart,
  onReview,
}: QuizResultsProps) {
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === quiz.questions[index].correctAnswer
  ).length;

  const totalQuestions = quiz.questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { text: '🎉 Excelente!', color: 'text-green-600' };
    if (percentage >= 70) return { text: '👏 Muito Bom!', color: 'text-blue-600' };
    if (percentage >= 50) return { text: '👍 Bom!', color: 'text-yellow-600' };
    return { text: '💪 Continue Estudando!', color: 'text-red-600' };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="w-full max-w-3xl mx-auto animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl p-8">
        {/* Score Principal */}
        <div className="text-center mb-8">
          <h2 className={`text-4xl font-bold mb-4 ${performance.color}`}>
            {performance.text}
          </h2>
          <div className="relative inline-block">
            <svg className="w-48 h-48">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="12"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke={percentage >= 70 ? '#10B981' : percentage >= 50 ? '#F59E0B' : '#EF4444'}
                strokeWidth="12"
                strokeDasharray={`${(percentage / 100) * 553} 553`}
                strokeLinecap="round"
                transform="rotate(-90 96 96)"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-5xl font-bold text-gray-800">{percentage}%</div>
              <div className="text-sm text-gray-600 mt-1">
                {correctAnswers}/{totalQuestions}
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <FiCheckCircle className="text-3xl text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{correctAnswers}</div>
            <div className="text-sm text-gray-600">Corretas</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <FiXCircle className="text-3xl text-error mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">
              {totalQuestions - correctAnswers}
            </div>
            <div className="text-sm text-gray-600">Incorretas</div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="space-y-3">
          <button
            onClick={onReview}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
          >
            <span>📝 Revisar Respostas</span>
          </button>
          <button
            onClick={onRestart}
            className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
          >
            <FiRotateCcw />
            <span>Refazer Quiz</span>
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <FiHome />
            <span>Criar Novo Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
}
