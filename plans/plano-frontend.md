# Plano Frontend - Implementação CaseCellShop

## Visão Geral
Implementação da interface web para checkout de compra de capinhas de celular.

## Stack Tecnológica
- **Framework**: React
- **Linguagem**: TypeScript (strict mode)
- **Build Tool**: Vite
- **HTTP Client**: Axios ou fetch
- **Estilização**: CSS Puro
- **Testes**: Playwright (e2e)

## Sprints

### Sprint 1 - Fundamentos (2 dias)
| Tarefa | Descrição | Prioridade | Status |
|--------|-----------|------------|--------|
| Configurar projeto React + TypeScript + Vite | Inicializar com CSS configurado | Alta | Pendente |
| Definir estrutura de componentes | Separar atoms, molecules, organisms | Alta | Pendente |
| Criar tipos TypeScript | IProduto, ICheckoutFormData, IApiResponse | Alta | Pendente |
| Criar hook customizado useCheckout | Lógica de chamada API com estados | Alta | Pendente |
| Criar componente ProdutoSelect | Dropdown com lista de produtos + CSS | Alta | Pendente |
| Criar componente QuantidadeInput | Input numérico com validação + CSS | Alta | Pendente |
| Criar componente BotaoCompra | Botão com estados (loading, disabled) + CSS | Alta | Pendente |
| Criar componente ToastFeedback | Mensagens de sucesso/erro + CSS | Alta | Pendente |
| Criar página Checkout | Compor componentes com layout CSS | Alta | Pendente |

### Sprint 2 - Testes e Qualidade (1 dia)
| Tarefa | Descrição | Prioridade | Status |
|--------|-----------|------------|--------|
| Configurar Playwright | Setup de testes e2e | Alta | Pendente |
| Escrever testes e2e | Cenários BDD de checkout completo | Alta | Pendente |
| Criar dados sintéticos realistas | Fixtures para produtos e cenários | Alta | Pendente |
| Criar README | Instruções para rodar projeto e testes | Alta | Pendente |
| Organizar código | Estrutura de pastas clara | Alta | Pendente |
| Criar PROMPTS.md | Documentar decisões e trade-offs | Média | Pendente |

## Critérios de Aceite
- [ ] Tela para iniciar compra
- [ ] Indicador de processamento visível
- [ ] Prevenção de ações duplicadas
- [ ] Mensagens compreensíveis de sucesso/erro
- [ ] Componentização (atoms, molecules, organisms)
- [ ] CSS puro com convenções de nomes
- [ ] CSS no mesmo arquivo do componente/página
- [ ] Tipos TypeScript para props e estados
- [ ] Testes e2e cobrindo cenários BDD

## Timeline Estimada
- **Total**: 3 dias
- **Sprint 1**: 2 dias
- **Sprint 2**: 1 dia

## Arquitetura de Componentes
```
src/
├── components/
│   ├── atoms/       # Componentes básicos (Button, Input, Select)
│   ├── molecules/   # Componentes compostos (ProdutoSelect, QuantidadeInput)
│   └── organisms/   # Componentes complexos (CheckoutForm)
├── hooks/           # Hooks customizados
│   └── useCheckout.ts
├── types/           # Tipos TypeScript
│   ├── IProduto.ts
│   ├── ICheckoutFormData.ts
│   └── IApiResponse.ts
├── services/        # Chamadas API
│   └── api.ts
├── pages/           # Páginas
│   └── Checkout.tsx
├── styles/          # CSS global (reset.css, variaveis.css)
└── main.tsx         # Entry point
```

## Componentização
- **Atoms**: Componentes básicos indivisíveis (Button, Input, Label)
- **Molecules**: Componentes compostos de atoms (ProdutoSelect, QuantidadeInput, BotaoCompra)
- **Organisms**: Componentes complexos de molecules (CheckoutForm, ListaProdutos)
- **Templates**: Layouts de página
- **Pages**: Páginas completas
- **Cada componente com seu CSS** no mesmo arquivo

## CSS Puro + Convenções de Nomes
- **CSS no mesmo arquivo**: Cada componente/página tem seu CSS no mesmo arquivo .tsx
- **Convenção BEM**: Block__Element--Modifier (ex: `.checkout__form`, `.botao--disabled`)
- **Classes descritivas**: Nomes em Português (ex: `.lista-produtos`, `.campo-quantidade`)
- **NUNCA** usar style inline `style={{}}`
- **NUNCA** usar CSS Modules
- **NUNCA** usar Tailwind CSS
- **Variáveis CSS**: Usar `--cor-primaria`, `--espacamento-md` para consistência
- **Responsividade**: Media queries com mobile-first
- **Organização**: CSS no final do arquivo .tsx, após o componente
- **Escopo**: Classes específicas por componente para evitar conflitos
- **Reset CSS**: Reset básico global em `styles/reset.css`

