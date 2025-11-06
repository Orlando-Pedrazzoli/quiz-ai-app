# 🏗️ Arquitetura do Projeto - Quiz AI

## 📁 Estrutura de Arquivos

```
quiz-ai-app/
│
├── 📂 app/                          # Next.js App Router
│   ├── 📂 api/                      # API Routes
│   │   ├── 📂 generate-quiz/        
│   │   │   └── route.ts             # POST - Gera quiz com IA
│   │   └── 📂 upload/               
│   │       └── route.ts             # POST - Processa upload PDF
│   │
│   ├── globals.css                  # Estilos globais + Tailwind
│   ├── layout.tsx                   # Layout raiz (HTML/Body)
│   └── page.tsx                     # Página principal (/)
│
├── 📂 components/                   # Componentes React
│   └── 📂 ui/
│       ├── FileUpload.tsx           # Upload de PDF com drag&drop
│       ├── TextInput.tsx            # Textarea para texto manual
│       ├── Loading.tsx              # Spinner de carregamento
│       ├── QuizQuestion.tsx         # Componente de questão
│       └── QuizResults.tsx          # Tela de resultados
│
├── 📂 lib/                          # Utilitários e helpers
│   ├── groq.ts                      # Integração Groq API
│   └── pdf-utils.ts                 # Funções para processar PDF
│
├── 📂 types/                        # TypeScript types
│   └── index.ts                     # Interfaces: Quiz, Question, etc
│
├── 📂 public/                       # Assets estáticos (criar se necessário)
│   └── (favicon, images, etc)
│
├── .env                             # Variáveis de ambiente (CRIAR)
├── .env.example                     # Exemplo de variáveis
├── .gitignore                       # Arquivos ignorados pelo Git
├── next.config.js                   # Configuração Next.js
├── package.json                     # Dependências
├── postcss.config.js                # Config PostCSS
├── tailwind.config.js               # Config Tailwind CSS
├── tsconfig.json                    # Config TypeScript
│
└── 📄 Documentação
    ├── README.md                    # Documentação principal
    ├── INSTALACAO.md                # Guia de instalação
    └── MELHORIAS_FUTURAS.md         # Roadmap de features
```

---

## 🔄 Fluxo de Dados

### 1️⃣ Upload e Processamento

```
┌─────────────┐
│   USUÁRIO   │
└──────┬──────┘
       │
       ├─ Upload PDF
       │  ↓
       │  ┌──────────────────┐
       │  │  FileUpload.tsx  │
       │  └────────┬─────────┘
       │           │
       │           │ FormData
       │           ↓
       │  ┌──────────────────┐
       │  │  /api/upload     │
       │  │  (route.ts)      │
       │  └────────┬─────────┘
       │           │
       │           │ pdf-parse
       │           ↓
       │       [Texto extraído]
       │
       └─ Colar Texto
          ↓
          ┌──────────────────┐
          │  TextInput.tsx   │
          └──────────────────┘
```

### 2️⃣ Geração do Quiz

```
┌─────────────────┐
│  Texto Extraído │
└────────┬────────┘
         │
         │ POST /api/generate-quiz
         ↓
┌─────────────────────────┐
│  generateQuizFromText() │
│  (lib/groq.ts)          │
└────────┬────────────────┘
         │
         │ Groq API Call
         │ (Llama 3.1)
         ↓
┌─────────────────────────┐
│  Prompt Engineering:    │
│  - Analisa conteúdo     │
│  - Cria X questões      │
│  - 4 opções cada        │
│  - Resposta correta     │
│  - Explicação           │
└────────┬────────────────┘
         │
         │ JSON Response
         ↓
┌─────────────────────────┐
│  Quiz Object:           │
│  {                      │
│    id: string,          │
│    questions: [{        │
│      question: string,  │
│      options: [],       │
│      correctAnswer: 0,  │
│      explanation: ""    │
│    }]                   │
│  }                      │
└─────────────────────────┘
```

### 3️⃣ Apresentação do Quiz

```
┌──────────┐
│ Quiz Obj │
└─────┬────┘
      │
      │ State Management
      ↓
┌──────────────────────┐
│    page.tsx          │
│  (State principal)   │
└──────┬───────────────┘
       │
       ├── currentQuestion: number
       ├── userAnswers: number[]
       ├── step: 'quiz' | 'results'
       │
       │ Render
       ↓
┌──────────────────────┐
│  QuizQuestion.tsx    │
│  - Mostra questão    │
│  - Progress bar      │
│  - 4 opções          │
│  - Botão Próxima     │
└──────────────────────┘
```

### 4️⃣ Resultados e Review

```
┌─────────────────┐
│  userAnswers[]  │
└────────┬────────┘
         │
         │ Comparação
         │ answers vs correctAnswers
         ↓
┌──────────────────────┐
│  Cálculo de Score    │
│  - Corretas          │
│  - Incorretas        │
│  - Percentual        │
└────────┬─────────────┘
         │
         │ Render
         ↓
┌──────────────────────┐
│  QuizResults.tsx     │
│  - Score visual      │
│  - Estatísticas      │
│  - Botões ação       │
└────────┬─────────────┘
         │
         │ Review Mode
         ↓
┌──────────────────────┐
│  QuizQuestion.tsx    │
│  (modo review)       │
│  - Mostra resposta   │
│  - Explicação IA     │
│  - Verde/Vermelho    │
└──────────────────────┘
```

