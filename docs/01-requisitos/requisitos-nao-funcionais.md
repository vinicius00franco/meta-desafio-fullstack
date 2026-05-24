# Requisitos Não Funcionais - CaseCellShop

## Performance

| ID | Requisito | Descrição | Métrica/Alvo | Prioridade |
|----|-----------|-----------|--------------|------------|
| RNF-001 | Tempo de resposta da API | Endpoint /checkout deve responder rapidamente | < 500ms para cenário de sucesso | Média |
| RNF-002 | Tempo de carregamento da tela | Tela de checkout deve carregar rapidamente | < 2s para renderização inicial | Média |
| RNF-003 | Timeout de requisição | Requisições devem ter timeout configurado | 10s máximo de espera | Alta |

## Usabilidade

| ID | Requisito | Descrição | Métrica/Alvo | Prioridade |
|----|-----------|-----------|--------------|------------|
| RNF-004 | Clareza de mensagens | Mensagens de erro devem ser compreensíveis | Usuário entende o problema sem suporte | Alta |
| RNF-005 | Feedback visual | Sistema deve indicar estado de processamento | Usuário sabe quando operação está em andamento | Alta |
| RNF-006 | Prevenção de erros | Interface deve evitar ações inválidas | Validações no front-end antes de enviar | Alta |

## Confiabilidade

| ID | Requisito | Descrição | Métrica/Alvo | Prioridade |
|----|-----------|-----------|--------------|------------|
| RNF-007 | Tratamento de erros | Sistema deve capturar e tratar erros gracefulmente | Nenhuma exceção não tratada | Alta |
| RNF-008 | Consistência de dados | Estoque deve ser atualizado atomicamente | Não há condições de corrida | Alta |
| RNF-009 | Resiliência a falhas | Sistema deve lidar com indisponibilidade da API | Mensagem de erro clara ao usuário | Alta |

## Manutenibilidade

| ID | Requisito | Descrição | Métrica/Alvo | Prioridade |
|----|-----------|-----------|--------------|------------|
| RNF-010 | Código organizado | Código deve seguir estrutura clara | Pastas e arquivos bem organizados | Alta |
| RNF-011 | Nomes descritivos | Variáveis, funções e classes devem ter nomes claros | Nomes em Português, termos do negócio | Alta |
| RNF-012 | Comentários | Código complexo deve ter comentários explicativos | Comentários em Português | Média |
| RNF-013 | README completo | Projeto deve ter README com instruções | Como rodar, dependências, estrutura | Alta |

## Testabilidade

| ID | Requisito | Descrição | Métrica/Alvo | Prioridade |
|----|-----------|-----------|--------------|------------|
| RNF-014 | Testes automatizados | Sistema deve ter testes automatizados | Cobertura de cenários principais | Média |
| RNF-015 | Testes de API | Endpoint /checkout deve ter testes | Testes de sucesso e erro | Média |
| RNF-016 | Testes de componente | Componente de checkout deve ter testes | Testes de interação e renderização | Média |

## Portabilidade

| ID | Requisito | Descrição | Métrica/Alvo | Prioridade |
|----|-----------|-----------|--------------|------------|
| RNF-017 | Independência de banco | Sistema não deve depender de banco persistente | Dados em memória | Alta |
| RNF-018 | Sem dependências externas | Sistema não deve depender de serviços externos | Tudo local/mockado | Alta |
| RNF-019 | Cross-platform | Sistema deve rodar em diferentes OS | Funciona em Windows, Linux, macOS | Baixa |

## Segurança

| ID | Requisito | Descrição | Métrica/Alvo | Prioridade |
|----|-----------|-----------|--------------|------------|
| RNF-020 | Validação de entrada | Sistema deve validar todas as entradas | Nenhum dado não validado processado | Alta |
| RNF-021 | Sanitização de dados | Dados de entrada devem ser sanitizados | Prevenção de injeção de código | Média |
| RNF-022 | Sem autenticação necessária | Sistema não requer autenticação (escopo do desafio | Aceita requisições sem auth | Baixa |

## Escalabilidade

| ID | Requisito | Descrição | Métrica/Alvo | Prioridade |
|----|-----------|-----------|--------------|------------|
| RNF-023 | Arquitetura simples | Sistema deve ter arquitetura simples e desacoplada | Separação clara front/back | Média |
| RNF-024 | Dados em memória | Sistema usa dados em memória (não escalável por design) | Aceitável para escopo do desafio | Baixa |

## Compatibilidade

| ID | Requisito | Descrição | Métrica/Alvo | Prioridade |
|----|-----------|-----------|--------------|------------|
| RNF-025 | TypeScript | Código deve usar TypeScript | Tipagem estática em todo o código | Alta |
| RNF-026 | Versão do Node | Sistema deve especificar versão do Node | package.json com engines | Média |
| RNF-027 | Navegadores modernos | Front-end deve funcionar em navegadores modernos | Chrome, Firefox, Edge, Safari | Média |
