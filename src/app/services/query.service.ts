import { Injectable } from '@angular/core';
import {HttpRequestsService, QueryParams} from './http-requests.service';
import {Observable, of} from 'rxjs';
import {Question} from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor(private httpRequest: HttpRequestsService) {
  }

  getQueryResult(content: string, filters: string[]): Observable<Question[]> {
    // return /*Observable.*/of(this.cachedCourses);
    const queryString = new QueryParams('content', content);
    const queryFilters = new QueryParams('filters', filters);
    return this.httpRequest.get('/query-results', [queryString, queryFilters]);
  }
}
