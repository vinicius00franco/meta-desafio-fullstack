import { ICarrinhoRequest } from '../dtos/ICarrinhoRequest';
import { ICarrinhoResponse } from '../dtos/ICarrinhoResponse';

export interface ICarrinhoService {
  processarCarrinho(request: ICarrinhoRequest): ICarrinhoResponse;
}
