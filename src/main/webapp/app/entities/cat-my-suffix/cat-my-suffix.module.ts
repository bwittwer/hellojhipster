import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HellojhipsterSharedModule } from '../../shared';
import {
    CatMySuffixService,
    CatMySuffixPopupService,
    CatMySuffixComponent,
    CatMySuffixDetailComponent,
    CatMySuffixDialogComponent,
    CatMySuffixPopupComponent,
    CatMySuffixDeletePopupComponent,
    CatMySuffixDeleteDialogComponent,
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
        CatMySuffixComponent,
        CatMySuffixDetailComponent,
        CatMySuffixDialogComponent,
        CatMySuffixDeleteDialogComponent,
        CatMySuffixPopupComponent,
        CatMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CatMySuffixComponent,
        CatMySuffixDialogComponent,
        CatMySuffixPopupComponent,
        CatMySuffixDeleteDialogComponent,
        CatMySuffixDeletePopupComponent,
    ],
    providers: [
        CatMySuffixService,
        CatMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HellojhipsterCatMySuffixModule {}
