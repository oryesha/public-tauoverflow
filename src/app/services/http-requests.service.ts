import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UiCourse} from '../models/ui-course.model';
import {query} from '@angular/animations';

export class QueryParams {
  paramName: string;
  paramValue: string|string[];

  constructor(name: string, value: string|string[]) {
    this.paramName = name;
    this.paramValue = value;
  }
}

@Injectable()
export class HttpRequestsService {

  private _baseUrl = 'http://localhost:3000/api'; // TODO(or,licht): Add the base URL.

  constructor(private http: HttpClient) {
    // this.http.post(this._baseUrl + '/courses', new UiCourse('blah', '0011'));
  }

  post(path: string, model: any) {
    return this.http.post(this._baseUrl + path, model);
  }

  get(path: string, reqQuery?: QueryParams[], params?: string[]): Observable<any> {
    const queryParams = {};
    let fullPath = path;
    if (reqQuery) {
      reqQuery.forEach(param => {
        queryParams[param.paramName] = param.paramValue;
      });
    }
    if (params) {
      fullPath += '/' + params.join('/');
    }
    return this.http.get(this._baseUrl + fullPath, {params: queryParams});
  }

  put(path: string, model: any) {
    return this.http.put(this._baseUrl + path, model);
  }
}
