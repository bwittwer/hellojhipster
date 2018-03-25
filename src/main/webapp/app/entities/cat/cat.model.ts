import { BaseEntity } from './../../shared';

export class Cat implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public age?: number,
        public catId?: number,
    ) {
    }
}
