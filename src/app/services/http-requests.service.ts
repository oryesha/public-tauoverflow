import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpRequestsService {

  private _baseUrl = ''; // TODO(or,licht): Add the base URL.

  constructor(private http: HttpClient) { }

  post(path: string, model: any) {
    this.http.post(this._baseUrl + path, model);
  }

  // TODO: Implement get.
}
