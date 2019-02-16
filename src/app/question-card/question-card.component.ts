import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Question} from '../models/question.model';
import {UserProfile} from '../models/user-profile.model';
import {QuestionService} from '../services/question.service';
import {LatexRenderingService} from '../services/latex-rendering.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit, AfterViewInit {
  @ViewChild('contentContainer') contentContainer: ElementRef;
  @Input() question: Question;
  @Input() user: UserProfile;
  @Input() isLocked: boolean;
  @Input() isUserOwner: boolean;
  @Output() showAnswerEditor = new EventEmitter<void>();
  equations: string[] = [];
  initialContent = '';

  constructor(private questionService: QuestionService,
              private latexRenderingService: LatexRenderingService) {}

  upvote() {
    if (this.question.upvote.upvoters.includes(this.user.id)) {
      return;
    }
    this.question.upvote.count++;
    this.question.upvote.upvoters.push(this.user.id);
    this.questionService.updateQuestion(this.question).subscribe(res => {
      console.log('Update Succesful');
    }, err => {
      console.error('Update Unsuccesful');
    });
  }

  ngOnInit() {
    this.initialContent =
      this.latexRenderingService.findAllEquations(this.question.content, this.equations);
  }

  newAnswer() {
    this.showAnswerEditor.emit();
  }

  ngAfterViewInit(): void {
    this.latexRenderingService.renderEquations(this.contentContainer, this.equations);
  }
}
