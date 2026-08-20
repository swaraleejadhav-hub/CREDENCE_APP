import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LeadsLocators } from '../locators/LeadsLocator';

export class LeadsPage extends BasePage {
    private locator: LeadsLocators;

    constructor(page: Page){
        super(page);
        this.locator = new LeadsLocators(page);
    }

    async leadsPageClick(){
        await this.click(this.locator.leadsTab);
    }

}