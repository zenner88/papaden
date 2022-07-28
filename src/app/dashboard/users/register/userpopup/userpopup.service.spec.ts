import { TestBed } from '@angular/core/testing';

import { UserpopupService } from './userpopup.service';

describe('UserpopupService', () => {
  let service: UserpopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserpopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
