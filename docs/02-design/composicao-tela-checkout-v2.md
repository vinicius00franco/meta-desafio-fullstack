# Composição Visual - Tela de Checkout (Versão 2)

## Visão Geral

Tela única de checkout para compra de capinhas de celular com layout em duas colunas: cards de produtos à esquerda e sidebar de pagamento à direita.

---

## Layout Principal

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CaseCellShop                                         │
│                            📱 Capinhas                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────────────────┬─────────────────────────────────┐│
│  │                                      │  ┌─────────────────────────────┐ ││
│  │     PRODUTOS DISPONÍVEIS            │  │      SEU CARRINHO            │ ││
│  │                                      │  │                             │ ││
│  │  ┌──────────────────────────────┐   │  │  ┌─────────────────────────┐ │ ││
│  │  │  [IMG]  Capinha iPhone 15   │   │  │  │ Produto selecionado:     │ │ ││
│  │  │         Pro Max              │   │  │  │ Capinha iPhone 15 Pro Max│ │ ││
│  │  │         R$ 89,90             │   │  │  └─────────────────────────┘ │ ││
│  │  │         Estoque: 10          │   │  │                             │ ││
│  │  │      [ SELECIONAR ]          │   │  │  ┌─────────────────────────┐ │ ││
│  │  └──────────────────────────────┘   │  │  │ Quantidade:             │ │ ││
│  │                                      │  │  │  [  1  ]                │ │ ││
│  │  ┌──────────────────────────────┐   │  │  └─────────────────────────┘ │ ││
│  │  │  [IMG]  Capinha Samsung     │   │  │                             │ ││
│  │  │         Galaxy S24           │   │  │  ┌─────────────────────────┐ │ ││
│  │  │         R$ 79,90             │   │  │  │ Preço unitário:         │ │ ││
│  │  │         Estoque: 15          │   │  │  │ R$ 89,90                │ │ ││
│  │  │      [ SELECIONAR ]          │   │  │  └─────────────────────────┘ │ ││
│  │  └──────────────────────────────┘   │  │                             │ ││
│  │                                      │  │  ┌─────────────────────────┐ │ ││
│  │  ┌──────────────────────────────┐   │  │  │ Subtotal:               │ │ ││
│  │  │  [IMG]  Capinha iPhone 14   │   │  │  │ R$ 89,90                │ │ ││
│  │  │         R$ 69,90             │   │  │  └─────────────────────────┘ │ ││
│  │  │         Estoque: 8           │   │  │                             │ ││
│  │  │      [ SELECIONAR ]          │   │  │  ┌─────────────────────────┐ │ ││
│  │  └──────────────────────────────┘   │  │  │ Total:                  │ │ ││
│  │                                      │  │  │ R$ 89,90                │ │ ││
│  │  ┌──────────────────────────────┐   │  │  └─────────────────────────┘ │ ││
│  │  │  [IMG]  Capinha Xiaomi      │   │  │                             │ ││
│  │  │         Redmi Note 13        │   │  │  ┌─────────────────────────┐ │ ││
│  │  │         R$ 59,90             │   │  │  │                         │ │ ││
│  │  │         Estoque: 20          │   │  │  │    [ FINALIZAR ]         │ │ ││
│  │  │      [ SELECIONAR ]          │   │  │  │      [ COMPRA ]          │ │ ││
│  │  └──────────────────────────────┘   │  │  │                         │ │ ││
│  │                                      │  └─────────────────────────────┘ ││
│  └──────────────────────────────────────┴─────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Estado: Produto Selecionado

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CaseCellShop                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────────────────┬─────────────────────────────────┐│
│  │                                      │  ┌─────────────────────────────┐ ││
│  │     PRODUTOS DISPONÍVEIS            │  │      SEU CARRINHO            │ ││
│  │                                      │  │                             │ ││
│  │  ┌──────────────────────────────┐   │  │  ┌─────────────────────────┐ │ ││
│  │  │ ✅ [IMG] Capinha iPhone 15   │   │  │  │ Produto selecionado:     │ │ ││
│  │  │       Pro Max                │   │  │  │ Capinha iPhone 15 Pro Max│ │ ││
│  │  │       R$ 89,90               │   │  │  └─────────────────────────┘ │ ││
│  │  │       Estoque: 10            │   │  │                             │ ││
│  │  │    [ SELECIONADO ]           │   │  │  ┌─────────────────────────┐ │ ││
│  │  └──────────────────────────────┘   │  │  │ Quantidade:             │ │ ││
│  │                                      │  │  │  [  1  ]                │ │ ││
│  │  ┌──────────────────────────────┐   │  │  └─────────────────────────┘ │ ││
│  │  │  [IMG]  Capinha Samsung     │   │  │                             │ ││
│  │  │         Galaxy S24           │   │  │  ┌─────────────────────────┐ │ ││
│  │  │         R$ 79,90             │   │  │  │ Preço unitário:         │ │ ││
│  │  │         Estoque: 15          │   │  │  │ R$ 89,90                │ │ ││
│  │  │      [ SELECIONAR ]          │   │  │  └─────────────────────────┘ │ ││
│  │  └──────────────────────────────┘   │  │                             │ ││
│  │                                      │  │  ┌─────────────────────────┐ │ ││
│  │  ┌──────────────────────────────┐   │  │  │ Subtotal:               │ │ ││
│  │  │  [IMG]  Capinha iPhone 14   │   │  │  │ R$ 89,90                │ │ ││
│  │  │         R$ 69,90             │   │  │  └─────────────────────────┘ │ ││
│  │  │         Estoque: 8           │   │  │                             │ ││
│  │  │      [ SELECIONAR ]          │   │  │  ┌─────────────────────────┐ │ ││
│  │  └──────────────────────────────┘   │  │  │ Total:                  │ │ ││
│  │                                      │  │  │ R$ 89,90                │ │ ││
│  │  ┌──────────────────────────────┐   │  │  └─────────────────────────┘ │ ││
│  │  │  [IMG]  Capinha Xiaomi      │   │  │                             │ ││
│  │  │         Redmi Note 13        │   │  │  ┌─────────────────────────┐ │ ││
│  │  │         R$ 59,90             │   │  │  │                         │ │ ││
│  │  │         Estoque: 20          │   │  │  │    [ FINALIZAR ]         │ │ ││
│  │  │      [ SELECIONAR ]          │   │  │  │      [ COMPRA ]          │ │ ││
│  │  └──────────────────────────────┘   │  │  │                         │ │ ││
│  │                                      │  └─────────────────────────────┘ ││
│  └──────────────────────────────────────┴─────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Estado: Processando Pagamento

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CaseCellShop                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────────────────┬─────────────────────────────────┐│
│  │                                      │  ┌─────────────────────────────┐ ││
│  │     PRODUTOS DISPONÍVEIS            │  │      PROCESSANDO COMPRA      │ ││
│  │                                      │  │                             │ ││
│  │  ┌──────────────────────────────┐   │  │  ⏳ Processando...          │ ││
│  │  │ ✅ [IMG] Capinha iPhone 15   │   │  │  (aprox. 3 segundos)        │ ││
│  │  │       Pro Max                │   │  │                             │ ││
│  │  │       R$ 89,90               │   │  │  Etapas:                    │ ││
│  │  │       Estoque: 10            │   │  │  ✅ Produto selecionado     │ ││
│  │  │    [ SELECIONADO ]           │   │  │  ✅ Quantidade definida     │ ││
│  │  └──────────────────────────────┘   │  │  ⏳ Validando estoque...     │ ││
│  │                                      │  │  ⬜ Processando compra      │ ││
│  │  ┌──────────────────────────────┐   │  │  ⬜ Confirmação             │ ││
│  │  │  [IMG]  Capinha Samsung     │   │  │                             │ ││
│  │  │         Galaxy S24           │   │  │  ████████████░░░░░░░░░░░░  40%│ ││
│  │  │         R$ 79,90             │   │  │                             │ ││
│  │  │         Estoque: 15          │   │  │  ┌─────────────────────────┐ │ ││
│  │  │      [ SELECIONAR ]          │   │  │  │    [ CANCELAR ]          │ │ ││
│  │  └──────────────────────────────┘   │  │  └─────────────────────────┘ │ ││
│  │                                      │  └─────────────────────────────┘ ││
│  │  ┌──────────────────────────────┐   │  │                             │ ││
│  │  │  [IMG]  Capinha iPhone 14   │   │  │                             │ ││
│  │  │         R$ 69,90             │   │  │                             │ ││
│  │  │         Estoque: 8           │   │  │                             │ ││
│  │  │      [ SELECIONAR ]          │   │  │                             │ ││
│  │  └──────────────────────────────┘   │  │                             │ ││
│  │                                      │  │                             │ ││
│  │  ┌──────────────────────────────┐   │  │                             │ ││
│  │  │  [IMG]  Capinha Xiaomi      │   │  │                             │ ││
│  │  │         Redmi Note 13        │   │  │                             │ ││
│  │  │         R$ 59,90             │   │  │                             │ ││
│  │  │         Estoque: 20          │   │  │                             │ ││
│  │  │      [ SELECIONAR ]          │   │  │                             │ ││
│  │  └──────────────────────────────┘   │  │                             │ ││
│  │                                      │  │                             │ ││
│  └──────────────────────────────────────┴─────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Estado: Sucesso

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CaseCellShop                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────────────────┬─────────────────────────────────┐│
│  │                                      │  ┌─────────────────────────────┐ ││
│  │     PRODUTOS DISPONÍVEIS            │  │      ✅ COMPRA REALIZADA!    │ ││
│  │                                      │  │                             │ ││
│  │  ┌──────────────────────────────┐   │  │  Sua compra foi processada  │ ││
│  │  │  [IMG]  Capinha iPhone 15    │   │  │  com sucesso!               │ ││
│  │  │       Pro Max                │   │  │                             │ ││
│  │  │       R$ 89,90               │   │  │  ┌─────────────────────────┐ │ ││
│  │  │       Estoque: 9             │   │  │  │ Produto:                 │ │ ││
│  │  │      [ SELECIONAR ]          │   │  │  │ Capinha iPhone 15 Pro Max│ │ ││
│  │  └──────────────────────────────┘   │  │  └─────────────────────────┘ │ ││
│  │                                      │  │                             │ ││
│  │  ┌──────────────────────────────┐   │  │  ┌─────────────────────────┐ │ ││
│  │  │  [IMG]  Capinha Samsung     │   │  │  │ Quantidade:              │ │ ││
│  │  │         Galaxy S24           │   │  │  │ 1 unidade                │ │ ││
│  │  │         R$ 79,90             │   │  │  └─────────────────────────┘ │ ││
│  │  │         Estoque: 15          │   │  │                             │ ││
│  │  │      [ SELECIONAR ]          │   │  │  ┌─────────────────────────┐ │ ││
│  │  └──────────────────────────────┘   │  │  │ Total pago:              │ │ ││
│  │                                      │  │  │ R$ 89,90                │ │ ││
│  │  ┌──────────────────────────────┐   │  │  └─────────────────────────┘ │ ││
│  │  │  [IMG]  Capinha iPhone 14   │   │  │                             │ ││
│  │  │         R$ 69,90             │   │  │  ┌─────────────────────────┐ │ ││
│  │  │         Estoque: 8           │   │  │  │                         │ │ ││
│  │  │      [ SELECIONAR ]          │   │  │  │    [ NOVA COMPRA ]       │ │ ││
│  │  └──────────────────────────────┘   │  │  │                         │ │ ││
│  │                                      │  └─────────────────────────────┘ ││
│  │  ┌──────────────────────────────┐   │  │                             │ ││
│  │  │  [IMG]  Capinha Xiaomi      │   │  │                             │ ││
│  │  │         Redmi Note 13        │   │  │                             │ ││
│  │  │         R$ 59,90             │   │  │                             │ ││
│  │  │         Estoque: 20          │   │  │                             │ ││
│  │  │      [ SELECIONAR ]          │   │  │                             │ ││
│  │  └──────────────────────────────┘   │  │                             │ ││
│  │                                      │  │                             │ ││
│  └──────────────────────────────────────┴─────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Estado: Erro

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CaseCellShop                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────────────────┬─────────────────────────────────┐│
│  │                                      │  ┌─────────────────────────────┐ ││
│  │     PRODUTOS DISPONÍVEIS            │  │      SEU CARRINHO            │ ││
│  │                                      │  │                             │ ││
│  │  ┌──────────────────────────────┐   │  │  ┌─────────────────────────┐ │ ││
│  │  │ ✅ [IMG] Capinha iPhone 15   │   │  │  │ Produto selecionado:     │ │ ││
│  │  │       Pro Max                │   │  │  │ Capinha iPhone 15 Pro Max│ │ ││
│  │  │       R$ 89,90               │   │  │  └─────────────────────────┘ │ ││
│  │  │       Estoque: 10            │   │  │                             │ ││
│  │  │    [ SELECIONADO ]           │   │  │  ┌─────────────────────────┐ │ ││
│  │  └──────────────────────────────┘   │  │  │ Quantidade:             │ │ ││
│  │                                      │  │  │  [  15  ]               │ │ ││
│  │  ┌──────────────────────────────┐   │  │  └─────────────────────────┘ │ ││
│  │  │  [IMG]  Capinha Samsung     │   │  │                             │ ││
│  │  │         Galaxy S24           │   │  │  ┌─────────────────────────┐ │ ││
│  │  │         R$ 79,90             │   │  │  │ Preço unitário:         │ │ ││
│  │  │         Estoque: 15          │   │  │  │ R$ 89,90                │ │ ││
│  │  │      [ SELECIONAR ]          │   │  │  └─────────────────────────┘ │ ││
│  │  └──────────────────────────────┘   │  │                             │ ││
│  │                                      │  │  ┌─────────────────────────┐ │ ││
│  │  ┌──────────────────────────────┐   │  │  │ Subtotal:               │ │ ││
│  │  │  [IMG]  Capinha iPhone 14   │   │  │  │ R$ 1.348,50              │ │ ││
│  │  │         R$ 69,90             │   │  │  └─────────────────────────┘ │ ││
│  │  │         Estoque: 8           │   │  │                             │ ││
│  │  │      [ SELECIONAR ]          │   │  │  ┌─────────────────────────┐ │ ││
│  │  └──────────────────────────────┘   │  │  │ Total:                  │ │ ││
│  │                                      │  │  │ R$ 1.348,50              │ │ ││
│  │  ┌──────────────────────────────┐   │  │  └─────────────────────────┘ │ ││
│  │  │  [IMG]  Capinha Xiaomi      │   │  │                             │ ││
│  │  │         Redmi Note 13        │   │  │  ┌─────────────────────────┐ │ ││
│  │  │         R$ 59,90             │   │  │  │ ❌ Estoque insuficiente │ │ ││
│  │  │         Estoque: 20          │   │  │  │ Disponível: 10 un       │ │ ││
│  │  │      [ SELECIONAR ]          │   │  │  └─────────────────────────┘ │ ││
│  │  └──────────────────────────────┘   │  │                             │ ││
│  │                                      │  │  ┌─────────────────────────┐ │ ││
│  │                                      │  │  │                         │ │ ││
│  │                                      │  │  │    [ TENTAR NOVAMENTE ]  │ │ ││
│  │                                      │  │  │                         │ │ ││
│  │                                      │  └─────────────────────────────┘ ││
│  └──────────────────────────────────────┴─────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Imagens dos Produtos (Referência Visual)

