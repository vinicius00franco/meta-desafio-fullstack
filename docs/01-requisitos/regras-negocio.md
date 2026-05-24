# Regras de Negócio - CaseCellShop

## Regras de Estoque

| ID | Regra | Descrição | Prioridade |
|----|-------|-----------|------------|
| RN-001 | Estoque mínimo | A quantidade solicitada deve ser maior que zero | Alta |
| RN-002 | Disponibilidade de estoque | A quantidade solicitada não pode exceder o estoque disponível | Alta |
| RN-003 | Atualização de estoque | Estoque deve ser decrementado após compra bem-sucedida | Alta |
| RN-004 | Produto existente | Só é possível comprar produtos cadastrados no sistema | Alta |

## Regras de Validação

| ID | Regra | Descrição | Prioridade |
|----|-------|-----------|------------|
| RN-005 | Validação de quantidade | Quantidade deve ser um número inteiro positivo | Alta |
| RN-006 | Validação de produto ID | ID do produto deve ser válido e existir | Alta |
| RN-007 | Prevenção de compra duplicada | Não permitir múltiplas requisições simultâneas do mesmo usuário | Média |

## Regras de Processamento

| ID | Regra | Descrição | Prioridade |
|----|-------|-----------|------------|
| RN-008 | Timeout de processamento | Requisição deve ter timeout configurado para evitar travamentos | Média |
| RN-009 | Tratamento de erro | Erros devem ser capturados e retornados com mensagem compreensível | Alta |
| RN-010 | Idempotência | Requisições duplicadas não devem processar a compra duas vezes | Média |

## Regras de Interface

| ID | Regra | Descrição | Prioridade |
|----|-------|-----------|------------|
| RN-011 | Feedback de processamento | Usuário deve ser informado quando compra estiver em andamento | Alta |
| RN-012 | Prevenção de ação duplicada | Botão de compra deve ser desabilitado durante processamento | Alta |
| RN-013 | Mensagem de sucesso | Usuário deve receber confirmação clara quando compra for bem-sucedida | Alta |
| RN-014 | Mensagem de erro | Usuário deve receber mensagem clara e explicativa em caso de falha | Alta |

## Regras de Dados

| ID | Regra | Descrição | Prioridade |
|----|-------|-----------|------------|
| RN-015 | Modelo de Produto | Produto deve ter: id, nome, preco, estoque | Alta |
| RN-016 | Dados em memória | Sistema deve usar dados em memória (sem banco persistente) | Média |
| RN-017 | Dados de exemplo | Sistema deve iniciar com produtos de exemplo para teste | Média |
