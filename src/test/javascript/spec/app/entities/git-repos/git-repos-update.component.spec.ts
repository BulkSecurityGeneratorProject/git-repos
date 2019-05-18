/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GitReposTestModule } from '../../../test.module';
import { GitReposUpdateComponent } from 'app/entities/git-repos/git-repos-update.component';
import { GitReposService } from 'app/entities/git-repos/git-repos.service';
import { GitRepos } from 'app/shared/model/git-repos.model';

describe('Component Tests', () => {
  describe('GitRepos Management Update Component', () => {
    let comp: GitReposUpdateComponent;
    let fixture: ComponentFixture<GitReposUpdateComponent>;
    let service: GitReposService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GitReposTestModule],
        declarations: [GitReposUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GitReposUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GitReposUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GitReposService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GitRepos(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new GitRepos();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
