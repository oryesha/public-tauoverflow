import { Response } from '@angular/http';
import { QuestionService } from '../services/question.service';
import { Component, OnInit } from '@angular/core';
import Question from '../models/question.model';

@Component({
  selector: 'app-try1',
  templateUrl: './try1.component.html',
  styleUrls: ['./try1.component.scss']
})
export class Try1Component implements OnInit {

  constructor(
    // Private questionService will be injected into the component by Angular Dependency Injector
    private questionService: QuestionService
  ) { }

  // Declaring the new question Object and initilizing it
  public newQuestion: Question = new Question();

  // An Empty list for the visible question list
  questionsList: Question[];
  editQuestions: Question[] = [];

  create() {
    this.questionService.createQuestion(this.newQuestion) // need to add related coures
      .subscribe((res) => {
        this.questionsList.push(res.data);
        this.newQuestion = new Question();
      });
  }

  editQuestion( question: Question) {
    console.log(question);
    if (this.questionsList.includes(question)) {
      if (!this.editQuestions.includes(question)) {
        this.editQuestions.push(question);
      } else {
        this.editQuestions.splice(this.editQuestions.indexOf(question), 1);
        this.questionService.editQuestion(question).subscribe(res => {
          console.log('Update Unsuccesfull');
        });
      }
    }
  }

  doneQuestion(question: Question) {
    question.status = 'Done';
    this.questionService.editQuestion(question).subscribe(res => {
      console.log('Update Succesful');
    }, err => {
      this.editQuestion(question);
      console.error('Update Unsuccesful');
    });
  }
  submitQuestion(event, question: Question) {
    if (event.keyCode === 13) {
      this.editQuestion(question);
    }
  }

  deleteQuestion(question: Question) {
    this.questionService.deleteQuestion(question._id).subscribe(res => {
      this.questionsList.splice(this.questionsList.indexOf(question), 1);
    });
  }

  ngOnInit(): void {

    // At component initialization the
    this.questionService.getQuestions()
      .subscribe(questions => {
        // assign the questionList property to the proper http response
        this.questionsList = questions;
        console.log(questions);
      });
  }
}
