import { TestBed } from '@angular/core/testing';

import { NaturalPersonService } from './natural-person.service';

describe('NaturalPersonService', () => {
  let service: NaturalPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NaturalPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
