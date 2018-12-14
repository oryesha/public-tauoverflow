import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Try1Component } from './try1.component';

describe('Try1Component', () => {
  let component: Try1Component;
  let fixture: ComponentFixture<Try1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Try1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Try1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
