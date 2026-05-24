import { seedService } from '../../../src/index';
import { PRODUTOS_FIXTURE } from '../../fixtures/produtos';

export function configurarAmbienteCheckout(): void {
  seedService.carregarSeed(PRODUTOS_FIXTURE);
}
