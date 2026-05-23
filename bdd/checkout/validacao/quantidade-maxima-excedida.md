# Cenário: Quantidade Máxima Excedida

## Descrição
Usuário tenta comprar quantidade acima do limite permitido por pedido.

## Dado (Given)
- Existe um produto "Capilha iPhone 11" com preço R$ 24,90
- O produto possui 100 unidades em estoque
- O sistema permite máximo de 10 unidades por pedido
- O usuário está na tela de checkout

## Quando (When)
- O usuário informa a quantidade "15"
- O usuário clica no botão "Finalizar Compra"
- A API processa a solicitação

## Então (Then)
- A API retorna status HTTP 400 (Bad Request)
- A resposta contém mensagem de erro "Quantidade máxima por pedido é 10"
- A interface exibe mensagem de erro "Quantidade máxima permitida: 10 unidades"
- O campo de quantidade é destacado em vermelho
- A compra não é processada
