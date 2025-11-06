# 🎯 Quiz AI - Gerador de Quiz com Inteligência Artificial

Aplicação web que transforma PDFs e textos em quizzes interativos usando Inteligência Artificial.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)

## ✨ Funcionalidades

- 📄 **Upload de PDFs** - Faça upload de materiais de estudo em PDF
- 📝 **Texto Direto** - Cole texto diretamente na plataforma
- 🤖 **IA Inteligente** - Gera questões contextuais e relevantes
- 🎨 **Interface Intuitiva** - Design limpo e fácil de usar
- ⚡ **Resultados Imediatos** - Feedback instantâneo com explicações
- 📊 **Análise de Desempenho** - Visualize seu progresso
- 🔄 **Revisão Completa** - Revise todas as respostas com explicações

## 🚀 Tecnologias

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **IA**: Groq API (Llama 3.1 - Gratuito)
- **PDF Processing**: pdf-parse
- **Upload**: react-dropzone
- **Icons**: react-icons

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta gratuita na Groq AI

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd quiz-ai-app
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure a API Key da Groq

**Passo a passo para obter a chave:**

1. Acesse: https://console.groq.com/
2. Crie uma conta gratuita
3. Vá em "API Keys"
4. Clique em "Create API Key"
5. Copie a chave gerada

**Configure no projeto:**

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env e adicione sua chave
GROQ_API_KEY=sua_chave_aqui
```

### 4. Execute o projeto

**Modo desenvolvimento:**
```bash
npm run dev
```

Acesse: http://localhost:3000

**Modo produção:**
```bash
npm run build
npm start
```

## 📱 Como Usar

### 1️⃣ **Upload de Material**
- Escolha entre **Upload PDF** ou **Colar Texto**
- Para PDF: arraste o arquivo ou clique para selecionar (máx. 10MB)
- Para texto: cole diretamente (mínimo 100 caracteres)

### 2️⃣ **Configure o Quiz**
- Selecione o número de questões (5, 10, 15 ou 20)
- Clique em "Gerar Quiz com IA"

### 3️⃣ **Responda as Questões**
- Leia cada questão com atenção
- Selecione uma das 4 opções
- Navegue entre questões com os botões

### 4️⃣ **Veja os Resultados**
- Visualize sua pontuação
- Revise as respostas
- Leia as explicações da IA

### 5️⃣ **Refaça ou Crie Novo**
- Refaça o mesmo quiz
- Ou crie um novo quiz com outro material

## 🎨 Estrutura do Projeto

```
quiz-ai-app/
├── app/
│   ├── api/
│   │   ├── generate-quiz/    # API para gerar quiz
│   │   └── upload/            # API para processar PDF
│   ├── globals.css            # Estilos globais
│   ├── layout.tsx             # Layout principal
│   └── page.tsx               # Página principal
├── components/
│   └── ui/
│       ├── FileUpload.tsx     # Componente de upload
│       ├── TextInput.tsx      # Input de texto
│       ├── Loading.tsx        # Loading spinner
│       ├── QuizQuestion.tsx   # Questão do quiz
│       └── QuizResults.tsx    # Tela de resultados
├── lib/
│   ├── groq.ts               # Integração Groq API
│   └── pdf-utils.ts          # Utilitários PDF
├── types/
│   └── index.ts              # Tipos TypeScript
├── .env.example              # Exemplo de variáveis
├── next.config.js            # Config Next.js
├── tailwind.config.js        # Config Tailwind
└── package.json              # Dependências
```

## 🔐 Variáveis de Ambiente

```env
GROQ_API_KEY=sua_chave_groq_aqui
```

## 📊 Limites e Configurações

| Item | Limite |
|------|--------|
| Tamanho do PDF | 10 MB |
| Caracteres (texto) | 100 - 50.000 |
| Questões por quiz | 5 - 20 |
| Tipo de arquivo | PDF apenas |

## 🌟 Próximas Funcionalidades (Roadmap)

- [ ] Sistema de login e autenticação
- [ ] Salvar histórico de quizzes
- [ ] Dashboard de progresso
- [ ] Questões de verdadeiro/falso
- [ ] Questões de preencher lacunas
- [ ] Modo escuro
- [ ] Compartilhar quizzes
- [ ] Export de resultados em PDF
- [ ] Suporte para mais formatos (DOCX, TXT)
- [ ] Categorização por matérias
- [ ] Timer opcional
- [ ] Modo multiplayer

## 🐛 Troubleshooting

### Erro: "GROQ_API_KEY is not defined"
- Verifique se o arquivo `.env` existe na raiz do projeto
- Confirme se a variável está corretamente definida
- Reinicie o servidor de desenvolvimento

### Erro ao processar PDF
- Verifique se o PDF não está corrompido
- Confirme se o PDF contém texto (não apenas imagens)
- Tente um PDF menor

### Questões não fazem sentido
- Verifique se o texto enviado tem conteúdo relevante
- Textos muito curtos geram questões ruins
- Recomendado: mínimo 500 palavras para melhores resultados

## 📝 Licença

MIT License - sinta-se livre para usar em seus projetos!

## 👨‍💻 Desenvolvedor

Desenvolvido por **Orlando Pedrazzoli**
- Portfolio: [orlandopedrazzoli.com](https://orlandopedrazzoli.com)
- GitHub: [@orlandopedrazzoli](https://github.com/orlandopedrazzoli)

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

## 📧 Suporte

Encontrou algum problema? Abra uma issue no GitHub!

---

**Feito com ❤️ e ☕ em Portugal 🇵🇹**
