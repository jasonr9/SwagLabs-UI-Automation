import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../src/support/world';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProductsPage } from '../../src/pages/ProductPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import dotenv from 'dotenv';

dotenv.config();

let loginPage: LoginPage;
let productsPage: ProductsPage;
let checkoutPage: CheckoutPage;

Given('que el usuario ha agregado un producto al carrito y accede al checkout', async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  const productsPage = new ProductsPage(this.page);
  checkoutPage = new CheckoutPage(this.page);

  // Login
  await loginPage.goto();
  await loginPage.fillUsername(process.env.SAUCE_USERNAME || '');
  await loginPage.fillPassword(process.env.SAUCE_PASSWORD || '');
  await loginPage.clickLogin();

  // Agrega producto
  await productsPage.addProductToCart('Sauce Labs Backpack');

  // Ir al carrito
  await productsPage.goToCart();

  // Click en checkout
  await checkoutPage.clickCheckoutButton();
});

When(
  'completa sus datos con nombre, apellido y código postal',
  async function (this: CustomWorld) {
    const firstName = process.env.SAUCE_FIRSTNAME || '';
    const lastName = process.env.SAUCE_LASTNAME || '';
    const postalCode = process.env.SAUCE_ZIP || '';

    checkoutPage = new CheckoutPage(this.page);

    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinueButton();
  }
);

When('confirma el pedido', async function (this: CustomWorld) {
  await checkoutPage.confirmPurchase();
});

Then('debería ver una página de confirmación de compra exitosa', async function (this: CustomWorld) {
  await checkoutPage.assertConfirmation();
});
