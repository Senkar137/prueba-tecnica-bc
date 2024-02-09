import { TestBed } from '@angular/core/testing';

import { TrainerRegistrationGuard } from './trainer-registration.guard';

describe('TrainerRegistrationGuard', () => {
  let guard: TrainerRegistrationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TrainerRegistrationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
