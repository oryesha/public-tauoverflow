import {Component, OnInit} from '@angular/core';
import {AppRoutingDataService} from '../app-routing-data.service';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss']
})
export class QuestionEditorComponent implements OnInit {

  isCourseChosen = true;
  courses: string[] = [];

  constructor(private routingDataService: AppRoutingDataService) {
  }

  ngOnInit() {
    this.courses = this.routingDataService.getRoutingData().getData();
  }

  remove(course: string) {
    const index = this.courses.indexOf(course);
    if (index > 0) {
      this.courses.splice(index, 1);
    }
  }
}
