/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GitReposTestModule } from '../../../test.module';
import { GitReposComponent } from 'app/entities/git-repos/git-repos.component';
import { GitReposService } from 'app/entities/git-repos/git-repos.service';
import { GitRepos } from 'app/shared/model/git-repos.model';

describe('Component Tests', () => {
  describe('GitRepos Management Component', () => {
    let comp: GitReposComponent;
    let fixture: ComponentFixture<GitReposComponent>;
    let service: GitReposService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GitReposTestModule],
        declarations: [GitReposComponent],
        providers: []
      })
        .overrideTemplate(GitReposComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GitReposComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GitReposService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GitRepos(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.gitRepos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
