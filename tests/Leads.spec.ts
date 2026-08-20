import { expect, test } from "@playwright/test";
import { LeadsPage } from "../pages/LeadsPage";
import { LeadsLocators } from "../locators/LeadsLocator";
import { LoginPage } from "../pages/LoginPage";
import loginData from '../login-data/login.json';

test('Leads Page Click', async ({ page}) => {
    const leadsPage = new LeadsPage(page);
    const leadsLoator = new LeadsLocators(page);
    const loginPage = new LoginPage(page);
    
    await page.goto('/');
    
    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password,
        loginData.validUser.theme
    )

    await leadsPage.leadsPageClick();

    await expect(leadsLoator.leadsHome).toHaveText(' Leads: Home');


})