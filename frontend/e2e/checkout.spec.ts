import { test, expect } from '@playwright/test';
import { CENARIOS_CHECKOUT } from './fixtures/produtos';

test.describe('Checkout E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.request.post('http://localhost:3000/checkout/reset-estoque');
  });

  test.describe('Cenários de Validação', () => {
    test('deve mostrar carrinho vazio inicialmente', async ({ page }) => {
      await page.getByTestId('botao-abrir-carrinho').click();
      await expect(page.getByTestId('sidebar-carrinho')).toBeVisible();
      await expect(page.getByTestId('mensagem-carrinho-vazio')).toBeVisible();
      await expect(page.getByTestId('botao-finalizar-compra')).not.toBeVisible();
    });

    test('deve adicionar produto ao carrinho', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.SUCESSO.produto.id;
      
      // Clicar no botão de adicionar dentro do card
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      
      // Abrir carrinho para verificar se o item foi adicionado
      await page.getByTestId('botao-abrir-carrinho').click();
      await expect(page.getByTestId(`item-carrinho-${produtoId}`)).toBeVisible();
    });

    test('deve aumentar quantidade de item no carrinho', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.SUCESSO.produto.id;
      
      // Adicionar produto duas vezes
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      
      // Abrir carrinho e verificar quantidade
      await page.getByTestId('botao-abrir-carrinho').click();
      await expect(page.getByTestId(`quantidade-item-${produtoId}`)).toHaveText('2');
    });

    test('deve diminuir quantidade de item no carrinho', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.SUCESSO.produto.id;
      
      // Adicionar produto duas vezes
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      
      // Abrir carrinho e diminuir quantidade
      await page.getByTestId('botao-abrir-carrinho').click();
      await page.getByTestId(`botao-diminuir-item-${produtoId}`).click();
      await expect(page.getByTestId(`quantidade-item-${produtoId}`)).toHaveText('1');
    });

    test('deve remover item do carrinho', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.SUCESSO.produto.id;
      
      // Adicionar produto
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      
      // Abrir carrinho e remover item
      await page.getByTestId('botao-abrir-carrinho').click();
      await page.getByTestId(`botao-remover-item-${produtoId}`).click();
      
      await expect(page.getByTestId(`item-carrinho-${produtoId}`)).not.toBeVisible();
      await expect(page.getByTestId('mensagem-carrinho-vazio')).toBeVisible();
    });

    test('deve fechar carrinho ao clicar no botão fechar', async ({ page }) => {
      await page.getByTestId('botao-abrir-carrinho').click();
      await expect(page.getByTestId('sidebar-carrinho')).toBeVisible();
      
      await page.getByTestId('botao-fechar-carrinho').click();
      // Verificar se o overlay não está mais visível
      await expect(page.locator('.checkout__overlay--visivel')).not.toBeVisible();
    });
  });

  test.describe('Interação com UI', () => {
    test('deve mostrar cabecalho com botão carrinho', async ({ page }) => {
      await expect(page.getByTestId('cabecalho')).toBeVisible();
      await expect(page.getByTestId('botao-abrir-carrinho')).toBeVisible();
    });

    test('deve mostrar quantidade no badge do carrinho', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.SUCESSO.produto.id;
      
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      await expect(page.getByTestId('badge-quantidade-itens')).toHaveText('1');
    });
  });

  test.describe('Cenários de Sucesso', () => {
    test('deve processar compra com sucesso', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.SUCESSO.produto.id;
      const quantidade = CENARIOS_CHECKOUT.SUCESSO.quantidade;

      // Adicionar produtos ao carrinho
      for (let i = 0; i < quantidade; i++) {
        await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      }
      
      // Abrir carrinho e verificar
      await page.getByTestId('botao-abrir-carrinho').click();
      await expect(page.getByTestId('sidebar-carrinho')).toBeVisible();
      await expect(page.getByTestId(`item-carrinho-${produtoId}`)).toBeVisible();
      
      // Finalizar compra
      await page.getByTestId('botao-finalizar-compra').click();
      
      // Esperar resposta real da API - o estado pode mudar rapidamente
      await expect(page.getByTestId('sidebar-sucesso')).toBeVisible({ timeout: 10000 });
      await expect(page.getByTestId('estado-sucesso')).toBeVisible();
    });

    test('deve processar compra com estoque exato', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.ESTOQUE_EXATO.produto.id;
      const quantidade = CENARIOS_CHECKOUT.ESTOQUE_EXATO.quantidade;

      // Adicionar produtos ao carrinho
      for (let i = 0; i < quantidade; i++) {
        await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      }
      
      // Abrir carrinho e finalizar
      await page.getByTestId('botao-abrir-carrinho').click();
      await page.getByTestId('botao-finalizar-compra').click();
      
      // Esperar resposta real da API
      await expect(page.getByTestId('sidebar-sucesso')).toBeVisible({ timeout: 10000 });
    });

    test('deve iniciar nova compra após sucesso', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.SUCESSO.produto.id;
      
      // Adicionar produto e finalizar
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      await page.getByTestId('botao-abrir-carrinho').click();
      await page.getByTestId('botao-finalizar-compra').click();
      
      // Esperar sucesso
      await expect(page.getByTestId('sidebar-sucesso')).toBeVisible({ timeout: 10000 });
      
      // Iniciar nova compra
      await page.getByTestId('botao-nova-compra').click();
      
      // Verificar carrinho vazio
      await expect(page.getByTestId('sidebar-carrinho')).toBeVisible();
      await expect(page.getByTestId('mensagem-carrinho-vazio')).toBeVisible();
    });
  });

  test.describe('Cenários de Carrinho Múltiplos Itens', () => {
    test('deve processar carrinho com múltiplos itens', async ({ page }) => {
      const produto1Id = CENARIOS_CHECKOUT.SUCESSO.produto.id;
      const produto2Id = CENARIOS_CHECKOUT.ESTOQUE_EXATO.produto.id;

      // Adicionar primeiro produto
      await page.getByTestId(`botao-adicionar-${produto1Id}`).click();
      await page.getByTestId(`botao-adicionar-${produto1Id}`).click();

      // Adicionar segundo produto
      await page.getByTestId(`botao-adicionar-${produto2Id}`).click();
      await page.getByTestId(`botao-adicionar-${produto2Id}`).click();

      // Abrir carrinho e verificar
      await page.getByTestId('botao-abrir-carrinho').click();
      await expect(page.getByTestId(`item-carrinho-${produto1Id}`)).toBeVisible();
      await expect(page.getByTestId(`item-carrinho-${produto2Id}`)).toBeVisible();
      
      // Verificar badge de quantidade
      await expect(page.getByTestId('badge-quantidade-itens')).toHaveText('4');

      // Finalizar compra
      await page.getByTestId('botao-finalizar-compra').click();
      
      // Esperar resposta real da API
      await expect(page.getByTestId('sidebar-sucesso')).toBeVisible({ timeout: 10000 });
    });

    test('deve calcular valor total corretamente com múltiplos itens', async ({ page }) => {
      const produto1Id = CENARIOS_CHECKOUT.SUCESSO.produto.id;
      const produto2Id = CENARIOS_CHECKOUT.ESTOQUE_EXATO.produto.id;

      await page.getByTestId(`botao-adicionar-${produto1Id}`).click();
      await page.getByTestId(`botao-adicionar-${produto1Id}`).click();
      
      await page.getByTestId(`botao-adicionar-${produto2Id}`).click();
      await page.getByTestId(`botao-adicionar-${produto2Id}`).click();

      await page.getByTestId('botao-abrir-carrinho').click();
      
      const valorTotal = await page.getByTestId('valor-total-carrinho').textContent();
      // Valor esperado: (89.90 * 2) + (79.90 * 2) = 339.60
      expect(valorTotal).toContain('339,60');
    });
  });

  test.describe('Cenários de Erro', () => {
    test('deve exibir erro quando estoque insuficiente', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.ESTOQUE_INSUFICIENTE.produto.id;
      const quantidade = CENARIOS_CHECKOUT.ESTOQUE_INSUFICIENTE.quantidade;

      // Adicionar produtos ao carrinho
      for (let i = 0; i < quantidade; i++) {
        await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      }
      
      await page.getByTestId('botao-abrir-carrinho').click();
      await page.getByTestId('botao-finalizar-compra').click();
      
      // Esperar resposta real da API
      await expect(page.getByTestId('sidebar-erro')).toBeVisible({ timeout: 10000 });
      await expect(page.getByTestId('estado-erro')).toBeVisible();
      await expect(page.getByTestId('mensagem-erro')).toContainText('Estoque insuficiente');
    });
  });
});
