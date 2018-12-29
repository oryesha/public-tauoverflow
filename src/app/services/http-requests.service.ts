import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

export class QueryParams {
  paramName: string;
  paramValue: string;

  constructor(name: string, value: string) {
    this.paramName = name;
    this.paramValue = value;
  }
}

@Injectable()
export class HttpRequestsService {

  private _baseUrl = 'http://localhost:3000/api'; // TODO(or,licht): Add the base URL.

  constructor(private http: HttpClient) { }

  post(path: string, model: any) {
    return this.http.post(this._baseUrl + path, model);
  }

  get(path: string, params?: QueryParams[]): Observable<any> {
    const queryParams = new HttpParams();
    if (params) {
      params.forEach(p => queryParams.append(p.paramName, p.paramValue));
    }
    return this.http.get(this._baseUrl + path, {params: queryParams});
  }

  put(path: string, model: any) {
    return this.http.put(this._baseUrl + path, model);
  }
}
