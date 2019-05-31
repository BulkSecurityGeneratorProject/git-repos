import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GitReposSharedModule } from 'app/shared';
import {
  GitReposComponent,
  GitReposDetailComponent,
  GitReposUpdateComponent,
  GitReposDeletePopupComponent,
  GitReposDeleteDialogComponent,
  gitReposRoute,
  gitReposPopupRoute
} from './';

const ENTITY_STATES = [...gitReposRoute, ...gitReposPopupRoute];

@NgModule({
  imports: [GitReposSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    GitReposComponent,
    GitReposDetailComponent,
    GitReposUpdateComponent,
    GitReposDeleteDialogComponent,
    GitReposDeletePopupComponent
  ],
  entryComponents: [GitReposComponent, GitReposUpdateComponent, GitReposDeleteDialogComponent, GitReposDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GitReposGitReposModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
