import { Page, expect } from '@playwright/test';


export class CheckoutPage {
  constructor(private page: Page) {}

  async clickCheckoutButton() {
    await this.page.click('#checkout');
  }

 async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
  await this.page.fill('#first-name', firstName);
  await this.page.fill('#last-name', lastName);
  await this.page.fill('#postal-code', postalCode);
}


 async goToCart() {
    await this.page.click('.shopping_cart_link'); 
  }

  async clickContinueButton() {
  await this.page.click('#continue');
}

  async confirmPurchase() {
  await this.page.click('#finish');
}

  async assertConfirmation() {
  const confirmationMessage = await this.page.locator('.complete-header').textContent();
  expect(confirmationMessage).toContain('Thank you for your order!');
}
}
