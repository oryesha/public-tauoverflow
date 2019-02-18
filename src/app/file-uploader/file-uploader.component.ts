import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';

export class FileSnippet {
  constructor(public imageSrc: string, public image: File) {}
}

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit, OnDestroy {
  @ViewChild('inputFilePicker') input: ElementRef;
  @Output() imageSelected = new EventEmitter<FileSnippet>();
  @Input() imageSrc: string;
  reader: FileReader = new FileReader();
  image: File;

  constructor() { }

  ngOnInit() {
    this.reader.onload = this._handleReaderLoaded.bind(this);
  }

  convertImage(file: File) {
    if (file) {
      this.image = file;
      this.reader.readAsDataURL(file);
    }
  }

  private _handleReaderLoaded(readerEvt) {
    this.imageSrc = readerEvt.target.result;
    this.imageSelected.emit(new FileSnippet(this.imageSrc, this.image));
  }

  addSelectedPhoto(event: any) {
    this.convertImage(event.target.files[0]);
  }

  clickInput() {
    this.input.nativeElement.click();
  }

  removeImage() {
    this.imageSrc = '';
    this.image = null;
    this.imageSelected.emit(new FileSnippet(this.imageSrc, this.image));
  }

  ngOnDestroy(): void {
    this.reader.onload = null;
  }
}
