import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FileChangeEvent} from '@angular/compiler-cli/src/perform_watch';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {
  @ViewChild('textarea') textarea: ElementRef;
  @ViewChild('input') input: ElementRef;

  constructor() { }

  @Input() isRequired: boolean;
  @Input() label: string;
  @Input() isTextarea: boolean;
  @Input() appearance = 'fill';
  @Input() isFilePicker = false;

  @Output() imageSelected = new EventEmitter();

  ngOnInit() {
  }

  getContent(): string {
    if (this.isTextarea) {
      return this.textarea.nativeElement.value;
    }
    return this.input.nativeElement.value;
  }

  addSelectedPhoto(event: any) {
    this.imageSelected.emit(event.target.files[0]);
  }
}
