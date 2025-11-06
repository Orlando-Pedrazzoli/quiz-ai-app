# ⚡ INÍCIO RÁPIDO - Quiz AI

## 🎯 Para começar em 5 minutos

### 1️⃣ Instalar dependências
```bash
npm install
```

### 2️⃣ Configurar API Key
```bash
# 1. Obtenha a chave em: https://console.groq.com/keys
# 2. Crie o arquivo .env:
cp .env.example .env

# 3. Cole sua chave no arquivo .env:
GROQ_API_KEY=sua_chave_aqui
```

### 3️⃣ Rodar o projeto
```bash
npm run dev
```

### 4️⃣ Abrir no navegador
```
http://localhost:3000
```

**Pronto! 🎉**

---

## 📝 Comandos Úteis

### Desenvolvimento
```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Cria build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Verifica erros de código
```

### Troubleshooting
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install

# Rodar em outra porta
npm run dev -- -p 3001

# Ver erros detalhados
npm run dev --verbose
```

---

## 🧪 Teste Rápido

Use este texto para testar:

```
JavaScript é uma linguagem de programação interpretada estruturada. 
Foi criada em 1995 por Brendan Eich. É amplamente usada para 
desenvolvimento web frontend e backend com Node.js. É uma linguagem 
de tipagem dinâmica e suporta programação orientada a objetos.
```

**Como testar:**
1. Acesse localhost:3000
2. Clique em "Colar Texto"
3. Cole o texto acima
4. Selecione "5 questões"
5. Clique "Gerar Quiz"
6. Aguarde 10-15 segundos
7. Responda as questões! ✅

---

## 📚 Documentação

- **README.md** - Visão geral completa
- **INSTALACAO.md** - Guia detalhado de instalação
- **ARQUITETURA.md** - Estrutura técnica do projeto
- **MELHORIAS_FUTURAS.md** - Roadmap e ideias

---

## ❓ Problemas Comuns

### "Module not found"
```bash
npm install
```

### "API Key não definida"
```bash
# Verifique se o arquivo .env existe
# Verifique se a chave está correta
# Reinicie o servidor
```

### "Port 3000 in use"
```bash
npm run dev -- -p 3001
```

### PDF não processa
- Verifique se é PDF de texto (não imagem)
- Tamanho máximo: 10MB
- Tente outro PDF

---

## 🚀 Próximos Passos

Depois de rodar localmente:

1. ✅ Testar todas as funcionalidades
2. 📝 Ler a documentação completa
3. 🎨 Personalizar cores/textos
4. 🚀 Fazer deploy (Vercel recomendado)
5. 💡 Implementar melhorias

---

## 🆘 Precisa de Ajuda?

1. **Leia o README.md**
2. **Confira INSTALACAO.md**
3. **Veja os issues no GitHub**
4. **Entre em contato**

---

## 📊 Checklist de Validação

Antes de considerar OK, verifique:

- [ ] `npm install` sem erros
- [ ] Arquivo `.env` criado
- [ ] API Key da Groq configurada
- [ ] Servidor roda sem erros
- [ ] Página carrega em localhost:3000
- [ ] Upload de PDF funciona
- [ ] Colar texto funciona
- [ ] Quiz é gerado corretamente
- [ ] Questões aparecem
- [ ] Navegação funciona
- [ ] Resultados aparecem
- [ ] Review funciona
- [ ] Botões todos funcionam

Se tudo ✅, está pronto para usar! 🎉

---

## 🎓 Dicas

**Para estudantes:**
- Faça quizzes de 10 questões
- Revise sempre as explicações
- Use PDFs com texto claro

**Para professores:**
- Crie quizzes de 15-20 questões
- Compartilhe os resultados
- Use conteúdo bem estruturado

**Para desenvolvedores:**
- Leia ARQUITETURA.md primeiro
- Siga o roadmap em MELHORIAS_FUTURAS.md
- Contribua com PRs!

---

**Desenvolvido com ❤️ em Portugal 🇵🇹**

**Stack:** Next.js 15 + React 18 + TypeScript + Tailwind + Groq AI
