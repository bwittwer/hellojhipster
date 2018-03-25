/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HellojhipsterTestModule } from '../../../test.module';
import { CatComponent } from '../../../../../../main/webapp/app/entities/cat/cat.component';
import { CatService } from '../../../../../../main/webapp/app/entities/cat/cat.service';
import { Cat } from '../../../../../../main/webapp/app/entities/cat/cat.model';

describe('Component Tests', () => {

    describe('Cat Management Component', () => {
        let comp: CatComponent;
        let fixture: ComponentFixture<CatComponent>;
        let service: CatService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HellojhipsterTestModule],
                declarations: [CatComponent],
                providers: [
                    CatService
                ]
            })
            .overrideTemplate(CatComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CatComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CatService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Cat(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cats[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
