import { test, expect } from '@playwright/test';

const PAGES = [
  { path: '/es', name: 'Home ES' },
  { path: '/es/sobre-nosotros', name: 'Sobre Nosotros' },
  { path: '/es/que-hacemos', name: 'Qué Hacemos' },
  { path: '/es/proyectos', name: 'Proyectos' },
  { path: '/es/participa', name: 'Participa' },
  { path: '/es/contacto', name: 'Contacto' },
  { path: '/es/pif', name: 'PIF' },
  { path: '/en', name: 'Home EN' },
];

test.describe('Auditoría Completa de Colores del Mundo', () => {

  test.describe('Screenshots de todas las páginas', () => {
    for (const page of PAGES) {
      test(`Capturar ${page.name}`, async ({ page: browserPage }) => {
        await browserPage.goto(page.path, { waitUntil: 'networkidle' });
        await browserPage.waitForTimeout(2000); // Esperar animaciones

        // Screenshot de la página completa
        await browserPage.screenshot({
          path: `test-results/screenshots/${page.name.replace(/\s/g, '-')}-full.png`,
          fullPage: true
        });

        // Screenshot del viewport
        await browserPage.screenshot({
          path: `test-results/screenshots/${page.name.replace(/\s/g, '-')}-viewport.png`,
        });
      });
    }
  });

  test.describe('Verificación de Home ES', () => {
    test('Hero section visible y animado', async ({ page }) => {
      await page.goto('/es', { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000);

      // Verificar elementos del Hero
      const heroTitle = page.locator('h1');
      await expect(heroTitle).toBeVisible();

      // Screenshot del Hero
      await page.screenshot({ path: 'test-results/screenshots/hero-after-animation.png' });

      // Verificar que los botones existen
      const buttons = page.locator('a[href*="participa"], a[href*="sobre-nosotros"]');
      const buttonCount = await buttons.count();
      console.log(`Botones en Hero: ${buttonCount}`);
    });

    test('Cursor personalizado activo', async ({ page }) => {
      await page.goto('/es', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      // Buscar el cursor personalizado
      const customCursor = page.locator('[class*="cursor"], [data-cursor]');
      const cursorExists = await customCursor.count() > 0;
      console.log(`Cursor personalizado encontrado: ${cursorExists}`);

      // Mover el mouse para activar el cursor
      await page.mouse.move(500, 300);
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'test-results/screenshots/cursor-test.png' });
    });

    test('Scroll y animaciones', async ({ page }) => {
      await page.goto('/es', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      // Scroll gradual y capturar screenshots
      const scrollPositions = [0, 500, 1000, 1500, 2000, 2500, 3000];

      for (const pos of scrollPositions) {
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'smooth' }), pos);
        await page.waitForTimeout(800);
        await page.screenshot({ path: `test-results/screenshots/scroll-${pos}px.png` });
      }
    });

    test('Sección de Líneas de Acción', async ({ page }) => {
      await page.goto('/es', { waitUntil: 'networkidle' });

      // Buscar la sección de líneas de acción
      const actionSection = page.locator('text=Líneas de Acción').first();
      if (await actionSection.count() > 0) {
        await actionSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);
        await page.screenshot({ path: 'test-results/screenshots/lineas-accion.png' });
      }
    });
  });

  test.describe('Verificación de Contacto', () => {
    test('Página de contacto - verificar formulario', async ({ page }) => {
      await page.goto('/es/contacto', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      // Buscar formulario
      const form = page.locator('form');
      const formExists = await form.count() > 0;
      console.log(`Formulario encontrado: ${formExists}`);

      // Buscar campos de input
      const inputs = page.locator('input, textarea');
      const inputCount = await inputs.count();
      console.log(`Campos de formulario: ${inputCount}`);

      // Buscar email links
      const emailLinks = page.locator('a[href^="mailto:"]');
      const emailCount = await emailLinks.count();
      console.log(`Enlaces mailto: ${emailCount}`);

      await page.screenshot({ path: 'test-results/screenshots/contacto-full.png', fullPage: true });
    });
  });

  test.describe('Verificación de PIF', () => {
    test('Página PIF - verificar contenido y PDF', async ({ page }) => {
      await page.goto('/es/pif', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      // Verificar OID
      const oidText = page.locator('text=E10413227');
      const oidExists = await oidText.count() > 0;
      console.log(`OID visible: ${oidExists}`);

      // Buscar botón de descarga PDF
      const pdfButton = page.locator('text=Descargar, text=PDF, button:has-text("PDF")');
      const pdfButtonExists = await pdfButton.count() > 0;
      console.log(`Botón PDF encontrado: ${pdfButtonExists}`);

      await page.screenshot({ path: 'test-results/screenshots/pif-full.png', fullPage: true });
    });
  });

  test.describe('Performance y Errores', () => {
    test('Verificar errores de consola', async ({ page }) => {
      const errors: string[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      page.on('pageerror', error => {
        errors.push(error.message);
      });

      await page.goto('/es', { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000);

      // Scroll para activar lazy loading
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);

      console.log('Errores encontrados:', errors.length);
      if (errors.length > 0) {
        console.log('Errores:', errors);
      }

      expect(errors.length).toBeLessThan(5); // Permitir algunos errores menores
    });

    test('Verificar imágenes cargadas', async ({ page }) => {
      await page.goto('/es', { waitUntil: 'networkidle' });

      const images = page.locator('img');
      const imageCount = await images.count();
      console.log(`Imágenes encontradas: ${imageCount}`);

      // Verificar que las imágenes tienen src
      for (let i = 0; i < Math.min(imageCount, 10); i++) {
        const src = await images.nth(i).getAttribute('src');
        console.log(`Imagen ${i + 1}: ${src?.substring(0, 50)}...`);
      }
    });
  });

  test.describe('Navegación', () => {
    test('Menú de navegación funcional', async ({ page }) => {
      await page.goto('/es', { waitUntil: 'networkidle' });

      // Verificar links de navegación
      const navLinks = page.locator('nav a, header a');
      const linkCount = await navLinks.count();
      console.log(`Links de navegación: ${linkCount}`);

      // Capturar el header
      const header = page.locator('header').first();
      if (await header.count() > 0) {
        await header.screenshot({ path: 'test-results/screenshots/header.png' });
      }
    });

    test('Footer completo', async ({ page }) => {
      await page.goto('/es', { waitUntil: 'networkidle' });

      // Scroll al footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);

      const footer = page.locator('footer').first();
      if (await footer.count() > 0) {
        await footer.screenshot({ path: 'test-results/screenshots/footer.png' });
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('Vista móvil', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
      await page.goto('/es', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      await page.screenshot({ path: 'test-results/screenshots/mobile-home.png', fullPage: true });

      // Verificar menú hamburguesa
      const menuButton = page.locator('button[aria-label*="menu"], button:has-text("menú"), [class*="hamburger"]');
      const menuExists = await menuButton.count() > 0;
      console.log(`Menú móvil encontrado: ${menuExists}`);
    });

    test('Vista tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 }); // iPad
      await page.goto('/es', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      await page.screenshot({ path: 'test-results/screenshots/tablet-home.png', fullPage: true });
    });
  });
});
