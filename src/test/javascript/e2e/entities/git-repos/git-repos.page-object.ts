import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class GitReposComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-git-repos div table .btn-danger'));
  title = element.all(by.css('jhi-git-repos div h2#page-heading span')).first();

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

export class GitReposUpdatePage {
  pageTitle = element(by.id('jhi-git-repos-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  gitNameInput = element(by.id('field_gitName'));
  gitUrlInput = element(by.id('field_gitUrl'));
  gitUserInput = element(by.id('field_gitUser'));
  gitPassInput = element(by.id('field_gitPass'));
  gitKeyInput = element(by.id('field_gitKey'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setGitNameInput(gitName) {
    await this.gitNameInput.sendKeys(gitName);
  }

  async getGitNameInput() {
    return await this.gitNameInput.getAttribute('value');
  }

  async setGitUrlInput(gitUrl) {
    await this.gitUrlInput.sendKeys(gitUrl);
  }

  async getGitUrlInput() {
    return await this.gitUrlInput.getAttribute('value');
  }

  async setGitUserInput(gitUser) {
    await this.gitUserInput.sendKeys(gitUser);
  }

  async getGitUserInput() {
    return await this.gitUserInput.getAttribute('value');
  }

  async setGitPassInput(gitPass) {
    await this.gitPassInput.sendKeys(gitPass);
  }

  async getGitPassInput() {
    return await this.gitPassInput.getAttribute('value');
  }

  async setGitKeyInput(gitKey) {
    await this.gitKeyInput.sendKeys(gitKey);
  }

  async getGitKeyInput() {
    return await this.gitKeyInput.getAttribute('value');
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

export class GitReposDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-gitRepos-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-gitRepos'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
