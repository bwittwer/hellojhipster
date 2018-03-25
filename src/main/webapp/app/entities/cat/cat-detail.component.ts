import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Cat } from './cat.model';
import { CatService } from './cat.service';

@Component({
    selector: 'jhi-cat-detail',
    templateUrl: './cat-detail.component.html'
})
export class CatDetailComponent implements OnInit, OnDestroy {

    cat: Cat;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private catService: CatService,
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
            .subscribe((catResponse: HttpResponse<Cat>) => {
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
