/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HellojhipsterTestModule } from '../../../test.module';
import { CatMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cat-my-suffix/cat-my-suffix-delete-dialog.component';
import { CatMySuffixService } from '../../../../../../main/webapp/app/entities/cat-my-suffix/cat-my-suffix.service';

describe('Component Tests', () => {

    describe('CatMySuffix Management Delete Component', () => {
        let comp: CatMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CatMySuffixDeleteDialogComponent>;
        let service: CatMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HellojhipsterTestModule],
                declarations: [CatMySuffixDeleteDialogComponent],
                providers: [
                    CatMySuffixService
                ]
            })
            .overrideTemplate(CatMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CatMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CatMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
