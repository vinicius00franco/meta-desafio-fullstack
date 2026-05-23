import { test, expect } from '@playwright/test';
import { CENARIOS_CHECKOUT } from './fixtures/produtos';

test.describe('Checkout E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.request.post('http://localhost:3000/checkout/reset-estoque');
  });

  test.describe('Cenários de Sucesso', () => {
    test('deve processar compra com sucesso', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.SUCESSO.produto.id;
      const quantidade = CENARIOS_CHECKOUT.SUCESSO.quantidade;

      await page.getByTestId(`card-produto-${produtoId}`).isVisible();
      
      for (let i = 0; i < quantidade; i++) {
        await page.getByTestId(`botao-aumentar-quantidade-${produtoId}`).click();
      }
      
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      
      await page.getByTestId('botao-abrir-carrinho').click();
      await expect(page.getByTestId('sidebar-carrinho')).toBeVisible();
      await expect(page.getByTestId(`item-carrinho-${produtoId}`)).toBeVisible();
      
      await page.getByTestId('botao-finalizar-compra').click();
      
      await expect(page.getByTestId('sidebar-processando')).toBeVisible();
      await expect(page.getByTestId('estado-processando')).toBeVisible();
      
      await page.waitForTimeout(3500);
      
      await expect(page.getByTestId('sidebar-sucesso')).toBeVisible();
      await expect(page.getByTestId('estado-sucesso')).toBeVisible();
    });

    test('deve processar compra com estoque exato', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.ESTOQUE_EXATO.produto.id;
      const quantidade = CENARIOS_CHECKOUT.ESTOQUE_EXATO.quantidade;

      for (let i = 0; i < quantidade; i++) {
        await page.getByTestId(`botao-aumentar-quantidade-${produtoId}`).click();
      }
      
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      
      await page.getByTestId('botao-abrir-carrinho').click();
      await page.getByTestId('botao-finalizar-compra').click();
      
      await page.waitForTimeout(3500);
      
      await expect(page.getByTestId('sidebar-sucesso')).toBeVisible();
    });
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
      
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      
      await page.getByTestId('botao-abrir-carrinho').click();
      await expect(page.getByTestId(`item-carrinho-${produtoId}`)).toBeVisible();
      await expect(page.getByTestId('badge-quantidade-itens')).toHaveText('1');
    });

    test('deve aumentar quantidade de item no carrinho', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.SUCESSO.produto.id;
      
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      await page.getByTestId('botao-abrir-carrinho').click();
      
      await page.getByTestId(`botao-aumentar-item-${produtoId}`).click();
      await expect(page.getByTestId(`quantidade-item-${produtoId}`)).toHaveText('2');
      await expect(page.getByTestId('badge-quantidade-itens')).toHaveText('2');
    });

    test('deve diminuir quantidade de item no carrinho', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.SUCESSO.produto.id;
      
      await page.getByTestId(`botao-aumentar-quantidade-${produtoId}`).click();
      await page.getByTestId(`botao-aumentar-quantidade-${produtoId}`).click();
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      
      await page.getByTestId('botao-abrir-carrinho').click();
      await page.getByTestId(`botao-diminuir-item-${produtoId}`).click();
      
      await expect(page.getByTestId(`quantidade-item-${produtoId}`)).toHaveText('1');
    });

    test('deve remover item do carrinho', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.SUCESSO.produto.id;
      
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      await page.getByTestId('botao-abrir-carrinho').click();
      
      await page.getByTestId(`botao-remover-item-${produtoId}`).click();
      
      await expect(page.getByTestId(`item-carrinho-${produtoId}`)).not.toBeVisible();
      await expect(page.getByTestId('mensagem-carrinho-vazio')).toBeVisible();
    });

    test('deve fechar carrinho ao clicar no botão fechar', async ({ page }) => {
      await page.getByTestId('botao-abrir-carrinho').click();
      await expect(page.getByTestId('sidebar-carrinho')).toBeVisible();
      
      await page.getByTestId('botao-fechar-carrinho').click();
      await expect(page.getByTestId('sidebar-carrinho')).not.toBeVisible();
    });
  });

  test.describe('Cenários de Falha', () => {
    test('deve exibir erro quando estoque insuficiente', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.ESTOQUE_INSUFICIENTE.produto.id;
      const quantidade = CENARIOS_CHECKOUT.ESTOQUE_INSUFICIENTE.quantidade;

      for (let i = 0; i < quantidade; i++) {
        await page.getByTestId(`botao-aumentar-quantidade-${produtoId}`).click();
      }
      
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      await page.getByTestId('botao-abrir-carrinho').click();
      await page.getByTestId('botao-finalizar-compra').click();
      
      await page.waitForTimeout(3500);
      
      await expect(page.getByTestId('sidebar-erro')).toBeVisible();
      await expect(page.getByTestId('estado-erro')).toBeVisible();
      await expect(page.getByTestId('mensagem-erro')).toContainText('Estoque insuficiente');
    });

    test('deve tentar novamente após erro', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.ESTOQUE_INSUFICIENTE.produto.id;
      const quantidade = CENARIOS_CHECKOUT.ESTOQUE_INSUFICIENTE.quantidade;

      for (let i = 0; i < quantidade; i++) {
        await page.getByTestId(`botao-aumentar-quantidade-${produtoId}`).click();
      }
      
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      await page.getByTestId('botao-abrir-carrinho').click();
      await page.getByTestId('botao-finalizar-compra').click();
      
      await page.waitForTimeout(3500);
      
      await expect(page.getByTestId('sidebar-erro')).toBeVisible();
      
      await page.getByTestId(`botao-remover-item-${produtoId}`).click();
      await page.getByTestId('botao-fechar-carrinho').click();
      
      const produtoSucessoId = CENARIOS_CHECKOUT.SUCESSO.produto.id;
      await page.getByTestId(`botao-adicionar-${produtoSucessoId}`).click();
      await page.getByTestId('botao-abrir-carrinho').click();
      await page.getByTestId('botao-finalizar-compra').click();
      
      await page.waitForTimeout(3500);
      
      await expect(page.getByTestId('sidebar-sucesso')).toBeVisible();
    });
  });

  test.describe('Interação com UI', () => {
    test('deve mostrar lista de produtos', async ({ page }) => {
      await expect(page.getByTestId('lista-produtos')).toBeVisible();
      await expect(page.getByTestId('grid-produtos')).toBeVisible();
    });

    test('deve mostrar cabecalho com barra de pesquisa', async ({ page }) => {
      await expect(page.getByTestId('cabecalho')).toBeVisible();
      await expect(page.getByTestId('input-pesquisa')).toBeVisible();
      await expect(page.getByTestId('botao-abrir-carrinho')).toBeVisible();
    });

    test('deve mostrar quantidade no badge do carrinho', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.SUCESSO.produto.id;
      
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      
      await expect(page.getByTestId('badge-quantidade-itens')).toHaveText('1');
    });

    test('deve iniciar nova compra após sucesso', async ({ page }) => {
      const produtoId = CENARIOS_CHECKOUT.SUCESSO.produto.id;
      
      await page.getByTestId(`botao-adicionar-${produtoId}`).click();
      await page.getByTestId('botao-abrir-carrinho').click();
      await page.getByTestId('botao-finalizar-compra').click();
      
      await page.waitForTimeout(3500);
      
      await expect(page.getByTestId('sidebar-sucesso')).toBeVisible();
      await page.getByTestId('botao-nova-compra').click();
      
      await expect(page.getByTestId('sidebar-carrinho')).toBeVisible();
      await expect(page.getByTestId('mensagem-carrinho-vazio')).toBeVisible();
    });

    test('deve mostrar estado de carregamento inicial', async ({ page }) => {
      await page.reload();
      await expect(page.getByTestId('estado-carregando')).toBeVisible();
    });
  });
});
