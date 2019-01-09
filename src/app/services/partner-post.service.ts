import {PartnerPost} from '../models/partner-post.model';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpRequestsService} from './http-requests.service';

@Injectable()
export class PartnerPostService {

  constructor(
    private httpRequest: HttpRequestsService
  ) { }

  createPartnerPost(partnerPost: PartnerPost): Observable<any> {
    return this.httpRequest.post('/partner-posts', partnerPost);
  }
}
