# PROMPTS.md - Decisões e Trade-offs

## Decisões Arquiteturais

### 1. Framework: React vs Vue vs Svelte
**Decisão**: React 19

**Justificativa**:
- Maior comunidade e ecossistema
- Mais recursos e documentação disponíveis
- Requisito explícito do plano
- Melhor integração com TypeScript
- Vagas de mercado mais abundantes

**Trade-off**:
- Vue tem curva de aprendizado mais suave
- Svelte tem performance melhor
- **Mitigação**: Equipe já familiarizada com React

### 2. Build Tool: Vite vs Webpack vs Parcel
**Decisão**: Vite

**Justificativa**:
- Desenvolvimento extremamente rápido (HMR nativo)
- Configuração mínima
- Melhor performance que Webpack
- Padrão moderno na comunidade React
- Integração nativa com TypeScript

**Trade-off**:
- Webpack tem mais plugins maduros
- Parcel tem configuração zero
- **Mitigação**: Vite atende todos os requisitos do projeto

### 3. HTTP Client: Axios vs Fetch
**Decisão**: Axios

**Justificativa**:
- Interceptors para tratamento de erros
- Transformação automática de JSON
- Timeout configurável
- Cancelamento de requests
- Melhor experiência de desenvolvedor

**Trade-off**:
- Fetch é nativo (menos dependência)
- Axios adiciona ~13KB ao bundle
- **Mitigação**: Benefícios superam o tamanho adicional

### 4. Estilização: CSS Puro vs CSS Modules vs Tailwind
**Decisão**: CSS Puro com arquivos separados

**Justificativa**:
- Requisito explícito do plano
- Sem dependências adicionais
- Controle total sobre estilos
- Performance máxima
- Curva de aprendizado zero

**Trade-off**:
- CSS Modules evitam conflitos de nomes
- Tailwind acelera desenvolvimento
- **Mitigação**: Convenção BEM e classes específicas por componente

### 5. Testes: Playwright vs Cypress vs Puppeteer
**Decisão**: Playwright

**Justificativa**:
- Suporte nativo a múltiplos browsers
- API mais moderna e intuitiva
- Melhor performance que Cypress
- Gravação de testes automática
- Debugging integrado

**Trade-off**:
- Cypress tem comunidade maior
- Puppeteer é mais leve
- **Mitigação**: Playwright é o padrão moderno para e2e

## Decisões de Design

### 6. Componentização: Atoms/Molecules/Organisms
**Decisão**: Atomic Design Pattern

**Justificativa**:
- Organização clara e escalável
- Reutilização de componentes
- Separação de responsabilidades
- Manutenção facilitada
- Padrão comprovado na indústria

**Trade-off**:
- Pode criar muitos arquivos pequenos
- Overhead para projetos simples
- **Mitigação**: Escopo do projeto justifica a estrutura

### 7. CSS: Inline vs Separado vs CSS-in-JS
**Decisão**: Arquivos CSS separados por componente

**Justificativa**:
- Separação de responsabilidades
- Cacheamento de CSS pelo browser
- Melhor performance que CSS-in-JS
- Debugging mais simples
- Requisito do plano

**Trade-off**:
- CSS-in-JS permite estilos dinâmicos
- Inline evita conflitos
- **Mitigação**: Variáveis CSS para consistência

### 8. State Management: useState vs Context vs Redux
**Decisão**: useState local

**Justificativa**:
- Escopo simples (apenas checkout)
- Sem necessidade de estado global
- Performance máxima
- Complexidade mínima
- React 19 melhorou useState

**Trade-off**:
- Context seria melhor para estados compartilhados
- Redux tem ferramentas de debug melhores
- **Mitigação**: Projeto não requer estado complexo

### 9. Form Validation: Manual vs React Hook Form vs Formik
**Decisão**: Validação manual

**Justificativa**:
- Regras simples (produto obrigatório, quantidade > 0)
- Sem dependências adicionais
- Controle total sobre mensagens de erro
- Performance máxima
- Requisito do plano

**Trade-off**:
- React Hook Form tem melhor performance
- Formik tem mais recursos
- **Mitigação**: Validações simples não justificam biblioteca

### 10. TypeScript: Strict Mode vs Loose Mode
**Decisão**: Strict Mode habilitado

**Justificativa**:
- Maior segurança de tipos
- Detecção de erros em tempo de compilação
- Melhor IntelliSense
- Padrão recomendado
- Requisito do plano

**Trade-off**:
- Curva de aprendizado mais íngreme
- Pode exigir mais código
- **Mitigação**: Benefícios superam o esforço adicional

## Decisões de Implementação

### 11. CSS Convention: BEM vs CamelCase vs kebab-case
**Decisão**: BEM (Block__Element--Modifier)

