# Seletores E2E - CaseCellShop Frontend

Este documento lista todos os seletores `data-testid` adicionados aos componentes para facilitar os testes e2e com foco no comportamento esperado.

## Estrutura de Seletores

Os seletores seguem o padrão `data-testid` e são nomeados em Português, usando termos do domínio do negócio.

## Componentes e Seletores

### Cabecalho
- `cabecalho` - Container do cabeçalho
- `input-pesquisa` - Campo de busca de produtos
- `botao-abrir-carrinho` - Botão para abrir/fechar o carrinho
- `badge-quantidade-itens` - Badge com quantidade de itens no carrinho

### ListaProdutos
- `lista-produtos` - Container da lista de produtos
- `grid-produtos` - Grid com os cards de produtos

### CardProduto
- `card-produto-{id}` - Card do produto específico (ex: `card-produto-1`)
- `botao-diminuir-quantidade-{id}` - Botão para diminuir quantidade no card
- `quantidade-exibida-{id}` - Quantidade exibida no card
- `botao-aumentar-quantidade-{id}` - Botão para aumentar quantidade no card
- `botao-adicionar-{id}` - Botão para adicionar produto ao carrinho

### SidebarCheckout
#### Estados
- `sidebar-carrinho` - Sidebar no estado inicial
- `sidebar-processando` - Sidebar no estado de processamento
- `sidebar-sucesso` - Sidebar no estado de sucesso
- `sidebar-erro` - Sidebar no estado de erro

#### Controles Gerais
- `botao-fechar-carrinho` - Botão para fechar o carrinho
- `mensagem-carrinho-vazio` - Mensagem quando carrinho está vazio
- `lista-itens-carrinho` - Lista de itens no carrinho
- `total-carrinho` - Container do total do carrinho
- `valor-total-carrinho` - Valor total do carrinho
- `botao-finalizar-compra` - Botão para finalizar a compra

#### Itens do Carrinho
- `item-carrinho-{id}` - Item específico no carrinho (ex: `item-carrinho-1`)
- `botao-diminuir-item-{id}` - Botão para diminuir quantidade do item
- `quantidade-item-{id}` - Quantidade do item no carrinho
- `botao-aumentar-item-{id}` - Botão para aumentar quantidade do item
- `botao-remover-item-{id}` - Botão para remover item do carrinho

### InfoCarrinho
- `campo-produto-selecionado` - Campo do produto selecionado
- `valor-produto-selecionado` - Valor do produto selecionado
- `campo-quantidade` - Campo da quantidade
- `valor-quantidade` - Valor da quantidade
- `campo-preco-unitario` - Campo do preço unitário
- `valor-preco-unitario` - Valor do preço unitário
- `campo-subtotal` - Campo do subtotal
- `valor-subtotal` - Valor do subtotal
- `campo-total` - Campo do total
- `valor-total` - Valor do total

### EstadoProcessando
- `estado-processando` - Container do estado de processamento
- `botao-cancelar-compra` - Botão para cancelar a compra

### EstadoSucesso
- `estado-sucesso` - Container do estado de sucesso
- `valor-total-pago` - Valor total pago na compra
- `botao-nova-compra` - Botão para iniciar nova compra

### EstadoErro
- `estado-erro` - Container do estado de erro
- `valor-total-erro` - Valor total no estado de erro
- `mensagem-erro` - Mensagem de erro
- `botao-tentar-novamente` - Botão para tentar novamente

### EstadoCarregando
- `estado-carregando` - Container do estado de carregamento

### Componentes de Formulário (Já existentes)
- `produto-select` - Select de produtos
- `quantidade-input` - Input de quantidade
- `botao-comprar` - Botão de comprar
- `toast-feedback` - Container do toast de feedback
- `toast-fechar` - Botão para fechar o toast

## Exemplos de Uso em Testes E2E

### Selecionar Produto
```typescript
await page.getByTestId('card-produto-1').click();
await page.getByTestId('botao-adicionar-1').click();
```

### Verificar Carrinho
```typescript
await page.getByTestId('botao-abrir-carrinho').click();
await expect(page.getByTestId('sidebar-carrinho')).toBeVisible();
await expect(page.getByTestId('item-carrinho-1')).toBeVisible();
```

### Verificar Estado de Sucesso
```typescript
await expect(page.getByTestId('sidebar-sucesso')).toBeVisible();
await expect(page.getByTestId('valor-total-pago')).toContainText('R$ 99,90');
```

### Verificar Estado de Erro
```typescript
await expect(page.getByTestId('sidebar-erro')).toBeVisible();
await expect(page.getByTestId('mensagem-erro')).toContainText('Estoque insuficiente');
```

### Verificar Estado de Processamento
```typescript
await expect(page.getByTestId('sidebar-processando')).toBeVisible();
await expect(page.getByTestId('estado-processando')).toBeVisible();
```

## Padrões de Nomenclatura

1. **Componentes**: Nome do componente em minúsculas (ex: `cabecalho`, `lista-produtos`)
2. **Ações**: Prefixo `botao-` + ação (ex: `botao-adicionar`, `botao-finalizar-compra`)
3. **Valores**: Prefixo `valor-` + campo (ex: `valor-total`, `valor-quantidade`)
4. **Estados**: Prefixo `estado-` + estado (ex: `estado-sucesso`, `estado-erro`)
5. **Itens específicos**: Sufixo `-{id}` para identificar item específico (ex: `card-produto-1`, `item-carrinho-2`)

## Benefícios

- **Testes mais robustos**: Seletores estáticos que não dependem de classes CSS
- **Foco no comportamento**: Seletores baseados em funcionalidade, não em implementação
- **Manutenibilidade**: Fácil identificar onde cada seletor é usado
- **Semântica**: Nomes descritivos em Português que refletem o domínio do negócio
