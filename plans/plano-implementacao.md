# Plano Ágil - Implementação Mini-tarefa CaseCellShop

## Visão Geral
Implementação de um fluxo de checkout para compra de capinhas de celular com back-end e front-end simples.

## Stack Tecnológica
- **Back-end**: Node.js + TypeScript + Express/Fastify
- **Front-end**: React + TypeScript + Vite + CSS Puro
- **Testes Backend**: Vitest + Supertest (integração)
- **Testes Frontend**: Playwright (e2e)
- **Dados**: Em memória (sem banco real)

## Planos Separados

Este plano foi separado em dois documentos específicos para facilitar a implementação:

- **[plano-backend.md](./plano-backend.md)** - Plano detalhado de implementação do backend
  - Arquitetura em camadas (Controller, Service, Repository)
  - Princípios SOLID e Clean Code
  - TypeScript strict mode
  - Testes de integração com Vitest + Supertest
  - Timeline: 3 dias

- **[plano-frontend.md](./plano-frontend.md)** - Plano detalhado de implementação do frontend
  - Componentização (atoms, molecules, organisms)
  - CSS puro com convenções BEM
  - Custom hooks
  - Testes e2e com Playwright
  - Timeline: 3 dias

## Timeline Estimada
- **Total**: 3-5 dias (paralelo ou sequencial)
- **Backend**: 3 dias
- **Frontend**: 3 dias

## Critérios de Aceite Gerais

### Back-end
- [ ] API POST /checkout funcional
- [ ] Validação de entradas inválidas
- [ ] Respostas HTTP adequadas (200, 400, 500)
- [ ] Arquitetura em camadas
- [ ] Testes de integração cobrindo cenários BDD

### Front-end
- [ ] Tela para iniciar compra
- [ ] Indicador de processamento visível
- [ ] Prevenção de ações duplicadas
- [ ] Componentização máxima
- [ ] CSS puro com convenções BEM
- [ ] Testes e2e cobrindo cenários BDD

### Qualidade (Ambos)
- [ ] README com instruções de execução
- [ ] Código organizado e legível
- [ ] TypeScript strict mode
- [ ] Princípios SOLID aplicados
- [ ] Clean Code (funções pequenas, nomes descritivos)

## Documentação Relacionada
- [Requisitos Funcionais](../docs/requisitos-funcionais.md)
- [Requisitos Não Funcionais](../docs/requisitos-nao-funcionais.md)
- [Regras de Negócio](../docs/regras-negocio.md)
- [Cenários BDD](../bdd/checkout/)
