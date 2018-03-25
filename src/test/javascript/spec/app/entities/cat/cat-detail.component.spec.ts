/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HellojhipsterTestModule } from '../../../test.module';
import { CatDetailComponent } from '../../../../../../main/webapp/app/entities/cat/cat-detail.component';
import { CatService } from '../../../../../../main/webapp/app/entities/cat/cat.service';
import { Cat } from '../../../../../../main/webapp/app/entities/cat/cat.model';

describe('Component Tests', () => {

    describe('Cat Management Detail Component', () => {
        let comp: CatDetailComponent;
        let fixture: ComponentFixture<CatDetailComponent>;
        let service: CatService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HellojhipsterTestModule],
                declarations: [CatDetailComponent],
                providers: [
                    CatService
                ]
            })
            .overrideTemplate(CatDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CatDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CatService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Cat(123)
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
