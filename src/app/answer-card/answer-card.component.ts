import {Component, Input, OnInit} from '@angular/core';
import {Answer} from '../models/answer.model';
import {AnswerService} from '../services/answer.service';
import {UserService} from '../services/user.service';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {DeleteConfirmDialogComponent} from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss']
})
export class AnswerCardComponent implements OnInit {
  @Input() answer: Answer;
  @Input() isEvenAnswer: boolean;
  @Input() isUserOwner: boolean;

  constructor(private answerService: AnswerService,
              private userService: UserService,
              private snackBar: MatSnackBar,
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

}
