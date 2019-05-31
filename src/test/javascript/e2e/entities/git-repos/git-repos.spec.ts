/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GitReposComponentsPage, GitReposDeleteDialog, GitReposUpdatePage } from './git-repos.page-object';

const expect = chai.expect;

describe('GitRepos e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let gitReposUpdatePage: GitReposUpdatePage;
  let gitReposComponentsPage: GitReposComponentsPage;
  let gitReposDeleteDialog: GitReposDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load GitRepos', async () => {
    await navBarPage.goToEntity('git-repos');
    gitReposComponentsPage = new GitReposComponentsPage();
    await browser.wait(ec.visibilityOf(gitReposComponentsPage.title), 5000);
    expect(await gitReposComponentsPage.getTitle()).to.eq('gitReposApp.gitRepos.home.title');
  });

  it('should load create GitRepos page', async () => {
    await gitReposComponentsPage.clickOnCreateButton();
    gitReposUpdatePage = new GitReposUpdatePage();
    expect(await gitReposUpdatePage.getPageTitle()).to.eq('gitReposApp.gitRepos.home.createOrEditLabel');
    await gitReposUpdatePage.cancel();
  });

  it('should create and save GitRepos', async () => {
    const nbButtonsBeforeCreate = await gitReposComponentsPage.countDeleteButtons();

    await gitReposComponentsPage.clickOnCreateButton();
    await promise.all([
      gitReposUpdatePage.setGitNameInput('gitName'),
      gitReposUpdatePage.setGitUrlInput('gitUrl'),
      gitReposUpdatePage.setGitUserInput('gitUser'),
      gitReposUpdatePage.setGitPassInput('gitPass'),
      gitReposUpdatePage.setGitKeyInput('gitKey')
    ]);
    expect(await gitReposUpdatePage.getGitNameInput()).to.eq('gitName', 'Expected GitName value to be equals to gitName');
    expect(await gitReposUpdatePage.getGitUrlInput()).to.eq('gitUrl', 'Expected GitUrl value to be equals to gitUrl');
    expect(await gitReposUpdatePage.getGitUserInput()).to.eq('gitUser', 'Expected GitUser value to be equals to gitUser');
    expect(await gitReposUpdatePage.getGitPassInput()).to.eq('gitPass', 'Expected GitPass value to be equals to gitPass');
    expect(await gitReposUpdatePage.getGitKeyInput()).to.eq('gitKey', 'Expected GitKey value to be equals to gitKey');
    await gitReposUpdatePage.save();
    expect(await gitReposUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await gitReposComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last GitRepos', async () => {
    const nbButtonsBeforeDelete = await gitReposComponentsPage.countDeleteButtons();
    await gitReposComponentsPage.clickOnLastDeleteButton();

    gitReposDeleteDialog = new GitReposDeleteDialog();
    expect(await gitReposDeleteDialog.getDialogTitle()).to.eq('gitReposApp.gitRepos.delete.question');
    await gitReposDeleteDialog.clickOnConfirmButton();

    expect(await gitReposComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
