# Cenário: Indisponibilidade da API

## Descrição
API de checkout está indisponível durante a tentativa de compra.

## Dado (Given)
- Existe um produto "Capilha iPhone 13" com preço R$ 34,90
- O produto possui 10 unidades em estoque
- O usuário está na tela de checkout
- A API de checkout está indisponível (timeout, erro 500, etc)

## Quando (When)
- O usuário informa a quantidade "2"
- O usuário clica no botão "Finalizar Compra"
- A API não responde ou retorna erro 500

## Então (Then)
- A interface exibe mensagem de erro "Serviço indisponível. Tente novamente em instantes."
- A interface desabilita o botão de compra temporariamente
- Após 5 segundos, a interface habilita o botão novamente
- O estoque não é alterado
- A interface sugere ao usuário tentar novamente