### Produto 1: Capinha iPhone 15 Pro Max
![Capinha iPhone 15 Pro Max](https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop)
- **Preço**: R$ 89,90
- **Estoque**: 10 unidades
- **Referência**: https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop

### Produto 2: Capinha Samsung Galaxy S24
![Capinha Samsung Galaxy S24](https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop)
- **Preço**: R$ 79,90
- **Estoque**: 15 unidades
- **Referência**: https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop

### Produto 3: Capinha iPhone 14
![Capinha iPhone 14](https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop)
- **Preço**: R$ 69,90
- **Estoque**: 8 unidades
- **Referência**: https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop

### Produto 4: Capinha Xiaomi Redmi Note 13
![Capinha Xiaomi Redmi Note 13](https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop)
- **Preço**: R$ 59,90
- **Estoque**: 20 unidades
- **Referência**: https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop

---

## Componentes React Sugeridos

### Estrutura de Componentes

```
TelaCheckout (organism)
├── Cabecalho (molecule)
│   └── Logo (atom)
├── ConteudoPrincipal (molecule)
│   ├── ListaProdutos (organism)
│   │   └── GridProdutos (molecule)
│   │       └── CardProduto (molecule)
│   │           ├── ImagemProduto (atom)
│   │           ├── NomeProduto (atom)
│   │           ├── PrecoProduto (atom)
│   │           ├── EstoqueProduto (atom)
│   │           └── BotaoSelecionar (atom)
│   └── SidebarCheckout (organism)
│       ├── CabecalhoSidebar (molecule)
│       ├── ProdutoSelecionado (molecule)
│       │   ├── NomeProduto (atom)
│       │   └── ImagemPequena (atom)
│       ├── ControleQuantidade (molecule)
│       │   ├── CampoNumero (atom)
│       │   ├── BotaoIncrementar (atom)
│       │   └── BotaoDecrementar (atom)
│       ├── ResumoValores (molecule)
│       │   ├── LinhaResumo (atom)
│       │   └── Total (atom)
│       ├── BotaoFinalizar (atom)
│       ├── IndicadorCarregamento (atom)
│       └── MensagemFeedback (molecule)
│           ├── MensagemSucesso (atom)
│           └── MensagemErro (atom)
```

