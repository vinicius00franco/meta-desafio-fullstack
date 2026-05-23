export interface IRespostaSucesso<T> {
  sucesso: true;
  dados: T;
  mensagem?: string;
}

export interface IRespostaErro {
  sucesso: false;
  erro: {
    mensagem: string;
    codigo?: string;
    detalhes?: unknown;
  };
}

export type IRespostaPadronizada<T> = IRespostaSucesso<T> | IRespostaErro;

export class RespostaPadronizada {
  static sucesso<T>(dados: T, mensagem?: string, status: number = 200): {
    status: number;
    body: IRespostaSucesso<T>;
  } {
    return {
      status,
      body: {
        sucesso: true,
        dados,
        mensagem,
      },
    };
  }

  static erro(
    mensagem: string,
    status: number = 500,
    codigo?: string,
    detalhes?: unknown
  ): {
    status: number;
    body: IRespostaErro;
  } {
    return {
      status,
      body: {
        sucesso: false,
        erro: {
          mensagem,
          codigo,
          detalhes,
        },
      },
    };
  }

  static erroValidacao(mensagem: string, detalhes?: unknown): {
    status: number;
    body: IRespostaErro;
  } {
    return this.erro(mensagem, 400, 'ERRO_VALIDACAO', detalhes);
  }

  static erroNaoEncontrado(mensagem: string): {
    status: number;
    body: IRespostaErro;
  } {
    return this.erro(mensagem, 404, 'RECURSO_NAO_ENCONTRADO');
  }

  static erroEstoqueInsuficiente(
    mensagem: string,
    estoqueDisponivel: number
  ): {
    status: number;
    body: IRespostaErro;
  } {
    return this.erro(mensagem, 400, 'ESTOQUE_INSUFICIENTE', {
      estoqueDisponivel,
    });
  }

  static erroInterno(mensagem: string = 'Erro interno do servidor'): {
    status: number;
    body: IRespostaErro;
  } {
    return this.erro(mensagem, 500, 'ERRO_INTERNO');
  }
}
