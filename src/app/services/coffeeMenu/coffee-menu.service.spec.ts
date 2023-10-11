import { TestBed } from '@angular/core/testing';

import { CoffeeMenuService } from './coffee-menu.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CoffeeMenuService', () => {
  let service: CoffeeMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
        }
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CoffeeMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
