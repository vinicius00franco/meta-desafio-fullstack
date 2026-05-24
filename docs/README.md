# Documentação - CaseCellShop

Esta pasta contém toda a documentação técnica e de design do sistema de checkout da CaseCellShop.

## Estrutura de Documentação

```
docs/
├── 01-requisitos/          # Requisitos do sistema
├── 02-design/              # Design visual e composição de telas
├── 03-analise/             # Análises de UX/UI e arquitetura
├── 04-relatorios/          # Relatórios de testes e validações
├── 05-arquitetura/         # Documentação técnica de arquitetura
└── README.md               # Este arquivo
```

## Conteúdo por Categoria

### 01-requisitos/
Documentos que definem o que o sistema deve fazer:
- **requisitos-funcionais.md**: Requisitos funcionais (RF-001 a RF-023)
- **requisitos-nao-funcionais.md**: Requisitos não funcionais (RNF-001 a RNF-027)
- **regras-negocio.md**: Regras de negócio (RN-001 a RN-017)

### 02-design/
Documentos de design visual e composição de interface:
- **composicao-tela-checkout.md**: Composição visual da tela de checkout (versão 1)
- **composicao-tela-checkout-v2.md**: Composição visual da tela de checkout (versão 2 - layout em duas colunas)

### 03-analise/
Análises técnicas e de UX/UI realizadas durante o desenvolvimento:
- **analise-ui-ux-versao2.md**: Análise de UX/UI da versão 2 (contexto CaseCellShop)
- **analise-senior-frontend-ux-v2.md**: Análise senior de frontend e UX (versão 2)

### 04-relatorios/
Relatórios de testes e validações realizadas:
- **relatorio-teste-ux-ui-checkout.md**: Relatório de teste UX/UI da tela de checkout (v2)

### 05-arquitetura/
Documentação técnica de arquitetura do sistema:
- **documentacao.md**: Documentação técnica completa (arquitetura, modelos, endpoints, fluxos)

## Ordem de Leitura Sugerida

Para novos desenvolvedores ou revisores do projeto:

1. **Comece pelos requisitos**: `01-requisitos/`
   - Entenda o que o sistema deve fazer
   - Conheça as regras de negócio

2. **Revise o design**: `02-design/`
   - Veja a composição visual da tela de checkout v2 (versão atual)

3. **Consulte as análises**: `03-analise/`
   - Entenda as decisões de design e UX
   - Conheça os pontos de melhoria identificados

4. **Verifique os relatórios**: `04-relatorios/`
   - Confirme que as correções foram implementadas
   - Veja a pontuação de qualidade atual

5. **Estude a arquitetura**: `05-arquitetura/`
   - Entenda a estrutura técnica do sistema
   - Conheça os endpoints e modelos de dados

## Versão Atual

O sistema está na **versão 2** do design de checkout, caracterizada por:
- Layout em duas colunas (produtos à esquerda, carrinho à direita)
- Cards de produtos visuais com imagens
- Sidebar de carrinho sempre visível
- Feedback de processamento melhorado
- Responsividade completa (desktop, tablet, mobile)

## Status do Projeto

- ✅ Backend implementado (Sprints 1 e 2)
- ✅ Frontend implementado (Sprints 1 e 2)
- ✅ Testes backend funcionando
- ✅ Testes frontend configurados
- ✅ Documentação completa
- ✅ Pontuação UX/UI: 9.4/10 (após correções)

## Documentação Externa

Documentação adicional fora desta pasta:
- `PROJECT.md`: Documentação geral do projeto (raiz do repositório)
- `backend/README.md`: Documentação específica do backend
- `backend/PROMPTS.md`: Decisões e trade-offs do backend
- `frontend/README.md`: Documentação específica do frontend
- `frontend/PROMPTS.md`: Decisões e trade-offs do frontend
- `plans/`: Planos de implementação (backend e frontend)
- `bdd/`: Cenários BDD para testes
