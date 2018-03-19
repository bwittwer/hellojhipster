import { BaseEntity } from './../../shared';

export class CountryMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public countryName?: string,
        public test?: string,
        public regionId?: number,
    ) {
    }
}
