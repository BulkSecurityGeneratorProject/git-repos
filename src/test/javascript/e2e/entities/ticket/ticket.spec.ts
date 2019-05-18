/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TicketComponentsPage, TicketDeleteDialog, TicketUpdatePage } from './ticket.page-object';

const expect = chai.expect;

describe('Ticket e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ticketUpdatePage: TicketUpdatePage;
  let ticketComponentsPage: TicketComponentsPage;
  let ticketDeleteDialog: TicketDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Tickets', async () => {
    await navBarPage.goToEntity('ticket');
    ticketComponentsPage = new TicketComponentsPage();
    await browser.wait(ec.visibilityOf(ticketComponentsPage.title), 5000);
    expect(await ticketComponentsPage.getTitle()).to.eq('gitReposApp.ticket.home.title');
  });

  it('should load create Ticket page', async () => {
    await ticketComponentsPage.clickOnCreateButton();
    ticketUpdatePage = new TicketUpdatePage();
    expect(await ticketUpdatePage.getPageTitle()).to.eq('gitReposApp.ticket.home.createOrEditLabel');
    await ticketUpdatePage.cancel();
  });

  it('should create and save Tickets', async () => {
    const nbButtonsBeforeCreate = await ticketComponentsPage.countDeleteButtons();

    await ticketComponentsPage.clickOnCreateButton();
    await promise.all([
      ticketUpdatePage.setTicketNumberInput('5'),
      ticketUpdatePage.setTicketUrlInput('ticketUrl'),
      ticketUpdatePage.setTicketEstimationInput('5'),
      ticketUpdatePage.reposSelectLastOption()
    ]);
    expect(await ticketUpdatePage.getTicketNumberInput()).to.eq('5', 'Expected ticketNumber value to be equals to 5');
    expect(await ticketUpdatePage.getTicketUrlInput()).to.eq('ticketUrl', 'Expected TicketUrl value to be equals to ticketUrl');
    expect(await ticketUpdatePage.getTicketEstimationInput()).to.eq('5', 'Expected ticketEstimation value to be equals to 5');
    await ticketUpdatePage.save();
    expect(await ticketUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ticketComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Ticket', async () => {
    const nbButtonsBeforeDelete = await ticketComponentsPage.countDeleteButtons();
    await ticketComponentsPage.clickOnLastDeleteButton();

    ticketDeleteDialog = new TicketDeleteDialog();
    expect(await ticketDeleteDialog.getDialogTitle()).to.eq('gitReposApp.ticket.delete.question');
    await ticketDeleteDialog.clickOnConfirmButton();

    expect(await ticketComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
