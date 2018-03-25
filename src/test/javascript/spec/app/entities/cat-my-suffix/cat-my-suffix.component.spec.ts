/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HellojhipsterTestModule } from '../../../test.module';
import { CatMySuffixComponent } from '../../../../../../main/webapp/app/entities/cat-my-suffix/cat-my-suffix.component';
import { CatMySuffixService } from '../../../../../../main/webapp/app/entities/cat-my-suffix/cat-my-suffix.service';
import { CatMySuffix } from '../../../../../../main/webapp/app/entities/cat-my-suffix/cat-my-suffix.model';

describe('Component Tests', () => {

    describe('CatMySuffix Management Component', () => {
        let comp: CatMySuffixComponent;
        let fixture: ComponentFixture<CatMySuffixComponent>;
        let service: CatMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HellojhipsterTestModule],
                declarations: [CatMySuffixComponent],
                providers: [
                    CatMySuffixService
                ]
            })
            .overrideTemplate(CatMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CatMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CatMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CatMySuffix(123)],
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
