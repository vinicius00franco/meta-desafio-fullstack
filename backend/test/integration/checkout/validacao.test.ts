import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/index';
import { CENARIOS_CHECKOUT } from '../../fixtures/produtos';
import { configurarAmbienteCheckout } from './setup';

describe('POST /checkout - Cenários de Validação', () => {
  beforeEach(() => {
    configurarAmbienteCheckout();
  });

  it('deve retornar erro quando quantidade negativa', async () => {
    const requestBody = CENARIOS_CHECKOUT.QUANTIDADE_INVALIDA;

    const response = await request(app)
      .post('/checkout')
      .send(requestBody);

    expect(response.status).toBe(400);
    expect(response.body.sucesso).toBe(false);
    expect(response.body.erro.mensagem).toBe('Quantidade deve ser maior que zero');
    expect(response.body.erro.codigo).toBe('ERRO_VALIDACAO');
  });

  it('deve retornar erro quando quantidade zero', async () => {
    const requestBody = CENARIOS_CHECKOUT.QUANTIDADE_ZERO;

    const response = await request(app)
      .post('/checkout')
      .send(requestBody);

    expect(response.status).toBe(400);
    expect(response.body.sucesso).toBe(false);
    expect(response.body.erro.mensagem).toBe('Quantidade deve ser maior que zero');
    expect(response.body.erro.codigo).toBe('ERRO_VALIDACAO');
  });

  it('deve retornar erro quando quantidade máxima excedida', async () => {
    const requestBody = CENARIOS_CHECKOUT.QUANTIDADE_MAXIMA_EXCEDIDA;

    const response = await request(app)
      .post('/checkout')
      .send(requestBody);

    expect(response.status).toBe(400);
    expect(response.body.sucesso).toBe(false);
    expect(response.body.erro.mensagem).toBe(`Quantidade máxima por pedido é ${requestBody.quantidadeMaxima}`);
    expect(response.body.erro.codigo).toBe('ERRO_VALIDACAO');
  });

  it('deve retornar erro quando campos obrigatórios ausentes', async () => {
    const response = await request(app)
      .post('/checkout')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.sucesso).toBe(false);
    expect(response.body.erro.mensagem).toBe('Produto é obrigatório');
    expect(response.body.erro.codigo).toBe('ERRO_VALIDACAO');
  });

  it('deve retornar erro quando produto não informado', async () => {
    const response = await request(app)
      .post('/checkout')
      .send({ quantidade: 1 });

    expect(response.status).toBe(400);
    expect(response.body.sucesso).toBe(false);
    expect(response.body.erro.mensagem).toBe('Produto é obrigatório');
    expect(response.body.erro.codigo).toBe('ERRO_VALIDACAO');
  });

  it('deve retornar erro quando quantidade não informada', async () => {
    const response = await request(app)
      .post('/checkout')
      .send({ produtoId: 1 });

    expect(response.status).toBe(400);
    expect(response.body.sucesso).toBe(false);
    expect(response.body.erro.mensagem).toBe('Quantidade é obrigatória');
    expect(response.body.erro.codigo).toBe('ERRO_VALIDACAO');
  });
});
