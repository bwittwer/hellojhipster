import { BaseEntity } from './../../shared';

export class DepartmentMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public departmentName?: string,
        public toto?: string,
        public locations?: BaseEntity[],
    ) {
    }
}
