import {Question} from '../models/question.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class QuestionService {

  api_url = 'http://localhost:3000';
  questionUrl = `${this.api_url}/api/questions`;

  constructor(
    private http: HttpClient
  ) { }

  createQuestion(question: Question): Observable<any> {
    // returns the observable of http post request
    return this.http.post(`${this.questionUrl}`, question);
  }

  // Read Question, takes no arguments
  getQuestions(): Observable<Question[]> {
    return this.http.get(this.questionUrl).pipe (
      map(res  => {
        // Maps the response object sent from the server
        return res['data'].docs as Question[];
      })
  ); }
  // Update Question, takes a Question Object as parameter
  editQuestion( question: Question ) {
    const editUrl = `${this.questionUrl}`;
    // returns the observable of http put request
    return this.http.put(editUrl, question);
  }

  deleteQuestion(id: string): any {
    // Delete the object by the id
    const deleteUrl = `${this.questionUrl}/${id}`;
    return this.http.delete(deleteUrl).pipe(
      map(res  => {
        return res;
      })
    ); }

  // Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
