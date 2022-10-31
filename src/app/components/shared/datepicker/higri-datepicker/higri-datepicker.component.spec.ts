import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigriDatepickerComponent } from './higri-datepicker.component';

describe('HigriDatepickerComponent', () => {
  let component: HigriDatepickerComponent;
  let fixture: ComponentFixture<HigriDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HigriDatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HigriDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
