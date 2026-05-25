# Respostas do Desafio CaseCellShop

**Repositório GitHub**: https://github.com/vinicius00franco/meta-desafio-fullstack.git

## Pergunta 1 - O que está dando problema?

### 01 - A vitrine está lenta

O problema é que a Loja Virtual fica chamando o ERP toda vez que alguém quer ver um produto. Isso sobrecarrega o sistema e deixa tudo lento. Acaba que o cliente desiste de comprar antes mesmo de começar.

Acho que a solução seria usar um cache para guardar os dados dos produtos. Assim a gente não precisa ficar chamando o ERP o tempo todo.

### 02 - Estoque vendendo mais do que tem

Aqui o problema é que quando duas pessoas tentam comprar o mesmo produto ao mesmo tempo, o sistema deixa as duas reservarem. Depois aparece que não tem estoque suficiente e a gente tem que cancelar.

Precisamos implementar um bloqueio de estoque no momento do checkout, de forma que só uma pessoa possa reservar o mesmo produto por vez.

### 03 - Checkout falhando

Quando o cliente tenta finalizar a compra, às vezes a requisição para o ERP dá timeout. Aí a compra se perde e o cliente fica frustrado.

Minha ideia é processar o checkout de forma assíncrona, usando uma fila de mensagens. Assim a Loja Virtual não fica esperando o ERP responder e evitamos esses timeouts.

## Pergunta 2 - O que precisamos para crescer?

Para não depender tanto do ERP, eu sugeri:

1. **Cache com Redis**: Guardar os dados dos produtos e preços na memória. Isso reduz bastante as chamadas ao ERP e deixa a vitrine mais rápida.

2. **Fila de mensagens (RabbitMQ ou Kafka)**: Processar os checkouts de forma assíncrona. Isso desacopla a Loja Virtual do ERP e evita que timeouts atrapalhem as compras.

3. **Banco de dados próprio**: Criar nossa base para gerenciar pedidos, estoque reservado e histórico. Assim a gente fica menos dependente do ERP.

## Pergunta 3 - Como seria o endpoint de checkout?

### Endpoint POST /checkout

**O que a gente precisa receber**:
- ID do produto
- Quantidade que o cliente quer
- Dados do cliente (opcional)

**Quando der certo**:
- Retorna HTTP 201 (Created)
- ID do pedido que foi criado
- Status do pedido (confirmado ou pendente)
- Valor total da compra

**Quando der erro**:
- HTTP 400 se os dados estiverem errados
- HTTP 409 se não tiver estoque suficiente
- HTTP 503 se o ERP estiver fora do ar
- Uma mensagem explicando o erro

Por que isso é importante? Porque define exatamente o que o frontend espera do backend. Isso evita retrabalho e facilita os testes.

## Pergunta 4 - Quais testes fazer?

Para o POST /checkout, eu testaria:

1. **Compra funcionando**: Produto com estoque suficiente, dados certos → pedido criado e confirmado.

2. **Estoque insuficiente**: Produto com quantidade menor que o cliente pediu → erro 409 dizendo que não tem estoque.

3. **Dados errados**: Quantidade negativa ou produto que não existe → erro 400 com mensagem de validação.

TDD é bom porque a gente define o comportamento esperado antes de codar. Isso guia o desenvolvimento, garante cobertura de testes desde o início e facilita refatorar depois.

## Pergunta 5 - Como usar IA para implementar?

### Minha abordagem

**Primeiro: criar um plano**

Eu pediria para a IA: "Cria um plano ágil pra resolver o problema de furo de estoque no checkout. Divide em tarefas pequenas (máximo 2 horas cada), prioriza o backend primeiro, define critérios de aceitação claros e inclui testes em cada etapa."

**Segundo: implementar o backend**

A instrução seria: "Implementa o endpoint POST /checkout com reserva de estoque atômica. Começa com testes de integração usando Vitest + Supertest, depois implementa o Repository de Estoque com operação atômica, o Service de Checkout com validação, e o Controller Express. Valida tudo com cURL antes de seguir."

**Terceiro: implementar o frontend**

Aqui eu pediria: "Implementa a tela de checkout que consome o endpoint. Verifica se já existe tela ou componentes, cria testes unitários para cada componente, escreve testes e2e com Playwright para o fluxo completo, e valida manualmente navegando na interface."

**Instrução completa pra IA**

"Implementa um sistema de reserva de estoque para e-commerce de capinhas de celular. Cria um plano com tarefas pequenas, implementa o backend primeiro com TDD, valida com cURL, depois implementa o frontend com testes unitários e e2e. Usa worktrees para paralelizar quando possível. Stack: Node.js + TypeScript + Express no backend, React 19 + TypeScript + Vite no frontend, Vitest + Supertest para testes de backend, Playwright para e2e. Código em Português, simples e claro."

### Skills que já existem

O projeto já tem algumas skills configuradas para automatizar tarefas:

**No backend**:
- Criar endpoints Express com TypeScript
- Gera interfaces, controller, rota e tratamento de erros
- Tudo em Português, com termos do negócio e tipagem completa

**No frontend**:
- Criar componentes React com TypeScript
- Criar hooks customizados
- Código em Português, componentes pequenos, lógica de API em hooks

### Como o backend está configurado

**Stack**:
- Node.js com TypeScript
- Express como framework
- Vitest + Supertest para testes
- Dados em memória (array)

**Arquitetura**:
- Controller: rotas HTTP e parsing de request
- Service: regras de negócio e validações
- Repository: acesso aos dados
- DTO: interfaces para request/response
- Model: entidades do negócio
- Middleware: tratamento de erros e logging

**Regras**:
- Tudo em Português
- Seguir SOLID e Clean Code
- Funções pequenas (máx 20 linhas)
- TypeScript strict mode
- Testes de integração obrigatórios

### Como o frontend está configurado

**Stack**:
- React 19 com TypeScript
- Vite para build
- Axios para chamadas HTTP
- CSS puro (sem Tailwind, sem CSS Modules)
- Playwright para testes e2e

**Estrutura de componentes**:
- Atoms: componentes básicos (Button, Input)
- Molecules: componentes compostos (ProdutoSelect, QuantidadeInput)
- Organisms: componentes complexos (CheckoutForm)
- Templates: layouts de página
- Pages: páginas completas

**Regras**:
- Tudo em Português
- Funções pequenas (máx 15 linhas)
- CSS puro no mesmo arquivo .tsx
- Componentização bem feita
- TypeScript strict mode
- Testes e2e com Playwright
