export const PRODUTOS_FIXTURE = {
  IPHONE_15: {
    id: 'prod-1',
    nome: 'Capinha iPhone 15',
    preco: 49.90,
    estoque: 10,
  },
  SAMSUNG_S24: {
    id: 'prod-2',
    nome: 'Capinha Samsung S24',
    preco: 39.90,
    estoque: 5,
  },
  IPHONE_14: {
    id: 'prod-3',
    nome: 'Capinha iPhone 14',
    preco: 44.90,
    estoque: 3,
  },
};

export const CENARIOS_CHECKOUT = {
  SUCESSO: {
    produto: PRODUTOS_FIXTURE.IPHONE_15,
    quantidade: 2,
    valorTotal: 99.80,
  },
  ESTOQUE_EXATO: {
    produto: PRODUTOS_FIXTURE.SAMSUNG_S24,
    quantidade: 5,
    valorTotal: 199.50,
  },
  ESTOQUE_INSUFICIENTE: {
    produto: PRODUTOS_FIXTURE.IPHONE_14,
    quantidade: 5,
    estoqueDisponivel: 3,
  },
  QUANTIDADE_INVALIDA: {
    quantidade: -1,
  },
  QUANTIDADE_ZERO: {
    quantidade: 0,
  },
  QUANTIDADE_MAXIMA_EXCEDIDA: {
    quantidade: 15,
  },
};
