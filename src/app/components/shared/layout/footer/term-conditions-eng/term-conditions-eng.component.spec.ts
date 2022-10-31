import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermConditionsEngComponent } from './term-conditions-eng.component';

describe('TermConditionsEngComponent', () => {
  let component: TermConditionsEngComponent;
  let fixture: ComponentFixture<TermConditionsEngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermConditionsEngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermConditionsEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
