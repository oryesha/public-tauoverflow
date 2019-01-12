import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialDetailsDialogComponent } from './initial-details-dialog.component';

describe('InitialDetailsDialogComponent', () => {
  let component: InitialDetailsDialogComponent;
  let fixture: ComponentFixture<InitialDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
