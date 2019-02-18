import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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

  private _baseUrl = 'http://localhost:3000/api ';

  constructor(private http: HttpClient) {
    // this.http.post(this._baseUrl + '/courses', new UiCourse('blah', '0011'));
  }

  post(path: string, model: any) {
    return this.http.post(this._baseUrl + path, model);
  }

  delete(path: string, id: string): Observable<any> {
    path += ('/' + id);
    return this.http.delete(this._baseUrl + path);
  }

  get(path: string, reqQuery?: QueryParams[], params?: string[]): Observable<any> {
    const queryParams = {};
    let pathAndParams = path;
    if (reqQuery) {
      reqQuery.forEach(param => {
        queryParams[param.paramName] = param.paramValue;
      });
    }
    if (params) {
      const p = params.join('/');
      pathAndParams += '/' + p;
    }
    return this.http.get(this._baseUrl + pathAndParams, {params: queryParams}).pipe(
      map(res  => {
      return res['data'];
  }));
  }

  put(path: string, model: any) {
    return this.http.put(this._baseUrl + path, model);
  }

  public getBaseUrl(): string {
    return this._baseUrl;
  }
}
