'use client';

import React, { useState } from 'react';
import FileUpload from '@/components/ui/FileUpload';
import TextInput from '@/components/ui/TextInput';
import Loading from '@/components/ui/Loading';
import QuizQuestion from '@/components/ui/QuizQuestion';
import QuizResults from '@/components/ui/QuizResults';
import { Quiz } from '@/types';
import { FiBookOpen, FiUpload, FiType } from 'react-icons/fi';

type Step = 'upload' | 'generating' | 'quiz' | 'results' | 'review';
type InputMode = 'file' | 'text';

export default function Home() {
  const [step, setStep] = useState<Step>('upload');
  const [inputMode, setInputMode] = useState<InputMode>('file');
  const [textContent, setTextContent] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [fileName, setFileName] = useState('');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const handleTextExtracted = (text: string, name: string) => {
    setExtractedText(text);
    setFileName(name);
    setError('');
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleGenerateQuiz = async () => {
    const text = inputMode === 'file' ? extractedText : textContent;

    if (!text || text.length < 100) {
      setError('Texto muito curto. Mínimo de 100 caracteres.');
      return;
    }

    setStep('generating');
    setError('');

    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          numberOfQuestions,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao gerar quiz');
      }

      const quizData = await response.json();
      setQuiz(quizData);
      setUserAnswers(new Array(quizData.questions.length).fill(-1));
      setStep('quiz');
    } catch (error: any) {
      setError(error.message);
      setStep('upload');
    }
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep('results');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setStep('upload');
    setInputMode('file');
    setTextContent('');
    setExtractedText('');
    setFileName('');
    setQuiz(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setError('');
  };

  const handleReview = () => {
    setStep('review');
    setCurrentQuestion(0);
  };

  const canProceed = () => {
    if (inputMode === 'file') {
      return extractedText.length >= 100;
    }
    return textContent.length >= 100;
  };

  // UPLOAD STEP
  if (step === 'upload') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <FiBookOpen className="text-6xl text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Quiz AI
            </h1>
            <p className="text-xl text-gray-600">
              Transforme seus materiais de estudo em quizzes interativos com IA
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
              <button
                onClick={() => setInputMode('file')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-md font-semibold transition-colors ${
                  inputMode === 'file'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiUpload />
                <span>Upload PDF</span>
              </button>
              <button
                onClick={() => setInputMode('text')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-md font-semibold transition-colors ${
                  inputMode === 'text'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiType />
                <span>Colar Texto</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
            {inputMode === 'file' ? (
              <FileUpload
                onTextExtracted={handleTextExtracted}
                onError={handleError}
              />
            ) : (
              <TextInput
                value={textContent}
                onChange={setTextContent}
                placeholder="Cole seu texto de estudo aqui... (mínimo 100 caracteres)"
              />
            )}

            {/* Configurações */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Número de Questões:
              </label>
              <select
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                className="w-full md:w-auto px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
              >
                <option value={5}>5 questões</option>
                <option value={10}>10 questões</option>
                <option value={15}>15 questões</option>
                <option value={20}>20 questões</option>
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerateQuiz}
              disabled={!canProceed()}
              className={`w-full mt-6 py-4 px-6 rounded-lg font-bold text-lg transition-all ${
                canProceed()
                  ? 'bg-primary text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              🚀 Gerar Quiz com IA
            </button>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-600 text-sm">
            <p>Powered by Groq AI • Totalmente Gratuito</p>
          </div>
        </div>
      </main>
    );
  }

  // GENERATING STEP
  if (step === 'generating') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-xl p-12">
          <Loading message="Analisando conteúdo e gerando questões..." />
          <p className="text-center text-gray-600 mt-4">
            Isso pode levar alguns segundos...
          </p>
        </div>
      </main>
    );
  }

  // QUIZ STEP
  if (step === 'quiz' && quiz) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <QuizQuestion
          question={quiz.questions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={quiz.questions.length}
          onAnswer={handleAnswer}
        />

        {/* Navigation Buttons */}
        <div className="max-w-3xl mx-auto mt-6 flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentQuestion === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            ← Anterior
          </button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              disabled={userAnswers[currentQuestion] === -1}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                userAnswers[currentQuestion] === -1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              ✓ Finalizar
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              disabled={userAnswers[currentQuestion] === -1}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                userAnswers[currentQuestion] === -1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-blue-600'
              }`}
            >
              Próxima →
            </button>
          )}
        </div>
      </main>
    );
  }

  // RESULTS STEP
  if (step === 'results' && quiz) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <QuizResults
          quiz={quiz}
          userAnswers={userAnswers}
          onRestart={handleRestart}
          onReview={handleReview}
        />
      </main>
    );
  }

  // REVIEW STEP
  if (step === 'review' && quiz) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-3xl mx-auto mb-6">
          <button
            onClick={() => setStep('results')}
            className="text-primary hover:text-blue-600 font-semibold"
          >
            ← Voltar aos Resultados
          </button>
        </div>

        <QuizQuestion
          question={quiz.questions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={quiz.questions.length}
          onAnswer={() => {}}
          showResult={true}
          userAnswer={userAnswers[currentQuestion]}
        />

        {/* Navigation */}
        <div className="max-w-3xl mx-auto mt-6 flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentQuestion === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            ← Anterior
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={currentQuestion === quiz.questions.length - 1}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentQuestion === quiz.questions.length - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-blue-600'
            }`}
          >
            Próxima →
          </button>
        </div>
      </main>
    );
  }

  return null;
}
