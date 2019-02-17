import {
  AfterViewChecked, AfterViewInit,
  Component,
  ComponentFactoryResolver, ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {Answer} from '../models/answer.model';
import {AnswerService} from '../services/answer.service';
import {UserService} from '../services/user.service';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {DeleteConfirmDialogComponent} from '../delete-confirm-dialog/delete-confirm-dialog.component';
import {LatexRenderingService} from '../services/latex-rendering.service';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss']
})
export class AnswerCardComponent implements OnInit, AfterViewChecked, AfterViewInit {
  @ViewChild('contentContainer') contentContainer: ElementRef;
  @Input() answer: Answer;
  @Input() isEvenAnswer: boolean;
  @Input() isUserOwner: boolean;
  initialContent = '';
  equations: string[] = [];

  constructor(private answerService: AnswerService,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private latexRenderingService: LatexRenderingService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private dialog: MatDialog) {
  }

  upvote() {
    this.userService.getUser().then((user) => {
      if (this.answer.upvote.upvoters.includes(user.id)) {
        return;
      }
      this.answer.upvote.count++;
      this.answer.upvote.upvoters.push(user.id);
      this.answerService.updateAnswer(this.answer).subscribe(res => {
        console.log('Update Succesful');
      }, err => {
        console.error('Update Unsuccesful');
      });
    });
  }

  ngOnInit() {
    const content = this.answer.content;
    this.initialContent =
      this.latexRenderingService.findAllEquations(content, this.equations);
  }

  private deleteAnswer() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {title: 'Delete Answer',
      text: 'Are you sure you want to delete this answer? It will be no longer exist'};
    this.dialog.open(DeleteConfirmDialogComponent, dialogConfig).afterClosed().subscribe(
      (result: boolean) => {
        if (result) {
          this.answerService.deleteAnswer(this.answer.id).subscribe();
          this.answer = null;
          this.snackBar.open('Post Successfully Deleted', '', {
            duration: 2000 // Prompt the toast 2 seconds.
          });
        }
      });
  }

  ngAfterViewChecked(): void {
  }

  ngAfterViewInit(): void {
    this.latexRenderingService.renderEquations(this.contentContainer, this.equations);
  }

}
