import { ICheckoutRequest } from '../dtos/ICheckoutRequest';
import { ICheckoutResponse } from '../dtos/ICheckoutResponse';

export interface ICheckoutService {
  processarCheckout(request: ICheckoutRequest): ICheckoutResponse;
}