### Estrutura CSS no Componente
```tsx
// Componente
export const BotaoCompra = () => {
  return <button className="botao botao--primario">Comprar</button>
}

// CSS no mesmo arquivo
const styles = `
  .botao {
    padding: var(--espacamento-md);
    border-radius: var(--border-radius);
  }
  .botao--primario {
    background-color: var(--cor-primaria);
  }
  .botao--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
```

## React Best Practices
- **Sempre** usar componentes funcionais com hooks
- **Sempre** tipar props com interfaces
- **Sempre** usar `useCallback` para funções passadas como props
- **Sempre** usar `useMemo` para cálculos pesados
- **Preferir** composição sobre herança
- **Usar** fragments `<>...</>` ao invés de divs desnecessários
- **Componentes pequenos** (< 150 linhas) - refatorar se maior
- **Lógica de API em hooks** - componente apenas renderiza

## Clean Code
- Funções pequenas (máximo 15 linhas)
- Nomes descritivos em Português (obterProdutos, processarCompra)
- Early return para reduzir aninhamento
- Constantes para valores mágicos
- DRY - Don't Repeat Yourself
- Comentários apenas para "porquê", não para "o quê"
- Um nível de indentação por método

## Padrões de Design
- **Custom Hook Pattern**: useCheckout encapsula lógica de API
- **Compound Component Pattern**: Componentes compostos (CheckoutForm)
- **Container/Presentational Pattern**: Separação lógica/renderização
- **Render Props Pattern**: Para componentes reutilizáveis

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
- **Sempre** tipar props dos componentes com interfaces
- **Sempre** tipar retornos de hooks customizados
- **Preferir** interfaces sobre types para componentes
- **Usar** discriminated unions para estados (loading, success, error)
- **NUNCA** usar `any` - usar `unknown` para dados desconhecidos
- **Usar** generics para componentes reutilizáveis

## Estado e Hooks
- **Usar** `useState` para estado local simples
- **Usar** `useEffect` para efeitos colaterais (API calls)
- **Usar** custom hooks para lógica reutilizável
- **Evitar** estado desnecessário (derivar de props quando possível)
- **Limpar** efeitos em useEffect (return cleanup function)

## Tratamento de Erros
- **Sempre** capturar erros em chamadas de API
- **Exibir** mensagens de erro compreensíveis em Português
- **Usar** boundaries de erro para capturar erros de renderização
- **Logar** erros para debug (console.error é aceitável)

## Validação
- **Validar** inputs no front-end antes de enviar
- **Desabilitar** botões durante processamento
- **Exibir** feedback visual de loading
- **Prevenir** ações duplicadas

## Testes E2E
- **Framework**: Playwright
- **Cenários BDD**: Mapear arquivos em `/META/bdd/checkout/` para testes
- **Dados sintéticos**: Usar dados realistas (preços em R$, estoques plausíveis)
- **API local**: Testes devem usar API em execução local
- **Estrutura de teste**:
  ```typescript
  test('checkout completo com sucesso', async ({ page }) => {
    // Given: usuário na página de checkout
    // When: seleciona produto, informa quantidade, clica em comprar
    // Then: exibe mensagem de sucesso, estoque atualizado
  })
  ```
- **Cobrir**: Sucesso, validação, estoque insuficiente, campos obrigatórios
- **Fixtures**: Criar fixtures para dados de teste

### Mapeamento Cenários BDD → Testes
- compra-realizada-com-sucesso.md → test("checkout completo com sucesso")
- estoque-insuficiente.md → test("checkout com estoque insuficiente")
- campos-obrigatorios.md → test("validação de campos obrigatórios")
- produto-nao-informado.md → test("validação de produto não informado")
- quantidade-invalida.md → test("validação de quantidade inválida")
- quantidade-maxima-excedida.md → test("validação de quantidade máxima")

## Componentes a Criar

### Atoms
- **Button**: Botão base com variantes (primário, secundário, disabled)
- **Input**: Campo de input com validação
- **Select**: Dropdown de seleção
- **Label**: Rótulo para campos

### Molecules
- **ProdutoSelect**: Select com lista de produtos
- **QuantidadeInput**: Input numérico com validação de quantidade
- **BotaoCompra**: Button com estados (loading, disabled)
- **ToastFeedback**: Componente para mensagens de sucesso/erro

### Organisms
- **CheckoutForm**: Formulário completo de checkout
- **ListaProdutos**: Lista de produtos disponíveis

### Pages
- **Checkout**: Página principal de checkout

## Hooks Customizados
- **useCheckout**: Hook para gerenciar chamada API de checkout
  - Estados: loading, success, error
  - Função: realizarCheckout(produtoId, quantidade)
  - Tratamento de erros
