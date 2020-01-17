import { TestBed } from '@angular/core/testing';

import { MathImplService } from './math-impl.service';

describe('MathImplService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MathImplService = TestBed.get(MathImplService);
    expect(service).toBeTruthy();
  });
});
