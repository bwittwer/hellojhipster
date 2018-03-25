import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CatMySuffix } from './cat-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CatMySuffix>;

@Injectable()
export class CatMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/cats';

    constructor(private http: HttpClient) { }

    create(cat: CatMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(cat);
        return this.http.post<CatMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cat: CatMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(cat);
        return this.http.put<CatMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CatMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CatMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CatMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CatMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CatMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CatMySuffix[]>): HttpResponse<CatMySuffix[]> {
        const jsonResponse: CatMySuffix[] = res.body;
        const body: CatMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CatMySuffix.
     */
    private convertItemFromServer(cat: CatMySuffix): CatMySuffix {
        const copy: CatMySuffix = Object.assign({}, cat);
        return copy;
    }

    /**
     * Convert a CatMySuffix to a JSON which can be sent to the server.
     */
    private convert(cat: CatMySuffix): CatMySuffix {
        const copy: CatMySuffix = Object.assign({}, cat);
        return copy;
    }
}
