# Plano Backend - Implementação CaseCellShop

## Visão Geral
Implementação da API REST para processamento de checkout de compra de capinhas de celular.

## Stack Tecnológica
- **Runtime**: Node.js
- **Linguagem**: TypeScript (strict mode)
- **Framework**: Express ou Fastify
- **Testes**: Vitest + Supertest (integração)
- **Dados**: Em memória (array)

## Sprints

### Sprint 1 - Fundamentos (2 dias)
| Tarefa | Descrição | Prioridade | Status |
|--------|-----------|------------|--------|
| Configurar projeto Node.js + TypeScript | Inicializar projeto com tsconfig strict, package.json | Alta | Pendente |
| Definir arquitetura em camadas | Controllers, Services, Repositories, DTOs | Alta | Pendente |
| Criar interfaces TypeScript | IProduto, ICheckoutRequest, ICheckoutResponse, IErro | Alta | Pendente |
| Criar repositório em memória | Classe ProdutoRepository com padrão Repository | Alta | Pendente |
| Implementar serviço de checkout | Classe CheckoutService com lógica de negócio (SRP) | Alta | Pendente |
| Implementar controller | Classe CheckoutController com tratamento de erros | Alta | Pendente |
| Adicionar validações | Quantidade > 0, produto existe, estoque suficiente | Alta | Pendente |
| Implementar respostas HTTP | 200 sucesso, 400 erro validação, 500 erro servidor | Alta | Pendente |
| Configurar tratamento de erros centralizado | Middleware de erro com logging estruturado | Alta | Pendente |

### Sprint 2 - Testes e Qualidade (1 dia)
| Tarefa | Descrição | Prioridade | Status |
|--------|-----------|------------|--------|
| Configurar Vitest + Supertest | Setup de testes de integração | Alta | Pendente |
| Escrever testes de integração API | Cenários BDD com dados sintéticos realistas | Alta | Pendente |
| Criar dados sintéticos realistas | Fixtures para produtos e cenários | Alta | Pendente |
| Criar README | Instruções para rodar projeto e testes | Alta | Pendente |
| Organizar código | Estrutura de pastas clara com SOLID | Alta | Pendente |
| Criar PROMPTS.md | Documentar decisões e trade-offs | Média | Pendente |

## Critérios de Aceite
- [ ] API POST /checkout funcional
- [ ] Validação de entradas inválidas
- [ ] Respostas HTTP adequadas (200, 400, 500)
- [ ] Representação de produtos e estoque em memória
- [ ] Arquitetura em camadas (Controller, Service, Repository)
- [ ] Interfaces TypeScript para todos os DTOs
- [ ] Tratamento de erros centralizado
- [ ] Testes de integração cobrindo cenários BDD

## Timeline Estimada
- **Total**: 3 dias
- **Sprint 1**: 2 dias
- **Sprint 2**: 1 dia

## Arquitetura em Camadas
```
src/
├── controllers/     # Camada de apresentação (rotas HTTP)
│   └── CheckoutController.ts
├── services/        # Camada de negócio (regras)
│   └── CheckoutService.ts
├── repositories/    # Camada de acesso a dados
│   └── ProdutoRepository.ts
├── dtos/            # Data Transfer Objects
│   ├── ICheckoutRequest.ts
│   ├── ICheckoutResponse.ts
│   └── IErroApi.ts
├── models/          # Interfaces de domínio
│   └── IProduto.ts
├── middlewares/     # Middlewares Express
│   └── erroHandler.ts
├── utils/           # Utilitários
│   └── logger.ts
└── index.ts         # Entry point
```

## Princípios SOLID
- **S**RP: Cada classe tem uma única responsabilidade
  - Controller: apenas recebe requests e retorna responses
  - Service: apenas contém lógica de negócio
  - Repository: apenas acessa dados
- **O**CP: Classes abertas para extensão, fechadas para modificação
  - Usar interfaces para permitir diferentes implementações
