import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpRequestsService} from './http-requests.service';
import {ChangeHoursPost} from '../models/change-hours-post.model';

@Injectable()
export class ChangeHoursPostService {

  constructor(
    private httpRequest: HttpRequestsService
  ) { }

  createChangeHoursPost(changeHoursPost: ChangeHoursPost): Observable<any> {
    return this.httpRequest.post('/change-hours', changeHoursPost);
  }
  deleteChangeHoursPost(dbId: string, isChangeHoursPost: boolean) {
    const path = isChangeHoursPost ? '/change-hours' : '/partner-posts';
    return this.httpRequest.delete(path , dbId);
  }
}
