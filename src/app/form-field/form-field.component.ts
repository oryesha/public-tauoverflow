import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {
  @ViewChild('textarea') textarea: ElementRef;

  constructor() { }

  @Input() isRequired: boolean;
  @Input() label: string;
  @Input() isTextarea: boolean;
  @Input() appearance = 'fill';

  ngOnInit() {
  }

  getTextareaContent(): string {
    if (!this.isTextarea) {
      return '';
    }
    return this.textarea.nativeElement.value;
  }
}
