# Cenário: Compra Realizada com Sucesso

## Descrição
Usuário realiza compra de capinha de celular com quantidade válida e estoque disponível.

## Dado (Given)
- Existe um produto "Capinha iPhone 15" com preço R$ 49,90
- O produto possui 10 unidades em estoque
- O usuário está na tela de checkout

## Quando (When)
- O usuário informa a quantidade "2"
- O usuário clica no botão "Finalizar Compra"
- A API processa a solicitação

## Então (Then)
- A API retorna status HTTP 201 (Created)
- A resposta contém o ID da compra
- A resposta contém o valor total calculado (R$ 99,80)
- O estoque do produto é atualizado para 8 unidades
- A interface exibe mensagem "Compra realizada com sucesso!"
- A interface mostra o resumo da compra
