import {
  Component, OnInit, HostListener,
  Inject
} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss']
})
export class DeleteConfirmDialogComponent implements OnInit {
  title = 'Remove Post';
  text = 'Are you sure you want to delete this post?\n\nAfter deletion this post will no longer appear in site';
  shouldRemove = false;

  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.text = data.text;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(this.shouldRemove);
  }

  delete() {
    this.shouldRemove = true;
    this.close();
  }

  cancel() {
    this.close();
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.close();
  }

}
