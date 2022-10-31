import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarLoadingComponent } from './car-loading.component';

describe('CarLoadingComponent', () => {
  let component: CarLoadingComponent;
  let fixture: ComponentFixture<CarLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
