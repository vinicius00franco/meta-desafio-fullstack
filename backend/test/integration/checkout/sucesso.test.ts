import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/index';
import { CENARIOS_CHECKOUT } from '../../fixtures/produtos';
import { configurarAmbienteCheckout } from './setup';

describe('POST /checkout - Cenários de Sucesso', () => {
  beforeEach(() => {
    configurarAmbienteCheckout();
  });

  it('deve processar checkout com sucesso quando estoque disponível', async () => {
    const requestBody = CENARIOS_CHECKOUT.SUCESSO;

    const response = await request(app)
      .post('/checkout')
      .send(requestBody);

    expect(response.status).toBe(201);
    expect(response.body.sucesso).toBe(true);
    expect(response.body.dados).toHaveProperty('id');
    expect(response.body.dados.produtoId).toBe(requestBody.produtoId);
    expect(response.body.dados.quantidade).toBe(requestBody.quantidade);
    expect(response.body.dados.valorTotal).toBe(requestBody.valorEsperado);
    expect(response.body.dados.estoqueAtual).toBe(requestBody.estoqueEsperado);
  });

  it('deve processar checkout com sucesso quando estoque exato', async () => {
    const requestBody = CENARIOS_CHECKOUT.ESTOQUE_EXATO;

    const response = await request(app)
      .post('/checkout')
      .send(requestBody);

    expect(response.status).toBe(201);
    expect(response.body.sucesso).toBe(true);
    expect(response.body.dados).toHaveProperty('id');
    expect(response.body.dados.produtoId).toBe(requestBody.produtoId);
    expect(response.body.dados.quantidade).toBe(requestBody.quantidade);
    expect(response.body.dados.valorTotal).toBe(requestBody.valorEsperado);
    expect(response.body.dados.estoqueAtual).toBe(requestBody.estoqueEsperado);
  });
});
