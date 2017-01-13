import { Component, OnInit, Type } from '@angular/core';

import { VacanciesService } from '../services/vacancies.service';
import { Vacancy } from '../vacancy';
import { ActivatedRoute, Params }   from '@angular/router';


@Component({
  selector: 'app-vacancy-detail',
  templateUrl: './vacancy-detail.component.html',
  styleUrls: ['./vacancy-detail.component.css']
})
export class VacancyDetailComponent implements  OnInit {
  vacancy: Vacancy;
  constructor(
    private vacanciesService: VacanciesService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    // get vacancy by id url parameter and assign it to a variable
    this.route.params
      .subscribe(params => {
        this.vacanciesService.getVacancy(+params['id'])
          .then(vacancy => this.vacancy = vacancy);
      });
  }
}

