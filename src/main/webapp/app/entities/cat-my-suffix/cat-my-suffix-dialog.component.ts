import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CatMySuffix } from './cat-my-suffix.model';
import { CatMySuffixPopupService } from './cat-my-suffix-popup.service';
import { CatMySuffixService } from './cat-my-suffix.service';
import { LocationMySuffix, LocationMySuffixService } from '../location-my-suffix';

@Component({
    selector: 'jhi-cat-my-suffix-dialog',
    templateUrl: './cat-my-suffix-dialog.component.html'
})
export class CatMySuffixDialogComponent implements OnInit {

    cat: CatMySuffix;
    isSaving: boolean;

    locations: LocationMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private catService: CatMySuffixService,
        private locationService: LocationMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.locationService.query()
            .subscribe((res: HttpResponse<LocationMySuffix[]>) => { this.locations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<CatMySuffix>>) {
        result.subscribe((res: HttpResponse<CatMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CatMySuffix) {
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

    trackLocationById(index: number, item: LocationMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cat-my-suffix-popup',
    template: ''
})
export class CatMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private catPopupService: CatMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.catPopupService
                    .open(CatMySuffixDialogComponent as Component, params['id']);
            } else {
                this.catPopupService
                    .open(CatMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
