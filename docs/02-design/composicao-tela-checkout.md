# Composição Visual - Tela de Checkout

## Visão Geral

Tela única de checkout para compra de capinhas de celular, seguindo os requisitos funcionais do projeto CaseCellShop.

---

## Layout Principal

```
┌─────────────────────────────────────────────────────────────┐
│                    CaseCellShop                              │
│                     📱 Capinhas                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            SELECIONAR PRODUTO                        │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │ ▼ Capinha iPhone 15 Pro Max - R$ 89,90      │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                       │   │
│  │  [Capinha iPhone 15 Pro Max - R$ 89,90 (10 un)]     │   │
│  │  [Capinha Samsung Galaxy S24 - R$ 79,90 (15 un)]    │   │
│  │  [Capinha iPhone 14 - R$ 69,90 (8 un)]             │   │
│  │  [Capinha Xiaomi Redmi Note 13 - R$ 59,90 (20 un)] │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            QUANTIDADE                                │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │  [  1  ]                                      │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │  Estoque disponível: 10 unidades                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            RESUMO                                    │   │
│  │  Produto: Capinha iPhone 15 Pro Max                  │   │
│  │  Preço unitário: R$ 89,90                           │   │
│  │  Quantidade: 1                                       │   │
│  │  ────────────────────────────────────────          │   │
│  │  TOTAL: R$ 89,90                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                       │   │
│  │              [ COMPRAR AGORA ]                        │   │
│  │                                                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Estado: Carregando

```
┌─────────────────────────────────────────────────────────────┐
│                    CaseCellShop                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            SELECIONAR PRODUTO                        │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │ ▼ Capinha iPhone 15 Pro Max - R$ 89,90      │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            QUANTIDADE                                │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │  [  1  ]                                      │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                       │   │
│  │            ⏳ PROCESSANDO...                          │   │
│  │                                                       │   │
│  │              [ COMPRAR AGORA ]                        │   │
│  │              (desabilitado)                           │   │
│  │                                                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Estado: Sucesso

```
┌─────────────────────────────────────────────────────────────┐
│                    CaseCellShop                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                       │   │
│  │              ✅ COMPRA REALIZADA!                     │   │
│  │                                                       │   │
│  │  Sua compra foi processada com sucesso.              │   │
│  │  Produto: Capinha iPhone 15 Pro Max                  │   │
│  │  Quantidade: 1 unidade                               │   │
│  │  Total: R$ 89,90                                     │   │
│  │                                                       │   │
│  │              [ NOVA COMPRA ]                          │   │
│  │                                                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Estado: Erro

```
┌─────────────────────────────────────────────────────────────┐
│                    CaseCellShop                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            SELECIONAR PRODUTO                        │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │ ▼ Capinha iPhone 15 Pro Max - R$ 89,90      │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            QUANTIDADE                                │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │  [  15  ]                                     │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                       │   │
│  │              ❌ ERRO NA COMPRA                        │   │
│  │                                                       │   │
│  │  Estoque insuficiente. Disponível: 10 unidades.     │   │
│  │                                                       │   │
│  │              [ TENTAR NOVAMENTE ]                     │   │
│  │                                                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Imagens dos Produtos (Referência Visual)

### Produto 1: Capinha iPhone 15 Pro Max
![Capinha iPhone 15 Pro Max](https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop)
- **Preço**: R$ 89,90
- **Estoque**: 10 unidades
- **Referência**: https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop

### Produto 2: Capinha Samsung Galaxy S24
![Capinha Samsung Galaxy S24](https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop)
- **Preço**: R$ 79,90
- **Estoque**: 15 unidades
- **Referência**: https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop

### Produto 3: Capinha iPhone 14
![Capinha iPhone 14](https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop)
- **Preço**: R$ 69,90
- **Estoque**: 8 unidades
- **Referência**: https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop

### Produto 4: Capinha Xiaomi Redmi Note 13
![Capinha Xiaomi Redmi Note 13](https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop)
- **Preço**: R$ 59,90
- **Estoque**: 20 unidades
- **Referência**: https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop

---

## Componentes React Sugeridos

### Estrutura de Componentes

```
TelaCheckout (organism)
├── Cabecalho (molecule)
│   └── Logo (atom)
├── FormularioCheckout (molecule)
│   ├── SelecaoProduto (molecule)
│   │   ├── Dropdown (atom)
│   │   └── ListaProdutos (molecule)
│   │       └── CardProduto (molecule)
│   │           └── ImagemProduto (atom)
│   ├── InputQuantidade (molecule)
│   │   ├── CampoNumero (atom)
│   │   └── LabelEstoque (atom)
│   ├── ResumoCompra (molecule)
│   │   ├── LinhaResumo (atom)
│   │   └── Total (atom)
│   └── BotaoComprar (atom)
├── IndicadorCarregamento (atom)
└── MensagemFeedback (molecule)
    ├── MensagemSucesso (atom)
    └── MensagemErro (atom)
```

---

## Paleta de Cores Sugerida

- **Primária**: #2563eb (Azul)
- **Sucesso**: #10b981 (Verde)
- **Erro**: #ef4444 (Vermelho)
- **Fundo**: #f8fafc (Cinza claro)
- **Texto**: #1e293b (Cinza escuro)
- **Borda**: #e2e8f0 (Cinza médio)

---

## Responsividade

### Desktop (> 768px)
- Layout centralizado com largura máxima de 600px
- Imagens dos produtos visíveis no dropdown

### Mobile (< 768px)
- Layout em tela cheia
- Imagens dos produtos ocultas no dropdown (apenas texto)
- Botões com altura maior para toque facilitado

---

## Estados da Aplicação

| Estado | Descrição | Ações |
|--------|-----------|--------|
| `idle` | Tela pronta para uso | Habilitar botão de compra |
| `loading` | Processando compra | Desabilitar botão, mostrar spinner |
| `success` | Compra realizada | Mostrar mensagem de sucesso, botão "Nova Compra" |
| `error` | Erro na compra | Mostrar mensagem de erro, manter botão habilitado |

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
