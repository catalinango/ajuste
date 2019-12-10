import { TestBed } from '@angular/core/testing';

import { LinearDataServicesService } from './linear-data-services.service';

describe('LinearDataServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinearDataServicesService = TestBed.get(LinearDataServicesService);
    expect(service).toBeTruthy();
  });
});