---

## 🧩 Componentes Principais

### 📄 page.tsx (Main App)
**Responsabilidades:**
- Gerenciar estado global do app
- Controlar fluxo entre steps
- Comunicação com APIs

**Estados:**
```typescript
step: 'upload' | 'generating' | 'quiz' | 'results' | 'review'
inputMode: 'file' | 'text'
quiz: Quiz | null
currentQuestion: number
userAnswers: number[]
```

---

### 📤 FileUpload.tsx
**Props:**
- `onTextExtracted: (text, fileName) => void`
- `onError: (error) => void`

**Features:**
- Drag & drop
- Validação (tamanho, tipo)
- Loading state
- Preview do arquivo

---

### ❓ QuizQuestion.tsx
**Props:**
- `question: Question`
- `questionNumber: number`
- `onAnswer: (index) => void`
- `showResult?: boolean`
- `userAnswer?: number`

**Modos:**
1. **Quiz Mode:** Interativo, selecionar resposta
2. **Review Mode:** Mostra correto/incorreto + explicação

---

### 📊 QuizResults.tsx
**Props:**
- `quiz: Quiz`
- `userAnswers: number[]`
- `onRestart: () => void`
- `onReview: () => void`

**Exibe:**
- Score circular
- Estatísticas
- Botões de ação

---

## 🔌 APIs

### POST /api/upload
**Input:**
```typescript
FormData {
  file: File (PDF)
}
```

**Output:**
```typescript
{
  text: string,
  fileName: string,
  fileSize: number
}
```

**Processo:**
1. Valida arquivo
2. Converte para Buffer
3. Usa pdf-parse
4. Retorna texto

---

### POST /api/generate-quiz
**Input:**
```typescript
{
  text: string,
  numberOfQuestions: number
}
```

**Output:**
```typescript
{
  id: string,
  title: string,
  questions: Question[],
  createdAt: string
}
```

**Processo:**
1. Valida texto
2. Chama Groq API
3. Parse JSON response
4. Adiciona IDs únicos
5. Retorna quiz formatado

---

## 🎨 Styling Strategy

### Tailwind CSS Classes Principais

**Cores:**
```css
primary: #3B82F6 (azul)
success: #10B981 (verde)
error: #EF4444 (vermelho)
warning: #F59E0B (laranja)
```

**Componentes reutilizáveis:**
- Buttons: `px-6 py-3 rounded-lg font-semibold`
- Cards: `bg-white rounded-lg shadow-lg p-8`
- Inputs: `border-2 border-gray-300 focus:border-primary`

---

## 🔐 Segurança

### Validações Implementadas

**PDF Upload:**
- ✅ Tipo de arquivo (apenas PDF)
- ✅ Tamanho máximo (10MB)
- ✅ Sanitização de buffer

**Texto:**
- ✅ Tamanho mínimo (100 chars)
- ✅ Tamanho máximo (50k chars)
- ✅ Validação de conteúdo

**API:**
- ✅ API Key não exposta no cliente
- ✅ Rate limiting (via Groq)
- ✅ Error handling robusto

---

## 📊 Performance

### Otimizações Aplicadas

**Frontend:**
- ✅ Client components apenas onde necessário
- ✅ Lazy loading de componentes pesados
- ✅ Memoização de componentes
- ✅ CSS otimizado com Tailwind

**Backend:**
- ✅ Streaming de arquivos
- ✅ Buffer eficiente para PDFs
- ✅ Timeout de 30s nas APIs

**IA:**
- ✅ Groq API (ultra-rápida)
- ✅ Tokens otimizados
- ✅ Prompt eficiente

---

## 🧪 Testing Strategy (Futuro)

### Tipos de Testes Recomendados

**Unit Tests:**
- `lib/pdf-utils.ts` - validações
- `lib/groq.ts` - parsing
- Componentes isolados

**Integration Tests:**
- API routes
- Upload + Geração de quiz
- Fluxo completo

**E2E Tests:**
- Upload PDF → Quiz → Resultados
- Texto → Quiz → Review
- Casos de erro

---

## 🚀 Deploy

### Recomendações

**Plataforma:** Vercel (recomendado)
- Deploy automático do Git
- HTTPS gratuito
- Edge Functions
- Analytics grátis

**Variáveis de Ambiente:**
```env
GROQ_API_KEY=xxx
```

**Build Command:**
```bash
npm run build
```

**Start Command:**
```bash
npm start
```

---

## 📈 Métricas de Sucesso

### KPIs Importantes

**Técnicos:**
- Tempo de geração < 15s
- Taxa de erro < 5%
- Uptime > 99%

**Usuário:**
- Taxa de conclusão > 70%
- Satisfação com questões > 4/5
- Tempo médio por quiz

---

## 🔄 Próximos Passos

1. **Adicionar banco de dados** (MongoDB)
2. **Sistema de autenticação** (NextAuth)
3. **Dashboard de histórico**
4. **Melhorias de UI/UX**
5. **Testes automatizados**

---

**Documentação criada para facilitar:**
- ✅ Onboarding de novos desenvolvedores
- ✅ Manutenção do código
- ✅ Evolução do projeto
- ✅ Debug de problemas

**Mantenha sempre atualizada! 📝**
