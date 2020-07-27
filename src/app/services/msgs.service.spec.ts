import { TestBed } from '@angular/core/testing';

import { MsgsService } from './msgs.service';

describe('MsgsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MsgsService = TestBed.get(MsgsService);
    expect(service).toBeTruthy();
  });
});
