import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../login-data/login.json';
import { LoginLocator } from '../locators/LoginLocator';

test('VTiger Valid Login Credencials', async( {page}) => {
    const loginPage = new LoginPage(page);
    const loginLocator = new LoginLocator(page);

    await page.goto('/');

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password,
        loginData.validUser.theme
    )

    await expect(loginLocator.welcomeMessage).toHaveText('Welcome admin');
})

test('VTiger Invalid Login Test', async( {page}) => {
    const loginPage = new LoginPage(page);
    const loginLocator = new LoginLocator(page);

    await page.goto('/');

    await loginPage.login(
        loginData.invalidUser.username,
        loginData.invalidUser.password,
        loginData.invalidUser.theme
    )

    await expect(loginLocator.invalidCredencialMessage).toContainText('You must specify a valid username and password.')
})