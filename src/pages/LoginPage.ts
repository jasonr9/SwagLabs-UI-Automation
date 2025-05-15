import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async fillUsername(username: string) {
    await this.page.fill('#user-name', username);
  }


  async fillPassword(password: string) {
   await this.page.fill('#password', password);
  }


  async clickLogin() {
  await this.page.click('#login-button');
}

  async assertLoginSuccess() {
    await this.page.waitForSelector('#dashboard');
  }
}
