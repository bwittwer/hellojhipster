import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Cat } from './cat.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Cat>;

@Injectable()
export class CatService {

    private resourceUrl =  SERVER_API_URL + 'api/cats';

    constructor(private http: HttpClient) { }

    create(cat: Cat): Observable<EntityResponseType> {
        const copy = this.convert(cat);
        return this.http.post<Cat>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cat: Cat): Observable<EntityResponseType> {
        const copy = this.convert(cat);
        return this.http.put<Cat>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Cat>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Cat[]>> {
        const options = createRequestOption(req);
        return this.http.get<Cat[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Cat[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Cat = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Cat[]>): HttpResponse<Cat[]> {
        const jsonResponse: Cat[] = res.body;
        const body: Cat[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Cat.
     */
    private convertItemFromServer(cat: Cat): Cat {
        const copy: Cat = Object.assign({}, cat);
        return copy;
    }

    /**
     * Convert a Cat to a JSON which can be sent to the server.
     */
    private convert(cat: Cat): Cat {
        const copy: Cat = Object.assign({}, cat);
        return copy;
    }
}
