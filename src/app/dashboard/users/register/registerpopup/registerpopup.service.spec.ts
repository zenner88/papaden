import { TestBed } from '@angular/core/testing';

import { RegisterpopupService } from './registerpopup.service';

describe('RegisterpopupService', () => {
  let service: RegisterpopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterpopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
