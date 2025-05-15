import { expect } from '@playwright/test';


import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../src/pages/LoginPage';
import { CustomWorld } from '../../src/support/world';
import dotenv from 'dotenv';

dotenv.config();

let loginPage: LoginPage;


Given('que el usuario está en la página de login', async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

When('ingresa sus credenciales válidas', async function (this: CustomWorld) {
  const username = process.env.SAUCE_USERNAME || '';
  const password = process.env.SAUCE_PASSWORD || '';
  await loginPage.fillUsername(username);
  await loginPage.fillPassword(password);
});

When('hace clic en el botón de login', async function () {
  await loginPage.clickLogin();
});

Then('debería ver la página principal de productos', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/.*inventory/);
});

When('ingresa sus credenciales inválidas', async function (this: CustomWorld) {
  const username = process.env.INVALID_USERNAME || '';
  const password = process.env.INVALID_PASSWORD || '';
  await loginPage.fillUsername(username);
  await loginPage.fillPassword(password);
});


Then('debería ver un mensaje de error de credenciales inválidas', async function (this: CustomWorld) {
  const errorMsg = await this.page.locator('[data-test="error"]').textContent();
  expect(errorMsg).toContain('Username and password do not match');
  //await this.page.pause();
});
