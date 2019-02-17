import { Injectable } from '@angular/core';
import {of, Observable} from 'rxjs';
import {HttpRequestsService} from './http-requests.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private httpRequest: HttpRequestsService) { }

  public uploadImage(image: File): Observable<any> {
    if (!image) {
      return /*Observable.*/of('');
    }
    const formData = new FormData();
    formData.append('image', image);
    return this.httpRequest.post('/image-upload', formData).pipe(
      map((res: any) => res.imageUrl)
    );
  }
}
