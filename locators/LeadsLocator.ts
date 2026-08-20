import { Locator, Page } from '@playwright/test';

export class LeadsLocators {
    readonly leadsTab : Locator;
    readonly leadsHome : Locator;

    constructor(page: Page){
        this.leadsTab = page.getByRole("link", {name:'Leads'});
        this.leadsHome = page.getByText(" Leads: Home");
    }
}