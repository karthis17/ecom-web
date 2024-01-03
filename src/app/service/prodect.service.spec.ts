import { TestBed } from '@angular/core/testing';

import { ProdectService } from './prodect.service';

describe('ProdectService', () => {
  let service: ProdectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