---

## Paleta de Cores Sugerida

- **Primária**: #2563eb (Azul)
- **Secundária**: #f1f5f9 (Cinza claro - fundo sidebar)
- **Sucesso**: #10b981 (Verde)
- **Erro**: #ef4444 (Vermelho)
- **Fundo principal**: #ffffff (Branco)
- **Fundo cards**: #f8fafc (Cinza muito claro)
- **Texto**: #1e293b (Cinza escuro)
- **Texto secundário**: #64748b (Cinza médio)
- **Borda**: #e2e8f0 (Cinza médio)
- **Card selecionado**: #dbeafe (Azul claro)

---

## Responsividade

### Desktop (> 1024px)
- Layout em duas colunas: 60% produtos / 40% sidebar
- Grid de produtos: 2 colunas
- Sidebar fixa à direita

### Tablet (768px - 1024px)
- Layout em duas colunas: 50% produtos / 50% sidebar
- Grid de produtos: 2 colunas
- Sidebar responsiva

### Mobile (< 768px)
- Layout em uma coluna
- Grid de produtos: 1 coluna
- Sidebar posicionada abaixo dos produtos (sticky)
- Botões com altura maior para toque facilitado

---

## Layout Mobile

### Estado: Processando (Mobile)

```
┌─────────────────────────────────────┐
│      CaseCellShop                   │
│      📱 Capinhas                     │
├─────────────────────────────────────┤
│                                     │
│  PRODUTOS DISPONÍVEIS              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ✅ [IMG] Capinha iPhone 15  │   │
│  │      Pro Max                │   │
│  │      R$ 89,90               │   │
│  │      Estoque: 10            │   │
│  │   [ SELECIONADO ]           │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [IMG] Capinha Samsung      │   │
│  │      Galaxy S24             │   │
│  │      R$ 79,90               │   │
│  │      Estoque: 15            │   │
│  │   [ SELECIONAR ]            │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [IMG] Capinha iPhone 14   │   │
│  │      R$ 69,90               │   │
│  │      Estoque: 8             │   │
│  │   [ SELECIONAR ]            │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [IMG] Capinha Xiaomi      │   │
│  │      Redmi Note 13          │   │
│  │      R$ 59,90               │   │
│  │      Estoque: 20            │   │
│  │   [ SELECIONAR ]            │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │      PROCESSANDO COMPRA     │   │
│  │                             │   │
│  │  ⏳ Processando...          │   │
│  │  (aprox. 3 segundos)        │   │
│  │                             │   │
│  │  Etapas:                    │   │
│  │  ✅ Produto selecionado     │   │
│  │  ✅ Quantidade: 1           │   │
│  │  ⏳ Validando estoque...     │   │
│  │  ⬜ Processando compra      │   │
│  │  ⬜ Confirmação             │   │
│  │                             │   │
│  │  ████████████░░░░░░░░░  40%│   │
│  │                             │   │
│  │  Produto: Capinha iPhone    │   │
│  │  15 Pro Max                 │   │
│  │  Total: R$ 89,90            │   │
│  │                             │   │
│  │  [ CANCELAR ]               │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Estado: Sucesso (Mobile)

```
┌─────────────────────────────────────┐
│      CaseCellShop                   │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │      ✅ COMPRA REALIZADA!    │   │
│  │                             │   │
│  │  Sua compra foi processada  │   │
│  │  com sucesso!               │   │
│  │                             │   │
│  │  Produto: Capinha iPhone    │   │
│  │  15 Pro Max                 │   │
│  │  Quantidade: 1 unidade      │   │
│  │  Total pago: R$ 89,90       │   │
│  │                             │   │
│  │  [ NOVA COMPRA ]            │   │
│  └─────────────────────────────┘   │
│                                     │
│  PRODUTOS DISPONÍVEIS              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [IMG] Capinha iPhone 15    │   │
│  │      Pro Max                │   │
│  │      R$ 89,90               │   │
│  │      Estoque: 9             │   │
│  │   [ SELECIONAR ]            │   │
│  └─────────────────────────────┘   │
│                                     │
│  [outros cards...]                 │
│                                     │
└─────────────────────────────────────┘
```

### Estado: Erro (Mobile)

```
┌─────────────────────────────────────┐
│      CaseCellShop                   │
├─────────────────────────────────────┤
│                                     │
│  PRODUTO SELECIONADO               │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ✅ [IMG] Capinha iPhone 15  │   │
│  │      Pro Max                │   │
│  │      R$ 89,90               │   │
│  │      Estoque: 10            │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Quantidade:                │   │
│  │  [  15  ]                   │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  ❌ Estoque insuficiente    │   │
│  │  Disponível: 10 un         │   │
│  │                             │   │
│  │  [ TENTAR NOVAMENTE ]       │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## Estados da Aplicação

