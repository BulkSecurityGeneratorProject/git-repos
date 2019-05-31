import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class TicketComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ticket div table .btn-danger'));
  title = element.all(by.css('jhi-ticket div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class TicketUpdatePage {
  pageTitle = element(by.id('jhi-ticket-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  ticketNumberInput = element(by.id('field_ticketNumber'));
  ticketUrlInput = element(by.id('field_ticketUrl'));
  ticketEstimationInput = element(by.id('field_ticketEstimation'));
  reposSelect = element(by.id('field_repos'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTicketNumberInput(ticketNumber) {
    await this.ticketNumberInput.sendKeys(ticketNumber);
  }

  async getTicketNumberInput() {
    return await this.ticketNumberInput.getAttribute('value');
  }

  async setTicketUrlInput(ticketUrl) {
    await this.ticketUrlInput.sendKeys(ticketUrl);
  }

  async getTicketUrlInput() {
    return await this.ticketUrlInput.getAttribute('value');
  }

  async setTicketEstimationInput(ticketEstimation) {
    await this.ticketEstimationInput.sendKeys(ticketEstimation);
  }

  async getTicketEstimationInput() {
    return await this.ticketEstimationInput.getAttribute('value');
  }

  async reposSelectLastOption(timeout?: number) {
    await this.reposSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async reposSelectOption(option) {
    await this.reposSelect.sendKeys(option);
  }

  getReposSelect(): ElementFinder {
    return this.reposSelect;
  }

  async getReposSelectedOption() {
    return await this.reposSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class TicketDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ticket-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ticket'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
