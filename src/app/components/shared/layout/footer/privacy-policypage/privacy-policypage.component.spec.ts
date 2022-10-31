import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicypageComponent } from './privacy-policypage.component';

describe('PrivacyPolicypageComponent', () => {
  let component: PrivacyPolicypageComponent;
  let fixture: ComponentFixture<PrivacyPolicypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyPolicypageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolicypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
