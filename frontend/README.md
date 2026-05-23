# CaseCellShop Frontend

Interface web para checkout de compra de capinhas de celular.

## Stack Tecnológica

- **Framework**: React 19
- **Linguagem**: TypeScript (strict mode)
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Estilização**: CSS Puro
- **Testes**: Playwright (e2e)

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── atoms/       # Componentes básicos
│   │   ├── molecules/   # Componentes compostos
│   │   │   ├── ProdutoSelect.tsx
│   │   │   ├── QuantidadeInput.tsx
│   │   │   ├── BotaoCompra.tsx
│   │   │   └── ToastFeedback.tsx
│   │   └── organisms/   # Componentes complexos
│   ├── hooks/           # Hooks customizados
│   │   └── useCheckout.ts
│   ├── types/           # Tipos TypeScript
│   │   ├── IProduto.ts
│   │   ├── ICheckoutFormData.ts
│   │   └── IApiResponse.ts
│   ├── services/        # Chamadas API
│   │   └── api.ts
│   ├── pages/           # Páginas
│   │   └── Checkout.tsx
│   ├── styles/          # CSS global
│   │   ├── reset.css
│   │   └── variaveis.css
│   └── main.tsx         # Entry point
├── e2e/                 # Testes e2e
│   ├── checkout.spec.ts
│   └── fixtures/
│       └── produtos.ts
├── package.json
├── playwright.config.ts
└── README.md
```

## Instalação

```bash
cd frontend
npm install
```

## Configuração

Criar arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```

## Rodar o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

O servidor será iniciado em `http://localhost:5173`.

### Modo Produção

```bash
npm run build
npm run preview
```

## Rodar Testes

### Testes E2E

```bash
npm run test:e2e
```

### Testes E2E com UI

```bash
npm run test:e2e:ui
```

## Componentes

### ProdutoSelect
Dropdown para seleção de produtos com exibição de preço e estoque.

### QuantidadeInput
Input numérico para quantidade com validação (mínimo 1, máximo 10).

### BotaoCompra
Botão de compra com estados de loading e disabled.

### ToastFeedback
Componente de feedback visual para mensagens de sucesso/erro.

## Página de Checkout

A página de checkout permite:
- Selecionar um produto da lista
- Informar a quantidade desejada
- Visualizar o resumo do pedido (preço unitário e valor total)
- Processar a compra com feedback visual
- Validar campos obrigatórios

## CSS

O projeto utiliza CSS puro com as seguintes convenções:

- **Convenção BEM**: Block__Element--Modifier
- **Classes descritivas**: Nomes em Português
- **Variáveis CSS**: Para consistência (cores, espaçamentos, etc.)
- **Arquivos separados**: Cada componente tem seu CSS
- **Mobile-first**: Responsividade com media queries

## Integração com Backend

O frontend se comunica com a API backend através do endpoint:

- `POST /checkout` - Processar compra

## Testes E2E

Os testes cobrem os seguintes cenários BDD:

### Cenários de Sucesso
- Compra realizada com sucesso
- Compra com estoque exato

### Cenários de Validação
- Campo produto obrigatório
- Quantidade maior que zero
- Quantidade máxima
- Botão desabilitado quando formulário inválido
- Botão habilitado quando formulário válido

### Cenários de Falha
- Estoque insuficiente

### Interação com UI
- Mostrar resumo do pedido
- Mostrar loading durante processamento
- Fechar toast ao clicar no botão fechar

## Arquitetura

O projeto segue princípios SOLID e Clean Code:

- **Custom Hook Pattern**: useCheckout encapsula lógica de API
- **Componentização**: Separação em atoms, molecules, organisms
- **TypeScript Strict Mode**: Tipagem rigorosa para maior segurança
- **CSS Puro**: Sem dependências de bibliotecas de estilização

## Variáveis de Ambiente

- `VITE_API_URL`: URL da API backend (padrão: http://localhost:3000)

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Compila para produção
- `npm run preview` - Preview do build de produção
- `npm run test:e2e` - Executa testes e2e
- `npm run test:e2e:ui` - Executa testes e2e com interface visual
