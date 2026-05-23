# Requisitos Funcionais - CaseCellShop

## Back-end

| ID | Requisito | Descrição | Critério de Aceite | Prioridade |
|----|-----------|-----------|-------------------|------------|
| RF-001 | API de compra | Sistema deve fornecer endpoint POST /checkout | Endpoint responde a requisições POST | Alta |
| RF-002 | Receber dados de compra | API deve receber produtoId e quantidade | Request body contém ambos os campos | Alta |
| RF-003 | Validar quantidade positiva | Sistema deve rejeitar quantidade <= 0 | Retorna HTTP 400 com mensagem de erro | Alta |
| RF-004 | Validar produto existente | Sistema deve verificar se produto existe | Retorna HTTP 404 se produto não encontrado | Alta |
| RF-005 | Validar estoque suficiente | Sistema deve verificar se estoque >= quantidade | Retorna HTTP 400 se estoque insuficiente | Alta |
| RF-006 | Processar compra com sucesso | Sistema deve decrementar estoque e retornar sucesso | Retorna HTTP 200 com dados da compra | Alta |
| RF-007 | Retornar erro de servidor | Sistema deve capturar erros inesperados | Retorna HTTP 500 com mensagem de erro | Alta |
| RF-008 | Representar produtos | Sistema deve ter modelo de Produto com id, nome, preco, estoque | Interface TypeScript definida | Alta |
| RF-009 | Armazenar produtos em memória | Sistema deve manter array de produtos em memória | Repositório com dados de exemplo | Alta |

## Front-end

| ID | Requisito | Descrição | Critério de Aceite | Prioridade |
|----|-----------|-----------|-------------------|------------|
| RF-010 | Tela de checkout | Sistema deve exibir tela para iniciar compra | Componente renderizado com campos necessários | Alta |
| RF-011 | Seleção de produto | Usuário deve poder selecionar produto da lista | Dropdown com produtos disponíveis | Alta |
| RF-012 | Input de quantidade | Usuário deve poder informar quantidade desejada | Campo numérico funcional | Alta |
| RF-013 | Botão de compra | Usuário deve ter botão para confirmar compra | Botão dispara requisição à API | Alta |
| RF-014 | Indicador de processamento | Sistema deve mostrar estado de carregamento | Spinner ou texto visível durante requisição | Alta |
| RF-015 | Prevenir ações duplicadas | Sistema deve bloquear múltiplos cliques durante processamento | Botão desabilitado durante requisição | Alta |
| RF-016 | Exibir mensagem de sucesso | Sistema deve mostrar confirmação quando compra for bem-sucedida | Toast ou alert com mensagem positiva | Alta |
| RF-017 | Exibir mensagem de erro | Sistema deve mostrar erro quando compra falhar | Toast ou alert com mensagem explicativa | Alta |
| RF-018 | Listar produtos disponíveis | Sistema deve exibir produtos com nome e preço | Lista renderizada na tela | Alta |
| RF-019 | Exibir estoque disponível | Sistema deve mostrar estoque de cada produto | Quantidade visível ao usuário | Média |

## Integração

| ID | Requisito | Descrição | Critério de Aceite | Prioridade |
|----|-----------|-----------|-------------------|------------|
| RF-020 | Consumir API de checkout | Front-end deve chamar POST /checkout | Requisição HTTP enviada corretamente | Alta |
| RF-021 | Tratar resposta de sucesso | Front-end deve processar HTTP 200 | Exibir mensagem de sucesso | Alta |
| RF-022 | Tratar resposta de erro | Front-end deve processar HTTP 400/404/500 | Exibir mensagem de erro apropriada | Alta |
| RF-023 | Atualizar lista após compra | Front-end deve atualizar estoque exibido após compra | Lista reflete novo estoque | Média |