**Justificativa**:
- Padrão estabelecido na indústria
- Evita conflitos de nomes
- Escopo claro de classes
- Legibilidade melhor
- Requisito do plano

**Trade-off**:
- Nomes mais longos
- Pode parecer verboso
- **Mitigação**: Clareza compensa verbosidade

### 12. Selectors: data-testid vs data-cy vs CSS selectors
**Decisão**: data-testid

**Justificativa**:
- Padrão do Playwright
- Independente de implementação CSS
- Mais robusto a mudanças
- Melhor semântica para testes
- Ferramentas de teste recomendam

**Trade-off**:
- data-cy é padrão do Cypress
- CSS selectors são mais naturais
- **Mitigação**: Playwright é a ferramenta escolhida

### 13. Component Files: CSS inline vs CSS separado
**Decisão**: Arquivos CSS separados

**Justificativa**:
- Separação de responsabilidades
- Cacheamento pelo browser
- Melhor organização
- Debugging mais simples
- Permite reutilização de CSS

**Trade-off**:
- Mais arquivos para gerenciar
- CSS inline é mais conveniente
- **Mitigação**: Estrutura de pastas organizada

### 14. Environment Variables: .env vs hardcoded
**Decisão**: Variáveis de ambiente (.env)

**Justificativa**:
- Flexibilidade para diferentes ambientes
- Segurança (não expor URLs sensíveis)
- Padrão da indústria
- Fácil configuração
- Suporte nativo do Vite

**Trade-off**:
- Requer documentação
- Hardcoded é mais simples
- **Mitigação**: README documenta configuração

## Decisões de UX

### 15. Feedback: Toast vs Alert vs Modal
**Decisão**: Toast notifications

**Justificativa**:
- Não bloqueia a interface
- Menos intrusivo que modal
- Padrão moderno de UX
- Permite múltiplas notificações
- Melhor experiência do usuário

**Trade-off**:
- Modais exigem ação do usuário
- Alerts são mais simples
- **Mitigação**: Toast com botão de fechar

### 16. Loading: Spinner vs Text vs Skeleton
**Decisão**: Texto no botão

**Justificativa**:
- Simples e claro
- Sem dependências adicionais
- Feedback imediato
- Padrão comum em formulários
- Performance máxima

**Trade-off**:
- Spinner é mais visual
- Skeleton é mais moderno
- **Mitigação**: Texto é suficiente para este caso

### 17. Validation: Real-time vs On-submit
**Decisão**: On-submit com validação visual

**Justificativa**:
- Menos intrusivo para o usuário
- Evita validações prematuras
- Padrão em formulários simples
- Melhor experiência de usuário
- Simples de implementar

**Trade-off**:
- Real-time é mais imediato
- Pode prevenir erros antes
- **Mitigação**: Botão desabilitado guia usuário

## Decisões de Testes

### 18. Test Coverage: Happy path vs Edge cases
**Decisão**: Foco em cenários BDD principais

**Justificativa**:
- Cenários BDD mapeados no plano
- Cobertura dos fluxos críticos
- Tempo limitado para implementação
- Testes de edge cases podem ser adicionados depois
- Valor de negócio nos cenários principais

**Trade-off**:
- Edge cases podem ter bugs
- Cobertura não é 100%
- **Mitigação**: Cenários BDD cobrem maioria dos casos

### 19. Test Data: Mock vs Real API
**Decisão**: Mock de produtos no frontend

**Justificativa**:
- Independência de backend
- Testes mais rápidos
- Controle total dos dados
- Backend pode não estar disponível
- Requisito do plano

**Trade-off**:
- Não testa integração real
- Pode ter divergências com backend
- **Mitigação**: Testes e2e validam integração

## Melhorias Futuras

### O que poderia ser melhorado:

1. **CSS-in-JS**: Migrar para styled-components ou emotion para estilos dinâmicos
2. **State Management**: Implementar Context API se estado crescer
3. **Form Library**: Migrar para React Hook Form para validações complexas
4. **Error Boundary**: Adicionar Error Boundary para capturar erros de renderização
5. **Loading Skeletons**: Implementar skeletons para melhor UX
6. **Accessibility**: Melhorar ARIA labels e navegação por teclado
7. **Performance**: Implementar code splitting e lazy loading
8. **Testing**: Adicionar testes unitários com Vitest
9. **Internationalization**: Adicionar i18n para múltiplos idiomas
10. **Analytics**: Integrar ferramentas de analytics

### Por que não foram implementados agora:

- Escopo limitado a sprints 1 e 2
- Foco em funcionalidade core
- Tempo limitado (3 dias estimados)
- Requisitos não exigem estas features
- Manter simplicidade do projeto
