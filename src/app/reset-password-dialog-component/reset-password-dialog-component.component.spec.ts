import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordDialogComponentComponent } from './reset-password-dialog-component.component';

describe('ResetPasswordDialogComponentComponent', () => {
  let component: ResetPasswordDialogComponentComponent;
  let fixture: ComponentFixture<ResetPasswordDialogComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordDialogComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
