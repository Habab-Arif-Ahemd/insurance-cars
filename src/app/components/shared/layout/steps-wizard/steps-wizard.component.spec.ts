import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsWizardComponent } from './steps-wizard.component';

describe('StepsWizardComponent', () => {
  let component: StepsWizardComponent;
  let fixture: ComponentFixture<StepsWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsWizardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
