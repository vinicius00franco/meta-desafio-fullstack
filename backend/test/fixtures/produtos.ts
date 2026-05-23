import { IProduto } from '../../models/IProduto';

export const PRODUTOS_FIXTURE: IProduto[] = [
  {
    id: 'prod-1',
    nome: 'Capinha iPhone 15',
    preco: 49.90,
    estoque: 10,
  },
  {
    id: 'prod-2',
    nome: 'Capinha Samsung S24',
    preco: 39.90,
    estoque: 5,
  },
  {
    id: 'prod-3',
    nome: 'Capinha iPhone 14',
    preco: 44.90,
    estoque: 3,
  },
  {
    id: 'prod-4',
    nome: 'Capinha iPhone 13',
    preco: 34.90,
    estoque: 10,
  },
  {
    id: 'prod-5',
    nome: 'Capinha iPhone 10',
    preco: 19.90,
    estoque: 10,
  },
  {
    id: 'prod-6',
    nome: 'Capinha iPhone 12',
    preco: 29.90,
    estoque: 10,
  },
  {
    id: 'prod-7',
    nome: 'Capinha iPhone 11',
    preco: 24.90,
    estoque: 100,
  },
];

export const CENARIOS_CHECKOUT = {
  SUCESSO: {
    produtoId: 'prod-1',
    quantidade: 2,
    valorEsperado: 99.80,
    estoqueEsperado: 8,
  },
  ESTOQUE_EXATO: {
    produtoId: 'prod-2',
    quantidade: 5,
    valorEsperado: 199.50,
    estoqueEsperado: 0,
  },
  ESTOQUE_INSUFICIENTE: {
    produtoId: 'prod-3',
    quantidade: 5,
    estoqueDisponivel: 3,
  },
  PRODUTO_NAO_ENCONTRADO: {
    produtoId: 'prod-999',
    quantidade: 1,
  },
  QUANTIDADE_INVALIDA: {
    produtoId: 'prod-6',
    quantidade: -1,
  },
  QUANTIDADE_ZERO: {
    produtoId: 'prod-6',
    quantidade: 0,
  },
  QUANTIDADE_MAXIMA_EXCEDIDA: {
    produtoId: 'prod-7',
    quantidade: 15,
    quantidadeMaxima: 10,
  },
  CAMPOS_OBRIGATORIOS: {
    produtoId: '',
    quantidade: 0,
  },
};
