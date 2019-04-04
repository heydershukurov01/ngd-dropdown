import { TestBed, inject } from '@angular/core/testing';

import { NgdDropdownService } from './ngd-dropdown.service';

describe('NgdDropdownService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgdDropdownService]
    });
  });

  it('should be created', inject([NgdDropdownService], (service: NgdDropdownService) => {
    expect(service).toBeTruthy();
  }));
});
