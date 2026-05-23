import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app, produtoRepository } from '../../src/index';
import { CENARIOS_CHECKOUT } from '../fixtures/produtos';

describe('POST /checkout', () => {
  beforeEach(() => {
    produtoRepository.restaurarEstoqueInicial();
  });

  describe('Cenários de Sucesso', () => {
    it('deve processar compra com sucesso', async () => {
      const response = await request(app)
        .post('/checkout')
        .send(CENARIOS_CHECKOUT.SUCESSO);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.produtoId).toBe(CENARIOS_CHECKOUT.SUCESSO.produtoId);
      expect(response.body.quantidade).toBe(CENARIOS_CHECKOUT.SUCESSO.quantidade);
      expect(response.body.valorTotal).toBe(CENARIOS_CHECKOUT.SUCESSO.valorEsperado);
      expect(response.body.estoqueAtual).toBe(CENARIOS_CHECKOUT.SUCESSO.estoqueEsperado);
    });

    it('deve processar compra com estoque exato', async () => {
      const response = await request(app)
        .post('/checkout')
        .send(CENARIOS_CHECKOUT.ESTOQUE_EXATO);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.produtoId).toBe(CENARIOS_CHECKOUT.ESTOQUE_EXATO.produtoId);
      expect(response.body.quantidade).toBe(CENARIOS_CHECKOUT.ESTOQUE_EXATO.quantidade);
      expect(response.body.valorTotal).toBe(CENARIOS_CHECKOUT.ESTOQUE_EXATO.valorEsperado);
      expect(response.body.estoqueAtual).toBe(CENARIOS_CHECKOUT.ESTOQUE_EXATO.estoqueEsperado);
    });
  });

  describe('Cenários de Falha', () => {
    it('deve retornar erro quando estoque insuficiente', async () => {
      const response = await request(app)
        .post('/checkout')
        .send(CENARIOS_CHECKOUT.ESTOQUE_INSUFICIENTE);

      expect(response.status).toBe(400);
      expect(response.body.mensagem).toBe('Estoque insuficiente');
      expect(response.body.estoqueDisponivel).toBe(CENARIOS_CHECKOUT.ESTOQUE_INSUFICIENTE.estoqueDisponivel);
    });

    it('deve retornar erro quando produto não encontrado', async () => {
      const response = await request(app)
        .post('/checkout')
        .send(CENARIOS_CHECKOUT.PRODUTO_NAO_ENCONTRADO);

      expect(response.status).toBe(404);
      expect(response.body.mensagem).toBe('Produto não encontrado');
    });
  });

  describe('Cenários de Validação', () => {
    it('deve retornar erro quando quantidade inválida (negativa)', async () => {
      const response = await request(app)
        .post('/checkout')
        .send(CENARIOS_CHECKOUT.QUANTIDADE_INVALIDA);

      expect(response.status).toBe(400);
      expect(response.body.mensagem).toBe('Quantidade deve ser maior que zero');
    });

    it('deve retornar erro quando quantidade zero', async () => {
      const response = await request(app)
        .post('/checkout')
        .send(CENARIOS_CHECKOUT.QUANTIDADE_ZERO);

      expect(response.status).toBe(400);
      expect(response.body.mensagem).toBe('Quantidade deve ser maior que zero');
    });

    it('deve retornar erro quando quantidade máxima excedida', async () => {
      const response = await request(app)
        .post('/checkout')
        .send(CENARIOS_CHECKOUT.QUANTIDADE_MAXIMA_EXCEDIDA);

      expect(response.status).toBe(400);
      expect(response.body.mensagem).toBe(`Quantidade máxima por pedido é ${CENARIOS_CHECKOUT.QUANTIDADE_MAXIMA_EXCEDIDA.quantidadeMaxima}`);
    });

    it('deve retornar erro quando campos obrigatórios ausentes', async () => {
      const response = await request(app)
        .post('/checkout')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.mensagem).toBe('Produto é obrigatório');
    });

    it('deve retornar erro quando produto não informado', async () => {
      const response = await request(app)
        .post('/checkout')
        .send({ quantidade: 1 });

      expect(response.status).toBe(400);
      expect(response.body.mensagem).toBe('Produto é obrigatório');
    });

    it('deve retornar erro quando quantidade não informada', async () => {
      const response = await request(app)
        .post('/checkout')
        .send({ produtoId: 'prod-1' });

      expect(response.status).toBe(400);
      expect(response.body.mensagem).toBe('Quantidade é obrigatória');
    });
  });
});