| Estado | Descrição | Ações |
|--------|-----------|--------|
| `idle` | Tela pronta, nenhum produto selecionado | Cards sem seleção, sidebar vazia |
| `produto_selecionado` | Produto escolhido, quantidade definida | Card destacado, sidebar preenchida |
| `loading` | Processando compra | Botão desabilitado, spinner visível |
| `success` | Compra realizada | Sidebar mostra sucesso, estoque atualizado |
| `error` | Erro na compra | Sidebar mostra erro, permite correção |

---

## Interação com API

### Requisição POST /checkout

```json
{
  "produtoId": "1",
  "quantidade": 1
}
```

### Resposta de Sucesso (200)

```json
{
  "sucesso": true,
  "mensagem": "Compra realizada com sucesso",
  "compra": {
    "id": "cmp-123",
    "produto": {
      "id": "1",
      "nome": "Capinha iPhone 15 Pro Max",
      "preco": 89.90
    },
    "quantidade": 1,
    "total": 89.90
  }
}
```

### Resposta de Erro (400/404/500)

```json
{
  "sucesso": false,
  "mensagem": "Estoque insuficiente",
  "erro": "ESTOQUE_INSUFICIENTE"
}
```

---

## Diferenças da Versão 1

| Aspecto | Versão 1 | Versão 2 |
|---------|----------|----------|
| Seleção de produto | Dropdown | Cards visuais |
| Layout | Uma coluna central | Duas colunas (produtos + sidebar) |
| Visualização | Apenas texto | Imagens dos produtos |
| Resumo | Integrado no formulário | Sidebar dedicada |
| Feedback de processamento | Texto simples | Barra de progresso + etapas + tempo estimado |
| Cancelar durante processamento | Não | Sim |
| Experiência | Focado em funcionalidade | Focado em visual + funcionalidade |
| Mobile | Simples | Layout mobile otimizado com feedback visível |
