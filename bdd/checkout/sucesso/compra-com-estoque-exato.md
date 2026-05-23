# Cenário: Compra com Estoque Exato

## Descrição
Usuário compra exatamente a quantidade disponível em estoque.

## Dado (Given)
- Existe um produto "Capinha Samsung S24" com preço R$ 39,90
- O produto possui 5 unidades em estoque
- O usuário está na tela de checkout

## Quando (When)
- O usuário informa a quantidade "5"
- O usuário clica no botão "Finalizar Compra"
- A API processa a solicitação

## Então (Then)
- A API retorna status HTTP 201 (Created)
- A resposta contém o ID da compra
- A resposta contém o valor total calculado (R$ 199,50)
- O estoque do produto é atualizado para 0 unidades
- A interface exibe mensagem "Compra realizada com sucesso!"
- O produto é marcado como esgotado
