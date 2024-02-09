import { TestBed } from '@angular/core/testing';

import { LoaderPokeballService } from './loader-pokeball.service';

describe('LoaderService', () => {
  let service: LoaderPokeballService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderPokeballService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
