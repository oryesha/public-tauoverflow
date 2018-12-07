import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Response> {
    const x = this.http.get(this.url);
    const y = x.pipe(map((response: any) => response.json()));
    return y;
    // return this.http.get(this.url).pipe(map((response: any) => response.json()));
  }
}
