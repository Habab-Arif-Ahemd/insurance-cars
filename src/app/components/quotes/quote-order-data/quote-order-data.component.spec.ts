import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteOrderDataComponent } from './quote-order-data.component';

describe('QuoteOrderDataComponent', () => {
  let component: QuoteOrderDataComponent;
  let fixture: ComponentFixture<QuoteOrderDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteOrderDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteOrderDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
