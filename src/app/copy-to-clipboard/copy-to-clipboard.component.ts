import {Component, Input, OnInit} from '@angular/core';
import {ClipboardService} from 'ngx-clipboard';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.scss']
})
export class CopyToClipboardComponent implements OnInit {
  @Input() private email: string;
  constructor(private snackBar: MatSnackBar, private clipboardService: ClipboardService) { }

  ngOnInit() {
  }
  copyEmail(email: string) {
    this.clipboardService.copyFromContent(email);
    this.snackBar.open('Email copied to clipboard', '', {
      duration: 2000 // Prompt the toast 2 seconds.
    });
  }
}