- **L**SP: Subtipos devem ser substituíveis
  - Implementações de Repository devem ser intercambiáveis
- **I**SP: Interfaces específicas, não genéricas
  - ICheckoutRequest, ICheckoutResponse (não IRequest genérico)
- **D**IP: Depender de abstrações, não de implementações concretas
  - Controller depende de ICheckoutService, não CheckoutService

## Clean Code
- Funções pequenas (máximo 20 linhas)
- Nomes descritivos em Português (obterProduto, validarEstoque, processarCheckout)
- Early return para reduzir aninhamento
- Constantes para valores mágicos (ex: `const ESTOQUE_MINIMO = 1`)
- DRY - Don't Repeat Yourself
- Comentários apenas para "porquê", não para "o quê"
- Um nível de indentação por método

## Padrões de Design
- **Repository Pattern**: ProdutoRepository abstrai acesso a dados
- **DTO Pattern**: Separação entre modelos de domínio e API
- **Factory Pattern**: Criar objetos de resposta padronizados
- **Strategy Pattern**: Validadores podem ser substituídos
- **Dependency Injection**: Injetar dependências via construtor

## TypeScript Strict Mode
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

## Tipagem
- **Sempre** usar interfaces para modelos de dados
- **Sempre** tipar parâmetros e retornos de funções
- **Sempre** usar enums ou const assertions para constantes de domínio
- **Preferir** `readonly` em propriedades que não devem mudar
- **Preferir** `const` sobre `let`
- **Usar** type guards para validação de tipos em runtime
- **NUNCA** usar `any` - usar `unknown` para dados desconhecidos
- **Usar** discriminated unions para estados (ex: Result<Sucesso, Erro>)

## Testes de Integração
- **Framework**: Vitest + Supertest
- **Cenários BDD**: Mapear arquivos em `/META/bdd/checkout/` para testes
- **Dados sintéticos**: Usar dados realistas (preços em R$, estoques plausíveis)
- **Estrutura de teste**:
  ```typescript
  describe('POST /checkout', () => {
    it('deve processar compra com sucesso', async () => {
      // Given: produto com estoque disponível
      // When: POST /checkout com quantidade válida
      // Then: retorna 201, estoque decrementado
    })
  })
  ```
- **Cobrir**: Sucesso, validação, estoque insuficiente, produto não encontrado, erro 500
- **API local**: Testes devem usar API em execução local

### Mapeamento Cenários BDD → Testes
- compra-realizada-com-sucesso.md → test("POST /checkout - sucesso")
- estoque-insuficiente.md → test("POST /checkout - estoque insuficiente")
- campos-obrigatorios.md → test("POST /checkout - campos obrigatórios")
- produto-nao-encontrado.md → test("POST /checkout - produto não encontrado")
- quantidade-invalida.md → test("POST /checkout - quantidade inválida")
- indisponibilidade-api.md → test("POST /checkout - erro 500")

## Express Best Practices
- **Sempre** usar async/await em handlers
- **Sempre** envolver handlers em try/catch
- **Sempre** retornar respostas com status HTTP adequado
- **Usar** middleware de CORS para desenvolvimento
- **Usar** middleware de parsing JSON
- **Validar** request body antes de processar

## Tratamento de Erros
- **Sempre** capturar erros em try/catch
- **Retornar** HTTP 400 para erros de validação
- **Retornar** HTTP 404 para recursos não encontrados
- **Retornar** HTTP 500 para erros internos
- **Incluir** mensagem de erro compreensível em Português
- **Logar** erros para debug (console.error é aceitável para este desafio)

## Validação
- **Validar** todos os inputs de requisição
- **Validar** tipos (number, string, etc)
- **Validar** regras de negócio (quantidade > 0, estoque suficiente)
- **Retornar** erro específico para cada tipo de validação falha

## Segurança
- Validação de inputs em todos os endpoints
- Sanitização de dados antes de processar
- Proteção contra injeção de código (não usar eval)
