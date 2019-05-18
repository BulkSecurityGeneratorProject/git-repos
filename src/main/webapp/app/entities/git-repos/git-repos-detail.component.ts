import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGitRepos } from 'app/shared/model/git-repos.model';

@Component({
  selector: 'jhi-git-repos-detail',
  templateUrl: './git-repos-detail.component.html'
})
export class GitReposDetailComponent implements OnInit {
  gitRepos: IGitRepos;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ gitRepos }) => {
      this.gitRepos = gitRepos;
    });
  }

  previousState() {
    window.history.back();
  }
}
