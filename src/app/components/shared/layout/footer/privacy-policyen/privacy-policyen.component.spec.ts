import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyenComponent } from './privacy-policyen.component';

describe('PrivacyPolicyenComponent', () => {
  let component: PrivacyPolicyenComponent;
  let fixture: ComponentFixture<PrivacyPolicyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyPolicyenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolicyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
