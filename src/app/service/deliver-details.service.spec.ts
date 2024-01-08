import { TestBed } from '@angular/core/testing';

import { DeliverDetailsService } from './deliver-details.service';

describe('DeliverDetailsService', () => {
  let service: DeliverDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
