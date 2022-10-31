import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GregorianDatepickerComponent } from './gregorian-datepicker.component';

describe('GregorianDatepickerComponent', () => {
  let component: GregorianDatepickerComponent;
  let fixture: ComponentFixture<GregorianDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GregorianDatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GregorianDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
