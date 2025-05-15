import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../src/support/world';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProductsPage } from '../../src/pages/ProductPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';

let loginPage: LoginPage;
let productsPage: ProductsPage;

Given('que el usuario ha iniciado sesión con credenciales válidas', async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
  await loginPage.fillUsername(process.env.SAUCE_USERNAME || '');
  await loginPage.fillPassword(process.env.SAUCE_PASSWORD || '');
  await loginPage.clickLogin();

  productsPage = new ProductsPage(this.page); // ← Instanciar ProductsPage aquí
});

When('agrega el producto {string} al carrito', async function (this: CustomWorld, productName: string) {
  await productsPage.addProductToCart(productName);
});

Then('el carrito debe mostrar 1 producto agregado', async function (this: CustomWorld) {
  await productsPage.goToCart();
  const cartBadge = await productsPage.getCartCount();
  expect(cartBadge).toBe('1');
});
