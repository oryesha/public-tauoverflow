import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(private dialog: MatDialog) {
    // const x = this.appService.getAll();
  }


  ngOnInit() {

  }

  openCoursesDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '250px';
    dialogConfig.position = {
      // left: '50vw',
      // top: '50vh'
    };
    dialogConfig.data = {id: 1, title: 'Search in Courses'};
    this.dialog.open(FilterDialogComponent, dialogConfig);
  }

}
