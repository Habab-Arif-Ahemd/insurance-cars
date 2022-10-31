import { TestBed } from '@angular/core/testing';

import { ComparisonQuoteService } from './comparison-quote.service';

describe('ComparisonQuoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComparisonQuoteService = TestBed.get(ComparisonQuoteService);
    expect(service).toBeTruthy();
  });
});
