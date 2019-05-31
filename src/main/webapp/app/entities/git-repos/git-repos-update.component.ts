import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IGitRepos, GitRepos } from 'app/shared/model/git-repos.model';
import { GitReposService } from './git-repos.service';

@Component({
  selector: 'jhi-git-repos-update',
  templateUrl: './git-repos-update.component.html'
})
export class GitReposUpdateComponent implements OnInit {
  gitRepos: IGitRepos;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    gitName: [],
    gitUrl: [],
    gitUser: [],
    gitPass: [],
    gitKey: []
  });

  constructor(protected gitReposService: GitReposService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ gitRepos }) => {
      this.updateForm(gitRepos);
      this.gitRepos = gitRepos;
    });
  }

  updateForm(gitRepos: IGitRepos) {
    this.editForm.patchValue({
      id: gitRepos.id,
      gitName: gitRepos.gitName,
      gitUrl: gitRepos.gitUrl,
      gitUser: gitRepos.gitUser,
      gitPass: gitRepos.gitPass,
      gitKey: gitRepos.gitKey
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const gitRepos = this.createFromForm();
    if (gitRepos.id !== undefined) {
      this.subscribeToSaveResponse(this.gitReposService.update(gitRepos));
    } else {
      this.subscribeToSaveResponse(this.gitReposService.create(gitRepos));
    }
  }

  private createFromForm(): IGitRepos {
    const entity = {
      ...new GitRepos(),
      id: this.editForm.get(['id']).value,
      gitName: this.editForm.get(['gitName']).value,
      gitUrl: this.editForm.get(['gitUrl']).value,
      gitUser: this.editForm.get(['gitUser']).value,
      gitPass: this.editForm.get(['gitPass']).value,
      gitKey: this.editForm.get(['gitKey']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGitRepos>>) {
    result.subscribe((res: HttpResponse<IGitRepos>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
