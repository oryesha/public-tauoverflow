import { Injectable } from '@angular/core';
import {HttpRequestsService} from './http-requests.service';
import {Program} from '../models/program.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private _programs: Program[] = [];
  private _programsLoaded: Promise<void>;

  // // TODO(or, nati): Add programs to DB and implement the BE.
  // private _dummyPrograms: string[] = ['Computer Science', 'Electrical Engineering',
  //   'Law', 'Computer Science and Electrical Engineering', 'Economics',
  //   'Management', 'Physics', 'Chemistry'];
  // private _implemented = false;
  // // end of TODO

  constructor(private httpRequest: HttpRequestsService) {
    // // TODO(or, nati): Remove after implemented.
    // if (!this._implemented) {
    //   this._dummyPrograms.forEach((name) => this._programs.push(new Program('0', name)));
    //   return;
    // }
    // // end of TODO
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
    // // TODO(or, nati): Remove after implemented.
    // if (!this._implemented) {
    //   return Promise.resolve(this._programs);
    // }
    // // end of TODO
    return new Promise<Program[]>(async resolve => {
      await this._programsLoaded;
      resolve(this._programs);
    });
  }
}
