import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Cat } from './cat.model';
import { CatService } from './cat.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cat',
    templateUrl: './cat.component.html'
})
export class CatComponent implements OnInit, OnDestroy {
cats: Cat[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private catService: CatService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.catService.query().subscribe(
            (res: HttpResponse<Cat[]>) => {
                this.cats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCats();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Cat) {
        return item.id;
    }
    registerChangeInCats() {
        this.eventSubscriber = this.eventManager.subscribe('catListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
