import Groq from 'groq-sdk';

// Lista de modelos disponíveis para fallback
const AVAILABLE_MODELS = [
  'llama-3.1-70b-versatile',  // Modelo principal
  'mixtral-8x7b-32768',        // Fallback 1
  'llama3-70b-8192',           // Fallback 2
  'gemma2-9b-it',              // Fallback 3
];

// Inicializa o cliente Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

async function tryGenerateWithModel(
  text: string, 
  numberOfQuestions: number, 
  modelName: string
): Promise<any> {
  console.log(`🤖 Tentando gerar com modelo: ${modelName}`);
  
  const maxTextLength = 3500; // Reduzido para evitar limite de tokens
  const processedText = text.length > maxTextLength 
    ? text.substring(0, maxTextLength) + '...' 
    : text;

  const prompt = `Você é um especialista em criar quizzes educacionais.

TAREFA: Gere exatamente ${numberOfQuestions} questões de múltipla escolha baseadas no conteúdo fornecido.

CONTEÚDO:
${processedText}

REGRAS IMPORTANTES:
1. Cada questão deve ter exatamente 4 opções (A, B, C, D)
2. Apenas UMA resposta está correta
3. Use português brasileiro
4. Forneça explicação para cada resposta

FORMATO OBRIGATÓRIO (JSON válido):
{
  "questions": [
    {
      "question": "texto da pergunta aqui",
      "options": ["opção A", "opção B", "opção C", "opção D"],
      "correctAnswer": 0,
      "explanation": "explicação da resposta correta"
    }
  ]
}

Responda APENAS com o JSON, sem texto adicional.`;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a quiz generator. Always respond with valid JSON only.'
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: modelName,
    temperature: 0.6, // Reduzido para respostas mais consistentes
    max_tokens: 3000, // Reduzido para evitar cortes
    response_format: { type: "json_object" },
  });

  const response = chatCompletion.choices[0]?.message?.content || '';
  
  if (!response) {
    throw new Error('Resposta vazia do modelo ' + modelName);
  }

  // Limpeza agressiva da resposta
  let cleanedResponse = response
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/gi, '')
    .replace(/^[^{]*/, '') // Remove tudo antes do primeiro {
    .replace(/[^}]*$/, '') // Remove tudo depois do último }
    .trim();

  // Tenta encontrar um JSON válido
  const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    cleanedResponse = jsonMatch[0];
  }

  const quizData = JSON.parse(cleanedResponse);

  // Validação básica
  if (!quizData.questions || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {
    throw new Error('Formato inválido: sem questões');
  }

  return quizData;
}

export async function generateQuizFromText(
  text: string,
  numberOfQuestions: number = 10
): Promise<any> {
  // Verifica API key primeiro
  if (!process.env.GROQ_API_KEY) {
    console.error('❌ GROQ_API_KEY não configurada!');
    throw new Error(
      'API Key não configurada. Configure GROQ_API_KEY no arquivo .env.local'
    );
  }

  console.log('🚀 Iniciando geração de quiz...');
  console.log(`📊 Configuração: ${numberOfQuestions} questões`);

  // Tenta com cada modelo até um funcionar
  for (let i = 0; i < AVAILABLE_MODELS.length; i++) {
    const model = AVAILABLE_MODELS[i];
    
    try {
      const result = await tryGenerateWithModel(text, numberOfQuestions, model);
      
      // Validação adicional
      if (result.questions.length < numberOfQuestions) {
        console.warn(`⚠️ Modelo ${model} gerou apenas ${result.questions.length} questões`);
        if (i < AVAILABLE_MODELS.length - 1) {
          console.log('Tentando próximo modelo...');
          continue;
        }
      }

      // Garante que todas as questões tenham estrutura correta
      result.questions = result.questions.slice(0, numberOfQuestions).map((q: any, idx: number) => ({
        question: q.question || `Questão ${idx + 1}`,
        options: q.options || ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
        correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
        explanation: q.explanation || 'Explicação não disponível'
      }));

      console.log(`✅ Quiz gerado com sucesso usando ${model}`);
      return result;
      
    } catch (error: any) {
      console.error(`❌ Erro com modelo ${model}:`, error.message);
      
      // Se é o último modelo, lança o erro
      if (i === AVAILABLE_MODELS.length - 1) {
        throw new Error(
          `Não foi possível gerar o quiz após tentar ${AVAILABLE_MODELS.length} modelos diferentes. ` +
          `Último erro: ${error.message}`
        );
      }
      
      // Senão, tenta o próximo modelo
      console.log(`🔄 Tentando próximo modelo...`);
      
      // Aguarda um pouco antes de tentar novamente (rate limiting)
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Fallback final - gera questões de exemplo
  console.warn('⚠️ Usando fallback com questões de exemplo');
  return {
    questions: Array.from({ length: numberOfQuestions }, (_, i) => ({
      question: `Questão ${i + 1} sobre o conteúdo fornecido`,
      options: [
        'Primeira opção',
        'Segunda opção',
        'Terceira opção',
        'Quarta opção'
      ],
      correctAnswer: Math.floor(Math.random() * 4),
      explanation: 'Questão gerada como exemplo devido a erro na API.'
    }))
  };
}

// Função auxiliar para testar a conexão
export async function testGroqConnection(): Promise<boolean> {
  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: 'teste' }],
      model: AVAILABLE_MODELS[0],
      max_tokens: 5,
    });
    
    return !!response.choices[0]?.message?.content;
  } catch (error) {
    console.error('Erro ao testar conexão:', error);
    return false;
  }
}

export { groq };