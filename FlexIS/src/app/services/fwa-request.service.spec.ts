import { TestBed } from '@angular/core/testing';

import { FwaRequestService } from './fwa-request.service';

describe('FwaRequestService', () => {
  let service: FwaRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FwaRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
