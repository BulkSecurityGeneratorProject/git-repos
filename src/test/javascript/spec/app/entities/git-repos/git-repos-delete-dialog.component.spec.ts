/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GitReposTestModule } from '../../../test.module';
import { GitReposDeleteDialogComponent } from 'app/entities/git-repos/git-repos-delete-dialog.component';
import { GitReposService } from 'app/entities/git-repos/git-repos.service';

describe('Component Tests', () => {
  describe('GitRepos Management Delete Component', () => {
    let comp: GitReposDeleteDialogComponent;
    let fixture: ComponentFixture<GitReposDeleteDialogComponent>;
    let service: GitReposService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GitReposTestModule],
        declarations: [GitReposDeleteDialogComponent]
      })
        .overrideTemplate(GitReposDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GitReposDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GitReposService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
