import { IProduto } from '../models/IProduto';

export interface IPaginacao {
  pagina: number;
  limite: number;
  total: number;
  totalPaginas: number;
}

export interface IListarProdutosResponse {
  produtos: IProduto[];
  paginacao: IPaginacao;
}
