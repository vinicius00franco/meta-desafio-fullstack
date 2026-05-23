# PROMPTS.md - Decisões e Trade-offs

## Decisões Arquiteturais

### 1. Framework: Express vs Fastify
**Decisão**: Express

**Justificativa**:
- Express é mais amplamente utilizado e documentado
- Comunidade maior e mais recursos disponíveis
- Curva de aprendizado mais suave para o time
- Suficiente para os requisitos do projeto (API REST simples)

**Trade-off**:
- Fastify teria performance melhor, mas não é crítico para este projeto
- Express tem middleware mais maduro e testado

### 2. Armazenamento: Memória vs Banco de Dados
**Decisão**: Armazenamento em memória (array)

**Justificativa**:
- Requisito explícito do desafio
- Simplicidade de implementação
- Performance máxima para testes
- Não há necessidade de persistência entre reinicializações

**Trade-off**:
- Dados são perdidos ao reiniciar o servidor
- Não há escalabilidade horizontal
- Não há transações ACID
- **Mitigação**: Método `restaurarEstoqueInicial()` para testes

### 3. Validação: Manual vs Biblioteca (Joi/Zod)
**Decisão**: Validação manual no service

**Justificativa**:
- Regras de negócio simples (quantidade > 0, estoque suficiente)
- Menos dependências externas
- Controle total sobre mensagens de erro em Português
- TypeScript strict mode já garante tipagem

**Trade-off**:
- Mais código para escrever
- Validações complexas seriam mais difíceis
- **Mitigação**: Classes de erro customizadas para organização

### 4. Tratamento de Erros: Centralizado vs Local
**Decisão**: Híbrido (Controller trata erros específicos, middleware genérico)

**Justificativa**:
- Controller retorna códigos HTTP adequados (400, 404, 500)
- Middleware centralizado garante que nenhum erro escape
- Melhor experiência para o desenvolvedor
- Logs estruturados em um único lugar

**Trade-off**:
- Alguma duplicação de lógica de erro
- **Mitigação**: Classes de erro customizadas padronizam tratamento

### 5. Testes: Vitest vs Jest
**Decisão**: Vitest

**Justificativa**:
- Mais rápido (usa Vite)
- Compatível com ecossistema Jest
- Melhor integração com TypeScript
- Configuração mais simples

**Trade-off**:
- Jest tem comunidade maior
- **Mitigação**: API similar ao Jest, fácil migração se necessário

## Decisões de Design

### 6. Interfaces vs Classes para Models
**Decisão**: Interfaces para models

**Justificativa**:
- TypeScript strict mode favorece interfaces
- Mais flexibilidade para diferentes implementações
- Melhor para contratos de dados
- Repository pattern funciona melhor com interfaces

**Trade-off**:
- Não pode ter lógica nas interfaces
- **Mitigação**: Lógica fica nas classes de serviço

### 7. Injeção de Dependência: Manual vs Container
**Decisão**: Injeção manual via construtor

**Justificativa**:
- Simplicidade
- Sem dependências externas (Inversify, Awilix)
- TypeScript torna explícitas as dependências
- Suficiente para o tamanho do projeto

**Trade-off**:
- Mais verboso para projetos grandes
- **Mitigação**: Escopo do projeto não justifica container DI

### 8. Constantes: Enum vs Const
**Decisão**: Const assertions

**Justificativa**:
- Mais flexível que enums
- TypeScript infere tipos corretamente
- Valores são imutáveis
- Melhor performance (enum em runtime)

**Trade-off**:
- Enums têm melhor autocompletion
- **Mitigação**: Constantes bem documentadas

### 9. Logging: Biblioteca vs Console
**Decisão**: Console com wrapper customizado

**Justificativa**:
- Requisito simples (apenas desenvolvimento)
- Sem dependências externas
- Wrapper permite formatação padronizada
- Fácil substituir por biblioteca real depois

**Trade-off**:
- Não há níveis de log configuráveis
- Não há persistência de logs
- **Mitigação**: Logger wrapper permite migração fácil

## Decisões de Negócio

### 10. Quantidade Máxima: 10 unidades
**Decisão**: Limite fixo de 10 unidades por pedido

**Justificativa**:
- Previne abuso da API
- Protege estoque para múltiplos clientes
- Baseado em cenário BDD específico
- Fácil configurar via constante

**Trade-off**:
- Pode limitar compras legítimas
- **Mitigação**: Constante pode ser tornada configurável

### 11. IDs: String vs Number
**Decisão**: Strings para IDs

**Justificativa**:
- Mais flexibilidade (pode incluir prefixos)
- Padrão comum em APIs REST
- Facilita geração de IDs únicos
- Compatível com UUIDs futuros

**Trade-off**:
- Levemente mais lento que números
- **Mitigação**: Diferença insignificante para este projeto

### 12. Preços: Number vs Decimal
**Decisão**: Number (float)

**Justificativa**:
- JavaScript não tem tipo decimal nativo
- Simplicidade para este desafio
- Preços são em Reais (2 casas decimais)
- Formatação feita no frontend

**Trade-off**:
- Problemas de precisão de ponto flutuante
- **Mitigação**: Arredondamento adequado em cálculos

## Decisões de Implementação

### 13. Build: tsx vs tsc
**Decisão**: tsx para desenvolvimento, tsc para produção

**Justificativa**:
- tsx: hot reload, mais rápido para dev
- tsc: verificação completa, otimização para prod
- Melhor experiência de desenvolvimento
- Build otimizado para produção

**Trade-off**:
- Duas ferramentas diferentes
- **Mitigação**: Scripts npm padronizam processo

### 14. Porta: Hardcoded vs Variável de Ambiente
**Decisão**: Variável de ambiente com fallback

**Justificativa**:
- Flexibilidade para diferentes ambientes
- Padrão da indústria
- Fácil configurar em produção
- Fallback 3000 para desenvolvimento

**Trade-off**:
- Requer documentação
- **Mitigação**: README documenta configuração

## Melhorias Futuras

### O que poderia ser melhorado:

1. **Banco de Dados Real**: Migrar para PostgreSQL ou MongoDB
2. **Cache**: Implementar Redis para produtos frequentemente acessados
3. **Rate Limiting**: Prevenir abuso da API
4. **Autenticação**: Adicionar JWT para proteger endpoints
5. **Docker**: Containerizar aplicação para deploy
6. **CI/CD**: Pipeline de testes automáticos
7. **Monitoramento**: Adicionar Prometheus/Grafana
8. **Documentação**: Swagger/OpenAPI para documentação automática
9. **Validação**: Migrar para Zod para validações mais complexas
10. **Logging**: Migrar para Winston ou Pino para produção

### Por que não foram implementados agora:

- Escopo do desafio limitado a sprints 1 e 2
- Foco em arquitetura limpa e testes
- Tempo limitado (3 dias estimados)
- Requisitos não exigem estas features
