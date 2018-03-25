import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HellojhipsterSharedModule } from '../../shared';
import {
    CatService,
    CatPopupService,
    CatComponent,
    CatDetailComponent,
    CatDialogComponent,
    CatPopupComponent,
    CatDeletePopupComponent,
    CatDeleteDialogComponent,
    catRoute,
    catPopupRoute,
} from './';

const ENTITY_STATES = [
    ...catRoute,
    ...catPopupRoute,
];

@NgModule({
    imports: [
        HellojhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CatComponent,
        CatDetailComponent,
        CatDialogComponent,
        CatDeleteDialogComponent,
        CatPopupComponent,
        CatDeletePopupComponent,
    ],
    entryComponents: [
        CatComponent,
        CatDialogComponent,
        CatPopupComponent,
        CatDeleteDialogComponent,
        CatDeletePopupComponent,
    ],
    providers: [
        CatService,
        CatPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HellojhipsterCatModule {}
