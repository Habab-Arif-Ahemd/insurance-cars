import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyarComponent } from './privacy-policyar.component';

describe('PrivacyPolicyarComponent', () => {
  let component: PrivacyPolicyarComponent;
  let fixture: ComponentFixture<PrivacyPolicyarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyPolicyarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolicyarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
