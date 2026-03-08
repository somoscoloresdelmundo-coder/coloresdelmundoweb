import { test, expect } from '@playwright/test';

test.describe('Auditoría Rápida', () => {

  test('Home ES - Capturar y verificar', async ({ page }) => {
    console.log('Navegando a /es...');
    await page.goto('/es');
    console.log('Página cargada');

    // Verificar título
    const title = await page.title();
    console.log('Título:', title);

    // Verificar Hero
    const h1 = page.locator('h1').first();
    const h1Text = await h1.textContent();
    console.log('H1:', h1Text?.substring(0, 50));

    // Screenshot
    await page.screenshot({ path: 'test-results/home-es.png', fullPage: true });
    console.log('Screenshot guardado: test-results/home-es.png');

    // Verificar secciones principales
    const sections = await page.locator('section').count();
    console.log('Secciones encontradas:', sections);

    // Verificar footer
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
    console.log('Footer visible: OK');

    // Verificar errores de consola
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.waitForTimeout(2000);
    console.log('Errores de consola:', errors.length);
  });

  test('Contacto - Verificar formulario', async ({ page }) => {
    console.log('Navegando a /es/contacto...');
    await page.goto('/es/contacto');

    // Buscar formulario
    const forms = await page.locator('form').count();
    console.log('Formularios encontrados:', forms);

    // Buscar inputs
    const inputs = await page.locator('input').count();
    const textareas = await page.locator('textarea').count();
    console.log('Inputs:', inputs, 'Textareas:', textareas);

    // Buscar botón de envío
    const submitBtn = await page.locator('button[type="submit"], input[type="submit"]').count();
    console.log('Botones de envío:', submitBtn);

    // Screenshot
    await page.screenshot({ path: 'test-results/contacto.png', fullPage: true });
  });

  test('Móvil - Verificar responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/es');

    // Verificar menú hamburguesa
    const menuBtn = page.locator('button').filter({ hasText: /menu|menú/i });
    const hamburger = page.locator('[class*="hamburger"], [aria-label*="menu"]');

    const menuExists = await menuBtn.count() + await hamburger.count();
    console.log('Elementos de menú móvil:', menuExists);

    await page.screenshot({ path: 'test-results/mobile.png', fullPage: true });
  });

});
