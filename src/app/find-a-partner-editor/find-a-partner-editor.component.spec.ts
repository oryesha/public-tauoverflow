import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAPartnerEditorComponent } from './find-a-partner-editor.component';

describe('FindAPartnerEditorComponent', () => {
  let component: FindAPartnerEditorComponent;
  let fixture: ComponentFixture<FindAPartnerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindAPartnerEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAPartnerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
