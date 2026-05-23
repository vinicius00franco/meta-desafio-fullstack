# Cenário: Quantidade Inválida

## Descrição
Usuário informa quantidade inválida (negativa, zero ou não numérica).

## Dado (Given)
- Existe um produto "Capilha iPhone 12" com preço R$ 29,90
- O produto possui 10 unidades em estoque
- O usuário está na tela de checkout

## Quando (When)
- O usuário informa a quantidade "-1" (ou "0" ou "abc")
- O usuário clica no botão "Finalizar Compra"
- A API processa a solicitação

## Então (Then)
- A API retorna status HTTP 400 (Bad Request)
- A resposta contém mensagem de erro "Quantidade deve ser maior que zero"
- A interface exibe mensagem de erro "Informe uma quantidade válida (mínimo: 1)"
- O campo de quantidade é destacado em vermelho
- A compra não é processada
