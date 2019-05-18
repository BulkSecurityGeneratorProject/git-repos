import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GitReposSharedLibsModule, GitReposSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [GitReposSharedLibsModule, GitReposSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [GitReposSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GitReposSharedModule {
  static forRoot() {
    return {
      ngModule: GitReposSharedModule
    };
  }
}
