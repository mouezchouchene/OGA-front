import { TestBed } from '@angular/core/testing';

import { MesProjetsService } from './mes-projets.service';

describe('MesProjetsService', () => {
  let service: MesProjetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesProjetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
