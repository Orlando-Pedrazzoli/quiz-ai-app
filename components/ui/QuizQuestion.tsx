'use client';

import React, { useState } from 'react';
import { Question } from '@/types';

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answerIndex: number) => void;
  showResult?: boolean;
  userAnswer?: number;
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  showResult = false,
  userAnswer,
}: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(
    userAnswer !== undefined ? userAnswer : null
  );

  const handleOptionClick = (index: number) => {
    if (!showResult) {
      setSelectedOption(index);
      onAnswer(index);
    }
  };

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return selectedOption === index
        ? 'bg-primary text-white border-primary'
        : 'bg-white hover:bg-gray-50 border-gray-300';
    }

    // Modo resultado
    if (index === question.correctAnswer) {
      return 'bg-success text-white border-success';
    }

    if (index === userAnswer && userAnswer !== question.correctAnswer) {
      return 'bg-error text-white border-error';
    }

    return 'bg-white border-gray-300 opacity-50';
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fadeIn">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Questão {questionNumber} de {totalQuestions}</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Questão */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {question.question}
        </h2>

        {/* Opções */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={showResult}
              className={`w-full text-left p-4 border-2 rounded-lg transition-all ${getOptionStyle(
                index
              )} ${!showResult ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className="flex items-center">
                <span className="font-bold mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="flex-1">{option}</span>
                {showResult && index === question.correctAnswer && (
                  <span className="ml-2">✓</span>
                )}
                {showResult &&
                  index === userAnswer &&
                  userAnswer !== question.correctAnswer && (
                    <span className="ml-2">✗</span>
                  )}
              </div>
            </button>
          ))}
        </div>

        {/* Explicação (apenas no modo resultado) */}
        {showResult && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-2">📚 Explicação:</h3>
            <p className="text-gray-700">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
