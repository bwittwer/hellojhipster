import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CatComponent } from './cat.component';
import { CatDetailComponent } from './cat-detail.component';
import { CatPopupComponent } from './cat-dialog.component';
import { CatDeletePopupComponent } from './cat-delete-dialog.component';

export const catRoute: Routes = [
    {
        path: 'cat',
        component: CatComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cats'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cat/:id',
        component: CatDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cats'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const catPopupRoute: Routes = [
    {
        path: 'cat-new',
        component: CatPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cats'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cat/:id/edit',
        component: CatPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cats'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cat/:id/delete',
        component: CatDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cats'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
