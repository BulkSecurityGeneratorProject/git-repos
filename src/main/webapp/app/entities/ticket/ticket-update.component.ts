import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITicket, Ticket } from 'app/shared/model/ticket.model';
import { TicketService } from './ticket.service';
import { IGitRepos } from 'app/shared/model/git-repos.model';
import { GitReposService } from 'app/entities/git-repos';

@Component({
  selector: 'jhi-ticket-update',
  templateUrl: './ticket-update.component.html'
})
export class TicketUpdateComponent implements OnInit {
  ticket: ITicket;
  isSaving: boolean;

  gitrepos: IGitRepos[];

  editForm = this.fb.group({
    id: [],
    ticketNumber: [],
    ticketUrl: [],
    ticketEstimation: [],
    repos: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ticketService: TicketService,
    protected gitReposService: GitReposService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ticket }) => {
      this.updateForm(ticket);
      this.ticket = ticket;
    });
    this.gitReposService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IGitRepos[]>) => mayBeOk.ok),
        map((response: HttpResponse<IGitRepos[]>) => response.body)
      )
      .subscribe((res: IGitRepos[]) => (this.gitrepos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(ticket: ITicket) {
    this.editForm.patchValue({
      id: ticket.id,
      ticketNumber: ticket.ticketNumber,
      ticketUrl: ticket.ticketUrl,
      ticketEstimation: ticket.ticketEstimation,
      repos: ticket.repos
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ticket = this.createFromForm();
    if (ticket.id !== undefined) {
      this.subscribeToSaveResponse(this.ticketService.update(ticket));
    } else {
      this.subscribeToSaveResponse(this.ticketService.create(ticket));
    }
  }

  private createFromForm(): ITicket {
    const entity = {
      ...new Ticket(),
      id: this.editForm.get(['id']).value,
      ticketNumber: this.editForm.get(['ticketNumber']).value,
      ticketUrl: this.editForm.get(['ticketUrl']).value,
      ticketEstimation: this.editForm.get(['ticketEstimation']).value,
      repos: this.editForm.get(['repos']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITicket>>) {
    result.subscribe((res: HttpResponse<ITicket>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackGitReposById(index: number, item: IGitRepos) {
    return item.id;
  }
}
