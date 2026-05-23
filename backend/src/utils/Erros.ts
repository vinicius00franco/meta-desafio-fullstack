export class ErroValidacao extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = 'ErroValidacao';
  }
}

export class ErroProdutoNaoEncontrado extends Error {
  constructor(mensagem: string = 'Produto não encontrado') {
    super(mensagem);
    this.name = 'ErroProdutoNaoEncontrado';
  }
}

export class ErroEstoqueInsuficiente extends Error {
  constructor(mensagem: string, public estoqueDisponivel: number) {
    super(mensagem);
    this.name = 'ErroEstoqueInsuficiente';
  }
}
