import {Answer} from '../models/answer.model';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpRequestsService} from './http-requests.service';

@Injectable()
export class AnswerService {

  constructor(
    private httpRequest: HttpRequestsService
  ) { }

  createAnswer(answer: Answer): Observable<any> {
    return this.httpRequest.post('/answers', answer);
  }

  getAnswer(id: string): Observable<any> {
    return this.httpRequest.get('/answers', [], [id]);
  }
}
