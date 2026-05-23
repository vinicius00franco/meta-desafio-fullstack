export interface IPaginacao {
  pagina: number;
  limite: number;
  total: number;
  totalPaginas: number;
}

export interface IListarProdutosResponse {
  produtos: unknown[];
  paginacao: IPaginacao;
}
