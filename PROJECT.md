# CaseCellShop - Sistema de Checkout

## Visão Geral

Sistema de checkout para compra de capinhas de celular, implementado como monorepo com backend e frontend.

## Estrutura do Monorepo

```
META/
├── backend/           # API REST Node.js + TypeScript + Express
├── frontend/          # Interface React + TypeScript + Vite
├── plans/             # Planos de implementação
├── bdd/               # Cenários BDD
└── PROJECT.md         # Este arquivo
```

## Stack Tecnológica

### Backend
- **Runtime**: Node.js
- **Linguagem**: TypeScript (strict mode)
- **Framework**: Express
- **Testes**: Vitest + Supertest (integração)
- **Dados**: Em memória (array)

### Frontend
- **Framework**: React 19
- **Linguagem**: TypeScript (strict mode)
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Estilização**: CSS Puro
- **Testes**: Playwright (e2e)

## Comandos de Desenvolvimento

### Backend
```bash
cd backend
npm install              # Instalar dependências
npm run dev              # Iniciar servidor (porta 3000)
npm run build            # Compilar TypeScript
npm start                # Iniciar produção
npm test                 # Rodar testes de integração
```

### Frontend
```bash
cd frontend
npm install              # Instalar dependências
npm run dev              # Iniciar servidor (porta 5173)
npm run build            # Compilar para produção
npm run preview          # Preview do build
npm run test:e2e         # Rodar testes e2e
npm run test:e2e:ui      # Rodar testes e2e com UI
```

## Variáveis de Ambiente

### Backend
- `PORT`: Porta do servidor (padrão: 3000)

### Frontend
- `VITE_API_URL`: URL da API backend (padrão: http://localhost:3000)

## Padrões de Branch

- `feature/checkout-system`: Branch principal de desenvolvimento
- `feature/<nome-da-feature>`: Para novas funcionalidades
- `fix/<nome-do-bug>`: Para correções de bugs
- `refactor/<nome-da-refatoracao>`: Para refatorações

## Padrões de Commit

```
feat: <descrição>          # Nova funcionalidade
fix: <descrição>           # Correção de bug
refactor: <descrição>      # Refatoração
test: <descrição>          # Adição de testes
docs: <descrição>          # Documentação
chore: <descrição>         # Tarefas de manutenção
```

## Regras de Nomenclatura

### Universal (Backend e Frontend)
- Todo código em Português
- Linguagem ubíqua do domínio CaseCellShop
- Termos do negócio: Produto, Capinha, Estoque, Compra, Checkout
- Proibido termos técnicos genéricos (entity, record, transaction, data)

### Backend
- Interfaces com prefixo `I` (ex: `IProduto`, `ICompra`)
- Funções em Português (ex: `obterProduto`, `processarCheckout`)
- Classes em Português (ex: `ProdutoService`, `CheckoutController`)

### Frontend
- Componentes em Português (ex: `ProdutoSelect`, `BotaoCompra`)
- CSS com convenção BEM (ex: `.checkout__form`, `.botao--disabled`)
- Hooks customizados em Português (ex: `useCheckout`)

## Integração

O frontend se comunica com o backend através do endpoint:
- `POST http://localhost:3000/checkout`

## Documentação

### Backend
- `backend/README.md`: Documentação do backend
- `backend/PROMPTS.md`: Decisões e trade-offs do backend

### Frontend
- `frontend/README.md`: Documentação do frontend
- `frontend/PROMPTS.md`: Decisões e trade-offs do frontend

### Planos
- `plans/plano-backend.md`: Plano de implementação backend
- `plans/plano-frontend.md`: Plano de implementação frontend

### Cenários BDD
- `bdd/checkout/`: Cenários BDD para testes

## Testes

### Backend
- Framework: Vitest + Supertest
- Localização: `backend/test/integration/`
- Execução: `cd backend && npm test`
- Cobertura: 10 testes de integração

### Frontend
- Framework: Playwright
- Localização: `frontend/e2e/`
- Execução: `cd frontend && npm run test:e2e`
- Cobertura: Cenários BDD de checkout completo

## Configurações Locais

As configurações do Windsurf e Cursor são locais e não devem ser commitadas:
- `.windsurf/` - Configurações do Windsurf
- `.cursor/` - Configurações do Cursor
- `.windsurfrules` - Regras do Windsurf
- `.cursorrules` - Regras do Cursor
- `.cursorhooks.json` - Hooks do Cursor

## Status Atual

- ✅ Backend implementado (Sprints 1 e 2)
- ✅ Frontend implementado (Sprints 1 e 2)
- ✅ Testes backend funcionando
- ✅ Testes frontend configurados
- ✅ Documentação completa
- ✅ Branch principal: `feature/checkout-system`
