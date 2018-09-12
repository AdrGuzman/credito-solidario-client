import { TestBed, inject } from '@angular/core/testing';

import { HttpHandleErrorService } from './http-handle-error.service';

describe('HttpHandleErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpHandleErrorService]
    });
  });

  it('should be created', inject([HttpHandleErrorService], (service: HttpHandleErrorService) => {
    expect(service).toBeTruthy();
  }));
});
