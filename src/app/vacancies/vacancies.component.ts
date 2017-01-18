import { Component, OnInit } from '@angular/core';

import { VacanciesService } from '../services/vacancies.service';
import { Vacancy } from '../vacancy';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.styl']
})
export class VacanciesComponent implements OnInit {
  vacancies: Vacancy[];
  constructor( private vacanciesService: VacanciesService ) {}
  ngOnInit() {
    this.vacanciesService.getVacancies().then(vacancies => this.vacancies = vacancies);
  }
}

