# Cenário: Campos Obrigatórios Ausentes

## Descrição
Usuário tenta finalizar compra sem informar campos obrigatórios.

## Dado (Given)
- Existe um produto "Capilha iPhone 10" com preço R$ 19,90
- O produto possui 10 unidades em estoque
- O usuário está na tela de checkout

## Quando (When)
- O usuário deixa o campo de quantidade vazio
- O usuário clica no botão "Finalizar Compra"
- A API processa a solicitação

## Então (Then)
- A API retorna status HTTP 400 (Bad Request)
- A resposta contém mensagem de erro "Quantidade é obrigatória"
- A interface exibe mensagem de erro "Informe a quantidade desejada"
- O campo de quantidade é destacado em vermelho
- A compra não é processada
- O botão de compra permanece desabilitado até preenchimento
