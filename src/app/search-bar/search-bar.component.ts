import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';
import {MatDialogConfig} from '@angular/material/dialog';

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
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '250px';
    dialogConfig.position = {
                              'top': '500',
                              'left': '500'
                            };
    dialogConfig.data = {id: 1, title: 'This is Dialog'}
    this.dialog.open(FilterDialogComponent, dialogConfig);
  }

  @Input() isSearchQuestion: boolean;

  ngOnInit() {
  }
}


