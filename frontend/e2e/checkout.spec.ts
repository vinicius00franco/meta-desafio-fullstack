import { test, expect } from '@playwright/test';
import { CENARIOS_CHECKOUT } from './fixtures/produtos';

test.describe('Checkout E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.request.post('http://localhost:3000/checkout/reset-estoque');
  });

  test.describe('Cenários de Sucesso', () => {
    test('deve processar compra com sucesso', async ({ page }) => {
      await page.getByTestId('produto-select').selectOption(CENARIOS_CHECKOUT.SUCESSO.produto.id);
      await page.getByTestId('quantidade-input').fill(CENARIOS_CHECKOUT.SUCESSO.quantidade.toString());
      await page.getByTestId('botao-comprar').click();

      await expect(page.getByTestId('toast-feedback')).toBeVisible();
      await expect(page.locator('.toast-feedback__mensagem')).toContainText('Compra realizada com sucesso!');
    });

    test('deve processar compra com estoque exato', async ({ page }) => {
      await page.getByTestId('produto-select').selectOption(CENARIOS_CHECKOUT.ESTOQUE_EXATO.produto.id);
      await page.getByTestId('quantidade-input').fill(CENARIOS_CHECKOUT.ESTOQUE_EXATO.quantidade.toString());
      await page.getByTestId('botao-comprar').click();

      await expect(page.getByTestId('toast-feedback')).toBeVisible();
      await expect(page.locator('.toast-feedback__mensagem')).toContainText('Compra realizada com sucesso!');
    });
  });

  test.describe('Cenários de Validação', () => {
    test('deve validar campo produto obrigatório', async ({ page }) => {
      const botaoComprar = page.getByTestId('botao-comprar');
      await expect(botaoComprar).toBeDisabled();
    });

    test('deve validar quantidade maior que zero', async ({ page }) => {
      await page.getByTestId('produto-select').selectOption(CENARIOS_CHECKOUT.SUCESSO.produto.id);
      await page.getByTestId('quantidade-input').fill(CENARIOS_CHECKOUT.QUANTIDADE_ZERO.quantidade.toString());
      
      const botaoComprar = page.getByTestId('botao-comprar');
      await expect(botaoComprar).toBeDisabled();
    });

    test('deve validar quantidade máxima', async ({ page }) => {
      await page.getByTestId('produto-select').selectOption(CENARIOS_CHECKOUT.SUCESSO.produto.id);
      await page.getByTestId('quantidade-input').fill(CENARIOS_CHECKOUT.QUANTIDADE_MAXIMA_EXCEDIDA.quantidade.toString());
      
      const botaoComprar = page.getByTestId('botao-comprar');
      await expect(botaoComprar).toBeDisabled();
    });

    test('deve desabilitar botão quando formulário inválido', async ({ page }) => {
      const botaoComprar = page.getByTestId('botao-comprar');
      await expect(botaoComprar).toBeDisabled();
    });

    test('deve habilitar botão quando formulário válido', async ({ page }) => {
      await page.getByTestId('produto-select').selectOption(CENARIOS_CHECKOUT.SUCESSO.produto.id);
      await page.getByTestId('quantidade-input').fill('1');

      const botaoComprar = page.getByTestId('botao-comprar');
      await expect(botaoComprar).toBeEnabled();
    });
  });

  test.describe('Cenários de Falha', () => {
    test('deve exibir erro quando estoque insuficiente', async ({ page }) => {
      await page.getByTestId('produto-select').selectOption(CENARIOS_CHECKOUT.ESTOQUE_INSUFICIENTE.produto.id);
      await page.getByTestId('quantidade-input').fill(CENARIOS_CHECKOUT.ESTOQUE_INSUFICIENTE.quantidade.toString());
      await page.getByTestId('botao-comprar').click();

      await expect(page.getByTestId('toast-feedback')).toBeVisible();
      await expect(page.locator('.toast-feedback__mensagem')).toContainText('Estoque insuficiente');
    });
  });

  test.describe('Interação com UI', () => {
    test('deve mostrar resumo do pedido quando produto selecionado', async ({ page }) => {
      await page.getByTestId('produto-select').selectOption(CENARIOS_CHECKOUT.SUCESSO.produto.id);
      await page.getByTestId('quantidade-input').fill(CENARIOS_CHECKOUT.SUCESSO.quantidade.toString());

      await expect(page.getByText('Preço unitário:')).toBeVisible();
      await expect(page.getByText('Valor total:')).toBeVisible();
    });


    test('deve fechar toast ao clicar no botão fechar', async ({ page }) => {
      await page.getByTestId('produto-select').selectOption(CENARIOS_CHECKOUT.SUCESSO.produto.id);
      await page.getByTestId('quantidade-input').fill('1');
      await page.getByTestId('botao-comprar').click();

      await page.getByTestId('toast-fechar').click();
      await expect(page.getByTestId('toast-feedback')).not.toBeVisible();
    });
  });
});
