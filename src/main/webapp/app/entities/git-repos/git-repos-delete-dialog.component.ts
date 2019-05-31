import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGitRepos } from 'app/shared/model/git-repos.model';
import { GitReposService } from './git-repos.service';

@Component({
  selector: 'jhi-git-repos-delete-dialog',
  templateUrl: './git-repos-delete-dialog.component.html'
})
export class GitReposDeleteDialogComponent {
  gitRepos: IGitRepos;

  constructor(protected gitReposService: GitReposService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.gitReposService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'gitReposListModification',
        content: 'Deleted an gitRepos'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-git-repos-delete-popup',
  template: ''
})
export class GitReposDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ gitRepos }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(GitReposDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.gitRepos = gitRepos;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/git-repos', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/git-repos', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
