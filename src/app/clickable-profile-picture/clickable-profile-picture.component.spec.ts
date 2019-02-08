import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickableProfilePictureComponent } from './clickable-profile-picture.component';

describe('ClickableProfilePictureComponent', () => {
  let component: ClickableProfilePictureComponent;
  let fixture: ComponentFixture<ClickableProfilePictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickableProfilePictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickableProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
