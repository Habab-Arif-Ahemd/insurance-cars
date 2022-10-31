import { TestBed } from '@angular/core/testing';

import { DirectAccessProfileGuard } from './direct-access-profile.guard';

describe('DirectAccessProfileGuard', () => {
  let guard: DirectAccessProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DirectAccessProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
