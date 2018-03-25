import { BaseEntity } from './../../shared';

export class CatMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public age?: number,
        public catId?: number,
    ) {
    }
}
