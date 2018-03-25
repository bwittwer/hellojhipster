import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CatMySuffix } from './cat-my-suffix.model';
import { CatMySuffixPopupService } from './cat-my-suffix-popup.service';
import { CatMySuffixService } from './cat-my-suffix.service';

@Component({
    selector: 'jhi-cat-my-suffix-delete-dialog',
    templateUrl: './cat-my-suffix-delete-dialog.component.html'
})
export class CatMySuffixDeleteDialogComponent {

    cat: CatMySuffix;

    constructor(
        private catService: CatMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.catService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'catListModification',
                content: 'Deleted an cat'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cat-my-suffix-delete-popup',
    template: ''
})
export class CatMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private catPopupService: CatMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.catPopupService
                .open(CatMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
