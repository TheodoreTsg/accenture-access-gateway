import { TestBed } from '@angular/core/testing';

import { CrossOriginInterceptor } from './cross-origin.interceptor';

describe('CrossOriginInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CrossOriginInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CrossOriginInterceptor = TestBed.inject(CrossOriginInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
