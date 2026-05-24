export const PRODUTOS_FIXTURE = {
  IPHONE_15: {
    id: 1,
    nome: 'Capinha iPhone 15 Pro Max',
    preco: 89.90,
    estoque: 10,
  },
  SAMSUNG_S24: {
    id: 2,
    nome: 'Capinha Samsung Galaxy S24',
    preco: 79.90,
    estoque: 15,
  },
  IPHONE_14: {
    id: 3,
    nome: 'Capinha iPhone 14',
    preco: 69.90,
    estoque: 8,
  },
  IPHONE_11: {
    id: 7,
    nome: 'Capinha iPhone 12',
    preco: 54.90,
    estoque: 25,
  },
};

export const CENARIOS_CHECKOUT = {
  SUCESSO: {
    produto: PRODUTOS_FIXTURE.IPHONE_15,
    quantidade: 2,
    valorTotal: 179.80,
  },
  ESTOQUE_EXATO: {
    produto: PRODUTOS_FIXTURE.SAMSUNG_S24,
    quantidade: 10,
    valorTotal: 799.00,
  },
  ESTOQUE_INSUFICIENTE: {
    produto: PRODUTOS_FIXTURE.IPHONE_14,
    quantidade: 10,
    estoqueDisponivel: 8,
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
