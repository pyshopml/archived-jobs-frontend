import { Component, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { VacanciesService } from '../services/vacancies.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-vacancy-creation',
  templateUrl: './vacancy-creation.component.html',
  styleUrls: ['./vacancy-creation.component.css'],
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
  @ViewChild('titleRef') titleRef;
  @ViewChild('descriptionRef') descriptionRef;

  constructor(
    private vacanciesService: VacanciesService,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    alert('done');
    this.vacanciesService.addVacancy(
      {
        id: null,
        title: <string>this.titleRef.nativeElement.value,
        description: <string>this.descriptionRef.nativeElement.value
      }
    ).catch(err => { throw err; });
  }
}
