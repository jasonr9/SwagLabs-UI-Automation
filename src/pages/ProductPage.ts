import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

 async addProductToCart(productName: string) {
  const formattedName = productName
        .toLowerCase()
        .replaceAll(' ', '-')
    .replaceAll('.', '') 
    .replaceAll("'", ''); 

  const buttonSelector = `#add-to-cart-${formattedName}`;
  await this.page.click(buttonSelector);
}

  async goToCart() {
    await this.page.click('.shopping_cart_link'); 
  }

  async getCartCount(): Promise<string | null> {
    return this.page.locator('.shopping_cart_badge').textContent();
  }
}
