# Respostas - Desafio Técnico CaseCellShop

## Pergunta 1 — Leitura inicial dos problemas

### 01 | Performance da vitrine

**Causa**: Loja Virtual fazendo chamadas síncronas diretas ao ERP para cada requisição de produto, sobrecarregando o sistema monolítico.

**Impacto**: Clientes abandonam a compra antes de iniciar, perda de receita e experiência ruim.

**Hipótese**: Implementar cache de produtos para reduzir carga no ERP e melhorar tempo de resposta.

### 02 | Consistência de estoque

**Causa**: Ausência de controle de concorrência no momento da compra, permitindo múltiplas reservas do mesmo estoque simultaneamente.

**Impacto**: Venda de produtos indisponíveis, cancelamentos, insatisfação de clientes e prejuízo financeiro.

**Hipótese**: Implementar reserva de estoque no momento do checkout com bloqueio atômico.

### 03 | Resiliência do checkout

**Causa**: Timeout em requisições síncronas ao ERP durante processamento de faturamento.

**Impacto**: Clientes perdem compras finalizadas, frustração e perda de receita.

**Hipótese**: Implementar processamento assíncrono com fila de mensagens para checkout.

## Pergunta 2 — Infraestrutura e serviços de apoio

Para suportar o crescimento sem depender diretamente do ERP em cada requisição:

1. **Cache de Produtos (Redis)**: Armazenar dados de produtos e preços em memória, reduzindo chamadas ao ERP e melhorando performance da vitrine.

2. **Fila de Mensagens (RabbitMQ/Kafka)**: Processar checkouts de forma assíncrona, desacoplando a Loja Virtual do ERP e evitando timeouts.

3. **Banco de Dados Próprio**: Criar base de dados local para gerenciar pedidos, estoque reservado e histórico, reduzindo dependência do ERP.

## Pergunta 3 — SDD: Spec-Driven Development

### Contrato do endpoint POST /checkout

**Entradas necessárias**:
- Identificador do produto
- Quantidade desejada
- Dados do cliente (opcional)

**Resposta de sucesso**:
- Status HTTP 201 (Created)
- Identificador do pedido criado
- Status do pedido (confirmado/pendente)
- Valor total da compra

**Resposta de erro**:
- Status HTTP 400 (Bad Request) para dados inválidos
- Status HTTP 409 (Conflict) para estoque insuficiente
- Status HTTP 503 (Service Unavailable) para indisponibilidade do ERP
- Mensagem descritiva do erro

**Importância do contrato**: Garante alinhamento entre frontend e backend, facilita testes, documenta expectativas e reduz retrabalho.

## Pergunta 4 — TDD: Test-Driven Development

### Cenários de teste para POST /checkout

1. **Compra com sucesso**: Produto com estoque suficiente, dados válidos → pedido criado com status confirmado.
2. **Estoque insuficiente**: Produto com quantidade menor que a solicitada → erro 409 com mensagem de estoque indisponível.
3. **Dados inválidos**: Quantidade negativa ou produto inexistente → erro 400 com mensagem de validação.

**Vantagem de TDD**: Define comportamento esperado antes da implementação, guia o desenvolvimento, garante cobertura desde o início e facilita refatoração.

## Pergunta 5 — Uso de IA no desenvolvimento

### Abordagem de Implementação com IA

**Passo 1: Criar Plano Ágil**

Instrução para IA:
"Crie um plano de implementação ágil para resolver o problema de furo de estoque no checkout da CaseCellShop. O plano deve:
- Dividir o trabalho em pequenas tarefas executáveis (máximo 2 horas cada)
- Priorizar backend primeiro (endpoint de reserva de estoque)
- Definir critérios de aceitação claros para cada tarefa
- Incluir testes em cada etapa (TDD)
- Usar implementação paralela com worktrees quando possível"

**Passo 2: Implementação Paralela - Backend**

Instrução para IA:
"Implemente o endpoint POST /checkout com reserva de estoque atômica. Siga estes passos:

1. **Teste Rápido com cURL**: Antes de codificar, defina como testar manualmente:
   ```bash
   curl -X POST http://localhost:3000/checkout \
     -H "Content-Type: application/json" \
     -d '{"produtoId": "1", "quantidade": 2}'
   ```

2. **Implementar Endpoint (TDD)**:
   - Escrever primeiro os testes de integração com Vitest + Supertest
   - Implementar Repository de Estoque com operação atômica
   - Implementar Service de Checkout com validação de estoque
   - Implementar Controller Express
   - Rodar testes até passarem

3. **Validar Manualmente**:
   - Iniciar servidor backend
   - Testar com cURL para verificar contrato
   - Testar cenário de estoque insuficiente
   - Testar concorrência (duas requisições simultâneas)"

**Passo 3: Implementação Paralela - Frontend**

Instrução para IA:
"Implementar tela de checkout que consume o endpoint POST /checkout. Siga estes passos:

1. **Verificar Telas Existentes**:
   - Se já existir tela de checkout, localizar componentes
   - Se não existir, criar componentes seguindo arquitetura atoms/molecules/organisms

