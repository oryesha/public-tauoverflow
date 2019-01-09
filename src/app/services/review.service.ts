import {CourseReview} from '../models/course-review.model';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpRequestsService} from './http-requests.service';

@Injectable()
export class ReviewService {

  constructor(
    private httpRequest: HttpRequestsService
  ) { }

  createReview(review: CourseReview): Observable<any> {
    return this.httpRequest.post('/course-reviews', review);
  }

  getReview(id: string): Observable<any> {
    return this.httpRequest.get('/course-reviews', [], [id]);
  }
}
