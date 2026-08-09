import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { LoginLocator } from "../locators/LoginLocator";

export class LoginPage extends BasePage {
  private locator: LoginLocator;

  constructor(page: Page) {
    super(page);

    this.locator = new LoginLocator(page);
  }

  async enterUsername(username: string) {
    await this.fill(this.locator.username, username);
  }

  async enterPassword(password: string) {
    await this.fill(this.locator.password, password);
  }

  async selectTheme(theme: string) {
    await this.locator.themeDrodown.selectOption(theme);
  }

  async clickLoginButton() {
    await this.click(this.locator.loginButton);
  }

  async login(username: string, password: string, theme: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.selectTheme(theme);
    await this.clickLoginButton();
  }
 
}
