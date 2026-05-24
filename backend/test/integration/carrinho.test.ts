import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app, seedService } from '../../src/index';
import { PRODUTOS_FIXTURE } from '../fixtures/produtos';

describe('POST /checkout/carrinho', () => {
  beforeEach(() => {
    seedService.carregarSeed(PRODUTOS_FIXTURE);
  });

  describe('Cenários de Sucesso', () => {
    it('deve processar carrinho com múltiplos itens', async () => {
      const response = await request(app)
        .post('/checkout/carrinho')
        .send({
          itens: [
            { produtoId: 1, quantidade: 2 },
            { produtoId: 2, quantidade: 1 },
          ],
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.itens).toHaveLength(2);
      expect(response.body.valorTotal).toBe(49.90 * 2 + 39.90 * 1);
      expect(response.body.itens[0].estoqueAtual).toBe(8);
      expect(response.body.itens[1].estoqueAtual).toBe(4);
    });

    it('deve processar carrinho com item único', async () => {
      const response = await request(app)
        .post('/checkout/carrinho')
        .send({
          itens: [
            { produtoId: 1, quantidade: 3 },
          ],
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.itens).toHaveLength(1);
      expect(response.body.valorTotal).toBe(49.90 * 3);
      expect(response.body.itens[0].estoqueAtual).toBe(7);
    });
  });

  describe('Cenários de Falha', () => {
    it('deve retornar erro quando carrinho vazio', async () => {
      const response = await request(app)
        .post('/checkout/carrinho')
        .send({ itens: [] });

      expect(response.status).toBe(400);
      expect(response.body.mensagem).toContain('pelo menos um item');
    });

    it('deve retornar erro quando produto não encontrado', async () => {
      const response = await request(app)
        .post('/checkout/carrinho')
        .send({
          itens: [
            { produtoId: 999, quantidade: 1 },
          ],
        });

      expect(response.status).toBe(404);
      expect(response.body.mensagem).toContain('Produto 999 não encontrado');
    });

    it('deve retornar erro quando estoque insuficiente', async () => {
      const response = await request(app)
        .post('/checkout/carrinho')
        .send({
          itens: [
            { produtoId: 4, quantidade: 10 },
          ],
        });

      expect(response.status).toBe(400);
      expect(response.body.mensagem).toContain('Estoque insuficiente');
      expect(response.body.estoqueDisponivel).toBe(5);
    });
  });

  describe('Cenários de Validação', () => {
    it('deve retornar erro quando quantidade inválida', async () => {
      const response = await request(app)
        .post('/checkout/carrinho')
        .send({
          itens: [
            { produtoId: 1, quantidade: -1 },
          ],
        });

      expect(response.status).toBe(400);
      expect(response.body.mensagem).toContain('Quantidade');
    });

    it('deve retornar erro quando quantidade zero', async () => {
      const response = await request(app)
        .post('/checkout/carrinho')
        .send({
          itens: [
            { produtoId: 1, quantidade: 0 },
          ],
        });

      expect(response.status).toBe(400);
      expect(response.body.mensagem).toContain('Quantidade');
    });

    it('deve retornar erro quando quantidade máxima excedida', async () => {
      const response = await request(app)
        .post('/checkout/carrinho')
        .send({
          itens: [
            { produtoId: 1, quantidade: 15 },
          ],
        });

      expect(response.status).toBe(400);
      expect(response.body.mensagem).toContain('máxima');
    });

    it('deve retornar erro quando campos obrigatórios ausentes', async () => {
      const response = await request(app)
        .post('/checkout/carrinho')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.mensagem).toContain('array');
    });
  });
});
