import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/index';
import { CENARIOS_CHECKOUT } from '../../fixtures/produtos';
import { configurarAmbienteCheckout } from './setup';

describe('POST /checkout - Cenários de Falha', () => {
  beforeEach(() => {
    configurarAmbienteCheckout();
  });

  it('deve retornar erro quando estoque insuficiente', async () => {
    const requestBody = CENARIOS_CHECKOUT.ESTOQUE_INSUFICIENTE;

    const response = await request(app)
      .post('/checkout')
      .send(requestBody);

    expect(response.status).toBe(400);
    expect(response.body.sucesso).toBe(false);
    expect(response.body.erro.mensagem).toBe('Estoque insuficiente');
    expect(response.body.erro.codigo).toBe('ESTOQUE_INSUFICIENTE');
    expect(response.body.erro.detalhes).toHaveProperty('estoqueDisponivel');
    expect(response.body.erro.detalhes.estoqueDisponivel).toBe(requestBody.estoqueDisponivel);
  });

  it('deve retornar erro quando produto não encontrado', async () => {
    const requestBody = CENARIOS_CHECKOUT.PRODUTO_NAO_ENCONTRADO;

    const response = await request(app)
      .post('/checkout')
      .send(requestBody);

    expect(response.status).toBe(404);
    expect(response.body.sucesso).toBe(false);
    expect(response.body.erro.mensagem).toBe('Produto não encontrado');
    expect(response.body.erro.codigo).toBe('RECURSO_NAO_ENCONTRADO');
  });
});
