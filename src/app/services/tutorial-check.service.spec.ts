import { TestBed } from '@angular/core/testing';

import { TutorialCheckService } from './tutorial-check.service';

describe('TutorialCheckService', () => {
  let service: TutorialCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorialCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
