import { TestBed } from '@angular/core/testing';

import { ENotificationsService } from './e-notifications.service';

describe('ENotificationsService', () => {
  let service: ENotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ENotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
