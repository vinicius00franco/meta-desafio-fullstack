# Documentação Técnica - CaseCellShop

## Arquitetura do Sistema

### Visão Geral
```
┌─────────────────┐         ┌─────────────────┐
│   Front-end     │         │    Back-end     │
│   (React)       │◄────────┤   (Node.js)     │
│                 │  HTTP    │                 │
│  - UI Checkout  │         │  - API /checkout│
│  - Validações  │         │  - Repositório  │
│  - Feedback     │         │  - Regras Negócio│
└─────────────────┘         └─────────────────┘
                                      │
                                      ▼
                              ┌─────────────────┐
                              │  Dados em Memória│
                              │  (Array Produtos)│
                              └─────────────────┘
```

## Estrutura de Pastas Sugerida

```
casecellshop/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── Produto.ts
│   │   ├── repositories/
│   │   │   └── ProdutoRepository.ts
│   │   ├── services/
│   │   │   └── CheckoutService.ts
│   │   ├── controllers/
│   │   │   └── CheckoutController.ts
│   │   ├── routes/
│   │   │   └── checkoutRoutes.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Checkout.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── Produto.ts
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
├── README.md
└── PROMPTS.md
```

## Modelos de Dados

### Produto
```typescript
interface Produto {
  id: string;
  nome: string;
  preco: number;
  estoque: number;
}
```

### Requisição de Checkout
```typescript
interface CheckoutRequest {
  produtoId: string;
  quantidade: number;
}
```

### Resposta de Sucesso
```typescript
interface CheckoutResponse {
  sucesso: true;
  mensagem: string;
  compra: {
    produtoId: string;
    produtoNome: string;
    quantidade: number;
    valorTotal: number;
  };
}
```

### Resposta de Erro
```typescript
interface ErrorResponse {
  sucesso: false;
  mensagem: string;
  erro: string;
}
```

## Fluxo de Processamento

### Fluxo de Checkout (Sucesso)
```
1. Usuário seleciona produto
2. Usuário informa quantidade
3. Usuário clica em "Comprar"
4. Front-end valida entrada (quantidade > 0)
5. Front-end desabilita botão e mostra loading
6. Front-end envia POST /checkout
7. Back-end recebe requisição
8. Back-end valida produto existe
9. Back-end valida estoque suficiente
10. Back-end decrementa estoque
11. Back-end retorna HTTP 200
12. Front-end recebe sucesso
13. Front-end mostra mensagem de sucesso
14. Front-end atualiza lista de produtos
15. Front-end reabilita botão
```

### Fluxo de Checkout (Erro)
```
1. Usuário seleciona produto
2. Usuário informa quantidade
3. Usuário clica em "Comprar"
4. Front-end valida entrada (quantidade > 0)
5. Front-end desabilita botão e mostra loading
6. Front-end envia POST /checkout
7. Back-end recebe requisição
8. Back-end valida entrada
9. Back-end detecta erro (estoque insuficiente, etc)
10. Back-end retorna HTTP 400/404/500
11. Front-end recebe erro
12. Front-end mostra mensagem de erro
13. Front-end reabilita botão
```

## Endpoints da API

### POST /checkout
**Descrição**: Processa uma tentativa de compra

**Request Body**:
```json
{
  "produtoId": "string",
  "quantidade": "number"
}
```

**Respostas**:

- **200 OK** (Sucesso)
```json
{
  "sucesso": true,
  "mensagem": "Compra realizada com sucesso",
  "compra": {
    "produtoId": "prod-1",
    "produtoNome": "Capinha iPhone 15",
    "quantidade": 2,
    "valorTotal": 99.90
  }
}
```

- **400 Bad Request** (Erro de validação)
```json
{
  "sucesso": false,
  "mensagem": "Quantidade deve ser maior que zero",
  "erro": "VALIDACAO_QUANTIDADE"
}
```

- **400 Bad Request** (Estoque insuficiente)
```json
{
  "sucesso": false,
  "mensagem": "Estoque insuficiente. Disponível: 5",
  "erro": "ESTOQUE_INSUFICIENTE"
}
```

- **404 Not Found** (Produto não encontrado)
```json
{
  "sucesso": false,
  "mensagem": "Produto não encontrado",
  "erro": "PRODUTO_NAO_ENCONTRADO"
}
```

- **500 Internal Server Error** (Erro inesperado)
```json
{
  "sucesso": false,
  "mensagem": "Erro ao processar compra",
  "erro": "ERRO_INTERNO"
}
```

## Cenários de Teste

### Cenários de Sucesso
| Cenário | Descrição | Resultado Esperado |
|---------|-----------|-------------------|
| TC-001 | Compra com estoque suficiente | HTTP 200, estoque decrementado |
| TC-002 | Compra de toda quantidade disponível | HTTP 200, estoque vai para 0 |

### Cenários de Erro
| Cenário | Descrição | Resultado Esperado |
|---------|-----------|-------------------|
| TC-003 | Quantidade zero | HTTP 400, mensagem de erro |
| TC-004 | Quantidade negativa | HTTP 400, mensagem de erro |
| TC-005 | Produto inexistente | HTTP 404, mensagem de erro |
| TC-006 | Estoque insuficiente | HTTP 400, mensagem de erro |
| TC-007 | Erro interno no servidor | HTTP 500, mensagem de erro |

## Decisões e Trade-offs

### Trade-offs Identificados
| Decisão | Justificativa | Trade-off |
|---------|---------------|-----------|
| Dados em memória | Simplicidade para o desafio | Dados perdidos ao reiniciar |
| Sem banco de dados | Reduz complexidade | Não persistente |
| Sem autenticação | Fora do escopo do desafio | Sem controle de usuários |
| Timeout de 10s | Balanceio entre UX e resiliência | Pode ser longo para UX |
| Validação no front-end | Feedback rápido ao usuário | Duplicação de validação |

## Dependências Sugeridas

### Back-end
- `express`: Framework web
- `typescript`: Tipagem estática
- `@types/express`: Tipos do Express
- `cors`: Habilitar CORS
- `@types/cors`: Tipos do CORS

### Front-end
- `react`: Biblioteca UI
- `typescript`: Tipagem estática
- `vite`: Build tool
- `axios`: Cliente HTTP
- `lucide-react`: Ícones (opcional)

## Como Executar

### Back-end
```bash
cd backend
npm install
npm run dev
# Server rodando em http://localhost:3001
```

### Front-end
```bash
cd frontend
npm install
npm run dev
# App rodando em http://localhost:5173
```

## Próximos Passos
1. Implementar Sprint 1 (Back-end)
2. Implementar Sprint 2 (Front-end)
3. Implementar Sprint 3 (Testes e Qualidade)
4. Criar repositório GitHub público
5. Documentar em PROMPTS.md
