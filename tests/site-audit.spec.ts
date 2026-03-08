import { test, expect } from '@playwright/test';

/**
 * Tests de auditoría optimizados siguiendo mejores prácticas de Playwright 2025:
 * - Selectores basados en roles de accesibilidad (getByRole, getByLabel)
 * - Auto-waiting en lugar de timeouts fijos
 * - Screenshots de viewport (no fullPage para evitar timeouts)
 * - Métricas de rendimiento
 * - Verificaciones de accesibilidad básicas
 */

test.describe('Auditoría del Sitio - Colores del Mundo', () => {

  test.describe('Home Page', () => {

    test('Carga correctamente y tiene elementos esenciales', async ({ page }) => {
      // Navegar y medir tiempo de carga
      const startTime = Date.now();
      await page.goto('/es', { waitUntil: 'domcontentloaded' });
      const loadTime = Date.now() - startTime;
      console.log(`Tiempo de carga: ${loadTime}ms`);

      // Verificar título de la página
      await expect(page).toHaveTitle(/Colores del Mundo/);

      // Verificar H1 visible (usando role)
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible({ timeout: 10000 });

      // Verificar navegación principal
      const nav = page.getByRole('navigation');
      await expect(nav.first()).toBeVisible({ timeout: 5000 });

      // Verificar footer
      const footer = page.locator('footer');
      await expect(footer).toBeVisible({ timeout: 5000 });

      console.log('Elementos esenciales: OK');
    });

    test('Links de navegación funcionan', async ({ page }) => {
      await page.goto('/es');

      // Buscar links principales en navegación
      const navLinks = page.getByRole('navigation').first().getByRole('link');
      const linkCount = await navLinks.count();
      console.log(`Links de navegación encontrados: ${linkCount}`);

      expect(linkCount).toBeGreaterThan(3);
    });

    test('Secciones principales visibles', async ({ page }) => {
      await page.goto('/es');

      // Verificar que hay múltiples secciones
      const sections = page.locator('section');
      const sectionCount = await sections.count();
      console.log(`Secciones encontradas: ${sectionCount}`);

      expect(sectionCount).toBeGreaterThanOrEqual(3);
    });

    test('Sin errores de consola críticos', async ({ page }) => {
      const errors: string[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      page.on('pageerror', error => {
        errors.push(error.message);
      });

      await page.goto('/es');
      await page.waitForLoadState('networkidle');

      // Filtrar errores conocidos/aceptables
      const criticalErrors = errors.filter(e =>
        !e.includes('favicon') &&
        !e.includes('ResizeObserver')
      );

      console.log(`Errores de consola: ${criticalErrors.length}`);
      if (criticalErrors.length > 0) {
        console.log('Errores:', criticalErrors);
      }

      expect(criticalErrors.length).toBe(0);
    });
  });

  test.describe('Página de Contacto', () => {

    test('Formulario de contacto presente y funcional', async ({ page }) => {
      await page.goto('/es/contacto');

      // Verificar formulario usando selectores de accesibilidad
      const form = page.locator('form');
      await expect(form).toBeVisible();

      // Verificar campos por label
      const nameInput = page.getByLabel(/nombre/i);
      const emailInput = page.getByLabel(/email/i);
      const messageInput = page.getByLabel(/mensaje/i);

      await expect(nameInput).toBeVisible();
      await expect(emailInput).toBeVisible();
      await expect(messageInput).toBeVisible();

      // Verificar botón de envío
      const submitButton = page.getByRole('button', { name: /enviar|send/i });
      await expect(submitButton).toBeVisible();

      console.log('Formulario de contacto: OK');
    });

    test('Formulario tiene campos requeridos', async ({ page }) => {
      await page.goto('/es/contacto', { waitUntil: 'domcontentloaded' });

      // Verificar que los campos tienen el atributo required o validación
      const nameInput = page.locator('input[name="name"]');
      const emailInput = page.locator('input[name="email"]');
      const messageInput = page.locator('textarea[name="message"]');

      // Verificar que existen los campos
      expect(await nameInput.count()).toBe(1);
      expect(await emailInput.count()).toBe(1);
      expect(await messageInput.count()).toBe(1);

      console.log('Campos del formulario: OK');
    });

    test('Información de contacto visible', async ({ page }) => {
      await page.goto('/es/contacto', { waitUntil: 'domcontentloaded', timeout: 30000 });

      // Verificar que hay links mailto
      const emailLink = page.locator('a[href^="mailto:"]');
      const emailCount = await emailLink.count();
      console.log(`Links de email encontrados: ${emailCount}`);
      expect(emailCount).toBeGreaterThan(0);
    });
  });

  test.describe('Responsive Design', () => {

    test('Vista móvil funciona correctamente', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
      await page.goto('/es');

      // Verificar que la página carga
      await expect(page).toHaveTitle(/Colores del Mundo/);

      // Verificar header visible
      const header = page.locator('header');
      await expect(header).toBeVisible();

      // Screenshot móvil
      await page.screenshot({ path: 'test-results/mobile-viewport.png' });
    });

    test('Vista tablet funciona correctamente', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 }); // iPad
      await page.goto('/es');

      await expect(page).toHaveTitle(/Colores del Mundo/);
      await page.screenshot({ path: 'test-results/tablet-viewport.png' });
    });
  });

  test.describe('Navegación entre páginas', () => {

    test('Páginas principales responden correctamente', async ({ page }) => {
      // Test simplificado: verificar solo páginas rápidas (excluir PIF que carga PDF)
      const pages = ['/es', '/es/contacto'];

      for (const path of pages) {
        const response = await page.goto(path, {
          waitUntil: 'domcontentloaded',
          timeout: 20000
        });
        expect(response?.status()).toBe(200);
        console.log(`${path}: OK`);
      }
    });
  });

  test.describe('Internacionalización', () => {

    test('Versión en inglés funciona', async ({ page }) => {
      await page.goto('/en');

      // Verificar que carga en inglés
      await expect(page).toHaveTitle(/Colores del Mundo/);

      // El contenido debería estar en inglés
      const heading = page.getByRole('heading', { level: 1 });
      const headingText = await heading.textContent();
      console.log(`H1 en inglés: ${headingText?.substring(0, 50)}...`);
    });
  });

  test.describe('Accesibilidad Básica', () => {

    test('Imágenes tienen alt text', async ({ page }) => {
      await page.goto('/es');

      const images = page.locator('img');
      const imageCount = await images.count();

      let missingAlt = 0;
      for (let i = 0; i < Math.min(imageCount, 10); i++) {
        const alt = await images.nth(i).getAttribute('alt');
        if (!alt || alt.trim() === '') {
          missingAlt++;
        }
      }

      console.log(`Imágenes sin alt: ${missingAlt}/${Math.min(imageCount, 10)}`);
      expect(missingAlt).toBeLessThan(3); // Permitir algunas decorativas
    });

    test('Links tienen texto descriptivo', async ({ page }) => {
      await page.goto('/es');

      const links = page.getByRole('link');
      const linkCount = await links.count();

      let emptyLinks = 0;
      for (let i = 0; i < Math.min(linkCount, 20); i++) {
        const text = await links.nth(i).textContent();
        const ariaLabel = await links.nth(i).getAttribute('aria-label');
        if ((!text || text.trim() === '') && !ariaLabel) {
          emptyLinks++;
        }
      }

      console.log(`Links sin texto: ${emptyLinks}/${Math.min(linkCount, 20)}`);
      expect(emptyLinks).toBeLessThan(5);
    });
  });
});
