/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GitReposTestModule } from '../../../test.module';
import { GitReposDetailComponent } from 'app/entities/git-repos/git-repos-detail.component';
import { GitRepos } from 'app/shared/model/git-repos.model';

describe('Component Tests', () => {
  describe('GitRepos Management Detail Component', () => {
    let comp: GitReposDetailComponent;
    let fixture: ComponentFixture<GitReposDetailComponent>;
    const route = ({ data: of({ gitRepos: new GitRepos(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GitReposTestModule],
        declarations: [GitReposDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GitReposDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GitReposDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.gitRepos).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
