import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  // courses: string[] = ['Calculus 1b', 'Intro to CS', 'Linear Algebra', 'Discrete Mathematics', 'Complexity',
  //   'Micro-Economics', 'Funding', 'Statistics'];

  constructor(private dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '250px',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
    alert('HI!');
  }

  ngOnInit() {
  }
}

