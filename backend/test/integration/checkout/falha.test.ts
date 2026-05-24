import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/index';
import { CENARIOS_CHECKOUT, PRODUTOS_FIXTURE } from '../../fixtures/produtos';
import { seedService } from '../../../src/index';

describe('POST /checkout - Cenários de Falha', () => {
  beforeEach(() => {
    seedService.carregarSeed(PRODUTOS_FIXTURE);
  });

  it('deve retornar erro quando estoque insuficiente', async () => {
    const requestBody = CENARIOS_CHECKOUT.ESTOQUE_INSUFICIENTE;

    const response = await request(app)
      .post('/checkout')
      .send(requestBody);

    expect(response.status).toBe(400);
    expect(response.body.mensagem).toBe('Estoque insuficiente');
    expect(response.body.estoqueDisponivel).toBe(requestBody.estoqueDisponivel);
  });

  it('deve retornar erro quando produto não encontrado', async () => {
    const requestBody = CENARIOS_CHECKOUT.PRODUTO_NAO_ENCONTRADO;

    const response = await request(app)
      .post('/checkout')
      .send(requestBody);

    expect(response.status).toBe(404);
    expect(response.body.mensagem).toBe('Produto não encontrado');
  });
});
