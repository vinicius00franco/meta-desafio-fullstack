# CaseCellShop Backend

API REST para processamento de checkout de compra de capinhas de celular.

## Stack Tecnológica

- **Runtime**: Node.js
- **Linguagem**: TypeScript (strict mode)
- **Framework**: Express
- **Testes**: Vitest + Supertest (integração)
- **Dados**: Em memória (array)

## Estrutura do Projeto

```
backend/
├── src/
│   ├── controllers/      # Camada de apresentação (rotas HTTP)
│   │   └── CheckoutController.ts
│   ├── services/         # Camada de negócio (regras)
│   │   ├── CheckoutService.ts
│   │   └── ICheckoutService.ts
│   ├── repositories/     # Camada de acesso a dados
│   │   ├── ProdutoRepository.ts
│   │   └── IProdutoRepository.ts
│   ├── dtos/            # Data Transfer Objects
│   │   ├── ICheckoutRequest.ts
│   │   ├── ICheckoutResponse.ts
│   │   └── IErroApi.ts
│   ├── models/          # Interfaces de domínio
│   │   └── IProduto.ts
│   ├── middlewares/     # Middlewares Express
│   │   ├── erroHandler.ts
│   │   └── jsonParser.ts
│   ├── utils/           # Utilitários
│   │   ├── Erros.ts
│   │   ├── logger.ts
│   │   └── Constantes.ts
│   └── index.ts         # Entry point
├── test/
│   ├── integration/     # Testes de integração
│   │   └── checkout.test.ts
│   └── fixtures/        # Dados sintéticos
│       └── produtos.ts
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## Instalação

```bash
cd backend
npm install
```

## Rodar o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

O servidor será iniciado na porta 3000 (ou PORT definida em variáveis de ambiente).

### Modo Produção

```bash
npm run build
npm start
```

## Rodar Testes

```bash
npm test
```

Para rodar com cobertura:

```bash
npm run test:coverage
```

## API Endpoints

### POST /checkout

Processa uma compra de capinha de celular.

**Request Body:**
```json
{
  "produtoId": "prod-1",
  "quantidade": 2
}
```

**Response (Sucesso - 201):**
```json
{
  "id": "compra-1234567890-abc123",
  "produtoId": "prod-1",
  "quantidade": 2,
  "valorTotal": 99.80,
  "estoqueAtual": 8
}
```

**Response (Erro Validação - 400):**
```json
{
  "mensagem": "Quantidade deve ser maior que zero"
}
```

**Response (Produto Não Encontrado - 404):**
```json
{
  "mensagem": "Produto não encontrado"
}
```

**Response (Estoque Insuficiente - 400):**
```json
{
  "mensagem": "Estoque insuficiente",
  "estoqueDisponivel": 3
}
```

## Regras de Negócio

- Quantidade mínima por pedido: 1 unidade
- Quantidade máxima por pedido: 10 unidades
- Estoque é validado antes de processar a compra
- Preços em Reais (R$)
- Produtos disponíveis em memória

## Produtos Disponíveis

| ID | Nome | Preço | Estoque |
|----|------|-------|---------|
| prod-1 | Capinha iPhone 15 | R$ 49,90 | 10 |
| prod-2 | Capinha Samsung S24 | R$ 39,90 | 5 |
| prod-3 | Capinha iPhone 14 | R$ 44,90 | 3 |
| prod-4 | Capinha iPhone 13 | R$ 34,90 | 10 |
| prod-5 | Capinha iPhone 10 | R$ 19,90 | 10 |
| prod-6 | Capinha iPhone 12 | R$ 29,90 | 10 |
| prod-7 | Capinha iPhone 11 | R$ 24,90 | 100 |

## Testes

Os testes cobrem os seguintes cenários BDD:

### Cenários de Sucesso
- Compra realizada com sucesso
- Compra com estoque exato

### Cenários de Falha
- Estoque insuficiente
- Produto não encontrado

### Cenários de Validação
- Quantidade inválida (negativa)
- Quantidade zero
- Quantidade máxima excedida
- Campos obrigatórios ausentes
- Produto não informado
- Quantidade não informada

## Arquitetura

O projeto segue princípios SOLID e Clean Code:

- **SRP**: Cada classe tem uma única responsabilidade
- **OCP**: Classes abertas para extensão, fechadas para modificação
- **LSP**: Subtipos devem ser substituíveis
- **ISP**: Interfaces específicas, não genéricas
- **DIP**: Depender de abstrações, não de implementações concretas

## Padrões de Design

- **Repository Pattern**: ProdutoRepository abstrai acesso a dados
- **DTO Pattern**: Separação entre modelos de domínio e API
- **Factory Pattern**: Criar objetos de resposta padronizados
- **Dependency Injection**: Injetar dependências via construtor
