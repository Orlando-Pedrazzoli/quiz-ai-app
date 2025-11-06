# 🔧 Correção de Erro - Next.js

## ⚠️ Erro Encontrado

```
TypeError: Cannot read properties of undefined (reading 'call')
Next.js (15.0.2) is outdated
```

## ✅ SOLUÇÃO

O Next.js 15.0.2 tem bugs conhecidos. Já corrigi no projeto!

### O que foi alterado:

1. **package.json** - Downgrade para Next.js 14.2.15 (versão estável)
2. **next.config.js** - Ajustado para sintaxe correta

### 🚀 Como Aplicar a Correção

**OPÇÃO 1: Baixar o novo ZIP (RECOMENDADO)**

Baixe o novo arquivo corrigido e siga os passos normalmente.

---

**OPÇÃO 2: Corrigir manualmente (se já instalou)**

Se você já baixou e instalou, siga estes passos:

```bash
# 1. Pare o servidor (Ctrl+C no terminal)

# 2. Delete as pastas de cache
rm -rf node_modules
rm -rf .next
rm package-lock.json

# Windows (PowerShell):
# Remove-Item -Recurse -Force node_modules, .next, package-lock.json

# 3. Edite o package.json
# Mude as linhas:
#   "next": "15.0.2"  →  "next": "14.2.15"
#   "eslint-config-next": "15.0.2"  →  "eslint-config-next": "14.2.15"

# 4. Reinstale tudo
npm install

# 5. Rode novamente
npm run dev
```

---

**OPÇÃO 3: Comandos rápidos**

```bash
# Limpar cache e reinstalar (Linux/Mac)
rm -rf node_modules .next package-lock.json && npm install && npm run dev

# Windows (PowerShell)
Remove-Item -Recurse -Force node_modules, .next, package-lock.json; npm install; npm run dev
```

---

## ✅ Verificar se funcionou

Após rodar `npm run dev`, você deve ver:

```
✓ Ready in 2.5s
○ Local:        http://localhost:3000
```

E NO navegador não deve ter mais o erro!

---

## 🎯 Versões Corretas (Já corrigidas no novo ZIP)

```json
{
  "next": "14.2.15",
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

---

## 📞 Ainda com Problemas?

1. **Delete TUDO e comece do zero:**
   ```bash
   rm -rf quiz-ai-app
   # Extraia o ZIP novamente
   cd quiz-ai-app
   npm install
   npm run dev
   ```

2. **Verifique versão do Node:**
   ```bash
   node -v
   # Deve ser 18.0.0 ou superior
   ```

3. **Limpe cache do npm:**
   ```bash
   npm cache clean --force
   npm install
   ```

---

## ✅ Status

- [x] Erro identificado
- [x] Correção aplicada
- [x] Novo ZIP gerado
- [x] Testado e funcionando

**Baixe o novo ZIP e deve funcionar perfeitamente! 🚀**
