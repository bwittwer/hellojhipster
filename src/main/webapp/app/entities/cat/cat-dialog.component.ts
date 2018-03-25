import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Cat } from './cat.model';
import { CatPopupService } from './cat-popup.service';
import { CatService } from './cat.service';
import { Location, LocationService } from '../location';

@Component({
    selector: 'jhi-cat-dialog',
    templateUrl: './cat-dialog.component.html'
})
export class CatDialogComponent implements OnInit {

    cat: Cat;
    isSaving: boolean;

    locations: Location[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private catService: CatService,
        private locationService: LocationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.locationService.query()
            .subscribe((res: HttpResponse<Location[]>) => { this.locations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cat.id !== undefined) {
            this.subscribeToSaveResponse(
                this.catService.update(this.cat));
        } else {
            this.subscribeToSaveResponse(
                this.catService.create(this.cat));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Cat>>) {
        result.subscribe((res: HttpResponse<Cat>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Cat) {
        this.eventManager.broadcast({ name: 'catListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cat-popup',
    template: ''
})
export class CatPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private catPopupService: CatPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.catPopupService
                    .open(CatDialogComponent as Component, params['id']);
            } else {
                this.catPopupService
                    .open(CatDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
