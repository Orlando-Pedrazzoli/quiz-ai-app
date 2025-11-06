import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateQuizFromText(
  text: string,
  numberOfQuestions: number = 10
): Promise<any> {
  try {
    const prompt = `Você é um assistente especializado em criar quizzes educacionais de alta qualidade.

Baseado no seguinte conteúdo, crie ${numberOfQuestions} questões de múltipla escolha em PORTUGUÊS:

CONTEÚDO:
${text}

INSTRUÇÕES:
1. Crie questões que testem a compreensão real do conteúdo
2. Cada questão deve ter 4 opções de resposta (A, B, C, D)
3. Apenas UMA resposta está correta
4. As opções incorretas devem ser plausíveis, não óbvias
5. Forneça uma explicação clara de por que a resposta está correta

FORMATO DE RESPOSTA (JSON):
{
  "questions": [
    {
      "question": "Pergunta aqui?",
      "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
      "correctAnswer": 0,
      "explanation": "Explicação detalhada da resposta correta"
    }
  ]
}

IMPORTANTE: Responda APENAS com o JSON, sem texto adicional antes ou depois.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.1-70b-versatile',
      temperature: 0.7,
      max_tokens: 4000,
    });

    const response = chatCompletion.choices[0]?.message?.content || '';
    
    // Remove possíveis markdown code blocks
    const cleanedResponse = response
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const quizData = JSON.parse(cleanedResponse);
    
    return quizData;
  } catch (error) {
    console.error('Erro ao gerar quiz:', error);
    throw new Error('Falha ao gerar quiz com IA');
  }
}

export { groq };
