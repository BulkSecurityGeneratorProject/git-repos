import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGitRepos } from 'app/shared/model/git-repos.model';
import { AccountService } from 'app/core';
import { GitReposService } from './git-repos.service';

@Component({
  selector: 'jhi-git-repos',
  templateUrl: './git-repos.component.html'
})
export class GitReposComponent implements OnInit, OnDestroy {
  gitRepos: IGitRepos[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected gitReposService: GitReposService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.gitReposService
      .query()
      .pipe(
        filter((res: HttpResponse<IGitRepos[]>) => res.ok),
        map((res: HttpResponse<IGitRepos[]>) => res.body)
      )
      .subscribe(
        (res: IGitRepos[]) => {
          this.gitRepos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInGitRepos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IGitRepos) {
    return item.id;
  }

  registerChangeInGitRepos() {
    this.eventSubscriber = this.eventManager.subscribe('gitReposListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
