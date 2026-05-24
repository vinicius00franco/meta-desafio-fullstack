import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/index';
import { CENARIOS_CHECKOUT, PRODUTOS_FIXTURE } from '../../fixtures/produtos';
import { seedService } from '../../../src/index';

describe('POST /checkout - Cenários de Sucesso', () => {
  beforeEach(() => {
    seedService.carregarSeed(PRODUTOS_FIXTURE);
  });

  it('deve processar checkout com sucesso quando estoque disponível', async () => {
    const requestBody = CENARIOS_CHECKOUT.SUCESSO;

    const response = await request(app)
      .post('/checkout')
      .send(requestBody);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.produtoId).toBe(requestBody.produtoId);
    expect(response.body.quantidade).toBe(requestBody.quantidade);
    expect(response.body.valorTotal).toBe(49.90 * requestBody.quantidade);
    expect(response.body.estoqueAtual).toBe(requestBody.estoqueEsperado);
  });

  it('deve processar checkout com sucesso quando estoque exato', async () => {
    const requestBody = CENARIOS_CHECKOUT.ESTOQUE_EXATO;

    const response = await request(app)
      .post('/checkout')
      .send(requestBody);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.produtoId).toBe(requestBody.produtoId);
    expect(response.body.quantidade).toBe(requestBody.quantidade);
    expect(response.body.valorTotal).toBe(39.90 * requestBody.quantidade);
    expect(response.body.estoqueAtual).toBe(requestBody.estoqueEsperado);
  });
});
