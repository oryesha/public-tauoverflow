import { Injectable } from '@angular/core';
import {HttpRequestsService} from './http-requests.service';
import {Program} from '../models/program.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private _programs: Program[] = [];
  private _programsLoaded: Promise<void>;

  constructor(private httpRequest: HttpRequestsService) {
    this._programsLoaded = new Promise<void>((resolve) => {
      this.httpRequest.get('/programs').subscribe((programs: any) => {
        programs.forEach((program) => {
          this._programs.push(Program.deserialize(program));
        });
        resolve();
      });
    });
  }

  getPrograms(): Promise<Program[]> {
    return new Promise<Program[]>(async resolve => {
      await this._programsLoaded;
      resolve(this._programs);
    });
  }

  public doNothing() {
    console.log('Loading programs');
  }
}
