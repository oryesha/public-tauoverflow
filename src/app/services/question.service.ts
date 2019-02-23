import {Question} from '../models/question.model';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpRequestsService, QueryParams} from './http-requests.service';
import {UserProfile} from '../models/user-profile.model';

@Injectable()
export class QuestionService {

  constructor(
    private httpRequest: HttpRequestsService
  ) { }

  createQuestion(question: Question): Observable<any> {
    return this.httpRequest.post('/questions', question);
  }
  updateQuestion(question: Question): Observable<any> {
    console.log('update question');
    return this.httpRequest.put('/questions', question);
  }

  //
  // // Read Question, takes no arguments
  // getQuestions(): Observable<Question[]> {
  //   return this.http.get(this.questionUrl).pipe (
  //     map(res  => {
  //       // Maps the response object sent from the server
  //       return res['data'].docs as Question[];
  //     })
  // ); }
  // // Update Question, takes a Question Object as parameter
  // editQuestion( question: Question ) {
  //   const editUrl = `${this.questionUrl}`;
  //   // returns the observable of http put request
  //   return this.http.put(editUrl, question);
  // }
  //
  // deleteQuestion(id: string): any {
  //   // Delete the object by the id
  //   const deleteUrl = `${this.questionUrl}/${id}`;
  //   return this.http.delete(deleteUrl).pipe(
  //     map(res  => {
  //       return res;
  //     })
  //   ); }
  //
  // // Default Error handling method.
  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }


  getQuestion(id: string): Observable<any> {
    return this.httpRequest.get('/questions', [], [id]);
  }

  getInterestedUsers(questionId: string) {
    const queryParams = new QueryParams('id', questionId);
    return this.httpRequest.get('/questions/interested-users', [queryParams]);
  }
}
