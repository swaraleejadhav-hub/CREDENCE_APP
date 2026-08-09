import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../login-data/login.json';
import { LoginLocator } from '../locators/LoginLocator';

test('VTiger Login Test', async( {page}) => {
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