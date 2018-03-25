/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HellojhipsterTestModule } from '../../../test.module';
import { CatMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/cat-my-suffix/cat-my-suffix-detail.component';
import { CatMySuffixService } from '../../../../../../main/webapp/app/entities/cat-my-suffix/cat-my-suffix.service';
import { CatMySuffix } from '../../../../../../main/webapp/app/entities/cat-my-suffix/cat-my-suffix.model';

describe('Component Tests', () => {

    describe('CatMySuffix Management Detail Component', () => {
        let comp: CatMySuffixDetailComponent;
        let fixture: ComponentFixture<CatMySuffixDetailComponent>;
        let service: CatMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HellojhipsterTestModule],
                declarations: [CatMySuffixDetailComponent],
                providers: [
                    CatMySuffixService
                ]
            })
            .overrideTemplate(CatMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CatMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CatMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CatMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cat).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
