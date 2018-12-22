import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';
import {MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  @Input() isSearchQuestion: boolean;
  private selectedFilters: string[] = [];
  private hasFilters: boolean;

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {
      id: 1,
      title: 'Filter search by course names',
      isSearch: true,
      selected: this.selectedFilters.slice()
    };
    this.dialog
        .open(FilterDialogComponent, dialogConfig)
        .afterClosed()
        .subscribe( (result: string[]) => {
          this.selectedFilters = result ? result : this.selectedFilters;
          this.hasFilters = this.selectedFilters.length > 0;
        });
  }

  remove(filter: string) {
    const index = this.selectedFilters.indexOf(filter);
    if (index >= 0) {
      this.selectedFilters.splice(index, 1);
      this.hasFilters = this.selectedFilters.length > 0;
    }
  }

  ngOnInit() {
  }
}


