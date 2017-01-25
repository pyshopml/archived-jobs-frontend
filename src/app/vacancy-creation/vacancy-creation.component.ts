import { Component, ViewChild } from '@angular/core';

import { VacanciesService } from '../services/vacancies.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-vacancy-creation',
  templateUrl: './vacancy-creation.component.html',
  styleUrls: ['./vacancy-creation.component.styl'],
  providers: [FormBuilder]
})
export class VacancyCreationComponent {
  public vacancyForm = this.fb.group({
    // validation
    title: ['', [Validators.minLength(3), Validators.required]],
    description: ['', [
      Validators.maxLength(2000),
      Validators.minLength(3),
      Validators.required]
    ]
  });

  constructor(
    private vacanciesService: VacanciesService,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    alert('done');
    this.vacanciesService.addVacancy(
      {
        id: null,
        title: this.vacancyForm.value.title,
        description: this.vacancyForm.value.description
      }
    ).catch(err => { throw err; });
  }
}
