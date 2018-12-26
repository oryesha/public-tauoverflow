import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }

  getResponse(what: string): Observable<any> {
    return this.http.get(this.url + what).pipe(map((response: any) => response));
  }
}