2. **Testar Cenários Isoladamente**:
   - Teste unitário de componente de seleção de produto
   - Teste unitário de componente de quantidade
   - Teste unitário de componente de botão de compra
   - Teste de hook customizado de chamada à API

3. **Testar Fluxo Completo (E2E)**:
   - Escrever teste Playwright para fluxo completo:
     - Navegar até tela de checkout
     - Selecionar produto
     - Informar quantidade
     - Clicar em comprar
     - Verificar resposta de sucesso
   - Escrever teste para estoque insuficiente
   - Escrever teste para erro de conexão

4. **Validar Manualmente**:
   - Iniciar servidor frontend
   - Navegar na interface
   - Testar fluxo completo
   - Verificar feedback visual de erros"

**Instrução Completa para IA:**

"Implemente sistema de reserva de estoque para e-commerce de capinhas de celular seguindo abordagem ágil:

1. Crie plano de implementação com tarefas pequenas
2. Implemente backend primeiro com TDD (testes antes de código)
3. Valide backend com cURL manualmente
4. Implemente frontend com testes unitários e e2e
5. Teste cenários isoladamente e fluxo completo
6. Use worktrees para paralelizar quando possível

Stack: Node.js + TypeScript + Express (backend), React 19 + TypeScript + Vite (frontend), Vitest + Supertest (testes backend), Playwright (testes e2e). Priorize simplicidade, clareza e código em Português."

### Skills de Agentes Disponíveis

O projeto possui skills de agentes configuradas em `.windsurf/skills/` para automatizar tarefas comuns:

#### Backend
- **criar-endpoint-express**: Cria novos endpoints Express com TypeScript
  - Parâmetros: método HTTP, caminho da rota, descrição, campos do request, respostas
  - Passos: criar interfaces TypeScript, controller, rota, tratamento de erros
  - Regras: código em Português, termos do negócio, tipagem completa, validação de inputs

#### Frontend
- **criar-componente-react**: Cria componentes React com TypeScript
  - Parâmetros: nome do componente, descrição, props, estado, hooks
  - Passos: criar interface de props, componente funcional, estado, efeitos, renderização, estilos
  - Regras: código em Português, termos do negócio, componente < 200 linhas, lógica de API em custom hook

- **criar-hook-customizado**: Cria hooks customizados React com TypeScript
  - Parâmetros: nome do hook, descrição, parâmetros, retorno, efeitos
  - Passos: criar interfaces, implementar hook com useState/useEffect, tratamento de erros, loading state
  - Regras: código em Português, termos do negócio, tipagem completa, tratamento de erros

### Configuração do Backend

**Stack Tecnológica**:
- Runtime: Node.js
- Linguagem: TypeScript (strict mode)
- Framework: Express
- Testes: Vitest + Supertest (integração)
- Dados: Em memória (array)

**Arquitetura em Camadas**:
- Controller: Camada de apresentação (rotas HTTP, parsing de request)
- Service: Camada de negócio (regras, validações, orquestração)
- Repository: Camada de acesso a dados (CRUD em memória)
- DTO: Data Transfer Objects (interfaces para request/response)
- Model: Interfaces de domínio (entidades do negócio)
- Middleware: Tratamento de erros, logging, validações globais

**Regras Obrigatórias**:
- Todo código em Português (variáveis, funções, classes, comentários)
- Linguagem ubíqua do domínio CaseCellShop (Produto, Estoque, Compra, Checkout)
- SOLID: SRP, OCP, LSP, ISP, DIP
- Clean Code: funções pequenas (máx 20 linhas), early return, sem switch/case
- TypeScript strict mode: sem `any`, tipagem completa
- Testes de integração com Vitest + Supertest
- Estrutura: backend/src/{models,repositories,services,controllers,routes,middlewares}

### Configuração do Frontend

**Stack Tecnológica**:
- Framework: React 19
- Linguagem: TypeScript (strict mode)
- Build Tool: Vite
- HTTP Client: Axios
- Estilização: CSS Puro (OBRIGATÓRIO - sem Tailwind, sem CSS Modules)
- Testes: Playwright (e2e)

**Estrutura de Componentes**:
- Atoms: Componentes básicos indivisíveis (Button, Input, Label)
- Molecules: Componentes compostos de atoms (ProdutoSelect, QuantidadeInput, BotaoCompra)
- Organisms: Componentes complexos de molecules (CheckoutForm, ListaProdutos)
- Templates: Layouts de página
- Pages: Páginas completas

**Regras Obrigatórias**:
- Todo código em Português (variáveis, funções, componentes, comentários)
- Linguagem ubíqua do domínio CaseCellShop (Produto, Estoque, Compra, Checkout)
- Clean Code: funções pequenas (máx 15 linhas), early return, sem else/else if
- CSS Puro: CSS no mesmo arquivo .tsx, convenção BEM, sem style inline
- Componentização: cada componente com seu CSS no mesmo arquivo
- TypeScript strict mode: sem `any`, tipagem completa
- Testes e2e com Playwright
- Estrutura: frontend/src/{components/{atoms,molecules,organisms},hooks,services,types,pages,styles}
