import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HellojhipsterRegionMySuffixModule } from './region-my-suffix/region-my-suffix.module';
import { HellojhipsterCountryMySuffixModule } from './country-my-suffix/country-my-suffix.module';
import { HellojhipsterLocationMySuffixModule } from './location-my-suffix/location-my-suffix.module';
import { HellojhipsterDepartmentMySuffixModule } from './department-my-suffix/department-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        HellojhipsterRegionMySuffixModule,
        HellojhipsterCountryMySuffixModule,
        HellojhipsterLocationMySuffixModule,
        HellojhipsterDepartmentMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HellojhipsterEntityModule {}
