import { TestBed } from '@angular/core/testing';

import { AccountServiceOLD } from './account.serviceOLD';

describe('AccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountServiceOLD = TestBed.get(AccountServiceOLD);
    expect(service).toBeTruthy();
  });
});
