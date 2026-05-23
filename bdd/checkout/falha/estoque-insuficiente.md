# Cenário: Estoque Insuficiente

## Descrição
Usuário tenta comprar quantidade maior que o estoque disponível.

## Dado (Given)
- Existe um produto "Capilha iPhone 14" com preço R$ 44,90
- O produto possui 3 unidades em estoque
- O usuário está na tela de checkout

## Quando (When)
- O usuário informa a quantidade "5"
- O usuário clica no botão "Finalizar Compra"
- A API processa a solicitação

## Então (Then)
- A API retorna status HTTP 400 (Bad Request)
- A resposta contém mensagem de erro "Estoque insuficiente"
- A resposta informa a quantidade disponível (3)
- O estoque não é alterado
- A interface exibe mensagem de erro "Quantidade solicitada maior que o estoque disponível (3 unidades)"
- A interface mantém o produto disponível para nova tentativa
