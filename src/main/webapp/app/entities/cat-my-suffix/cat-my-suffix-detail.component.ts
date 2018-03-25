import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CatMySuffix } from './cat-my-suffix.model';
import { CatMySuffixService } from './cat-my-suffix.service';

@Component({
    selector: 'jhi-cat-my-suffix-detail',
    templateUrl: './cat-my-suffix-detail.component.html'
})
export class CatMySuffixDetailComponent implements OnInit, OnDestroy {

    cat: CatMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private catService: CatMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCats();
    }

    load(id) {
        this.catService.find(id)
            .subscribe((catResponse: HttpResponse<CatMySuffix>) => {
                this.cat = catResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCats() {
        this.eventSubscriber = this.eventManager.subscribe(
            'catListModification',
            (response) => this.load(this.cat.id)
        );
    }
}
