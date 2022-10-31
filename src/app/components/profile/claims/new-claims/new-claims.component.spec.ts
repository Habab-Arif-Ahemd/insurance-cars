import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClaimsComponent } from './new-claims.component';

describe('NewClaimsComponent', () => {
  let component: NewClaimsComponent;
  let fixture: ComponentFixture<NewClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
