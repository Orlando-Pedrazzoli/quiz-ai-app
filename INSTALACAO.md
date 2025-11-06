# 🚀 Guia Rápido de Instalação - Quiz AI

## Passo 1: Obter API Key da Groq (GRATUITO)

### 1.1 - Acesse o site da Groq
🔗 https://console.groq.com/

### 1.2 - Crie uma conta
- Clique em "Sign Up"
- Use seu email ou conta Google
- Confirme o email

### 1.3 - Crie uma API Key
1. No dashboard, vá em **"API Keys"** no menu lateral
2. Clique em **"Create API Key"**
3. Dê um nome (ex: "Quiz AI")
4. Clique em **"Submit"**
5. **COPIE A CHAVE** (você não verá ela novamente!)

**Exemplo de chave:**
```
gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Passo 2: Instalar o Projeto

### 2.1 - Abra o terminal na pasta do projeto
```bash
cd quiz-ai-app
```

### 2.2 - Instale as dependências
```bash
npm install
```

⏱️ *Isso vai demorar 2-3 minutos*

---

## Passo 3: Configurar Variáveis de Ambiente

### 3.1 - Crie o arquivo .env
```bash
# No Windows (PowerShell)
Copy-Item .env.example .env

# No Mac/Linux
cp .env.example .env
```

### 3.2 - Edite o arquivo .env
Abra o arquivo `.env` com um editor de texto e cole sua chave:

```env
GROQ_API_KEY=gsk_sua_chave_aqui
```

**⚠️ IMPORTANTE:** 
- Substitua `gsk_sua_chave_aqui` pela chave real que você copiou
- Não compartilhe essa chave com ninguém
- Não faça commit desse arquivo no Git

---

## Passo 4: Executar o Projeto

### 4.1 - Iniciar servidor de desenvolvimento
```bash
npm run dev
```

### 4.2 - Acessar no navegador
🌐 http://localhost:3000

**Pronto! 🎉** O app deve estar rodando!

---

## 📋 Checklist de Verificação

Antes de começar a usar, verifique:

- [ ] Node.js instalado (versão 18+)
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env` criado
- [ ] API Key da Groq configurada
- [ ] Servidor rodando (`npm run dev`)
- [ ] Navegador aberto em http://localhost:3000

---

## 🐛 Problemas Comuns

### Erro: "Cannot find module"
**Solução:** Delete a pasta `node_modules` e rode `npm install` novamente

### Erro: "GROQ_API_KEY is not defined"
**Solução:** 
1. Verifique se o arquivo `.env` existe
2. Verifique se a chave está correta
3. Reinicie o servidor

### Erro: "Port 3000 already in use"
**Solução:** 
- Feche outras aplicações que usam a porta 3000
- Ou rode: `npm run dev -- -p 3001` (usa porta 3001)

### PDF não processa
**Solução:**
- Verifique se o PDF tem menos de 10MB
- Confirme que o PDF contém texto (não só imagens)

---

## 🎯 Primeiro Teste

Depois de instalar, teste com este texto:

```
A Revolução Francesa foi um período de grande transformação política 
e social na França que ocorreu entre 1789 e 1799. Começou com a 
Queda da Bastilha em 14 de julho de 1789. Os principais ideais eram 
liberdade, igualdade e fraternidade. A revolução resultou no fim da 
monarquia absoluta e estabeleceu as bases para a democracia moderna.
```

**Como testar:**
1. Cole o texto acima
2. Selecione "5 questões"
3. Clique em "Gerar Quiz com IA"
4. Aguarde 10-15 segundos
5. Responda as questões!

---

## 📞 Precisa de Ajuda?

- 📖 Leia o README.md completo
- 🐛 Abra uma issue no GitHub
- 💬 Entre em contato

**Boa sorte com seu projeto! 🚀**
