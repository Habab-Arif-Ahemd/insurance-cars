import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YakeenMissingInfoComponent } from './yakeen-missing-info.component';

describe('YakeenMissingInfoComponent', () => {
  let component: YakeenMissingInfoComponent;
  let fixture: ComponentFixture<YakeenMissingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YakeenMissingInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YakeenMissingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
