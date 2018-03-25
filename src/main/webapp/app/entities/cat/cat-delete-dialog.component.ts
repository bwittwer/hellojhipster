import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Cat } from './cat.model';
import { CatPopupService } from './cat-popup.service';
import { CatService } from './cat.service';

@Component({
    selector: 'jhi-cat-delete-dialog',
    templateUrl: './cat-delete-dialog.component.html'
})
export class CatDeleteDialogComponent {

    cat: Cat;

    constructor(
        private catService: CatService,
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
    selector: 'jhi-cat-delete-popup',
    template: ''
})
export class CatDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private catPopupService: CatPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.catPopupService
                .open(CatDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
