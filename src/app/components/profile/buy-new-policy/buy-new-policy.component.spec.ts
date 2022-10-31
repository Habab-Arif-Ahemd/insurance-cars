import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNewPolicyComponent } from './buy-new-policy.component';

describe('BuyNewPolicyComponent', () => {
  let component: BuyNewPolicyComponent;
  let fixture: ComponentFixture<BuyNewPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyNewPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyNewPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
