# Cenário: Produto Não Informado

## Descrição
Usuário tenta finalizar compra sem selecionar um produto.

## Dado (Given)
- O catálogo possui vários produtos disponíveis
- O usuário está na tela de checkout

## Quando (When)
- O usuário não seleciona nenhum produto
- O usuário informa a quantidade "1"
- O usuário clica no botão "Finalizar Compra"
- A API processa a solicitação

## Então (Then)
- A API retorna status HTTP 400 (Bad Request)
- A resposta contém mensagem de erro "Produto é obrigatório"
- A interface exibe mensagem de erro "Selecione um produto para continuar"
- O campo de seleção de produto é destacado em vermelho
- A compra não é processada
