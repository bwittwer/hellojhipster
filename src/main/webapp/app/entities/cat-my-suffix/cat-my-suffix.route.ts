import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CatMySuffixComponent } from './cat-my-suffix.component';
import { CatMySuffixDetailComponent } from './cat-my-suffix-detail.component';
import { CatMySuffixPopupComponent } from './cat-my-suffix-dialog.component';
import { CatMySuffixDeletePopupComponent } from './cat-my-suffix-delete-dialog.component';

export const catRoute: Routes = [
    {
        path: 'cat-my-suffix',
        component: CatMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cats'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cat-my-suffix/:id',
        component: CatMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cats'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const catPopupRoute: Routes = [
    {
        path: 'cat-my-suffix-new',
        component: CatMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cats'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cat-my-suffix/:id/edit',
        component: CatMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cats'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cat-my-suffix/:id/delete',
        component: CatMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cats'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
