import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsArComponent } from './questions-ar.component';

describe('QuestionsArComponent', () => {
  let component: QuestionsArComponent;
  let fixture: ComponentFixture<QuestionsArComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsArComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsArComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
