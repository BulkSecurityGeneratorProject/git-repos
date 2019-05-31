import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GitRepos } from 'app/shared/model/git-repos.model';
import { GitReposService } from './git-repos.service';
import { GitReposComponent } from './git-repos.component';
import { GitReposDetailComponent } from './git-repos-detail.component';
import { GitReposUpdateComponent } from './git-repos-update.component';
import { GitReposDeletePopupComponent } from './git-repos-delete-dialog.component';
import { IGitRepos } from 'app/shared/model/git-repos.model';

@Injectable({ providedIn: 'root' })
export class GitReposResolve implements Resolve<IGitRepos> {
  constructor(private service: GitReposService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGitRepos> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<GitRepos>) => response.ok),
        map((gitRepos: HttpResponse<GitRepos>) => gitRepos.body)
      );
    }
    return of(new GitRepos());
  }
}

export const gitReposRoute: Routes = [
  {
    path: '',
    component: GitReposComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gitReposApp.gitRepos.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GitReposDetailComponent,
    resolve: {
      gitRepos: GitReposResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gitReposApp.gitRepos.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GitReposUpdateComponent,
    resolve: {
      gitRepos: GitReposResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gitReposApp.gitRepos.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GitReposUpdateComponent,
    resolve: {
      gitRepos: GitReposResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gitReposApp.gitRepos.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const gitReposPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: GitReposDeletePopupComponent,
    resolve: {
      gitRepos: GitReposResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gitReposApp.gitRepos.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
