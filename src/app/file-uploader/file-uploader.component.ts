import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  @ViewChild('inputFilePicker') input: ElementRef;
  @Output() imageSelected = new EventEmitter<string>();
  image: string;

  constructor() { }

  ngOnInit() {
  }

  convertImage(file: any) {
    if (file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  private _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.image = btoa(binaryString);
    this.imageSelected.emit(this.image);
  }

  addSelectedPhoto(event: any) {
    this.convertImage(event.target.files[0]);
  }

  clickInput() {
    this.input.nativeElement.click();
  }

  removeImage() {
    this.image = '';
    this.imageSelected.emit(this.image);
  }
}
