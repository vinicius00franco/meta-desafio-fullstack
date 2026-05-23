# Cenário: Produto Não Encontrado

## Descrição
Usuário tenta comprar um produto que não existe no catálogo.

## Dado (Given)
- O catálogo não possui o produto solicitado
- O usuário está na tela de checkout

## Quando (When)
- O usuário informa o ID de produto inexistente "prod-999"
- O usuário informa a quantidade "1"
- O usuário clica no botão "Finalizar Compra"
- A API processa a solicitação

## Então (Then)
- A API retorna status HTTP 404 (Not Found)
- A resposta contém mensagem de erro "Produto não encontrado"
- A interface exibe mensagem de erro "Produto não encontrado ou indisponível"
- A interface redireciona para a página de produtos
