/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VacanciesService } from './vacancies.service';

describe('VacanciesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VacanciesService]
    });
  });

  it('should ...', inject([VacanciesService], (service: VacanciesService) => {
    expect(service).toBeTruthy();
  }));
});
