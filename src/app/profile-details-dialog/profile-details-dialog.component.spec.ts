import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailsDialogComponent } from './profile-details-dialog.component';

describe('ProfileDetailsDialogComponent', () => {
  let component: ProfileDetailsDialogComponent;
  let fixture: ComponentFixture<ProfileDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
