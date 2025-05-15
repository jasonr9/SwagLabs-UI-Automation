import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from '@playwright/test';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init() {
    console.log('Lanzando navegador...');
    try {
      this.browser = await chromium.launch({
        headless: false,
        slowMo: 500
      });
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
      console.log('Navegador listo');
    } catch (e) {
      console.error('Error lanzando navegador:', e);
      throw e;
    }
  }  

  async cleanup() {
    if (this.browser) {
      console.log('🧹 Cerrando navegador...');
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
