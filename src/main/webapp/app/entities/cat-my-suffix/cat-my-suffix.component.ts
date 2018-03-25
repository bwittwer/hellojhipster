import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CatMySuffix } from './cat-my-suffix.model';
import { CatMySuffixService } from './cat-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cat-my-suffix',
    templateUrl: './cat-my-suffix.component.html'
})
export class CatMySuffixComponent implements OnInit, OnDestroy {
cats: CatMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private catService: CatMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.catService.query().subscribe(
            (res: HttpResponse<CatMySuffix[]>) => {
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

    trackId(index: number, item: CatMySuffix) {
        return item.id;
    }
    registerChangeInCats() {
        this.eventSubscriber = this.eventManager.subscribe('catListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
