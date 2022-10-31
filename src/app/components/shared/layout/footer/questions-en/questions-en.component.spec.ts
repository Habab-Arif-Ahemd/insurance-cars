import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsEnComponent } from './questions-en.component';

describe('QuestionsEnComponent', () => {
  let component: QuestionsEnComponent;
  let fixture: ComponentFixture<QuestionsEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsEnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
