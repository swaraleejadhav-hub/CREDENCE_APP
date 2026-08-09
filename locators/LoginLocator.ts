import { Locator, Page } from "@playwright/test";

export class LoginLocator {
  readonly username: Locator;
  readonly password: Locator;
  readonly themeDrodown: Locator;
  readonly loginButton: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    this.username = page.locator("input[name='user_name']");
    this.password = page.locator("input[name='user_password']");
    this.themeDrodown = page.locator("select[name='login_theme']");
    this.loginButton = page.locator("input[name='Login']");
    this.welcomeMessage = page.getByText('Welcome admin');
  }
}
