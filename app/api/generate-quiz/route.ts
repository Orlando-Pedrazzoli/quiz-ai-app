import { NextRequest, NextResponse } from 'next/server';
import { generateQuizFromText } from '@/lib/groq';
import { validateText } from '@/lib/pdf-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, numberOfQuestions = 10 } = body;

    if (!text) {
      return NextResponse.json(
        { error: 'Texto é obrigatório' },
        { status: 400 }
      );
    }

    // Valida o texto
    try {
      validateText(text);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro na validação';
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    // Gera o quiz usando IA
    const quizData = await generateQuizFromText(text, numberOfQuestions);

    // Adiciona IDs únicos às questões
    const questionsWithIds = quizData.questions.map((q: any, index: number) => ({
      ...q,
      id: `q_${Date.now()}_${index}`,
    }));

    const quiz = {
      id: `quiz_${Date.now()}`,
      title: 'Quiz Gerado por IA',
      questions: questionsWithIds,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(quiz);
  } catch (err: unknown) {
    console.error('Erro na API:', err);
    const errorMessage = err instanceof Error ? err.message : 'Erro ao gerar quiz';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}