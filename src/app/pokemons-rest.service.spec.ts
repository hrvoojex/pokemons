import { TestBed } from '@angular/core/testing';

import { PokemonsRestService } from './pokemons-rest.service';

describe('PokemonsRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokemonsRestService = TestBed.get(PokemonsRestService);
    expect(service).toBeTruthy();
  });
});
